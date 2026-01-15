ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50);
