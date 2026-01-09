import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";

const { createClient, processLock } = require("@supabase/supabase-js");

const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY

console.log("Supabase Init:", {
  "Supabase URL": supabaseURL ? "Loaded" : "Not Found",
  "Supabase Key": supabaseKey ? "Loaded" : "Not Found"
});

if (!supabaseURL || !supabaseKey) {
  console.error("EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY");
}

  let supabase = createClient(supabaseURL, supabaseKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  });

  // Setup AppState listener for auto-refresh
  if (AppState) {
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh()
      } else {
        supabase.auth.stopAutoRefresh()
      }
    })
  }
  console.log("Supabase initialized successfully.");

export default supabase;