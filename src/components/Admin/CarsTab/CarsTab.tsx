'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  IconButton,
  Chip,
  CircularProgress,
  Tooltip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  DirectionsCar,
  Security,
  CalendarToday,
} from '@mui/icons-material';
import CarFormDialog from '../CarFormDialog';
import DeleteConfirmDialog from '../DeleteConfirmDialog';
import { CarCalendarDialog } from '../CarCalendarDialog';
import { useAdmin, AdminCar } from '@/hooks/useAdmin';
import { useSnackbar } from '@/providers/SnackbarProvider';
import axios from 'axios';
import { CARS_TAB_CONST } from './CarsTab.const';
import { carsTabStyles } from './CarsTab.styles';
import {
  CarFormState,
  DeleteDialogState,
  CalendarState,
} from './CarsTab.types';

// Currency conversion function (approximate BGN to EUR rate)
// Helper function to display EUR equivalent
const getEURDisplay = (bgnAmount: number): string => {
  const eurAmount =
    Math.round((bgnAmount / CARS_TAB_CONST.CURRENCY_RATE) * 100) / 100;
  return eurAmount.toFixed(2);
};

export default function CarsTab() {
  const { cars, isLoadingCars, createCar, updateCar, deleteCar } =
    useAdmin('cars');
  const { showSnackbar } = useSnackbar();
  const [carFormState, setCarFormState] = useState<CarFormState>({
    isOpen: false,
    editingCar: null,
    isEditing: false,
  });
  const [deleteDialogState, setDeleteDialogState] = useState<DeleteDialogState>(
    {
      isOpen: false,
      carToDelete: null,
    }
  );
  const [calendarState, setCalendarState] = useState<CalendarState>({
    isOpen: false,
    selectedCar: null,
  });

  const handleAddCar = () => {
    setCarFormState({
      isOpen: true,
      editingCar: null,
      isEditing: false,
    });
  };

  const handleEditCar = (car: AdminCar) => {
    setCarFormState({
      isOpen: true,
      editingCar: car,
      isEditing: true,
    });
  };

  const handleDeleteCar = (car: AdminCar) => {
    setDeleteDialogState({
      isOpen: true,
      carToDelete: car,
    });
  };

  const handleOpenCalendar = (car: AdminCar) => {
    setCalendarState({
      isOpen: true,
      selectedCar: car,
    });
  };

  const handleCloseCalendar = () => {
    setCalendarState({
      isOpen: false,
      selectedCar: null,
    });
  };

  const handleCarFormClose = () => {
    setCarFormState({
      isOpen: false,
      editingCar: null,
      isEditing: false,
    });
  };

  const handleCarFormSubmit = async (carData: Partial<AdminCar>) => {
    try {
      if (carFormState.editingCar) {
        // Update existing car
        await updateCar({ id: carFormState.editingCar.id, carData });
        showSnackbar(CARS_TAB_CONST.TEXTS.carUpdatedSuccess, 'success');
      } else {
        // Create new car
        await createCar(carData);
        showSnackbar(CARS_TAB_CONST.TEXTS.carCreatedSuccess, 'success');
      }
      handleCarFormClose();
    } catch (err: unknown) {
      console.error('Error saving car:', err);

      // Check if it's a 401 error (session expired) - but not for logout
      if (
        axios.isAxiosError(err) &&
        err.response?.status === 401 &&
        !err.config?.url?.includes('/admin/logout')
      ) {
        showSnackbar(CARS_TAB_CONST.TEXTS.sessionExpired, 'error');
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      } else {
        showSnackbar(CARS_TAB_CONST.TEXTS.saveError, 'error');
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialogState.carToDelete) return;

    try {
      await deleteCar(deleteDialogState.carToDelete.id);
      setDeleteDialogState({
        isOpen: false,
        carToDelete: null,
      });
      showSnackbar(CARS_TAB_CONST.TEXTS.carDeletedSuccess, 'success');
    } catch (err: unknown) {
      console.error('Error deleting car:', err);

      // Check if it's a 401 error (session expired) - but not for logout
      if (
        axios.isAxiosError(err) &&
        err.response?.status === 401 &&
        !err.config?.url?.includes('/admin/logout')
      ) {
        showSnackbar(CARS_TAB_CONST.TEXTS.sessionExpired, 'error');
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      } else if (axios.isAxiosError(err) && err.response?.status === 409) {
        // Conflict error - car has existing bookings
        showSnackbar(CARS_TAB_CONST.TEXTS.conflictError, 'error');
      } else {
        showSnackbar(CARS_TAB_CONST.TEXTS.deleteError, 'error');
      }
    }
  };

  const getMainImage = (car: AdminCar) => {
    return car.image_urls?.[0] || null;
  };

  if (isLoadingCars) {
    return (
      <Box sx={carsTabStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={carsTabStyles.header}>
        <Typography variant="h5" component="h2" color="secondary">
          {CARS_TAB_CONST.TEXTS.title}
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAddCar}>
          {CARS_TAB_CONST.TEXTS.addNew}
        </Button>
      </Box>

      {/* Cars Grid */}
      <Box sx={carsTabStyles.carsGrid}>
        {cars?.map((car: AdminCar) => {
          const mainImage = getMainImage(car);

          return (
            <Box key={car.id}>
              <Card sx={carsTabStyles.carCard}>
                {/* Car Image */}
                <CardMedia
                  component="img"
                  height={CARS_TAB_CONST.IMAGE_HEIGHT}
                  image={mainImage ?? undefined}
                  alt={`${car.brand} ${car.model}`}
                  sx={carsTabStyles.carImage}
                />

                {/* Car Content */}
                <CardContent sx={carsTabStyles.carContent}>
                  {/* Car Header */}
                  <Box sx={carsTabStyles.carHeader}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {car.brand} {car.model}
                    </Typography>
                    <Chip label={car.class} color="primary" size="small" />
                  </Box>

                  {/* Car Details */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={carsTabStyles.carDetails}
                  >
                    {car.year} • {car.features?.length || 0}{' '}
                    {CARS_TAB_CONST.TEXTS.features}
                  </Typography>

                  {/* Price and Deposit */}
                  <Box sx={carsTabStyles.priceSection}>
                    <Box sx={carsTabStyles.priceRow}>
                      <Typography
                        variant="h6"
                        color="primary.main"
                        sx={carsTabStyles.priceAmount}
                      >
                        {car.price_per_day.toFixed(2)} лв
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={carsTabStyles.priceCurrency}
                      >
                        (≈ {getEURDisplay(car.price_per_day)} €) /
                        {CARS_TAB_CONST.TEXTS.perDay}
                      </Typography>
                    </Box>

                    <Box sx={carsTabStyles.depositRow}>
                      <Security sx={carsTabStyles.depositIcon} />
                      <Typography variant="body2" color="text.secondary">
                        {CARS_TAB_CONST.TEXTS.deposit}:{' '}
                        {car.deposit_amount.toFixed(2)} лв ( ≈{' '}
                        {getEURDisplay(car.deposit_amount)} €)
                      </Typography>
                    </Box>
                  </Box>

                  {/* Features Preview */}
                  {car.features && car.features.length > 0 && (
                    <Box sx={carsTabStyles.featuresPreview}>
                      <Typography variant="caption" color="text.secondary">
                        {car.features.slice(0, 6).join(', ')}
                        {car.features.length > 6 && '...'}
                      </Typography>
                    </Box>
                  )}

                  {/* Status */}
                  <Box sx={carsTabStyles.statusSection}>
                    <FormControlLabel
                      control={
                        <Switch checked={car.is_active} size="small" disabled />
                      }
                      label={
                        <Typography variant="caption">
                          {car.is_active
                            ? CARS_TAB_CONST.TEXTS.active
                            : CARS_TAB_CONST.TEXTS.inactive}
                        </Typography>
                      }
                    />
                  </Box>
                </CardContent>

                {/* Card Actions */}
                <CardActions sx={carsTabStyles.cardActions}>
                  <Button
                    size="small"
                    startIcon={<CalendarToday />}
                    onClick={() => handleOpenCalendar(car)}
                    sx={carsTabStyles.calendarButton}
                  >
                    {CARS_TAB_CONST.TEXTS.calendar}
                  </Button>

                  <Box sx={carsTabStyles.actionsContainer}>
                    <Tooltip title={CARS_TAB_CONST.TEXTS.edit}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditCar(car)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={CARS_TAB_CONST.TEXTS.delete}>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteCar(car)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </Box>

      {/* No Cars Message */}
      {cars && cars.length === 0 && !isLoadingCars && (
        <Box sx={carsTabStyles.noCarsContainer}>
          <DirectionsCar sx={carsTabStyles.noCarsIcon} />
          <Typography
            variant="h6"
            color="text.secondary"
            sx={carsTabStyles.noCarsTitle}
          >
            {CARS_TAB_CONST.TEXTS.noCars}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={carsTabStyles.noCarsDescription}
          >
            {CARS_TAB_CONST.TEXTS.noCarsDescription}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddCar}
            sx={carsTabStyles.addFirstCarButton}
          >
            {CARS_TAB_CONST.TEXTS.addFirstCar}
          </Button>
        </Box>
      )}

      {/* Car Form Dialog */}
      <CarFormDialog
        isEditing={carFormState.isEditing}
        open={carFormState.isOpen}
        car={carFormState.editingCar}
        onClose={handleCarFormClose}
        onSubmit={handleCarFormSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogState.isOpen}
        title={CARS_TAB_CONST.TEXTS.deleteConfirmTitle}
        message={
          deleteDialogState.carToDelete
            ? CARS_TAB_CONST.TEXTS.deleteConfirmMessage.replace(
                '{{car}}',
                `${deleteDialogState.carToDelete.brand} ${deleteDialogState.carToDelete.model}`
              )
            : ''
        }
        warningMessage={CARS_TAB_CONST.WARNING_MESSAGE}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteDialogState({
            isOpen: false,
            carToDelete: null,
          });
        }}
      />

      {/* Car Calendar Dialog */}
      <CarCalendarDialog
        open={calendarState.isOpen}
        onClose={handleCloseCalendar}
        car={calendarState.selectedCar}
      />
    </Box>
  );
}
