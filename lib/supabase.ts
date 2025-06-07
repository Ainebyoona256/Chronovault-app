import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wgulspxcrdkbximldioi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndndWxzcHxjcmRrYnhpbWxkaW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMzQ0ODEsImV4cCI6MjA2NDYxMDQ4MX0.DPBC2scYYSRAAR0SGRuRtr-SbtuG8IZ7gz1HnATOWC0'

export const supabase = createClient(supabaseUrl, supabaseKey) 