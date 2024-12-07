import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, FormInput, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export function Navigation() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/documents', label: 'Documents', icon: FileText },
    { path: '/forms', label: 'Forms', icon: FormInput },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-600">
              SunSet Miami
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.path
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {user.name}
              </span>
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}