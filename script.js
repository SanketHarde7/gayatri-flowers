/* ============================================
   GAYATRI FLOWERS — script.js v2
   Flower Modal + All interactions
   ============================================ */

'use strict';

/* ─── REDUCED MOTION ─── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── FLOWER DATA ─── */
const FLOWER_DATA = {
  marigold: {
    name: 'Marigold',
    nameHi: 'झेंडू/ गेंदा',
    tag: 'Bulk Available',
    availability: 'In Stock',
    availClass: 'avail-green',
    img: 'assets/marigold.webp',
    minOrder: '10 kg',
    season: 'Year-round (peak Oct – Feb)',
    freshness: 'Harvested same morning, dispatched within 2 hrs of cutting',
    desc: "Maharashtra's most-demanded festival flower. Harvested before sunrise for maximum vase life. Supplied fresh to temples, mandaps, and Blinkit daily.",
    varieties: ['Deep Orange', 'Butter Yellow', 'Mixed Garland Grade', 'Loose Bulk'],
    bestFor: ['Mandap Decoration', 'Temple Supply', 'Blinkit', 'Garland Making', 'Festival Events'],
    whatsappMsg: 'Hello, I want to enquire about Zendu Marigold (bulk availability and order details).'
  },
  rose: {
    name: 'Premium Rose',
    nameHi: 'गुलाब',
    tag: 'Premium Grade',
    availability: 'In Stock',
    availClass: 'avail-green',
    img: 'assets/rose.webp',
    minOrder: '10 kg',
    season: 'Year-round (peak Nov – Mar)',
    freshness: 'Harvested before sunrise, cold-stored until dispatch',
    desc: 'Dense-petalled roses with natural fragrance, grown without aggressive pesticides. Popular with wedding planners and mandap decorators across Maharashtra.',
    varieties: ['Deep Red', 'Blush Pink', 'Cream White', 'Mixed Grade'],
    bestFor: ['Wedding Decoration', 'Garland Making', 'Premium Decor', 'Puja'],
    whatsappMsg: 'Hello, I want to enquire about Premium Gulab Rose (bulk availability and order details).'
  },
  shevanti: {
    name: 'Chrysanthemum',
    nameHi: 'शेवंती / गुलदाउदी',
    tag: 'Seasonal',
    availability: 'Seasonal',
    availClass: 'avail-amber',
    img: 'assets/shevanti.webp',
    minOrder: '10 kg',
    season: 'Sep – Feb (peak Oct – Nov)',
    freshness: 'Freshest lot harvested every morning at 5 AM',
    desc: 'White and yellow chrysanthemum with long-lasting freshness. A festival staple during Diwali and Navratri. Available in bulk for decoration and garlands.',
    varieties: ['Pure White', 'Bright Yellow', 'Mixed Grade'],
    bestFor: ['Diwali Decoration', 'Navratri Garlands', 'Mandap', 'Religious Ceremonies'],
    whatsappMsg: 'Hello, I want to enquire about Shevanti Chrysanthemum (seasonal availability and order details).'
  },
  mogra: {
    name: 'Arabian Jasmine',
    nameHi: 'मोगरा / मल्लिका',
    tag: 'High Value',
    availability: 'Seasonal',
    availClass: 'avail-amber',
    img: 'assets/mogra.webp',
    minOrder: '2 kg',
    season: 'Mar – Aug (peak May – Jul)',
    freshness: 'Hand-picked in early morning, dispatched same day',
    desc: 'Premium jasmine known for its intense fragrance. Used in garlands, hair flowers, and religious offerings. High demand during summer and wedding season.',
    varieties: ['Double Petal', 'Single Petal', 'Garland Grade'],
    bestFor: ['Bridal Garlands', 'Hair Flowers', 'Pooja', 'Attar Production'],
    whatsappMsg: 'Hello, I want to enquire about Mogra Jasmine (today\'s availability and order details).'
  },
  gaillardia: {
    name: ' Blanket flower',
    nameHi: 'गैलार्डिया / कवठी',
    tag: 'Budget Bulk',
    availability: 'In Stock',
    availClass: 'avail-green',
    img: 'assets/gaillardia.webp',
    minOrder: '20 kg',
    season: 'Year-round',
    freshness: 'Bulk harvested in morning, available for pickup by 7 AM',
    desc: 'Vibrant bi-colored flowers perfect for large-scale decoration at a budget-friendly option. Popular with mandap contractors and roadside decorators across the Nashik–Pune belt.',
    varieties: ['Orange-Red Bicolor', 'Yellow Tipped', 'Deep Red'],
    bestFor: ['Mass Decoration', 'Event Flooring', 'Budget Mandap', 'Veni / Garland'],
    whatsappMsg: 'Hello, I want to enquire about Gaillardia (bulk availability and order details).'
  },
  lotus: {
    name: 'Lotus',
    nameHi: 'कमळ',
    tag: 'Temple Grade',
    availability: 'Limited',
    availClass: 'avail-red',
    img: 'assets/lotus.webp',
    minOrder: '5 dozen',
    season: 'Jun – Nov',
    freshness: 'Harvested fresh from farm ponds each morning',
    desc: 'Sacred lotus grown in natural water bodies near the farm. Supplied fresh for temple offerings, religious ceremonies, and premium event decoration.',
    varieties: ['Pink Lotus', 'White Lotus', 'Bud Grade', 'Open Bloom'],
    bestFor: ['Temple Offerings', 'Navratri', 'Premium Decor', 'Shradh Ceremonies'],
    whatsappMsg: 'Hello, I want to enquire about Lotus (availability and order details).'
  }
};

