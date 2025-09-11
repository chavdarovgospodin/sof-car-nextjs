'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { Send } from '@mui/icons-material';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api';
import { ContactFormProps, ContactFormData } from './ContactForm.types';
import { styles } from './ContactForm.styles';
import { getContactFormTexts, validateContactForm } from './ContactForm.const';

export function ContactForm({ currentLang, onShowSnackbar }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const texts = getContactFormTexts(currentLang);

  const handleInputChange =
    (field: keyof ContactFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: false,
        }));
      }
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationResult = validateContactForm(formData);

    if (!validationResult.isValid) {
      const newErrors: { [key: string]: boolean } = {};
      validationResult.errors.forEach((field) => {
        newErrors[field] = true;
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACT_INQUIRY}`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }
      );

      onShowSnackbar(texts.success, 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      onShowSnackbar(texts.error, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={styles.nameEmailRow}>
        <TextField
          label={texts.name}
          value={formData.name}
          onChange={handleInputChange('name')}
          error={errors.name}
          helperText={errors.name ? texts.nameRequired : ''}
          required
          fullWidth
          sx={styles.nameField}
        />
        <TextField
          label={texts.email}
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
          helperText={
            errors.email
              ? formData.email
                ? texts.emailInvalid
                : texts.emailRequired
              : ''
          }
          required
          fullWidth
          sx={styles.emailField}
        />
      </Box>

      <TextField
        label={texts.phone}
        value={formData.phone}
        onChange={handleInputChange('phone')}
        fullWidth
        sx={styles.phoneField}
      />

      <TextField
        label={texts.message}
        value={formData.message}
        onChange={handleInputChange('message')}
        error={errors.message}
        helperText={errors.message ? texts.messageRequired : ''}
        required
        multiline
        rows={4}
        fullWidth
        sx={styles.messageField}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress size={20} /> : <Send />}
        sx={isSubmitting ? styles.loadingButton : styles.submitButton}
      >
        {isSubmitting ? texts.submitting : texts.submit}
      </Button>
    </Box>
  );
}

export default ContactForm;
