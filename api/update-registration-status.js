import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

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

        // Add payment method if provided (requires migration to allow this column)
        const { payment_method } = req.body;
        if (payment_method) {
            updateData.payment_method = payment_method;
        }

        // Add confirmation timestamp if confirming
        if (new_status === 'inscription_confirmee') {
            updateData.confirmed_at = new Date();
        }

        // Update registration
        let data, error;
        try {
            const result = await supabase
                .from('registrations')
                .update(updateData)
                .eq('id', registration_id)
                .select();
            data = result.data;
            error = result.error;
        } catch (err) {
            console.error('Database Update Exception:', err);
        }

        if (error) {
            console.warn('Initial update failed:', error.message);
            // Retry logic for missing column
            if (updateData.payment_method) {
                console.warn('Retrying update without payment_method column...');
                delete updateData.payment_method;
                const retry = await supabase
                    .from('registrations')
                    .update(updateData)
                    .eq('id', registration_id)
                    .select();
                data = retry.data;
                error = retry.error;
            }
        }

        if (error) {
            console.error('Supabase Update Error:', error);
            throw error;
        }

        console.log('✅ Statut mis à jour:', data);

        // Send confirmation email if inscription confirmed
        if (new_status === 'inscription_confirmee' && currentReg.email) {
            try {
                // Generate PDF Buffer
                const pdfBuffer = await generateTicketPDF(currentReg);

                await transporter.sendMail({
                    from: `"VisionR Formations" <${EMAIL_USER}>`,
                    to: currentReg.email,
                    subject: `✅ Inscription confirmée - ${currentReg.formation_type}`,
                    html: generateConfirmationEmail(
                        currentReg.full_name,
                        currentReg.formation_type,
                        currentReg.whatsapp,
                        currentReg.id
                    ),
                    attachments: [
                        {
                            filename: `VisionR-Ticket-${currentReg.id}.pdf`,
                            content: pdfBuffer,
                            contentType: 'application/pdf'
                        }
                    ]
                });

                console.log('✅ Email de confirmation envoyé avec PDF à:', currentReg.email);
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
            message: error.message || 'Une erreur est survenue lors de la mise à jour',
            details: error
        });
    }
}

/**
 * Generate PDF Service using PDFKit
 */
async function generateTicketPDF(registration) {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = new PDFDocument({ size: 'A5', margin: 0 });
            const buffers = [];

            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));

            // Colors
            const darkBlue = '#0F172A';
            const lighterBlue = '#1E293B';
            const gold = '#D4AF37';
            const white = '#F1F5F9';
            const slate = '#94A3B8';

            // Background
            doc.rect(0, 0, doc.page.width, doc.page.height).fill(darkBlue);

            // Card Container
            doc.roundedRect(20, 40, doc.page.width - 40, doc.page.height - 80, 10).fill(lighterBlue);

            // Decorative Border
            doc.lineWidth(2).strokeColor(gold).opacity(0.3)
                .roundedRect(25, 45, doc.page.width - 50, doc.page.height - 90, 8).stroke().opacity(1);

            // Header
            doc.fontSize(24).fillColor(gold).font('Helvetica-Bold')
                .text('VISIONR EVENT', 0, 70, { align: 'center' });

            doc.fontSize(10).fillColor(slate).font('Helvetica')
                .text('BILLET OFFICIEL DE FORMATION', 0, 100, { align: 'center' });

            // Fetch and Embed QR Code
            try {
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://visionr-studio.vercel.app/verify/${registration.id}&color=000000&bgcolor=FFFFFF&margin=2`;
                const qrResponse = await fetch(qrUrl);
                const qrArrayBuffer = await qrResponse.arrayBuffer();
                const qrBuffer = Buffer.from(qrArrayBuffer);

                // Embed QR Image
                doc.image(qrBuffer, (doc.page.width - 100) / 2, 130, { width: 100 });
            } catch (err) {
                console.error("Failed to fetch QR for PDF:", err);
            }

            // Status Badge
            doc.rect((doc.page.width - 100) / 2, 240, 100, 25).fill('#064E3B');
            doc.fontSize(12).fillColor('#34D399').font('Helvetica-Bold')
                .text('CONFIRMÉ', 0, 247, { align: 'center' });

            // Details
            const startY = 290;
            const leftX = 40;

            doc.fontSize(9).fillColor(slate).text('PARTICIPANT', leftX, startY);
            doc.fontSize(16).fillColor(white).font('Helvetica-Bold').text(registration.full_name, leftX, startY + 15);

            doc.fontSize(9).fillColor(slate).font('Helvetica').text('FORMATION', leftX, startY + 50);
            doc.fontSize(14).fillColor(gold).font('Helvetica-Bold').text(registration.formation_type, leftX, startY + 65, { width: doc.page.width - 80 });

            // Footer
            doc.moveTo(40, 450).lineTo(doc.page.width - 40, 450).strokeColor(slate).lineWidth(1).stroke();

            doc.fontSize(9).fillColor(slate).font('Helvetica')
                .text(`Date Validation: ${new Date(registration.confirmed_at || new Date()).toLocaleDateString()}`, leftX, 465);

            doc.text(`ID Ticket: #${registration.id.toString().padStart(6, '0')}`, leftX, 465, { align: 'right', width: doc.page.width - 80 });

            doc.end();

        } catch (err) {
            reject(err);
        }
    });
}

