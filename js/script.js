/* ============================================================
   CYCLE — script.js
   ============================================================ */

/* ── Navigation ───────────────────────────────────────────── */
const nav    = document.getElementById('nav');
const toggle = document.querySelector('.nav__toggle');

// Scrolled state
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 48);
}, { passive: true });

// Mobile menu toggle
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
  document.querySelector('.nav__drawer').setAttribute('aria-hidden', !open);
});

// Close drawer on any nav link click
document.querySelectorAll('.nav__drawer a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.querySelector('.nav__drawer').setAttribute('aria-hidden', 'true');
  });
});

/* ── Smooth anchor scroll ─────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});

/* ── Scroll-triggered animations ─────────────────────────── */
const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      animObserver.unobserve(entry.target); // animate once
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -32px 0px'
});

document.querySelectorAll('.animate-up').forEach((el, i) => {
  // Stagger phase cards
  if (el.closest('.phases')) {
    const idx = Array.from(el.closest('.phases').children).indexOf(el);
    el.style.transitionDelay = `${idx * 0.1}s`;
  }
  // Stagger why cards
  if (el.closest('.why__grid')) {
    const idx = Array.from(el.closest('.why__grid').children).indexOf(el);
    el.style.transitionDelay = `${idx * 0.08}s`;
  }
  animObserver.observe(el);
});

/* ── Asset image loader ───────────────────────────────────── */
// Images are hidden by default. Show them if they load successfully.
// Placeholder siblings are hidden automatically via CSS when image has .is-loaded.
document.querySelectorAll('.asset-img').forEach(img => {
  const show = () => {
    if (img.naturalWidth > 0) {
      img.classList.add('is-loaded');
    }
  };
  if (img.complete) {
    show();
  } else {
    img.addEventListener('load', show);
    // On error: leave placeholder visible (nothing to do)
  }
});

/* ── Subtle hero parallax ─────────────────────────────────── */
const heroContent = document.querySelector('.hero__content');
const heroVisual  = document.querySelector('.hero__visual');

window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight) return;
  const y = window.scrollY;
  if (heroContent) heroContent.style.transform = `translateY(${y * 0.06}px)`;
  if (heroVisual)  heroVisual.style.transform  = `translateY(${y * 0.04}px)`;
}, { passive: true });

/* ── Waitlist form ────────────────────────────────────────── */
const form      = document.getElementById('waitlist-form');
const successEl = document.getElementById('waitlist-success');

form?.addEventListener('submit', async e => {
  e.preventDefault();

  const submitBtn  = form.querySelector('[type="submit"]');
  const origLabel  = submitBtn.textContent;
  submitBtn.disabled    = true;
  submitBtn.textContent = 'Submitting…';

  const data = new FormData(form);
  const payload = {
    name:   data.get('name')   || '',
    email:  data.get('email')  || '',
    source: data.get('source') || ''
  };

  try {
    // Google Apps Script requires no-cors from static sites.
    // We can't read the response, so we show success optimistically.
    await fetch(form.action, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body:    JSON.stringify(payload)
    });
    showSuccess();
  } catch {
    submitBtn.disabled    = false;
    submitBtn.textContent = origLabel;
    alert('Something went wrong — please try again.');
  }
});

function showSuccess() {
  form.style.opacity = '0';
  form.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    form.hidden = true;
    successEl.hidden = false;
    successEl.style.opacity = '0';
    successEl.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { successEl.style.opacity = '1'; });
    });
  }, 400);
}
