// Updated encryption.ts without Buffer dependency
export class Encryption {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;

  static async generateKey(): Promise<CryptoKey> {
    return await window.crypto.subtle.generateKey(
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  static async encryptFile(file: File): Promise<{ encryptedData: ArrayBuffer; key: CryptoKey; iv: Uint8Array }> {
    const key = await this.generateKey();
    const iv = window.crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
    
    const arrayBuffer = await file.arrayBuffer();
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: this.ALGORITHM,
        iv
      },
      key,
      arrayBuffer
    );

    return { encryptedData, key, iv };
  }

  static async decryptFile(
    encryptedData: ArrayBuffer,
    key: CryptoKey,
    iv: Uint8Array
  ): Promise<ArrayBuffer> {
    return await window.crypto.subtle.decrypt(
      {
        name: this.ALGORITHM,
        iv
      },
      key,
      encryptedData
    );
  }

  static async exportKey(key: CryptoKey): Promise<string> {
    const exported = await window.crypto.subtle.exportKey('raw', key);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
  }

  static async importKey(keyData: string): Promise<CryptoKey> {
    const keyBuffer = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));
    return await window.crypto.subtle.importKey(
      'raw',
      keyBuffer,
      this.ALGORITHM,
      true,
      ['encrypt', 'decrypt']
    );
  }
}