function sendEmail() {
  const serviceID = 'service_cmvzmcb';
  const templateID = 'template_gg7ylhh';

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const phone = document.getElementById('phone').value.trim();

  // Clear previous error styles
  clearFieldErrors();

  // Validate fields
  let hasErrors = false;

  if (name === '') {
    showFieldError('name', 'Моля въведете Вашето име');
    hasErrors = true;
  }

  if (email === '' || !email.match(regex)) {
    showFieldError('email', 'Моля въведете валиден имейл адрес');
    hasErrors = true;
  }

  if (phone === '') {
    showFieldError('phone', 'Моля въведете телефонен номер');
    hasErrors = true;
  }

  if (message === '') {
    showFieldError('message', 'Моля въведете съобщение');
    hasErrors = true;
  }

  if (hasErrors) {
    return;
  }

  // Show loading state
  const submitBtn = document.querySelector('button[onclick="sendEmail()"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Изпраща се...';
  submitBtn.disabled = true;

  emailjs
    .send(serviceID, templateID, {
      name: name,
      email: email,
      message: message,
      phone: phone,
    })
    .then((res) => {
      // Clear form
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('message').value = '';
      document.getElementById('phone').value = '';

      // Show success message
      showSuccessMessage(
        'Запитването ви беше изпратено успешно! Ще се свържем с Вас скоро.'
      );

      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      showErrorMessage(
        'Възникна грешка при изпращането. Моля опитайте отново или се обадете на 0879994212'
      );

      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  field.classList.add('error');
  field.setAttribute('aria-invalid', 'true');

  // Remove existing error message
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Add error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.setAttribute('role', 'alert');
  field.parentNode.appendChild(errorDiv);
}

function clearFieldErrors() {
  const errorFields = document.querySelectorAll('.error');
  errorFields.forEach((field) => {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
  });

  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((msg) => msg.remove());

  const notifications = document.querySelectorAll('.notification');
  notifications.forEach((notif) => notif.remove());
}

function showSuccessMessage(message) {
  const notification = createNotification(message, 'success');
  document.getElementById('contact-form').appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

function showErrorMessage(message) {
  const notification = createNotification(message, 'error');
  document.getElementById('contact-form').appendChild(notification);

  // Auto remove after 8 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 8000);
}

function createNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'polite');

  const messageSpan = document.createElement('span');
  messageSpan.textContent = message;

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.className = 'close-notification';
  closeBtn.setAttribute('aria-label', 'Затвори съобщението');
  closeBtn.onclick = () => notification.remove();

  notification.appendChild(messageSpan);
  notification.appendChild(closeBtn);

  return notification;
}

// Company Modal Functions

function openCompanyModal() {
  const modal = document.getElementById('companyModal');
  modal.style.display = 'block';

  // Prevent body scrolling when modal is open
  document.body.style.overflow = 'hidden';

  // Add keyboard accessibility
  modal.focus();

  // Add escape key listener
  document.addEventListener('keydown', handleModalKeydown);
}

function closeCompanyModal() {
  const modal = document.getElementById('companyModal');
  modal.style.display = 'none';

  // Restore body scrolling
  document.body.style.overflow = 'auto';

  // Remove escape key listener
  document.removeEventListener('keydown', handleModalKeydown);
}

function handleModalKeydown(event) {
  // Close modal on Escape key
  if (event.key === 'Escape') {
    closeCompanyModal();
  }
}

// Initialize modal functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Ensure modal exists before adding event listeners
  const modal = document.getElementById('companyModal');
  if (modal) {
    // Close modal when clicking outside content area
    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        closeCompanyModal();
      }
    });
  }
});
