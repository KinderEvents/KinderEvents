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
 * API Endpoint: Update Registration Status
 * Handles status transitions and sends confirmation emails
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
        const { registration_id, new_status, payment_proof_url } = req.body;

        // Validation
        if (!registration_id || !new_status) {
            return res.status(400).json({
                error: 'Données manquantes',
                message: 'ID d\'inscription et nouveau statut requis'
            });
        }

        // Validate status transition
        const validStatuses = ['demande_recue', 'paiement_envoye', 'inscription_confirmee'];
        if (!validStatuses.includes(new_status)) {
            return res.status(400).json({
                error: 'Statut invalide',
                message: 'Le statut doit être: demande_recue, paiement_envoye, ou inscription_confirmee'
            });
        }

        // Get current registration
        const { data: currentReg, error: fetchError } = await supabase
            .from('registrations')
            .select('*')
            .eq('id', registration_id)
            .single();

        if (fetchError || !currentReg) {
            return res.status(404).json({
                error: 'Inscription non trouvée',
                message: 'Aucune inscription trouvée avec cet ID'
            });
        }

        // Prepare update data
        const updateData = {
            status: new_status,
            updated_at: new Date()
        };

        // Add payment proof URL if provided
        if (payment_proof_url) {
            updateData.payment_proof_url = payment_proof_url;
        }

        // Add confirmation timestamp if confirming
        if (new_status === 'inscription_confirmee') {
            updateData.confirmed_at = new Date();
        }

        // Update registration
        const { data, error } = await supabase
            .from('registrations')
            .update(updateData)
            .eq('id', registration_id)
            .select();

        if (error) {
            console.error('Supabase Update Error:', error);
            throw error;
        }

        console.log('✅ Statut mis à jour:', data);

        // Send confirmation email if inscription confirmed
        if (new_status === 'inscription_confirmee' && currentReg.email) {
            try {
                await transporter.sendMail({
                    from: `"VisionR Formations" <${EMAIL_USER}>`,
                    to: currentReg.email,
                    subject: `✅ Inscription confirmée - ${currentReg.formation_type}`,
                    html: generateConfirmationEmail(
                        currentReg.full_name,
                        currentReg.formation_type,
                        currentReg.whatsapp
                    )
                });

                console.log('✅ Email de confirmation envoyé à:', currentReg.email);
            } catch (emailErr) {
                console.error('⚠️ Erreur envoi email (non bloquant):', emailErr);
            }
        }

        return res.status(200).json({
            success: true,
            message: `Statut mis à jour: ${new_status}`,
            data
        });

    } catch (error) {
        console.error('❌ Update Status API Error:', error);
        return res.status(500).json({
            error: 'Erreur serveur',
            message: 'Une erreur est survenue lors de la mise à jour'
        });
    }
}

/**
 * Generate Confirmation Email Template
 */
function generateConfirmationEmail(name, formationName, whatsapp) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
                .header { background: linear-gradient(135deg, #10B981, #059669); padding: 40px 20px; text-align: center; }
                .logo-text { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 2px; }
                .content { padding: 40px 30px; color: #334155; line-height: 1.6; }
                .success-badge { background: #ECFDF5; border: 2px solid #10B981; padding: 20px; border-radius: 12px; text-align: center; margin: 25px 0; }
                .checkmark { font-size: 48px; color: #10B981; margin-bottom: 10px; }
                .info-box { background: #F8FAFC; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #E2E8F0; }
                .info-label { color: #64748B; font-weight: 500; }
                .info-value { color: #0F172A; font-weight: 600; }
                .footer { background-color: #F1F5F9; padding: 20px; text-align: center; color: #94A3B8; font-size: 12px; }
                .btn { display: inline-block; background: #2563EB; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo-text">Vision<span style="color: #F59E0B;">R</span></div>
                    <div style="color: rgba(255,255,255,0.9); margin-top: 8px; font-size: 14px;">Formations Professionnelles</div>
                </div>
                
                <div class="content">
                    <div class="success-badge">
                        <div class="checkmark">✅</div>
                        <h2 style="margin: 10px 0; color: #10B981;">Paiement reçu !</h2>
                        <p style="margin: 5px 0; color: #64748B;">Votre inscription est maintenant confirmée</p>
                    </div>
                    
                    <h3 style="color: #0F172A;">Bonjour ${name},</h3>
                    
                    <p>Félicitations ! Votre inscription à <strong>${formationName}</strong> est maintenant <strong>confirmée</strong>.</p>
                    
                    <div class="info-box">
                        <h4 style="margin-top: 0; color: #0F172A;">📅 Détails de la formation</h4>
                        <div class="info-row">
                            <span class="info-label">Formation</span>
                            <span class="info-value">${formationName}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Date</span>
                            <span class="info-value">À confirmer prochainement</span>
                        </div>
                        <div class="info-row" style="border-bottom: none;">
                            <span class="info-label">Lieu / Lien</span>
                            <span class="info-value">Envoyé par WhatsApp</span>
                        </div>
                    </div>
                    
                    <div style="background: #FFFBEB; border-left: 4px solid #F59E0B; padding: 20px; margin: 25px 0; border-radius: 4px;">
                        <h4 style="margin-top: 0; color: #B45309;">🚀 Prochaines étapes</h4>
                        <p style="margin: 0;">Notre équipe va vous contacter sur WhatsApp au <strong>${whatsapp}</strong> sous 24h pour vous donner vos accès et les détails de la formation.</p>
                    </div>
                    
                    <p style="margin-top: 30px;">Bienvenue dans la formation ! 🎓</p>
                    
                    <center>
                        <a href="https://wa.me/221704925239" class="btn">Rejoindre le groupe WhatsApp</a>
                    </center>
                    
                    <p style="margin-top: 30px; font-size: 14px; color: #64748B;">
                        Des questions ? Contactez-nous à tout moment sur WhatsApp ou par email.
                    </p>
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
