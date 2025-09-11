export const getTermsContent = (isEnglish: boolean) => ({
  generalTitle: isEnglish
    ? '1. General Rental Terms'
    : '1. Общи условия за наемане',

  generalDescription: isEnglish
    ? 'Car rental from Sof Car Rental is governed by the following general terms:'
    : 'Наемането на автомобили от Соф Кар Rental се регулира от следните общи условия:',

  ageRequirementsTitle: isEnglish
    ? '1.1. Age Requirements'
    : '1.1. Възрастови изисквания',

  requiredDocumentsTitle: isEnglish
    ? '1.2. Required Documents'
    : '1.2. Необходими документи',

  paymentTitle: isEnglish ? '2. Payment Terms' : '2. Условия за плащане',

  cancellationTitle: isEnglish
    ? '3. Cancellation Policy'
    : '3. Политика за отказ',

  insuranceTitle: isEnglish
    ? '4. Insurance Coverage'
    : '4. Застрахователно покритие',

  insuranceDescription: isEnglish
    ? 'All our vehicles are covered by comprehensive insurance:'
    : 'Всички наши автомобили са покрити с пълна застраховка:',

  importantNotesTitle: isEnglish ? '5. Important Notes' : '5. Важни забележки',

  closeButton: isEnglish ? 'Close' : 'Затвори',
});

export const getAgeRequirements = (isEnglish: boolean) => [
  {
    text: isEnglish
      ? 'Minimum age: 21 years for economy and standard cars'
      : 'Минимална възраст: 21 години за икономични и стандартни автомобили',
  },
  {
    text: isEnglish
      ? 'Minimum age: 25 years for premium cars'
      : 'Минимална възраст: 25 години за премиум автомобили',
  },
  {
    text: isEnglish
      ? 'Valid driving license for at least 2 years'
      : 'Валиден шофьорски удостоверение от поне 2 години',
  },
];

export const getRequiredDocuments = (isEnglish: boolean) => [
  {
    text: isEnglish
      ? 'Valid driving license'
      : 'Валиден шофьорски удостоверение',
  },
  {
    text: isEnglish ? 'Identity card or passport' : 'Лична карта или паспорт',
  },
  {
    text: isEnglish ? 'Credit card for deposit' : 'Кредитна карта за депозит',
  },
];

export const getPaymentTerms = (isEnglish: boolean) => [
  {
    text: isEnglish
      ? 'Payment is made in advance for the entire rental period'
      : 'Плащането се извършва предварително за целия период на наемане',
  },
  {
    text: isEnglish
      ? 'Security deposit is required (blocked on credit card)'
      : 'Изисква се депозит за сигурност (блокиран на кредитна карта)',
  },
  {
    text: isEnglish
      ? 'Deposit is released within 7-14 days after car return'
      : 'Депозитът се освобождава в рамките на 7-14 дни след връщане на автомобила',
  },
];

export const getCancellationPolicy = (isEnglish: boolean) => [
  {
    text: isEnglish
      ? 'Free cancellation up to 24 hours before rental start'
      : 'Безплатен отказ до 24 часа преди началото на наемане',
  },
  {
    text: isEnglish
      ? '50% charge for cancellation within 24 hours'
      : '50% такса за отказ в рамките на 24 часа',
  },
  {
    text: isEnglish
      ? 'No refund for no-show or same-day cancellation'
      : 'Няма възстановяване при неявяване или отказ в същия ден',
  },
];

export const getInsuranceCoverage = (isEnglish: boolean) => [
  {
    text: isEnglish
      ? 'Third-party liability insurance (mandatory)'
      : 'Застраховка за гражданска отговорност (задължителна)',
  },
  {
    text: isEnglish
      ? 'Comprehensive insurance (theft, fire, damage)'
      : 'Пълна застраховка (кражба, пожар, щети)',
  },
  {
    text: isEnglish
      ? 'Excess amount applies in case of damage'
      : 'Прилага се франшиза в случай на щети',
  },
];

export const getImportantNotes = (isEnglish: boolean) => [
  {
    text: isEnglish
      ? 'Smoking is strictly prohibited in all vehicles'
      : 'Пушенето е строго забранено във всички автомобили',
  },
  {
    text: isEnglish
      ? 'Pets are not allowed in vehicles'
      : 'Домашните любимци не са разрешени в автомобилите',
  },
  {
    text: isEnglish
      ? 'Vehicle must be returned with the same fuel level'
      : 'Автомобилът трябва да бъде върнат със същото ниво на гориво',
  },
];
