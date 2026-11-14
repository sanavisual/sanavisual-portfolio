import Lenis from 'lenis';

export type Scroller = Lenis | null;

/** Smooth wheel scrolling on desktop. Touch devices keep native scrolling. */
export function initSmoothScroll(): Scroller {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

export function scrollToTarget(lenis: Scroller, target: string | HTMLElement) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  if (lenis) lenis.scrollTo(el); // offset comes from scroll-padding-top in global.css
  else el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}
