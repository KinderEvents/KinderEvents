import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Securely initialized on the server
const SUPABASE_URL = 'https://aoeoctlxlgdrbyxerivr.supabase.co';
const SUPABASE_KEY = 'sb_secret_00zeaz7eUL7oI6bmP0sARg_1IWZ5FZt'; // Verified Secret Key

// Email Configuration
const EMAIL_USER = 'eventskinder@gmail.com';
const EMAIL_PASS = 'sqsi trur myip lszy';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

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
        const { full_name, company_name, email, whatsapp, service_type, budget_range } = req.body;

        // 1. Save to Supabase (agency_leads table)
        const { error } = await supabase
            .from('agency_leads')
            .insert([
                {
                    full_name,
                    company_name,
                    email,
                    whatsapp,
                    service_type,
                    budget_range,
                    created_at: new Date()
                }
            ]);

        if (error) {
            console.error('Supabase Error:', error);
            throw error;
        }

        // 2. Send Notifications

        // A. Admin Notification (Simple Text)
        try {
            await transporter.sendMail({
                from: `"VisionR Bot" <${EMAIL_USER}>`,
                to: EMAIL_USER, // Admin receives notification
                subject: `💼 NOUVEAU LEAD: ${service_type}`,
                html: `
                    <h3>Nouveau contact reçu</h3>
                    <p><strong>Nom:</strong> ${full_name}</p>
                    <p><strong>Entr.:</strong> ${company_name}</p>
                    <p><strong>Service:</strong> ${service_type}</p>
                    <p><strong>Budget:</strong> ${budget_range}</p>
                    <p><strong>WhatsApp:</strong> ${whatsapp}</p>
                    <p><strong>Email:</strong> ${email}</p>
                `
            });
        } catch (e) { console.error("Admin mail error", e); }


        // B. Client Confirmation (Prestige Template)
        if (email) {
            try {
                await transporter.sendMail({
                    from: `"VisionR System" <${EMAIL_USER}>`,
                    to: email,
                    subject: "✨ Demande reçue : VisionR prend le relais",
                    html: `
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
                                .h1 { color: #0F172A; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 20px; }
                                .detail-row { display: flex; justify-content: space-between; border-bottom: 1px solid #E2E8F0; padding: 10px 0; font-size: 0.95rem; }
                                .footer { background-color: #F1F5F9; padding: 20px; text-align: center; color: #94A3B8; font-size: 12px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <div class="logo-text">Vision<span class="logo-accent">R</span></div>
                                    <div style="color: #64748B; font-size: 12px; margin-top: 5px; letter-spacing: 1px;">AGENCE IA PREMIUM</div>
                                </div>
                                <div class="content">
                                    <h1 class="h1">Merci ${full_name}.</h1>
                                    <p>Nous avons bien reçu votre demande pour le service <strong>${service_type}</strong>.</p>
                                    <p>Notre équipe analyse actuellement votre besoin pour voir comment nous pouvons propulser <strong>${company_name || 'votre projet'}</strong>.</p>
                                    
                                    <div style="margin: 30px 0; background-color: #F8FAFC; padding: 20px; border-radius: 8px;">
                                        <div class="detail-row">
                                            <span style="color: #64748B;">Service demandé</span>
                                            <span style="font-weight: 600; color: #0F172A;">${service_type}</span>
                                        </div>
                                        <div class="detail-row" style="border-bottom: none;">
                                            <span style="color: #64748B;">Budget estimé</span>
                                            <span style="font-weight: 600; color: #0F172A;">${budget_range}</span>
                                        </div>
                                    </div>

                                    <p><strong>Prochaine étape :</strong> Un expert vous contactera sur WhatsApp (${whatsapp}) sous 24h ouvrées.</p>

                                </div>
                                <div class="footer">
                                    &copy; 2025 VisionR AI Agency. Tous droits réservés.
                                </div>
                            </div>
                        </body>
                        </html>
                    `
                });
                console.log('Contact confirmation sent:', email);
            } catch (emailErr) {
                console.error('Email Sending Error:', emailErr);
            }
        }

        return res.status(200).json({ success: true, message: 'Demande enregistrée' });

    } catch (error) {
        console.error('API Contact Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
