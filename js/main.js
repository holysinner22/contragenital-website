// Main initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Navbar collapse functionality for mobile
  initMobileNavbar();
  
  // Counter animation setup
  initCounterAnimation();
  
  // Initialize other components that don't need to wait for full load
  initProgressBars();
  initBackToTop();
});

// Window load handler for elements that need full page load
window.addEventListener('load', function() {
  // Remove spinner
  removeSpinner();
  
  // Initialize carousel with enhancements
  initCarousel();
  
  // Initialize feature window animations
  initFeatureAnimations();
  
  // Initialize counter-up plugin
  initCounterUp();
});

// ==================== FUNCTION DEFINITIONS ====================

// 1. Mobile Navbar Functionality
function initMobileNavbar() {
  const navbarCollapse = document.getElementById('navbarContent');
  if (!navbarCollapse) return;

  const navItems = document.querySelectorAll('.navbar-nav .nav-link, .navbar .btn');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth <= 991.98 && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });
}

// 2. Spinner Removal
function removeSpinner() {
  const spinner = document.getElementById('spinner');
  if (spinner) {
    spinner.style.opacity = '0';
    setTimeout(() => spinner.remove(), 300);
  }
}

// 3. Carousel Initialization
function initCarousel() {
  const myCarousel = document.querySelector('#carouselId');
  if (!myCarousel) return;

  const carousel = new bootstrap.Carousel(myCarousel, {
    pause: 'hover',
    wrap: true,
    interval: 6000
  });

  // Keyboard navigation
  myCarousel.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      carousel.prev();
    } else if (e.key === 'ArrowRight') {
      carousel.next();
    }
  });
}

// 4. Feature Window Animations
function initFeatureAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-window').forEach(window => {
    window.style.opacity = 0;
    window.style.transform = 'translateY(20px)';
    window.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(window);
  });
}

// 5. Counter Animation
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter-value');
  if (counters.length === 0) return;

  const speed = 200;
  
  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.achievements-counter').forEach(section => {
    observer.observe(section);
  });
}

// 6. Progress Bars
function initProgressBars() {
  if (typeof $.fn.waypoint !== 'undefined') {
    $('.progress').waypoint(function() {
      $('.progress-bar').each(function() {
        $(this).css("width", $(this).attr("aria-valuenow") + '%');
      });
    }, { offset: '80%' });
  }
}

// 7. CounterUp Plugin
function initCounterUp() {
  if (typeof $.fn.counterUp !== 'undefined') {
    $('[data-toggle="counter-up"]').counterUp({
      delay: 5,
      time: 2000
    });
  }
}

// 8. Back to Top Button
function initBackToTop() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  
  $('.back-to-top').click(function() {
    $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
    return false;
  });
}

// jQuery document ready for jQuery-specific code
(function($) {
  "use strict";
  
  // Spinner removal (jQuery version as fallback)
  var spinner = function() {
    setTimeout(function() {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner();
})(jQuery);