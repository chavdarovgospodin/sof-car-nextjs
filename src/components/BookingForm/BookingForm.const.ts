import Joi from 'joi';

export const createValidationSchema = (t: (key: string) => string) =>
  Joi.object({
    clientFirstName: Joi.string()
      .min(2)
      .max(20)
      .required()
      .messages({
        'string.min': t('booking.clientFirstNameMin'),
        'string.max': t('booking.clientFirstNameMax'),
        'string.empty': t('booking.clientFirstNameRequired'),
      }),
    clientLastName: Joi.string()
      .min(2)
      .max(20)
      .required()
      .messages({
        'string.min': t('booking.clientLastNameMin'),
        'string.max': t('booking.clientLastNameMax'),
        'string.empty': t('booking.clientLastNameRequired'),
      }),
    clientEmail: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': t('booking.clientEmailInvalid'),
        'string.empty': t('booking.clientEmailRequired'),
      }),
    clientPhone: Joi.string()
      .pattern(/^[0-9+\-\s()]+$/)
      .min(10)
      .max(15)
      .required()
      .messages({
        'string.pattern.base': t('booking.clientPhoneInvalid'),
        'string.min': t('booking.clientPhoneMin'),
        'string.max': t('booking.clientPhoneMax'),
        'string.empty': t('booking.clientPhoneRequired'),
      }),
    termsAccepted: Joi.boolean()
      .valid(true)
      .required()
      .messages({
        'any.only': t('booking.termsRequired'),
        'any.required': t('booking.termsRequired'),
      }),
  });

export const calculateTotalDays = (searchDates: {
  start: Date | null;
  end: Date | null;
}) => {
  if (!searchDates.start || !searchDates.end) return 0;
  const diffTime = Math.abs(
    searchDates.end.getTime() - searchDates.start.getTime()
  );
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const calculateTotalPrice = (
  car: { price_per_day: number },
  searchDates: { start: Date | null; end: Date | null }
) => {
  const days = calculateTotalDays(searchDates);
  return days * car.price_per_day;
};

export const getDefaultValues = () => ({
  clientFirstName: '',
  clientLastName: '',
  clientEmail: '',
  clientPhone: '',
  termsAccepted: false,
});
