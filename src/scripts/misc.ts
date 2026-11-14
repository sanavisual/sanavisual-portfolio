/** Small page behaviours: live timecode, copy email, process timeline, mobile CTA bar. */
export function initMisc() {
  // Live REC timecode in the hero.
  const tc = document.querySelector<HTMLElement>('[data-timecode]');
  if (tc) {
    const start = performance.now();
    const step = () => {
      const t = (performance.now() - start) / 1000;
      const h = Math.floor(t / 3600);
      const m = Math.floor((t % 3600) / 60);
      const s = Math.floor(t % 60);
      const f = Math.floor((t % 1) * 24);
      tc.textContent = [h, m, s, f].map((n) => String(n).padStart(2, '0')).join(':');
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Copy email to clipboard.
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const label = btn.querySelector<HTMLElement>('[data-copy-label]');
      try {
        await navigator.clipboard.writeText(btn.dataset.copy!);
        if (label) label.textContent = 'Copied!';
      } catch {
        location.href = `mailto:${btn.dataset.copy}`;
      }
      setTimeout(() => label && (label.textContent = 'Copy'), 1800);
    });
  });

  // Process timeline: the playhead fills as you scroll past it.
  const tl = document.querySelector<HTMLElement>('[data-timeline]');
  if (tl) {
    const fill = tl.querySelector<HTMLElement>('[data-timeline-fill]')!;
    const steps = [...tl.querySelectorAll<HTMLElement>('[data-step]')];
    const vertical = matchMedia('(max-width: 767px)');
    const update = () => {
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
      fill.style.transform = vertical.matches ? `scaleY(${p})` : `scaleX(${p})`;
      steps.forEach((s, i) => s.classList.toggle('is-active', p >= (i + 0.15) / steps.length));
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }

  // Mobile CTA bar: shows after the hero, hides at the contact section.
  const bar = document.querySelector<HTMLElement>('[data-mobile-cta]');
  const hero = document.querySelector('#top');
  const contact = document.querySelector('#contact');
  if (bar && hero && contact) {
    let pastHero = false,
      atContact = false;
    const set = () => bar.classList.toggle('is-visible', pastHero && !atContact);
    new IntersectionObserver(([e]) => ((pastHero = !e.isIntersecting), set())).observe(hero);
    new IntersectionObserver(([e]) => ((atContact = e.isIntersecting), set()), { rootMargin: '0px 0px -20% 0px' }).observe(contact);
  }

  // Footer year.
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));
}
