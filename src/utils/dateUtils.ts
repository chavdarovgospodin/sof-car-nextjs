export function formatDate(date: string | Date, locale: string = 'bg'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return dateObj.toLocaleDateString(
    locale === 'bg' ? 'bg-BG' : 'en-US',
    options
  );
}

export function formatDateShort(
  date: string | Date,
  locale: string = 'bg'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return dateObj.toLocaleDateString(
    locale === 'bg' ? 'bg-BG' : 'en-US',
    options
  );
}

export function getDaysDifference(
  startDate: string | Date,
  endDate: string | Date
): number {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  const timeDiff = end.getTime() - start.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysDiff;
}

export function getMinDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function getMaxDate(): string {
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return maxDate.toISOString().split('T')[0];
}

export function isValidDateRange(startDate: string, endDate: string): boolean {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return start < end && start >= new Date();
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
}

// Дефолтен час 9:00 сутринта
export const getDefaultTime = (date: Date): Date => {
  const defaultDate = new Date(date);
  defaultDate.setHours(9, 0, 0, 0);
  return defaultDate;
};

// Функция за закръгляне на минутите до най-близките 15 минути
export const roundToNearest15Minutes = (date: Date): Date => {
  const minutes = date.getMinutes();
  const roundedMinutes = Math.round(minutes / 15) * 15;
  const newDate = new Date(date);
  newDate.setMinutes(roundedMinutes, 0, 0);
  return newDate;
};

// Функция за изчисляване на дните между две дати
export const calculateDays = (start: Date, end: Date): number => {
  const diffTime = end.getTime() - start.getTime();
  const diffHours = diffTime / (1000 * 60 * 60);
  const diffDays = diffHours / 24;

  // Ако е минало 24 часа, считаме за 2 дни
  if (diffHours > 24) {
    return Math.ceil(diffDays);
  }

  // Ако е под 24 часа, но е след полунощ, считаме за 1 ден
  if (start.getDate() !== end.getDate()) {
    return 1;
  }

  return 0;
};

// Функция за минимална крайна дата (5 дни след началната)
export const getMinEndDate = (start: Date) => {
  const minDate = new Date(start);
  minDate.setDate(minDate.getDate() + 5); // Минимум 5 дни след началната дата
  return minDate;
};

// Функция за максимална крайна дата (30 дни след началната)
export const getMaxEndDate = (start: Date) => {
  const maxDate = new Date(start);
  maxDate.setDate(maxDate.getDate() + 30); // Max 30 дни rental
  return maxDate;
};

/**
 * Encodes date range into a compressed string for clean URLs
 */
export function encodeDateRange(startDate: Date, endDate: Date): string {
  // Convert dates to timestamps and create a compact representation
  const start = startDate.getTime();
  const end = endDate.getTime();

  // Create a more compact representation
  // Convert to base36 for shorter strings and add a simple hash
  const startBase36 = start.toString(36);
  const endBase36 = end.toString(36);

  // Create a simple hash from the combined string
  let hash = 0;
  const combined = startBase36 + endBase36;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Convert hash to base36 and combine with timestamps
  const hashBase36 = Math.abs(hash).toString(36);
  const result = `${startBase36}-${endBase36}-${hashBase36}`;

  return result;
}

/**
 * Decodes a compressed string back to date range
 */
export function decodeDateRange(encodedString: string): {
  startDate: Date | null;
  endDate: Date | null;
} {
  try {
    // Split the encoded string into parts
    const parts = encodedString.split('-');

    if (parts.length !== 3) {
      return { startDate: null, endDate: null };
    }

    const [startBase36, endBase36, hashBase36] = parts;

    // Convert base36 back to timestamps
    const start = parseInt(startBase36, 36);
    const end = parseInt(endBase36, 36);

    if (isNaN(start) || isNaN(end)) {
      return { startDate: null, endDate: null };
    }

    // Verify hash (optional validation)
    const combined = startBase36 + endBase36;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    const expectedHash = Math.abs(hash).toString(36);
    if (expectedHash !== hashBase36) {
      console.warn('Hash validation failed for date range');
    }

    return {
      startDate: new Date(start),
      endDate: new Date(end),
    };
  } catch (error) {
    console.warn('Failed to decode date range:', error);
    return { startDate: null, endDate: null };
  }
}
