import brevo from '@getbrevo/brevo';

// Initialize Brevo
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    'YOUR_BREVO_API_KEY_HERE' // À remplacer par votre clé API Brevo
);

export default async function handler(req, res) {
    // CORS configuration
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
        const { name, email, subject, details } = req.body;

        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = subject || `Nouvelle Inscription: ${name}`;
        sendSmtpEmail.sender = { name: 'VisionR System', email: 'noreply@visionr.com' };
        sendSmtpEmail.to = [{ email: 'lambassadegueye@gmail.com' }];
        sendSmtpEmail.htmlContent = `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h1>🚀 Nouvelle Demande Reçue</h1>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
          ${details}
        </div>
        <p style="color: #666; font-size: 12px;">Envoyé via VisionR System</p>
      </div>
    `;

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Brevo Error:', error);
        return res.status(400).json({ error: error.message });
    }
}
