export interface ServicesPageProps {
  lang: Promise<string>;
}

export interface ServiceType {
  title: string;
  description: string;
}

export interface CarFeature {
  title: string;
  description: string;
}

export interface CarModel {
  name: string;
  description: string;
}

export interface CarClass {
  name: string;
  features: CarFeature[];
  models: CarModel[];
}

export interface AdditionalService {
  title: string;
  description: string;
}
