import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Initialize Supabase
const supabase = createClient(
    'https://aoeoctlxlgdrbyxerivr.supabase.co',
    'sb_secret_00zeaz7eUL7oI6bmP0sARg_1IWZ5FZt' // Use Secret Key for writing to payments table securely
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
 * PayDunya IPN (Instant Payment Notification) Endpoint
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

    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const {
            transaction_id, status, amount, currency,
            customer_name, customer_email, customer_phone,
            custom_data, payment_method, receipt_url
        } = req.method === 'POST' ? req.body : req.query;

        console.log('📥 PayDunya IPN reçu:', { transaction_id, status, amount });

        if (!transaction_id) return res.status(400).json({ error: 'Transaction ID manquant' });

        // 1. Enregistrer la transaction dans Supabase
        const { error: paymentError } = await supabase
            .from('payments')
            .upsert([
                {
                    transaction_id,
                    status: status || 'pending',
                    amount: parseFloat(amount) || 0,
                    currency: currency || 'XOF',
                    customer_name,
                    customer_email,
                    customer_phone,
                    payment_method,
                    receipt_url,
                    custom_data,
                    confirmed_at: status === 'completed' ? new Date() : null,
                    created_at: new Date()
                }
            ], { onConflict: 'transaction_id' });

        if (paymentError) console.error('❌ Erreur Supabase:', paymentError);

        // 2. Si confirmé, envoyer email et mettre à jour records
        if (status === 'completed') {
            console.log('✅ Paiement confirmé pour:', customer_email);

            // Update registration/lead logic...
            if (custom_data) {
                try {
                    const customInfo = JSON.parse(custom_data);
                    if (customInfo.type === 'formation') {
                        await supabase.from('registrations').update({ payment_status: 'paid', payment_id: transaction_id, paid_at: new Date() }).eq('email', customer_email).eq('pack_type', customInfo.pack);
                    }
                    if (customInfo.type === 'service') {
                        await supabase.from('agency_leads').update({ payment_status: 'paid', payment_id: transaction_id, paid_at: new Date() }).eq('email', customer_email);
                    }
                } catch (e) {
                    console.error('Erreur parsing custom_data:', e);
                }
            }

            // ENVOI EMAIL REÇU DE PAIEMENT
            try {
                // 1. Send Receipt
                await transporter.sendMail({
                    from: `"VisionR Finance" <${EMAIL_USER}>`,
                    to: customer_email,
                    subject: "✅ Paiement Confirmé - VisionR",
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 0; }
                                .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
                                .header { background-color: #0F172A; padding: 40px 20px; text-align: center; }
                                .logo-text { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 2px; }
                                .content { padding: 40px 30px; color: #334155; }
                                .receipt-box { background-color: #ECFDF5; border: 1px solid #10B981; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
                                .amount { font-size: 24px; font-weight: 800; color: #047857; }
                                .footer { background-color: #F1F5F9; padding: 20px; text-align: center; color: #94A3B8; font-size: 12px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <div class="logo-text">Vision<span style="color: #F59E0B;">R</span></div>
                                </div>
                                <div class="content">
                                    <h2>Paiement reçu avec succès</h2>
                                    <p>Bonjour ${customer_name},</p>
                                    <p>Nous vous confirmons la bonne réception de votre paiement.</p>
                                    
                                    <div class="receipt-box">
                                        <div style="font-size: 14px; color: #047857; margin-bottom: 5px;">MONTANT PAYÉ</div>
                                        <div class="amount">${amount} ${currency}</div>
                                        <div style="font-size: 12px; margin-top: 10px; color: #64748B;">ID: ${transaction_id}</div>
                                    </div>

                                    <p>Merci pour votre confiance. Un e-mail de bienvenue avec vos accès vient de vous être envoyé.</p>
                                </div>
                                <div class="footer">
                                    &copy; 2025 VisionR AI Agency
                                </div>
                            </div>
                        </body>
                        </html>
                    `
                });

                // 2. Send Welcome Email (only if it's a formation)
                let customInfo = {};
                try { customInfo = JSON.parse(custom_data); } catch (e) { }

                if (customInfo.type === 'formation') {
                    await transporter.sendMail({
                        from: `"VisionR Support" <${EMAIL_USER}>`,
                        to: customer_email,
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
                                        <p>Bonjour <strong>${customer_name}</strong>,</p>
                                        <p>Votre paiement a été validé ! Votre inscription pour <strong>${customInfo.pack || 'Formation VisionR'}</strong> est désormais officielle.</p>
                                        
                                        <div class="highlight-box">
                                            <p style="margin: 0; font-weight: 600; color: #B45309;">🚀 Prochaine étape immédiate</p>
                                            <p style="margin: 10px 0 0 0;">Notre équipe d'experts va vous contacter sur WhatsApp au <strong>${customer_phone || 'votre numéro'}</strong> sous 24h pour vous donner vos accès.</p>
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
                }

                console.log('Confirmation emails sent to:', customer_email);
            } catch (emailErr) {
                console.error('Email error:', emailErr);
            }
        }

        return res.status(200).json({ success: true, message: 'IPN traité' });

    } catch (error) {
        console.error('❌ Erreur IPN:', error);
        return res.status(200).json({ success: false, error: error.message });
    }
}
