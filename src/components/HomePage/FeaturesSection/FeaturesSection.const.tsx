import { DirectionsCar, Security, Support, Payment } from '@mui/icons-material';
import { Feature } from './FeaturesSection.types';

export const getFeatures = (currentLang: string): Feature[] => [
  {
    icon: <DirectionsCar sx={{ fontSize: 40, color: '#1976d2' }} />,
    title:
      currentLang === 'bg' ? 'Широка гама автомобили' : 'Wide Car Selection',
    description:
      currentLang === 'bg'
        ? 'Избирайте от нашата разнообразна гама автомобили за всеки бюджет и нужда'
        : 'Choose from our diverse range of cars for every budget and need',
  },
  {
    icon: <Security sx={{ fontSize: 40, color: '#1976d2' }} />,
    title: currentLang === 'bg' ? 'Пълна застраховка' : 'Full Insurance',
    description:
      currentLang === 'bg'
        ? 'Всички наши автомобили са напълно застраховани за вашата спокойност'
        : 'All our cars are fully insured for your peace of mind',
  },
  {
    icon: <Support sx={{ fontSize: 40, color: '#1976d2' }} />,
    title: currentLang === 'bg' ? '24/7 поддръжка' : '24/7 Support',
    description:
      currentLang === 'bg'
        ? 'Нашият екип е на разположение 24/7 за всякакви въпроси или проблеми'
        : 'Our team is available 24/7 for any questions or issues',
  },
  {
    icon: <Payment sx={{ fontSize: 40, color: '#1976d2' }} />,
    title: currentLang === 'bg' ? 'Прозрачни цени' : 'Transparent Pricing',
    description:
      currentLang === 'bg'
        ? 'Без скрити такси или неочаквани разходи - знаете точно какво плащате'
        : 'No hidden fees or unexpected costs - you know exactly what you pay',
  },
];

export const getFeaturesTexts = (currentLang: string) => ({
  title: currentLang === 'bg' ? 'Нашите предимства' : 'Our Advantages',
});
