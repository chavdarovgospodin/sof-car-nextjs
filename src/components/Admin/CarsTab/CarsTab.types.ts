import { AdminCar } from '@/hooks/useAdmin';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CarsTabProps {
  // No props needed for this component
}

export interface CarFormState {
  isOpen: boolean;
  editingCar: AdminCar | null;
  isEditing: boolean;
}

export interface DeleteDialogState {
  isOpen: boolean;
  carToDelete: AdminCar | null;
}

export interface CalendarState {
  isOpen: boolean;
  selectedCar: AdminCar | null;
}
