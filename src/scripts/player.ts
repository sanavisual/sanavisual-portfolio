import type { Scroller } from './smooth';

/** Full-screen video player with sound, prev/next, swipe and keyboard support. */
export function initPlayer(lenis: Scroller) {
  const dlg = document.querySelector<HTMLDialogElement>('#player');
  if (!dlg) return;
  const video = dlg.querySelector<HTMLVideoElement>('video')!;
  const title = dlg.querySelector<HTMLElement>('[data-player-title]')!;
  const meta = dlg.querySelector<HTMLElement>('[data-player-meta]')!;
  const count = dlg.querySelector<HTMLElement>('[data-player-count]')!;
  const frame = dlg.querySelector<HTMLElement>('[data-player-frame]')!;
  let list: HTMLElement[] = [];
  let index = 0;
  let opener: HTMLElement | null = null;

  const load = (i: number) => {
    index = (i + list.length) % list.length;
    const c = list[index];
    video.pause();
    video.poster = c.dataset.poster!;
    video.src = c.dataset.full!;
    frame.dataset.format = c.dataset.format || 'vertical';
    title.textContent = c.dataset.title!;
    meta.textContent = c.dataset.meta!;
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`;
    video.play().catch(() => {});
  };

  const open = (card: HTMLElement) => {
    // Navigate through the cards currently visible in the grid.
    list = [...document.querySelectorAll<HTMLElement>('[data-card]')].filter((c) => !c.hidden);
    opener = card;
    lenis?.stop();
    document.documentElement.classList.add('player-open');
    dlg.showModal();
    load(list.indexOf(card));
  };

  const close = () => {
    video.pause();
    video.removeAttribute('src');
    video.load();
    if (dlg.open) dlg.close();
  };
  dlg.addEventListener('close', () => {
    lenis?.start();
    document.documentElement.classList.remove('player-open');
    opener?.focus({ preventScroll: true });
  });

  document.addEventListener('click', (e) => {
    const card = (e.target as Element).closest<HTMLElement>('[data-card]');
    if (card) open(card);
  });
  dlg.querySelector('[data-player-close]')!.addEventListener('click', close);
  dlg.querySelector('[data-player-prev]')!.addEventListener('click', () => load(index - 1));
  dlg.querySelector('[data-player-next]')!.addEventListener('click', () => load(index + 1));
  // Click on the dark backdrop closes.
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) close();
  });
  dlg.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLVideoElement && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;
    if (e.key === 'ArrowRight') load(index + 1);
    if (e.key === 'ArrowLeft') load(index - 1);
  });

  // Swipe left / right on touch screens.
  let sx = 0,
    sy = 0;
  frame.addEventListener('touchstart', (e) => ((sx = e.touches[0].clientX), (sy = e.touches[0].clientY)), { passive: true });
  frame.addEventListener(
    'touchend',
    (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) load(index + (dx < 0 ? 1 : -1));
    },
    { passive: true },
  );
}