const WA_NUMBER = '+919325284221';
const CALL_NUMBER = '+919325284221';


/* ─────────────────────────────────────────────
   1. CUSTOM CURSOR
   ─────────────────────────────────────────────*/
(function initCursor() {
  if (prefersReducedMotion || 'ontouchstart' in window) return;

  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function lerpFollower() {
    followerX += (mouseX - followerX) * 0.10;
    followerY += (mouseY - followerY) * 0.10;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(lerpFollower);
  }
  lerpFollower();

  const growTargets = 'a, button, .flower-card, .gallery-item, .primary-btn, .secondary-btn, .secondary-btn-outline, .menu-toggle';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(growTargets)) {
      follower.style.width   = '60px';
      follower.style.height  = '60px';
      follower.style.opacity = '0.5';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(growTargets)) {
      follower.style.width   = '36px';
      follower.style.height  = '36px';
      follower.style.opacity = '1';
    }
  });

  document.documentElement.addEventListener('mouseleave', () => {
    cursor.style.opacity   = '0';
    follower.style.opacity = '0';
  });
  document.documentElement.addEventListener('mouseenter', () => {
    cursor.style.opacity   = '1';
    follower.style.opacity = '1';
  });
})();


/* ─────────────────────────────────────────────
   2. NAVBAR
   ─────────────────────────────────────────────*/
(function initNavbar() {
  const navbar  = document.querySelector('.navbar');
  if (!navbar) return;

  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = [];

  navLinks.forEach(link => {
    const id  = link.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec) sections.push({ link, sec });
  });

  let lastScrollY = window.scrollY;
  let ticking     = false;

  function update() {
    navbar.classList.toggle('scrolled', lastScrollY > 60);

    let current = '';
    sections.forEach(({ sec }) => {
      if (sec.getBoundingClientRect().top <= 120) current = sec.id;
    });

    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--gold)' : '';
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  update();
})();


/* ─────────────────────────────────────────────
   3. MOBILE NAV
   ─────────────────────────────────────────────*/
(function initMobileNav() {
  const toggle    = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggle || !mobileNav) return;

  let isOpen = false;

  function setOpen(state) {
    isOpen = state;
    toggle.classList.toggle('open', isOpen);
    mobileNav.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  toggle.addEventListener('click', () => setOpen(!isOpen));
  mobileNav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) setOpen(false);
  });
})();


/* ─────────────────────────────────────────────
   4. SCROLL REVEAL
   ─────────────────────────────────────────────*/
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-fade, .reveal-up');
  if (!revealEls.length) return;

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();


/* ─────────────────────────────────────────────
   5. HERO PARALLAX
   ─────────────────────────────────────────────*/
