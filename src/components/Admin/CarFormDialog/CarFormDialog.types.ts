import { AdminCar } from '@/hooks/useAdmin';

export interface CarFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (carData: Partial<AdminCar>) => Promise<void>;
  car?: AdminCar | null;
  isEditing?: boolean;
  loading?: boolean;
}

export interface FormData {
  brand: string;
  model: string;
  year: number;
  fuel_type: string;
  class: string;
  price_per_day_bgn: number;
  deposit_amount_bgn: number;
  available: boolean;
  features: string[];
  transmission: string;
  seats: number;
  large_luggage: number;
  small_luggage: number;
  doors: number;
  min_age: number;
  four_wd: boolean;
  ac: boolean;
}

export interface ImageItem {
  url: string;
  file?: File;
  isNew: boolean;
  originalIndex?: number;
}

export interface ValidationErrors {
  [key: string]: string;
}
