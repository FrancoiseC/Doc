import React from 'react';
import { Filter } from 'lucide-react';

interface DocumentFiltersProps {
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
}

export function DocumentFilters({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange
}: DocumentFiltersProps) {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'id', label: 'ID Documents' },
    { value: 'proof_of_income', label: 'Proof of Income' },
    { value: 'tax_returns', label: 'Tax Returns' },
    { value: 'bank_statements', label: 'Bank Statements' },
    { value: 'other', label: 'Other' }
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <Filter className="w-5 h-5 text-gray-500" />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="input max-w-xs"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
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