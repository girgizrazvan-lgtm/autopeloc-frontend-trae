-- Update users table to add password and status fields
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE users ADD COLUMN IF NOT EXISTS company TEXT;

-- Make auth0_id nullable since we're using custom authentication
ALTER TABLE users ALTER COLUMN auth0_id DROP NOT NULL;

-- Add index for email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
