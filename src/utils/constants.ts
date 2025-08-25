export const APP_CONFIG = {
  name: 'SofCar Yambol',
  description: 'Car rental service in Yambol',
  url: 'https://sof-car.eu',
  phone: '0879994212',
  email: '2013anikar@gmail.com',
  address: 'Западна промишлена зона Ямбол',
  coordinates: {
    lat: 42.500874,
    lng: 26.506668,
  },
};

export const CAR_CLASSES = {
  economy: {
    name: 'economy',
    displayName: {
      bg: 'Икономикачен клас',
      en: 'Economy Class',
    },
    price: {
      bg: '30.00',
      en: '30.00',
    },
    currency: 'BGN',
    description: {
      bg: 'Малки, практични и лесни за паркиране',
      en: 'Small, practical and easy to park',
    },
  },
  comfort: {
    name: 'comfort',
    displayName: {
      bg: 'Комфортен клас',
      en: 'Comfort Class',
    },
    price: {
      bg: '50.00',
      en: '50.00',
    },
    currency: 'BGN',
    description: {
      bg: 'Големи и удобни за семейни почивки',
      en: 'Large and comfortable for family trips',
    },
  },
  premium: {
    name: 'premium',
    displayName: {
      bg: 'Премиум клас',
      en: 'Premium Class',
    },
    price: {
      bg: '80.00',
      en: '80.00',
    },
    currency: 'BGN',
    description: {
      bg: 'Представителни автомобили за бизнес',
      en: 'Representative cars for business',
    },
  },
};

export const SUPPORTED_LANGUAGES = [
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export const DEFAULT_LANGUAGE = 'bg';

export const BOOKING_STEPS = [
  { id: 1, name: { bg: 'Информация за клиент', en: 'Customer Information' } },
  { id: 2, name: { bg: 'Избор на автомобил', en: 'Car Selection' } },
  { id: 3, name: { bg: 'Детайли за наема', en: 'Rental Details' } },
  { id: 4, name: { bg: 'Плащане', en: 'Payment' } },
];
