import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Deals from './pages/Deals';
import JobCards from './pages/JobCards';
import Users from './pages/Users';
import Contacts from './pages/Contacts';
import NotificationsHistory from './pages/NotificationsHistory';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="deals" element={<Deals />} />
          <Route path="job-cards" element={<JobCards />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="users" element={<Users />} />
          <Route path="notifications" element={<NotificationsHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;