import { Phone, Email, LocationOn, Business } from '@mui/icons-material';
import { APP_CONFIG } from '../../../utils/constants';

export const getContactTexts = (currentLang: string) => ({
  ctaTitle:
    currentLang === 'bg'
      ? 'Обадете ни се за наличности и цени или направете запитване в нашата контактна форма по-долу'
      : 'Call us for availability and prices or make an inquiry in our contact form below',
  contactTitle: currentLang === 'bg' ? 'Контакти' : 'Contact',
  formTitle: currentLang === 'bg' ? 'Направете запитване' : 'Make an Inquiry',
  infoTitle:
    currentLang === 'bg' ? 'Информация за контакт' : 'Contact Information',
  phone: currentLang === 'bg' ? 'Телефон' : 'Phone',
  address: currentLang === 'bg' ? 'Адрес' : 'Address',
  workingHours: currentLang === 'bg' ? 'Работно време' : 'Business Hours',
  workingHoursWeekdays:
    currentLang === 'bg'
      ? 'Понеделник - Петък: 8:00 - 18:00'
      : 'Monday - Friday: 8:00 AM - 6:00 PM',
  workingHoursSaturday:
    currentLang === 'bg'
      ? 'Събота: 9:00 - 16:00'
      : 'Saturday: 9:00 AM - 4:00 PM',
  addressText:
    currentLang === 'bg'
      ? 'Западна промишлена зона, ул. "Ямболен" 18, 8601 Ямбол'
      : APP_CONFIG.address,
});

export const getContactInfo = (currentLang: string) => [
  {
    icon: <Phone sx={{ color: 'primary.main' }} />,
    label: currentLang === 'bg' ? 'Телефон' : 'Phone',
    value: '+359 87 999 4212',
    link: 'tel:+359879994212',
  },
  {
    icon: <Email sx={{ color: 'primary.main' }} />,
    label: 'Email',
    value: APP_CONFIG.email,
    link: `mailto:${APP_CONFIG.email}`,
  },
  {
    icon: <LocationOn sx={{ color: 'primary.main' }} />,
    label: currentLang === 'bg' ? 'Адрес' : 'Address',
    value:
      currentLang === 'bg'
        ? 'Западна промишлена зона, ул. "Ямболен" 18, 8601 Ямбол'
        : APP_CONFIG.address,
    link: null,
  },
  {
    icon: <Business sx={{ color: 'primary.main' }} />,
    label: currentLang === 'bg' ? 'Работно време' : 'Business Hours',
    value:
      currentLang === 'bg'
        ? 'Понеделник - Петък: 8:00 - 18:00\nСъбота: 9:00 - 16:00'
        : 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM',
    link: null,
  },
];
