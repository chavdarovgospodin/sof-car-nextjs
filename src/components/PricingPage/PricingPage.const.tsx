import {
  CheckCircle,
  LocationOn,
  Flight,
  Info,
  Warning,
} from '@mui/icons-material';
import {
  PricingData,
  AdditionalFee,
  IncludedFeature,
  ImportantNote,
} from './PricingPage.types';
import { texts } from './PricingPage.lang';

export const createPricingData = (
  currentTexts: typeof texts
): PricingData[] => [
  {
    class: currentTexts.basePrices.classes.economy,
    models: currentTexts.basePrices.models.economy,
    price: 30,
    deposit: 200,
    features: currentTexts.basePrices.features.economy,
  },
  {
    class: currentTexts.basePrices.classes.standard,
    models: currentTexts.basePrices.models.standard,
    price: 50,
    deposit: 300,
    features: currentTexts.basePrices.features.standard,
  },
  {
    class: currentTexts.basePrices.classes.premium,
    models: currentTexts.basePrices.models.premium,
    price: 80,
    deposit: 500,
    features: currentTexts.basePrices.features.premium,
  },
];

export const createAdditionalFees = (
  currentTexts: typeof texts
): AdditionalFee[] => [
  {
    service: currentTexts.additionalFees.pickupDelivery.services.yambolOffice,
    fee: currentTexts.additionalFees.pickupDelivery.fees.noFee,
    icon: <CheckCircle color="success" />,
  },
  {
    service: currentTexts.additionalFees.pickupDelivery.services.otherYambol,
    fee: currentTexts.additionalFees.pickupDelivery.fees.yambolOther,
    icon: <LocationOn color="primary" />,
  },
  {
    service: currentTexts.additionalFees.pickupDelivery.services.sofiaAirport,
    fee: currentTexts.additionalFees.pickupDelivery.fees.airports,
    icon: <Flight color="primary" />,
  },
  {
    service: currentTexts.additionalFees.pickupDelivery.services.burgasAirport,
    fee: currentTexts.additionalFees.pickupDelivery.fees.airports,
    icon: <Flight color="primary" />,
  },
  {
    service: currentTexts.additionalFees.pickupDelivery.services.varnaAirport,
    fee: currentTexts.additionalFees.pickupDelivery.fees.airports,
    icon: <Flight color="primary" />,
  },
];

export const createIncludedFeatures = (
  currentTexts: typeof texts
): IncludedFeature[] => [
  {
    title: currentTexts.whatsIncluded.features.fullInsurance.title,
    description: currentTexts.whatsIncluded.features.fullInsurance.description,
  },
  {
    title: currentTexts.whatsIncluded.features.support24_7.title,
    description: currentTexts.whatsIncluded.features.support24_7.description,
  },
  {
    title: currentTexts.whatsIncluded.features.unlimitedMileage.title,
    description:
      currentTexts.whatsIncluded.features.unlimitedMileage.description,
  },
  {
    title: currentTexts.whatsIncluded.features.technicalSupport.title,
    description:
      currentTexts.whatsIncluded.features.technicalSupport.description,
  },
  {
    title: currentTexts.whatsIncluded.features.replacementCar.title,
    description: currentTexts.whatsIncluded.features.replacementCar.description,
  },
  {
    title: currentTexts.whatsIncluded.features.documentation.title,
    description: currentTexts.whatsIncluded.features.documentation.description,
  },
];

export const createImportantNotes = (
  currentTexts: typeof texts
): ImportantNote[] => [
  {
    title: currentTexts.importantNotes.notes.minimumPeriod.title,
    description: currentTexts.importantNotes.notes.minimumPeriod.description,
    icon: <Info color="info" />,
  },
  {
    title: currentTexts.importantNotes.notes.deposit.title,
    description: currentTexts.importantNotes.notes.deposit.description,
    icon: <Warning color="warning" />,
  },
  {
    title: currentTexts.importantNotes.notes.reservation.title,
    description: currentTexts.importantNotes.notes.reservation.description,
    icon: <Info color="info" />,
  },
];
