// API Types for Sof Car Backend

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  class: string;
  price_per_day: number;
  deposit_amount: number;
  is_active: boolean;
  image_url: string;
  fuel_type: string;
  transmission: string;
  features?: string[];
  description?: string;
}

// Extended CarData for frontend compatibility
export interface CarData extends Car {
  available: boolean;
  price: number; // For compatibility with existing components
  features: string[]; // Make features required for frontend
}

export interface BookingRequest {
  car_id: number;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  client_name: string;
  client_email: string;
  client_phone: string;
  payment_method?: 'cash' | 'card' | 'bank_transfer';
  notes?: string;
}

export interface Booking {
  id: number;
  car_id: number;
  start_date: string;
  end_date: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  total_price: number;
  rental_days: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_method: string;
  deposit_amount: number;
  deposit_status: 'pending' | 'paid' | 'refunded';
  booking_reference: string;
  ip_address: string;
  notes?: string;
  created_at: string;
  version: number;
  car?: Car;
}

export interface CarAvailability {
  car: Car;
  start_date: string;
  end_date: string;
  is_available: boolean;
  total_price?: number;
  rental_days?: number;
  error?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status?: string;
}

export interface CarsResponse {
  cars: Car[];
  count: number;
  filters: {
    start_date?: string;
    end_date?: string;
    class?: string;
  };
}
