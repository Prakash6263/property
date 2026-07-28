# User Profile API Integration

## Overview
This document describes the implementation of the user profile API integration using the endpoint:
- **URL**: `https://python.aitechnotech.in/property-management`
- **Method**: GET
- **Endpoint**: `/auth/me`
- **Auth Header**: Bearer token from environment variable

## API Response Structure
```json
{
  "id": "d9775ac1-88cf-4882-831c-4c3da9a8194e",
  "full_name": "Admin User",
  "phone_number": "+971501234567",
  "email": "admin@propertymanagement.com",
  "whatsapp_number": "+971501234567",
  "role": "admin",
  "status": "active",
  "nationality": null,
  "profile_photo": null,
  "is_phone_verified": true,
  "is_email_verified": true,
  "created_at": "2026-07-24T11:56:09.550157",
  "last_login": "2026-07-28T09:01:13.076265"
}
```

## Files Modified/Created

### 1. `src/services/userService.js` (NEW)
Created a new service file that provides reusable functions for user profile operations:

**Functions:**
- `fetchUserProfile()` - Fetches the current authenticated user's profile
- `updateUserProfile(profileData)` - Updates user profile information

```javascript
import { apiRequest } from '../utils/api';

export async function fetchUserProfile() {
  // GET /auth/me - Fetches current user profile
}

export async function updateUserProfile(profileData) {
  // PUT /auth/me - Updates user profile
}
```

### 2. `src/pages/auth/Profile.jsx` (UPDATED)
Updated the Profile page to:
- Fetch user data from the API on component mount
- Display real data from the API response
- Support updating profile information via API
- Show loading state while fetching data
- Handle errors with user-friendly alerts

**Key Changes:**
- Added `useEffect` hook to fetch profile on mount
- Created separate `profileData` state for API response
- Updated `handleSave` to call `updateUserProfile` API
- Added loading spinner during data fetch
- Updated UI to display data from API response

## How It Works

### Initialization Flow
1. User navigates to Profile page
2. Component mounts and calls `fetchUserProfile()`
3. API call is made to `GET /auth/me` with Bearer token
4. Response data is stored in `profileData` state
5. UI updates with fetched user information
6. Auth context is updated with new user data

### Update Flow
1. User clicks "Edit Profile"
2. User modifies form fields
3. User clicks "Save Changes"
4. `handleSave` calls `updateUserProfile(updatePayload)`
5. API call is made to `PUT /auth/me` with updated data
6. Response is received and state is updated
7. Success notification is displayed

## Authentication
The API requests use the existing `apiRequest` utility from `src/utils/api.js`, which:
- Automatically adds Bearer token from localStorage
- Handles token refresh on 401 responses
- Manages authorization headers

## Environment Variables Required
The following environment variables should be set in `.env.development.local`:
- `JWT` - Bearer token for API authentication (already set)
- `CURL_AUTH_HEADER_2` - Optional reference (already set)

## Error Handling
- Network errors are caught and displayed as alerts
- API validation errors are shown to the user
- Failed token refresh redirects to login page
- Console logs with `[v0]` prefix for debugging

## Testing
To test the implementation:

1. **Load Profile Page**: Navigate to `/auth/profile`
   - Should show loading spinner briefly
   - Should display fetched user data

2. **Edit Profile**: Click "Edit Profile" button
   - Fields should become editable
   - Modify any field and save
   - Should show success message

3. **Verify Updates**: Check if data persists
   - Refresh page to verify changes saved
   - Data should remain updated

## API Endpoints Used

### Get Current User Profile
```bash
GET /auth/me
Authorization: Bearer {access_token}
Accept: application/json
```

### Update User Profile
```bash
PUT /auth/me
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "full_name": "string",
  "phone_number": "string",
  "whatsapp_number": "string",
  "nationality": "string or null"
}
```

## Future Enhancements
- [ ] Add profile photo upload to API
- [ ] Add phone/email verification flows
- [ ] Add password change functionality
- [ ] Add two-factor authentication
- [ ] Add activity log display
