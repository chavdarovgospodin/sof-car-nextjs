export const getCarsTexts = (currentLang: string) => ({
  title: currentLang === 'bg' ? 'Нашите автомобили' : 'Our Cars',
  subtitle:
    currentLang === 'bg'
      ? 'Разгледайте всички наши автомобили и изберете най-подходящия за вас'
      : 'Browse all our cars and choose the most suitable one for you',
  errorLoading:
    currentLang === 'bg'
      ? 'Грешка при зареждане на автомобилите'
      : 'Error loading cars',
  seats: currentLang === 'bg' ? '5 места' : '5 seats',
  manualTransmission: currentLang === 'bg' ? 'Ръчни скорости' : 'Manual',
  automaticTransmission:
    currentLang === 'bg' ? 'Автоматични скорости' : 'Automatic',
  unlimitedMileage:
    currentLang === 'bg' ? 'Неограничен пробег' : 'Unlimited mileage',
  features: currentLang === 'bg' ? 'Възможности' : 'Features',
  from: currentLang === 'bg' ? 'От' : 'From',
  day: currentLang === 'bg' ? 'ден' : 'day',
  includingTaxes:
    currentLang === 'bg' ? 'включва всички данъци' : 'including all taxes',
  seeAvailabilities:
    currentLang === 'bg' ? 'Вижте наличности' : 'See Availabilities',
});

export const getClassLabel = (carClass: string, currentLang: string) => {
  switch (carClass) {
    case 'economy':
      return currentLang === 'bg' ? 'Икономичен' : 'Economy';
    case 'standard':
      return currentLang === 'bg' ? 'Стандартен' : 'Standard';
    case 'premium':
      return currentLang === 'bg' ? 'Луксозен' : 'Premium';
    default:
      return carClass;
  }
};
