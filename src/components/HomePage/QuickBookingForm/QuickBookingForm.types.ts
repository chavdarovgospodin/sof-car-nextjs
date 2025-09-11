import dayjs from 'dayjs';

export interface QuickBookingFormProps {
  currentLang: string;
  onShowSnackbar: (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => void;
}

export interface QuickBookingDates {
  pickupDate: string;
  pickupTime: dayjs.Dayjs | null;
  returnDate: string;
  returnTime: dayjs.Dayjs | null;
}
