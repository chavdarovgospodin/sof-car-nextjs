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

const convertToEUR = (bgnAmount: number): number => {
  return Math.round((bgnAmount / 1.96) * 100) / 100;
};

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
  pricePerDay: 'Цена на ден',
  depositAmount: 'Депозит',
  isActive: 'Активен',
  active: 'Активен',
  inactive: 'Неактивен',
  pricing: 'Ценообразуване',
  features: 'Екстри',
  addFeature: 'Добави екстра',
  structuredFeatures: 'Основни характеристики',
  seats: 'Места',
  largeLuggage: 'Голям куфар',
  smallLuggage: 'Малък куфар',
  doors: 'Врати',
  minAge: 'Минимална възраст',
  fourWd: '4WD задвижване',
  ac: 'Климатик',
  images: 'Снимки',
  uploadImages: 'Качи снимки',
  cancel: 'Отказ',
  save: 'Запази',
  loading: 'Зареждане...',
};

interface ImageItem {
  url: string;
  file?: File;
  isNew: boolean;
  originalIndex?: number;
}

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
    price_per_day_bgn: 0,
    deposit_amount_bgn: 0,
    available: true,
    features: [] as string[],
    transmission: '',
    seats: 5,
    large_luggage: 1,
    small_luggage: 1,
    doors: 4,
    min_age: 21,
    four_wd: false,
    ac: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newFeature, setNewFeature] = useState('');
  const [allImages, setAllImages] = useState<ImageItem[]>([]);
  const [originalImageUrls, setOriginalImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (isEditing && car) {
      setFormData({
        brand: car.brand,
        model: car.model,
        year: car.year,
        fuel_type: car.fuel_type || '',
        class: car.class,
        price_per_day_bgn: car.price_per_day,
        deposit_amount_bgn: car.deposit_amount,
        available: !!car.is_active,
        features: car.features ? [...car.features] : [],
        transmission: car.transmission || '',
        seats: car.seats || 5,
        large_luggage: car.large_luggage || 1,
        small_luggage: car.small_luggage || 1,
        doors: car.doors || 4,
        min_age: car.min_age || 21,
        four_wd: car.four_wd || false,
        ac: car.ac || false,
      });

      // Зареждаме съществуващите снимки
      const urls = car.image_urls || [];
      const existingImages: ImageItem[] = urls.map((url, index) => ({
        url,
        isNew: false,
        originalIndex: index,
      }));
      setAllImages(existingImages);
      setOriginalImageUrls(urls);
    } else {
      // Reset за нова кола
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
        seats: 5,
        large_luggage: 1,
        small_luggage: 1,
        doors: 4,
        min_age: 21,
        four_wd: false,
        ac: false,
      });
      setAllImages([]);
      setOriginalImageUrls([]);
    }
    setErrors({});
  }, [car, isEditing]);

  const handleInputChange =
    (field: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = event.target as HTMLInputElement;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

  const handleSelectChange =
    (field: string) => (event: { target: { value: string } }) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

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

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const newImage: ImageItem = {
            url: e.target.result as string,
            file: file,
            isNew: true,
          };
          setAllImages((prev) => [...prev, newImage]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setAllImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveToFirst = (index: number) => {
    if (index === 0) return;

    setAllImages((prev) => {
      const newImages = [...prev];
      const [movedImage] = newImages.splice(index, 1);
      if (movedImage) {
        newImages.unshift(movedImage);
      }
      return newImages;
    });
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
    if (formData.year < 1990 || formData.year > new Date().getFullYear() + 2) {
      newErrors.year = 'Невалидна година';
    }
    if (formData.price_per_day_bgn <= 0) {
      newErrors.price_per_day_bgn = 'Цената трябва да е по-голяма от 0';
    }
    if (formData.deposit_amount_bgn < 0) {
      newErrors.deposit_amount_bgn = 'Депозитът не може да е отрицателен';
    }

    const allowedClasses = ['economy', 'standard', 'premium'];
    if (!allowedClasses.includes(formData.class)) {
      newErrors.class = 'Невалиден клас';
    }

    const allowedFuelTypes = ['petrol', 'diesel', 'hybrid', 'electric', 'lpg'];
    if (!allowedFuelTypes.includes(formData.fuel_type)) {
      newErrors.fuel_type = 'Невалиден тип гориво';
    }

    const allowedTransmissions = [
      'manual',
      'automatic',
      'cvt',
      'semi-automatic',
    ];
    if (!allowedTransmissions.includes(formData.transmission)) {
      newErrors.transmission = 'Невалидна трансмисия';
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
        price_per_day: Number(formData.price_per_day_bgn),
        deposit_amount: Number(formData.deposit_amount_bgn),
        is_active: formData.available,
        fuel_type: formData.fuel_type as
          | 'petrol'
          | 'diesel'
          | 'electric'
          | 'hybrid',
        transmission: formData.transmission as 'manual' | 'automatic',
        features: formData.features,
        seats: Number(formData.seats),
        large_luggage: Number(formData.large_luggage),
        small_luggage: Number(formData.small_luggage),
        doors: Number(formData.doors),
        min_age: Number(formData.min_age),
        four_wd: formData.four_wd,
        ac: formData.ac,
      };

      const existingUrls: string[] = [];
      const newFiles: File[] = [];

      allImages.forEach((image) => {
        if (!image.isNew) {
          existingUrls.push(image.url);
        } else if (image.file) {
          newFiles.push(image.file);
        }
      });

      if (isEditing && car) {
        const urlsChanged =
          JSON.stringify(originalImageUrls) !== JSON.stringify(existingUrls);
        const hasNewFiles = newFiles.length > 0;

        if (urlsChanged || hasNewFiles) {
          carData.image_urls = existingUrls;
          console.log('Image changes:', {
            originalCount: originalImageUrls.length,
            currentCount: existingUrls.length,
            newFilesCount: newFiles.length,
            firstImage: allImages[0]?.isNew ? 'new' : 'existing',
          });
        }
      }

      if (newFiles.length > 0) {
        carData.imageFiles = newFiles;
      }

      if (allImages.length > 0 && allImages[0].isNew) {
        const existingCount = allImages.filter((img) => !img.isNew).length;
        const newImagePosition = existingCount;
        carData.main_image_index = newImagePosition;
      }

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

            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <FormControl fullWidth error={!!errors.class} required>
                <InputLabel>{texts.class}</InputLabel>
                <Select
                  value={formData.class}
                  onChange={handleSelectChange('class')}
                  label={texts.class}
                >
                  <MenuItem value="economy">{texts.classes.economy}</MenuItem>
                  <MenuItem value="standard">{texts.classes.standard}</MenuItem>
                  <MenuItem value="premium">{texts.classes.premium}</MenuItem>
                </Select>
                {errors.class && (
                  <FormHelperText>{errors.class}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <FormControl fullWidth error={!!errors.fuel_type} required>
                <InputLabel>{texts.fuelType}</InputLabel>
                <Select
                  value={formData.fuel_type}
                  onChange={handleSelectChange('fuel_type')}
                  label={texts.fuelType}
                >
                  <MenuItem value="petrol">Бензин</MenuItem>
                  <MenuItem value="diesel">Дизел</MenuItem>
                  <MenuItem value="hybrid">Хибрид</MenuItem>
                  <MenuItem value="electric">Електрически</MenuItem>
                  <MenuItem value="lpg">Газ (LPG)</MenuItem>
                </Select>
                {errors.fuel_type && (
                  <FormHelperText>{errors.fuel_type}</FormHelperText>
                )}
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <FormControl fullWidth error={!!errors.transmission} required>
                <InputLabel>{texts.transmission}</InputLabel>
                <Select
                  value={formData.transmission}
                  onChange={handleSelectChange('transmission')}
                  label={texts.transmission}
                >
                  <MenuItem value="manual">
                    {texts.transmissions.manual}
                  </MenuItem>
                  <MenuItem value="automatic">
                    {texts.transmissions.automatic}
                  </MenuItem>
                  <MenuItem value="cvt">CVT</MenuItem>
                  <MenuItem value="semi-automatic">Полуавтоматична</MenuItem>
                </Select>
                {errors.transmission && (
                  <FormHelperText>{errors.transmission}</FormHelperText>
                )}
              </FormControl>
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
                label={`${texts.pricePerDay} (BGN)`}
                type="number"
                value={formData.price_per_day_bgn}
                onChange={handleInputChange('price_per_day_bgn')}
                error={!!errors.price_per_day_bgn}
                helperText={
                  errors.price_per_day_bgn ||
                  `≈ €${getEURDisplay(formData.price_per_day_bgn)}`
                }
                required
              />
            </Box>

            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <TextField
                fullWidth
                label={`${texts.depositAmount} (BGN)`}
                type="number"
                value={formData.deposit_amount_bgn}
                onChange={handleInputChange('deposit_amount_bgn')}
                error={!!errors.deposit_amount_bgn}
                helperText={
                  errors.deposit_amount_bgn ||
                  `≈ €${getEURDisplay(formData.deposit_amount_bgn)}`
                }
                required
              />
            </Box>

            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.available}
                    onChange={handleInputChange('available')}
                    color="primary"
                  />
                }
                label={formData.available ? texts.active : texts.inactive}
              />
            </Box>
          </Box>

          {/* Structured Features */}
          <Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              {texts.structuredFeatures}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <TextField
              label={texts.seats}
              type="number"
              value={formData.seats}
              onChange={handleInputChange('seats')}
              sx={{ width: 120 }}
            />
            <TextField
              label={texts.largeLuggage}
              type="number"
              value={formData.large_luggage}
              onChange={handleInputChange('large_luggage')}
              sx={{ width: 120 }}
            />
            <TextField
              label={texts.smallLuggage}
              type="number"
              value={formData.small_luggage}
              onChange={handleInputChange('small_luggage')}
              sx={{ width: 120 }}
            />
            <TextField
              label={texts.doors}
              type="number"
              value={formData.doors}
              onChange={handleInputChange('doors')}
              sx={{ width: 120 }}
            />
            <TextField
              label={texts.minAge}
              type="number"
              value={formData.min_age}
              onChange={handleInputChange('min_age')}
              sx={{ width: 150 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.four_wd}
                  onChange={handleInputChange('four_wd')}
                />
              }
              label={texts.fourWd}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.ac}
                  onChange={handleInputChange('ac')}
                />
              }
              label={texts.ac}
            />
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
              {allImages.map((image, index) => (
                <Box
                  key={`${image.url}-${index}`}
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
                    src={image.url}
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

                  {/* New image indicator */}
                  {image.isNew && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 4,
                        left: 4,
                        backgroundColor: '#4caf50',
                        color: 'white',
                        px: 0.5,
                        py: 0.25,
                        borderRadius: 0.25,
                        fontSize: '0.65rem',
                        fontWeight: 'bold',
                      }}
                    >
                      НОВА
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
