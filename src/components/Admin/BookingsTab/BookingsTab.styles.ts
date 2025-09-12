import { SxProps, Theme } from '@mui/material';

export const bookingsTabStyles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  } as SxProps<Theme>,
  header: {
    mb: 3,
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    alignItems: { xs: 'stretch', sm: 'center' },
    gap: 2,
  } as SxProps<Theme>,
  filtersPaper: {
    p: 2,
    mb: 3,
  } as SxProps<Theme>,
  filtersContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    alignItems: 'center',
  } as SxProps<Theme>,
  filterField: {
    minWidth: 200,
    flex: '1 1 200px',
  } as SxProps<Theme>,
  filterFieldSmall: {
    minWidth: 150,
    flex: '1 1 150px',
  } as SxProps<Theme>,
  clearFiltersButton: {
    flex: '0 0 auto',
  } as SxProps<Theme>,
  noBookingsContainer: {
    textAlign: 'center',
    py: 4,
  } as SxProps<Theme>,
  noFilteredResultsContainer: {
    textAlign: 'center',
    py: 4,
  } as SxProps<Theme>,
  clientCell: {
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,
  datesCell: {
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,
  priceCell: {
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,
  depositCell: {
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,
  notesCell: {
    maxWidth: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as SxProps<Theme>,
  actionsCell: {
    display: 'flex',
    gap: 1,
  } as SxProps<Theme>,
  snackbar: {
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
  } as const,
} as const;
