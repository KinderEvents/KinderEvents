import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
    'https://aoeoctlxlgdrbyxerivr.supabase.co',
    'sb_secret_00zeaz7eUL7oI6bmP0sARg_1IWZ5FZt'
);

/**
 * API Endpoint: Get Registrations
 * Retrieves registrations with optional filtering by status
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
        const { status, formation_type, limit = 50, offset = 0 } = req.query;

        // Build query
        let query = supabase
            .from('registrations')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false });

        // Apply filters
        if (status) {
            query = query.eq('status', status);
        }

        if (formation_type) {
            query = query.eq('formation_type', formation_type);
        }

        // Apply pagination
        query = query.range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

        // Execute query
        const { data, error, count } = await query;

        if (error) {
            console.error('Supabase Query Error:', error);
            throw error;
        }

        // Get status counts
        const { data: statusCounts } = await supabase
            .from('registrations')
            .select('status')
            .then(({ data }) => {
                const counts = {
                    demande_recue: 0,
                    paiement_envoye: 0,
                    inscription_confirmee: 0,
                    total: data?.length || 0
                };

                data?.forEach(reg => {
                    if (counts.hasOwnProperty(reg.status)) {
                        counts[reg.status]++;
                    }
                });

                return { data: counts };
            });

        return res.status(200).json({
            success: true,
            data,
            pagination: {
                total: count,
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: count > (parseInt(offset) + parseInt(limit))
            },
            stats: statusCounts
        });

    } catch (error) {
        console.error('❌ Get Registrations API Error:', error);
        return res.status(500).json({
            error: 'Erreur serveur',
            message: 'Une erreur est survenue lors de la récupération des inscriptions'
        });
    }
}
