import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client with service role for admin operations
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Create Supabase client with anon key for user operations
const supabaseAnon = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-52bd6d77/health", (c) => {
  return c.json({ status: "ok" });
});

// Debug endpoint to list users (remove in production)
app.get("/make-server-52bd6d77/debug/users", async (c) => {
  try {
    const { data: users } = await supabaseAdmin.auth.admin.listUsers();
    return c.json({ 
      count: users?.users?.length || 0,
      users: users?.users?.map(u => ({
        id: u.id,
        email: u.email,
        created_at: u.created_at,
        email_confirmed_at: u.email_confirmed_at,
        last_sign_in_at: u.last_sign_in_at
      })) || []
    });
  } catch (error) {
    console.error("Debug users error:", error);
    return c.json({ error: "Failed to list users" }, 500);
  }
});

// Debug endpoint to fix user password (for users created with old method)
app.post("/make-server-52bd6d77/debug/fix-user-password", async (c) => {
  try {
    const { email, newPassword } = await c.req.json();
    
    if (!email || !newPassword) {
      return c.json({ error: "Email and new password required" }, 400);
    }

    // Find user by email
    const { data: users } = await supabaseAdmin.auth.admin.listUsers();
    const user = users?.users.find(u => u.email === email);
    
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // Update password using admin API
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (error) {
      console.error("Password update error:", error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ 
      success: true, 
      message: "Password updated successfully. You can now sign in with the new password."
    });

  } catch (error) {
    console.error("Fix user password error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ==================== AUTH ROUTES ====================

// Sign up new user
app.post("/make-server-52bd6d77/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: "Email, password, and name are required" }, 400);
    }

    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const userExists = existingUsers?.users.some(u => u.email === email);
    
    if (userExists) {
      return c.json({ error: "User with this email already exists" }, 400);
    }

    // Use the regular auth client to sign up - this properly handles passwords
    // First, we need to sign up with the anon client which handles password hashing correctly
    const { data, error } = await supabaseAnon.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    });

    if (error) {
      console.error("Signup error:", error);
      return c.json({ error: error.message }, 400);
    }

    if (!data.user) {
      return c.json({ error: "User creation failed" }, 500);
    }

    const userId = data.user.id;

    // Since email confirmation is disabled by default in Supabase,
    // we need to manually confirm the user's email using admin API
    const { error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      { email_confirm: true }
    );

    if (confirmError) {
      console.error("Email confirmation error:", confirmError);
    }

    // Initialize user profile in KV store
    await kv.set(`user:${userId}:profile`, {
      id: userId,
      email,
      name,
      createdAt: new Date().toISOString(),
      buddyName: 'Muskurahat',
      buddyTone: 'warm',
      buddyAvatar: 'playful',
      isDarkMode: false
    });

    // Now sign in the user to get a proper session
    const { data: signInData, error: signInError } = await supabaseAnon.auth.signInWithPassword({
      email,
      password
    });

    if (signInError || !signInData.session) {
      console.error("Auto sign-in after signup error:", signInError);
      // User was created but auto-login failed, that's okay
      return c.json({ 
        success: true, 
        user: data.user,
        requiresSignIn: true,
        message: "Account created! Please sign in."
      });
    }

    // Success - return with session
    return c.json({ 
      success: true, 
      user: signInData.user,
      session: signInData.session,
      accessToken: signInData.session.access_token,
      profile: await kv.get(`user:${userId}:profile`)
    });

  } catch (error) {
    console.error("Signup route error:", error);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// Sign in existing user
app.post("/make-server-52bd6d77/auth/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();

    console.log("Sign in attempt for email:", email);

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    // Verify user exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const userExists = existingUsers?.users.find(u => u.email === email);
    
    if (!userExists) {
      console.log("User not found:", email);
      return c.json({ error: "Invalid login credentials" }, 401);
    }

    console.log("User exists, attempting sign in:", userExists.id);

    const { data, error } = await supabaseAnon.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Sign in error for user", email, ":", error);
      return c.json({ error: "Invalid login credentials" }, 401);
    }

    if (!data.session) {
      console.error("Sign in failed - no session created for:", email);
      return c.json({ error: "Sign in failed - no session created" }, 401);
    }

    console.log("Sign in successful for user:", data.user.id);

    // Load user profile from KV store
    const userId = data.user.id;
    const profile = await kv.get(`user:${userId}:profile`);

    return c.json({ 
      success: true, 
      user: data.user,
      session: data.session,
      accessToken: data.session.access_token,
      profile
    });

  } catch (error) {
    console.error("Sign in route error:", error);
    return c.json({ error: "Internal server error during sign in" }, 500);
  }
});

