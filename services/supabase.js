import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://iobpblqsqrtfzwyiygbu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvYnBibHFzcXJ0Znp3eWl5Z2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MDYwODksImV4cCI6MjA5MjE4MjA4OX0.2bv2oZuF9gvB5IE7LSZ09fVeA7ZgzGWYF4pUO8QTn70';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
export { supabase };