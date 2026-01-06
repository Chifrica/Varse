import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";

const { createClient, processLock } = require("@supabase/supabase-js");

const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY

if (!supabaseURL || !supabaseKey) {
  console.error("Missing Supabase credentials in environment variables");
}

let supabase: any = null;

try {
  supabase = createClient(supabaseURL, supabaseKey, {
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
} catch (error) {
  console.error("Error initializing Supabase:", error);
}

export default supabase;