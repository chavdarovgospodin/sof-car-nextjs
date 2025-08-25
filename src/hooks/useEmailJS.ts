import { useMutation } from '@tanstack/react-query';
import emailjs from '@emailjs/browser';

// Hook за изпращане на email чрез EmailJS
export function useSendEmailJS() {
  return useMutation({
    mutationFn: async (data: {
      serviceId: string;
      templateId: string;
      templateParams: Record<string, unknown>;
      publicKey: string;
    }) => {
      const { serviceId, templateId, templateParams, publicKey } = data;

      return emailjs.send(serviceId, templateId, templateParams, publicKey);
    },
    onSuccess: () => {
      console.log('Email изпратен успешно чрез EmailJS');
    },
    onError: (error) => {
      console.error('Грешка при изпращане на email чрез EmailJS:', error);
    },
  });
}

// Hook за изпращане на контактна форма
export function useSendContactForm() {
  return useMutation({
    mutationFn: async (formData: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS не е конфигуриран правилно');
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        message: formData.message,
        to_name: 'SofCar Team',
      };

      return emailjs.send(serviceId, templateId, templateParams, publicKey);
    },
    onSuccess: () => {
      console.log('Контактната форма е изпратена успешно');
    },
    onError: (error) => {
      console.error('Грешка при изпращане на контактната форма:', error);
    },
  });
}
