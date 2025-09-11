export const getContactFormTexts = (currentLang: string) => ({
  name: currentLang === 'bg' ? 'Име' : 'Name',
  nameRequired:
    currentLang === 'bg' ? 'Име е задължително' : 'Name is required',
  email: currentLang === 'bg' ? 'Email' : 'Email',
  emailRequired:
    currentLang === 'bg' ? 'Email е задължителен' : 'Email is required',
  emailInvalid:
    currentLang === 'bg' ? 'Невалиден email адрес' : 'Invalid email address',
  phone: currentLang === 'bg' ? 'Телефон' : 'Phone',
  message: currentLang === 'bg' ? 'Съобщение' : 'Message',
  messageRequired:
    currentLang === 'bg' ? 'Съобщението е задължително' : 'Message is required',
  submit: currentLang === 'bg' ? 'Изпрати' : 'Send',
  submitting: currentLang === 'bg' ? 'Изпращане...' : 'Sending...',
  success:
    currentLang === 'bg'
      ? 'Съобщението е изпратено успешно!'
      : 'Message sent successfully!',
  error:
    currentLang === 'bg'
      ? 'Възникна грешка при изпращане'
      : 'Error sending message',
});

export const validateContactForm = (data: {
  name: string;
  email: string;
  message: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name.trim()) {
    errors.push('name');
  }

  if (!data.email.trim()) {
    errors.push('email');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('email');
  }

  if (!data.message.trim()) {
    errors.push('message');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