(function initParallax() {
  if (prefersReducedMotion) return;

  const heroImage = document.querySelector('.hero-image');
  if (!heroImage) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight * 1.2) {
          heroImage.style.transform = `scale(1.1) translateY(${scrollY * 0.10}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ─────────────────────────────────────────────
   6. MAGNETIC BUTTONS
   ─────────────────────────────────────────────*/
(function initMagneticButtons() {
  if (prefersReducedMotion || 'ontouchstart' in window) return;

  document.querySelectorAll('.primary-btn, .secondary-btn, .secondary-btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.05;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.05;
      btn.style.transform = `translate(${x}px, ${y}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();


/* ─────────────────────────────────────────────
   7. COUNTER ANIMATION
   ─────────────────────────────────────────────*/
(function initCounters() {
  const statCards = document.querySelectorAll('.stat-card[data-count]');
  if (!statCards.length) return;

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const numEl    = el.querySelector('.count-number');
    const duration = prefersReducedMotion ? 0 : 1800;
    const start    = performance.now();

    if (!numEl) return;

    if (prefersReducedMotion) {
      numEl.textContent = target.toLocaleString('en-IN');
      el.classList.add('counted');
      return;
    }

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const current  = Math.round(easeOutExpo(progress) * target);
      numEl.textContent = current >= 1000
        ? current.toLocaleString('en-IN')
        : current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        numEl.textContent = target.toLocaleString('en-IN');
        el.classList.add('counted');
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  statCards.forEach(card => observer.observe(card));
})();


/* ─────────────────────────────────────────────
   8. GALLERY LIGHTBOX
   ─────────────────────────────────────────────*/
(function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image lightbox');
  overlay.innerHTML = `
    <div class="lb-backdrop"></div>
    <button class="lb-close" aria-label="Close lightbox">&#x2715;</button>
    <button class="lb-prev" aria-label="Previous image">&#8592;</button>
    <button class="lb-next" aria-label="Next image">&#8594;</button>
    <figure class="lb-figure">
      <img class="lb-img" src="" alt="" />
      <figcaption class="lb-caption"></figcaption>
    </figure>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #lightbox { position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .35s cubic-bezier(.16,1,.3,1); }
    #lightbox.open { opacity:1;pointer-events:all; }
    .lb-backdrop { position:absolute;inset:0;background:rgba(10,5,2,.92);backdrop-filter:blur(12px); }
    .lb-figure { position:relative;z-index:1;max-width:min(90vw,1100px);max-height:90svh;display:flex;flex-direction:column;transform:scale(.93);transition:transform .4s cubic-bezier(.16,1,.3,1); }
    #lightbox.open .lb-figure { transform:scale(1); }
    .lb-img { max-height:82svh;width:auto;object-fit:contain;border-radius:16px;box-shadow:0 40px 100px rgba(0,0,0,.6); }
    .lb-caption { text-align:center;color:rgba(255,255,255,.55);font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;margin-top:14px; }
    .lb-close { position:absolute;top:20px;right:24px;z-index:2;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:white;font-size:1rem;width:40px;height:40px;border-radius:50%;cursor:pointer;backdrop-filter:blur(8px);transition:background .2s,transform .2s; }
    .lb-close:hover { background:rgba(255,255,255,.2);transform:rotate(90deg); }
    .lb-prev,.lb-next { position:absolute;top:50%;z-index:2;transform:translateY(-50%);background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:white;font-size:1.1rem;width:44px;height:44px;border-radius:50%;cursor:pointer;backdrop-filter:blur(8px);transition:background .2s,transform .2s; }
    .lb-prev { left:20px; }
    .lb-next { right:20px; }
    .lb-prev:hover { background:rgba(255,255,255,.18);transform:translateY(-50%) translateX(-3px); }
    .lb-next:hover { background:rgba(255,255,255,.18);transform:translateY(-50%) translateX(3px); }
  `;
  document.head.appendChild(style);
  document.body.appendChild(overlay);

  const lbImg     = overlay.querySelector('.lb-img');
  const lbCaption = overlay.querySelector('.lb-caption');
  const lbClose   = overlay.querySelector('.lb-close');
  const lbPrev    = overlay.querySelector('.lb-prev');
  const lbNext    = overlay.querySelector('.lb-next');

  const images = [];
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) images.push({ src: img.src, alt: img.alt });
  });

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = (index + images.length) % images.length;
    lbImg.src    = images[currentIndex].src;
    lbImg.alt    = images[currentIndex].alt;
    lbCaption.textContent = images[currentIndex].alt;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    lbImg.style.cssText = 'opacity:0;transform:translateX(' + (dir > 0 ? '30px' : '-30px') + ');transition:opacity .2s,transform .2s';
    setTimeout(() => {
      currentIndex = (currentIndex + dir + images.length) % images.length;
      lbImg.src    = images[currentIndex].src;
      lbImg.alt    = images[currentIndex].alt;
      lbCaption.textContent = images[currentIndex].alt;
      lbImg.style.transform = 'translateX(' + (dir > 0 ? '-30px' : '30px') + ')';
      requestAnimationFrame(() => {
        lbImg.style.cssText = 'opacity:1;transform:translateX(0);transition:opacity .2s,transform .2s';
      });
    }, 200);
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Open ${images[idx]?.alt || 'gallery image'}`);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); }
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  overlay.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => navigate(-1));
  lbNext.addEventListener('click', () => navigate(+1));

  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(+1);
  });

  let touchStartX = 0;
  overlay.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  overlay.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  });
})();


/* ─────────────────────────────────────────────
   9. FLOWER MODAL
   ─────────────────────────────────────────────*/
(function initFlowerModal() {
  const modal     = document.getElementById('flowerModal');
  const closeBtn  = document.getElementById('fm-close');
  const backdrop  = modal ? modal.querySelector('.fm-backdrop') : null;
  if (!modal) return;

  // Helpers
  function el(id) { return document.getElementById(id); }

  function populateModal(key) {
    const d = FLOWER_DATA[key];
    if (!d) return;

    // Image
    const img = el('fm-img');
    img.src = d.img;
    img.alt = d.name + ' — Gayatri Flowers Shirdi';

    // Text fields
    el('fm-tag').textContent      = d.tag;
    el('fm-name').textContent     = d.name;
    el('fm-name-hi').textContent  = d.nameHi;
    el('fm-desc').textContent     = d.desc;
    el('fm-min').textContent      = d.minOrder;
    el('fm-season').textContent   = d.season;
    el('fm-freshness').textContent = d.freshness;

    // Availability badge
    const availEl = el('fm-avail');
    availEl.textContent = d.availability;
    availEl.className   = 'fm-avail ' + d.availClass;

    // Varieties pills
    const varWrap = el('fm-varieties');
    varWrap.innerHTML = d.varieties.map(v =>
      `<span class="fm-pill">${v}</span>`
    ).join('');

    // Best For pills
    const usesWrap = el('fm-uses');
    usesWrap.innerHTML = d.bestFor.map(u =>
      `<span class="fm-pill">${u}</span>`
    ).join('');

    // WhatsApp link
    const waLink = el('fm-wa');
    const encoded = encodeURIComponent(d.whatsappMsg);
    waLink.href = `https://wa.me/${WA_NUMBER}?text=${encoded}`;

    // Call link
    el('fm-call').href = 'tel:' + CALL_NUMBER;
  }

  function openModal(key) {
    populateModal(key);
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    // Tiny delay so transition fires after display
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add('is-open');
      });
    });
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.setAttribute('hidden', '');
    }, 400);
  }

  // Open on flower card click
  document.querySelectorAll('.flower-card[data-flower]').forEach(card => {
    const key = card.dataset.flower;

    card.addEventListener('click', () => openModal(key));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(key);
      }
    });
  });

  // Close handlers
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  // Trap focus inside modal
  modal.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !modal.classList.contains('is-open')) return;
    const focusable = modal.querySelectorAll(
      'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();


/* ─────────────────────────────────────────────
   10. SMOOTH SCROLL
   ─────────────────────────────────────────────*/
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = document.querySelector('.navbar')?.offsetHeight || 70;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
    });
  });
})();


