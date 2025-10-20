-- Make pickup_date and return_date optional since they're no longer collected
ALTER TABLE reservations 
  ALTER COLUMN pickup_date DROP NOT NULL,
  ALTER COLUMN return_date DROP NOT NULL;

-- Make replacement car fields optional since they're no longer collected
ALTER TABLE reservations 
  ALTER COLUMN replacement_car_brand DROP NOT NULL,
  ALTER COLUMN replacement_car_model DROP NOT NULL,
  ALTER COLUMN replacement_car_category DROP NOT NULL,
  ALTER COLUMN replacement_car_sipp DROP NOT NULL;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_reservations_session_id ON reservations(session_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at DESC);
