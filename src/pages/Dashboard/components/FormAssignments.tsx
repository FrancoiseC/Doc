import React from 'react';
import { FormInput, Clock } from 'lucide-react';
import { useFormStore } from '../../../store/useFormStore';
import { formatDate } from '../../../utils/date';

export function FormAssignments() {
  const forms = useFormStore((state) => 
    state.forms.filter((form) => form.status === 'sent')
  ).slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">Form Assignments</h2>
        <div className="mt-6 space-y-4">
          {forms.map((form) => (
            <div key={form.id} className="flex items-center space-x-4">
              <div className="p-2 bg-primary-50 rounded">
                <FormInput className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {form.title}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  Updated {formatDate(form.updatedAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}