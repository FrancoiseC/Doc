import React from 'react';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Document } from '../../../types';
import { formatDate } from '../../../utils/date';

interface DocumentListProps {
  documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary-50 rounded">
                  <FileText className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-500">{doc.category.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDate(doc.updatedAt)}
                </div>
                {getStatusIcon(doc.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}