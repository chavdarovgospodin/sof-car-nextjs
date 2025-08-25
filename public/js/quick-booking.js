function initQuickBooking() {
  const form = document.getElementById('quick-booking-form');
  const pickupDate = document.getElementById('pickup-date');
  const returnDate = document.getElementById('return-date');
  const carClass = document.getElementById('car-class');
  const priceResult = document.getElementById('price-result');
  const bookingErrors = document.getElementById('booking-errors');
  const continueBtn = document.getElementById('continue-booking');

  if (!form) return;

  const today = new Date().toISOString().split('T')[0];
  pickupDate.min = today;
  returnDate.min = today;

  pickupDate.addEventListener('change', function () {
    const pickup = new Date(this.value);
    pickup.setDate(pickup.getDate() + 5);
    returnDate.min = pickup.toISOString().split('T')[0];

    if (
      returnDate.value &&
      new Date(returnDate.value) <= new Date(this.value)
    ) {
      returnDate.value = '';
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    priceResult.style.display = 'none';
    bookingErrors.style.display = 'none';

    const errors = validateQuickBookingForm();
    if (errors.length > 0) {
      showQuickBookingErrors(errors);
      return;
    }

    calculateQuickBookingPrice();
  });

  if (continueBtn) {
    continueBtn.addEventListener('click', function () {
      // Пренасочване към пълната booking страница
      const bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
      if (bookingData) {
        // Пренасочване към pages/booking.html
        window.location.href = 'pages/booking.html';
      } else {
        // Ако няма данни, все пак пренасочваме
        window.location.href = 'pages/booking.html';
      }
    });
  }
}

function validateQuickBookingForm() {
  const errors = [];
  const pickupDate = document.getElementById('pickup-date');
  const returnDate = document.getElementById('return-date');
  const carClass = document.getElementById('car-class');

  const pickup = new Date(pickupDate.value);
  const returnDateVal = new Date(returnDate.value);

  if (!pickupDate.value) {
    errors.push('Моля изберете дата за вземане');
  }

  if (!returnDate.value) {
    errors.push('Моля изберете дата за връщане');
  }

  if (!carClass.value) {
    errors.push('Моля изберете клас автомобил');
  }

  if (pickup && returnDateVal) {
    const diffTime = returnDateVal - pickup;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 5) {
      errors.push('Минималният период за наем е 5 дни');
    }

    if (diffDays < 0) {
      errors.push('Датата на връщане трябва да е след датата на вземане');
    }
  }

  return errors;
}

function showQuickBookingErrors(errors) {
  const bookingErrors = document.getElementById('booking-errors');
  if (bookingErrors) {
    bookingErrors.innerHTML = errors
      .map((error) => `<div>• ${error}</div>`)
      .join('');
    bookingErrors.style.display = 'block';
  }
}

function calculateQuickBookingPrice() {
  const pickupDate = document.getElementById('pickup-date');
  const returnDate = document.getElementById('return-date');
  const carClass = document.getElementById('car-class');
  const priceResult = document.getElementById('price-result');

  const pickup = new Date(pickupDate.value);
  const returnDateVal = new Date(returnDate.value);
  const diffTime = returnDateVal - pickup;
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const prices = {
    Икономичен: 30,
    Стандартен: 50,
    Луксозен: 80,
  };

  const pricePerDay = prices[carClass.value];
  const totalPrice = days * pricePerDay;

  const daysCount = document.querySelector('.days-count');
  const totalPriceElement = document.querySelector('.total-price');

  if (daysCount && totalPriceElement) {
    daysCount.textContent = `${days} дни × ${pricePerDay} лв`;
    totalPriceElement.textContent = `${totalPrice} лв общо`;
    priceResult.style.display = 'block';
  }

  const bookingData = {
    pickupDate: pickupDate.value,
    returnDate: returnDate.value,
    carClass: carClass.value,
    days: days,
    pricePerDay: pricePerDay,
    totalPrice: totalPrice,
    timestamp: new Date().toISOString(),
  };

  sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

  console.log('Booking data saved:', bookingData);
}

document.addEventListener('DOMContentLoaded', function () {
  initQuickBooking();
});
