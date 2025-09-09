export interface PricingPageProps {
  lang: Promise<string>;
}

export interface PricingData {
  class: string;
  models: string;
  price: number;
  deposit: number;
  features: string[];
}

export interface AdditionalFee {
  service: string;
  fee: string;
  icon: React.ReactNode;
}

export interface IncludedFeature {
  title: string;
  description: string;
}

export interface ImportantNote {
  title: string;
  description: string;
  icon: React.ReactNode;
}
