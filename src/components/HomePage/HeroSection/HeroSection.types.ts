export interface HeroSectionProps {
  currentLang: string;
  onShowSnackbar: (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => void;
}
