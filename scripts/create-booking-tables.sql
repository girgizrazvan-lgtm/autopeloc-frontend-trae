-- Create booking_sessions table to track user sessions
CREATE TABLE IF NOT EXISTS booking_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE NOT NULL,
  city TEXT,
  at_fault TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT
);

-- Create booking_funnel_steps table to track step completion
CREATE TABLE IF NOT EXISTS booking_funnel_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL REFERENCES booking_sessions(session_id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL CHECK (step_number IN (1, 2, 3)),
  step_name TEXT NOT NULL,
  step_data JSONB,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(session_id, step_number)
);

-- Create reservations table to store final reservation requests
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL REFERENCES booking_sessions(session_id) ON DELETE CASCADE,
  
  -- User car details
  user_car_brand TEXT NOT NULL,
  user_car_model TEXT NOT NULL,
  user_car_year INTEGER NOT NULL,
  user_car_transmission TEXT NOT NULL,
  
  -- Matched replacement car
  replacement_car_brand TEXT,
  replacement_car_model TEXT,
  replacement_car_category TEXT,
  replacement_car_sipp TEXT,
  
  -- Location and dates
  city TEXT NOT NULL,
  pickup_date DATE,
  return_date DATE,
  
  -- Contact info
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  
  -- Documents
  document_url TEXT,
  document_blob_id TEXT,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  
  -- Admin platform sync
  synced_to_admin BOOLEAN DEFAULT FALSE,
  admin_sync_at TIMESTAMPTZ,
  admin_reservation_id TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_booking_sessions_session_id ON booking_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_booking_funnel_steps_session_id ON booking_funnel_steps(session_id);
CREATE INDEX IF NOT EXISTS idx_reservations_session_id ON reservations(session_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_booking_sessions_updated_at
  BEFORE UPDATE ON booking_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
