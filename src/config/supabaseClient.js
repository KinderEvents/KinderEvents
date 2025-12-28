import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
// Récupérée depuis votre chaîne de connexion: db.aoeoctlxlgdrbyxerivr.supabase.co
// URL du projet: https://aoeoctlxlgdrbyxerivr.supabase.co

const SUPABASE_URL = 'https://aoeoctlxlgdrbyxerivr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_fYO1H_ph30aI2GTDDJ7X8Q_6_Cwx_bI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
