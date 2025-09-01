-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies Table
CREATE TABLE IF NOT EXISTS companies (
  uid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Candidates Table
CREATE TABLE IF NOT EXISTS candidates (
  uid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  age INTEGER,
  email TEXT NOT NULL UNIQUE,
  linkedin_url TEXT,
  phone_number TEXT,
  cv_uid TEXT NOT NULL UNIQUE,
  cv_original_bucket_url TEXT,
  cv_formatted_long_bucket_url TEXT,
  cv_formatted_short_bucket_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Candidate Career History Table
CREATE TABLE IF NOT EXISTS candidate_career_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidates(uid) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Candidate Education History Table
CREATE TABLE IF NOT EXISTS candidate_education_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidates(uid) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Candidate Certificates Table
CREATE TABLE IF NOT EXISTS candidate_certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidates(uid) ON DELETE CASCADE,
  certificate_name TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  credential_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Candidate Technical Skills Table
CREATE TABLE IF NOT EXISTS candidate_technical_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidates(uid) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  proficiency_level TEXT NOT NULL CHECK (proficiency_level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  years_of_experience INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Candidate Soft Skills Table
CREATE TABLE IF NOT EXISTS candidate_soft_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidates(uid) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  proficiency_level TEXT NOT NULL CHECK (proficiency_level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Candidate Languages Table
CREATE TABLE IF NOT EXISTS candidate_languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidates(uid) ON DELETE CASCADE,
  language TEXT NOT NULL,
  proficiency_level TEXT NOT NULL CHECK (proficiency_level IN ('Basic', 'Conversational', 'Fluent', 'Native')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_candidates_email ON candidates(email);
CREATE INDEX IF NOT EXISTS idx_candidates_cv_uid ON candidates(cv_uid);
CREATE INDEX IF NOT EXISTS idx_career_history_candidate_id ON candidate_career_history(candidate_id);
CREATE INDEX IF NOT EXISTS idx_education_history_candidate_id ON candidate_education_history(candidate_id);
CREATE INDEX IF NOT EXISTS idx_certificates_candidate_id ON candidate_certificates(candidate_id);
CREATE INDEX IF NOT EXISTS idx_technical_skills_candidate_id ON candidate_technical_skills(candidate_id);
CREATE INDEX IF NOT EXISTS idx_soft_skills_candidate_id ON candidate_soft_skills(candidate_id);
CREATE INDEX IF NOT EXISTS idx_languages_candidate_id ON candidate_languages(candidate_id);

-- Enable Row Level Security (RLS)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_career_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_education_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_technical_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_soft_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_languages ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies (adjust as needed for your auth system)
-- For now, allow all operations (you'll want to restrict these based on authentication)
CREATE POLICY "Allow all operations on companies" ON companies FOR ALL USING (true);
CREATE POLICY "Allow all operations on candidates" ON candidates FOR ALL USING (true);
CREATE POLICY "Allow all operations on career_history" ON candidate_career_history FOR ALL USING (true);
CREATE POLICY "Allow all operations on education_history" ON candidate_education_history FOR ALL USING (true);
CREATE POLICY "Allow all operations on certificates" ON candidate_certificates FOR ALL USING (true);
CREATE POLICY "Allow all operations on technical_skills" ON candidate_technical_skills FOR ALL USING (true);
CREATE POLICY "Allow all operations on soft_skills" ON candidate_soft_skills FOR ALL USING (true);
CREATE POLICY "Allow all operations on languages" ON candidate_languages FOR ALL USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON candidates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
