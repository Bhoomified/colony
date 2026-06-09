import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// These come from your Supabase project dashboard
// We'll put real values in .env in the next step
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,       // saves session on device
    autoRefreshToken: true,      // keeps user logged in
    persistSession: true,        // session survives app close
    detectSessionInUrl: false,   // not a web app
  },
});

// Helper: get current logged-in user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Helper: get current session
export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};