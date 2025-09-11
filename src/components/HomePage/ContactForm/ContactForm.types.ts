export interface ContactFormProps {
  currentLang: string;
  onShowSnackbar: (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
