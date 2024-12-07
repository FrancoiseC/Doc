export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'realtor';
  createdAt: string;
}

export interface Document {
  id: string;
  userId: string;
  title: string;
  category: DocumentCategory;
  status: DocumentStatus;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type DocumentCategory =
  | 'id'
  | 'proof_of_income'
  | 'tax_returns'
  | 'bank_statements'
  | 'other';

export type DocumentStatus = 'pending' | 'approved' | 'rejected';

export interface DocumentRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  category: DocumentCategory;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'expired';
  createdAt: string;
}

export interface Form {
  id: string;
  creatorId: string;
  title: string;
  fields: FormField[];
  status: 'draft' | 'sent' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea';
  label: string;
  required: boolean;
  options?: string[];
}

export interface FormResponse {
  id: string;
  formId: string;
  userId: string;
  responses: Record<string, string>;
  submittedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'document_request' | 'document_submission' | 'form_assignment' | 'form_submission';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}