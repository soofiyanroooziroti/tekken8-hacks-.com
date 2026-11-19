import EmblaCarousel, { type EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

export const HERO_AUTOPLAY_MS = 5000;

const heroApis = new WeakMap<HTMLElement, EmblaCarouselType>();

type AutoplayPlugin = ReturnType<typeof Autoplay>;

type DotProgressController = {
  refresh: (selectedIndex: number) => void;
  setAutoplayPaused: (paused: boolean) => void;
  stop: () => void;
};

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function createDotProgressController(wrapper: HTMLElement): DotProgressController {
  const dotsRoot = wrapper.querySelector('[data-hero-embla-dots]');
  if (!dotsRoot) {
    return { refresh: () => undefined, setAutoplayPaused: () => undefined, stop: () => undefined };
  }

  wrapper.style.setProperty('--hero-autoplay-ms', `${HERO_AUTOPLAY_MS}ms`);

  const dots = Array.from(dotsRoot.querySelectorAll<HTMLButtonElement>('[data-hero-embla-dot]'));

  const restartActiveDot = (dot: HTMLButtonElement) => {
    dot.classList.remove('hero-embla-dot--animate');
    void dot.offsetWidth;
    dot.classList.add('hero-embla-dot--animate');
  };

  const refresh = (selectedIndex: number) => {
    dots.forEach((dot, i) => {
      const active = i === selectedIndex;
      dot.dataset.active = active ? 'true' : 'false';
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
      dot.classList.remove('hero-embla-dot--animate', 'hero-embla-dot--filled');
      if (!active) return;
      if (prefersReducedMotion()) {
        dot.classList.add('hero-embla-dot--filled');
        return;
      }
      restartActiveDot(dot);
    });
  };

  const setAutoplayPaused = (paused: boolean) => {
    if (paused) wrapper.dataset.heroCarouselPaused = 'true';
    else delete wrapper.dataset.heroCarouselPaused;
  };

  return { refresh, setAutoplayPaused, stop: () => undefined };
}

function bindHeroThumbs(wrapper: HTMLElement, api: EmblaCarouselType) {
  const thumbsRoot = wrapper.querySelector('[data-hero-embla-thumbs]');
  if (!thumbsRoot) return;

  const thumbs = Array.from(thumbsRoot.querySelectorAll<HTMLButtonElement>('[data-hero-embla-thumb]'));

  const updateThumbs = () => {
    const index = api.selectedScrollSnap();
    thumbs.forEach((thumb, i) => {
      const active = i === index;
      thumb.dataset.active = active ? 'true' : 'false';
      thumb.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  };

  thumbs.forEach((thumb) => {
    const index = Number(thumb.getAttribute('data-hero-embla-thumb'));
    thumb.addEventListener('click', () => api.scrollTo(index));
  });

  api.on('select', updateThumbs);
  api.on('reInit', updateThumbs);
  updateThumbs();
}

function bindHeroDots(
  wrapper: HTMLElement,
  api: EmblaCarouselType,
  autoplay: AutoplayPlugin | null,
): DotProgressController {
  const progress = createDotProgressController(wrapper);
  if (!autoplay) return progress;

  const dotsRoot = wrapper.querySelector('[data-hero-embla-dots]');
  if (!dotsRoot) return progress;

  const dots = Array.from(dotsRoot.querySelectorAll<HTMLButtonElement>('[data-hero-embla-dot]'));

  const updateDots = () => {
    progress.refresh(api.selectedScrollSnap());
  };

  const resetAutoplayTimer = () => {
    if (prefersReducedMotion()) return;
    if (autoplay.isPlaying()) autoplay.stop();
    progress.setAutoplayPaused(true);
    autoplay.reset();
    if (!document.hidden) autoplay.play();
    progress.setAutoplayPaused(false);
    progress.refresh(api.selectedScrollSnap());
  };

  dots.forEach((dot) => {
    const index = Number(dot.getAttribute('data-hero-embla-dot'));
    dot.addEventListener('click', () => {
      if (autoplay.isPlaying()) autoplay.stop();
      progress.setAutoplayPaused(true);
      api.scrollTo(index);
      resetAutoplayTimer();
    });
  });

  api.on('select', updateDots);
  api.on('reInit', updateDots);

  updateDots();

  return progress;
}

function bindArrows(
  carouselRoot: HTMLElement,
  api: EmblaCarouselType,
  onUserNav?: () => void,
) {
  const previousButton = carouselRoot.querySelector<HTMLButtonElement>('[data-sw-carousel-previous]');
  const nextButton = carouselRoot.querySelector<HTMLButtonElement>('[data-sw-carousel-next]');

  previousButton?.addEventListener('click', (event) => {
    event.preventDefault();
    api.scrollPrev();
    onUserNav?.();
  });

  nextButton?.addEventListener('click', (event) => {
    event.preventDefault();
    api.scrollNext();
    onUserNav?.();
  });
}

function bindHeroSlideImages(viewport: HTMLElement) {
  viewport.querySelectorAll('img').forEach((img, index) => {
    if (index > 0) img.loading = 'lazy';
    img.decoding = 'async';
    img.draggable = false;
  });
}

function bindHeroKeyboard(
  wrapper: HTMLElement,
  api: EmblaCarouselType,
  onUserNav?: () => void,
) {
  if (wrapper.dataset.heroKeyboardBound === 'true') return;
  wrapper.dataset.heroKeyboardBound = 'true';
  wrapper.tabIndex = 0;

  wrapper.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      api.scrollPrev();
      onUserNav?.();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      api.scrollNext();
      onUserNav?.();
    }
  });
}

