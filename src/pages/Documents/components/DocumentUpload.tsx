import React, { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { useDocumentStore } from '../../../store/useDocumentStore';
import { Encryption } from '../../../lib/encryption';
import { useAuthStore } from '../../../store/useAuthStore';
import toast from 'react-hot-toast';

export function DocumentUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const addDocument = useDocumentStore((state) => state.addDocument);
  const user = useAuthStore((state) => state.user);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      // Encrypt the file
      const { encryptedData, key, iv } = await Encryption.encryptFile(file);
      const keyString = await Encryption.exportKey(key);

      // In a real app, you would:
      // 1. Upload the encrypted file to a secure storage service
      // 2. Store the encryption key securely
      // 3. Store the IV with the file metadata
      
      // For demo purposes, we'll create a blob URL
      const blob = new Blob([encryptedData]);
      const fileUrl = URL.createObjectURL(blob);

      const newDocument = {
        id: crypto.randomUUID(),
        userId: user.id,
        title: file.name,
        category: 'other',
        status: 'pending',
        fileUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      addDocument(newDocument);
      toast.success('Document uploaded and encrypted successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        className={`btn btn-primary inline-flex items-center ${
          isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {isUploading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Upload className="w-4 h-4 mr-2" />
        )}
        {isUploading ? 'Encrypting...' : 'Upload Document'}
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx,.txt"
        disabled={isUploading}
      />
    </div>
  );
}