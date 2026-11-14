import { scrollToTarget, type Scroller } from './smooth';

export function initNav(lenis: Scroller) {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const menu = document.getElementById('mobile-menu');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');

  // In-page links → smooth scroll.
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')!;
    if (id === '#') return;
    const target = document.querySelector<HTMLElement>(id);
    if (!target) return;
    e.preventDefault();
    if (menu?.classList.contains('is-open')) setMenu(false);
    scrollToTarget(lenis, id === '#top' ? document.body : target);
    history.replaceState(null, '', id);
  });

  // Mobile menu
  const setMenu = (open: boolean) => {
    if (!menu || !toggle) return;
    menu.classList.toggle('is-open', open);
    menu.toggleAttribute('inert', !open);
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.documentElement.classList.toggle('menu-open', open);
    if (open) {
      lenis?.stop();
      menu.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
    } else {
      lenis?.start();
    }
  };
  toggle?.addEventListener('click', () => setMenu(!menu?.classList.contains('is-open')));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu?.classList.contains('is-open')) {
      setMenu(false);
      toggle?.focus();
    }
  });
  matchMedia('(min-width: 768px)').addEventListener('change', (m) => m.matches && setMenu(false));

  // Header: compact once scrolled, hide when scrolling down, show when scrolling up.
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    header?.classList.toggle('is-scrolled', y > 24);
    const goingDown = y > lastY && y > 400;
    if (!document.documentElement.classList.contains('menu-open')) header?.classList.toggle('is-hidden', goingDown);
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active section in the nav.
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  const sections = links
    .map((l) => document.querySelector<HTMLElement>(l.getAttribute('href')!))
    .filter((s): s is HTMLElement => !!s);
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${e.target.id}`));
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => io.observe(s));
  const hero = document.querySelector('#top');
  if (hero)
    new IntersectionObserver(([e]) => e.isIntersecting && links.forEach((l) => l.classList.remove('is-active')), {
      rootMargin: '-45% 0px -50% 0px',
    }).observe(hero);
}
