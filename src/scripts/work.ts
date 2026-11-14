/** Portfolio grid: category filters, "show all", and silent preview loops. */
export function initWork() {
  const root = document.querySelector<HTMLElement>('[data-work]');
  if (!root) return;
  const cards = [...root.querySelectorAll<HTMLElement>('[data-card]')];
  const filters = [...root.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const moreBtn = root.querySelector<HTMLButtonElement>('[data-more]');
  const status = root.querySelector<HTMLElement>('[data-work-status]');
  const mobile = matchMedia('(max-width: 767px)');
  let filter = 'all';
  let expanded = false;

  const limit = () => (mobile.matches ? 6 : 8);

  const render = () => {
    const matching = cards.filter((c) => filter === 'all' || c.dataset.category === filter);
    const cap = filter === 'all' && !expanded ? limit() : Infinity;
    let i = 0;
    for (const c of cards) {
      const show = matching.includes(c) && i < cap;
      if (matching.includes(c)) i++;
      if (show && c.hidden) {
        c.hidden = false;
        c.animate?.([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], {
          duration: 600,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          delay: Math.min(i, 8) * 40,
          fill: 'backwards',
        });
      } else if (!show) {
        c.hidden = true;
        stop(c);
      }
    }
    const remaining = matching.length - Math.min(matching.length, cap);
    if (moreBtn) {
      moreBtn.hidden = remaining <= 0;
      moreBtn.querySelector('[data-more-count]')!.textContent = String(matching.length);
    }
    if (status) status.textContent = `Showing ${Math.min(matching.length, cap)} of ${matching.length} projects`;
  };

  filters.forEach((btn) =>
    btn.addEventListener('click', () => {
      filter = btn.dataset.filter!;
      expanded = false;
      filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      render();
    }),
  );
  moreBtn?.addEventListener('click', () => {
    expanded = true;
    render();
  });
  mobile.addEventListener('change', render);
  render();

  // ── Preview loops ──
  const saveData = (navigator as any).connection?.saveData === true;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (saveData || reduced) return;

  const play = (card: HTMLElement) => {
    const v = card.querySelector<HTMLVideoElement>('video[data-src]');
    if (!v) return;
    if (!v.src) v.src = v.dataset.src!;
    v.play().then(() => card.classList.add('is-playing')).catch(() => {});
  };
  function stop(card: HTMLElement) {
    const v = card.querySelector<HTMLVideoElement>('video[data-src]');
    card.classList.remove('is-playing');
    if (v && !v.paused) v.pause();
  }

  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  if (hover.matches) {
    cards.forEach((c) => {
      c.addEventListener('pointerenter', () => play(c));
      c.addEventListener('pointerleave', () => stop(c));
    });
  } else {
    // Touch: play whichever card is mostly on screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const card = e.target as HTMLElement;
          if (e.intersectionRatio >= 0.75) play(card);
          else stop(card);
        }
      },
      { threshold: [0, 0.75] },
    );
    cards.forEach((c) => io.observe(c));
  }

  // Hero reel clips: start when visible, pause when off-screen.
  const reel = [...document.querySelectorAll<HTMLVideoElement>('[data-reel] video')];
  const rio = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) {
        if (!v.src) v.src = v.dataset.src!;
        v.play().catch(() => {});
      } else v.pause();
    }
  });
  reel.forEach((v) => rio.observe(v));
}
