import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { googleSheetsService, CarData } from '../services/googleSheets';

// Query keys
export const googleSheetsKeys = {
  all: ['googleSheets'] as const,
  cars: () => [...googleSheetsKeys.all, 'cars'] as const,
  availableCars: (startDate?: string, endDate?: string) =>
    [...googleSheetsKeys.cars(), 'available', startDate, endDate] as const,
  reservations: () => [...googleSheetsKeys.all, 'reservations'] as const,
};

// Hook за получаване на всички автомобили
export function useCarsData() {
  return useQuery({
    queryKey: googleSheetsKeys.cars(),
    queryFn: () => googleSheetsService.getCarsData(),
    staleTime: 1000 * 60 * 5, // 5 минути
  });
}

// Hook за търсене на налични автомобили
export function useAvailableCars(
  startDate: string,
  endDate: string,
  enabled: boolean = false
) {
  return useQuery({
    queryKey: googleSheetsKeys.availableCars(startDate, endDate),
    queryFn: () => googleSheetsService.getAvailableCars(startDate, endDate),
    enabled: enabled && !!startDate && !!endDate,
    staleTime: 1000 * 60 * 2, // 2 минути за наличност
  });
}

// Hook за запазване на автомобил
export function useBookCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingData: {
      carId: string;
      startDate: string;
      endDate: string;
      clientName: string;
      clientPhone: string;
      clientEmail: string;
    }) => googleSheetsService.createReservation(bookingData),
    onSuccess: (data, variables) => {
      // Инвалидираме кеша за наличните автомобили
      queryClient.invalidateQueries({
        queryKey: googleSheetsKeys.availableCars(
          variables.startDate,
          variables.endDate
        ),
      });

      // Инвалидираме кеша за всички автомобили
      queryClient.invalidateQueries({
        queryKey: googleSheetsKeys.cars(),
      });

      console.log('Автомобилът е запазен успешно:', data);
    },
    onError: (error) => {
      console.error('Грешка при запазване на автомобил:', error);
    },
  });
}

// Hook за проверка на наличност
export function useCheckAvailability() {
  return useMutation({
    mutationFn: (data: { carId: string; startDate: string; endDate: string }) =>
      googleSheetsService.checkAvailability(data),
  });
}

// Hook за изпращане на email
export function useSendEmail() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      googleSheetsService.sendEmailNotification(data),
  });
}
