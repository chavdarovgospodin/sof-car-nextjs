export const texts = {
  title: 'Цени и тарифи',
  subtitle:
    'Пълна информация за цените, таксите и депозитите при наемане на автомобили',
  basePrices: {
    title: '1. Основни цени за наемане',
    description:
      'Цените включват всички основни услуги и са валидни за минимален период от 5 дни:',
    table: {
      carClass: 'Клас автомобил',
      dailyRate: 'Цена на ден',
      deposit: 'Депозит',
      features: 'Характеристики',
    },
    classes: {
      economy: 'Икономичен клас',
      standard: 'Стандартен клас',
      premium: 'Луксозен клас',
    },
    models: {
      economy: 'Opel Corsa, VW Polo, подобни',
      standard: 'Skoda Octavia, VW Golf, подобни',
      premium: 'VW Arteon, Audi A4, подобни',
    },
    features: {
      economy: [
        'Малки градски автомобили',
        '4-5 пътника',
        '300-400л багаж',
        '5-7л/100км',
      ],
      standard: [
        'Семейни седани и комби',
        '5 пътника',
        '500-600л багаж',
        '6-8л/100км',
      ],
      premium: [
        'Бизнес седани и SUV',
        '5-7 пътника',
        '600+л багаж',
        '7-9л/100км',
      ],
    },
    currency: 'BGN',
    perDay: 'ден',
    depositLabel: 'депозит',
  },
  additionalFees: {
    title: '2. Допълнителни такси',
    description: 'Следните такси се прилагат в допълнение на основната цена:',
    pickupDelivery: {
      title: '2.1 Такси за вземане/връщане',
      services: {
        yambolOffice: 'Офис Ямбол',
        otherYambol: 'Друго място в Ямбол',
        sofiaAirport: 'Летище София',
        burgasAirport: 'Летище Бургас',
        varnaAirport: 'Летище Варна',
      },
      fees: {
        noFee: 'Без такса',
        yambolOther: '50 BGN',
        airports: '100 BGN',
      },
    },
  },
  whatsIncluded: {
    title: '3. Какво е включено в цената',
    features: {
      fullInsurance: {
        title: 'Пълно застраховане',
        description: 'Автокаско и гражданска отговорност',
      },
      support24_7: {
        title: '24/7 Поддръжка',
        description: 'Денонощна помощ на пътя',
      },
      unlimitedMileage: {
        title: 'Без лимит километри',
        description: 'Шофирайте колкото искате',
      },
      technicalSupport: {
        title: 'Техническа поддръжка',
        description: 'При проблем с автомобила',
      },
      replacementCar: {
        title: 'Резервен автомобил',
        description: 'При необходимост',
      },
      documentation: {
        title: 'Детайлна документация',
        description: 'Договор и фактура',
      },
    },
  },
  importantNotes: {
    title: '4. Важни забележки',
    notes: {
      minimumPeriod: {
        title: 'Минимален период:',
        description: '5 дни за всички класове автомобили',
      },
      deposit: {
        title: 'Депозит:',
        description:
          'Възстановява се при връщане на автомобила в добро състояние',
      },
      reservation: {
        title: 'Резервация:',
        description:
          'Препоръчително е да резервирате поне 24 часа предварително',
      },
    },
  },
};

export const enTexts = {
  title: 'Pricing & Rates',
  subtitle:
    'Complete information about prices, fees and deposits for car rental',
  basePrices: {
    title: '1. Base Rental Prices',
    description:
      'Prices include all basic services and are valid for a minimum period of 5 days:',
    table: {
      carClass: 'Car Class',
      dailyRate: 'Daily Rate',
      deposit: 'Deposit',
      features: 'Features',
    },
    classes: {
      economy: 'Economy Class',
      standard: 'Standard Class',
      premium: 'Premium Class',
    },
    models: {
      economy: 'Opel Corsa, VW Polo, similar',
      standard: 'Skoda Octavia, VW Golf, similar',
      premium: 'VW Arteon, Audi A4, similar',
    },
    features: {
      economy: [
        'Small city cars',
        '4-5 passengers',
        '300-400L luggage',
        '5-7L/100km',
      ],
      standard: [
        'Family sedans and wagons',
        '5 passengers',
        '500-600L luggage',
        '6-8L/100km',
      ],
      premium: [
        'Business sedans and SUVs',
        '5-7 passengers',
        '600+L luggage',
        '7-9L/100km',
      ],
    },
    currency: 'BGN',
    perDay: 'day',
    depositLabel: 'deposit',
  },
  additionalFees: {
    title: '2. Additional Fees',
    description: 'The following fees apply in addition to the base price:',
    pickupDelivery: {
      title: '2.1 Pickup/Delivery Fees',
      services: {
        yambolOffice: 'Yambol Office',
        otherYambol: 'Other location in Yambol',
        sofiaAirport: 'Sofia Airport',
        burgasAirport: 'Burgas Airport',
        varnaAirport: 'Varna Airport',
      },
      fees: {
        noFee: 'No fee',
        yambolOther: '50 BGN',
        airports: '100 BGN',
      },
    },
  },
  whatsIncluded: {
    title: "3. What's Included in the Price",
    features: {
      fullInsurance: {
        title: 'Full Insurance',
        description: 'Collision and liability insurance',
      },
      support24_7: {
        title: '24/7 Support',
        description: '24/7 roadside assistance',
      },
      unlimitedMileage: {
        title: 'Unlimited Mileage',
        description: 'Drive as much as you want',
      },
      technicalSupport: {
        title: 'Technical Support',
        description: "If there's a problem with the car",
      },
      replacementCar: {
        title: 'Replacement Car',
        description: 'When needed',
      },
      documentation: {
        title: 'Detailed Documentation',
        description: 'Contract and invoice',
      },
    },
  },
  importantNotes: {
    title: '4. Important Notes',
    notes: {
      minimumPeriod: {
        title: 'Minimum period:',
        description: '5 days for all car classes',
      },
      deposit: {
        title: 'Deposit:',
        description: 'Refunded when the car is returned in good condition',
      },
      reservation: {
        title: 'Reservation:',
        description: 'It is recommended to book at least 24 hours in advance',
      },
    },
  },
};
