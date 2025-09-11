export const calculateTotalPrice = (
  car: { price_per_day: number },
  rentalDates?: { start: Date | null; end: Date | null }
) => {
  if (!rentalDates?.start || !rentalDates?.end) {
    return car.price_per_day; // Return daily price if no dates
  }

  const diffTime = Math.abs(
    rentalDates.end.getTime() - rentalDates.start.getTime()
  );
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return car.price_per_day * diffDays;
};

export const calculateTotalDays = (rentalDates?: {
  start: Date | null;
  end: Date | null;
}) => {
  if (!rentalDates?.start || !rentalDates?.end) {
    return 1;
  }

  return Math.ceil(
    Math.abs(rentalDates.end.getTime() - rentalDates.start.getTime()) /
      (1000 * 60 * 60 * 24)
  );
};

export const getTransmissionText = (
  transmission: string,
  t: (key: string) => string
) => {
  return transmission === 'automatic'
    ? t('booking.automaticTransmission')
    : t('booking.manualTransmission');
};

export const getLuggageText = (
  car: { large_luggage?: number; small_luggage?: number },
  t: (key: string) => string
) => {
  if (car.large_luggage && car.small_luggage) {
    return `${t('booking.largeLuggage')} x${car.large_luggage}, ${t(
      'booking.smallLuggage'
    )} x${car.small_luggage}`;
  } else if (car.large_luggage) {
    return `${t('booking.largeLuggage')} x${car.large_luggage}`;
  } else if (car.small_luggage) {
    return `${t('booking.smallLuggage')} x${car.small_luggage}`;
  }
  return '';
};

export const getCustomFeaturesText = (features: string[]) => {
  if (features.length <= 2) {
    return features.join(', ');
  }
  return `${features.slice(0, 2).join(', ')}...`;
};
