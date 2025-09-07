'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  IconButton,
  Divider,
  FormHelperText,
  Fade,
} from '@mui/material';
import {
  Close,
  Add,
  ArrowUpward,
  Delete,
  CloudUpload,
} from '@mui/icons-material';
import { AdminCar } from '@/hooks/useAdmin';
import { useSnackbar } from '../HomePage/SnackbarProvider';

// Currency conversion functions (approximate BGN to EUR rate)
const convertToBGN = (euroAmount: number): number => {
  return Math.round(euroAmount * 1.96 * 100) / 100; // Round to 2 decimal places
};

const convertToEUR = (bgnAmount: number): number => {
  return Math.round((bgnAmount / 1.96) * 100) / 100; // Round to 2 decimal places
};

// Helper function to display EUR equivalent
const getEURDisplay = (bgnAmount: number): string => {
  return convertToEUR(bgnAmount).toFixed(2);
};

interface CarFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (carData: Partial<AdminCar>) => Promise<void>;
  car?: AdminCar | null;
  isEditing?: boolean;
  loading?: boolean;
}

const texts = {
  title: 'Добавяне на автомобил',
  editTitle: 'Редактиране на автомобил',
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
  fuelType: 'Тип гориво',
  fuelTypes: {
    gasoline: 'Бензин',
    diesel: 'Дизел',
    electric: 'Електрически',
    hybrid: 'Хибриден',
  },
  transmission: 'Трансмисия',
  transmissions: {
    manual: 'Ръчна',
    automatic: 'Автоматична',
  },
  seats: 'Места',
  pricePerDay: 'Цена на ден',
  depositAmount: 'Депозит',
  isActive: 'Активен',
  active: 'Активен',
  inactive: 'Неактивен',
  pricing: 'Ценообразуване',
  features: 'Екстри',
  addFeature: 'Добави екстра',
  images: 'Снимки',
  uploadImages: 'Качи снимка',
  cancel: 'Отказ',
  save: 'Запази',
  loading: 'Зареждане...',
};