// Sign out user
app.post("/make-server-52bd6d77/auth/signout", async (c) => {
  try {
    // Sign out is primarily handled client-side by clearing localStorage
    // We just need to acknowledge the request
    // The client will invalidate the access token by removing it
    
    return c.json({ success: true, message: 'Signed out successfully' });
  } catch (error) {
    console.error("Sign out route error:", error);
    // Don't fail sign out on errors - let client clear session
    return c.json({ success: true, message: 'Signed out' });
  }
});

// Get current user session
app.get("/make-server-52bd6d77/auth/session", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const { data, error } = await supabaseAdmin.auth.getUser(accessToken);

    if (error || !data.user) {
      return c.json({ error: "Invalid or expired session" }, 401);
    }

    // Load user profile from KV store
    const userId = data.user.id;
    const profile = await kv.get(`user:${userId}:profile`);

    return c.json({ 
      success: true, 
      user: data.user,
      profile
    });

  } catch (error) {
    console.error("Get session route error:", error);
    return c.json({ error: "Internal server error getting session" }, 500);
  }
});

// Password reset request
app.post("/make-server-52bd6d77/auth/reset-password", async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // Note: In production, this would send a password reset email
    // Since email isn't configured, we'll just return success
    // The user would need to contact support or use a different method
    
    return c.json({ 
      success: true, 
      message: "Password reset instructions would be sent to your email. (Email not configured in prototype)"
    });

  } catch (error) {
    console.error("Password reset route error:", error);
    return c.json({ error: "Internal server error during password reset" }, 500);
  }
});

// Update user profile
app.put("/make-server-52bd6d77/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const updates = await c.req.json();
    const userId = user.id;

    // Get existing profile
    const existingProfile = await kv.get(`user:${userId}:profile`) || {};

    // Merge updates
    const updatedProfile = {
      ...existingProfile,
      ...updates,
      id: userId, // Never allow changing ID
      updatedAt: new Date().toISOString()
    };

    // Save to KV store
    await kv.set(`user:${userId}:profile`, updatedProfile);

    return c.json({ 
      success: true, 
      profile: updatedProfile
    });

  } catch (error) {
    console.error("Update profile route error:", error);
    return c.json({ error: "Internal server error updating profile" }, 500);
  }
});

// ==================== USER DATA ROUTES ====================

// Save journey entry
app.post("/make-server-52bd6d77/data/journey", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const entry = await c.req.json();
    const userId = user.id;
    const entryId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Save journey entry
    await kv.set(`user:${userId}:journey:${entryId}`, {
      ...entry,
      id: entryId,
      userId,
      createdAt: new Date().toISOString()
    });

    return c.json({ success: true, entryId });

  } catch (error) {
    console.error("Save journey entry error:", error);
    return c.json({ error: "Internal server error saving journey entry" }, 500);
  }
});

// Get journey entries
app.get("/make-server-52bd6d77/data/journey", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userId = user.id;
    const entries = await kv.getByPrefix(`user:${userId}:journey:`);

    return c.json({ success: true, entries });

  } catch (error) {
    console.error("Get journey entries error:", error);
    return c.json({ error: "Internal server error getting journey entries" }, 500);
  }
});

Deno.serve(app.fetch);