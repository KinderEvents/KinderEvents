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

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email required' });
    }

    try {
        // 1. Save to Supabase
        const { error: dbError } = await supabase
            .from('newsletter_subscribers')
            .insert([{ email, created_at: new Date() }]);

        // Handle duplicate email (code 23505 = unique constraint violation)
        if (dbError) {
            if (dbError.code === '23505') {
                return res.status(200).json({ success: true, message: 'Déjà inscrit', duplicate: true });
            }
            console.error('Supabase Error:', dbError);
            throw new Error('Erreur lors de l\'inscription');
        }

        // 2. Send Welcome Email (Prestige Template)
        try {
            await transporter.sendMail({
                from: `"VisionR News" <${EMAIL_USER}>`,
                to: email,
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
                            .footer { background-color: #F1F5F9; padding: 20px; text-align: center; color: #94A3B8; font-size: 12px; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <div class="logo-text">Vision<span class="logo-accent">R</span></div>
                                <div style="color: #64748B; font-size: 12px; margin-top: 5px; letter-spacing: 1px;">NEWSLETTER</div>
                            </div>
                            <div class="content">
                                <h1 class="h1">Merci de votre confiance.</h1>
                                <p>Bonjour,</p>
                                <p>Vous faites maintenant partie des entrepreneurs qui ont une longueur d'avance.</p>
                                
                                <div class="highlight-box">
                                    <p style="margin: 0; font-weight: 600; color: #B45309;">💡 Ce que vous allez recevoir :</p>
                                    <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #B45309;">
                                        <li>Analyses de tendances IA</li>
                                        <li>Astuces "Gain de temps" concrètes</li>
                                        <li>Offres exclusives de l'agence</li>
                                    </ul>
                                </div>

                                <p>Surveillez votre boîte mail, le premier numéro arrive bientôt.</p>
                            </div>
                            <div class="footer">
                                &copy; 2025 VisionR AI Agency. Tous droits réservés.<br>
                                <a href="#" style="color: #64748B; text-decoration: none;">Se désabonner</a>
                            </div>
                        </div>
                    </body>
                    </html>
                `
            });
            console.log('Newsletter Welcome Sent:', email);
        } catch (emailErr) {
            console.error('Email Sending Error:', emailErr);
        }

        return res.status(200).json({ success: true, message: 'Inscrit avec succès' });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
