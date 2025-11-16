-- Script SQL pentru crearea tabelelor CMS în Supabase
-- Rulează acest script în Supabase SQL Editor

-- Tabela Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL,
  read_time TEXT,
  keywords TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true,
  og_image TEXT,
  author TEXT DEFAULT 'autopeloc.ro'
);

-- Index pentru slug
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at DESC);

-- Tabela FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Index pentru order
CREATE INDEX IF NOT EXISTS idx_faqs_order ON faqs("order");
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(is_active);

-- Tabela Vehicles
CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  image TEXT,
  sipp_code TEXT NOT NULL,
  category TEXT NOT NULL,
  acriss_code TEXT,
  engine TEXT,
  transmission TEXT,
  seats INTEGER,
  fuel TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Index pentru vehicles
CREATE INDEX IF NOT EXISTS idx_vehicles_category ON vehicles(category);
CREATE INDEX IF NOT EXISTS idx_vehicles_active ON vehicles(is_active);
CREATE INDEX IF NOT EXISTS idx_vehicles_order ON vehicles("order");

-- Tabela About Pages
CREATE TABLE IF NOT EXISTS about_pages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  section TEXT UNIQUE NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  "order" INTEGER DEFAULT 0
);

-- Index pentru about_pages
CREATE INDEX IF NOT EXISTS idx_about_pages_section ON about_pages(section);

-- Trigger pentru updated_at în blog_posts
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Succes!
-- Tabelele au fost create cu succes.

