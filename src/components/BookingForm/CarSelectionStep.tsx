'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Chip,
  useTheme,
} from '@mui/material';
import { DirectionsCar, CheckCircle } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslations } from '@/hooks/useTranslations';
import { BookingData, bookingSchema } from '@/utils/validation';
import { CAR_CLASSES } from '@/utils/constants';
import Joi from 'joi';

interface CarSelectionStepProps {
  data?: Partial<BookingData>;
  onComplete: (data: Partial<BookingData>) => void;
  onBack: () => void;
  onNext: () => void;
}

export function CarSelectionStep({
  data,
  onComplete,
  onBack,
  onNext,
}: CarSelectionStepProps) {
  const theme = useTheme();
  const { t, currentLang } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Partial<BookingData>>({
    resolver: joiResolver(
      Joi.object({
        carClass: Joi.string()
          .valid('economy', 'comfort', 'premium')
          .required()
          .messages({
            'any.only': 'Невалиден клас автомобил',
            'any.required': 'Класът автомобил е задължителен',
          }),
      })
    ),
    defaultValues: {
      carClass: data?.carClass || '',
    },
    mode: 'onChange',
  });

  const selectedCarClass = watch('carClass');

  const onSubmit = async (formData: Partial<BookingData>) => {
    setIsSubmitting(true);
    try {
      onComplete(formData);
    } catch (error) {
      console.error('Error saving car selection:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        {currentLang === 'bg' ? 'Избор на автомобил' : 'Car Selection'}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {currentLang === 'bg'
          ? 'Изберете класа автомобил, който искате да наемете'
          : 'Choose the car class you want to rent'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={{ mb: 2 }}>
            <Typography variant="h6">
              {currentLang === 'bg'
                ? 'Достъпни класове:'
                : 'Available Classes:'}
            </Typography>
          </FormLabel>

          <Controller
            name="carClass"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} sx={{ mb: 3 }}>
                <Grid container spacing={3}>
                  {Object.entries(CAR_CLASSES).map(([key, carClass]) => (
                    <Grid size={{ xs: 12, md: 4 }} key={key}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          border: selectedCarClass === key ? 2 : 1,
                          borderColor:
                            selectedCarClass === key
                              ? 'primary.main'
                              : 'divider',
                          backgroundColor:
                            selectedCarClass === key
                              ? 'primary.light'
                              : 'background.paper',
                          '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'primary.light',
                          },
                          transition: 'all 0.2s ease-in-out',
                        }}
                        onClick={() => field.onChange(key)}
                      >
                        <CardContent sx={{ textAlign: 'center', p: 3 }}>
                          {/* Radio Button */}
                          <FormControlLabel
                            value={key}
                            control={<Radio />}
                            label=""
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                          />

                          {/* Car Icon */}
                          <Box sx={{ mb: 2 }}>
                            <DirectionsCar
                              sx={{
                                fontSize: 60,
                                color:
                                  selectedCarClass === key
                                    ? 'primary.main'
                                    : 'text.secondary',
                              }}
                            />
                          </Box>

                          {/* Car Class Name */}
                          <Typography variant="h6" component="h3" gutterBottom>
                            {
                              carClass.displayName[
                                currentLang as keyof typeof carClass.displayName
                              ]
                            }
                          </Typography>

                          {/* Price */}
                          <Typography
                            variant="h4"
                            component="p"
                            color="primary.main"
                            gutterBottom
                            sx={{ fontWeight: 'bold' }}
                          >
                            {
                              carClass.price[
                                currentLang as keyof typeof carClass.price
                              ]
                            }{' '}
                            {carClass.currency}
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              /{currentLang === 'bg' ? 'ден' : 'day'}
                            </Typography>
                          </Typography>

                          {/* Description */}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            paragraph
                            sx={{ mb: 2 }}
                          >
                            {
                              carClass.description[
                                currentLang as keyof typeof carClass.description
                              ]
                            }
                          </Typography>

                          {/* Features */}
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              gap: 1,
                              flexWrap: 'wrap',
                            }}
                          >
                            <Chip
                              label={
                                currentLang === 'bg'
                                  ? 'Застраховка'
                                  : 'Insurance'
                              }
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                            <Chip
                              label={currentLang === 'bg' ? '24/7' : '24/7'}
                              size="small"
                              color="secondary"
                              variant="outlined"
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            )}
          />

          {errors.carClass && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {errors.carClass.message}
            </Typography>
          )}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={onBack}
              size="large"
              sx={{ minWidth: 120 }}
            >
              {currentLang === 'bg' ? 'Назад' : 'Back'}
            </Button>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!isValid || isSubmitting}
              sx={{ minWidth: 120 }}
            >
              {isSubmitting
                ? currentLang === 'bg'
                  ? 'Зареждане...'
                  : 'Loading...'
                : currentLang === 'bg'
                ? 'Продължи'
                : 'Continue'}
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
}
