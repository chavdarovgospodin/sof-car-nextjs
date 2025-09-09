export const texts = {
  title: 'Общи условия и политики',
  subtitle:
    'Пълна информация за вашите права и задължения при наемане на автомобили',
  sections: {
    generalTerms: {
      title: '1. Общи условия за наемане',
      description:
        'Наемането на автомобили от Соф Кар Rental се регулира от следните общи условия:',
      rentalConditions: {
        title: '1.1 Условия за наемане',
        conditions: [
          'Наемането е възможно за лица на възраст 21+ години',
          'Необходимо е валидно шофьорско удостоверение с минимален стаж 2 години',
          'Изисква се валидна лична карта или паспорт',
          'Минималният период за наем е 5 дни',
          'Максималният период за наем е 30 дни',
        ],
      },
      rentalDocuments: {
        title: '1.2 Документи за наемане',
        documents: [
          'Валидно шофьорско удостоверение',
          'Лична карта или паспорт',
          'Договор за наем (подписан при вземане)',
          'Депозит в размер на 200 лева',
        ],
      },
    },
    cancellationPolicy: {
      title: '2. Политика за отказ',
      description: 'Политиката за отказ на резервация се прилага както следва:',
      before24h: {
        title: '2.1 Отказ преди 24 часа',
        rules: [
          'Пълно възстановяване на сумата',
          'Без допълнителни такси',
          'Възстановяване в рамките на 5 работни дни',
        ],
      },
      within24h: {
        title: '2.2 Отказ в рамките на 24 часа',
        rules: [
          'Удържане на 50% от сумата',
          'Възстановяване на 50% в рамките на 5 работни дни',
          'Приложимо за резервации за следващия ден',
        ],
      },
      sameDay: {
        title: '2.3 Отказ в деня на резервация',
        rules: [
          'Удържане на 100% от сумата',
          'Без възстановяване',
          'Приложимо за резервации за същия ден',
        ],
      },
      forceMajeure: {
        title: '2.4 Форсмажорни обстоятелства',
        rules: [
          'При природни бедствия, пандемии, войни',
          'Пълно възстановяване на сумата',
          'Необходимо е документално потвърждение',
        ],
      },
    },
    deliveryPolicy: {
      title: '3. Политика за доставка',
      description: 'Политиката за доставка на автомобили включва:',
      pickup: {
        title: '3.1 Вземане на автомобила',
        options: [
          'Вземане от офиса в Ямбол - без допълнителна такса',
          'Доставка на друго място в Ямбол - 50 лева',
          'Доставка на летище - 100 лева',
        ],
      },
    },
    insurance: {
      title: '4. Застраховане и отговорност',
      description: 'Всички автомобили са застраховани с пълно покритие:',
      types: {
        collision: {
          title: 'Автокаско:',
          description: 'Покрива щетите при пътнотранспортно произшествие',
        },
        liability: {
          title: 'Гражданска отговорност:',
          description: 'Покрива щетите на трети лица',
        },
        assistance: {
          title: 'Денонощна помощ:',
          description: 'Помощ на пътя при проблеми',
        },
      },
    },
    paymentTerms: {
      title: '5. Условия за плащане',
      terms: {
        deposit: {
          title: 'Депозит:',
          description: '200-500 лева в зависимост от класа автомобил',
        },
        payment: {
          title: 'Плащане:',
          description: 'В брой или с кредитна карта при вземане',
        },
        refund: {
          title: 'Възстановяване на депозита:',
          description: 'При връщане на автомобила в добро състояние',
        },
      },
    },
    contact: {
      title: '6. Контакти',
      description:
        'За въпроси относно общите условия или за резервация, моля свържете се с нас:',
      info: {
        email: 'Email:',
        phone: 'Phone:',
        address: 'Address:',
        businessHours: 'Business Hours:',
      },
      values: {
        phone: '+359 87 999 4212',
        address: 'Западна промишлена зона, ул. "Ямболен" 18, 8601 Ямбол',
        businessHours: 'Понеделник - Петък: 8:00 - 18:00',
      },
    },
  },
};

export const enTexts = {
  title: 'Terms & Conditions',
  subtitle:
    'Complete information about your rights and obligations when renting cars',
  sections: {
    generalTerms: {
      title: '1. General Rental Terms',
      description:
        'Car rental from Sof Car Rental is governed by the following general terms:',
      rentalConditions: {
        title: '1.1 Rental Conditions',
        conditions: [
          'Rental is available for persons aged 21+ years',
          "Valid driver's license with minimum 2 years experience required",
          'Valid ID card or passport required',
          'Minimum rental period is 5 days',
          'Maximum rental period is 30 days',
        ],
      },
      rentalDocuments: {
        title: '1.2 Rental Documents',
        documents: [
          "Valid driver's license",
          'ID card or passport',
          'Rental contract (signed upon pickup)',
          'Deposit of 200 BGN',
        ],
      },
    },
    cancellationPolicy: {
      title: '2. Cancellation Policy',
      description: 'The reservation cancellation policy applies as follows:',
      before24h: {
        title: '2.1 Cancellation before 24 hours',
        rules: [
          'Full refund of the amount',
          'No additional fees',
          'Refund within 5 business days',
        ],
      },
      within24h: {
        title: '2.2 Cancellation within 24 hours',
        rules: [
          '50% of the amount is withheld',
          '50% refund within 5 business days',
          'Applicable for reservations for the next day',
        ],
      },
      sameDay: {
        title: '2.3 Cancellation on the day of reservation',
        rules: [
          '100% of the amount is withheld',
          'No refund',
          'Applicable for reservations for the same day',
        ],
      },
      forceMajeure: {
        title: '2.4 Force Majeure',
        rules: [
          'In case of natural disasters, pandemics, wars',
          'Full refund of the amount',
          'Documentary confirmation required',
        ],
      },
    },
    deliveryPolicy: {
      title: '3. Delivery Policy',
      description: 'The car delivery policy includes:',
      pickup: {
        title: '3.1 Car Pickup',
        options: [
          'Pickup from Yambol office - no additional fee',
          'Delivery to other location in Yambol - 50 BGN',
          'Airport delivery - 100 BGN',
        ],
      },
    },
    insurance: {
      title: '4. Insurance and Liability',
      description: 'All cars are fully insured with comprehensive coverage:',
      types: {
        collision: {
          title: 'Collision insurance:',
          description: 'Covers damages in case of traffic accident',
        },
        liability: {
          title: 'Liability insurance:',
          description: 'Covers damages to third parties',
        },
        assistance: {
          title: '24/7 assistance:',
          description: 'Roadside assistance in case of problems',
        },
      },
    },
    paymentTerms: {
      title: '5. Payment Terms',
      terms: {
        deposit: {
          title: 'Deposit:',
          description: '200-500 BGN depending on car class',
        },
        payment: {
          title: 'Payment:',
          description: 'Cash or credit card upon pickup',
        },
        refund: {
          title: 'Deposit refund:',
          description: 'When returning the car in good condition',
        },
      },
    },
    contact: {
      title: '6. Contact Information',
      description:
        'For questions about terms and conditions or for reservations, please contact us:',
      info: {
        email: 'Email:',
        phone: 'Phone:',
        address: 'Address:',
        businessHours: 'Business Hours:',
      },
      values: {
        phone: '+359 87 999 4212',
        address: 'Western Industrial Zone, "Yambolen" 18 St, 8601 Yambol',
        businessHours: 'Monday - Friday: 8:00 AM - 6:00 PM',
      },
    },
  },
};
