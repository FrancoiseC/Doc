import React from 'react';
import { DocumentList } from './components/DocumentList';
import { DocumentUpload } from './components/DocumentUpload';
import { DocumentFilters } from './components/DocumentFilters';
import { useDocumentStore } from '../../store/useDocumentStore';

export function Documents() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedStatus, setSelectedStatus] = React.useState<string>('all');
  const documents = useDocumentStore((state) => state.documents);

  const filteredDocuments = documents.filter((doc) => {
    const categoryMatch = selectedCategory === 'all' || doc.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || doc.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <DocumentUpload />
      </div>
      <DocumentFilters
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        onCategoryChange={setSelectedCategory}
        onStatusChange={setSelectedStatus}
      />
      <DocumentList documents={filteredDocuments} />
    </div>
  );
}