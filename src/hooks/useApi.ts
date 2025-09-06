'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_CONFIG, formatDate } from '../config/api';
import type {
  Car,
  CarsResponse,
  BookingRequest,
  Booking,
  CarAvailability,
} from '../types/api';

// API functions
const apiCall = async <T>(
  endpoint: string,
  options?: {
    method?: string;
    data?: unknown;
    params?: Record<string, string>;
  }
): Promise<T> => {
  try {
    const response = await axios({
      url: `${API_CONFIG.BASE_URL}${endpoint}`,
      method: options?.method || 'GET',
      data: options?.data,
      params: options?.params,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data || {};
      throw new Error(
        errorData.error || `HTTP error! status: ${error.response?.status}`
      );
    }
    throw error;
  }
};

// Get all cars
export const useCars = (
  startDate: Date | undefined,
  endDate: Date | undefined,
  carClass?: string,
  enabled: boolean = true
) => {
  const params = new URLSearchParams();
  if (startDate) params.append('start_date', formatDate(startDate));
  if (endDate) params.append('end_date', formatDate(endDate));
  if (carClass) params.append('class', carClass);

  const endpoint = `${API_CONFIG.ENDPOINTS.CARS}?${params.toString()}`;

  return useQuery<CarsResponse>({
    queryKey: [
      'cars',
      startDate?.toISOString(),
      endDate?.toISOString(),
      carClass,
    ],
    queryFn: () => apiCall<CarsResponse>(endpoint),
    enabled: enabled && !!(startDate && endDate), // Only fetch when enabled and both dates are provided
  });
};

export const useAllCars = () => {
  const endpoint = `${API_CONFIG.ENDPOINTS.ALL_CARS}`;

  return useQuery<CarsResponse>({
    queryKey: ['allCars'],
    queryFn: () => apiCall<CarsResponse>(endpoint),
  });
};

// Get specific car
export const useCar = (carId: number) => {
  return useQuery<Car>({
    queryKey: ['car', carId],
    queryFn: () => apiCall<Car>(API_CONFIG.ENDPOINTS.CAR_DETAILS(carId)),
    enabled: !!carId,
  });
};

// Check car availability
export const useCarAvailability = (
  carId: number,
  startDate: Date,
  endDate: Date
) => {
  const params = new URLSearchParams({
    start_date: formatDate(startDate),
    end_date: formatDate(endDate),
  });

  const endpoint = `${API_CONFIG.ENDPOINTS.CAR_AVAILABILITY(
    carId
  )}?${params.toString()}`;

  return useQuery<CarAvailability>({
    queryKey: [
      'car-availability',
      carId,
      startDate.toISOString(),
      endDate.toISOString(),
    ],
    queryFn: () => apiCall<CarAvailability>(endpoint),
    enabled: !!carId && !!startDate && !!endDate,
  });
};

// Create booking
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<Booking, Error, BookingRequest>({
    mutationFn: (bookingData: BookingRequest) =>
      apiCall<Booking>(API_CONFIG.ENDPOINTS.BOOKINGS, {
        method: 'POST',
        data: bookingData,
      }),
    onSuccess: () => {
      // Invalidate and refetch cars to update availability
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      queryClient.invalidateQueries({ queryKey: ['car-availability'] });
    },
  });
};

// Get booking by ID
export const useBooking = (bookingId: number) => {
  return useQuery<Booking>({
    queryKey: ['booking', bookingId],
    queryFn: () =>
      apiCall<Booking>(API_CONFIG.ENDPOINTS.BOOKING_DETAILS(bookingId)),
    enabled: !!bookingId,
  });
};

// Get booking by reference
export const useBookingByReference = (reference: string) => {
  return useQuery<Booking>({
    queryKey: ['booking-reference', reference],
    queryFn: () =>
      apiCall<Booking>(API_CONFIG.ENDPOINTS.BOOKING_BY_REFERENCE(reference)),
    enabled: !!reference,
  });
};
