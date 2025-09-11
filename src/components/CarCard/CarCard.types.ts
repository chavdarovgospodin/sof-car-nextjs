import type { CarData } from '../../types/api';

export interface CarCardProps {
  car: CarData;
  onBook: (car: CarData) => void;
  t: (key: string, values?: Record<string, unknown>) => string;
  rentalDates?: {
    start: Date | null;
    end: Date | null;
  };
}