/* ─────────────────────────────────────────────
   11. SCROLL INDICATOR FADE
   ─────────────────────────────────────────────*/
(function initScrollIndicator() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;
  window.addEventListener('scroll', () => {
    indicator.style.opacity = Math.max(0, 1 - window.scrollY / 200);
  }, { passive: true });
})();


/* ─────────────────────────────────────────────
   12. HERO ENTRANCE
   ─────────────────────────────────────────────*/
(function initHeroEntrance() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal-fade, .reveal-up').forEach(el => el.classList.add('active'));
    return;
  }
  setTimeout(() => {
    document.querySelectorAll(
      '.hero .eyebrow, .hero h1, .hero .hero-description, .hero .hero-buttons, .hero .hero-trust'
    ).forEach(el => el.classList.add('active'));
  }, 180);
})();


/* ─────────────────────────────────────────────
   13. FOOTER YEAR AUTO-UPDATE
   ─────────────────────────────────────────────*/
(function initFooterYear() {
  const el = document.querySelector('.footer-copy');
  if (el) {
    el.innerHTML = `&copy; ${new Date().getFullYear()} Gayatri Flowers, Shirdi. All rights reserved.`;
  }
})();

/* ─────────────────────────────────────────────
   14. REVIEWS CAROUSEL ARROWS
   ─────────────────────────────────────────────*/
(function initReviewsCarousel() {
  const carousel = document.getElementById('reviewsCarousel');
  const prevBtn  = document.getElementById('revPrev');
  const nextBtn  = document.getElementById('revNext');
  if (!carousel || !prevBtn || !nextBtn) return;

  // Calculate scroll distance = one card width + gap
  function getScrollAmount() {
    const card = carousel.querySelector('.review-card');
    if (!card) return 338;
    // gap is 18px as defined in CSS
    return card.offsetWidth + 18;
  }

  function updateArrowStates() {
    prevBtn.disabled = carousel.scrollLeft <= 4;
    nextBtn.disabled = carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 4;
  }

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  // Update arrow disabled states as user scrolls
  carousel.addEventListener('scroll', updateArrowStates, { passive: true });

  // Set initial state
  updateArrowStates();
})();