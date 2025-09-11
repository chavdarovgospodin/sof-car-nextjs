export const getHeroTexts = (currentLang: string) => ({
  mainTitle: currentLang === 'bg' ? 'Коли под наем Соф Кар' : 'Sof Car Rental',
  subtitle: currentLang === 'bg' ? 'град Ямбол' : 'Yambol City',
  description:
    currentLang === 'bg'
      ? 'Изгодни и надеждни автомобили под наем за град Ямбол и цялата страна.'
      : 'Affordable and reliable car rental service in Yambol and throughout the country.',
});
