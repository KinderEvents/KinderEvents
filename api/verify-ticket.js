import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
    'https://aoeoctlxlgdrbyxerivr.supabase.co',
    'sb_secret_00zeaz7eUL7oI6bmP0sARg_1IWZ5FZt'
);

/**
 * API Endpoint: Verify Ticket
 * Public endpoint to verify ticket validity by ID
 */
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID manquant'
            });
        }

        // Fetch registration details (safe public fields only)
        const { data, error } = await supabase
            .from('registrations')
            .select('id, full_name, formation_type, status, created_at, confirmed_at')
            .eq('id', id)
            .single();

        if (error || !data) {
            return res.status(404).json({
                success: false,
                message: 'Ticket introuvable'
            });
        }

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        console.error('❌ Verify API Error:', error);
        return res.status(500).json({
            error: 'Erreur serveur',
            message: 'Erreur lors de la vérification'
        });
    }
}
