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
  Euro,
  Security,
} from '@mui/icons-material';
import CarFormDialog from './CarFormDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import { useAdmin, AdminCar } from '@/hooks/useAdmin';

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
  const { cars, isLoadingCars, createCar, updateCar, deleteCar } = useAdmin();
  const [carFormOpen, setCarFormOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<AdminCar | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<AdminCar | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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
      } else {
        // Create new car
        await createCar(carData);
      }
      handleCarFormClose();
    } catch (err) {
      console.error('Error saving car:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!carToDelete) return;

    try {
      await deleteCar(carToDelete.id);
      setDeleteDialogOpen(false);
      setCarToDelete(null);
    } catch (err) {
      console.error('Error deleting car:', err);
    }
  };

  const getMainImage = (car: AdminCar) => {
    return car.image_url;
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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {cars?.map((car: AdminCar) => {
          const mainImage = getMainImage(car);

          return (
            <Box key={car.id} sx={{ minWidth: 280, flex: '1 1 280px' }}>
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
                  image={mainImage || '/images/car-placeholder.jpg'}
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
                      <Euro
                        sx={{ fontSize: 16, mr: 0.5, color: 'primary.main' }}
                      />
                      <Typography
                        variant="h6"
                        color="primary.main"
                        fontWeight="bold"
                      >
                        {car.price_per_day.toFixed(2)} €
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        /{texts.perDay}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Security
                        sx={{ fontSize: 14, mr: 0.5, color: 'warning.main' }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {texts.deposit}: {car.deposit_amount.toFixed(2)} €
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
                <CardActions sx={{ justifyContent: 'right', px: 2, pb: 2 }}>
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
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setCarToDelete(null);
        }}
      />
    </Box>
  );
}
