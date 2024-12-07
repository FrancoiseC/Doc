import React from 'react';
import { ProfileInfo } from './components/ProfileInfo';
import { SecuritySettings } from './components/SecuritySettings';
import { NotificationPreferences } from './components/NotificationPreferences';

export function Profile() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
      <div className="grid grid-cols-1 gap-6">
        <ProfileInfo />
        <SecuritySettings />
        <NotificationPreferences />
      </div>
    </div>
  );
}