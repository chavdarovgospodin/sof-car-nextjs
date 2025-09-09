export interface PrivacyPolicyPageProps {
  lang: Promise<string>;
}

export interface CompanyInfo {
  name: string;
  eic: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
}

export interface DataType {
  title: string;
  description: string;
}

export interface PurposeType {
  title: string;
  description: string;
}

export interface RetentionPeriod {
  title: string;
  description: string;
}

export interface ProtectionMeasure {
  title: string;
  description: string;
}

export interface UserRight {
  title: string;
  description: string;
}
