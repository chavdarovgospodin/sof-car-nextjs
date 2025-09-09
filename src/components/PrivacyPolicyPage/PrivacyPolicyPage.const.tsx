import {
  Business,
  Phone,
  Email,
  LocationOn,
  Person,
  CheckCircle,
  Info,
  Security,
} from '@mui/icons-material';
import {
  CompanyInfo,
  DataType,
  PurposeType,
  RetentionPeriod,
  ProtectionMeasure,
  UserRight,
} from './PrivacyPolicyPage.types';
import { texts } from './PrivacyPolicyPage.lang';

export const createCompanyInfo = (currentTexts: typeof texts): CompanyInfo => ({
  name: currentTexts.company.name,
  eic: currentTexts.company.eic,
  address: currentTexts.company.address,
  phone: currentTexts.company.phone,
  email: currentTexts.company.email,
  manager: currentTexts.company.manager,
});

export const createDataTypes = (currentTexts: typeof texts): DataType[] => [
  {
    title: currentTexts.sections.dataCollection.types.identification.title,
    description:
      currentTexts.sections.dataCollection.types.identification.description,
  },
  {
    title: currentTexts.sections.dataCollection.types.contact.title,
    description: currentTexts.sections.dataCollection.types.contact.description,
  },
  {
    title: currentTexts.sections.dataCollection.types.reservation.title,
    description:
      currentTexts.sections.dataCollection.types.reservation.description,
  },
  {
    title: currentTexts.sections.dataCollection.types.payment.title,
    description: currentTexts.sections.dataCollection.types.payment.description,
  },
  {
    title: currentTexts.sections.dataCollection.types.technical.title,
    description:
      currentTexts.sections.dataCollection.types.technical.description,
  },
];

export const createPurposeTypes = (
  currentTexts: typeof texts
): PurposeType[] => [
  {
    title: currentTexts.sections.dataUsage.purposes.contract.title,
    description: currentTexts.sections.dataUsage.purposes.contract.description,
  },
  {
    title: currentTexts.sections.dataUsage.purposes.communication.title,
    description:
      currentTexts.sections.dataUsage.purposes.communication.description,
  },
  {
    title: currentTexts.sections.dataUsage.purposes.legal.title,
    description: currentTexts.sections.dataUsage.purposes.legal.description,
  },
  {
    title: currentTexts.sections.dataUsage.purposes.improvement.title,
    description:
      currentTexts.sections.dataUsage.purposes.improvement.description,
  },
  {
    title: currentTexts.sections.dataUsage.purposes.security.title,
    description: currentTexts.sections.dataUsage.purposes.security.description,
  },
];

export const createRetentionPeriods = (
  currentTexts: typeof texts
): RetentionPeriod[] => [
  {
    title: currentTexts.sections.dataRetention.periods.reservation.title,
    description:
      currentTexts.sections.dataRetention.periods.reservation.description,
  },
  {
    title: currentTexts.sections.dataRetention.periods.payment.title,
    description:
      currentTexts.sections.dataRetention.periods.payment.description,
  },
  {
    title: currentTexts.sections.dataRetention.periods.technical.title,
    description:
      currentTexts.sections.dataRetention.periods.technical.description,
  },
];

export const createProtectionMeasures = (
  currentTexts: typeof texts
): ProtectionMeasure[] => [
  {
    title: currentTexts.sections.dataProtection.measures.encryption.title,
    description:
      currentTexts.sections.dataProtection.measures.encryption.description,
  },
  {
    title: currentTexts.sections.dataProtection.measures.access.title,
    description:
      currentTexts.sections.dataProtection.measures.access.description,
  },
  {
    title: currentTexts.sections.dataProtection.measures.backups.title,
    description:
      currentTexts.sections.dataProtection.measures.backups.description,
  },
];

export const createUserRights = (currentTexts: typeof texts): UserRight[] => [
  {
    title: currentTexts.sections.userRights.rights.access.title,
    description: currentTexts.sections.userRights.rights.access.description,
  },
  {
    title: currentTexts.sections.userRights.rights.rectification.title,
    description:
      currentTexts.sections.userRights.rights.rectification.description,
  },
  {
    title: currentTexts.sections.userRights.rights.erasure.title,
    description: currentTexts.sections.userRights.rights.erasure.description,
  },
  {
    title: currentTexts.sections.userRights.rights.restriction.title,
    description:
      currentTexts.sections.userRights.rights.restriction.description,
  },
];

export const companyInfoIcons = {
  name: <Business color="primary" />,
  eic: <Info color="primary" />,
  address: <LocationOn color="primary" />,
  phone: <Phone color="primary" />,
  email: <Email color="primary" />,
  manager: <Person color="primary" />,
};

export const dataTypeIcon = <CheckCircle color="primary" />;
export const purposeIcon = <CheckCircle color="primary" />;
export const retentionIcon = <Info color="info" />;
export const protectionIcon = <Security color="primary" />;
export const rightsIcon = <CheckCircle color="success" />;
