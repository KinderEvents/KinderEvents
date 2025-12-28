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

        // Return clean success - NO EMAIL SENT HERE
        return res.status(200).json({ success: true, data });

    } catch (error) {
        console.error('Registration API Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
