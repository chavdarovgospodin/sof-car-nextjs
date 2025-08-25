// Carousel Component
class CarouselComponent {
  constructor() {
    this.carousel = document.getElementById('carouselExampleIndicators');
    this.init();
  }

  init() {
    if (!this.carousel) return;

    this.setupCarousel();
    this.setupAutoPlay();
  }

  setupCarousel() {
    // Bootstrap carousel is already initialized via data attributes
    // This is just for additional custom functionality if needed

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.previousSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    });

    // Add touch/swipe support for mobile
    this.setupTouchSupport();
  }

  setupTouchSupport() {
    let startX = 0;
    let endX = 0;

    this.carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    this.carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });
  }

  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    }
  }

  previousSlide() {
    const prevButton = this.carousel.querySelector('.carousel-control-prev');
    if (prevButton) prevButton.click();
  }

  nextSlide() {
    const nextButton = this.carousel.querySelector('.carousel-control-next');
    if (nextButton) nextButton.click();
  }

  setupAutoPlay() {
    // Auto-play carousel every 5 seconds
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CarouselComponent;
}
