import React from 'react';
import { User, Mail, Building2 } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';

export function ProfileInfo() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary-50 rounded">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="text-sm text-gray-900">{user?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary-50 rounded">
              <Mail className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email Address</p>
              <p className="text-sm text-gray-900">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary-50 rounded">
              <Building2 className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Role</p>
              <p className="text-sm text-gray-900 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}