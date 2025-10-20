-- Create booking_sessions table
CREATE TABLE IF NOT EXISTS booking_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create booking_funnel_steps table
CREATE TABLE IF NOT EXISTS booking_funnel_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  step_name TEXT NOT NULL,
  step_data JSONB,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (session_id) REFERENCES booking_sessions(session_id) ON DELETE CASCADE
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  selected_vehicle JSONB NOT NULL,
  pickup_city TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  user_car JSONB NOT NULL,
  document_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (session_id) REFERENCES booking_sessions(session_id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE booking_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_funnel_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public insert (since users are not authenticated)
-- These tables track anonymous user behavior, so we allow inserts without auth

CREATE POLICY "Allow public insert on booking_sessions" 
  ON booking_sessions FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public select on booking_sessions" 
  ON booking_sessions FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert on booking_funnel_steps" 
  ON booking_funnel_steps FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public select on booking_funnel_steps" 
  ON booking_funnel_steps FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert on reservations" 
  ON reservations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public select on reservations" 
  ON reservations FOR SELECT 
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_booking_sessions_session_id ON booking_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_booking_funnel_steps_session_id ON booking_funnel_steps(session_id);
CREATE INDEX IF NOT EXISTS idx_booking_funnel_steps_step_name ON booking_funnel_steps(step_name);
CREATE INDEX IF NOT EXISTS idx_reservations_session_id ON reservations(session_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at);

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
