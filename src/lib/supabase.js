import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://tucpxpjnhfdwmfimiwvk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Y3B4cGpuaGZkd21maW1pd3ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MTM3MjMsImV4cCI6MjA5MzA4OTcyM30.f4iQQwgKZHE97kwQoY4-QY0_Znne19YCD5NwACZAVZ8'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)