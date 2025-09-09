import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { APP_CONFIG } from '../utils/constants';

// Updated types to match backend
export interface AdminUser {
  logged_in: boolean;
  admin: string;
  login_time: string;
  session_expires: string;
}

export interface CarImage {
  id: string;
  image_url: string; // Backend uses 'image_url' not 'url'
  image_name: string;
  is_main: boolean;
  sort_order: number;
}

export interface AdminCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  class: 'economy' | 'standard' | 'premium';
  price_per_day: number;
  deposit_amount: number;
  is_active: boolean;
  image_urls: string[]; // Array of image URLs
  imageFiles?: File[]; // Array of files for upload
  fuel_type: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  features?: string[];
  // Structured features
  seats?: number;
  large_luggage?: number;
  small_luggage?: number;
  doors?: number;
  min_age?: number;
  four_wd?: boolean;
  ac?: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminBooking {
  id: string;
  car_id: string;
  client_first_name: string;
  client_last_name: string;
  client_email: string;
  client_phone: string;
  payment_method: string;
  start_date: string;
  rental_days: number;
  end_date: string;
  total_price: number;
  deposit_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'deleted';
  deposit_status: 'pending' | 'paid' | 'refunded';
  notes: string;
  cars?: {
    brand: string;
    model: string;
    year: number;
    class: string;
  };
  created_at: string;
  updated_at: string;
}

// Create axios instance with default config
const getAdminBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return APP_CONFIG.devUrl; // http://localhost:5002
  }
  return `${APP_CONFIG.url}/api`; // https://sof-car.eu/api
};

