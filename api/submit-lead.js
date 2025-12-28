import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Allow only POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const {
            visitorType, // 'entrepreneur', 'company', etc.
            services, // Array of selected services
            contactInfo // { name, email, phone/whatsapp, projectDetails }
        } = req.body;

        // Basic Validation
        if (!contactInfo || !contactInfo.name || (!contactInfo.email && !contactInfo.whatsapp)) {
            return res.status(400).json({
                error: 'Missing required information',
                message: 'Name and either Email or WhatsApp are required.'
            });
        }

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const date = new Date().toLocaleString('fr-FR', {
            timeZone: 'Africa/Dakar',
            dateStyle: 'full',
            timeStyle: 'short'
        });

        // Formatting services list
        const servicesList = services && services.length > 0
            ? services.map(s => `<li>${s}</li>`).join('')
            : '<li><i>Aucun service spécifique sélectionné</i></li>';

        const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #000000 0%, #434343 100%); color: #ffffff; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
          .content { padding: 30px; }
          .section { margin-bottom: 25px; border-bottom: 1px solid #eeeeee; padding-bottom: 15px; }
          .section:last-child { border-bottom: none; }
          .label { font-size: 12px; text-transform: uppercase; color: #888; letter-spacing: 1px; margin-bottom: 5px; font-weight: 600; }
          .value { font-size: 16px; color: #000; font-weight: 500; }
          .highlight { color: #2563eb; font-weight: 600; }
          ul { margin: 5px 0 0 0; padding-left: 20px; }
          li { margin-bottom: 5px; }
          .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 Nouveau Lead Interactif</h1>
            <p>VisionR Studio Assistant</p>
          </div>
          <div class="content">
            <div class="section">
              <div class="label">Profil Visiteur</div>
              <div class="value highlight">${visitorType || 'Non spécifié'}</div>
            </div>

            <div class="section">
              <div class="label">Services Intéressés</div>
              <div class="value">
                <ul>${servicesList}</ul>
              </div>
            </div>

            <div class="section">
              <div class="label">Contact</div>
              <div class="value">
                <strong>Nom:</strong> ${contactInfo.name}<br>
                <strong>Email:</strong> ${contactInfo.email || '-'}<br>
                <strong>WhatsApp:</strong> ${contactInfo.whatsapp || '-'}<br>
              </div>
            </div>

            ${contactInfo.projectDetails ? `
            <div class="section">
              <div class="label">Détails du Projet</div>
              <div class="value">${contactInfo.projectDetails}</div>
            </div>
            ` : ''}

            <div class="section">
               <div class="label">Date de soumission</div>
               <div class="value">${date}</div>
            </div>
          </div>
          <div class="footer">
            <p>Envoyé via l'Assistant Interactif VisionR</p>
          </div>
        </div>
      </body>
      </html>
    `;

        // Mail Options
        const mailOptions = {
            from: `"VisionR Assistant" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `🔥 Nouveau Lead: ${contactInfo.name} (${visitorType || 'Prospect'})`,
            html: emailHTML,
            text: `Nouveau Lead VisionR:\nNom: ${contactInfo.name}\nType: ${visitorType}\nEmail: ${contactInfo.email}\nWhatsApp: ${contactInfo.whatsapp}\nServices: ${services ? services.join(', ') : 'Aucun'}`
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: 'Lead received and email sent successfully.'
        });

    } catch (error) {
        console.error('Error sending lead email:', error);
        return res.status(500).json({
            error: 'Server Error',
            message: 'Failed to process lead submission.'
        });
    }
}
