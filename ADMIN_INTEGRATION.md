# Admin Platform Integration Guide

## Database Schema

### Tables Created

1. **booking_sessions** - Tracks user sessions
   - `id` (UUID, primary key)
   - `session_id` (TEXT, unique) - Generated client-side session identifier
   - `city` (TEXT) - Selected city
   - `at_fault` (TEXT) - Fault status (da/nu/nu-stiu)
   - `created_at`, `updated_at` (TIMESTAMPTZ)
   - `user_agent`, `ip_address` (TEXT) - Analytics data

2. **booking_funnel_steps** - Tracks step completion
   - `id` (UUID, primary key)
   - `session_id` (TEXT, foreign key)
   - `step_number` (INTEGER) - 1, 2, or 3
   - `step_name` (TEXT) - Step identifier
   - `step_data` (JSONB) - Step-specific data
   - `completed_at` (TIMESTAMPTZ)

3. **reservations** - Final reservation requests
   - `id` (UUID, primary key)
   - `session_id` (TEXT, foreign key)
   - User car details: `user_car_brand`, `user_car_model`, `user_car_year`, `user_car_transmission`
   - Replacement car: `replacement_car_brand`, `replacement_car_model`, `replacement_car_category`, `replacement_car_sipp`
   - Location: `city`, `pickup_date`, `return_date`
   - Contact: `contact_name`, `contact_phone`, `contact_email`
   - Documents: `document_url`, `document_blob_id`
   - Status: `status` (pending/approved/rejected/completed)
   - Admin sync: `synced_to_admin`, `admin_sync_at`, `admin_reservation_id`
   - Timestamps: `created_at`, `updated_at`

## API Endpoints

### Frontend → Database

#### POST /api/booking/track-step
Tracks funnel step completion.

**Request:**
\`\`\`json
{
  "sessionId": "session_1234567890_abc123",
  "stepNumber": 1,
  "stepName": "initial_form_submitted",
  "stepData": { "city": "București", "atFault": "nu" },
  "city": "București",
  "atFault": "nu"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true
}
\`\`\`

#### POST /api/booking/create-reservation
Creates reservation and forwards to admin platform.

**Request:**
\`\`\`json
{
  "sessionId": "session_1234567890_abc123",
  "userCar": {
    "brand": "Dacia",
    "model": "Sandero",
    "year": 2020,
    "transmission": "Manual"
  },
  "replacementCar": {
    "brand": "Volkswagen",
    "model": "Polo",
    "category": "Economy",
    "sipp": "EDAR"
  },
  "city": "București",
  "pickupDate": "2025-01-20",
  "returnDate": "2025-01-27",
  "contact": {
    "name": "Ion Popescu",
    "phone": "0712345678",
    "email": "ion@example.com"
  },
  "documentUrl": "https://blob.vercel-storage.com/...",
  "documentBlobId": "blob_abc123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "reservation_id": "uuid-here"
}
\`\`\`

### Frontend → Admin Platform

#### POST https://admin.autopeloc.ro/api/reservations/incoming
Receives reservation data from frontend.

**Headers:**
- `Authorization: Bearer YOUR_ADMIN_API_KEY`
- `X-Source: autopeloc-frontend`
- `Content-Type: application/json`

**Request Body:**
\`\`\`json
{
  "reservation_id": "uuid-from-frontend-db",
  "session_id": "session_1234567890_abc123",
  "user_car": {
    "brand": "Dacia",
    "model": "Sandero",
    "year": 2020,
    "transmission": "Manual"
  },
  "replacement_car": {
    "brand": "Volkswagen",
    "model": "Polo",
    "category": "Economy",
    "sipp": "EDAR"
  },
  "city": "București",
  "pickup_date": "2025-01-20",
  "return_date": "2025-01-27",
  "contact": {
    "name": "Ion Popescu",
    "phone": "0712345678",
    "email": "ion@example.com"
  },
  "document_url": "https://blob.vercel-storage.com/...",
  "created_at": "2025-01-15T10:30:00Z"
}
\`\`\`

**Expected Response:**
\`\`\`json
{
  "success": true,
  "reservation_id": "admin-platform-reservation-id"
}
\`\`\`

## Environment Variables

Add to your admin platform:

\`\`\`env
ADMIN_API_KEY=your-secure-api-key-here
\`\`\`

Add to frontend (already configured):

\`\`\`env
ADMIN_API_KEY=same-secure-api-key-here
\`\`\`

## Funnel Analytics Queries

### Conversion Rate by Step
\`\`\`sql
SELECT 
  COUNT(DISTINCT CASE WHEN step_number = 1 THEN session_id END) as step_1_users,
  COUNT(DISTINCT CASE WHEN step_number = 2 THEN session_id END) as step_2_users,
  COUNT(DISTINCT CASE WHEN step_number = 3 THEN session_id END) as step_3_users,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN step_number = 2 THEN session_id END) / 
    NULLIF(COUNT(DISTINCT CASE WHEN step_number = 1 THEN session_id END), 0), 2) as step_1_to_2_rate,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN step_number = 3 THEN session_id END) / 
    NULLIF(COUNT(DISTINCT CASE WHEN step_number = 2 THEN session_id END), 0), 2) as step_2_to_3_rate
FROM booking_funnel_steps
WHERE completed_at >= NOW() - INTERVAL '30 days';
\`\`\`

### Reservations by City
\`\`\`sql
SELECT 
  city,
  COUNT(*) as total_reservations,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
  COUNT(CASE WHEN synced_to_admin THEN 1 END) as synced
FROM reservations
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY city
ORDER BY total_reservations DESC;
\`\`\`

### Drop-off Analysis
\`\`\`sql
SELECT 
  s.session_id,
  s.city,
  s.at_fault,
  MAX(CASE WHEN f.step_number = 1 THEN f.completed_at END) as step_1_at,
  MAX(CASE WHEN f.step_number = 2 THEN f.completed_at END) as step_2_at,
  MAX(CASE WHEN f.step_number = 3 THEN f.completed_at END) as step_3_at,
  CASE 
    WHEN MAX(f.step_number) = 1 THEN 'Dropped after step 1'
    WHEN MAX(f.step_number) = 2 THEN 'Dropped after step 2'
    WHEN MAX(f.step_number) = 3 THEN 'Completed'
    ELSE 'No steps'
  END as funnel_status
FROM booking_sessions s
LEFT JOIN booking_funnel_steps f ON s.session_id = f.session_id
WHERE s.created_at >= NOW() - INTERVAL '7 days'
GROUP BY s.session_id, s.city, s.at_fault
ORDER BY s.created_at DESC;
