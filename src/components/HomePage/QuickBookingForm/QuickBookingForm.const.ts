import dayjs from 'dayjs';

export const getQuickBookingTexts = (currentLang: string) => ({
  title: currentLang === 'bg' ? 'Започни търсене' : 'Start searching',
  pickupDate: currentLang === 'bg' ? 'Дата на вземане' : 'Pickup Date',
  pickupTime: currentLang === 'bg' ? 'Час на вземане' : 'Pickup Time',
  returnDate: currentLang === 'bg' ? 'Дата на връщане' : 'Return Date',
  returnTime: currentLang === 'bg' ? 'Час на връщане' : 'Return Time',
  searchButton: currentLang === 'bg' ? 'Покажи обявите' : 'Show offers',
  invalidDates:
    currentLang === 'bg'
      ? 'Датата на връщане трябва да бъде след датата на вземане'
      : 'Return date must be after pickup date',
  sameDay:
    currentLang === 'bg'
      ? 'Вземане и връщане в същия ден не е позволено'
      : 'Pickup and return on the same day is not allowed',
});

export const getInitialDates = (): {
  pickupDate: string;
  pickupTime: dayjs.Dayjs | null;
  returnDate: string;
  returnTime: dayjs.Dayjs | null;
} => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);

  const fiveDaysLater = new Date(tomorrow);
  fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);
  fiveDaysLater.setHours(17, 0, 0, 0);

  return {
    pickupDate: tomorrow.toISOString().split('T')[0],
    pickupTime: dayjs().hour(9).minute(0).second(0),
    returnDate: fiveDaysLater.toISOString().split('T')[0],
    returnTime: dayjs().hour(17).minute(0).second(0),
  };
};
