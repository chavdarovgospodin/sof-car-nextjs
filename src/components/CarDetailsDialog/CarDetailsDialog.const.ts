export const getTransmissionText = (
  transmission: string,
  t: (key: string) => string
) => {
  switch (transmission) {
    case 'manual':
      return t('booking.manualTransmission');
    case 'automatic':
      return t('booking.automaticTransmission');
    default:
      return t('booking.manualTransmission');
  }
};

export const getLuggageText = (
  car: { large_luggage?: number; small_luggage?: number },
  t: (key: string) => string
) => {
  const large = car.large_luggage || 0;
  const small = car.small_luggage || 0;

  if (large > 0 && small > 0) {
    return `${t('booking.largeLuggage')} x${large}, ${t(
      'booking.smallLuggage'
    )} x${small}`;
  } else if (large > 0) {
    return `${t('booking.largeLuggage')} x${large}`;
  } else if (small > 0) {
    return `${t('booking.smallLuggage')} x${small}`;
  }
  return '';
};
