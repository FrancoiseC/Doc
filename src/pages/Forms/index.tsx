import React from 'react';
import { FormList } from './components/FormList';
import { FormCreate } from './components/FormCreate';
import { FormFilters } from './components/FormFilters';
import { useFormStore } from '../../store/useFormStore';
import { useAuthStore } from '../../store/useAuthStore';

export function Forms() {
  const [selectedStatus, setSelectedStatus] = React.useState<string>('all');
  const forms = useFormStore((state) => state.forms);
  const user = useAuthStore((state) => state.user);

  const filteredForms = forms.filter((form) => {
    const statusMatch = selectedStatus === 'all' || form.status === selectedStatus;
    return statusMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Forms</h1>
        {user?.role === 'realtor' && <FormCreate />}
      </div>
      <FormFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      <FormList forms={filteredForms} />
    </div>
  );
}