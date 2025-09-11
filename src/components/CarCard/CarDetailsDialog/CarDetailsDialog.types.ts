import type { CarData } from '../../../types/api';

export interface CarDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  car: CarData | null;
  t: (key: string, values?: Record<string, unknown>) => string;
}
