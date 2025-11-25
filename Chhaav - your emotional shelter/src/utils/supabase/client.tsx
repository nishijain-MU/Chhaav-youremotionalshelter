import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info.tsx';

// Create singleton Supabase client instance
let supabaseClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = `https://${projectId}.supabase.co`;
    supabaseClient = createClient(supabaseUrl, publicAnonKey);
  }
  return supabaseClient;
}

// Auth helper functions
export const supabaseAuth = {
  // Sign up new user
  async signUp(email: string, password: string, name: string) {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-52bd6d77/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // If auto sign-in failed, store credentials for manual sign-in
      if (data.requiresSignIn) {
        // Try to sign in manually
        return await this.signIn(email, password);
      }

      // Store session if available
      if (data.accessToken) {
        localStorage.setItem('chhaav_access_token', data.accessToken);
        localStorage.setItem('chhaav_user', JSON.stringify(data.user));
        if (data.profile) {
          localStorage.setItem('chhaav_profile', JSON.stringify(data.profile));
        }
      }

      return { success: true, user: data.user, profile: data.profile };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Sign in existing user
  async signIn(email: string, password: string) {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-52bd6d77/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sign in failed');
      }

      // Store session
      localStorage.setItem('chhaav_access_token', data.accessToken);
      localStorage.setItem('chhaav_user', JSON.stringify(data.user));
      if (data.profile) {
        localStorage.setItem('chhaav_profile', JSON.stringify(data.profile));
      }

      return { success: true, user: data.user, profile: data.profile };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Sign out user
  async signOut() {
    try {
      const accessToken = localStorage.getItem('chhaav_access_token');
      
      if (accessToken) {
        await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-52bd6d77/auth/signout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
      }

      // Clear local storage
      localStorage.removeItem('chhaav_access_token');
      localStorage.removeItem('chhaav_user');
      localStorage.removeItem('chhaav_profile');

      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      // Still clear local data even if server request fails
      localStorage.removeItem('chhaav_access_token');
      localStorage.removeItem('chhaav_user');
      localStorage.removeItem('chhaav_profile');
      return { success: true };
    }
  },

  // Get current session
  async getSession() {
    try {
      const accessToken = localStorage.getItem('chhaav_access_token');
      
      if (!accessToken) {
        return { success: false, error: 'No session found' };
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-52bd6d77/auth/session`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        // Session expired, clear local storage
        localStorage.removeItem('chhaav_access_token');
        localStorage.removeItem('chhaav_user');
        localStorage.removeItem('chhaav_profile');
        return { success: false, error: data.error || 'Session expired' };
      }

      // Update local storage
      localStorage.setItem('chhaav_user', JSON.stringify(data.user));
      if (data.profile) {
        localStorage.setItem('chhaav_profile', JSON.stringify(data.profile));
      }

      return { success: true, user: data.user, profile: data.profile };
    } catch (error) {
      console.error('Get session error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Request password reset
  async resetPassword(email: string) {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-52bd6d77/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Password reset failed');
      }

      return { success: true, message: data.message };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Update user profile
  async updateProfile(updates: Record<string, any>) {
    try {
      const accessToken = localStorage.getItem('chhaav_access_token');
      
      if (!accessToken) {
        return { success: false, error: 'Not authenticated' };
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-52bd6d77/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(updates)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Profile update failed');
      }

      // Update local storage
      if (data.profile) {
        localStorage.setItem('chhaav_profile', JSON.stringify(data.profile));
      }

      return { success: true, profile: data.profile };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('chhaav_access_token');
  },

  // Get stored user data
  getStoredUser() {
    const userStr = localStorage.getItem('chhaav_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get stored profile data
  getStoredProfile() {
    const profileStr = localStorage.getItem('chhaav_profile');
    return profileStr ? JSON.parse(profileStr) : null;
  }
};