function bindHeroAutoplayPause(
  wrapper: HTMLElement,
  autoplay: AutoplayPlugin,
  reducedMotion: boolean,
  progress: DotProgressController,
) {
  if (reducedMotion || wrapper.dataset.heroPauseBound === 'true') return;
  wrapper.dataset.heroPauseBound = 'true';

  const pause = () => {
    if (autoplay.isPlaying()) autoplay.stop();
    progress.setAutoplayPaused(true);
  };
  const resume = () => {
    if (!document.hidden) autoplay.play();
    progress.setAutoplayPaused(false);
  };

  wrapper.addEventListener('mouseenter', pause);
  wrapper.addEventListener('mouseleave', resume);
  wrapper.addEventListener('focusin', pause);
  wrapper.addEventListener('focusout', (event) => {
    const next = event.relatedTarget;
    if (next instanceof Node && wrapper.contains(next)) return;
    resume();
  });

  if (wrapper.dataset.heroVisibilityBound !== 'true') {
    wrapper.dataset.heroVisibilityBound = 'true';
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pause();
      else resume();
    });
  }
}

function bindDragUX(viewport: HTMLElement, api: EmblaCarouselType) {
  viewport.querySelectorAll('img').forEach((img) => {
    img.draggable = false;
  });

  let dragMoved = false;

  const setDragging = (dragging: boolean) => {
    viewport.classList.toggle('is-dragging', dragging);
    viewport.dataset.dragging = dragging ? 'true' : 'false';
  };

  api.on('pointerDown', () => {
    dragMoved = false;
    setDragging(true);
  });
  api.on('scroll', () => {
    dragMoved = true;
  });
  api.on('pointerUp', () => setDragging(false));

  viewport.addEventListener(
    'click',
    (event) => {
      if (dragMoved) {
        dragMoved = false;
        event.preventDefault();
        event.stopPropagation();
      }
    },
    true,
  );
}

function initNativeHero(wrapper: HTMLElement, viewport: HTMLElement) {
  const slides = Array.from(viewport.querySelectorAll<HTMLElement>('[data-slot="carousel-item"]'));
  const thumbs = Array.from(wrapper.querySelectorAll<HTMLButtonElement>('[data-hero-embla-thumb]'));
  const dots = Array.from(wrapper.querySelectorAll<HTMLButtonElement>('[data-hero-embla-dot]'));
  if (!slides.length) return;

  wrapper.dataset.nativeCarousel = 'true';
  const progress = createDotProgressController(wrapper);
  let selected = 0;
  let autoplayTimer = 0;

  const scrollToSlide = (index: number) => {
    selected = (index + slides.length) % slides.length;
    viewport.scrollTo({
      left: selected * viewport.clientWidth,
      behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    });
  };

  const update = () => {
    selected = Math.round(viewport.scrollLeft / Math.max(viewport.clientWidth, 1));
    [...dots, ...thumbs].forEach((button) => {
      const index = Number(button.dataset.heroEmblaDot ?? button.dataset.heroEmblaThumb);
      const active = index === selected;
      button.dataset.active = String(active);
      button.setAttribute('aria-selected', String(active));
    });
    progress.refresh(selected);
  };

  const pauseAutoplay = () => {
    window.clearInterval(autoplayTimer);
    autoplayTimer = 0;
    progress.setAutoplayPaused(true);
  };

  const resetAutoplay = () => {
    pauseAutoplay();
    if (prefersReducedMotion()) return;
    autoplayTimer = window.setInterval(() => {
      if (document.hidden) return;
      scrollToSlide(selected + 1);
    }, HERO_AUTOPLAY_MS);
    progress.setAutoplayPaused(false);
    progress.refresh(selected);
  };

  viewport.addEventListener('scroll', update, { passive: true });
  dots.forEach((button, index) =>
    button.addEventListener('click', () => {
      pauseAutoplay();
      scrollToSlide(index);
      resetAutoplay();
    }),
  );
  thumbs.forEach((button, index) =>
    button.addEventListener('click', () => {
      pauseAutoplay();
      scrollToSlide(index);
      resetAutoplay();
    }),
  );
  wrapper.querySelector('[data-sw-carousel-previous]')?.addEventListener('click', (event) => {
    event.preventDefault();
    pauseAutoplay();
    scrollToSlide(selected - 1);
    resetAutoplay();
  });
  wrapper.querySelector('[data-sw-carousel-next]')?.addEventListener('click', (event) => {
    event.preventDefault();
    pauseAutoplay();
    scrollToSlide(selected + 1);
    resetAutoplay();
  });
  viewport.tabIndex = 0;
  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      pauseAutoplay();
      scrollToSlide(selected + (event.key === 'ArrowRight' ? 1 : -1));
      resetAutoplay();
    }
  });
  wrapper.addEventListener('mouseenter', pauseAutoplay);
  wrapper.addEventListener('mouseleave', resetAutoplay);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseAutoplay();
    else resetAutoplay();
  });
  wrapper.dataset.heroEmblaInited = 'true';
  update();
  resetAutoplay();
}

