import {
  CheckCircle,
  Info,
  Warning,
  Cancel,
  LocalShipping,
  Security,
  Payment,
} from '@mui/icons-material';
import {
  RentalCondition,
  Document,
  CancellationRule,
  DeliveryOption,
  InsuranceType,
  PaymentTerm,
  ContactInfo,
} from './TermsConditionsPage.types';
import { texts } from './TermsConditionsPage.lang';

export const createRentalConditions = (
  currentTexts: typeof texts
): RentalCondition[] =>
  currentTexts.sections.generalTerms.rentalConditions.conditions.map(
    (condition) => ({
      text: condition,
    })
  );

export const createRentalDocuments = (currentTexts: typeof texts): Document[] =>
  currentTexts.sections.generalTerms.rentalDocuments.documents.map(
    (document) => ({
      text: document,
    })
  );

export const createCancellationRules = (
  currentTexts: typeof texts
): {
  before24h: CancellationRule[];
  within24h: CancellationRule[];
  sameDay: CancellationRule[];
  forceMajeure: CancellationRule[];
} => ({
  before24h: currentTexts.sections.cancellationPolicy.before24h.rules.map(
    (rule) => ({
      text: rule,
    })
  ),
  within24h: currentTexts.sections.cancellationPolicy.within24h.rules.map(
    (rule) => ({
      text: rule,
    })
  ),
  sameDay: currentTexts.sections.cancellationPolicy.sameDay.rules.map(
    (rule) => ({
      text: rule,
    })
  ),
  forceMajeure: currentTexts.sections.cancellationPolicy.forceMajeure.rules.map(
    (rule) => ({
      text: rule,
    })
  ),
});

export const createDeliveryOptions = (
  currentTexts: typeof texts
): DeliveryOption[] =>
  currentTexts.sections.deliveryPolicy.pickup.options.map((option) => ({
    text: option,
  }));

export const createInsuranceTypes = (
  currentTexts: typeof texts
): InsuranceType[] => [
  {
    title: currentTexts.sections.insurance.types.collision.title,
    description: currentTexts.sections.insurance.types.collision.description,
  },
  {
    title: currentTexts.sections.insurance.types.liability.title,
    description: currentTexts.sections.insurance.types.liability.description,
  },
  {
    title: currentTexts.sections.insurance.types.assistance.title,
    description: currentTexts.sections.insurance.types.assistance.description,
  },
];

export const createPaymentTerms = (
  currentTexts: typeof texts
): PaymentTerm[] => [
  {
    title: currentTexts.sections.paymentTerms.terms.deposit.title,
    description: currentTexts.sections.paymentTerms.terms.deposit.description,
  },
  {
    title: currentTexts.sections.paymentTerms.terms.payment.title,
    description: currentTexts.sections.paymentTerms.terms.payment.description,
  },
  {
    title: currentTexts.sections.paymentTerms.terms.refund.title,
    description: currentTexts.sections.paymentTerms.terms.refund.description,
  },
];

export const createContactInfo = (currentTexts: typeof texts): ContactInfo => ({
  email: currentTexts.sections.contact.info.email,
  phone: currentTexts.sections.contact.values.phone,
  address: currentTexts.sections.contact.values.address,
  businessHours: currentTexts.sections.contact.values.businessHours,
});

export const rentalConditionIcon = <CheckCircle color="primary" />;
export const documentIcon = <CheckCircle color="primary" />;
export const cancellationIcons = {
  before24h: <CheckCircle color="success" />,
  within24h: <Warning color="warning" />,
  sameDay: <Cancel color="error" />,
  forceMajeure: <CheckCircle color="success" />,
};
export const deliveryIcon = <LocalShipping color="primary" />;
export const insuranceIcon = <Security color="primary" />;
export const paymentIcon = <Payment color="primary" />;
export const infoIcon = <Info color="info" />;
