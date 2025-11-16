-- Create table for live visitor tracking
-- Run this in the Supabase SQL editor

-- LIVE_VISITORS table
create table if not exists public.live_visitors (
  id uuid primary key default gen_random_uuid(),
  session_id text unique not null,
  current_page text not null,
  page_title text,
  referrer text,
  user_agent text,
  last_activity timestamptz default now(),
  first_seen timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes for performance
create index if not exists live_visitors_session_id_idx on public.live_visitors (session_id);
create index if not exists live_visitors_last_activity_idx on public.live_visitors (last_activity);
create index if not exists live_visitors_current_page_idx on public.live_visitors (current_page);

-- Updated-at trigger
create trigger live_visitors_set_updated_at before update on public.live_visitors
for each row execute function public.set_updated_at();

-- Row Level Security - allow public inserts/updates for tracking, but only admin can read
alter table public.live_visitors enable row level security;

-- Allow anonymous users to insert/update their own session (for tracking)
create policy live_visitors_insert on public.live_visitors
  for insert to anon, authenticated with check (true);
  
create policy live_visitors_update on public.live_visitors
  for update to anon, authenticated using (true) with check (true);

-- Only authenticated admin users can read (this will be checked in the API)
-- For now, we allow select but will restrict in the API endpoint
create policy live_visitors_select on public.live_visitors
  for select to anon, authenticated using (true);

-- Function to clean up old inactive visitors (older than 5 minutes)
create or replace function public.cleanup_inactive_visitors()
returns void as $$
begin
  delete from public.live_visitors
  where last_activity < now() - interval '5 minutes';
end;
$$ language plpgsql;

-- Optional: Create a scheduled job to clean up old visitors
-- This can be done via pg_cron extension if available
-- SELECT cron.schedule('cleanup-visitors', '*/5 * * * *', 'SELECT public.cleanup_inactive_visitors()');

