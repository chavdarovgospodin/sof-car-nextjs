export interface CarData {
  id: string;
  make: string;
  model: string;
  year: number;
  class: string;
  price: number;
  imageUrl: string;
  description: string;
  minAvailable: number;
}

export interface BookingData {
  carId: string;
  startDate: string;
  endDate: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
}

export interface BookingResponse {
  success: boolean;
  reservationId?: number;
  totalDays?: number;
  totalAmount?: number;
  message?: string;
  error?: string;
}

export class GoogleSheetsService {
  private webAppUrl: string;

  constructor() {
    this.webAppUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || '';

    if (!this.webAppUrl) {
      console.warn('Google Apps Script Web App URL не е конфигуриран');
    }
  }

  /**
   * Получава налични автомобили за конкретен период
   */
  async getAvailableCars(
    startDate: string,
    endDate: string
  ): Promise<CarData[]> {
    try {
      const response = await fetch(
        `/api/cars?startDate=${startDate}&endDate=${endDate}`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Грешка при получаване на данни');
      }

      return result.data || [];
    } catch (error) {
      console.error('Error in getAvailableCars:', error);
      throw error;
    }
  }

  /**
   * Получава всички автомобили (за тестване)
   */
  async getAllCars(): Promise<CarData[]> {
    try {
      const response = await fetch('/api/cars/all', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Грешка при получаване на данни');
      }

      return result.data || [];
    } catch (error) {
      console.error('Error in getAllCars:', error);
      throw error;
    }
  }

  /**
   * Запазва автомобил (създава резервация)
   */
  async createReservation(bookingData: BookingData): Promise<BookingResponse> {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Грешка при запазване на автомобил');
      }

      return result;
    } catch (error) {
      console.error('Error in createReservation:', error);
      throw error;
    }
  }

  /**
   * Проверява наличността на конкретен автомобил
   */
  async checkAvailability(data: {
    carId: string;
    startDate: string;
    endDate: string;
  }): Promise<boolean> {
    try {
      const availableCars = await this.getAvailableCars(
        data.startDate,
        data.endDate
      );
      return availableCars.some((car) => car.id === data.carId);
    } catch (error) {
      console.error('Error in checkAvailability:', error);
      return false;
    }
  }

  /**
   * Получава детайли за конкретен автомобил
   */
  async getCarById(carId: string): Promise<CarData | null> {
    try {
      const allCars = await this.getAllCars();
      return allCars.find((car) => car.id === carId) || null;
    } catch (error) {
      console.error('Error in getCarById:', error);
      return null;
    }
  }

  /**
   * Изпраща email потвърждение (чрез Google Apps Script)
   */
  async sendEmailNotification(
    data: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    // Този метод се използва от Google Apps Script автоматично
    // при създаване на резервация
    console.log('Email notification data:', data);
    return {
      success: true,
      message: 'Email notification handled by Google Apps Script',
    };
  }

  /**
   * Получава данни за автомобилите (fallback метод)
   */
  async getCarsData(): Promise<CarData[]> {
    // Този метод може да се използва за получаване на всички автомобили
    // ако е необходимо, но основно работим с getAvailableCars
    try {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const startDate = today.toISOString().split('T')[0];
      const endDate = tomorrow.toISOString().split('T')[0];

      return await this.getAvailableCars(startDate, endDate);
    } catch (error) {
      console.error('Error in getCarsData:', error);
      return [];
    }
  }
}

// Създаваме инстанция на service-а
export const googleSheetsService = new GoogleSheetsService();
