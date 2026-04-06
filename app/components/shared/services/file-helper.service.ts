import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileHelperService {

  
  // Convert File to Base64
  toBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file); // Convert to Base64
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  
}
