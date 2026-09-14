/**
 * Sakshi Yadav - Personal Portfolio Interactive Logic
 * Modern, clean, performant vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive components
  initTypewriter();
  initThemeToggle();
  initMobileMenu();
  initScrollProgress();
  initScrollSpy();
  initBackToTop();
  initContactForm();
  initScrollAnimations();
});

/* ==========================================================================
   1. DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const targetElement = document.getElementById('typingText');
  if (!targetElement) return;

  const phrases = [
    "Aspiring Web Developer",
    "BCA Graduate",
    "Frontend Tech Enthusiast",
    "Software Developer"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      targetElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      targetElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   2. DARK / LIGHT THEME SWITCHER
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  // Read stored preference or default to dark
  const savedTheme = localStorage.getItem('sakshi_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('sakshi_portfolio_theme', newTheme);
  });
}

/* ==========================================================================
   3. MOBILE HAMBURGER MENU
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile nav when clicking any nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   4. SCROLL READING PROGRESS INDICATOR
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;

    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }

    // Toggle sticky navbar scrolled state
    if (navbar) {
      if (windowScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
}

/* ==========================================================================
   5. SCROLL SPY ACTIVE LINK HIGHLIGHTER
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
}

/* ==========================================================================
   6. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   7. CONTACT FORM SUBMISSION & VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusMsg = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showStatus('Please complete all form fields.', 'error');
      return;
    }

    // Simulate sending form state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

    setTimeout(() => {
      showStatus(`Thank you, ${name}! Your message has been sent successfully. Sakshi will get back to you soon.`, 'success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }, 1200);
  });

  function showStatus(text, type) {
    if (!statusMsg) return;
    statusMsg.textContent = text;
    statusMsg.className = `form-status-message ${type}`;

    setTimeout(() => {
      statusMsg.className = 'form-status-message';
    }, 6000);
  }
}

/* ==========================================================================
   8. SCROLL FADE-IN ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');

        // Trigger progress bar animations inside skills section when visible
        if (entry.target.classList.contains('skill-category-card')) {
          const fills = entry.target.querySelectorAll('.progress-fill');
          fills.forEach(fill => {
            const targetWidth = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
              fill.style.width = targetWidth;
            }, 100);
          });
        }

        observerInstance.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animTargets = document.querySelectorAll('.glass-card, .quality-card, .section-header');
  animTargets.forEach(target => {
    observer.observe(target);
  });
}
