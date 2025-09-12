// import { AdminBooking } from '@/hooks/useAdmin';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BookingsTabProps {
  // No props needed for this component
}

export interface Filters {
  status: string;
  depositStatus: string;
  search: string;
  startDate: string;
  endDate: string;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

export interface StatusColor {
  success: 'success';
  warning: 'warning';
  error: 'error';
  info: 'info';
  default: 'default';
}
