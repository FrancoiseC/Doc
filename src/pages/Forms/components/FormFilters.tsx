import React from 'react';
import { Filter } from 'lucide-react';

interface FormFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export function FormFilters({
  selectedStatus,
  onStatusChange
}: FormFiltersProps) {
  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <Filter className="w-5 h-5 text-gray-500" />
      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="input max-w-xs"
      >
        {statuses.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
}