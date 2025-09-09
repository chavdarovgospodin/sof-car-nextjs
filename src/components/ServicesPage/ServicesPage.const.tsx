import {
  DirectionsCar,
  Business,
  CheckCircle,
  Speed,
  Security,
  Support,
} from '@mui/icons-material';
import { ServiceType, CarClass, AdditionalService } from './ServicesPage.types';
import { texts } from './ServicesPage.lang';

export const createServiceTypes = (
  currentTexts: typeof texts
): ServiceType[] => [
  {
    title: currentTexts.sections.mainServices.carRental.types.shortTerm.title,
    description:
      currentTexts.sections.mainServices.carRental.types.shortTerm.description,
  },
  {
    title: currentTexts.sections.mainServices.carRental.types.longTerm.title,
    description:
      currentTexts.sections.mainServices.carRental.types.longTerm.description,
  },
  {
    title: currentTexts.sections.mainServices.carRental.types.business.title,
    description:
      currentTexts.sections.mainServices.carRental.types.business.description,
  },
  {
    title: currentTexts.sections.mainServices.carRental.types.tourist.title,
    description:
      currentTexts.sections.mainServices.carRental.types.tourist.description,
  },
];

export const createCarClasses = (currentTexts: typeof texts): CarClass[] => [
  {
    name: currentTexts.sections.carClasses.economy.title,
    features: [
      {
        title: currentTexts.sections.carClasses.economy.features.type.title,
        description:
          currentTexts.sections.carClasses.economy.features.type.description,
      },
      {
        title: currentTexts.sections.carClasses.economy.features.capacity.title,
        description:
          currentTexts.sections.carClasses.economy.features.capacity
            .description,
      },
      {
        title: currentTexts.sections.carClasses.economy.features.luggage.title,
        description:
          currentTexts.sections.carClasses.economy.features.luggage.description,
      },
      {
        title:
          currentTexts.sections.carClasses.economy.features.fuelConsumption
            .title,
        description:
          currentTexts.sections.carClasses.economy.features.fuelConsumption
            .description,
      },
    ],
    models: [
      {
        name: currentTexts.sections.carClasses.economy.models.opelCorsa.name,
        description:
          currentTexts.sections.carClasses.economy.models.opelCorsa.description,
      },
      {
        name: currentTexts.sections.carClasses.economy.models.vwPolo.name,
        description:
          currentTexts.sections.carClasses.economy.models.vwPolo.description,
      },
      {
        name: currentTexts.sections.carClasses.economy.models.skodaFabia.name,
        description:
          currentTexts.sections.carClasses.economy.models.skodaFabia
            .description,
      },
    ],
  },
  {
    name: currentTexts.sections.carClasses.standard.title,
    features: [
      {
        title: currentTexts.sections.carClasses.standard.features.type.title,
        description:
          currentTexts.sections.carClasses.standard.features.type.description,
      },
      {
        title:
          currentTexts.sections.carClasses.standard.features.capacity.title,
        description:
          currentTexts.sections.carClasses.standard.features.capacity
            .description,
      },
      {
        title: currentTexts.sections.carClasses.standard.features.luggage.title,
        description:
          currentTexts.sections.carClasses.standard.features.luggage
            .description,
      },
    ],
    models: [
      {
        name: currentTexts.sections.carClasses.standard.models.skodaOctavia
          .name,
        description:
          currentTexts.sections.carClasses.standard.models.skodaOctavia
            .description,
      },
      {
        name: currentTexts.sections.carClasses.standard.models.vwPassat.name,
        description:
          currentTexts.sections.carClasses.standard.models.vwPassat.description,
      },
    ],
  },
  {
    name: currentTexts.sections.carClasses.premium.title,
    features: [
      {
        title: currentTexts.sections.carClasses.premium.features.type.title,
        description:
          currentTexts.sections.carClasses.premium.features.type.description,
      },
      {
        title: currentTexts.sections.carClasses.premium.features.capacity.title,
        description:
          currentTexts.sections.carClasses.premium.features.capacity
            .description,
      },
      {
        title: currentTexts.sections.carClasses.premium.features.luggage.title,
        description:
          currentTexts.sections.carClasses.premium.features.luggage.description,
      },
    ],
    models: [
      {
        name: currentTexts.sections.carClasses.premium.models.vwArteon.name,
        description:
          currentTexts.sections.carClasses.premium.models.vwArteon.description,
      },
      {
        name: currentTexts.sections.carClasses.premium.models.audiA4.name,
        description:
          currentTexts.sections.carClasses.premium.models.audiA4.description,
      },
    ],
  },
];

export const createAdditionalServices = (
  currentTexts: typeof texts
): AdditionalService[] => [
  {
    title: currentTexts.sections.additionalServices.services.insurance.title,
    description:
      currentTexts.sections.additionalServices.services.insurance.description,
  },
  {
    title: currentTexts.sections.additionalServices.services.support.title,
    description:
      currentTexts.sections.additionalServices.services.support.description,
  },
  {
    title:
      currentTexts.sections.additionalServices.services.unlimitedMileage.title,
    description:
      currentTexts.sections.additionalServices.services.unlimitedMileage
        .description,
  },
  {
    title:
      currentTexts.sections.additionalServices.services.businessSolutions.title,
    description:
      currentTexts.sections.additionalServices.services.businessSolutions
        .description,
  },
];

export const serviceTypeIcon = <CheckCircle color="primary" />;
export const carFeatureIcon = <CheckCircle color="primary" />;
export const carModelIcon = <DirectionsCar color="primary" />;

export const additionalServiceIcons = {
  insurance: <Security color="primary" />,
  support: <Support color="primary" />,
  unlimitedMileage: <Speed color="primary" />,
  businessSolutions: <Business color="primary" />,
};
