import Joi from 'joi';

export interface BookingData {
  customerName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  carClass: string;
}

export const bookingSchema = Joi.object({
  customerName: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Името трябва да е поне 2 символа',
    'string.max': 'Името не може да е повече от 100 символа',
    'any.required': 'Името е задължително',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Невалиден имейл адрес',
    'any.required': 'Имейлът е задължителен',
  }),
  phone: Joi.string()
    .pattern(/^[0-9+\-\s()]+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      'string.pattern.base': 'Невалиден телефонен номер',
      'string.min': 'Телефонният номер трябва да е поне 10 символа',
      'string.max': 'Телефонният номер не може да е повече от 15 символа',
      'any.required': 'Телефонният номер е задължителен',
    }),
  startDate: Joi.date().min('now').required().messages({
    'date.min': 'Началната дата не може да е в миналото',
    'any.required': 'Началната дата е задължителна',
  }),
  endDate: Joi.date().min(Joi.ref('startDate')).required().messages({
    'date.min': 'Крайната дата трябва да е след началната',
    'any.required': 'Крайната дата е задължителна',
  }),
  carClass: Joi.string()
    .valid('economy', 'comfort', 'premium')
    .required()
    .messages({
      'any.only': 'Невалиден клас автомобил',
      'any.required': 'Класът автомобил е задължителен',
    }),
});

export function validateBookingData(data: BookingData): {
  isValid: boolean;
  errors?: string[];
} {
  const { error } = bookingSchema.validate(data);

  if (error) {
    return {
      isValid: false,
      errors: error.details.map((detail) => detail.message),
    };
  }

  return { isValid: true };
}

export function validateEmail(email: string): boolean {
  const emailSchema = Joi.string().email().required();
  const { error } = emailSchema.validate(email);
  return !error;
}

export function validatePhone(phone: string): boolean {
  const phoneSchema = Joi.string()
    .pattern(/^[0-9+\-\s()]+$/)
    .min(10)
    .max(15);
  const { error } = phoneSchema.validate(phone);
  return !error;
}
