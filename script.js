const reveals = document.querySelectorAll('.reveal');
const layers = document.querySelectorAll('[data-speed]');
const cursorGlow = document.querySelector('.cursor-glow');
const magneticButtons = document.querySelectorAll('.magnetic');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.2 });

reveals.forEach(el => revealObserver.observe(el));

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  layers.forEach(layer => {
    const speed = parseFloat(layer.dataset.speed || '0');
    layer.style.transform = `translate3d(0, ${y * speed}px, 0) scale(${1 + speed * 0.2})`;
  });
}, { passive: true });

window.addEventListener('pointermove', (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

magneticButtons.forEach((btn) => {
  btn.addEventListener('pointermove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });
  btn.addEventListener('pointerleave', () => {
    btn.style.transform = 'translate(0,0)';
  });
});
