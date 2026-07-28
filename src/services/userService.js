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
