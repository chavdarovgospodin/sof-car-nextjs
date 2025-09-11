export const getNavigationItems = (currentLang: string) => [
  {
    sectionId: 'offers',
    label: currentLang === 'bg' ? 'Автомобили' : 'Cars',
    isScroll: true,
  },
  {
    sectionId: 'contact',
    label: currentLang === 'bg' ? 'Контакти' : 'Contact',
    isScroll: true,
  },
  {
    isScroll: false,
    href: `/${currentLang}/about`,
    label: currentLang === 'bg' ? 'За нас' : 'About Us',
  },
];

export const getInfoItems = (currentLang: string) => [
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

export const getTexts = (currentLang: string) => ({
  information: currentLang === 'bg' ? 'Информация' : 'Information',
});
