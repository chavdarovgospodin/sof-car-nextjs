import { AdminBooking } from '@/hooks/useAdmin';

export interface DeleteBookingDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  booking: AdminBooking | null;
  isDeleting: boolean;
}
