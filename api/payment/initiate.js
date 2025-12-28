import paydunya from 'paydunya';
const PayDunya = paydunya.default || paydunya;
import PAYDUNYA_CONFIG from '../paydunya-config.js';

// Initialize PayDunya
const setup = new PayDunya.Setup({
    masterKey: PAYDUNYA_CONFIG.MASTER_KEY,
    privateKey: PAYDUNYA_CONFIG.PRIVATE_KEY,
    publicKey: PAYDUNYA_CONFIG.PUBLIC_KEY,
    token: PAYDUNYA_CONFIG.TOKEN,
    mode: PAYDUNYA_CONFIG.MODE
});

// Configure store
const store = new PayDunya.Store({
    name: PAYDUNYA_CONFIG.STORE_NAME,
    tagline: PAYDUNYA_CONFIG.STORE_TAGLINE,
    phoneNumber: PAYDUNYA_CONFIG.STORE_PHONE,
    postalAddress: 'Dakar, Sénégal',
    logoURL: PAYDUNYA_CONFIG.STORE_LOGO,
    websiteURL: PAYDUNYA_CONFIG.STORE_WEBSITE
});

/**
 * Endpoint pour initier un paiement PayDunya
 * POST /api/payment/initiate
 */
export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const {
            amount,           // Montant en FCFA
            description,      // Description du paiement
            customer_name,
            customer_email,
            customer_phone,
            pack_type,        // 'formation' ou 'service'
            pack_name         // Nom du pack
        } = req.body;

        console.log('🚀 Initiating Payment:', { customer_name, amount, pack_name });

        // Use a fallback if email is missing (PayDunya often requires an email)
        const finalEmail = customer_email || 'client@visionr-studio.com';
        const finalAmount = parseInt(amount);

        // Validation
        if (isNaN(finalAmount) || !customer_name) {
            return res.status(400).json({
                error: 'Données manquantes ou invalides (amount et customer_name requis)'
            });
        }

        // Créer la facture PayDunya
        const invoice = new PayDunya.CheckoutInvoice(setup, store);

        // Ajouter l'item
        invoice.addItem(
            pack_name || 'Formation VisionR',
            1,
            finalAmount,
            finalAmount,
            description || `Paiement ${pack_name}`
        );

        // Total
        invoice.totalAmount = finalAmount;

        // URLs de callback (Updated to kinder-events domain)
        invoice.callbackURL = PAYDUNYA_CONFIG.IPN_URL; // Official IPN
        invoice.returnURL = PAYDUNYA_CONFIG.CALLBACK_URL; // Return after success
        invoice.cancelURL = PAYDUNYA_CONFIG.CANCEL_URL;

        // Données personnalisées (pour l'IPN)
        invoice.customData = JSON.stringify({
            type: pack_type,
            pack: pack_name,
            email: finalEmail
        });

        // Informations client
        invoice.addCustomData('Nom', customer_name);
        invoice.addCustomData('Email', finalEmail);
        if (customer_phone) {
            invoice.addCustomData('Téléphone', customer_phone);
        }

        // Créer la facture
        console.log('📦 Creating Invoice...');
        const result = await invoice.create();

        console.log('✅ PayDunya Result:', result.status);

        if (result.status === 'success') {
            return res.status(200).json({
                success: true,
                payment_url: result.response_text,
                token: result.token
            });
        } else {
            console.error('❌ PayDunya Failed:', result.response_text);
            return res.status(400).json({
                success: false,
                error: result.response_text || 'Erreur PayDunya lors de la création'
            });
        }

    } catch (error) {
        console.error('❌ EXCEPTION PayDunya:', error);
        return res.status(500).json({
            success: false,
            error: `Erreur Critique: ${error.message}`,
            details: error.stack
        });
    }
}
