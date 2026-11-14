import { initSmoothScroll } from './smooth';
import { initPreloader } from './preloader';
import { initReveal } from './reveal';
import { initCursor } from './cursor';
import { initNav } from './nav';
import { initWork } from './work';
import { initPlayer } from './player';
import { initMisc } from './misc';

const lenis = initSmoothScroll();
initNav(lenis);
initCursor();
initPlayer(lenis);
initWork();
initMisc();
initPreloader().then(() => initReveal());
