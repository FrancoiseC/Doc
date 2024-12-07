import { create } from 'zustand';
import { Document, DocumentRequest } from '../types';

interface DocumentState {
  documents: Document[];
  requests: DocumentRequest[];
  setDocuments: (documents: Document[]) => void;
  setRequests: (requests: DocumentRequest[]) => void;
  addDocument: (document: Document) => void;
  addRequest: (request: DocumentRequest) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  updateRequest: (id: string, updates: Partial<DocumentRequest>) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],
  requests: [],
  setDocuments: (documents) => set({ documents }),
  setRequests: (requests) => set({ requests }),
  addDocument: (document) =>
    set((state) => ({ documents: [...state.documents, document] })),
  addRequest: (request) =>
    set((state) => ({ requests: [...state.requests, request] })),
  updateDocument: (id, updates) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
    })),
  updateRequest: (id, updates) =>
    set((state) => ({
      requests: state.requests.map((req) =>
        req.id === id ? { ...req, ...updates } : req
      ),
    })),
}));