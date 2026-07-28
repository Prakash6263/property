import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth
import Login from './pages/auth/Login';
import OTPVerification from './pages/auth/OTPVerification';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from './pages/auth/Profile';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import UserRolePermission from './pages/admin/UserRolePermission';
import SystemSettings from './pages/admin/SystemSettings';

// Property Manager
import PropertyDashboard from './pages/property/PropertyDashboard';
import PropertyDetails from './pages/property/PropertyDetails';

// Management
import ManagementDashboard from './pages/management/ManagementDashboard';
import Reports from './pages/management/Reports';
import AIAssistant from './pages/management/AIAssistant';

// Booking
import LeadDashboard from './pages/booking/LeadDashboard';
import LeadDetails from './pages/booking/LeadDetails';
import ViewingBooking from './pages/booking/ViewingBooking';

// Tenant
import TenantList from './pages/tenant/TenantList';
import AddTenant from './pages/tenant/AddTenant';
import TenantDetails from './pages/tenant/TenantDetails';

// Maintenance Manager
import MaintenanceDashboard from './pages/maintenance/MaintenanceDashboard';
import TicketDetails from './pages/maintenance/TicketDetails';
import StaffWorkload from './pages/maintenance/StaffWorkload';

// Maintenance Staff
import MyTasks from './pages/maintenance-staff/MyTasks';
import JobDetails from './pages/maintenance-staff/JobDetails';

// Accounts
import AccountsDashboard from './pages/accounts/AccountsDashboard';
import InvoicesPayments from './pages/accounts/InvoicesPayments';
import DepositsRefunds from './pages/accounts/DepositsRefunds';

// Support
import WhatsAppInbox from './pages/support/WhatsAppInbox';

// Calendar
import SharedCalendar from './pages/calendar/SharedCalendar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={<Navigate to="/login" replace />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><UserRolePermission /></ProtectedRoute>} />
          <Route path="/admin/roles" element={<ProtectedRoute><UserRolePermission /></ProtectedRoute>} />
          <Route path="/admin/settings/company" element={<ProtectedRoute><SystemSettings /></ProtectedRoute>} />
          <Route path="/admin/settings/whatsapp" element={<ProtectedRoute><SystemSettings /></ProtectedRoute>} /> 
          <Route path="/admin/settings/payment" element={<ProtectedRoute><SystemSettings /></ProtectedRoute>} />
         <Route path="/admin/settings/audit" element={<ProtectedRoute><SystemSettings /></ProtectedRoute>} />

          {/* Property Manager */}
          <Route path="/property/list" element={<ProtectedRoute><PropertyDashboard /></ProtectedRoute>} />
          <Route path="/property/dashboard" element={<ProtectedRoute><PropertyDashboard /></ProtectedRoute>} />
          <Route path="/property/add" element={<ProtectedRoute><PropertyDetails /></ProtectedRoute>} />
          <Route path="/property/units" element={<ProtectedRoute><PropertyDetails /></ProtectedRoute>} />

          {/* Management */}
          <Route path="/management/dashboard" element={<ProtectedRoute><ManagementDashboard /></ProtectedRoute>} />
          <Route path="/management/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/management/ai" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />

          {/* Booking Team */}
          <Route path="/booking/dashboard" element={<ProtectedRoute><LeadDashboard /></ProtectedRoute>} />
          <Route path="/booking/leads" element={<ProtectedRoute><LeadDetails /></ProtectedRoute>} />
          <Route path="/booking/viewings" element={<ProtectedRoute><ViewingBooking /></ProtectedRoute>} />

          {/* Tenant Management */}
          <Route path="/tenant/list" element={<ProtectedRoute><TenantList /></ProtectedRoute>} />
          <Route path="/tenant/add" element={<ProtectedRoute><AddTenant /></ProtectedRoute>} />
          <Route path="/tenant/details" element={<ProtectedRoute><TenantDetails /></ProtectedRoute>} />

          {/* Maintenance Manager */}
          <Route path="/maintenance/dashboard" element={<ProtectedRoute><MaintenanceDashboard /></ProtectedRoute>} />
          <Route path="/maintenance/tickets" element={<ProtectedRoute><TicketDetails /></ProtectedRoute>} />
          <Route path="/maintenance/staff" element={<ProtectedRoute><StaffWorkload /></ProtectedRoute>} />

          {/* Maintenance Staff */}
          <Route path="/mstaff/tasks" element={<ProtectedRoute><MyTasks /></ProtectedRoute>} />
          <Route path="/mstaff/jobs" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />

          {/* Accounts Team */}
          <Route path="/accounts/dashboard" element={<ProtectedRoute><AccountsDashboard /></ProtectedRoute>} />
          <Route path="/accounts/invoices" element={<ProtectedRoute><InvoicesPayments /></ProtectedRoute>} />
          <Route path="/accounts/deposits" element={<ProtectedRoute><DepositsRefunds /></ProtectedRoute>} />

          {/* Support Team */}
          <Route path="/support/inbox" element={<ProtectedRoute><WhatsAppInbox /></ProtectedRoute>} />
          <Route path="/support/customers" element={<ProtectedRoute><WhatsAppInbox /></ProtectedRoute>} />

          {/* Calendar */}
          <Route path="/calendar" element={<ProtectedRoute><SharedCalendar /></ProtectedRoute>} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
