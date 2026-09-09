/* ============================================
   BEAMS & BRACES — MAIN SCRIPT
   ============================================ */

'use strict';

/* --------------------------------------------
   1. NAV: SCROLL STATE + BURGER + DROPDOWNS
   -------------------------------------------- */
(function () {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const mobile = document.getElementById('navMobile');

  if (!nav || !burger || !mobile) return;

  // Scroll: add/remove scrolled class
  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // Burger: toggle mobile overlay
  burger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('nav--open');
    burger.setAttribute('aria-expanded', String(isOpen));
    mobile.setAttribute('aria-hidden', String(!isOpen));
    // Prevent body scroll when menu open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on backdrop click
  mobile.addEventListener('click', function (e) {
    if (e.target === mobile) {
      nav.classList.remove('nav--open');
      burger.setAttribute('aria-expanded', 'false');
      mobile.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  // Close button inside mobile overlay
  var closeBtn = document.getElementById('navClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      nav.classList.remove('nav--open');
      burger.setAttribute('aria-expanded', 'false');
      mobile.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }

  // Close mobile menu on link click
  mobile.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('nav--open');
      burger.setAttribute('aria-expanded', 'false');
      mobile.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Dropdown: hover with 200ms close delay so mouse can reach menu items
  nav.querySelectorAll('.nav__dropdown').forEach(function (dropdown) {
    var closeTimer;
    dropdown.addEventListener('mouseenter', function () {
      clearTimeout(closeTimer);
      // Close any other open dropdowns
      nav.querySelectorAll('.nav__dropdown').forEach(function (other) {
        if (other !== dropdown) other.classList.remove('nav__dropdown--open');
      });
      dropdown.classList.add('nav__dropdown--open');
    });
    dropdown.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(function () {
        dropdown.classList.remove('nav__dropdown--open');
      }, 200);
    });
  });

  // Dropdown: keyboard accessibility (click to toggle)
  nav.querySelectorAll('.nav__dropdown-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var dropdown = trigger.closest('.nav__dropdown');
      var isOpen = dropdown && dropdown.classList.contains('nav__dropdown--open');
      // Close all
      nav.querySelectorAll('.nav__dropdown').forEach(function (d) {
        d.classList.remove('nav__dropdown--open');
      });
      // Toggle clicked
      if (dropdown && !isOpen) dropdown.classList.add('nav__dropdown--open');
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav__dropdown')) {
      nav.querySelectorAll('.nav__dropdown').forEach(function (d) {
        d.classList.remove('nav__dropdown--open');
      });
    }
  });

  // ESC key closes mobile menu and dropdowns
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      nav.classList.remove('nav--open');
      burger.setAttribute('aria-expanded', 'false');
      mobile.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      nav.querySelectorAll('.nav__dropdown').forEach(function (d) {
        d.classList.remove('nav__dropdown--open');
      });
    }
  });
}());


/* --------------------------------------------
   2. HERO PARALLAX (desktop only)
   -------------------------------------------- */
(function () {
  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return;

  // Only on desktop (skip on mobile for performance)
  var mq = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');

  function onScroll() {
    if (!mq.matches) {
      heroBg.style.transform = '';
      return;
    }
    var scrolled = window.scrollY;
    var rate = scrolled * 0.35;
    heroBg.style.transform = 'translateY(' + rate + 'px) scale(1.1)';
  }

  if (mq.matches) {
    heroBg.style.transform = 'translateY(0px) scale(1.1)';
    window.addEventListener('scroll', onScroll, { passive: true });
  }
}());


/* --------------------------------------------
   3. SCROLL REVEAL (IntersectionObserver)
   -------------------------------------------- */
(function () {
  // Respect reduced motion preference
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    // Just make everything visible immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('revealed');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}());


/* --------------------------------------------
   4. TESTIMONIALS CAROUSEL
   -------------------------------------------- */
(function () {
  var track    = document.getElementById('testimonialsTrack');
  var prevBtn  = document.getElementById('testimonialPrev');
  var nextBtn  = document.getElementById('testimonialNext');

  if (!track || !prevBtn || !nextBtn) return;

  var cards         = Array.from(track.children);
  var currentIndex  = 0;
  var cardsPerView  = getCardsPerView();
  var maxIndex      = Math.max(0, cards.length - cardsPerView);

  function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640)  return 2;
    return 1;
  }

  function getCardWidth() {
    if (cards.length === 0) return 0;
    var card  = cards[0];
    var style = window.getComputedStyle(track);
    var gap   = parseInt(style.gap || style.columnGap || '24', 10);
    return card.offsetWidth + gap;
  }

  function goTo(index) {
    cardsPerView = getCardsPerView();
    maxIndex     = Math.max(0, cards.length - cardsPerView);
    currentIndex = Math.min(Math.max(index, 0), maxIndex);
    var offset   = currentIndex * getCardWidth();
    track.style.transform = 'translateX(-' + offset + 'px)';
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;
    prevBtn.style.opacity = currentIndex === 0     ? '0.4' : '1';
    nextBtn.style.opacity = currentIndex === maxIndex ? '0.4' : '1';
  }

  prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
  nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });

  // Touch / drag support
  var startX   = 0;
  var isDragging = false;

  track.addEventListener('touchstart', function (e) {
    startX     = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    if (!isDragging) return;
    isDragging  = false;
    var delta   = startX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 60) {
      goTo(delta > 0 ? currentIndex + 1 : currentIndex - 1);
    }
  }, { passive: true });

  // Recalculate on resize
  window.addEventListener('resize', function () {
    goTo(0); // reset on resize
  });

  // Initialise
  goTo(0);
}());


