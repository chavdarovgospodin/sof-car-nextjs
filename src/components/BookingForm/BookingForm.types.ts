import type { CarData } from '../../types/api';

export interface BookingData {
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  paymentMethod: string;
  termsAccepted: boolean;
}

export interface BookingFormProps {
  car: CarData;
  searchDates: {
    start: Date | null;
    end: Date | null;
  };
  onSubmit: (formData: {
    clientFirstName: string;
    clientLastName: string;
    clientPhone: string;
    clientEmail: string;
    paymentMethod: string;
  }) => Promise<void>;
  isLoading: boolean;
  t: (key: string, values?: Record<string, unknown>) => string;
  open: boolean;
  onClose: () => void;
  lang: string;
}
