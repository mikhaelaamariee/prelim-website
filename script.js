// Mobile-safe reduced motion check
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll-reveal for cards, effect cards, benefits, etc.
const revealTargets = document.querySelectorAll(
  '.stat-card, .info-card, .effect-card, .pull-quote, .benefit-item, .why-card, .phase-card, .phase-circle, .check-list li'
);

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

  // Timeline line fill on scroll
  const timelineLine = document.querySelector('.timeline-line-fill');
  if (timelineLine) {
    const timeline = document.querySelector('.timeline');
    window.addEventListener('scroll', () => {
      const rect = timeline.getBoundingClientRect();
      const winH = window.innerHeight;
      let progress = (winH - rect.top) / (rect.height + winH) * 1.3;
      progress = Math.max(0, Math.min(1, progress));
      timelineLine.style.height = (progress * 100) + '%';
    });
  }
} else {
  // No animation support / reduced motion: just show everything
  revealTargets.forEach(el => el.classList.add('reveal'));
}

// Subtle hero parallax on mouse move (desktop only)
const heroBg = document.querySelector('.hero-bg');
if (heroBg && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    heroBg.style.transform = `translate(${x}px, ${y}px)`;
  });
}