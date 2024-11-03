import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  LayoutDashboard, 
  HandshakeIcon, 
  Briefcase, 
  Users,
  LogOut,
  Menu,
  X,
  Contact,
  BarChart,
  Bell,
  Clock
} from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleLogout = () => {
    setUser(null);
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Deals', href: '/deals', icon: HandshakeIcon },
    { name: 'Job Cards', href: '/job-cards', icon: Briefcase },
    { name: 'Contacts', href: '/contacts', icon: Contact },
    { name: 'KPIs', href: '/kpis', icon: BarChart },
    { name: 'Users', href: '/users', icon: Users, adminOnly: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-md shadow-md"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Sidebar */}
        <div className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:static lg:translate-x-0 z-40 w-64 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 px-4 border-b">
              <h1 className="text-xl font-semibold text-gray-800">Innovera CRM</h1>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                if (item.adminOnly && user?.role !== 'admin') return null;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Notifications History Link */}
              <button
                onClick={() => navigate('/notifications')}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Bell className="w-5 h-5 mr-3" />
                Notifications
                <Clock className="w-4 h-4 ml-auto text-gray-400" />
              </button>
            </nav>
            <div className="p-4 border-t">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}