import React from 'react';
import { DocumentStats } from './components/DocumentStats';
import { RecentDocuments } from './components/RecentDocuments';
import { PendingRequests } from './components/PendingRequests';
import { FormAssignments } from './components/FormAssignments';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <DocumentStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentDocuments />
        <div className="space-y-6">
          <PendingRequests />
          <FormAssignments />
        </div>
      </div>
    </div>
  );
}