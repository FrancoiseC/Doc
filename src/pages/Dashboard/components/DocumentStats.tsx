import React from 'react';
import { FileCheck, FileWarning, FileX } from 'lucide-react';
import { useDocumentStore } from '../../../store/useDocumentStore';

export function DocumentStats() {
  const documents = useDocumentStore((state) => state.documents);

  const stats = {
    approved: documents.filter((doc) => doc.status === 'approved').length,
    pending: documents.filter((doc) => doc.status === 'pending').length,
    rejected: documents.filter((doc) => doc.status === 'rejected').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Approved Documents"
        count={stats.approved}
        icon={FileCheck}
        color="text-green-600"
        bgColor="bg-green-50"
      />
      <StatCard
        title="Pending Documents"
        count={stats.pending}
        icon={FileWarning}
        color="text-yellow-600"
        bgColor="bg-yellow-50"
      />
      <StatCard
        title="Rejected Documents"
        count={stats.rejected}
        icon={FileX}
        color="text-red-600"
        bgColor="bg-red-50"
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

function StatCard({ title, count, icon: Icon, color, bgColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{count}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );
}