function initHeroCarousels(root: ParentNode = document) {
  const wraps = [...root.querySelectorAll<HTMLElement>('[data-hero-embla-wrap]')].filter(
    (wrapper) => wrapper.dataset.heroEmblaInited !== 'true',
  );

  if (!wraps.length) return;

  const reducedMotion = prefersReducedMotion();

  wraps.forEach((wrapper) => {
    try {
      const carouselRoot = wrapper.querySelector<HTMLElement>('[data-hero-embla]');
      if (!carouselRoot) return;

      const viewport =
        wrapper.querySelector<HTMLElement>('[data-hero-embla-viewport]') ??
        carouselRoot.querySelector<HTMLElement>('[data-sw-carousel-viewport]');
      if (!viewport) {
        console.error('Hero Embla failed to initialize: viewport element not found');
        return;
      }

      if (window.matchMedia('(max-width: 1023px)').matches) {
        initNativeHero(wrapper, viewport);
        return;
      }

      const existingApi = heroApis.get(wrapper);
      existingApi?.destroy();

      const noAutoplay = wrapper.dataset.heroNoAutoplay === 'true';
      const plugins: AutoplayPlugin[] = [];

      let autoplay: AutoplayPlugin | null = null;
      if (!noAutoplay) {
        autoplay = Autoplay({
          delay: HERO_AUTOPLAY_MS,
          playOnInit: !reducedMotion,
          stopOnInteraction: false,
          stopOnMouseEnter: false,
          stopOnFocusIn: false,
        });
        plugins.push(autoplay);
      }

      const api = EmblaCarousel(
        viewport,
        {
          loop: true,
          duration: 20,
          dragFree: false,
          watchDrag: true,
        },
        plugins,
      );

      wrapper.dataset.heroEmblaInited = 'true';
      heroApis.set(wrapper, api);

      const progress = bindHeroDots(wrapper, api, autoplay);
      bindHeroThumbs(wrapper, api);

      const resetAutoplayTimer = () => {
        if (!autoplay || reducedMotion) return;
        if (autoplay.isPlaying()) autoplay.stop();
        progress.setAutoplayPaused(true);
        autoplay.reset();
        if (!document.hidden) autoplay.play();
        progress.setAutoplayPaused(false);
        progress.refresh(api.selectedScrollSnap());
      };

      bindArrows(carouselRoot, api, resetAutoplayTimer);
      bindHeroSlideImages(viewport);
      bindDragUX(viewport, api);
      bindHeroKeyboard(wrapper, api, resetAutoplayTimer);

      if (autoplay) {
        bindHeroAutoplayPause(wrapper, autoplay, reducedMotion, progress);
      }

      api.on('destroy', progress.stop);

      if (!autoplay) {
        return;
      }

      if (reducedMotion) {
        autoplay.stop();
        return;
      }

      if (!document.hidden) {
        autoplay.play();
      }
    } catch (error) {
      console.error('Hero Embla failed to initialize:', error);
    }
  });
}

let heroEmblaBootstrapped = false;

export function setupHeroEmbla() {
  const run = () => initHeroCarousels(document);

  if (!heroEmblaBootstrapped) {
    heroEmblaBootstrapped = true;
    document.addEventListener('astro:page-load', run);
    window.addEventListener('load', run, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}