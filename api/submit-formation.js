// Vercel Serverless Function pour gérer les soumissions du formulaire Formation
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Autoriser uniquement les requêtes POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    // Activer CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Gérer les requêtes OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { name, boutique, whatsapp, pack } = req.body;

        // Validation des données
        if (!name || !whatsapp || !pack) {
            return res.status(400).json({
                error: 'Données manquantes',
                message: 'Nom, WhatsApp et Pack sont requis'
            });
        }

        // Configuration du transporteur email avec Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Formater la date en timezone Dakar
        const date = new Date().toLocaleString('fr-FR', {
            timeZone: 'Africa/Dakar',
            dateStyle: 'full',
            timeStyle: 'short'
        });

        // Template de l'email
        const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; padding: 15px; background: white; border-left: 4px solid #667eea; border-radius: 5px; }
          .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
          .value { color: #333; font-size: 16px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎓 Nouvelle Inscription</h1>
            <p>BOOST E-COMMERCE IA</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">👤 Nom complet</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">🏪 Boutique</div>
              <div class="value">${boutique || 'Non spécifié'}</div>
            </div>
            <div class="field">
              <div class="label">📱 WhatsApp</div>
              <div class="value">${whatsapp}</div>
            </div>
            <div class="field">
              <div class="label">💼 Pack choisi</div>
              <div class="value">${pack === 'pro' ? 'Pack E-Commerce PRO (10 000 FCFA)' : 'Pack Standard (5 000 FCFA)'}</div>
            </div>
            <div class="field">
              <div class="label">📅 Date d'inscription</div>
              <div class="value">${date}</div>
            </div>
          </div>
          <div class="footer">
            <p>Email envoyé automatiquement depuis le formulaire de formation</p>
          </div>
        </div>
      </body>
      </html>
    `;

        // Options de l'email
        const mailOptions = {
            from: `"Formation BOOST E-COMMERCE IA" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // eventskinder@gmail.com
            subject: `🎓 Nouvelle Inscription - ${name}`,
            html: emailHTML,
            text: `
Nouvelle inscription - BOOST E-COMMERCE IA

Nom: ${name}
Boutique: ${boutique || 'Non spécifié'}
WhatsApp: ${whatsapp}
Pack choisi: ${pack === 'pro' ? 'Pack E-Commerce PRO (10 000 FCFA)' : 'Pack Standard (5 000 FCFA)'}
Date: ${date}
      `.trim()
        };

        // Envoyer l'email
        await transporter.sendMail(mailOptions);

        // Réponse de succès
        return res.status(200).json({
            success: true,
            message: 'Inscription enregistrée avec succès'
        });

    } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        return res.status(500).json({
            error: 'Erreur serveur',
            message: 'Une erreur est survenue lors de l\'envoi de votre inscription'
        });
    }
}
