/**
 * Viewfinder crosshair cursor.
 * Only runs on devices with a real mouse (hover + fine pointer), and never
 * for people who asked for reduced motion. Touch devices keep their normal behaviour.
 */
export function initCursor() {
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!fine.matches || reduced.matches) return;

  const root = document.querySelector<HTMLElement>('.cursor');
  if (!root) return;
  const dot = root.querySelector<HTMLElement>('.cursor-dot')!;
  const ring = root.querySelector<HTMLElement>('.cursor-ring')!;
  const lineX = root.querySelector<HTMLElement>('.cursor-line-x')!;
  const lineY = root.querySelector<HTMLElement>('.cursor-line-y')!;
  const label = root.querySelector<HTMLElement>('.cursor-label')!;

  document.documentElement.classList.add('has-cursor');
  root.classList.add('is-out');

  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  const ringPos = { ...mouse };
  let visible = false;

  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        visible = true;
        ringPos.x = mouse.x;
        ringPos.y = mouse.y;
        root.classList.remove('is-out');
      }
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => {
    visible = false;
    root.classList.add('is-out');
  });
  addEventListener('pointerdown', () => root.classList.add('is-down'));
  addEventListener('pointerup', () => root.classList.remove('is-down'));

  // Hover state from whatever is under the pointer.
  const INTERACTIVE = 'a, button, [role="button"], label, summary, [data-cursor="link"]';
  document.addEventListener('pointerover', (e) => {
    const t = e.target as Element | null;
    if (!t || !(t instanceof Element)) return;
    const play = t.closest<HTMLElement>('[data-cursor="play"]');
    const hide = t.closest('[data-cursor="hide"], input, textarea, select, video[controls]');
    const link = t.closest(INTERACTIVE);
    const lines = t.closest('[data-cursor-lines]');
    root.classList.toggle('is-play', !!play && !hide);
    root.classList.toggle('is-link', !play && !!link && !hide);
    root.classList.toggle('is-hidden', !!hide);
    root.classList.toggle('is-lines', !!lines && !play && !link);
    if (play) label.textContent = play.dataset.cursorLabel || '▶ Play';
  });

  const LERP = 0.2;
  const loop = () => {
    ringPos.x += (mouse.x - ringPos.x) * LERP;
    ringPos.y += (mouse.y - ringPos.y) * LERP;
    dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
    lineX.style.transform = `translate3d(0, ${ringPos.y}px, 0)`;
    lineY.style.transform = `translate3d(${ringPos.x}px, 0, 0)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  // If someone plugs in / unplugs a mouse or flips reduced motion, fall back to the native cursor.
  const disable = () => {
    if (!fine.matches || reduced.matches) document.documentElement.classList.remove('has-cursor');
  };
  fine.addEventListener('change', disable);
  reduced.addEventListener('change', disable);
}
