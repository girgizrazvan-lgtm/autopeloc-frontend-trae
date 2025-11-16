-- Tabelă pentru resetare parolă admin
CREATE TABLE IF NOT EXISTS admin_password_resets (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pentru token și email
CREATE INDEX IF NOT EXISTS idx_admin_reset_token ON admin_password_resets(token) WHERE used = false;
CREATE INDEX IF NOT EXISTS idx_admin_reset_email ON admin_password_resets(email);

-- Șterge token-urile expirate automat (poate fi făcut cu cron job sau trigger)
-- DELETE FROM admin_password_resets WHERE expires_at < NOW();

