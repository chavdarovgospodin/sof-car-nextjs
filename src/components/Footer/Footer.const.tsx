import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { Box } from '@mui/material';

export const getFooterTexts = (currentLang: string) => ({
  companyDescription:
    currentLang === 'bg'
      ? 'Изгодни и надеждни автомобили под наем за град Ямбол и цялата страна.'
      : 'Affordable and reliable car rental service in Yambol and throughout the country.',
  connectWithUs: currentLang === 'bg' ? 'Свържете се с нас' : 'Connect with us',
  businessHours: currentLang === 'bg' ? 'Работно време:' : 'Business Hours:',
  weekdays:
    currentLang === 'bg'
      ? 'Понеделник - Петък: 8:00 - 18:00'
      : 'Monday - Friday: 8:00 AM - 6:00 PM',
  saturday:
    currentLang === 'bg'
      ? 'Събота: 9:00 - 16:00'
      : 'Saturday: 9:00 AM - 4:00 PM',
  allRightsReserved:
    currentLang === 'bg' ? 'Всички права запазени.' : 'All Rights Reserved.',
  privacyPolicy:
    currentLang === 'bg' ? 'Политика за поверителност' : 'Privacy Policy',
  termsConditions: currentLang === 'bg' ? 'Общи условия' : 'Terms & Conditions',
  pricing: currentLang === 'bg' ? 'Цени и тарифи' : 'Pricing',
  services: currentLang === 'bg' ? 'Услуги и автомобили' : 'Services & Cars',
  designedBy: currentLang === 'bg' ? 'Дизайн от' : 'Designed by',
  securePayments:
    currentLang === 'bg'
      ? 'Сигурни плащания с Visa Secure & MasterCard Identity Check'
      : 'Secure payments with Visa Secure & MasterCard Identity Check',
});

export const getSocialLinks = () => [
  {
    href: 'https://www.facebook.com/profile.php?id=61557338374090',
    icon: <Facebook />,
  },
  {
    href: 'https://www.instagram.com/sof_car_rental',
    icon: <Instagram />,
  },
  {
    href: 'viber://chat?number=+359879994212',
    icon: (
      <Box
        component="img"
        src="/viber-svgrepo-com.svg"
        alt="Viber"
        sx={{
          width: 20,
          height: 20,
          filter: 'brightness(0) invert(1)',
        }}
      />
    ),
  },
  {
    href: 'https://wa.me/359879994212',
    icon: <WhatsApp />,
  },
];

export const getFooterLinks = (currentLang: string) => [
  {
    href: `/${currentLang}/privacy-policy`,
    label:
      currentLang === 'bg' ? 'Политика за поверителност' : 'Privacy Policy',
  },
  {
    href: `/${currentLang}/terms-conditions`,
    label: currentLang === 'bg' ? 'Общи условия' : 'Terms & Conditions',
  },
  {
    href: `/${currentLang}/pricing`,
    label: currentLang === 'bg' ? 'Цени и тарифи' : 'Pricing',
  },
  {
    href: `/${currentLang}/services`,
    label: currentLang === 'bg' ? 'Услуги и автомобили' : 'Services & Cars',
  },
];
