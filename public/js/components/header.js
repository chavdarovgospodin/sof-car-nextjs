// Header Component
class HeaderComponent {
  constructor() {
    this.header = document.getElementById('header');
    this.init();
  }

  init() {
    this.setupScrollEffects();
    this.setupMobileNav();
  }

  setupScrollEffects() {
    if (!this.header) return;

    const headerScrolled = () => {
      if (window.scrollY > 100) {
        this.header.classList.add('header-scrolled');
      } else {
        this.header.classList.remove('header-scrolled');
      }
    };

    window.addEventListener('load', headerScrolled);
    window.addEventListener('scroll', headerScrolled);
  }

  setupMobileNav() {
    // Mobile navigation dropdowns
    $(document).on('click', '.navbar .dropdown > a', function (e) {
      if (
        document.getElementById('navbar')?.classList.contains('navbar-mobile')
      ) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle('dropdown-active');
      }
    });

    // Setup dropdown functionality
    this.setupDropdowns();
  }

  setupDropdowns() {
    // Desktop dropdown hover functionality
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');

      if (toggle && menu) {
        // Desktop hover
        dropdown.addEventListener('mouseenter', () => {
          if (window.innerWidth > 768) {
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
          }
        });

        dropdown.addEventListener('mouseleave', () => {
          if (window.innerWidth > 768) {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-10px)';
          }
        });

        // Mobile click functionality - no toggle needed since it's always open
        toggle.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            // No need to toggle since dropdown is always open on mobile
          }
        });
      }
    });
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeaderComponent;
}