function generateConfirmationEmail(name, formationName, whatsapp, id = 0) {
    const formattedId = id.toString().padStart(6, '0');
    // Using the public production domain
    const baseUrl = 'https://visionr-studio.vercel.app';
    const verifyUrl = `${baseUrl}/verify/${id}`;
    const year = new Date().getFullYear();

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { margin: 0; padding: 0; background-color: #0F172A; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #F1F5F9; }
                .wrapper { width: 100%; table-layout: fixed; background-color: #0F172A; padding-bottom: 40px; }
                .main { background-color: #1E293B; margin: 0 auto; width: 100%; max-width: 600px; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.3); border: 1px solid #334155; }
                .header { background: radial-gradient(circle at center, #1E293B 0%, #0F172A 100%); padding: 40px 20px; text-align: center; border-bottom: 2px solid #D4AF37; }
                .logo-text { color: #D4AF37; font-size: 24px; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; margin: 0; }
                .content { padding: 40px 30px; text-align: center; }
                .h1 { color: #F1F5F9; font-size: 24px; font-weight: 800; margin: 0 0 15px 0; line-height: 1.4; }
                .p { color: #94A3B8; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0; }
                .highlight { color: #D4AF37; font-weight: bold; }
                .box-info { background: #0F172A; border-left: 4px solid #D4AF37; padding: 20px; text-align: left; border-radius: 8px; margin: 30px 0; }
                .box-label { color: #64748B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
                .box-value { color: #F1F5F9; font-size: 18px; font-weight: bold; }
                .cta-button { display: inline-block; background: #D4AF37; color: #0F172A; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: bold; font-size: 16px; text-transform: uppercase; margin: 20px 0; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3); }
                .footer { text-align: center; padding: 20px; color: #475569; font-size: 12px; border-top: 1px solid #334155; background: #020617; }
                .pdf-note { background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.3); color: #34D399; padding: 12px; border-radius: 8px; font-size: 14px; margin-top: 20px; display: inline-block; }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="main">
                    <!-- Header -->
                    <div class="header">
                        <div class="logo-text">VisionR Event</div>
                    </div>

                    <!-- Content -->
                    <div class="content">
                        <h1 class="h1">Félicitations, <span class="highlight">${name}</span> !</h1>
                        
                        <p class="p">
                            Votre inscription pour la formation <strong style="color: #F8FAFC;">${formationName}</strong> est officiellement confirmée.
                        </p>

                        <div class="box-info">
                            <div style="margin-bottom: 15px;">
                                <div class="box-label">ID Participant</div>
                                <div class="box-value" style="font-family: monospace;">#${formattedId}</div>
                            </div>
                            <div>
                                <div class="box-label">Statut</div>
                                <div class="box-value" style="color: #34D399; display: flex; align-items: center; gap: 5px;">
                                    ✅ Paiement Validé
                                </div>
                            </div>
                        </div>

                        <p class="p">
                            Votre <strong>BADGE D'ACCÈS OFFICIEL</strong> se trouve en pièce jointe de cet email (Format PDF).
                        </p>
                        
                        <div class="pdf-note">
                            📎 Voir le fichier PDF attaché ci-dessous
                        </div>

                        <br><br>

                        <a href="${verifyUrl}" class="cta-button">Vérifier mon inscription en ligne</a>
                        
                        <p class="p" style="font-size: 14px; margin-top: 30px;">
                            En cas de question, notre équipe support est disponible sur WhatsApp au : <strong style="color: #F1F5F9;">${whatsapp}</strong>
                        </p>
                    </div>

                    <!-- Footer -->
                    <div class="footer">
                        &copy; ${year} VisionR AI Agency. Tous droits réservés.<br>
                        Ceci est un mail automatique, merci de ne pas y répondre directement.
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
}
