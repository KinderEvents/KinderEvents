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

/**
 * Generate Confirmation Email Template
 */
function generateConfirmationEmail(name, formationName, whatsapp, id = 0) {
    const formattedId = id.toString().padStart(6, '0');
    // QR Code links to the verification page
    const baseUrl = 'https://visionr-studio.vercel.app';
    const verifyUrl = `${baseUrl}/verify/${id}`;

    // Valid for direct download link (triggers auto download on page load)
    const downloadUrl = `${verifyUrl}`;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verifyUrl)}&color=D4AF37&bgcolor=0F172A`;

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0F172A; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 20px auto; background-color: #0F172A; }
                
                /* TICKET STYLES */
                .ticket-wrap {
                    padding: 20px;
                    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
                }
                .ticket {
                    background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                    border: 1px solid #334155;
                    display: flex;
                    flex-direction: column;
                }
                
                /* Decorative Gold Border */
                .ticket::before {
                    content: '';
                    position: absolute;
                    top: 4px; left: 4px; right: 4px; bottom: 4px;
                    border: 2px solid #D4AF37;
                    border-radius: 8px;
                    pointer-events: none;
                    opacity: 0.5;
                }
                
                .ticket-header {
                    padding: 20px;
                    border-bottom: 2px dashed #334155;
                    position: relative;
                    text-align: center;
                    background: radial-gradient(circle at top left, #D4AF37 0%, transparent 10%),
                                radial-gradient(circle at top right, #D4AF37 0%, transparent 10%);
                }
                
                .brand {
                    color: #D4AF37;
                    font-size: 14px;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                
                .event-title {
                    color: #F8FAFC;
                    font-size: 24px;
                    font-weight: 800;
                    margin: 0;
                    text-transform: uppercase;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }
                
                .ticket-body {
                    padding: 30px 20px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                
                .attendee-info {
                    flex: 1;
                }
                
                .label {
                    color: #64748B;
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 4px;
                }
                
                .value {
                    color: #F1F5F9;
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    font-weight: bold;
                }
                
                .qr-section {
                    width: 100px;
                    text-align: center;
                    border-left: 2px dashed #334155;
                    padding-left: 20px;
                    margin-left: 20px;
                }
                
                .qr-img {
                    width: 80px;
                    height: 80px;
                    background: #1E293B;
                    border: 2px solid #D4AF37;
                    border-radius: 8px;
                    padding: 5px;
                }
                
                .ticket-footer {
                    background: #020617;
                    padding: 15px;
                    text-align: center;
                    color: #94A3B8;
                    font-size: 10px;
                    letter-spacing: 1px;
                    border-top: 2px dashed #334155;
                }
                
                .download-btn {
                    display: block;
                    width: 200px;
                    margin: 30px auto;
                    background: #D4AF37;
                    color: #0F172A;
                    text-align: center;
                    padding: 15px;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 800;
                    text-transform: uppercase;
                    font-size: 14px;
                    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
                }
                
                .h1-email {
                    color: #F1F5F9;
                    text-align: center;
                    margin-top: 30px;
                    font-size: 20px;
                }
                .p-email {
                    color: #94A3B8;
                    text-align: center;
                    font-size: 14px;
                    margin-bottom: 30px;
                }
                
                 <div style="text-align: center; padding: 20px; color: #475569; font-size: 12px;">
                    © ${new Date().getFullYear()} VisionR AI Agency
                </div>
            </div>
        </body>
        </html>
    `;
}
