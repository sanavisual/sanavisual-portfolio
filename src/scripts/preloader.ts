/** Timecode count-up intro. Resolves when the page should start animating in. */
export function initPreloader(): Promise<void> {
  const el = document.getElementById('preloader');
  const root = document.documentElement;
  if (!el || root.classList.contains('no-intro')) {
    el?.remove();
    return Promise.resolve();
  }
  const time = el.querySelector<HTMLElement>('[data-pl-time]')!;
  const bar = el.querySelector<HTMLElement>('[data-pl-bar]')!;
  const DURATION = 1100;
  const FPS = 24;
  const start = performance.now();

  return new Promise((resolve) => {
    const finish = () => {
      try {
        sessionStorage.setItem('sv-intro', '1');
      } catch {}
      el.classList.add('is-done');
      setTimeout(resolve, 250);
      setTimeout(() => el.remove(), 1000);
    };
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      const frames = Math.round(eased * FPS); // counts up to 00:00:01:00
      const sec = Math.floor(frames / FPS);
      const ff = frames % FPS;
      time.textContent = `00:00:${String(sec).padStart(2, '0')}:${String(ff).padStart(2, '0')}`;
      bar.style.transform = `scaleX(${eased})`;
      if (t < 1) requestAnimationFrame(tick);
      else setTimeout(finish, 150);
    };
    requestAnimationFrame(tick);
    // Let people skip it.
    el.addEventListener('click', finish, { once: true });
  });
}