const adminApi = axios.create({
  baseURL: getAdminBaseURL(),
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle 401 errors globally
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Check if this is a logout request or if we're already on login page
      const isLogoutRequest = error.config?.url?.includes('/admin/logout');
      const isOnLoginPage =
        typeof window !== 'undefined' &&
        window.location.pathname.includes('/admin/login');

      // Only show session expired message for actual session expiration, not logout
      if (!isLogoutRequest && !isOnLoginPage) {
        console.warn('Session expired, redirecting to login');
        alert('Сесията ви е изтекла. Моля, влезте отново в системата.');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// API functions
const adminApiFunctions = {
  // Auth
  login: async (credentials: { username: string; password: string }) => {
    const response = await adminApi.post('/admin/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await adminApi.post('/admin/logout');
    return response.data;
  },

  checkStatus: async () => {
    const response = await adminApi.get('/admin/status');
    return response.data;
  },

  // Cars
  getCars: async () => {
    const response = await adminApi.get('/admin/cars');
    return response.data;
  },

  createCar: async (carData: Partial<AdminCar>) => {
    // If there are image files, send as FormData
    if (carData.imageFiles && carData.imageFiles.length > 0) {
      const formData = new FormData();

      // Add all car data fields
      Object.entries(carData).forEach(([key, value]) => {
        if (key === 'imageFiles') {
          // Add image files
          carData.imageFiles?.forEach((file) => {
            formData.append('images', file);
          });
        } else if (key === 'features' && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const response = await adminApi.post('/admin/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // No images, send as JSON
      const response = await adminApi.post('/admin/cars', carData);
      return response.data;
    }
  },

  createCarWithImage: async (formData: FormData) => {
    const response = await adminApi.post('/admin/cars', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateCar: async (id: string, carData: Partial<AdminCar>) => {
    const hasImageFiles = carData.imageFiles && carData.imageFiles.length > 0;
    const hasImageUrls = 'image_urls' in carData; // Check if field is present

    // If there are image files OR image_urls changes, use FormData
    if (hasImageFiles || hasImageUrls) {
      const formData = new FormData();

      // Add all car data fields
      Object.entries(carData).forEach(([key, value]) => {
        if (key === 'imageFiles') {
          // Add new image files
          carData.imageFiles?.forEach((file) => {
            formData.append('images', file);
          });
        } else if (key === 'image_urls') {
          // IMPORTANT: Send image_urls as JSON string
          formData.append('image_urls', JSON.stringify(value || []));
        } else if (key === 'features' && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const response = await adminApi.put(`/admin/cars/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // No image changes - send as JSON
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { imageFiles, image_urls, ...jsonData } = carData;
      const response = await adminApi.put(`/admin/cars/${id}`, jsonData);
      return response.data;
    }
  },

  updateCarWithImage: async (id: string, formData: FormData) => {
    const response = await adminApi.put(`/admin/cars/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteCar: async (id: string) => {
    const response = await adminApi.delete(`/admin/cars/${id}`);
    return response.data;
  },

  deleteCarImage: async (carId: string, imageId: string) => {
    const response = await adminApi.delete(
      `/admin/cars/${carId}/images/${imageId}`
    );
    return response.data;
  },

  // Bookings
  getBookings: async (params?: {
    status?: string;
    car_id?: string;
    start_date?: string;
    end_date?: string;
    limit?: number;
    offset?: number;
  }) => {
    const response = await adminApi.get('/admin/bookings', { params });
    return response.data;
  },

  updateBooking: async (
    id: string,
    data: { status?: string; deposit_status?: string; notes?: string }
  ) => {
    const response = await adminApi.put(`/admin/bookings/${id}`, data);
    return response.data;
  },

  deleteBooking: async (id: string) => {
    const response = await adminApi.patch(`/admin/bookings/${id}`, {
      status: 'deleted',
    });
    return response.data;
  },
};

// Hook
export const useAdmin = (
  activeTab?: 'bookings' | 'cars' | 'none',
  skipStatusCheck = false
) => {
  const queryClient = useQueryClient();

  // Session check on mount - skip on login page
  const {
    data: adminUser,
    isLoading: isLoadingUser,
    refetch: refetchUser,
    error: userError,
  } = useQuery({
    queryKey: ['admin', 'user'],
    queryFn: async () => {
      try {
        // Check if user is authenticated via status endpoint
        const statusResponse = await adminApiFunctions.checkStatus();
        return statusResponse;
      } catch (error) {
        console.error('Session check failed:', error);
        // If 401, user is not authenticated
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          queryClient.setQueryData(['admin', 'user'], null);
          return null;
        }
        throw error;
      }
    },
    enabled: !skipStatusCheck, // Skip status check if requested
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: adminApiFunctions.login,
    onSuccess: async (data) => {
      if (data.success) {
        // After successful login, fetch the actual admin status
        try {
          const statusData = await adminApiFunctions.checkStatus();
          queryClient.setQueryData(['admin', 'user'], statusData);
        } catch (error) {
          console.error('Failed to get status after login:', error);
          // Fallback: set basic user data from login response
          queryClient.setQueryData(['admin', 'user'], {
            logged_in: true,
            admin: data.admin,
            login_time: new Date().toISOString(),
            session_expires: data.session_expires,
          });
        }
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: adminApiFunctions.logout,
    onSuccess: () => {
      queryClient.setQueryData(['admin', 'user'], null);
      queryClient.removeQueries({ queryKey: ['admin'] });
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Even if logout fails, clear local state
      queryClient.setQueryData(['admin', 'user'], null);
      queryClient.removeQueries({ queryKey: ['admin'] });
    },
  });

  // Cars queries
  const {
    data: carsResponse,
    isLoading: isLoadingCars,
    refetch: refetchCars,
    error: carsError,
  } = useQuery({
    queryKey: ['admin', 'cars'],
    queryFn: adminApiFunctions.getCars,
    enabled: !!adminUser?.logged_in && activeTab === 'cars',
    retry: (failureCount, error) => {
      // Don't retry on 401 (unauthorized)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        queryClient.setQueryData(['admin', 'user'], null);
        return false;
      }
      return failureCount < 3;
    },
  });

  const createCarMutation = useMutation({
    mutationKey: ['admin', 'create-car'],
    mutationFn: adminApiFunctions.createCar,
    onSuccess: (newCar) => {
      const created: AdminCar = (newCar?.car || newCar) as AdminCar;
      // Optimistic update - add new car to cache instead of refetching
      queryClient.setQueryData(
        ['admin', 'cars'],
        (oldData: { cars: AdminCar[] } | undefined) => {
          if (!oldData?.cars) return oldData;
          return {
            ...oldData,
            cars: [created, ...oldData.cars], // Add new car at the beginning
          };
        }
      );
    },
    onError: () => {
      // Revert optimistic update on error
      queryClient.invalidateQueries({ queryKey: ['admin', 'cars'] });
    },
  });

  const createCarWithImageMutation = useMutation({
    mutationKey: ['admin', 'create-car-with-image'],
    mutationFn: adminApiFunctions.createCarWithImage,
    onSuccess: (newCar) => {
      const created: AdminCar = (newCar?.car || newCar) as AdminCar;
      queryClient.setQueryData(
        ['admin', 'cars'],
        (oldData: { cars: AdminCar[] } | undefined) => {
          if (!oldData?.cars) return oldData;
          return { ...oldData, cars: [created, ...oldData.cars] }; // Add new car at the beginning
        }
      );
    },
    onError: () => {
      // Revert optimistic update on error
      queryClient.invalidateQueries({ queryKey: ['admin', 'cars'] });
    },
  });

  const updateCarMutation = useMutation({
    mutationKey: ['admin', 'update-car'],
    mutationFn: ({ id, carData }: { id: string; carData: Partial<AdminCar> }) =>
      adminApiFunctions.updateCar(id, carData),
    onSuccess: (updatedCar, { id, carData }) => {
      const patch: Partial<AdminCar> = ((updatedCar &&
        (updatedCar.car || updatedCar)) ||
        carData) as Partial<AdminCar>;
      // Optimistic update - update specific car in cache instead of refetching
      queryClient.setQueryData(
        ['admin', 'cars'],
        (oldData: { cars: AdminCar[] } | undefined) => {
          if (!oldData?.cars) return oldData;
          return {
            ...oldData,
            cars: oldData.cars.map((car) =>
              car.id === id ? { ...car, ...patch } : car
            ),
          };
        }
      );
    },
    onError: () => {
      // Revert optimistic update on error
      queryClient.invalidateQueries({ queryKey: ['admin', 'cars'] });
    },
  });

  const updateCarWithImageMutation = useMutation({
    mutationKey: ['admin', 'update-car-with-image'],
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      adminApiFunctions.updateCarWithImage(id, formData),
    onSuccess: (updated, { id }) => {
      const patch: Partial<AdminCar> = (updated?.car ||
        updated) as Partial<AdminCar>;
      queryClient.setQueryData(
        ['admin', 'cars'],
        (oldData: { cars: AdminCar[] } | undefined) => {
          if (!oldData?.cars) return oldData;
          return {
            ...oldData,
            cars: oldData.cars.map((car) =>
              car.id === id ? { ...car, ...patch } : car
            ),
          };
        }
      );
    },
    onError: () => {
      // Revert optimistic update on error
      queryClient.invalidateQueries({ queryKey: ['admin', 'cars'] });
    },
  });

  const deleteCarMutation = useMutation({
    mutationKey: ['admin', 'delete-car'],
    mutationFn: adminApiFunctions.deleteCar,
    onSuccess: () => {
      // Refetch cars data after successful deletion
      queryClient.invalidateQueries({ queryKey: ['admin', 'cars'] });
    },
  });

  const deleteCarImageMutation = useMutation({
    mutationKey: ['admin', 'delete-car-image'],
    mutationFn: ({ carId, imageId }: { carId: string; imageId: string }) =>
      adminApiFunctions.deleteCarImage(carId, imageId),
    onSuccess: () => {
      // no-op for now
    },
  });

  // Bookings queries
  const {
    data: bookingsResponse,
    isLoading: isLoadingBookings,
    refetch: refetchBookings,
    error: bookingsError,
  } = useQuery({
    queryKey: ['admin', 'bookings'],
    queryFn: () => adminApiFunctions.getBookings(),
    enabled: !!adminUser?.logged_in && activeTab === 'bookings',
    retry: (failureCount, error) => {
      // Don't retry on 401 (unauthorized)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        queryClient.setQueryData(['admin', 'user'], null);
        return false;
      }
      return failureCount < 3;
    },
  });

  const updateBookingMutation = useMutation({
    mutationKey: ['admin', 'update-booking'],
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { status?: string; deposit_status?: string; notes?: string };
    }) => adminApiFunctions.updateBooking(id, data),
    onSuccess: (updatedBooking, { id, data }) => {
      // Optimistic update - update booking in cache
      queryClient.setQueryData(
        ['admin', 'bookings'],
        (oldData: { bookings: AdminBooking[] } | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            bookings: oldData.bookings.map((booking) =>
              booking.id === id
                ? { ...booking, ...data, updated_at: new Date().toISOString() }
                : booking
            ),
          };
        }
      );
    },
    onError: () => {
      // Revert optimistic update on error
      queryClient.invalidateQueries({ queryKey: ['admin', 'bookings'] });
    },
  });

  const deleteBookingMutation = useMutation({
    mutationKey: ['admin', 'delete-booking'],
    mutationFn: (id: string) => adminApiFunctions.deleteBooking(id),
    onSuccess: (deletedBooking, bookingId) => {
      // Optimistic update - update booking status to deleted in cache
      queryClient.setQueryData(
        ['admin', 'bookings'],
        (oldData: { bookings: AdminBooking[] } | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            bookings: oldData.bookings.map((booking) =>
              booking.id === bookingId
                ? {
                    ...booking,
                    status: 'deleted',
                    updated_at: new Date().toISOString(),
                  }
                : booking
            ),
          };
        }
      );
    },
    onError: () => {
      // Revert optimistic update on error
      queryClient.invalidateQueries({ queryKey: ['admin', 'bookings'] });
    },
  });

  // Extract data from backend responses
  const cars = carsResponse?.cars || [];
  const bookings = bookingsResponse?.bookings || [];

  return {
    // Data
    adminUser,
    cars,
    bookings,
    carsResponse,
    bookingsResponse,

    // Loading states
    isLoadingUser,
    isLoadingCars,
    isLoadingBookings,

    // Auth mutations
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    loginMutation,

    // Car mutations
    createCar: createCarMutation.mutateAsync,
    createCarWithImage: createCarWithImageMutation.mutateAsync,
    updateCar: updateCarMutation.mutateAsync,
    updateCarWithImage: updateCarWithImageMutation.mutateAsync,
    deleteCar: deleteCarMutation.mutateAsync,
    deleteCarImage: deleteCarImageMutation.mutate,

    isCreatingCar:
      createCarMutation.isPending || createCarWithImageMutation.isPending,
    isUpdatingCar:
      updateCarMutation.isPending || updateCarWithImageMutation.isPending,
    isDeletingCar: deleteCarMutation.isPending,
    isDeletingCarImage: deleteCarImageMutation.isPending,

    // Booking mutations
    updateBooking: updateBookingMutation.mutate,
    deleteBooking: deleteBookingMutation.mutate,
    isUpdatingBooking: updateBookingMutation.isPending,
    isDeletingBooking: deleteBookingMutation.isPending,

    // Refetch functions
    refetchUser,
    refetchCars,
    refetchBookings,

    // Error states
    userError,
    carsError,
    bookingsError,
  };
};

// Hook for getting bookings for a specific car
export const useCarBookings = (
  carId: string | null,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['admin', 'car-bookings', carId],
    queryFn: () => adminApiFunctions.getBookings({ car_id: carId! }),
    enabled: !!carId && enabled,
    retry: (failureCount, error) => {
      // Don't retry on 401 (unauthorized)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
