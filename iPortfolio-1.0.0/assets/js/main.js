/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


  /**
   * EmailJS Contact Form Handler
   */
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_oempzcp',
    TEMPLATE_ID: 'template_vdizidu',
    PUBLIC_KEY: 'CPWJe92cLV1tvX_0K'
  };

  // Ensure EmailJS SDK is initialized
  if (typeof emailjs !== 'undefined') {
    try {
      emailjs.init({
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY
      });
    } catch (err) {
      console.error('EmailJS initialization failed:', err);
    }
  }

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const nameInput = document.querySelector('#contact-name');
    const emailInput = document.querySelector('#contact-email');
    const subjectInput = document.querySelector('#contact-subject');
    const messageInput = document.querySelector('#contact-message');
    const feedback = document.querySelector('#form-feedback');
    const submitBtn = contactForm.querySelector('button[type="submit"]') || document.querySelector('#contact-submit-btn');

    let isSubmitting = false;

    // Display feedback message
    function showFeedback(type, htmlContent) {
      if (!feedback) return;
      feedback.className = `form-feedback alert alert-${type} d-block`;
      feedback.innerHTML = htmlContent;
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Clear feedback message
    function clearFeedback() {
      if (!feedback) return;
      feedback.className = 'form-feedback d-none';
      feedback.innerHTML = '';
    }

    // Set validation status on individual field
    function setFieldValidity(input, isValid, errorMsg) {
      if (!input) return;
      const parent = input.parentElement;
      const feedbackDiv = parent ? parent.querySelector('.invalid-feedback') : null;
      if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        if (feedbackDiv && errorMsg) {
          feedbackDiv.textContent = errorMsg;
        }
      }
    }

    // Clear validation state on user input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (!input) return;
      input.addEventListener('input', function() {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Prevent multiple submissions while processing
      if (isSubmitting) {
        return;
      }

      clearFeedback();

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      let isValid = true;

      // 1. Validate Full Name (not empty, min 2 characters)
      if (!name || name.length < 2) {
        setFieldValidity(nameInput, false, 'Please enter your full name (at least 2 characters).');
        isValid = false;
      } else {
        setFieldValidity(nameInput, true);
      }

      // 2. Validate Email Address (proper format)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        setFieldValidity(emailInput, false, 'Please enter a valid email address.');
        isValid = false;
      } else {
        setFieldValidity(emailInput, true);
      }

      // 3. Validate Subject (not empty, min 3 characters)
      if (!subject || subject.length < 3) {
        setFieldValidity(subjectInput, false, 'Please enter a subject (at least 3 characters).');
        isValid = false;
      } else {
        setFieldValidity(subjectInput, true);
      }

      // 4. Validate Message (not empty, min 5 characters)
      if (!message || message.length < 5) {
        setFieldValidity(messageInput, false, 'Please enter your message (at least 5 characters).');
        isValid = false;
      } else {
        setFieldValidity(messageInput, true);
      }

      if (!isValid) {
        showFeedback('danger', '<i class="bi bi-exclamation-triangle-fill me-2"></i>Please fill in all required fields correctly.');
        return;
      }

      // Verify EmailJS SDK availability
      if (typeof emailjs === 'undefined') {
        showFeedback('danger', '<i class="bi bi-exclamation-triangle-fill me-2"></i>Unable to send your message. Please try again.');
        console.error('EmailJS SDK is not loaded. Check script tag or network connectivity.');
        return;
      }

      // Begin submission state & show loading indicator
      isSubmitting = true;
      if (submitBtn) {
        submitBtn.disabled = true;
      }
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '<i class="bi bi-send-fill me-2"></i>Send Message';
      if (submitBtn) {
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
      }

      // Disable inputs while sending to prevent changes
      [nameInput, emailInput, subjectInput, messageInput].forEach(el => {
        if (el) el.disabled = true;
      });

      // Display loading feedback
      showFeedback('info', '<div class="d-flex align-items-center"><span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span><span>Sending your message, please wait...</span></div>');

      // Sync hidden form fields for template variable compatibility
      const hiddenFromName = document.querySelector('#contact-from-name');
      const hiddenFromEmail = document.querySelector('#contact-from-email');
      const hiddenReplyTo = document.querySelector('#contact-reply-to');
      if (hiddenFromName) hiddenFromName.value = name;
      if (hiddenFromEmail) hiddenFromEmail.value = email;
      if (hiddenReplyTo) hiddenReplyTo.value = email;

      // Construct template parameters matching all common EmailJS configurations
      const templateParams = {
        name: name,
        from_name: name,
        user_name: name,
        email: email,
        from_email: email,
        user_email: email,
        reply_to: email,
        subject: subject,
        message: message,
        to_name: 'Ande Deepthi'
      };

      // Send message via official EmailJS SDK
      emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )
      .then(function(response) {
        console.log('EmailJS Success:', response.status, response.text);
        // Requirement 8: "Your message has been sent successfully!"
        showFeedback('success', '<i class="bi bi-check-circle-fill me-2"></i>Your message has been sent successfully!');
        
        // Requirement 10: Clear the form after successful submission
        contactForm.reset();
        [nameInput, emailInput, subjectInput, messageInput].forEach(el => {
          if (el) {
            el.classList.remove('is-valid');
            el.classList.remove('is-invalid');
          }
        });
      })
      .catch(function(error) {
        console.error('EmailJS Error:', error);
        // Requirement 9: "Unable to send your message. Please try again."
        showFeedback('danger', '<i class="bi bi-exclamation-triangle-fill me-2"></i>Unable to send your message. Please try again.');
      })
      .finally(function() {
        // Re-enable form and button
        isSubmitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
        [nameInput, emailInput, subjectInput, messageInput].forEach(el => {
          if (el) el.disabled = false;
        });
      });
    });
  }

})();