/* --------------------------------------------
   5. SMOOTH SCROLL FOR ANCHOR LINKS
   -------------------------------------------- */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var navHeight = document.getElementById('nav')
        ? document.getElementById('nav').offsetHeight
        : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 24;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}());


/* --------------------------------------------
   6. FAQ ACCORDION
   -------------------------------------------- */
(function () {
  var items = document.querySelectorAll('.svc-faq__item');
  if (!items.length) return;

  items.forEach(function (item) {
    var trigger = item.querySelector('.svc-faq__trigger');
    var answer  = item.querySelector('.svc-faq__answer');
    var inner   = item.querySelector('.svc-faq__answer-inner');
    if (!trigger || !answer || !inner) return;

    // Set initial ARIA state
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('svc-faq__item--open');

      // Close all items (one-open-at-a-time, inspired by 21st.dev accordion pattern)
      items.forEach(function (other) {
        var otherAnswer  = other.querySelector('.svc-faq__answer');
        var otherTrigger = other.querySelector('.svc-faq__trigger');
        other.classList.remove('svc-faq__item--open');
        if (otherAnswer)  otherAnswer.style.maxHeight  = '0';
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add('svc-faq__item--open');
        answer.style.maxHeight = inner.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}());


/* --------------------------------------------
   7. SPEED DIAL FAB
   -------------------------------------------- */
(function () {
  function initFAB() {
    var trigger  = document.getElementById('floatTrigger');
    var actions  = document.getElementById('floatActions');
    var backdrop = document.getElementById('floatBackdrop');
    if (!trigger || !actions || !backdrop) return;

    function open() {
      actions.classList.add('float-actions--open');
      backdrop.classList.add('float-backdrop--visible');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function close() {
      actions.classList.remove('float-actions--open');
      backdrop.classList.remove('float-backdrop--visible');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', function () {
      actions.classList.contains('float-actions--open') ? close() : open();
    });

    backdrop.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  // FAB HTML is injected after this script tag, so wait for full DOM parse
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAB);
  } else {
    initFAB();
  }
}());


/* --------------------------------------------
   8. MOTION ENHANCEMENTS  (progressive — fails gracefully)
   To enable count-up stats: add data-count="95" data-suffix="%" to any element.
   -------------------------------------------- */
(async function () {
  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var motionLib;
  try {
    motionLib = await import('https://cdn.jsdelivr.net/npm/motion@latest/dist/motion.js');
  } catch (e) { return; } // CDN unavailable — site works fine without it

  var animate = motionLib.animate;
  var stagger = motionLib.stagger;
  var inView  = motionLib.inView;

  /* ── Buttons: spring scale on hover / press ───────────────────── */
  document.querySelectorAll('.btn').forEach(function (btn) {
    if (btn.id === 'navBurger') return;
    btn.addEventListener('mouseenter', function () {
      animate(btn, { scale: 1.045 }, { duration: 0.15, ease: 'easeOut' });
    });
    btn.addEventListener('mouseleave', function () {
      animate(btn, { scale: 1 }, { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] });
    });
    btn.addEventListener('mousedown', function () {
      animate(btn, { scale: 0.955 }, { duration: 0.08 });
    });
    btn.addEventListener('mouseup', function () {
      animate(btn, { scale: 1 }, { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] });
    });
  });

  /* ── Gallery strip: scale on hover ───────────────────────────── */
  document.querySelectorAll('.svc-gallery__item').forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      animate(item, { scale: 1.04 }, { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] });
    });
    item.addEventListener('mouseleave', function () {
      animate(item, { scale: 1 }, { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] });
    });
  });

  /* ── Related cards: lift + subtle scale on hover ─────────────── */
  document.querySelectorAll('.related-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      animate(card, { y: -7, scale: 1.02 }, { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] });
    });
    card.addEventListener('mouseleave', function () {
      animate(card, { y: 0, scale: 1 }, { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] });
    });
  });

  /* ── Testimonial cards: lift on hover ───────────────────────── */
  document.querySelectorAll('.testimonial-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      animate(card, { y: -8 }, { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] });
    });
    card.addEventListener('mouseleave', function () {
      animate(card, { y: 0 }, { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] });
    });
  });

  /* ── Nav links: subtle upward nudge on hover ────────────────── */
  document.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('mouseenter', function () {
      animate(link, { y: -1 }, { duration: 0.18, ease: 'easeOut' });
    });
    link.addEventListener('mouseleave', function () {
      animate(link, { y: 0 }, { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] });
    });
  });

  /* ── Count-up animation (opt-in via data attributes) ─────────────
     Usage: <p data-count="95" data-suffix="%" data-prefix="">95%</p>
     Inspired by 21st.dev AnimatedNumber_004 — vanilla JS adaptation.
     Add data-count to any stat element to enable the count-up on scroll.
  ──────────────────────────────────────────────────────────────── */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target    = parseFloat(el.getAttribute('data-count') || '0');
    var prefix    = el.getAttribute('data-prefix')  || '';
    var suffix    = el.getAttribute('data-suffix')  || '';
    var decimal   = parseInt(el.getAttribute('data-decimal') || '0', 10);
    var triggered = false;

    inView(el, function () {
      if (triggered) return;
      triggered = true;
      animate(0, target, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: function (v) {
          el.textContent = prefix + v.toFixed(decimal) + suffix;
        }
      });
    }, { amount: 0.8 });
  });

}());
