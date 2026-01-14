-- Migration: Add Formation Status Fields to Registrations Table
-- Description: Adds status workflow fields for training registration management
-- Date: 2026-01-14

-- Add status column with check constraint
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'demande_recue' 
CHECK (status IN ('demande_recue', 'paiement_envoye', 'inscription_confirmee'));

-- Add formation type column
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS formation_type VARCHAR(100);

-- Add payment proof URL column
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS payment_proof_url TEXT;

-- Add confirmation timestamp column
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_formation_type ON registrations(formation_type);

-- Add comment for documentation
COMMENT ON COLUMN registrations.status IS 'Workflow status: demande_recue, paiement_envoye, inscription_confirmee';
COMMENT ON COLUMN registrations.formation_type IS 'Type of formation: Formation A (5000 FCFA) or Formation B (10000 FCFA)';
COMMENT ON COLUMN registrations.payment_proof_url IS 'URL to payment proof screenshot (uploaded or sent via WhatsApp)';
COMMENT ON COLUMN registrations.confirmed_at IS 'Timestamp when inscription was manually confirmed by admin';
