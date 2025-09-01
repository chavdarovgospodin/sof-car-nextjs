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
} from '@mui/material';
import { Close, Add, Delete, CloudUpload } from '@mui/icons-material';
import { AdminCar } from '@/hooks/useAdmin';

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
    economy: 'Економичен',
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
  uploadImages: 'Качи снимки',
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
    price_per_day: 0,
    deposit_amount: 0,
    available: true,
    features: [] as string[],
    transmission: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newFeature, setNewFeature] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (isEditing && car) {
      console.log('++++car++++', car);
      setFormData({
        brand: car.brand,
        model: car.model,
        year: car.year,
        fuel_type: car.fuel_type || '',
        class: car.class,
        price_per_day: car.price_per_day,
        deposit_amount: car.deposit_amount,
        available: !!car.is_active,
        features: car.features ? [...car.features] : [],
        transmission: car.transmission || '',
      });

      // Set existing image - backend now uses single image_url
      if (car.image_url) {
        setImageUrls([car.image_url]);
      }
    } else {
      // Reset form for new car
      setFormData({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        fuel_type: '',
        class: '',
        price_per_day: 0,
        deposit_amount: 0,
        available: true,
        features: [],
        transmission: '',
      });
      setImageUrls([]);
    }
    setErrors({});
  }, [car, isEditing]);

  console.log(formData);

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
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Невалидна година';
    }
    if (formData.price_per_day <= 0) {
      newErrors.price_per_day = 'Цената трябва да е по-голяма от 0';
    }
    if (formData.deposit_amount < 0) {
      newErrors.deposit_amount = 'Депозитът не може да е отрицателен';
    }
    console.log(newErrors);
    console.log(formData);
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
        price_per_day: Number(formData.price_per_day),
        deposit_amount: Number(formData.deposit_amount),
        is_active: formData.available,
        fuel_type: formData.fuel_type as
          | 'petrol'
          | 'diesel'
          | 'electric'
          | 'hybrid',
        transmission: formData.transmission as 'manual' | 'automatic',
        features: formData.features,
        image_url: imageUrls.length > 0 ? imageUrls[0] : null, // Single image URL
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
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
                value={formData.price_per_day}
                onChange={handleInputChange('price_per_day')}
                error={!!errors.price_per_day}
                helperText={errors.price_per_day}
                required
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>€</Typography>,
                }}
              />
            </Box>

            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <TextField
                fullWidth
                label={texts.depositAmount}
                type="number"
                value={formData.deposit_amount}
                onChange={handleInputChange('deposit_amount')}
                error={!!errors.deposit_amount}
                helperText={errors.deposit_amount}
                required
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>€</Typography>,
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
                    border: '1px solid #ddd',
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
                  <IconButton
                    size="small"
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      backgroundColor: 'rgba(255,255,255,0.8)',
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <Delete />
                  </IconButton>
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
