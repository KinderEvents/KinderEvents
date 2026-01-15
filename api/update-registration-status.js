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
                        currentReg.whatsapp,
                        currentReg.id // Add ID for the badge
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
function generateConfirmationEmail(name, formationName, whatsapp, id = 0) {
    const formattedId = id.toString().padStart(6, '0');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
                .header { background-color: #0F172A; padding: 40px 20px; text-align: center; }
                .logo-text { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
                .logo-accent { color: #F59E0B; }
                .content { padding: 40px 30px; color: #334155; line-height: 1.6; }
                .h1 { color: #0F172A; font-size: 24px; font-weight: 800; margin-top: 0; margin-bottom: 10px; text-align: center; }
                .subtitle { text-align: center; color: #64748B; margin-bottom: 30px; }
                
                /* BADGE DESIGN */
                .badge-container {
                    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
                    border: 2px solid #D4AF37;
                    border-radius: 12px;
                    padding: 2px;
                    margin: 30px 0;
                    position: relative;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                }
                .badge-inner {
                    background: #0F172A;
                    border: 1px dashed #475569;
                    border-radius: 10px;
                    padding: 25px;
                    text-align: center;
                    color: white;
                    background-image: radial-gradient(#334155 1px, transparent 1px);
                    background-size: 20px 20px;
                }
                .badge-header {
                    color: #D4AF37;
                    font-size: 12px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    margin-bottom: 15px;
                    font-weight: 700;
                }
                .badge-name {
                    font-size: 28px;
                    font-weight: 800;
                    background: linear-gradient(to right, #F59E0B, #D4AF37, #F59E0B);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    color: #D4AF37;
                    margin: 10px 0;
                    text-transform: uppercase;
                }
                .badge-formation {
                    font-size: 16px;
                    color: #94A3B8;
                    margin-bottom: 20px;
                }
                .badge-footer {
                    border-top: 1px solid #334155;
                    padding-top: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 10px;
                    color: #64748B;
                }
                .verified-icon {
                    color: #10B981;
                    font-size: 14px;
                    margin-right: 5px;
                }
                
                .button { display: inline-block; background: #0F172A; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: 600; margin-top: 20px; }
                .footer { background-color: #F1F5F9; padding: 20px; text-align: center; color: #94A3B8; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo-text">Vision<span class="logo-accent">R</span></div>
                </div>
                <div class="content">
                    <h1 class="h1">FÉLICITATIONS !</h1>
                    <p class="subtitle">Votre inscription est officiellement confirmée.</p>
                    
                    <p>Bonjour <strong>${name}</strong>,</p>
                    <p>Nous avons bien reçu votre paiement. Vous faites désormais partie de l'élite VisionR.</p>
                    <p>Voici votre badge d'accès officiel :</p>
                    
                    <!-- OFFICIAL BADGE -->
                    <div class="badge-container">
                        <div class="badge-inner">
                            <div class="badge-header">★ MEMBRE OFFICIEL ★</div>
                            <div class="badge-name">${name}</div>
                            <div class="badge-formation">${formationName || 'Formation IA'}</div>
                            
                            <div class="badge-footer">
                                <div>ID: #${formattedId}</div>
                                <div><span class="verified-icon">✓</span> PAIEMENT VALIDÉ</div>
                            </div>
                        </div>
                    </div>
                    
                    <p style="text-align: center; margin-top: 30px;">
                        Notre équipe vous contactera très prochainement sur WhatsApp au <strong>${whatsapp}</strong> pour vous transmettre vos accès.
                    </p>
                    
                    <center>
                        <a href="https://visionr-studio-git-master-ecstasys-projects-90a34c79.vercel.app" class="button">Accéder au site</a>
                    </center>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} VisionR AI Agency. Tous droits réservés.
                </div>
            </div>
        </body>
        </html>
    `;
}
