import React from 'react';
import { FileText, Clock } from 'lucide-react';
import { useDocumentStore } from '../../../store/useDocumentStore';
import { formatDate } from '../../../utils/date';

export function RecentDocuments() {
  const documents = useDocumentStore((state) => state.documents);
  const recentDocs = documents.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
        <div className="mt-6 space-y-4">
          {recentDocs.map((doc) => (
            <div key={doc.id} className="flex items-center space-x-4">
              <div className="p-2 bg-primary-50 rounded">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {doc.title}
                </p>
                <p className="text-sm text-gray-500">
                  {doc.category.replace('_', ' ')}
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {formatDate(doc.updatedAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}