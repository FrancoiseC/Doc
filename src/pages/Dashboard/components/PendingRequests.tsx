import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { useDocumentStore } from '../../../store/useDocumentStore';
import { formatDate } from '../../../utils/date';

export function PendingRequests() {
  const requests = useDocumentStore((state) => 
    state.requests.filter((req) => req.status === 'pending')
  ).slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">Pending Requests</h2>
        <div className="mt-6 space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-50 rounded">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {request.category.replace('_', ' ')}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  Due {formatDate(request.dueDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}