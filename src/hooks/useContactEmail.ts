import { useState } from 'react';
import axios from 'axios';
import { API_CONFIG } from '@/config/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactEmailResponse {
  success: boolean;
  message: string;
}

export function useContactEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendContactEmail = async (
    formData: ContactFormData
  ): Promise<ContactEmailResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACT_INQUIRY}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: API_CONFIG.TIMEOUT,
        }
      );

      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendContactEmail,
    isLoading,
    error,
  };
}
