import React from 'react';
import { KeyRound, Shield } from 'lucide-react';

export function SecuritySettings() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary-50 rounded">
                <KeyRound className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Change Password</p>
                <p className="text-sm text-gray-500">Update your password regularly</p>
              </div>
            </div>
            <button className="btn btn-secondary">Change</button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary-50 rounded">
                <Shield className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
            </div>
            <button className="btn btn-secondary">Enable</button>
          </div>
        </div>
      </div>
    </div>
  );
}