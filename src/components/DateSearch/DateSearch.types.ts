export interface DateSearchProps {
  onSearch: (startDate: Date | null, endDate: Date | null) => void;
  onInitialized?: (hasUrlParams: boolean) => void;
  isLoading?: boolean;
  t: (key: string, values?: Record<string, unknown>) => string;
}
