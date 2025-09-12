import { AdminBooking } from '@/hooks/useAdmin';

export interface BookingEditDialogProps {
  open: boolean;
  onClose: () => void;
  booking: AdminBooking | null;
  onSave: (data: {
    status?: string;
    deposit_status?: string;
    notes?: string;
  }) => void;
  isSaving: boolean;
}

export interface FormData {
  status: string;
  deposit_status: string;
  notes: string;
}
