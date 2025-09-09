export interface TermsConditionsPageProps {
  lang: Promise<string>;
}

export interface RentalCondition {
  text: string;
}

export interface Document {
  text: string;
}

export interface CancellationRule {
  text: string;
}

export interface DeliveryOption {
  text: string;
}

export interface InsuranceType {
  title: string;
  description: string;
}

export interface PaymentTerm {
  title: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  businessHours: string;
}
