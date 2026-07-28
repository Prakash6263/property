import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const ROLES = {
  ADMIN: 'admin',
  PROPERTY_MANAGER: 'property_manager',
  MANAGEMENT: 'management',
  BOOKING_TEAM: 'booking_team',
  TENANT_MANAGEMENT: 'tenant_management',
  MAINTENANCE_MANAGER: 'maintenance_manager',
  MAINTENANCE_STAFF: 'maintenance_staff',
  ACCOUNTS_TEAM: 'accounts_team',
  SUPPORT_TEAM: 'support_team',
};

export const ROLE_LABELS = {
  admin: 'Administrator',
  property_manager: 'Property Manager',
  management: 'Management',
  booking_team: 'Booking Team',
  tenant_management: 'Tenant Management',
  maintenance_manager: 'Maintenance Manager',
  maintenance_staff: 'Maintenance Staff',
  accounts_team: 'Accounts Team',
  support_team: 'Support Team',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pm_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    localStorage.setItem('pm_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('pm_user');
    setUser(null);
  };

  const isAuthenticated = !!user;

  const refreshToken = async () => {
    return user?.access_token || null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
