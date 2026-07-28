const BASE_URL = 'https://python.aitechnotech.in/property-management';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Reusable wrapper around fetch that automatically handles Authorization headers 
 * and refreshes expired access tokens.
 */
export async function apiRequest(endpoint, options = {}) {
  const savedUser = localStorage.getItem('pm_user');
  let user = savedUser ? JSON.parse(savedUser) : null;

  options.headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (user?.access_token) {
    options.headers['Authorization'] = `Bearer ${user.access_token}`;
  }

  const url = `${BASE_URL}${endpoint}`;

  try {
    let response = await fetch(url, options);

    // If unauthorized, attempt to refresh the token using refresh_token
    if (response.status === 401 && user?.refresh_token) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            options.headers['Authorization'] = `Bearer ${token}`;
            return fetch(url, options);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh_token: user.refresh_token,
          }),
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          
          const updatedUser = {
            ...user,
            access_token: refreshData.access_token,
            refresh_token: refreshData.refresh_token || user.refresh_token,
          };
          localStorage.setItem('pm_user', JSON.stringify(updatedUser));
          
          // Trigger storage event so that React state is updated automatically
          window.dispatchEvent(new Event('storage'));

          isRefreshing = false;
          processQueue(null, refreshData.access_token);

          // Retry the original request with the new access token
          options.headers['Authorization'] = `Bearer ${refreshData.access_token}`;
          return await fetch(url, options);
        } else {
          isRefreshing = false;
          processQueue(new Error('Session expired'));
          handleLogout();
          throw new Error('Session expired. Please log in again.');
        }
      } catch (refreshErr) {
        isRefreshing = false;
        processQueue(refreshErr);
        handleLogout();
        throw refreshErr;
      }
    }

    return response;
  } catch (error) {
    throw error;
  }
}

function handleLogout() {
  localStorage.removeItem('pm_user');
  window.dispatchEvent(new Event('storage'));
  window.location.href = '/login';
}
