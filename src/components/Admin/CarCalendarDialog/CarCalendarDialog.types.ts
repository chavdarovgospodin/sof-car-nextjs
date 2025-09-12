import { AdminCar } from '@/hooks/useAdmin';

export interface CarCalendarDialogProps {
  open: boolean;
  onClose: () => void;
  car: AdminCar | null;
}

export interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  customer_name: string;
  status: string;
}

export interface CurrentMonth {
  month: number;
  year: number;
}

export interface DateStatus {
  status: 'available' | 'booked';
  booking: Booking | null;
}
