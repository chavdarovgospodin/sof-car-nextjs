import { CreditCard, Security, LocalGasStation } from '@mui/icons-material';
import { InfoBox, FeatureItem } from './AboutSection.types';

export const getAboutTexts = (currentLang: string) => ({
  title: currentLang === 'bg' ? 'За нас' : 'About Us',
  description:
    currentLang === 'bg'
      ? 'Разполагаме с голям асортимент от автомобили, разпределени по класове, като всички автомобили под наем са поддържани в перфектно техническо състояние, което гарантира Вашето сигурно и надеждно пътуване. Независимо дали се нуждаете от икономичен, стандартен или луксозен автомобил, ние можем да Ви предложим оферта която е изцяло съобразена с Вашите възможности, необходимости и предпочитания.'
      : 'We have a large selection of cars distributed by class, with all rental cars maintained in perfect technical condition, which guarantees your safe and reliable travel. Whether you need an economy, standard or luxury car, we can offer you a deal that is entirely tailored to your capabilities, needs and preferences.',
  whyChooseUsTitle:
    currentLang === 'bg'
      ? 'Защо да изберете нашите коли под наем'
      : 'Why choose our car rental service',
});

export const getInfoBoxes = (currentLang: string): InfoBox[] => [
  {
    icon: <CreditCard sx={{ fontSize: 40, color: 'primary.main' }} />,
    title:
      currentLang === 'bg'
        ? 'Цени и период за наемане'
        : 'Prices and Rental Period',
    description:
      currentLang === 'bg'
        ? 'Цени започващи от 30 лева на ден с минимален наемен период 5 дни и не по-малко от 5 години шофьорски стаж'
        : 'Prices starting from 30 BGN per day with a minimum rental period of 5 days and at least 5 years of driving experience',
  },
  {
    icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: currentLang === 'bg' ? 'Гаранционен депозит' : 'Security Deposit',
    description:
      currentLang === 'bg'
        ? 'При наемането на автомобила, Наемателят е длъжен да остави депозит. Стойността на депозита зависи от избрания клас на автомобил и е в диапазона от 200 до 500 лева.'
        : 'When renting a car, the Renter is required to leave a deposit. The deposit amount depends on the selected car class and ranges from 200 to 500 BGN.',
  },
  {
    icon: <LocalGasStation sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: currentLang === 'bg' ? 'Гориво' : 'Fuel',
    description:
      currentLang === 'bg'
        ? 'Автомобилът се предоставя с пълен резервоар и по условия на договора трябва да бъде върнат с пълен резервоар.'
        : 'The car is provided with a full tank and according to the contract terms it must be returned with a full tank.',
  },
];

export const getFeatures = (currentLang: string): FeatureItem[] => {
  if (currentLang === 'bg') {
    return [
      {
        text: 'Перфектно окомплектовани автомобили, съобразно изискванията на КАТ',
      },
      { text: 'Коли под наем в отлично техническо състояние' },
      { text: 'Атрактивна цена, без лимит на изминатите километри' },
      { text: 'Без скрити такси' },
      {
        text: 'Включени в цената: пълно автокаско, гражданска отговорност, денонощна пътна помощ, техническа поддръжка, платена пътна такса',
      },
    ];
  } else {
    return [
      { text: 'Perfectly equipped cars according to KAT requirements' },
      { text: 'Rental cars in excellent technical condition' },
      { text: 'Attractive price, no mileage limit' },
      { text: 'No hidden fees' },
      {
        text: 'Included in the price: full comprehensive insurance, civil liability, 24/7 roadside assistance, technical support, paid road tax',
      },
    ];
  }
};