export default function CarFormDialog({
  open,
  onClose,
  onSubmit,
  car,
  isEditing = false,
  loading = false,
}: CarFormDialogProps) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    fuel_type: '',
    class: '',
    price_per_day_bgn: 0, // Price in BGN
    deposit_amount_bgn: 0, // Deposit in BGN
    available: true,
    features: [] as string[],
    transmission: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newFeature, setNewFeature] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (isEditing && car) {
      setFormData({
        brand: car.brand,
        model: car.model,
        year: car.year,
        fuel_type: car.fuel_type || '',
        class: car.class,
        price_per_day_bgn: car.price_per_day, // Already in BGN
        deposit_amount_bgn: car.deposit_amount, // Already in BGN
        available: !!car.is_active,
        features: car.features ? [...car.features] : [],
        transmission: car.transmission || '',
      });

      // Set existing images - backend now uses image_urls array
      if (car.image_urls && car.image_urls.length > 0) {
        setImageUrls(car.image_urls);
      }
    } else {
      // Reset form for new car
      setFormData({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        fuel_type: '',
        class: '',
        price_per_day_bgn: 0,
        deposit_amount_bgn: 0,
        available: true,
        features: [],
        transmission: '',
      });
      setImageUrls([]);
    }
    setErrors({});
  }, [car, isEditing]);

  const handleInputChange =
    (field: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = event.target as HTMLInputElement;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user types
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    // Create preview URLs
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageUrls((prev: string[]) => [
            ...prev,
            e.target!.result as string,
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls((prev: string[]) =>
      prev.filter((_, i: number) => i !== index)
    );
  };

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    setImageUrls((prev: string[]) => {
      const newUrls = [...prev];
      const [movedUrl] = newUrls.splice(fromIndex, 1);
      newUrls.splice(toIndex, 0, movedUrl);
      return newUrls;
    });
  };

  const handleMoveToFirst = (index: number) => {
    if (index > 0) {
      handleMoveImage(index, 0);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.brand.trim()) {
      newErrors.brand = 'Марката е задължителна';
    }
    if (!formData.model.trim()) {
      newErrors.model = 'Моделът е задължителен';
    }
    if (!formData.class.trim()) {
      newErrors.class = 'Класът е задължителен';
    }
    if (!formData.fuel_type.trim()) {
      newErrors.fuel_type = 'Типът гориво е задължителен';
    }
    if (!formData.transmission.trim()) {
      newErrors.transmission = 'Трансмисията е задължителна';
    }
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 2) {
      newErrors.year = 'Невалидна година';
    }
    if (formData.price_per_day_bgn <= 0) {
      newErrors.price_per_day_bgn = 'Цената трябва да е по-голяма от 0';
    }
    if (formData.deposit_amount_bgn < 0) {
      newErrors.deposit_amount_bgn = 'Депозитът не може да е отрицателен';
    }

    // Validate enum values
    const allowedClasses = ['economy', 'standard', 'premium'];
    if (!allowedClasses.includes(formData.class)) {
      newErrors.class = 'Невалиден клас. Допустими: economy, standard, premium';
    }

    const allowedFuelTypes = ['petrol', 'diesel', 'hybrid', 'electric', 'lpg'];
    if (!allowedFuelTypes.includes(formData.fuel_type)) {
      newErrors.fuel_type =
        'Невалиден тип гориво. Допустими: petrol, diesel, hybrid, electric, lpg';
    }

    const allowedTransmissions = [
      'manual',
      'automatic',
      'cvt',
      'semi-automatic',
    ];
    if (!allowedTransmissions.includes(formData.transmission)) {
      newErrors.transmission =
        'Невалидна трансмисия. Допустими: manual, automatic, cvt, semi-automatic';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const carData: Partial<AdminCar> = {
        brand: formData.brand,
        model: formData.model,
        year: Number(formData.year),
        class: formData.class as 'economy' | 'standard' | 'premium',
        price_per_day: Number(formData.price_per_day_bgn), // Keep in BGN
        deposit_amount: Number(formData.deposit_amount_bgn), // Keep in BGN
        is_active: formData.available,
        fuel_type: formData.fuel_type as
          | 'petrol'
          | 'diesel'
          | 'electric'
          | 'hybrid',
        transmission: formData.transmission as 'manual' | 'automatic',
        features: formData.features,
        image_urls: imageUrls, // Array of image URLs
      };

      await onSubmit(carData);
      onClose();
    } catch (error) {
      console.error('Error submitting car:', error);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Fade}
      disableScrollLock={true}
      keepMounted={false}
      sx={{
        '& .MuiDialog-paper': {
          margin: 2,
          maxHeight: 'calc(100vh - 32px)',
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">
            {isEditing ? texts.editTitle : texts.title}
          </Typography>
          <IconButton onClick={handleClose} disabled={loading}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Basic Information */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {texts.basicInformation}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <TextField
                fullWidth
                label={texts.brand}
                value={formData.brand}
                onChange={handleInputChange('brand')}
                error={!!errors.brand}
                helperText={errors.brand}
                required
              />
            </Box>

            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <TextField
                fullWidth
                label={texts.model}
                value={formData.model}
                onChange={handleInputChange('model')}
                error={!!errors.model}
                helperText={errors.model}
                required
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ minWidth: 150, flex: '1 1 150px' }}>
              <TextField
                fullWidth
                label={texts.year}
                type="number"
                value={formData.year}
                onChange={handleInputChange('year')}
                error={!!errors.year}
                helperText={errors.year}
                required
              />
            </Box>

            <Box sx={{ minWidth: 150, flex: '1 1 150px' }}>
              <FormControl fullWidth>
                <InputLabel>{texts.fuelType}</InputLabel>
                <Select
                  error={!!errors.fuel_type}
                  required
                  value={formData.fuel_type}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fuel_type: e.target.value,
                    }))
                  }
                  label={texts.fuelType}
                >
                  <MenuItem value="petrol">{texts.fuelTypes.gasoline}</MenuItem>
                  <MenuItem value="diesel">{texts.fuelTypes.diesel}</MenuItem>
                  <MenuItem value="electric">
                    {texts.fuelTypes.electric}
                  </MenuItem>
                  <MenuItem value="hybrid">{texts.fuelTypes.hybrid}</MenuItem>
                </Select>
                {errors.fuel_type && (
                  <FormHelperText error>{errors.fuel_type}</FormHelperText>
                )}
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 150, flex: '1 1 150px' }}>
              <FormControl fullWidth>
                <InputLabel>{texts.class}</InputLabel>
                <Select
                  error={!!errors.class}
                  required
                  value={formData.class}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, class: e.target.value }))
                  }
                  label={texts.class}
                >
                  <MenuItem value="economy">{texts.classes.economy}</MenuItem>
                  <MenuItem value="standard">{texts.classes.standard}</MenuItem>
                  <MenuItem value="premium">{texts.classes.premium}</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 150, flex: '1 1 150px' }}>
              <FormControl fullWidth>
                <InputLabel>{texts.transmission}</InputLabel>
                <Select
                  error={!!errors.transmission}
                  required
                  value={formData.transmission}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      transmission: e.target.value,
                    }))
                  }
                  label={texts.transmission}
                >
                  <MenuItem value="manual">
                    {texts.transmissions.manual}
                  </MenuItem>
                  <MenuItem value="automatic">
                    {texts.transmissions.automatic}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 150, flex: '1 1 150px' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.available}
                    onChange={handleInputChange('available')}
                  />
                }
                label={formData.available ? texts.active : texts.inactive}
              />
            </Box>
          </Box>

          {/* Pricing */}
          <Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              {texts.pricing}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <TextField
                fullWidth
                label={texts.pricePerDay}
                type="number"
                value={formData.price_per_day_bgn}
                onChange={handleInputChange('price_per_day_bgn')}
                error={!!errors.price_per_day_bgn}
                helperText={
                  errors.price_per_day_bgn ||
                  (formData.price_per_day_bgn > 0
                    ? `≈ ${getEURDisplay(formData.price_per_day_bgn)} €`
                    : '')
                }
                required
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>лв</Typography>,
                }}
              />
            </Box>

            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <TextField
                fullWidth
                label={texts.depositAmount}
                type="number"
                value={formData.deposit_amount_bgn}
                onChange={handleInputChange('deposit_amount_bgn')}
                error={!!errors.deposit_amount_bgn}
                helperText={
                  errors.deposit_amount_bgn ||
                  (formData.deposit_amount_bgn > 0
                    ? `≈ ${getEURDisplay(formData.deposit_amount_bgn)} €`
                    : '')
                }
                required
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>лв</Typography>,
                }}
              />
            </Box>
          </Box>

          {/* Features */}
          <Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              {texts.features}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <TextField
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Добави екстра"
              onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
              sx={{ minWidth: 200 }}
            />
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddFeature}
              disabled={!newFeature.trim()}
            >
              {texts.addFeature}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.features.map((feature, index) => (
              <Chip
                key={index}
                label={feature}
                onDelete={() => handleRemoveFeature(feature)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>

          {/* Images */}
          <Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              {texts.images}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Първата снимка ще бъде използвана като заглавна навсякъде в сайта.
              Можеш да преместиш която и да е снимка на първо място с бутона ↑.
            </Typography>
          </Box>

          <Box>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="car-image-upload"
              multiple
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="car-image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUpload />}
                sx={{ mb: 2 }}
              >
                {texts.uploadImages}
              </Button>
            </label>

            {/* Image Previews */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {imageUrls.map((url, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    border:
                      index === 0 ? '3px solid #1976d2' : '1px solid #ddd',
                    borderRadius: 1,
                    overflow: 'hidden',
                    width: 150,
                    height: 120,
                  }}
                >
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    fill
                    sizes="150px"
                    style={{
                      objectFit: 'cover',
                    }}
                  />

                  {/* Main image indicator */}
                  {index === 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 4,
                        left: 4,
                        backgroundColor: '#1976d2',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        borderRadius: 0.5,
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      }}
                    >
                      ГЛАВНА
                    </Box>
                  )}

                  {/* Action buttons */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5,
                    }}
                  >
                    {index > 0 && (
                      <IconButton
                        size="small"
                        color="primary"
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          width: 24,
                          height: 24,
                        }}
                        onClick={() => handleMoveToFirst(index)}
                        title="Направи главна снимка"
                      >
                        <ArrowUpward sx={{ fontSize: 16 }} />
                      </IconButton>
                    )}

                    <IconButton
                      size="small"
                      color="error"
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        width: 24,
                        height: 24,
                      }}
                      onClick={() => handleRemoveImage(index)}
                      title="Изтрий снимка"
                    >
                      <Delete sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} disabled={loading}>
          {texts.cancel}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <div className="spinner" /> : null}
        >
          {loading ? texts.loading : texts.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
