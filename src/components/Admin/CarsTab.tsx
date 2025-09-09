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
import CarFormDialog from './CarFormDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import { CarCalendarDialog } from './CarCalendarDialog';
import { useAdmin, AdminCar } from '@/hooks/useAdmin';
import { useSnackbar } from '@/components/HomePage/SnackbarProvider';
import axios from 'axios';

// Currency conversion function (approximate BGN to EUR rate)
// Helper function to display EUR equivalent
const getEURDisplay = (bgnAmount: number): string => {
  const eurAmount = Math.round((bgnAmount / 1.96) * 100) / 100;
  return eurAmount.toFixed(2);
};

export default function CarsTab() {
  const texts = {
    title: 'Автомобили',
    addNew: 'Добави нов',
    editCar: 'Редактирай автомобил',
    addNewCar: 'Добави нов автомобил',
    basicInformation: 'Основна информация',
    brand: 'Марка',
    model: 'Модел',
    year: 'Година',
    class: 'Клас',
    classes: {
      economy: 'Икономичен',
      standard: 'Стандартен',
      premium: 'Премиум',
    },
    pricing: 'Ценообразуване',
    pricePerDay: 'Цена на ден',
    depositAmount: 'Сума на депозита',
    features: 'Екстри',
    addFeature: 'Добави екстра',
    add: 'Добави',
    description: 'Описание',
    images: 'Снимки',
    uploadImages: 'Качи снимки',
    active: 'Активен',
    inactive: 'Неактивен',
    edit: 'Редактирай',
    delete: 'Изтрий',
    perDay: 'на ден',
    deposit: 'Депозит',
    noCars: 'Няма автомобили',
    noCarsDescription: 'Все още не са добавени автомобили в системата',
    addFirstCar: 'Добави първия автомобил',
    deleteConfirmTitle: 'Потвърди изтриването',
    deleteConfirmMessage:
      'Сигурни ли сте, че искате да изтриете автомобила {{car}}?',
  };
  const { cars, isLoadingCars, createCar, updateCar, deleteCar } =
    useAdmin('cars');
  const { showSnackbar } = useSnackbar();
  const [carFormOpen, setCarFormOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<AdminCar | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<AdminCar | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedCarForCalendar, setSelectedCarForCalendar] =
    useState<AdminCar | null>(null);

  const handleAddCar = () => {
    setEditingCar(null);
    setCarFormOpen(true);
  };

  const handleEditCar = (car: AdminCar) => {
    setEditingCar(car);
    setIsEditing(true);
    setCarFormOpen(true);
  };

  const handleDeleteCar = (car: AdminCar) => {
    setCarToDelete(car);
    setDeleteDialogOpen(true);
  };

  const handleOpenCalendar = (car: AdminCar) => {
    setSelectedCarForCalendar(car);
    setCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setCalendarOpen(false);
    setSelectedCarForCalendar(null);
  };

  const handleCarFormClose = () => {
    setCarFormOpen(false);
    setEditingCar(null);
    setIsEditing(false);
  };

  const handleCarFormSubmit = async (carData: Partial<AdminCar>) => {
    try {
      if (editingCar) {
        // Update existing car
        await updateCar({ id: editingCar.id, carData });
        showSnackbar('Автомобилът е редактиран успешно', 'success');
      } else {
        // Create new car
        await createCar(carData);
        showSnackbar('Автомобилът е създаден успешно', 'success');
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
        showSnackbar(
          'Сесията ви е изтекла. Моля, влезте отново в системата.',
          'error'
        );
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      } else {
        showSnackbar('Възникна грешка при запазване на автомобила', 'error');
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!carToDelete) return;

    try {
      await deleteCar(carToDelete.id);
      setDeleteDialogOpen(false);
      setCarToDelete(null);
      showSnackbar('Автомобилът е изтрит успешно', 'success');
    } catch (err: unknown) {
      console.error('Error deleting car:', err);

      // Check if it's a 401 error (session expired) - but not for logout
      if (
        axios.isAxiosError(err) &&
        err.response?.status === 401 &&
        !err.config?.url?.includes('/admin/logout')
      ) {
        showSnackbar(
          'Сесията ви е изтекла. Моля, влезте отново в системата.',
          'error'
        );
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      } else if (axios.isAxiosError(err) && err.response?.status === 409) {
        // Conflict error - car has existing bookings
        showSnackbar(
          'Не можете да изтриете автомобил с съществуващи резервации',
          'error'
        );
      } else {
        showSnackbar('Възникна грешка при изтриване на автомобила', 'error');
      }
    }
  };

  const getMainImage = (car: AdminCar) => {
    return car.image_urls?.[0] || null;
  };

  if (isLoadingCars) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={400}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" component="h2" color="secondary">
          {texts.title}
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAddCar}>
          {texts.addNew}
        </Button>
      </Box>

      {/* Error Alert */}
      {/* Error handling is now done through React Query */}

      {/* Cars Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 3,
        }}
      >
        {cars?.map((car: AdminCar) => {
          const mainImage = getMainImage(car);

          return (
            <Box key={car.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Car Image */}
                <CardMedia
                  component="img"
                  height="200"
                  image={mainImage ?? undefined}
                  alt={`${car.brand} ${car.model}`}
                  sx={{ objectFit: 'cover' }}
                />

                {/* Car Content */}
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Car Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" component="h3" gutterBottom>
                      {car.brand} {car.model}
                    </Typography>
                    <Chip label={car.class} color="primary" size="small" />
                  </Box>

                  {/* Car Details */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {car.year} • {car.features?.length || 0} {texts.features}
                  </Typography>

                  {/* Price and Deposit */}
                  <Box sx={{ mt: 2, mb: 1 }}>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
                    >
                      <Typography
                        variant="h6"
                        color="primary.main"
                        fontWeight="bold"
                      >
                        {car.price_per_day.toFixed(2)} лв
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        (≈ {getEURDisplay(car.price_per_day)} €) /{texts.perDay}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Security
                        sx={{ fontSize: 14, mr: 0.5, color: 'warning.main' }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {texts.deposit}: {car.deposit_amount.toFixed(2)} лв ( ≈{' '}
                        {getEURDisplay(car.deposit_amount)} €)
                      </Typography>
                    </Box>
                  </Box>

                  {/* Features Preview */}
                  {car.features && car.features.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {car.features.slice(0, 6).join(', ')}
                        {car.features.length > 6 && '...'}
                      </Typography>
                    </Box>
                  )}

                  {/* Status */}
                  <Box sx={{ mt: 1 }}>
                    <FormControlLabel
                      control={
                        <Switch checked={car.is_active} size="small" disabled />
                      }
                      label={
                        <Typography variant="caption">
                          {car.is_active ? texts.active : texts.inactive}
                        </Typography>
                      }
                    />
                  </Box>
                </CardContent>

                {/* Card Actions */}
                <CardActions
                  sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}
                >
                  <Button
                    size="small"
                    startIcon={<CalendarToday />}
                    onClick={() => handleOpenCalendar(car)}
                    sx={{ color: 'primary.main' }}
                  >
                    Календар
                  </Button>

                  <Box>
                    <Tooltip title={texts.edit}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditCar(car)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={texts.delete}>
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
        <Box textAlign="center" py={4}>
          <DirectionsCar
            sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {texts.noCars}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {texts.noCarsDescription}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddCar}
            sx={{ mt: 2 }}
          >
            {texts.addFirstCar}
          </Button>
        </Box>
      )}

      {/* Car Form Dialog */}
      <CarFormDialog
        isEditing={isEditing}
        open={carFormOpen}
        car={editingCar}
        onClose={handleCarFormClose}
        onSubmit={handleCarFormSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        title={texts.deleteConfirmTitle}
        message={
          carToDelete
            ? texts.deleteConfirmMessage.replace(
                '{{car}}',
                `${carToDelete.brand} ${carToDelete.model}`
              )
            : ''
        }
        warningMessage="⚠️ ВНИМАНИЕ: Ако този автомобил има активни резервации, не може да бъде изтрит!"
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setCarToDelete(null);
        }}
      />

      {/* Car Calendar Dialog */}
      <CarCalendarDialog
        open={calendarOpen}
        onClose={handleCloseCalendar}
        car={selectedCarForCalendar}
      />
    </Box>
  );
}
