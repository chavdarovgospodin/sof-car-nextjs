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
import { CAR_FORM_DIALOG_CONST } from './CarFormDialog.const';
import { carFormDialogStyles } from './CarFormDialog.styles';
import {
  CarFormDialogProps,
  FormData,
  ImageItem,
  ValidationErrors,
} from './CarFormDialog.types';

const convertToEUR = (bgnAmount: number): number => {
  return (
    Math.round((bgnAmount / CAR_FORM_DIALOG_CONST.CURRENCY_RATE) * 100) / 100
  );
};

const getEURDisplay = (bgnAmount: number): string => {
  return convertToEUR(bgnAmount).toFixed(2);
};

export default function CarFormDialog({
  open,
  onClose,
  onSubmit,
  car,
  isEditing = false,
  loading = false,
}: CarFormDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    brand: '',
    model: '',
    year: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.year,
    fuel_type: '',
    class: '',
    price_per_day_bgn: 0,
    deposit_amount_bgn: 0,
    available: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.available,
    features: [],
    transmission: '',
    seats: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.seats,
    large_luggage: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.largeLuggage,
    small_luggage: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.smallLuggage,
    doors: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.doors,
    min_age: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.minAge,
    four_wd: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.fourWd,
    ac: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.ac,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
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
        seats: car.seats || CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.seats,
        large_luggage:
          car.large_luggage ||
          CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.largeLuggage,
        small_luggage:
          car.small_luggage ||
          CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.smallLuggage,
        doors: car.doors || CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.doors,
        min_age: car.min_age || CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.minAge,
        four_wd: car.four_wd || CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.fourWd,
        ac: car.ac || CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.ac,
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
        year: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.year,
        fuel_type: '',
        class: '',
        price_per_day_bgn: 0,
        deposit_amount_bgn: 0,
        available: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.available,
        features: [],
        transmission: '',
        seats: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.seats,
        large_luggage: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.largeLuggage,
        small_luggage: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.smallLuggage,
        doors: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.doors,
        min_age: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.minAge,
        four_wd: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.fourWd,
        ac: CAR_FORM_DIALOG_CONST.DEFAULT_VALUES.ac,
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
    const newErrors: ValidationErrors = {};

    if (!formData.brand.trim()) {
      newErrors.brand = CAR_FORM_DIALOG_CONST.VALIDATION.brandRequired;
    }
    if (!formData.model.trim()) {
      newErrors.model = CAR_FORM_DIALOG_CONST.VALIDATION.modelRequired;
    }
    if (!formData.class.trim()) {
      newErrors.class = CAR_FORM_DIALOG_CONST.VALIDATION.classRequired;
    }
    if (!formData.fuel_type.trim()) {
      newErrors.fuel_type = CAR_FORM_DIALOG_CONST.VALIDATION.fuelTypeRequired;
    }
    if (!formData.transmission.trim()) {
      newErrors.transmission =
        CAR_FORM_DIALOG_CONST.VALIDATION.transmissionRequired;
    }
    if (
      formData.year < CAR_FORM_DIALOG_CONST.MIN_YEAR ||
      formData.year >
        new Date().getFullYear() + CAR_FORM_DIALOG_CONST.MAX_YEAR_OFFSET
    ) {
      newErrors.year = CAR_FORM_DIALOG_CONST.VALIDATION.invalidYear;
    }
    if (formData.price_per_day_bgn <= 0) {
      newErrors.price_per_day_bgn =
        CAR_FORM_DIALOG_CONST.VALIDATION.invalidPrice;
    }
    if (formData.deposit_amount_bgn < 0) {
      newErrors.deposit_amount_bgn =
        CAR_FORM_DIALOG_CONST.VALIDATION.invalidDeposit;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (
      !CAR_FORM_DIALOG_CONST.ALLOWED_CLASSES.includes(formData.class as any)
    ) {
      newErrors.class = CAR_FORM_DIALOG_CONST.VALIDATION.invalidClass;
    }

    if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !CAR_FORM_DIALOG_CONST.ALLOWED_FUEL_TYPES.includes(
        formData.fuel_type as any
      )
    ) {
      newErrors.fuel_type = CAR_FORM_DIALOG_CONST.VALIDATION.invalidFuelType;
    }

    if (
      !CAR_FORM_DIALOG_CONST.ALLOWED_TRANSMISSIONS.includes(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formData.transmission as any
      )
    ) {
      newErrors.transmission =
        CAR_FORM_DIALOG_CONST.VALIDATION.invalidTransmission;
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
        <Box sx={carFormDialogStyles.dialogTitle}>
          <Typography variant="h6">
            {isEditing
              ? CAR_FORM_DIALOG_CONST.TEXTS.editTitle
              : CAR_FORM_DIALOG_CONST.TEXTS.title}
          </Typography>
          <IconButton onClick={handleClose} disabled={loading}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={carFormDialogStyles.formContainer}>
          {/* Basic Information */}
          <Box>
            <Typography variant="h6" sx={carFormDialogStyles.sectionTitle}>
              {CAR_FORM_DIALOG_CONST.TEXTS.basicInformation}
            </Typography>
          </Box>

          <Box sx={carFormDialogStyles.formRow}>
            <Box sx={carFormDialogStyles.formField}>
              <TextField
                fullWidth
                label={CAR_FORM_DIALOG_CONST.TEXTS.brand}
                value={formData.brand}
                onChange={handleInputChange('brand')}
                error={!!errors.brand}
                helperText={errors.brand}
                required
              />
            </Box>

            <Box sx={carFormDialogStyles.formField}>
              <TextField
                fullWidth
                label={CAR_FORM_DIALOG_CONST.TEXTS.model}
                value={formData.model}
                onChange={handleInputChange('model')}
                error={!!errors.model}
                helperText={errors.model}
                required
              />
            </Box>
          </Box>

          <Box sx={carFormDialogStyles.formRow}>
            <Box sx={carFormDialogStyles.formFieldSmall}>
              <TextField
                fullWidth
                label={CAR_FORM_DIALOG_CONST.TEXTS.year}
                type="number"
                value={formData.year}
                onChange={handleInputChange('year')}
                error={!!errors.year}
                helperText={errors.year}
                required
              />
            </Box>

            <Box sx={carFormDialogStyles.formField}>
              <FormControl fullWidth error={!!errors.class} required>
                <InputLabel>{CAR_FORM_DIALOG_CONST.TEXTS.class}</InputLabel>
                <Select
                  value={formData.class}
                  onChange={handleSelectChange('class')}
                  label={CAR_FORM_DIALOG_CONST.TEXTS.class}
                >
                  {CAR_FORM_DIALOG_CONST.CLASS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.class && (
                  <FormHelperText>{errors.class}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Box>

          <Box sx={carFormDialogStyles.formRow}>
            <Box sx={carFormDialogStyles.formField}>
              <FormControl fullWidth error={!!errors.fuel_type} required>
                <InputLabel>{CAR_FORM_DIALOG_CONST.TEXTS.fuelType}</InputLabel>
                <Select
                  value={formData.fuel_type}
                  onChange={handleSelectChange('fuel_type')}
                  label={CAR_FORM_DIALOG_CONST.TEXTS.fuelType}
                >
                  {CAR_FORM_DIALOG_CONST.FUEL_TYPE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.fuel_type && (
                  <FormHelperText>{errors.fuel_type}</FormHelperText>
                )}
              </FormControl>
            </Box>

            <Box sx={carFormDialogStyles.formField}>
              <FormControl fullWidth error={!!errors.transmission} required>
                <InputLabel>
                  {CAR_FORM_DIALOG_CONST.TEXTS.transmission}
                </InputLabel>
                <Select
                  value={formData.transmission}
                  onChange={handleSelectChange('transmission')}
                  label={CAR_FORM_DIALOG_CONST.TEXTS.transmission}
                >
                  {CAR_FORM_DIALOG_CONST.TRANSMISSION_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.transmission && (
                  <FormHelperText>{errors.transmission}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Box>

          {/* Pricing */}
          <Box>
            <Divider sx={carFormDialogStyles.divider} />
            <Typography variant="h6" sx={carFormDialogStyles.sectionTitle}>
              {CAR_FORM_DIALOG_CONST.TEXTS.pricing}
            </Typography>
          </Box>

          <Box sx={carFormDialogStyles.formRow}>
            <Box sx={carFormDialogStyles.formField}>
              <TextField
                fullWidth
                label={`${CAR_FORM_DIALOG_CONST.TEXTS.pricePerDay} (BGN)`}
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

            <Box sx={carFormDialogStyles.formField}>
              <TextField
                fullWidth
                label={`${CAR_FORM_DIALOG_CONST.TEXTS.depositAmount} (BGN)`}
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

            <Box sx={carFormDialogStyles.formField}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.available}
                    onChange={handleInputChange('available')}
                    color="primary"
                  />
                }
                label={
                  formData.available
                    ? CAR_FORM_DIALOG_CONST.TEXTS.active
                    : CAR_FORM_DIALOG_CONST.TEXTS.inactive
                }
              />
            </Box>
          </Box>

          {/* Structured Features */}
          <Box>
            <Divider sx={carFormDialogStyles.divider} />
            <Typography variant="h6" sx={carFormDialogStyles.sectionTitle}>
              {CAR_FORM_DIALOG_CONST.TEXTS.structuredFeatures}
            </Typography>
          </Box>

          <Box sx={carFormDialogStyles.formRow}>
            <TextField
              label={CAR_FORM_DIALOG_CONST.TEXTS.seats}
              type="number"
              value={formData.seats}
              onChange={handleInputChange('seats')}
              sx={carFormDialogStyles.formFieldTiny}
            />
            <TextField
              label={CAR_FORM_DIALOG_CONST.TEXTS.largeLuggage}
              type="number"
              value={formData.large_luggage}
              onChange={handleInputChange('large_luggage')}
              sx={carFormDialogStyles.formFieldTiny}
            />
            <TextField
              label={CAR_FORM_DIALOG_CONST.TEXTS.smallLuggage}
              type="number"
              value={formData.small_luggage}
              onChange={handleInputChange('small_luggage')}
              sx={carFormDialogStyles.formFieldTiny}
            />
            <TextField
              label={CAR_FORM_DIALOG_CONST.TEXTS.doors}
              type="number"
              value={formData.doors}
              onChange={handleInputChange('doors')}
              sx={carFormDialogStyles.formFieldTiny}
            />
            <TextField
              label={CAR_FORM_DIALOG_CONST.TEXTS.minAge}
              type="number"
              value={formData.min_age}
              onChange={handleInputChange('min_age')}
              sx={carFormDialogStyles.formFieldMedium}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.four_wd}
                  onChange={handleInputChange('four_wd')}
                />
              }
              label={CAR_FORM_DIALOG_CONST.TEXTS.fourWd}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.ac}
                  onChange={handleInputChange('ac')}
                />
              }
              label={CAR_FORM_DIALOG_CONST.TEXTS.ac}
            />
          </Box>

          {/* Features */}
          <Box>
            <Divider sx={carFormDialogStyles.divider} />
            <Typography variant="h6" sx={carFormDialogStyles.sectionTitle}>
              {CAR_FORM_DIALOG_CONST.TEXTS.features}
            </Typography>
          </Box>

          <Box sx={carFormDialogStyles.featuresContainer}>
            <TextField
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Добави екстра"
              onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
              sx={carFormDialogStyles.featuresInput}
            />
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddFeature}
              disabled={!newFeature.trim()}
            >
              {CAR_FORM_DIALOG_CONST.TEXTS.addFeature}
            </Button>
          </Box>

          <Box sx={carFormDialogStyles.featuresChips}>
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
            <Divider sx={carFormDialogStyles.divider} />
            <Typography variant="h6" sx={carFormDialogStyles.sectionTitle}>
              {CAR_FORM_DIALOG_CONST.TEXTS.images}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={carFormDialogStyles.imagesDescription}
            >
              {CAR_FORM_DIALOG_CONST.TEXTS.firstImageDescription}
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
                sx={carFormDialogStyles.uploadButton}
              >
                {CAR_FORM_DIALOG_CONST.TEXTS.uploadImages}
              </Button>
            </label>

            {/* Image Previews */}
            <Box sx={carFormDialogStyles.imagesContainer}>
              {allImages.map((image, index) => (
                <Box
                  key={`${image.url}-${index}`}
                  sx={{
                    position: 'relative',
                    borderRadius: 1,
                    overflow: 'hidden',
                    width: 150,
                    height: 120,
                    border:
                      index === 0 ? '3px solid #1976d2' : '1px solid #ddd',
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
                    <Box sx={carFormDialogStyles.mainImageIndicator}>
                      {CAR_FORM_DIALOG_CONST.TEXTS.mainImage}
                    </Box>
                  )}

                  {/* New image indicator */}
                  {image.isNew && (
                    <Box sx={carFormDialogStyles.newImageIndicator}>
                      {CAR_FORM_DIALOG_CONST.TEXTS.newImage}
                    </Box>
                  )}

                  {/* Action buttons */}
                  <Box sx={carFormDialogStyles.imageActions}>
                    {index > 0 && (
                      <IconButton
                        size="small"
                        color="primary"
                        sx={carFormDialogStyles.actionButton}
                        onClick={() => handleMoveToFirst(index)}
                        title={CAR_FORM_DIALOG_CONST.TEXTS.makeMainImage}
                      >
                        <ArrowUpward sx={{ fontSize: 16 }} />
                      </IconButton>
                    )}

                    <IconButton
                      size="small"
                      color="error"
                      sx={carFormDialogStyles.actionButton}
                      onClick={() => handleRemoveImage(index)}
                      title={CAR_FORM_DIALOG_CONST.TEXTS.deleteImage}
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

      <DialogActions sx={carFormDialogStyles.dialogActions}>
        <Button onClick={handleClose} disabled={loading}>
          {CAR_FORM_DIALOG_CONST.TEXTS.cancel}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <div className="spinner" /> : null}
        >
          {loading
            ? CAR_FORM_DIALOG_CONST.TEXTS.loading
            : CAR_FORM_DIALOG_CONST.TEXTS.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
