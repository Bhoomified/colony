import { create } from 'zustand';
import { supabase } from '../lib/supabase';

// What a Colony member looks like in our app state
type Member = {
  id: string;
  phone: string;
  full_name: string | null;
  role: 'super_admin' | 'regional_admin' | 'temple_authority' | 'member' | 'guest';
  is_verified: boolean;
  city: string | null;
  blood_group: string | null;
  avatar_url: string | null;
};

type AuthState = {
  member: Member | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
  setMember: (member: Member | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  member: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Fetch full member profile from our DB
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        set({
          member: profile,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ member: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      set({ member: null, isAuthenticated: false, isLoading: false });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ member: null, isAuthenticated: false });
  },

  setMember: (member) => set({ member, isAuthenticated: !!member }),
}));