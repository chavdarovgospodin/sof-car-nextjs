// Footer Component
class FooterComponent {
  constructor() {
    this.companyModal = document.getElementById('companyModal');
    this.init();
  }

  init() {
    this.setupCompanyModal();
    this.setupContactForm();
  }

  setupCompanyModal() {
    if (!this.companyModal) return;

    // Open company modal
    window.openCompanyModal = () => {
      this.companyModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    };

    // Close company modal
    window.closeCompanyModal = () => {
      this.companyModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    };

    // Close modal when clicking outside
    this.companyModal.addEventListener('click', (e) => {
      if (e.target === this.companyModal) {
        window.closeCompanyModal();
      }
    });
  }

  setupContactForm() {
    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleContactFormSubmit();
    });
  }

  handleContactFormSubmit() {
    // This will be handled by the main index.js file
    // Just a placeholder for future functionality
    console.log('Contact form submitted');
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FooterComponent;
}
