import { create } from 'zustand';
import { Form, FormResponse } from '../types';

interface FormState {
  forms: Form[];
  responses: FormResponse[];
  setForms: (forms: Form[]) => void;
  setResponses: (responses: FormResponse[]) => void;
  addForm: (form: Form) => void;
  addResponse: (response: FormResponse) => void;
  updateForm: (id: string, updates: Partial<Form>) => void;
}

export const useFormStore = create<FormState>((set) => ({
  forms: [],
  responses: [],
  setForms: (forms) => set({ forms }),
  setResponses: (responses) => set({ responses }),
  addForm: (form) => set((state) => ({ forms: [...state.forms, form] })),
  addResponse: (response) =>
    set((state) => ({ responses: [...state.responses, response] })),
  updateForm: (id, updates) =>
    set((state) => ({
      forms: state.forms.map((form) =>
        form.id === id ? { ...form, ...updates } : form
      ),
    })),
}));