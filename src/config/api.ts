// API Configuration

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://sof-car.eu/api',
  ENDPOINTS: {
    ROOT: '/',
    CARS: '/cars',
    CAR_DETAILS: (id: number) => `/cars/${id}`,
    CAR_AVAILABILITY: (id: number) => `/cars/${id}/availability`,
    BOOKINGS: '/bookings',
    BOOKING_DETAILS: (id: number) => `/bookings/${id}`,
    BOOKING_BY_REFERENCE: (reference: string) =>
      `/bookings/reference/${reference}`,
    // Admin endpoints
    ADMIN_LOGIN: '/admin/login',
    ADMIN_LOGOUT: '/admin/logout',
    ADMIN_STATUS: '/admin/status',
    ADMIN_CARS: '/admin/cars',
    ADMIN_CAR_DETAILS: (id: string) => `/admin/cars/${id}`,
    ADMIN_BOOKINGS: '/admin/bookings',
    CONTACT_INQUIRY: '/contact/inquiry',
  },
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString + 'T00:00:00');
};
