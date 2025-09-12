export interface BookingPageClientProps {
  lang: string;
}

export interface SearchDates {
  start: Date | null;
  end: Date | null;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

export interface BookingFormData {
  clientFirstName: string;
  clientLastName: string;
  clientPhone: string;
  clientEmail: string;
  paymentMethod: string;
}
