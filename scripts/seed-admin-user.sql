-- Seed default admin user
-- Email: razvan@autopeloc.ro
-- Password: admin123
-- This script creates the initial admin user so you can log in for the first time

INSERT INTO users (
  id,
  email,
  name,
  password_hash,
  role,
  status,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'razvan@autopeloc.ro',
  'Admin',
  -- Real bcrypt hash for "admin123"
  '$2a$10$N9qARFb16LVnRitNVd6Ue.92h3iOXvOmYnqZzJ5zQwYvGsszPoi9O',
  'admin',
  'approved',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;
