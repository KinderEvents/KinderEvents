import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Securely initialized on the server
const SUPABASE_URL = 'https://aoeoctlxlgdrbyxerivr.supabase.co';
const SUPABASE_KEY = 'sb_secret_00zeaz7eUL7oI6bmP0sARg_1IWZ5FZt'; // Verified Secret Key

// Email Configuration (Gmail App Password)
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
    // CORS configuration for local dev and production
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
        const { full_name, email, whatsapp, project_name, pack_type, price } = req.body;

        if (!full_name || !whatsapp) {
            return res.status(400).json({ error: 'Name and WhatsApp are required' });
        }

        // 1. Insert into Supabase
        const { data, error } = await supabase
            .from('registrations')
            .insert([
                {
                    full_name,
                    email: email || '',
                    whatsapp,
                    project_name: project_name || '',
                    pack_type,
                    price,
                    created_at: new Date()
                }
            ])
            .select();

        if (error) {
            console.error('Supabase Insert Error:', error);
            throw error;
        }

        // 2. Send Welcome Email (Newsletter / Confirmation)
        if (email) {
            try {
                await transporter.sendMail({
                    from: `"VisionR Support" <${EMAIL_USER}>`,
                    to: email, // Send to the user
                    subject: "✨ Bienvenue dans le Cercle VisionR",
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
                                .highlight-box { background-color: #FFFBEB; border-left: 4px solid #F59E0B; padding: 20px; margin: 25px 0; border-radius: 4px; }
                                .button { display: inline-block; background: linear-gradient(135deg, #2563EB, #1D4ED8); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: 600; margin-top: 10px; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3); }
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
                                    <h1 class="h1">Félicitations, l'aventure commence.</h1>
                                    <p>Bonjour <strong>${full_name}</strong>,</p>
                                    <p>Nous confirmons la réception de votre inscription pour <strong>${pack_type}</strong>. Vous venez de faire le premier pas vers une transformation digitale majeure.</p>
                                    
                                    <div class="highlight-box">
                                        <p style="margin: 0; font-weight: 600; color: #B45309;">🚀 Prochaine étape immédiate</p>
                                        <p style="margin: 10px 0 0 0;">Notre équipe d'experts va analyser votre dossier et vous contacter sur WhatsApp au <strong>${whatsapp}</strong> sous 24h.</p>
                                    </div>

                                    <p>En attendant, préparez-vous à voir votre business sous un nouvel angle.</p>
                                    
                                    <center style="margin-top: 30px;">
                                        <a href="https://www.instagram.com/ecstasy_23d?igsh=MTdoMzdqMHkwdzhmbA%3D%3D&utm_source=qr" class="button">Découvrir nos réalisations (Instagram)</a>
                                        <div style="margin-top: 20px;">
                                            <a href="https://wa.me/221704925239" style="color: #2563EB; text-decoration: none; font-weight: 600;">Ou écrivez-nous sur WhatsApp</a>
                                        </div>
                                    </center>
                                </div>
                                <div class="footer">
                                    &copy; 2025 VisionR AI Agency. Tous droits réservés.<br>
                                    Dakar, Sénégal
                                </div>
                            </div>
                        </body>
                        </html>
                    `
                });
                console.log('Welcome email sent to:', email);
            } catch (emailErr) {
                console.error('Email Sending Error:', emailErr);
                // Non-blocking error
            }
        }

        return res.status(200).json({ success: true, data });

    } catch (error) {
        console.error('Registration API Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
