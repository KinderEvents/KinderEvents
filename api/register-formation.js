import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Initialize Supabase
const supabase = createClient(
    'https://aoeoctlxlgdrbyxerivr.supabase.co',
    'sb_secret_00zeaz7eUL7oI6bmP0sARg_1IWZ5FZt'
);

// Email Configuration
const EMAIL_USER = 'eventskinder@gmail.com';
const EMAIL_PASS = 'sqsi trur myip lszy';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

/**
 * API Endpoint: Register Formation
 * Handles new training registration with status workflow
 */
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { nom, prenom, email, telephone, formation } = req.body;

        // Validation
        if (!nom || !prenom || !telephone || !formation) {
            return res.status(400).json({
                error: 'Données manquantes',
                message: 'Nom, prénom, téléphone et formation sont requis'
            });
        }

        // Determine formation details
        const formationDetails = {
            'Formation A': { price: 5000, name: 'Formation A - 5 000 FCFA' },
            'Formation B': { price: 10000, name: 'Formation B - 10 000 FCFA' }
        };

        const selectedFormation = formationDetails[formation] || formationDetails['Formation A'];
        const fullName = `${prenom} ${nom}`;

        // 1. Insert into Supabase with initial status
        const { data, error } = await supabase
            .from('registrations')
            .insert([
                {
                    full_name: fullName,
                    email: email || '',
                    whatsapp: telephone,
                    formation_type: selectedFormation.name,
                    status: 'demande_recue',
                    pack_type: formation,
                    price: selectedFormation.price,
                    created_at: new Date()
                }
            ])
            .select();

        if (error) {
            console.error('Supabase Insert Error:', error);
            throw error;
        }

        console.log('✅ Inscription enregistrée:', data);

        // 2. Send payment instructions email
        try {
            await transporter.sendMail({
                from: `"VisionR Formations" <${EMAIL_USER}>`,
                to: email || EMAIL_USER,
                subject: `Votre demande de participation à ${selectedFormation.name}`,
                html: generatePaymentInstructionsEmail(fullName, selectedFormation.name, selectedFormation.price, telephone)
            });

            console.log('✅ Email d\'instructions envoyé à:', email || EMAIL_USER);
        } catch (emailErr) {
            console.error('⚠️ Erreur envoi email (non bloquant):', emailErr);
        }

        // 3. Return success response
        return res.status(200).json({
            success: true,
            message: 'Votre demande de participation a bien été enregistrée. Les instructions de paiement vous ont été envoyées par email.',
            data
        });

    } catch (error) {
        console.error('❌ Registration API Error:', error);
        return res.status(500).json({
            error: 'Erreur serveur',
            message: 'Une erreur est survenue lors de l\'enregistrement'
        });
    }
}

/**
 * Generate Payment Instructions Email Template
 */
function generatePaymentInstructionsEmail(name, formationName, amount, whatsapp) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
                .header { background: linear-gradient(135deg, #2563EB, #1D4ED8); padding: 40px 20px; text-align: center; }
                .logo-text { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 2px; }
                .content { padding: 40px 30px; color: #334155; line-height: 1.6; }
                .amount-box { background-color: #EFF6FF; border: 2px solid #2563EB; padding: 20px; border-radius: 12px; text-align: center; margin: 25px 0; }
                .amount { font-size: 32px; font-weight: 800; color: #2563EB; margin: 10px 0; }
                .payment-methods { display: flex; gap: 20px; justify-content: center; margin: 25px 0; flex-wrap: wrap; }
                .payment-card { background: #F8FAFC; padding: 15px 20px; border-radius: 8px; text-align: center; flex: 1; min-width: 150px; }
                .payment-logo { font-size: 18px; font-weight: 700; color: #0F172A; margin-bottom: 8px; }
                .payment-number { font-size: 16px; font-weight: 600; color: #2563EB; }
                .instructions { background: #FFFBEB; border-left: 4px solid #F59E0B; padding: 20px; margin: 25px 0; border-radius: 4px; }
                .step { display: flex; align-items: flex-start; margin-bottom: 15px; }
                .step-number { background: #2563EB; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; margin-right: 12px; flex-shrink: 0; }
                .footer { background-color: #F1F5F9; padding: 20px; text-align: center; color: #94A3B8; font-size: 12px; }
                .btn { display: inline-block; background: #10B981; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo-text">Vision<span style="color: #F59E0B;">R</span></div>
                    <div style="color: rgba(255,255,255,0.9); margin-top: 8px; font-size: 14px;">Formations Professionnelles</div>
                </div>
                
                <div class="content">
                    <h2 style="color: #0F172A; margin-top: 0;">Bonjour ${name},</h2>
                    
                    <p>Merci pour votre intérêt pour la formation <strong>${formationName}</strong>.</p>
                    <p>Votre demande a bien été enregistrée.</p>
                    
                    <div class="amount-box">
                        <div style="font-size: 14px; color: #64748B; margin-bottom: 5px;">MONTANT À PAYER</div>
                        <div class="amount">${amount.toLocaleString()} FCFA</div>
                    </div>
                    
                    <h3 style="color: #0F172A; margin-top: 30px;">🔹 Méthodes de paiement disponibles :</h3>
                    <!-- Logos de paiement mis à jour -->
                    
                    <div class="payment-methods">
                        <div class="payment-card">
                            <img src="data:image/png;base64,__WAVE_BASE64_PLACEHOLDER__" alt="Wave" style="height: 50px; width: 50px; object-fit: contain; margin-bottom: 10px; border-radius: 10px;">
                            <div class="payment-logo">Wave</div>
                            <div class="payment-number">70 492 52 39</div>
                        </div>
                        <div class="payment-card">
                            <img src="data:image/png;base64,__ORANGE_BASE64_PLACEHOLDER__" alt="Orange Money" style="height: 50px; width: 50px; object-fit: contain; margin-bottom: 10px; border-radius: 10px;">
                            <div class="payment-logo">Orange Money</div>
                            <div class="payment-number">70 492 52 39</div>
                        </div>
                    </div>
                    
                    <div class="instructions">
                        <h3 style="margin-top: 0; color: #B45309;">⏳ Après paiement :</h3>
                        
                        <div class="step">
                            <div class="step-number">1</div>
                            <div>Faites une <strong>capture d'écran</strong> de la transaction.</div>
                        </div>
                        
                        <div class="step">
                            <div class="step-number">2</div>
                            <div>Envoyez la preuve par <strong>WhatsApp : 70 492 52 39</strong> ou par <strong>email : eventskinder@gmail.com</strong></div>
                        </div>
                        
                        <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px;">
                            <p style="margin: 0; font-weight: 600; color: #0F172A;">⚠️ Important</p>
                            <p style="margin: 10px 0 0 0; font-size: 14px;">Votre inscription sera <strong>confirmée manuellement</strong> dans un délai de <strong>24h maximum</strong> après réception de votre preuve de paiement.</p>
                        </div>
                    </div>
                    
                    <p style="margin-top: 30px;">Vous avez des questions ? Contactez-nous sur WhatsApp au <strong>70 492 52 39</strong>.</p>
                    
                    <center>
                        <a href="https://wa.me/221704925239" class="btn">Contacter sur WhatsApp</a>
                    </center>
                </div>
                
                <div class="footer">
                    &copy; 2025 VisionR AI Agency. Tous droits réservés.<br>
                    Dakar, Sénégal
                </div>
            </div>
        </body>
        </html>
    `;
}
