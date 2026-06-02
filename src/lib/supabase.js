import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ebudlixhfggedhfffrmj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidWRsaXhoZmdnZWRoZmZmcm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNzI0NDMsImV4cCI6MjA5NTY0ODQ0M30._lmkyly5cBFtUjF2oxadctVe38nRiTN7b-YdwKi21YM'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)