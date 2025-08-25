// Booking Page JavaScript
class BookingManager {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 3;
    this.bookingData = {};
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadStoredData();
    this.updateProgressBar();
    this.setMinDates();
  }

  setupEventListeners() {
    // Date change listeners
    document
      .getElementById('pickup-date')
      ?.addEventListener('change', (e) => this.handlePickupDateChange(e));
    document
      .getElementById('return-date')
      ?.addEventListener('change', (e) => this.handleReturnDateChange(e));

    // Car class change listener
    document
      .getElementById('car-class')
      ?.addEventListener('change', (e) => this.handleCarClassChange(e));

    // Form validation listeners
    this.setupFormValidation();
  }

  setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    const pickupDate = document.getElementById('pickup-date');
    const returnDate = document.getElementById('return-date');

    if (pickupDate) pickupDate.min = today;
    if (returnDate) returnDate.min = today;
  }

  handlePickupDateChange(event) {
    const pickupDate = new Date(event.target.value);
    const returnDate = document.getElementById('return-date');

    // Set minimum return date to 5 days after pickup
    const minReturnDate = new Date(pickupDate);
    minReturnDate.setDate(pickupDate.getDate() + 5);

    returnDate.min = minReturnDate.toISOString().split('T')[0];

    // Clear return date if it's now invalid
    if (returnDate.value && new Date(returnDate.value) <= pickupDate) {
      returnDate.value = '';
    }

    this.calculatePrice();
    this.saveFormData();
  }

  handleReturnDateChange(event) {
    this.calculatePrice();
    this.saveFormData();
  }

  handleCarClassChange(event) {
    this.calculatePrice();
    this.saveFormData();
  }

  calculatePrice() {
    const pickupDate = document.getElementById('pickup-date')?.value;
    const returnDate = document.getElementById('return-date')?.value;
    const carClass = document.getElementById('car-class')?.value;

    if (!pickupDate || !returnDate || !carClass) {
      this.updatePriceDisplay(0, 0);
      return;
    }

    // Calculate rental days
    const pickup = new Date(pickupDate);
    const returnDateVal = new Date(returnDate);
    const diffTime = returnDateVal - pickup;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days < 5) {
      this.updatePriceDisplay(0, 0);
      return;
    }

    // Calculate rental price
    const prices = {
      Икономичен: 30,
      Стандартен: 50,
      Луксозен: 80,
    };

    const pricePerDay = prices[carClass] || 0;
    const rentalPrice = days * pricePerDay;

    this.updatePriceDisplay(rentalPrice, rentalPrice);
    this.saveFormData();
  }

  updatePriceDisplay(rentalPrice, totalPrice) {
    const rentalPriceEl = document.getElementById('rental-price');
    const totalPriceEl = document.getElementById('total-price');

    if (rentalPriceEl)
      rentalPriceEl.textContent = `${rentalPrice.toFixed(2)} лв`;
    if (totalPriceEl) totalPriceEl.textContent = `${totalPrice.toFixed(2)} лв`;
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      if (this.validateCurrentStep()) {
        this.currentStep++;
        this.showCurrentStep();
        this.updateProgressBar();
        this.saveFormData();
      }
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showCurrentStep();
      this.updateProgressBar();
    }
  }

  showCurrentStep() {
    // Hide all steps
    for (let i = 1; i <= this.totalSteps; i++) {
      const step = document.getElementById(`step-${i}`);
      if (step) step.classList.remove('active');
    }

    // Show current step
    const currentStepEl = document.getElementById(`step-${this.currentStep}`);
    if (currentStepEl) currentStepEl.classList.add('active');

    // Update final summary if on payment step
    if (this.currentStep === 3) {
      this.updateFinalSummary();
    }
  }

  updateProgressBar() {
    // Update progress steps
    for (let i = 1; i <= this.totalSteps; i++) {
      const step = document.querySelector(`[data-step="${i}"]`);
      if (step) {
        step.classList.remove('active', 'completed');
        if (i < this.currentStep) {
          step.classList.add('completed');
        } else if (i === this.currentStep) {
          step.classList.add('active');
        }
      }
    }
  }

  validateCurrentStep() {
    const currentStepEl = document.getElementById(`step-${this.currentStep}`);
    if (!currentStepEl) return false;

    const form = currentStepEl.querySelector('form');
    if (!form) return true; // No form to validate

    // Basic HTML5 validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }

    // Custom validation for step 1
    if (this.currentStep === 1) {
      return this.validateReservationStep();
    }

    // Custom validation for step 2
    if (this.currentStep === 2) {
      return this.validatePersonalStep();
    }

    return true;
  }

  validateReservationStep() {
    const pickupDate = document.getElementById('pickup-date')?.value;
    const returnDate = document.getElementById('return-date')?.value;
    const carClass = document.getElementById('car-class')?.value;

    if (!pickupDate || !returnDate || !carClass) {
      alert('Моля попълнете всички задължителни полета.');
      return false;
    }

    const pickup = new Date(pickupDate);
    const returnDateVal = new Date(returnDate);
    const diffTime = returnDateVal - pickup;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days < 5) {
      alert('Минималният период за наем е 5 дни.');
      return false;
    }

    if (days < 0) {
      alert('Датата на връщане трябва да е след датата на вземане.');
      return false;
    }

    return true;
  }

  validatePersonalStep() {
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'idNumber',
      'drivingLicense',
      'licenseIssueDate',
      'licenseExpiryDate',
    ];

    for (const field of requiredFields) {
      const element = document.getElementById(field);
      if (!element || !element.value.trim()) {
        alert(`Моля попълнете полето "${element?.placeholder || field}".`);
        return false;
      }
    }

    // Validate email format
    const email = document.getElementById('email')?.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Моля въведете валиден имейл адрес.');
      return false;
    }

    // Validate phone format
    const phone = document.getElementById('phone')?.value;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    if (!phoneRegex.test(phone)) {
      alert('Моля въведете валиден телефонен номер.');
      return false;
    }

    // Validate EGN/LNCH format
    const idNumber = document.getElementById('idNumber')?.value;
    if (idNumber.length !== 10) {
      alert('ЕГН/ЛНЧ трябва да е 10 символа.');
      return false;
    }

    return true;
  }

  updateFinalSummary() {
    const summaryEl = document.getElementById('final-summary');
    if (!summaryEl) return;

    const pickupDate = document.getElementById('pickup-date')?.value;
    const returnDate = document.getElementById('return-date')?.value;
    const carClass = document.getElementById('car-class')?.value;
    const pickupTime = document.getElementById('pickup-time')?.value;
    const returnTime = document.getElementById('return-time')?.value;
    const pickupLocation = document.getElementById('pickup-location')?.value;
    const returnLocation = document.getElementById('return-location')?.value;
    const firstName = document.getElementById('firstName')?.value;
    const lastName = document.getElementById('lastName')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;

    const summary = `
            <div class="summary-item">
                <strong>Период:</strong> ${pickupDate} ${pickupTime} - ${returnDate} ${returnTime}
            </div>
            <div class="summary-item">
                <strong>Автомобил:</strong> ${carClass}
            </div>
            <div class="summary-item">
                <strong>Вземане:</strong> ${pickupLocation}
            </div>
            <div class="summary-item">
                <strong>Връщане:</strong> ${returnLocation}
            </div>
            <div class="summary-item">
                <strong>Клиент:</strong> ${firstName} ${lastName}
            </div>
            <div class="summary-item">
                <strong>Контакт:</strong> ${email} / ${phone}
            </div>
        `;

    summaryEl.innerHTML = summary;
  }

  saveFormData() {
    // Collect all form data
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
      const formData = new FormData(form);
      for (const [key, value] of formData.entries()) {
        this.bookingData[key] = value;
      }
    });

    // Save to session storage
    sessionStorage.setItem('bookingData', JSON.stringify(this.bookingData));
    console.log('Booking data saved:', this.bookingData);
  }

  loadStoredData() {
    const stored = sessionStorage.getItem('bookingData');
    if (stored) {
      try {
        this.bookingData = JSON.parse(stored);
        this.populateForms();
      } catch (e) {
        console.error('Error loading stored data:', e);
      }
    }
  }

  populateForms() {
    // Populate form fields with stored data
    Object.entries(this.bookingData).forEach(([key, value]) => {
      const element = document.getElementById(key);
      if (element) {
        if (element.type === 'select-multiple') {
          // Handle multiple select
          const values = Array.isArray(value) ? value : [value];
          Array.from(element.options).forEach((option) => {
            option.selected = values.includes(option.value);
          });
        } else {
          element.value = value;
        }
      }
    });

    // Recalculate price if we have the necessary data
    if (
      this.bookingData.pickupDate &&
      this.bookingData.returnDate &&
      this.bookingData.carClass
    ) {
      this.calculatePrice();
    }
  }

  setupFormValidation() {
    // Real-time validation for important fields
    const importantFields = [
      'pickup-date',
      'return-date',
      'car-class',
      'firstName',
      'lastName',
      'email',
      'phone',
    ];

    importantFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('blur', () => {
          this.validateField(field);
        });
      }
    });
  }

  validateField(field) {
    const value = field.value.trim();

    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');

    if (!value) {
      field.classList.add('is-invalid');
      return false;
    }

    // Field-specific validation
    let isValid = true;

    if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    } else if (field.type === 'tel') {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
      isValid = phoneRegex.test(value);
    }

    if (isValid) {
      field.classList.add('is-valid');
    } else {
      field.classList.add('is-invalid');
    }

    return isValid;
  }

  async processPayment() {
    try {
      // Validate all data before payment
      if (!this.validateCurrentStep()) {
        return;
      }

      // Show loading state
      const payButton = document.querySelector(
        'button[onclick="processPayment()"]'
      );
      const originalText = payButton.innerHTML;
      payButton.innerHTML =
        '<i class="bx bx-loader-alt bx-spin"></i> Обработване...';
      payButton.disabled = true;

      // Collect all form data
      this.saveFormData();

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Integrate with Borica payment gateway
      // For now, show success message
      this.showPaymentSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      alert(
        'Възникна грешка при обработката на плащането. Моля опитайте отново.'
      );
    } finally {
      // Restore button state
      const payButton = document.querySelector(
        'button[onclick="processPayment()"]'
      );
      payButton.innerHTML = originalText;
      payButton.disabled = false;
    }
  }

  showPaymentSuccess() {
    // Create success modal
    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.style.display = 'block';
    modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Резервацията е успешна!</h5>
                        <button type="button" class="btn-close" onclick="this.closest('.modal').remove()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center">
                            <i class="bx bx-check-circle text-success" style="font-size: 4rem;"></i>
                            <h4 class="mt-3">Благодарим за резервацията!</h4>
                            <p>Ще получите потвърждение на имейл адреса си.</p>
                            <p>Нашият екип ще се свърже с вас за потвърждение.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="window.location.href='index.html'">
                            Към началната страница
                        </button>
                    </div>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Add backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    document.body.appendChild(backdrop);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      modal.remove();
      backdrop.remove();
    }, 5000);
  }
}

// Initialize booking manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  window.bookingManager = new BookingManager();
});

// Global functions for onclick handlers
function nextStep() {
  window.bookingManager?.nextStep();
}

function prevStep() {
  window.bookingManager?.prevStep();
}

function processPayment() {
  window.bookingManager?.processPayment();
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BookingManager;
}
