// Forms Component
class FormsComponent {
  constructor() {
    this.init();
  }

  init() {
    this.setupTextareaAutoResize();
    this.setupFormValidation();
  }

  setupTextareaAutoResize() {
    const textareas = document.querySelectorAll('textarea');

    textareas.forEach((textarea) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'textarea-wrapper';

      textarea.parentNode.insertBefore(wrapper, textarea);
      wrapper.appendChild(textarea);

      textarea.setAttribute('rows', 1);
      textarea.style.overflow = 'hidden';
      textarea.style.resize = 'none';

      // Auto-resize on input
      const resizeTextarea = () => {
        wrapper.style.height = textarea.scrollHeight + 'px';
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      };

      textarea.addEventListener('input', resizeTextarea);
      textarea.addEventListener('focus', resizeTextarea);
      textarea.addEventListener('blur', resizeTextarea);

      // Handle Enter + Ctrl for new line
      textarea.addEventListener('keydown', (event) => {
        if (event.keyCode === 13 && event.ctrlKey) {
          event.preventDefault();
          event.stopPropagation();
          textarea.blur();
        }
      });

      // Handle Tab key
      textarea.addEventListener('keyup', (event) => {
        if (event.keyCode === 9) {
          textarea.select();
        }
      });

      // Initial resize
      resizeTextarea();
    });
  }

  setupFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });

      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach((input) => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });

        input.addEventListener('input', () => {
          this.clearFieldError(input);
        });
      });
    });
  }

  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll(
      'input[required], textarea[required], select[required]'
    );

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');

    // Clear previous errors
    this.clearFieldError(field);

    // Check if required field is empty
    if (isRequired && !value) {
      this.showFieldError(field, 'Това поле е задължително');
      return false;
    }

    // Field-specific validation
    if (value) {
      switch (field.type) {
        case 'email':
          if (!this.isValidEmail(value)) {
            this.showFieldError(field, 'Моля въведете валиден имейл адрес');
            return false;
          }
          break;

        case 'tel':
          if (!this.isValidPhone(value)) {
            this.showFieldError(field, 'Моля въведете валиден телефонен номер');
            return false;
          }
          break;

        case 'url':
          if (!this.isValidUrl(value)) {
            this.showFieldError(field, 'Моля въведете валиден URL адрес');
            return false;
          }
          break;
      }
    }

    // Mark as valid
    field.classList.add('is-valid');
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone);
  }

  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');

    field.parentNode.appendChild(errorDiv);
  }

  clearFieldError(field) {
    field.classList.remove('is-invalid', 'is-valid');
    field.removeAttribute('aria-invalid');

    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FormsComponent;
}
