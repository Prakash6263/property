import { apiRequest } from '../utils/api';

/**
 * Fetch the current authenticated user's profile information
 * GET /auth/me
 */
export async function fetchUserProfile() {
  try {
    const response = await apiRequest('/auth/me', {
      method: 'GET',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[v0] Error fetching user profile:', error);
    throw error;
  }
}

/**
 * Update user profile information
 * PUT /auth/me
 */
export async function updateUserProfile(profileData) {
  try {
    const response = await apiRequest('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to update profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[v0] Error updating user profile:', error);
    throw error;
  }
}

/**
 * Admin login API
 * POST /auth/admin/login
 * @param {string} email - Admin email address
 * @param {string} password - Admin password
 * @returns {Object} Response with access_token, refresh_token, token_type, and user object
 */
export async function adminLogin(email, password) {
  try {
    const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://python.aitechnotech.in/property-management';
    
    const response = await fetch(`${baseURL}/auth/admin/login`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    console.log('[v0] Admin login successful');
    return data;
  } catch (error) {
    console.error('[v0] Error during admin login:', error);
    throw error;
  }
}