import React from 'react';
import { FormInput, Clock, CheckCircle, PenSquare, Send } from 'lucide-react';
import { Form } from '../../../types';
import { formatDate } from '../../../utils/date';
import { useAuthStore } from '../../../store/useAuthStore';

interface FormListProps {
  forms: Form[];
}

export function FormList({ forms }: FormListProps) {
  const user = useAuthStore((state) => state.user);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'sent':
        return <Send className="w-5 h-5 text-blue-600" />;
      default:
        return <PenSquare className="w-5 h-5 text-yellow-600" />;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <div className="space-y-4">
          {forms.map((form) => (
            <div key={form.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary-50 rounded">
                  <FormInput className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{form.title}</h3>
                  <p className="text-sm text-gray-500">
                    {form.fields.length} {form.fields.length === 1 ? 'field' : 'fields'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDate(form.updatedAt)}
                </div>
                {getStatusIcon(form.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}