import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useFormStore } from '../../../store/useFormStore';
import { useAuthStore } from '../../../store/useAuthStore';
import toast from 'react-hot-toast';

export function FormCreate() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState<Array<{ id: string; type: string; label: string; required: boolean }>>([]);
  const addForm = useFormStore((state) => state.addForm);
  const user = useAuthStore((state) => state.user);

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: crypto.randomUUID(),
        type: 'text',
        label: '',
        required: false
      }
    ]);
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleFieldChange = (id: string, key: string, value: any) => {
    setFields(fields.map(field =>
      field.id === id ? { ...field, [key]: value } : field
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!title.trim()) {
      toast.error('Please enter a form title');
      return;
    }

    if (fields.length === 0) {
      toast.error('Please add at least one field');
      return;
    }

    if (fields.some(field => !field.label.trim())) {
      toast.error('All fields must have labels');
      return;
    }

    const newForm = {
      id: crypto.randomUUID(),
      creatorId: user.id,
      title: title.trim(),
      fields,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addForm(newForm);
    toast.success('Form created successfully');
    setIsOpen(false);
    setTitle('');
    setFields([]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-primary inline-flex items-center"
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Form
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Create New Form</h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="label">Form Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input"
                  placeholder="Enter form title"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">Form Fields</h3>
                  <button
                    type="button"
                    onClick={handleAddField}
                    className="btn btn-secondary text-sm"
                  >
                    Add Field
                  </button>
                </div>

                {fields.map((field) => (
                  <div key={field.id} className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => handleFieldChange(field.id, 'label', e.target.value)}
                        className="input"
                        placeholder="Field label"
                      />
                    </div>
                    <select
                      value={field.type}
                      onChange={(e) => handleFieldChange(field.id, 'type', e.target.value)}
                      className="input w-auto"
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="textarea">Text Area</option>
                    </select>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => handleFieldChange(field.id, 'required', e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600">Required</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Form
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}