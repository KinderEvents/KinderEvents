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
                            <img src="data:image/png;base64,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" alt="Wave" style="height: 50px; width: 50px; object-fit: contain; margin-bottom: 10px; border-radius: 10px;">
                            <div class="payment-logo">Wave</div>
                            <div class="payment-number">70 492 52 39</div>
                        </div>
                        <div class="payment-card">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAIABJREFUeF7t3Xn87XOdB/A37rUv11JdETG2ZBRDCw2jUQoVWaZkIiJLtttKpVJNlmSsNyqjZBplUiOS3eXa1xYRImSP6+Je13Znvr8Y272/3/mdz/l+z/dzPs/zeHj4457zWZ7vzznv11l+58wRETPDhQABAgQIEChKYA4BoKh62ywBAgQIEBgSEAAcBAIECBAgUKCAAFBg0W2ZAAECBAgIAM4AAQIECBAoUEAAKLDotkyAAAECBAQAZ4AAAQIECBQoIAAUWHRbJkCAAAECAoAzQIAAAQIEChQQAAosui0TIECAAAEBwBkgQIAAAQIFCggABRbdlgkQIECAgADgDBAgQIAAgQIFBIACi27LBAgQIEBAAHAGCBAgQIBAgQICQIFFt2UCBAgQICAAOAMECBAgQKBAAQGgwKLbMgECBAgQEACcAQIECBAgUKCAAFBg0W2ZAAECBAgIAM4AAQIECBAoUEAAKLDotkyAAAECBAQAZ4AAAQIECBQoIAAUWHRbJkCAAAECAoAzQIAAAQIEChQQAAosui0TIECAAAEBwBkgQIAAAQIFCggABRbdlgkQIECAgADgDBAgQIAAgQIFBIACi27LBAgQIEBAAHAGCBAgQIBAgQICQIFFt2UCBAgQICAAOAMECBAgQKBAAQGgwKLbMgECBAgQEACcAQIECBAgUKCAAFBg0W2ZAAECBAgIAM4AAQIECBAoUEAAKLDotkyAAAECBAQAZ4AAAQIECBQoIAAUWHRbJkCAAAECAoAzQIAAAQIEChQQAAosui0TIECAAAEBwBkgQIAAAQIFCggABRbdlgkQIECAgADgDBAgQIAAgQIFBIACi27LBAgQIEBAAHAGCBAgQIBAgQICQIFFt2UCBAgQICAAOAMECBAgQKBAAQGgwKLbMgECBAgQEACcAQIECBAgUKCAAFBg0W2ZAAECBAgIAM4AAQIECBAoUEAAKLDotkyAAAECBAQAZ4AAAQIECBQoIAAUWHRbJkCAAAECAoAzQIAAAQIEChQQAAosui0TIECAAAEBwBkgQIAAAQIFCggABRbdlgkQIECAgADgDBAgQIAAgQIFBIACi27LBAgQIEBAAHAGCBAgQIBAgQICQIFFt2UCBAgQICAAOAMECBAgQKBAAQGgwKLbMgECBAgQEACcAQIECBAgUKCAAFBg0W2ZAAECBAgIAM4AAQIECBAoUEAAKLDotkyAAAECBAQAZ4AAAQIECBQoIAAUWHRbJkCAAAECAoAzQIAAAQIEChQQAAosui0TIECAAAEBwBkgQIAAAQIFCggABRbdlgkQIECAgADgDBAgQIAAgQIFBIACi27LBAgQIEBAAHAGCBAgQIBAgQICQIFFt2UCBAgQICAAOAMECBAgQKBAAQGgwKLbMgECBAgQEACcAQIECBAgUKCAAFBg0W2ZAAECBAgIAM4AAQIECBAoUEAAKLDotkyAAAECBAQAZ4AAAQIECBQoIAAUWHRbJkCAAAECAoAzQIAAAQIEChQQAAosui0TIECAAAEBwBkgQIAAAQIFCggABRbdlgkQIECAgADgDBAgQIAAgQIFBIACi27LBAgQIEBAAHAGCBAgQIBAgQICQIFFt2UCBAgQICAAOAMECBAgQKBAAQGgwKLbMgECBAgQEACcAQIECBAgUKCAAFBg0W2ZAAECBAgIAM4AAQIECBAoUEAAKLDotkyAAAECBAQAZ4AAAQIECBQoIAAUWHRbJkCAAAECAoAzQIAAAQIEChQQAAosui0TIECAAAEBwBkgQIAAAQIFCggABRbdlgkQIECAgADgDBAgQIAAgQIFBIACi27LBAgQIEBAAHAGCBAgQIBAgQICQIFFt2UCBAgQICAAOAMECBAgQKBAAQGgwKLbMgECBAgQEACcAQIECBAgUKCAAFBg0W2ZAAECBAgIAM4AAQIECBAoUEAAKLDotkyAAAECBAQAZ4AAAQIECBQoIAAUWHRbJkCAAAECAoAzQIAAAQIEChQQAAosui0TIECAAAEBwBkgQIAAAQIFCggABRbdlgkQIECAgADgDBAgQIAAgQIFBIACi27LBAgQIEBAAHAGCBAgQIBAgQICQIFFt2UCBAgQICAAOAMECBAgQKBAAQGgwKLbMgECBAgQEACcAQIECBAgUKCAAFBg0W2ZAAECBAgIAM4AAQIECBAoUEAAKLDotkyAAAECBAQAZ4AAAQIECBQoIAAUWHRbJkCAAAECAoAzQIAAAQIEChQQAAosui0TIECAAAEBwBkgQIAAAQIFCggABRbdlgkQIECAgADgDBAgQIAAgQIFBIACi27LBAgQIEBAAHAGCBAgQIBAgQIC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irkCAQIECKQICAApeh3etno1oAoByy67bIwbNy7mnXfeeOKJJ2Lq1Klx++23xy233BIPPvhgh6O5GgECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgOwEBILuSWTABAgQIEEgXEADSDY1AgAABAgSyExAAsiuZBRMgQIAAgXQBASDd0AgECBAgQCA7AQEgu5JZMAECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgOwEBILuSWTABAgQIEEgXEADSDY1AgAABAgSyExAAsiuZBRMgQIAAgXQBASDd0AgECBAgQCA7AQEgu5JZMAECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgOwEBILuSWTABAgQIEEgXEADSDY1AgAABAgSyExAAsiuZBRMgQIAAgXQBASDd0AgECBAgQCA7AQEgu5JZMAECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgOwEBILuSWTABAgQIEEgXEADSDY1AgAABAgSyExAAsiuZBRMgQIAAgXQBASDd0AgECBAgQCA7AQEgu5JZMAECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgOwEBILuSWTABAgQIEEgXEADSDY1AgAABAgSyExAAsiuZBRMgQIAAgXQBASDd0AgECBAgQCA7AQEgu5JZMAECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgOwEBILuSWTABAgQIEEgXEADSDY1AgAABAgSyExAAsiuZBRMgQIAAgXQBASDd0AgECBAgQCA7AQEgu5JZMAECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgOwEBILuSWTABAgQIEEgXEADSDY1AgAABAgSyExAAsiuZBRMgQIAAgXQBASDd0AgECBAgQCA7AQEgu5JZMAECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgOwEBILuSWTABAgQIEEgXEADSDY1AgAABAgSyExAAsiuZBRMgQIAAgXQBASDd0AgECBAgQCA7AQEgu5JZMAECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgOwEBILuSWTABAgQIEEgXEADSDY1AgAABAgSyExAAsiuZBRMgQIAAgXQBASDd0AgECBAgQCA7AQEgu5JZMAECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgOwEBILuSWTABAgQIEEgXEADSDY1AgAABAgSyExAAsiuZBRMgQIAAgXQBASDd0AgECBAgQCA7AQEgu5JZMAECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgOwEBILuSWTABAgQIEEgXEADSDY1AgAABAgSyExAAsiuZBRMgQIAAgXQBASDd0AgECBAgQCA7AQEgu5JZMAECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgOwEBILuSWTABAgQIEEgXEADSDY1AgAABAgSyExAAsiuZBRMgQIAAgXQBASDd0AgECBAgQCA7AQEgu5JZMAECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgOwEBILuSWTABAgQIEEgXEADSDY1AgAABAgSyExAAsiuZBRMgQIAAgXQBASDd0AgECBAgQCA7AQEgu5JZMAECBAgQSBcQANINjUCAAAECBLITEACyK5kFEyBAgACBdAEBIN3QCAQIECBAIDsBASC7klkwAQIECBBIFxAA0g2NQIAAAQIEshMQALIrmQUTIECAAIF0AQEg3dAIBAgQIEAgO4H/BS+rC9NPpHrzAAAAAElFTkSuQmCC" alt="Orange Money" style="height: 50px; width: 50px; object-fit: contain; margin-bottom: 10px; border-radius: 10px;">
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
