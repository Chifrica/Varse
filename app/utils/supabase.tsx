const { createClient } = require("@supabase/supabase-js");

const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY

export const supabase = createClient(supabaseURL, supabaseKey)