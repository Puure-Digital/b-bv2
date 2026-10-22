/* Beams & Braces homepage: nav, menu, scroll unveil, colours, reviews */
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var menu = document.getElementById('menu');
  var menuButton = document.getElementById('menuButton');

  /* ---------- Nav turns solid once the hero is behind it ----------
     It also slips away while you scroll down through the page and comes back as soon as
     you scroll up, so the photographs get the whole screen. It never hides near the top,
     while the menu is open, or while anything in it has focus. */
  var lastY = window.scrollY;
  function updateNav() {
    var y = window.scrollY;
    var film = document.querySelector('.hero--scrub.is-scrubbing');
    nav.classList.toggle('is-solid', document.body.classList.contains('page--solid') || y > (film ? film.offsetHeight - window.innerHeight : 40));
    var busy = nav.classList.contains('is-menu-open') || nav.contains(document.activeElement) || nav.querySelector('.menu__item--group.is-open');
    if (y < window.innerHeight * 0.6 || busy || y < lastY - 6) nav.classList.remove('is-hidden');
    else if (y > lastY + 6) nav.classList.add('is-hidden');
    if (Math.abs(y - lastY) > 6) lastY = y;
    navAway();
  }
  /* sticky bands (the colour preview and the year counters on phones) sit under the nav and
     move up into its place while it is away, so nothing shows through the gap it leaves */
  function navAway() { document.documentElement.classList.toggle('nav-away', nav.classList.contains('is-hidden')); }
  if (nav) {
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
    nav.addEventListener('focusin', function () { nav.classList.remove('is-hidden'); navAway(); });
  }

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    nav.classList.toggle('is-menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('.menu-button__label').textContent = open ? 'Close' : 'Menu';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (menu && menuButton) {
    menuButton.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
  }

  /* ---------- Trex dropdown ---------- */
  document.querySelectorAll('.menu__toggle').forEach(function (toggle) {
    var group = toggle.closest('.menu__item--group');
    var hoverable = window.matchMedia('(hover: hover) and (min-width: 961px)');
    var sub = group.querySelector('.menu__sub');
    var closeTimer = null;
    function setGroup(open) {
      group.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      /* closed submenu links stay out of the tab order */
      if (sub) sub.inert = !open;
    }
    setGroup(false);
    toggle.addEventListener('click', function () {
      if (hoverable.matches && group.matches(':hover')) { clearTimeout(closeTimer); setGroup(true); return; }
      setGroup(!group.classList.contains('is-open'));
    });
    group.addEventListener('focusout', function (e) { if (!group.contains(e.relatedTarget)) setGroup(false); });
    /* a short grace period so a mouse travelling diagonally to the menu does not close it */
    group.addEventListener('mouseenter', function () {
      if (!hoverable.matches) return;
      clearTimeout(closeTimer);
      setGroup(true);
    });
    group.addEventListener('mouseleave', function () {
      if (!hoverable.matches) return;
      clearTimeout(closeTimer);
      closeTimer = setTimeout(function () { setGroup(false); }, 280);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.menu__item--group.is-open').forEach(function (g) {
      g.classList.remove('is-open');
      var t = g.querySelector('.menu__toggle');
      t.setAttribute('aria-expanded', 'false');
      t.focus();
    });
    if (menu && menu.classList.contains('is-open')) { setMenu(false); menuButton.focus(); }
  });

  /* ---------- Photos fade in whole ----------
     A large photo otherwise paints top to bottom as it downloads. Each photo below the
     first screen waits, invisible over the frame's own colour, until it has fully loaded
     and decoded, then fades in. Photos already loaded (from the cache) show at once. */
  (function () {
    function show(img) { img.classList.add('is-loaded'); }
    function ready(img) {
      if (img.decode) img.decode().then(function () { show(img); }, function () { show(img); });
      else show(img);
    }
    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
      if (img.closest('.reveal-media, .nav, .footer, .swatch, .compare__boards')) return;
      if (img.complete && img.naturalWidth) { show(img); return; }
      img.classList.add('is-fading');
      img.addEventListener('load', function () { ready(img); }, { once: true });
      img.addEventListener('error', function () { show(img); }, { once: true });
    });
  })();

  /* ---------- Scroll unveil for photographs ---------- */
  var media = document.querySelectorAll('.reveal-media');
  /* Lay the photo only once it has arrived, so the brass edge never sweeps an empty frame */
  /* a frame may hold several photos (the story collage): wait for all of them */
  function unveil(el) {
    var imgs = Array.prototype.slice.call(el.querySelectorAll('img'));
    var left = imgs.filter(function (i) { return !(i.complete && i.naturalWidth); }).length;
    if (!left) { el.classList.add('is-in'); return; }
    function done() { if (--left === 0) el.classList.add('is-in'); }
    imgs.forEach(function (i) {
      if (i.complete && i.naturalWidth) return;
      i.addEventListener('load', done, { once: true });
      i.addEventListener('error', done, { once: true });
    });
  }
  /* The image is clipped to nothing until it is laid, and Chrome's native lazy loading
     treats a fully clipped image as off-screen, so it would never download. Fetch it
     ourselves well before it scrolls in, then lay it once it is on screen. */
  function fetchEarly(el) {
    el.querySelectorAll('img').forEach(function (img) { if (img.loading === 'lazy') img.loading = 'eager'; });
  }
  if ('IntersectionObserver' in window) {
    var early = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { fetchEarly(entry.target); early.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px 150% 0px' });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { fetchEarly(entry.target); unveil(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.2 });
    media.forEach(function (el) { early.observe(el); io.observe(el); });
  } else {
    media.forEach(function (el) { fetchEarly(el); el.classList.add('is-in'); });
  }

  /* ---------- Word-by-word reveal, scrubbed by scroll ----------
     Words brighten in reading order as the quote travels up the screen,
     with a soft four-word leading edge. Text stays real text for screen readers. */
  document.querySelectorAll("[data-words]").forEach(function (el) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var once = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { el.classList.add("is-faded"); once.disconnect(); }
      }, { threshold: 0.3 });
      once.observe(el);
      return;
    }
    var words = [];
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var span = document.createElement("span");
        span.className = "w";
        span.textContent = part;
        frag.appendChild(span);
        words.push(span);
      });
      node.parentNode.replaceChild(frag, node);
    });
    el.classList.add("is-scrubbed");
    var by = el.nextElementSibling;
    var host = el.closest(".belief--manifesto");
    var soft = 4, last = -1, ticking = false;

    function update() {
      ticking = false;
      var r = el.getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom < -vh || r.top > vh * 2) return; /* far offscreen: skip the work */
      /* 0 when the quote top reaches 90% of the screen, 1 when its bottom reaches 75% (fully lit by the time it is centred) */
      var start = vh * 0.9, end = vh * 0.75;
      var p = (start - r.top) / (start - end + r.height);
      p = Math.max(0, Math.min(1, p));
      if (p === last) return;
      last = p;
      var head = p * (words.length + soft);
      words.forEach(function (w, i) {
        var o = Math.max(0, Math.min(1, (head - i) / soft));
        w.style.setProperty("--o", (0.14 + o * 0.86).toFixed(3));
      });
      if (by) by.style.setProperty("--by", Math.max(0, Math.min(1, (p - 0.85) / 0.15)).toFixed(3));
      if (host) host.style.setProperty("--lit", p.toFixed(3));
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    update();
  });

  /* ---------- Hero film, scrubbed by scroll ----------
     The homepage hero is a short film held as still frames. The stage pins to the screen
     while the section scrolls past and scroll position picks the frame, eased so the camera
     glides rather than jumps. Neighbouring frames are blended, so a few frames play
     smoothly. data-scrub-map maps scroll (0-1) to frame position and data-scrub-zoom adds
     a zoom of the drawing itself, both as "scroll:value" points. Frames load coarse to
     fine with a brass rule along the foot; copy arrives in beats at set points. The film
     only starts once its first frame has arrived. Reduced motion, no script or no frames:
     a still hero showing the real photo. */
  (function () {
    var hero = document.querySelector('.hero--scrub');
    if (!hero) return;
    /* if the film's first frame is missing, fall back to the real photo */
    var poster = hero.querySelector('.hero__poster');
    function fallback() { hero.querySelectorAll('picture source').forEach(function (s) { s.remove(); }); }
    if (poster) {
      if (poster.complete && !poster.naturalWidth) fallback();
      else poster.addEventListener('error', fallback, { once: true });
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    /* data saving: the real photo as an ordinary still hero, no film */
    if ((navigator.connection || {}).saveData) { fallback(); return; }
    var canvas = hero.querySelector('.hero__canvas');
    var ctx = canvas && canvas.getContext && canvas.getContext('2d');
    if (!ctx) return;
    var stage = hero.querySelector('.hero__stage');
    var bar = hero.querySelector('.hero__progress');
    var count = Number(hero.dataset.scrubCount) || 0;
    var narrow = window.matchMedia('(max-width: 767px)').matches;
    var dir = narrow ? hero.dataset.scrubMobile : hero.dataset.scrub;
    var ext = hero.dataset.scrubExt || 'webp';
    function points(s) {
      return (s || '').split(',').filter(Boolean).map(function (pair) { var x = pair.split(':'); return [+x[0], +x[1]]; });
    }
    function interp(pts, p, dflt) {
      if (!pts.length) return dflt;
      if (p <= pts[0][0]) return pts[0][1];
      for (var k = 1; k < pts.length; k++) {
        if (p <= pts[k][0]) { var u = pts[k - 1], v = pts[k]; return u[1] + (v[1] - u[1]) * (p - u[0]) / (v[0] - u[0]); }
      }
      return pts[pts.length - 1][1];
    }
    var map = points(hero.dataset.scrubMap), zoomAt = points(hero.dataset.scrubZoom), veilAt = points(hero.dataset.scrubVeil);
    var frames = new Array(count), loaded = 0, drawn = '', ps = 0, raf = 0, live = false, started = false;
    var beats = Array.prototype.slice.call(hero.querySelectorAll('[data-beat-in], [data-beat-out]'));

    function src(i) { return dir + '/frame_' + String(i + 1).padStart(4, '0') + '.' + ext; }
    function nearest(i) {
      for (var d = 0; d < count; d++) {
        if (frames[i - d]) return frames[i - d];
        if (frames[i + d]) return frames[i + d];
      }
      return null;
    }
    function size() {
      /* a stage taller than the screen (small phones) scrolls up to its foot, then pins */
      stage.style.setProperty('--stage-top', Math.min(0, window.innerHeight - stage.offsetHeight) + 'px');
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(stage.clientWidth * dpr);
      canvas.height = Math.round(stage.clientHeight * dpr);
      drawn = '';
    }
    function paint(img, alpha, zoom) {
      var cw = canvas.width, ch = canvas.height, iw = img.naturalWidth, ih = img.naturalHeight;
      var s = Math.max(cw / iw, ch / ih) * zoom, w = iw * s, hgt = ih * s;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - w) / 2, (ch - hgt) / 2, w, hgt);
      ctx.globalAlpha = 1;
    }
    /* frame position f (fractional): the frame below, with the next one blended over it */
    function draw(f, zoom) {
      var key = f.toFixed(2) + '/' + zoom.toFixed(3);
      if (key === drawn) return;
      var lo = Math.floor(f), t = f - lo;
      var base = nearest(lo);
      if (!base) return;
      paint(base, 1, zoom);
      var over = t > 0.02 && frames[lo + 1];
      if (over && base === frames[lo]) paint(over, t, zoom);
      drawn = key;
      if (!live) { live = true; hero.classList.add('is-live'); }
    }
    function progress() {
      var span = hero.offsetHeight - window.innerHeight;
      return span > 0 ? Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / span)) : 0;
    }
    function ramp(p, x, y) { return Math.min(1, Math.max(0, (p - x) / (y - x))); }
    function setBeats(p) {
      beats.forEach(function (el) {
        var i = el.dataset.beatIn, o = el.dataset.beatOut;
        var v = (i === undefined ? 1 : ramp(p, i - 0.07, +i)) * (o === undefined ? 1 : 1 - ramp(p, +o, +o + 0.07));
        el.style.opacity = v.toFixed(3);
        el.style.transform = 'translateY(' + ((1 - v) * (i !== undefined && p < i ? 18 : -18)).toFixed(1) + 'px)';
        /* a beat that has faded out stays readable to screen readers; only its links leave
           the tab order and stop taking clicks */
        var off = v < 0.05;
        if (el._off !== off) {
          el._off = off;
          el.style.pointerEvents = off ? 'none' : '';
          el.querySelectorAll('a, button').forEach(function (x) { if (off) x.setAttribute('tabindex', '-1'); else x.removeAttribute('tabindex'); });
        }
      });
    }
    function tick() {
      raf = 0;
      var p = progress();
      ps += (p - ps) * 0.16;
      if (Math.abs(p - ps) < 0.0004) ps = p;
      draw(interp(map, ps, ps * (count - 1)), interp(zoomAt, ps, 1));
      hero.style.setProperty('--veil', interp(veilAt, ps, 1).toFixed(3));
      setBeats(ps);
      if (ps !== p) raf = requestAnimationFrame(tick);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(tick); }
    /* the long pinned film starts once its first frame is here */
    function start() {
      if (started) return;
      started = true;
      hero.classList.add('is-scrubbing');
      size();
      ps = progress();
      setBeats(ps);
      window.addEventListener('scroll', kick, { passive: true });
      kick();
    }

    /* the opening (the close-up and the cross-fade, frames 0-3) first; then the pull-back
       coarse to fine: its last frame, then every 8th, 4th, 2nd, then the rest */
    var OPENING = Math.min(4, count);
    var order = [], seen = {}, next = 0, busy = 0;
    for (var k = 0; k < OPENING; k++) { seen[k] = true; order.push(k); }
    if (!seen[count - 1]) { seen[count - 1] = true; order.push(count - 1); }
    [8, 4, 2, 1].forEach(function (step) {
      for (var k = 0; k < count; k += step) if (!seen[k]) { seen[k] = true; order.push(k); }
    });
    /* the pull-back is most of the film's weight (about 2 MB on a phone), so it waits until
       the visitor shows they are staying: a scroll, touch, key or wheel, or on a desktop
       simply the page finishing loading. A quick look costs only the opening frames. */
    var armed = false;
    function arm() {
      if (armed) return;
      armed = true;
      ['scroll', 'touchstart', 'pointerdown', 'keydown', 'wheel'].forEach(function (t) { window.removeEventListener(t, arm); });
      pump();
    }
    ['scroll', 'touchstart', 'pointerdown', 'keydown', 'wheel'].forEach(function (t) { window.addEventListener(t, arm, { passive: true }); });
    if (!narrow) {
      if (document.readyState === 'complete') arm();
      else window.addEventListener('load', arm, { once: true });
    }
    function pump() {
      var limit = armed ? order.length : OPENING;
      while (started && busy < 4 && next < limit) load(order[next++]);
    }
    function load(i) {
      busy++;
      var img = new Image();
      img.decoding = 'async';
      img.onload = function () {
        busy--; loaded++;
        frames[i] = img;
        if (i === 0) start();
        if (bar) bar.style.transform = 'scaleX(' + (loaded / count).toFixed(3) + ')';
        if (loaded === count) hero.classList.add('is-loaded');
        drawn = ''; kick();
        pump();
      };
      img.onerror = function () {
        busy--;
        if (i === 0) { next = order.length; return; }   /* no film: stay a still hero */
        pump();
      };
      img.src = src(i);
    }
    /* the first frame alone; once it has arrived, the rest follow */
    load(0); next = 1;
    window.addEventListener('resize', function () {
      if (!started) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (Math.abs(stage.clientWidth * dpr - canvas.width) < 2 && Math.abs(stage.clientHeight * dpr - canvas.height) < 80) return;
      size(); kick();
    });
  })();

  /* ---------- Story facts: laid in once, as they come into view ----------
     Hairlines are drawn left to right, then each figure rises into place and its words
     follow, one fact after another. Only set up when the row is still below the screen,
     so nothing already visible is hidden; reduced motion or no script: shown as they are. */
  (function () {
    var list = document.querySelector('.story--spread .story__facts');
    if (!list || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (list.getBoundingClientRect().top < window.innerHeight) return;
    list.classList.add('is-set');
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      list.classList.add('is-in');
      io.disconnect();
    }, { threshold: 0.35 });
    io.observe(list);
  })();

  /* ---------- Outcome: the plan becomes the deck ----------
     A plan of the deck in the photograph, traced in its own pixel coordinates, is drawn
     over it as the section arrives; then the deck is built, frame first and then course by
     course, and the garden appears around it until only the photograph is left. Scroll
     position sets --p (0-1), eased; every line and board reads its own window of it from
     CSS. Desktop: the section holds still for a screen while this plays. Reduced motion or
     no script: just the photograph. */
  (function () {
    var sec = document.querySelector('.outcome--plan');
    if (!sec || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var svg = sec.querySelector('.bpx'), plate = sec.querySelector('.outcome__plate');
    if (!svg || !plate) return;
    var wide = window.matchMedia('(min-width: 961px)');
    var ps = 0, raf = 0;
    function clamp(v) { return Math.max(0, Math.min(1, v)); }
    function progress() {
      var vh = window.innerHeight;
      if (sec.classList.contains('is-pinned')) {
        /* from the section top at half the screen to the end of the held screen */
        var top = sec.getBoundingClientRect().top, run = sec.offsetHeight - vh;
        return clamp((vh * 0.5 - top) / (vh * 0.5 + run));
      }
      /* phones and tablets: while the plate travels from low on the screen to near the top */
      return clamp((vh * 0.82 - plate.getBoundingClientRect().top) / (vh * 0.74));
    }
    /* skip repaints too small to see: the plan redraws as a whole, so fewer is smoother on phones */
    var shown = -1;
    function paint() {
      if (Math.abs(ps - shown) < 0.0008 && ps !== 0 && ps !== 1) return;
      shown = ps;
      svg.style.setProperty('--p', ps.toFixed(4));
      sec.classList.toggle('is-built', ps > 0.995);
    }
    function tick() {
      raf = 0;
      var p = progress();
      ps += (p - ps) * 0.14;
      if (Math.abs(p - ps) < 0.0005) ps = p;
      paint();
      if (ps !== p) raf = requestAnimationFrame(tick);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(tick); }
    function setPin() { sec.classList.toggle('is-pinned', wide.matches); }
    setPin();
    sec.classList.add('is-plan');
    ps = progress(); paint();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    if (wide.addEventListener) wide.addEventListener('change', function () { setPin(); kick(); });
  })();

  /* ---------- Board strips: laid in once, as they arrive ----------
     Each range's strip of boards is laid left to right the first time it comes into view.
     Only strips still below the screen are held back; reduced motion: shown as they are. */
  (function () {
    var strips = Array.prototype.slice.call(document.querySelectorAll('.range__boards'));
    if (!strips.length) return;
    /* a strip waiting to be laid is clipped, and native lazy loading reads a clipped photo
       as off screen, so the boards are fetched here as their strip approaches */
    function fetchBoards(el) { el.querySelectorAll('img').forEach(function (img) { img.loading = 'eager'; }); }
    if (!('IntersectionObserver' in window)) { strips.forEach(fetchBoards); return; }
    var early = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { fetchBoards(e.target); early.unobserve(e.target); } });
    }, { rootMargin: '800px 0px' });
    strips.forEach(function (el) { early.observe(el); });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-laid');
        io.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    strips.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add('is-set');
      io.observe(el);
    });
  })();

  /* ---------- Railing & Lighting hero: night falls as you scroll ----------
     The two generated night frames are only requested once the real day photo has arrived,
     so they never slow the first picture down, and both are decoded before they are used.
     The stage then stays on screen for about a screen of scrolling while the garden falls
     dark and the deck lighting comes up, scroll by scroll; scrolling back brings the day back.
     A stage taller than the screen (phones) scrolls to its foot first, then holds. Reduced
     motion: no holding, the night simply fades up once it is ready. If either frame fails,
     the real day photo stays. */
  (function () {
    var hero = document.querySelector('.page-hero--dusk');
    if (!hero) return;
    var stage = hero.querySelector('.dusk__stage');
    var media = hero.querySelector('.hero__media');
    var day = hero.querySelector('.dusk__day');
    var dark = hero.querySelector('.dusk__dark'), lit = hero.querySelector('.dusk__lit'), ai = hero.querySelector('.dusk__ai');
    var frames = [dark, lit].filter(Boolean);
    if (!stage || !media || !day || frames.length < 2) return;
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ready = false, run = 0, lead = 0, raf = 0, width = 0;
    function ramp(p, a, b) { return Math.min(1, Math.max(0, (p - a) / (b - a))); }
    function paint() {
      raf = 0;
      if (!run) return;
      var p = Math.min(1, Math.max(0, (-hero.getBoundingClientRect().top - lead) / run));
      var d = ready ? ramp(p, 0.08, 0.55) : 0, l = ready ? ramp(p, 0.5, 0.92) : 0;
      dark.style.opacity = d.toFixed(3);
      lit.style.opacity = l.toFixed(3);
      if (ai) ai.style.opacity = Math.min(1, d * 4).toFixed(3);
      media.style.transform = 'scale(' + (1.06 - 0.06 * p).toFixed(4) + ')';
    }
    function kick() { if (!raf) raf = requestAnimationFrame(paint); }
    /* the hold lasts about a screen; only a change of width re-measures, because a phone's
       toolbar folding away changes the height mid-scroll */
    function measure() {
      var vh = window.innerHeight, sh = stage.offsetHeight;
      width = window.innerWidth;
      lead = Math.max(0, sh - vh);
      run = Math.round(vh * 1.2);
      stage.style.setProperty('--stage-top', Math.min(0, vh - sh) + 'px');
      hero.style.height = (sh + run) + 'px';
      kick();
    }
    if (!still) {
      hero.classList.add('is-scroll');
      measure();
      window.addEventListener('scroll', kick, { passive: true });
      var resizeTimer = 0;
      window.addEventListener('resize', function () {
        if (window.innerWidth === width) return;
        clearTimeout(resizeTimer); resizeTimer = setTimeout(measure, 150);
      });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    }
    function fetchNight() {
      frames.forEach(function (img) {
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        if (img.dataset.src) img.src = img.dataset.src;
      });
      function go() { ready = true; hero.classList.add('is-ready'); kick(); }
      if (!frames[0].decode) { go(); return; }
      Promise.all(frames.map(function (img) { return img.decode(); })).then(go).catch(function () {});
    }
    if (day.complete && day.naturalWidth) fetchNight();
    else {
      day.addEventListener('load', fetchNight, { once: true });
      day.addEventListener('error', fetchNight, { once: true });
    }
  })();

  /* ---------- Page heroes: the title rises line by line as the page opens ----------
     Each word of an inner page's title sits in a clipped slot and rises into it; words on
     one line move together and each line follows the one above. Reduced motion: as is. */
  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.page-hero .hero__title').forEach(function (el) {
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function (node) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          var slot = document.createElement('span'); slot.className = 'm-slot';
          var word = document.createElement('span'); word.className = 'm-word'; word.textContent = part;
          slot.appendChild(word); frag.appendChild(slot);
        });
        node.parentNode.replaceChild(frag, node);
      });
      var top = null, line = -1;
      el.querySelectorAll('.m-slot').forEach(function (sl) {
        var t = Math.round(sl.getBoundingClientRect().top);
        if (top === null || Math.abs(t - top) > 4) { line++; top = t; }
        sl.style.setProperty('--line', line);
      });
      el.classList.add('m-lines', 'm-lines--hero');
      requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('is-shown'); }); });
    });
  })();

  /* ---------- Gallery chapters (Our Work) ----------
     Every photo group is a chapter. A small index floats at the foot of the screen while
     the gallery is in view: the current chapter, a brass line showing progress through the
     gallery, and a list to jump to any chapter. */
  (function () {
    var main = document.querySelector('.gallery-page');
    if (!main) return;
    var secs = Array.prototype.slice.call(main.querySelectorAll(':scope > section.section'));
    var heads = secs.map(function (s) { return s.querySelector('.heading'); });
    if (secs.length < 2 || heads.some(function (h) { return !h || !h.id; })) return;
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var total = pad(secs.length);
    var nav = document.createElement('nav');
    nav.className = 'chapters'; nav.setAttribute('aria-label', 'Gallery chapters');
    nav.innerHTML =
      '<ol class="chapters__list" id="chapters-list" hidden>' +
      heads.map(function (h, i) { return '<li><a href="#' + h.id + '"><span class="chapters__n">' + pad(i + 1) + '</span><span>' + h.textContent.replace(/</g, '&lt;') + '</span></a></li>'; }).join('') +
      '</ol>' +
      '<button class="chapters__toggle" type="button" aria-expanded="false" aria-controls="chapters-list">' +
      '<span class="chapters__count"><span class="chapters__now">01</span><span aria-hidden="true"> / </span><span class="visually-hidden"> of </span>' + total + '</span>' +
      '<span class="chapters__name">' + heads[0].textContent.replace(/</g, '&lt;') + '</span>' +
      '<span class="chapters__icon" aria-hidden="true"></span>' +
      '<span class="chapters__bar" aria-hidden="true"><span></span></span>' +
      '</button>';
    document.body.appendChild(nav);
    var toggle = nav.querySelector('.chapters__toggle'), list = nav.querySelector('.chapters__list');
    var nowEl = nav.querySelector('.chapters__now'), nameEl = nav.querySelector('.chapters__name');
    var bar = nav.querySelector('.chapters__bar > span');
    var links = Array.prototype.slice.call(list.querySelectorAll('a'));
    var current = -1, ticking = false;

    function open(on) {
      list.hidden = !on;
      toggle.setAttribute('aria-expanded', String(on));
      nav.classList.toggle('is-open', on);
    }
    toggle.addEventListener('click', function () { open(list.hidden); });
    links.forEach(function (a) {
      a.addEventListener('click', function () { open(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !list.hidden) { open(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) { if (!list.hidden && !nav.contains(e.target)) open(false); });

    function update() {
      ticking = false;
      var vh = window.innerHeight;
      var first = secs[0].getBoundingClientRect(), last = secs[secs.length - 1].getBoundingClientRect();
      /* shown from the first chapter reaching mid-screen until the last one has gone */
      var visible = first.top < vh * 0.6 && last.bottom > vh * 0.4;
      nav.classList.toggle('is-visible', visible);
      if (!visible && !list.hidden) open(false);
      var idx = 0;
      secs.forEach(function (sec, i) { if (sec.getBoundingClientRect().top < vh * 0.45) idx = i; });
      if (idx !== current) {
        current = idx;
        nowEl.textContent = pad(idx + 1);
        nameEl.textContent = heads[idx].textContent;
        links.forEach(function (a, i) { if (i === idx) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      }
      var span = last.bottom - first.top - vh;
      var p = span > 0 ? Math.max(0, Math.min(1, -first.top / span)) : 1;
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  })();

  /* ---------- Motion: headings rise line by line, then the words around them ----------
     With motion allowed, each word of a section heading sits in a clipped slot and rises
     into it; words on one line move together and each line follows the one above, like
     boards being laid. Paragraphs, lists and cards then fade up in reading order. Text
     stays real text, and only things still below the first screen are touched, so nothing
     visible ever blinks out and back. */
  (function () {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var own = '.hero, .page-hero, .lens, .sheet, .reviews__stage, .colours__groups, .years, .menu, .footer, .lightbox, [data-words]';
    var headingSel = '.heading, .close__title, .page-title, .reel__heading, .detail__title';
    var textSel = '.section-head__text, .split__text, .story__text, .story__more, .intro__body > p, .close__text, .close__actions, .page-lead, .detail__lead, .outcome__detail, .intro .trexmark';
    var itemSel = '.features > li, .steps > li, .facts-row > div, .faq > details, .related > li, .compare__card, .ranges__list > .range, .reel__grid > li, .work__cats > li, .shots:not(.shots--carousel) > .shot, .detail__spec > div, .contact__details > div, .notice__list > li';
    var below = function (el) { return el.getBoundingClientRect().top > window.innerHeight; };

    function split(el) {
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      var nodes = [];
      while (walker.nextNode()) if (!walker.currentNode.parentNode.closest('svg')) nodes.push(walker.currentNode);
      nodes.forEach(function (node) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          var slot = document.createElement('span');
          slot.className = 'm-slot';
          var word = document.createElement('span');
          word.className = 'm-word';
          word.textContent = part;
          slot.appendChild(word);
          frag.appendChild(slot);
        });
        node.parentNode.replaceChild(frag, node);
      });
      el.classList.add('m-lines');
    }
    /* number the lines as laid out right now, just before the heading rises */
    function lineUp(el) {
      var top = null, line = -1;
      el.querySelectorAll('.m-slot').forEach(function (s) {
        var t = Math.round(s.getBoundingClientRect().top);
        if (top === null || Math.abs(t - top) > 4) { line++; top = t; }
        s.style.setProperty('--line', line);
      });
    }
    /* once faded in, hand the element back to its own transitions (hover states etc.) */
    function settle(el) {
      el.addEventListener('transitionend', function end(e) {
        if (e.target !== el || e.propertyName !== 'transform') return;
        el.removeEventListener('transitionend', end);
        el.classList.remove('m-fade', 'is-shown');
        el.style.removeProperty('--d');
      });
    }

    var io = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; });
      batch.sort(function (a, b) { return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1; });
      var n = 0;
      batch.forEach(function (el) {
        io.unobserve(el);
        if (el.classList.contains('m-lines')) lineUp(el);
        else {
          /* text after a heading waits for its first line; items in a row follow each other */
          var base = el.classList.contains('m-text') ? 160 : 0;
          el.style.setProperty('--d', (base + Math.min(n, 6) * 80) + 'ms');
          n++;
          settle(el);
        }
        el.classList.add('is-shown');
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    document.querySelectorAll(headingSel).forEach(function (el) {
      if (el.closest(own) || !below(el)) return;
      split(el);
      io.observe(el);
    });
    [[textSel, 'm-text'], [itemSel, 'm-item']].forEach(function (pair) {
      document.querySelectorAll(pair[0]).forEach(function (el) {
        if (el.closest(own) || !below(el)) return;
        el.classList.add('m-fade', pair[1]);
        io.observe(el);
      });
    });
  })();

  /* ---------- Timeline: split-flap year board ----------
     Desktop with motion allowed: the section pins and the board rolls through every
     year as you scroll, slowing into each chapter year and holding there while its
     story is read. Each digit flips on its hinge only when it changes. Everywhere
     else the chapters are a static list and the board is not shown. */
  (function () {
    var sec = document.querySelector(".years");
    if (!sec) return;
    var chapters = Array.prototype.slice.call(sec.querySelectorAll(".years__chapter"));
    var nav = sec.querySelector(".years__nav");
    var buttons = nav ? Array.prototype.slice.call(nav.querySelectorAll("button")) : [];
    var caption = sec.querySelector(".years__caption-text");
    var cells = Array.prototype.slice.call(sec.querySelectorAll(".flip"));
    var years = chapters.map(function (c) {
      var y = parseInt(c.querySelector(".years__chapter-year").textContent, 10);
      return isNaN(y) ? new Date().getFullYear() : y;
    });
    var N = chapters.length;
    var mq = window.matchMedia("(min-width: 961px) and (prefers-reduced-motion: no-preference)");
    var ROLL = 0.6;            /* share of each step spent rolling; the rest holds on the chapter */
    var LEAD = 0.35, TAIL = 0.5; /* holds before the first roll and after the last */
    var ticking = false, current = -1, shown = years[0];
    /* the rail under the years: a track from the first year to the last, a brass fill
       that follows the scroll, and a dot on each year */
    var rail = null, fill = null, centres = [];
    if (nav && buttons.length) {
      rail = document.createElement("span"); rail.className = "years__rail"; rail.setAttribute("aria-hidden", "true");
      fill = document.createElement("span"); fill.className = "years__fill";
      rail.appendChild(fill);
      nav.insertBefore(rail, nav.firstChild);
    }
    function measure() {
      if (!rail || nav.hidden) return;
      var left = nav.getBoundingClientRect().left;
      centres = buttons.map(function (b) { var r = b.getBoundingClientRect(); return r.left - left + r.width / 2; });
      rail.style.left = centres[0] + "px";
      rail.style.width = (centres[centres.length - 1] - centres[0]) + "px";
    }
    function railTo(s) {
      if (!fill || centres.length < 2) return;
      var i = Math.min(centres.length - 2, Math.floor(s)), u = Math.min(1, s - i);
      var x = centres[i] + (centres[i + 1] - centres[i]) * u - centres[0];
      fill.style.transform = "scaleX(" + (x / (centres[centres.length - 1] - centres[0])).toFixed(4) + ")";
      buttons.forEach(function (b, n) { b.classList.toggle("is-passed", n <= s + 0.001); });
    }

    /* ---- one card ---- */
    function Flip(el) {
      this.el = el;
      this.digit = el.dataset.digit;
      this.parts = {
        top: el.querySelector(".flip__half--top > span"),
        bottom: el.querySelector(".flip__half--bottom > span"),
        flapTop: el.querySelector(".flip__flap--top"),
        flapBottom: el.querySelector(".flip__flap--bottom")
      };
      this.anims = [];
      this.last = 0;
      this.gen = 0;
    }
    Flip.prototype.set = function (d) {
      var p = this.parts;
      p.top.textContent = p.bottom.textContent = d;
      p.flapTop.firstChild.textContent = p.flapBottom.firstChild.textContent = d;
      p.flapTop.classList.remove("is-flipping"); p.flapBottom.classList.remove("is-flipping");
      this.digit = d;
    };
    /* settle instantly on one digit: both halves agree, no flaps showing */
    Flip.prototype.rest = function () {
      this.anims.forEach(function (a) { a.cancel(); });
      this.anims = [];
      this.set(this.digit);
    };
    Flip.prototype.to = function (d) {
      if (d === this.digit) return;
      /* an interrupted flip settles on what it was showing before the next one starts,
         and its late callbacks are ignored, so the halves can never disagree */
      this.rest();
      var gen = ++this.gen;
      var p = this.parts, from = this.digit, self = this;
      var now = performance.now();
      /* fast scrolling shortens each flip so the board keeps up, like a real fast-running board */
      var dur = Math.max(110, Math.min(460, (now - this.last) * 0.9));
      this.last = now;
      this.digit = d;
      p.top.textContent = d;                         /* behind the falling flap: the new top */
      p.bottom.textContent = from;                   /* still showing until the flap lands */
      p.flapTop.firstChild.textContent = from;
      p.flapBottom.firstChild.textContent = d;
      p.flapTop.classList.add("is-flipping");
      var a1 = p.flapTop.animate([{ transform: "rotateX(0deg)" }, { transform: "rotateX(-90deg)" }],
        { duration: dur * 0.5, easing: "cubic-bezier(0.55, 0, 1, 0.45)", fill: "forwards" });
      this.anims = [a1];
      a1.onfinish = function () {
        if (gen !== self.gen) return;
        p.flapTop.classList.remove("is-flipping");
        p.flapBottom.classList.add("is-flipping");
        var a2 = p.flapBottom.animate(
          [{ transform: "rotateX(90deg)" }, { transform: "rotateX(-8deg)", offset: 0.82 }, { transform: "rotateX(0deg)" }],
          { duration: dur * 0.5, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" });
        self.anims = [a1, a2];
        a2.onfinish = function () {
          if (gen !== self.gen) return;
          self.rest();
        };
      };
    };
    var flips = cells.map(function (el) { return new Flip(el); });

    function showYear(y) {
      if (y === shown) return;
      shown = y;
      var s = String(y);
      flips.forEach(function (f, i) { f.to(s[i]); });
    }

    /* scroll position -> (fractional) step through the chapters */
    function stepAt(p) {
      var span = LEAD + (N - 1) + TAIL;
      return Math.max(0, Math.min(N - 1, p * span - LEAD));
    }
    function easeOut(u) { return 1 - Math.pow(1 - u, 3); }

    function update() {
      ticking = false;
      if (!sec.classList.contains("is-pinned")) return;
      var r = sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var run = sec.offsetHeight - window.innerHeight;
      var s = stepAt(Math.max(0, Math.min(1, -r.top / run)));
      railTo(s);
      var i = Math.min(N - 2, Math.floor(s));
      var u = s - i;
      var year, idx;
      if (s >= N - 1) { year = years[N - 1]; idx = N - 1; }
      else if (u < ROLL) {
        year = Math.round(years[i] + (years[i + 1] - years[i]) * easeOut(u / ROLL));
        idx = year >= years[i + 1] ? i + 1 : i;
      } else { year = years[i + 1]; idx = i + 1; }
      showYear(year);
      if (idx !== current) {
        current = idx;
        chapters.forEach(function (c, n) {
          c.classList.toggle("is-current", n === idx);
          c.setAttribute("aria-hidden", String(n !== idx));
        });
        buttons.forEach(function (b, n) {
          if (n === idx) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
        });
        if (caption) caption.textContent = idx === N - 1 ? "Today" : chapters[idx].querySelector("h3").textContent;
      }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

    function mode() {
      var on = mq.matches;
      sec.classList.toggle("is-pinned", on);
      if (nav) nav.hidden = !on;
      current = -1;
      if (on) {
        flips.forEach(function (f, i) { f.digit = String(years[0])[i]; f.rest(); });
        shown = years[0];
        measure();
        update();
        return;
      }
      chapters.forEach(function (c) { c.classList.remove("is-current"); c.removeAttribute("aria-hidden"); });
    }

    buttons.forEach(function (b, n) {
      b.addEventListener("click", function () {
        var run = sec.offsetHeight - window.innerHeight;
        var span = LEAD + (N - 1) + TAIL;
        /* land just after the roll, on the held chapter */
        var s = n === 0 ? 0 : n - 1 + ROLL + 0.1;
        var p = (s + LEAD) / span;
        window.scrollTo({ top: sec.getBoundingClientRect().top + window.scrollY + p * run, behavior: "smooth" });
      });
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () { measure(); onScroll(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); onScroll(); });
    if (mq.addEventListener) mq.addEventListener("change", mode); else mq.addListener(mode);
    mode();
  })();

  /* ---------- Pencil mark: drawn once when its heading comes into view ---------- */
  document.querySelectorAll("[data-mark]").forEach(function (el) {
    if (!("IntersectionObserver" in window)) { el.classList.add("is-marked"); return; }
    var io = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { el.classList.add("is-marked"); io.disconnect(); }
    }, { threshold: 1, rootMargin: "0px 0px -15% 0px" });
    io.observe(el);
  });

  /* ---------- Chronicle: rolling year counter (About) ----------
     Scroll position maps to a year. Between two entries the counter holds on the
     first milestone for a moment, then rolls through every year to the next, the
     digits turning like an odometer (a digit only turns when the ones carry).
     Reduced motion: the year changes to each milestone without rolling. */
  (function () {
    var box = document.querySelector('.chronicle');
    if (!box) return;
    var items = Array.prototype.slice.call(box.querySelectorAll('.timeline--chronicle > li, .years__chapters > li'));
    var strips = Array.prototype.slice.call(box.querySelectorAll('.odo__strip'));
    var now = box.querySelector('.chronicle__now');
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var years = items.map(function (li) {
      var t = li.querySelector('.timeline__year, .years__chapter-year').textContent.trim();
      return /^\d{4}$/.test(t) ? +t : new Date().getFullYear();
    });
    var titles = items.map(function (li) { return li.querySelector('h3').textContent.trim(); });
    var tops = [], active = -1, shown = -1, ticking = false;

    function measure() {
      tops = items.map(function (li) { return li.getBoundingClientRect().top + window.scrollY; });
      update();
    }
    function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
    function setDigits(v) {
      var n = Math.floor(v), f = v - n;
      for (var k = 0; k < 4; k++) {
        var p = Math.pow(10, 3 - k);                 /* thousands, hundreds, tens, ones */
        var d = Math.floor(n / p) % 10;
        var pos = (p === 1 || n % p === p - 1) ? d + f : d;
        strips[k].style.transform = 'translateY(' + (-pos) + 'em)';
      }
    }
    function update() {
      ticking = false;
      var line = window.scrollY + window.innerHeight * 0.45;
      var i = 0;
      while (i < tops.length - 1 && line >= tops[i + 1]) i++;
      var v = years[i];
      if (line > tops[i] && i < tops.length - 1) {
        var frac = (line - tops[i]) / (tops[i + 1] - tops[i]);
        var roll = Math.min(1, Math.max(0, (frac - 0.35) / 0.65));
        v = years[i] + (years[i + 1] - years[i]) * ease(roll);
      }
      if (still) v = years[i];
      setDigits(v);
      var run = tops[tops.length - 1] - tops[0];
      box.style.setProperty('--chron', run > 0 ? Math.max(0, Math.min(1, (line - tops[0]) / run)).toFixed(4) : '0');
      if (i !== active) {
        active = i;
        items.forEach(function (li, n) { li.classList.toggle('is-active', n === i); });
        if (i !== shown) {
          shown = i;
          if (still) { now.textContent = titles[i]; return; }
          now.classList.add('is-swapping');
          setTimeout(function () { now.textContent = titles[shown]; now.classList.remove('is-swapping'); }, 200);
        }
      }
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    measure();
  })();

  /* ---------- Range lens (homepage) ----------
     ARIA tabs with arrow-key roving focus. Switching runs inside a view transition
     when available, after the incoming photos have decoded, so the tiles glide from
     one arrangement to the next instead of blinking. */
  (function () {
    var lens = document.querySelector('.lens');
    if (!lens) return;
    var tabs = Array.prototype.slice.call(lens.querySelectorAll('.lens__tab'));
    var ink = lens.querySelector('.lens__ink');
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function placeInk(tab) {
      ink.style.setProperty('--ink-x', tab.offsetLeft + 'px');
      ink.style.setProperty('--ink-w', tab.offsetWidth + 'px');
    }
    /* photos for every range are fetched as the section approaches, so a switch is instant */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e, o) {
        if (!e[0].isIntersecting) return;
        lens.querySelectorAll('img').forEach(function (img) { img.loading = 'eager'; });
        o.disconnect();
      }, { rootMargin: '1800px 0px' }).observe(lens);
    }
    function apply(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      placeInk(tab);
    }
    function select(tab) {
      if (tab.getAttribute('aria-selected') === 'true') return;
      var panel = document.getElementById(tab.getAttribute('aria-controls'));
      var imgs = Array.prototype.slice.call(panel.querySelectorAll('img'));
      if (still || !document.startViewTransition) { apply(tab); return; }
      /* give the incoming photos a moment to be ready, but never hold the tab up: any
         still on their way simply fade in when they arrive */
      var ready = Promise.all(imgs.map(function (i) { return i.decode ? i.decode().catch(function () {}) : null; }));
      var wait = new Promise(function (r) { setTimeout(r, 350); });
      Promise.race([ready, wait]).then(function () {
        /* the page-to-page fade is switched off for this in-page transition */
        document.documentElement.classList.add('vt-lens');
        var vt = document.startViewTransition(function () { apply(tab); });
        vt.finished.then(done, done);
        function done() { document.documentElement.classList.remove('vt-lens'); }
      });
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (e) {
        var to = null;
        if (e.key === 'ArrowRight') to = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') to = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') to = tabs[0];
        if (e.key === 'End') to = tabs[tabs.length - 1];
        if (!to) return;
        e.preventDefault(); to.focus(); select(to);
      });
    });
    placeInk(tabs[0]);
    window.addEventListener('resize', function () { placeInk(lens.querySelector('.lens__tab[aria-selected="true"]')); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { placeInk(lens.querySelector('.lens__tab[aria-selected="true"]')); });
  })();

  /* ---------- Contact sheet drift (homepage work) ----------
     Each column scrolls by a few pixels a second, alternate columns opposite ways,
     wrapping at the height of one run so the loop is seamless. Constant speed, run as
     one endless animation per column on the compositor, so the page does no work per
     frame (it matters on a phone). Pauses under a mouse or keyboard focus, while it is
     off screen or the tab is hidden; reduced motion: no drift, the photos sit as a
     still grid. */
  (function () {
    var sheet = document.querySelector('.sheet');
    if (!sheet) return;
    /* photos drift in from outside the clipped sheet, so fetch them all as it approaches */
    new IntersectionObserver(function (e, o) {
      if (!e[0].isIntersecting) return;
      sheet.querySelectorAll('img').forEach(function (img) { img.loading = 'eager'; });
      o.disconnect();
    }, { rootMargin: '800px 0px' }).observe(sheet);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var cols = Array.prototype.slice.call(sheet.querySelectorAll('.sheet__col'));
    var speeds = [14, 11, 16, 12, 15];                   /* px per second */
    if (!cols.length || !cols[0].animate) return;
    var state = cols.map(function (col, i) {
      /* start the columns part-way so the sheet opens full */
      return { col: col, run: col.querySelector('.sheet__run'), h: 0, anim: null, y0: (i * 97) % 300, v: speeds[i % speeds.length] * (col.dataset.dir === 'down' ? -1 : 1) };
    });
    var visible = false, held = false;
    /* one loop per column, rebuilt only when a run's height changes (a narrower screen
       hides columns and resizes the photos); the loop keeps its place across a rebuild */
    function build() {
      state.forEach(function (s) {
        var h = s.run.offsetHeight;
        if (h === s.h) return;
        var y = s.y0;
        if (s.anim) {
          var d = s.anim.effect.getTiming().duration, f = (s.anim.currentTime % d) / d;
          y = (s.v > 0 ? f : 1 - f) * s.h;
          s.anim.cancel(); s.anim = null;
        }
        s.h = h;
        if (!h) return;
        var top = 'translate3d(0,0,0)', end = 'translate3d(0,' + (-h) + 'px,0)';
        var dur = h / Math.abs(s.v) * 1000;
        s.anim = s.col.animate(s.v > 0 ? [{ transform: top }, { transform: end }] : [{ transform: end }, { transform: top }], { duration: dur, iterations: Infinity });
        s.anim.currentTime = (s.v > 0 ? (y % h) / h : 1 - (y % h) / h) * dur;
      });
      run();
    }
    function run() {
      var go = visible && !held && !document.hidden;
      state.forEach(function (s) {
        if (!s.anim) return;
        if (go && s.anim.playState !== 'running') s.anim.play();
        if (!go && s.anim.playState === 'running') s.anim.pause();
      });
    }
    build();
    var resizeTimer = 0;
    window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 150); });
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; run(); }).observe(sheet);
    /* only a mouse pauses it on hover: a thumb on a phone scrolls past, and iOS can
       leave a touch "hovering" long after the finger has gone */
    sheet.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { held = true; run(); } });
    sheet.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { held = false; run(); } });
    /* keyboard focus pauses it (a moving target is hard to follow with a focus ring); the
       focus a tap leaves behind, or the photo viewer returns, does not */
    function keyboardFocus(el) { try { return el.matches(':focus-visible'); } catch (x) { return false; } }
    sheet.addEventListener('focusin', function (e) { if (keyboardFocus(e.target)) { held = true; run(); } });
    sheet.addEventListener('focusout', function (e) { if (!sheet.contains(e.relatedTarget) || !keyboardFocus(e.relatedTarget)) { held = false; run(); } });
    document.addEventListener('visibilitychange', run);
  })();

  /* ---------- Info notes ((i) beside a label) ----------
     Click toggles the note; with a mouse, hovering the (i) also shows it, placed off
     to the right of the button, and it stays while the pointer is over the button or the note.
     A click pins it open until it is closed, Escape is pressed or the page is clicked. */
  document.querySelectorAll('.info-btn[popovertarget]').forEach(function (btn) {
    var pop = document.getElementById(btn.getAttribute('popovertarget'));
    if (!pop || typeof pop.showPopover !== 'function') return;
    var hoverable = window.matchMedia('(hover: hover) and (pointer: fine)');
    var pinned = false, timer = null;
    btn.removeAttribute('popovertarget');
    /* managed by hand so a click on the (i) while it is already showing pins it rather
       than closing and reopening; outside clicks and Escape still close it */
    pop.setAttribute('popover', 'manual');
    document.addEventListener('pointerdown', function (e) {
      if (pop.matches(':popover-open') && !pop.contains(e.target) && !btn.contains(e.target)) pop.hidePopover();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && pop.matches(':popover-open')) { pop.hidePopover(); btn.focus(); }
    });
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', pop.id);
    function place() {
      if (!hoverable.matches) { pop.classList.remove('is-anchored'); pop.style.left = pop.style.top = ''; return; }
      pop.classList.add('is-anchored');
      var r = btn.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight, pad = 16;
      /* off to the right of the (i), its title level with it; below it if there is no room */
      var left = r.right + 12, top = r.top + r.height / 2 - 18;
      if (left + w > window.innerWidth - pad) { left = Math.min(Math.max(pad, r.left - 12), window.innerWidth - w - pad); top = r.bottom + 10; }
      top = Math.min(Math.max(pad, top), window.innerHeight - h - pad);
      pop.style.left = left + 'px'; pop.style.top = top + 'px';
    }
    function open() { clearTimeout(timer); if (!pop.matches(':popover-open')) pop.showPopover(); place(); }
    function close() { if (pop.matches(':popover-open')) pop.hidePopover(); }
    pop.addEventListener('toggle', function (e) {
      var isOpen = e.newState === 'open';
      btn.setAttribute('aria-expanded', String(isOpen));
      if (!isOpen) pinned = false;
    });
    btn.addEventListener('click', function () {
      if (pinned) { close(); return; }
      pinned = true; open();
    });
    function leave() { if (!pinned) { clearTimeout(timer); timer = setTimeout(close, 200); } }
    btn.addEventListener('mouseenter', function () { if (hoverable.matches) open(); });
    btn.addEventListener('mouseleave', leave);
    pop.addEventListener('mouseenter', function () { clearTimeout(timer); });
    pop.addEventListener('mouseleave', leave);
    window.addEventListener('resize', function () { if (pop.matches(':popover-open')) place(); });
    window.addEventListener('scroll', function () { if (pop.matches(':popover-open') && pop.classList.contains('is-anchored')) place(); }, { passive: true });
  });

  /* ---------- Blueprint: draw when seen ---------- */
  document.querySelectorAll('.bp').forEach(function (bp) {
    if (!('IntersectionObserver' in window)) { bp.classList.add('is-drawn'); return; }
    var io = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { bp.classList.add('is-drawn'); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(bp);
  });

  /* ---------- Credentials ticker (homepage hero, phones) ----------
     On a phone the credentials run as one line drifting slowly sideways at a constant
     speed (one endless animation on the compositor, so the page does no work per frame),
     looping seamlessly: the line is
     held twice, the copy hidden from assistive tech and the tab order. Holding a finger
     on it pauses it, a tap stops or restarts it, and it rests off screen, in a
     background tab and under keyboard focus. Wider screens, reduced motion or no
     script: the plain list. */
  (function () {
    var line = document.querySelector('.hero__foot .credentials');
    if (!line) return;
    var phone = window.matchMedia('(max-width: 600px)');
    var still = window.matchMedia('(prefers-reduced-motion: reduce)');
    var items = Array.prototype.slice.call(line.children);
    var STAR = '<svg class="ticker__star" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M6 .8l1.53 3.3 3.6.42-2.67 2.46.71 3.56L6 8.77 2.83 10.54l.71-3.56L.87 4.52l3.6-.42z" fill="currentColor"/></svg>';
    var SPEED = 28;                                     /* px per second */
    var track = null, runA = null, anim = null, width = 0;
    var visible = !('IntersectionObserver' in window), held = false, stopped = false;

    /* one run's width per loop at SPEED; rebuilt (keeping its place) when the width
       changes, as it does once the web fonts arrive */
    function measure() {
      if (!track || !track.animate) return;
      var w = runA.offsetWidth;
      if (!w || w === width) return;
      var f = 0;
      if (anim) { var d = anim.effect.getTiming().duration; f = (anim.currentTime % d) / d; anim.cancel(); }
      width = w;
      var dur = w / SPEED * 1000;
      anim = track.animate([{ transform: 'translate3d(0,0,0)' }, { transform: 'translate3d(' + (-w) + 'px,0,0)' }], { duration: dur, iterations: Infinity });
      anim.currentTime = f * dur;
      run();
    }
    function run() {
      if (!anim) return;
      var go = !!track && visible && !held && !stopped && !document.hidden;
      if (go && anim.playState !== 'running') anim.play();
      if (!go && anim.playState === 'running') anim.pause();
    }
    function build() {
      if (track) return;
      track = document.createElement('span'); track.className = 'ticker__track';
      runA = document.createElement('span'); runA.className = 'ticker__run';
      items.forEach(function (el) { runA.appendChild(el); });
      var link = runA.querySelector('a'); if (link) link.insertAdjacentHTML('afterbegin', STAR);
      var runB = runA.cloneNode(true);
      runB.setAttribute('aria-hidden', 'true');
      runB.querySelectorAll('a').forEach(function (a) { a.tabIndex = -1; });
      track.appendChild(runA); track.appendChild(runB);
      line.appendChild(track); line.classList.add('credentials--ticker');
      width = 0; measure();
    }
    function unbuild() {
      if (!track) return;
      if (anim) { anim.cancel(); anim = null; width = 0; }
      runA.querySelectorAll('.ticker__star').forEach(function (s) { s.remove(); });
      items.forEach(function (el) { line.appendChild(el); });
      track.remove(); track = runA = null;
      line.classList.remove('credentials--ticker');
    }
    function sync() { if (phone.matches && !still.matches) build(); else unbuild(); }

    /* hold to pause; a quick tap (not on the reviews link) stops it until tapped again */
    var downAt = 0, sx = 0, sy = 0, moved = false;
    line.addEventListener('pointerdown', function (e) {
      if (!track) return;
      held = true; moved = false; downAt = Date.now(); sx = e.clientX; sy = e.clientY; run();
    });
    line.addEventListener('pointermove', function (e) {
      if (held && (Math.abs(e.clientX - sx) > 8 || Math.abs(e.clientY - sy) > 8)) moved = true;
    });
    function release(e) {
      if (!held) return;
      held = false;
      if (e.type === 'pointerup' && !moved && Date.now() - downAt < 350 && !(e.target.closest && e.target.closest('a'))) stopped = !stopped;
      run();
    }
    line.addEventListener('pointerup', release);
    line.addEventListener('pointercancel', release);
    line.addEventListener('pointerleave', release);
    line.addEventListener('focusin', function (e) {
      var kb = false; try { kb = e.target.matches(':focus-visible'); } catch (err) {}
      if (kb) { held = true; run(); }
    });
    line.addEventListener('focusout', function () { held = false; run(); });

    if (!visible) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; run(); }).observe(line);
    document.addEventListener('visibilitychange', run);
    [phone, still].forEach(function (mq) { if (mq.addEventListener) mq.addEventListener('change', sync); else mq.addListener(sync); });
    window.addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    sync();
  })();

  /* ---------- Photo carousel (phones) ----------
     The arrows step one photo at a time and the counter follows whatever is in view,
     whether reached by swiping or by the buttons. */
  document.querySelectorAll('.shots--carousel').forEach(function (track) {
    var wrap = track.parentElement;
    var prev = wrap.querySelector('.carousel__prev'), next = wrap.querySelector('.carousel__next');
    var idx = wrap.querySelector('.carousel__index'), total = wrap.querySelector('.carousel__total');
    var items = Array.prototype.slice.call(track.children);
    if (!prev || !next || !items.length) return;
    total.textContent = items.length;
    /* the photos beyond the edge are only reached by swiping, so fetch them as the
       carousel approaches rather than waiting for each swipe */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e, o) {
        if (!e[0].isIntersecting) return;
        track.querySelectorAll('img').forEach(function (img) { img.loading = 'eager'; });
        o.disconnect();
      }, { rootMargin: '800px 0px' }).observe(track);
    }
    function current() {
      var left = track.getBoundingClientRect().left, best = 0, dist = Infinity;
      items.forEach(function (it, i) { var d = Math.abs(it.getBoundingClientRect().left - left - parseFloat(getComputedStyle(track).paddingLeft)); if (d < dist) { dist = d; best = i; } });
      return best;
    }
    function update() {
      var i = current();
      idx.textContent = i + 1;
      prev.disabled = i === 0; next.disabled = i === items.length - 1;
    }
    /* the brass line follows the strip exactly, frame by frame */
    var bar = wrap.querySelector('.carousel__bar > span'), barRaf = 0;
    function paintBar() {
      barRaf = 0;
      var room = track.scrollWidth - track.clientWidth;
      if (bar) bar.style.transform = 'scaleX(' + (room > 0 ? Math.min(1, track.scrollLeft / room) : 1).toFixed(4) + ')';
    }
    if (bar) track.addEventListener('scroll', function () { if (!barRaf) barRaf = requestAnimationFrame(paintBar); }, { passive: true });
    /* with a mouse the strip can be dragged; a drag never opens a photo */
    var drag = null, dragged = false;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft }; dragged = false;
    });
    window.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x;
      if (!dragged && Math.abs(dx) < 6) return;
      if (!dragged) { dragged = true; track.classList.add('is-dragging'); }
      track.scrollLeft = drag.left - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!drag) return;
      drag = null;
      if (dragged) { track.classList.remove('is-dragging'); go(current()); }
    });
    track.addEventListener('click', function (e) {
      if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; }
    }, true);
    track.addEventListener('dragstart', function (e) { e.preventDefault(); });
    function go(i) {
      i = Math.max(0, Math.min(items.length - 1, i));
      track.scrollTo({ left: items[i].offsetLeft - items[0].offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
    prev.addEventListener('click', function () { go(current() - 1); });
    next.addEventListener('click', function () { go(current() + 1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
    });
    var t = null;
    track.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(update, 60); }, { passive: true });
    window.addEventListener('resize', function () { update(); paintBar(); });
    update(); paintBar();
  });

  /* ---------- Photo lightbox ----------
     Any .shot__open button opens the full-size photo in a modal dialog. Arrow keys
     and the on-screen buttons step through every photo on the page; Escape, the close
     button or a click on the dark surround closes it and focus returns to the photo. */
  (function () {
    var box = document.querySelector('.lightbox');
    var opens = Array.prototype.slice.call(document.querySelectorAll('.shot__open:not([data-dup]), .optrow__see'));
    if (!box || !opens.length || typeof box.showModal !== 'function') return;
    /* the viewer image is created on demand so the page never ships an <img> without a src */
    var img = document.createElement('img');
    img.className = 'lightbox__img';
    img.alt = '';
    box.querySelector('.lightbox__figure').prepend(img);
    var text = box.querySelector('.lightbox__text');
    var count = box.querySelector('.lightbox__count');
    var at = 0;
    function show(i) {
      at = (i + opens.length) % opens.length;
      var b = opens[at], thumb = b.querySelector('img');
      var alt = b.dataset.alt || (thumb ? thumb.alt : '');
      img.src = b.dataset.full;
      img.width = Number(b.dataset.w); img.height = Number(b.dataset.h);
      img.alt = alt;
      text.textContent = alt;
      count.textContent = (at + 1) + ' / ' + opens.length;
      /* restart the entrance */
      img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
    }
    opens.forEach(function (b, i) {
      b.addEventListener('click', function () { show(i); box.showModal(); box.querySelector('.lightbox__btn--close').focus(); });
    });
    /* a looped copy opens its original (its photo's place among the originals) */
    document.querySelectorAll('.shot__open[data-dup]').forEach(function (b) {
      b.addEventListener('click', function () {
        var src = b.dataset.full, i = 0;
        opens.forEach(function (o, n) { if (o.dataset.full === src) i = n; });
        show(i); box.showModal(); box.querySelector('.lightbox__btn--close').focus();
      });
    });
    box.querySelector('.lightbox__btn--prev').addEventListener('click', function () { show(at - 1); });
    box.querySelector('.lightbox__btn--next').addEventListener('click', function () { show(at + 1); });
    box.querySelector('.lightbox__btn--close').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(at - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(at + 1); }
    });
    box.addEventListener('close', function () { opens[at].focus({ preventScroll: true }); });
  })();

  /* ---------- Film posters, fetched as their film approaches ----------
     A video's poster downloads with the page wherever the film sits, so films further
     down hold theirs in data-poster until they come within reach of the screen. */
  (function () {
    var vids = Array.prototype.slice.call(document.querySelectorAll('video[data-poster]'));
    if (!vids.length) return;
    function give(v) { if (!v.getAttribute('poster')) v.setAttribute('poster', v.dataset.poster); }
    if (!('IntersectionObserver' in window)) { vids.forEach(give); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { give(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '1000px 0px' });
    vids.forEach(function (v) { io.observe(v); });
  })();

  /* ---------- Screening room (homepage films) ----------
     One screen and an index of three films. On a desktop with motion allowed the films
     play silently in turn while the screen is in view, each for up to nine seconds, the
     brass line over its title counting the time; as the screen arrives the room dims and
     a beam sweeps once. Choosing a title moves the screen to that film. The play control
     plays the current film from the start with sound and its own controls; the silent run
     waits until it ends. Phones, reduced motion or data saving: nothing plays or
     downloads until asked, and the index simply changes the film. */
  document.querySelectorAll('[data-screen]').forEach(function (screen) {
    var films = Array.prototype.slice.call(screen.querySelectorAll('.screen__film'));
    var picks = Array.prototype.slice.call(screen.querySelectorAll('.screen__pick'));
    var glows = Array.prototype.slice.call(screen.querySelectorAll('.screen__glows img'));
    var sound = screen.querySelector('.screen__sound');
    var now = screen.querySelector('.screen__now');
    var reel = screen.closest('.reel');
    if (!films.length || !sound) return;
    var conn = navigator.connection || {};
    var quiet = window.matchMedia('(prefers-reduced-motion: reduce)').matches || conn.saveData || /2g/.test(conn.effectiveType || '');
    var hasIO = 'IntersectionObserver' in window;
    var auto = !quiet && hasIO && window.matchMedia('(min-width: 961px)').matches;
    var STEP = 9;
    var at = 0, inView = false, chosen = false, resume = 0;

    function vid(i) { return films[i].querySelector('video'); }
    function load(v) { if (!v.src && v.dataset.src) v.src = v.dataset.src; }
    function show(i) {
      at = (i + films.length) % films.length;
      films.forEach(function (f, n) { f.classList.toggle('is-active', n === at); });
      glows.forEach(function (g, n) { g.classList.toggle('is-active', n === at); });
      picks.forEach(function (p, n) {
        p.classList.toggle('is-active', n === at);
        p.setAttribute('aria-pressed', String(n === at));
        p.style.setProperty('--p', '0');
      });
      sound.setAttribute('aria-controls', vid(at).id);
      if (now) now.textContent = picks[at].querySelector('.screen__title').textContent;
    }
    function stop(except) {
      films.forEach(function (f, n) {
        if (n === except) return;
        var v = vid(n); v.pause(); v.controls = false; v.muted = true;
      });
    }
    function silent() {
      if (!auto || chosen || !inView || document.hidden) return;
      var v = vid(at);
      load(v);
      v.muted = true; v.controls = false;
      try { v.currentTime = 0; } catch (e) {}
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    }
    function next() { stop(-1); show(at + 1); silent(); }

    films.forEach(function (f, n) {
      var v = vid(n);
      v.addEventListener('timeupdate', function () {
        if (n !== at) return;
        var len = chosen ? v.duration : Math.min(v.duration || STEP, STEP);
        if (len) picks[n].style.setProperty('--p', Math.min(1, v.currentTime / len).toFixed(4));
        if (!chosen && auto && v.currentTime >= STEP) next();
      });
      v.addEventListener('ended', function () {
        if (n !== at) return;
        if (chosen) {
          chosen = false;
          screen.classList.remove('is-playing');
          v.controls = false; v.muted = true;
          sound.focus({ preventScroll: true });
          clearTimeout(resume);
          resume = setTimeout(next, 1200);
        } else if (auto) next();
      });
    });
    picks.forEach(function (p, n) {
      p.addEventListener('click', function () {
        clearTimeout(resume);
        chosen = false;
        screen.classList.remove('is-playing');
        stop(-1);
        show(n);
        /* with no silent run (phones), choosing a title plays that film, with sound */
        if (auto) silent(); else sound.click();
      });
    });
    sound.addEventListener('click', function () {
      clearTimeout(resume);
      var v = vid(at);
      stop(at);
      document.querySelectorAll('video').forEach(function (other) { if (!screen.contains(other)) other.pause(); });
      load(v);
      chosen = true;
      screen.classList.add('is-playing');
      try { v.currentTime = 0; } catch (e) {}
      v.muted = false; v.loop = false; v.controls = true;
      var p = v.play();
      if (p && p.catch) p.catch(function () { v.muted = true; v.play(); });
      v.focus();
    });
    show(0);
    if (hasIO) {
      new IntersectionObserver(function (e) {
        inView = e[0].isIntersecting;
        if (inView) { if (reel) reel.classList.add('is-lit'); silent(); }
        else if (!chosen) stop(-1);
        else vid(at).pause(); /* a film playing with sound stops once its screen has left the page */
      }, { threshold: 0.35 }).observe(screen.querySelector('.screen__stage'));
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (!chosen) stop(-1); } else silent();
    });
  });

  /* ---------- Site clips ----------
     Every clip: loads only near the screen; pressing play starts it from the top
     with sound and native controls, and pauses every other clip.
     The homepage reel adds a projector: as the band arrives the room dims, a beam
     sweeps once, and the films play silently in turn, the playing one lit and the
     others waiting in the dark. A chosen film takes over; when it ends the sequence
     resumes. Reduced motion or data saving: no sequence, click to play only. */
  (function () {
    var clips = Array.prototype.slice.call(document.querySelectorAll(".clip"));
    if (!clips.length) return;
    var conn = navigator.connection || {};
    var quiet = window.matchMedia("(prefers-reduced-motion: reduce)").matches || conn.saveData || /2g/.test(conn.effectiveType || "");
    var hasIO = "IntersectionObserver" in window;
    var chosen = null;

    function load(v) { if (!v.src && v.dataset.src) v.src = v.dataset.src; }
    function vid(clip) { return clip.querySelector("video"); }

    /* ---- the reel sequence ---- */
    var reel = document.querySelector(".reel");
    var grid = reel && reel.querySelector(".reel__grid");
    var seq = grid ? Array.prototype.slice.call(grid.querySelectorAll(".clip")) : [];
    /* the self-playing sequence is a desktop moment: on phones nothing downloads until a
       film is tapped, so a mobile visitor never pays for footage they did not ask for */
    var wide = window.matchMedia("(min-width: 961px)").matches;
    var seqOn = !!(seq.length && !quiet && hasIO && wide);
    var at = 0, inView = false, resumeTimer = null, stepTimer = null;
    var STEP = 3000; /* each film is shown for three seconds before the next takes over */

    function light(i) {
      seq.forEach(function (c, n) { c.classList.toggle("is-on", n === i); });
    }
    function runSeq(i) {
      if (!seqOn || chosen || !inView || document.hidden) return;
      at = (i + seq.length) % seq.length;
      seq.forEach(function (c, n) { if (n !== at) vid(c).pause(); });
      grid.classList.add("is-sequencing");
      light(at);
      var v = vid(seq[at]);
      load(v);
      v.muted = true; v.loop = false; v.controls = false;
      try { v.currentTime = 0; } catch (e) {}
      var p = v.play(); if (p && p.catch) p.catch(function () {});
      clearTimeout(stepTimer);
      stepTimer = setTimeout(function () { runSeq(at + 1); }, STEP);
    }
    function pauseSeq() { clearTimeout(stepTimer); if (!chosen) seq.forEach(function (c) { vid(c).pause(); }); }

    if (seqOn) {
      new IntersectionObserver(function (e) {
        inView = e[0].isIntersecting;
        if (inView) {
          reel.classList.add("is-lit");
          runSeq(at);
        } else pauseSeq();
      }, { threshold: 0.3 }).observe(grid);
      document.addEventListener("visibilitychange", function () { if (document.hidden) pauseSeq(); else runSeq(at); });
      seq.forEach(function (c) {
        var v = vid(c), bar = c.querySelector(".clip__progress");
        v.addEventListener("timeupdate", function () {
          /* the brass line counts down the three-second turn, or the whole film once chosen */
          var len = chosen === c ? v.duration : Math.min(v.duration || STEP / 1000, STEP / 1000);
          if (bar && len) bar.style.setProperty("--p", Math.min(1, v.currentTime / len).toFixed(4));
        });
      });
    }

    /* ---- every clip ---- */
    clips.forEach(function (clip) {
      var video = vid(clip);
      var play = clip.querySelector(".clip__play");
      /* nothing downloads until a film actually plays: the poster and the printed length
         are enough to choose by */

      play.addEventListener("click", function () {
        clearTimeout(resumeTimer);
        clearTimeout(stepTimer);
        clips.forEach(function (other) {
          if (other === clip) return;
          var ov = vid(other);
          ov.pause();
          if (other.classList.contains("is-playing")) { other.classList.remove("is-playing"); ov.controls = false; }
        });
        chosen = clip;
        if (seq.indexOf(clip) >= 0) { at = seq.indexOf(clip); if (seqOn) { grid.classList.add("is-sequencing"); light(at); } }
        load(video);
        try { video.currentTime = 0; } catch (e) {}
        video.muted = false;
        video.loop = false;
        video.controls = true;
        var p = video.play();
        clip.classList.add("is-playing");
        if (p && p.catch) p.catch(function () { video.muted = true; video.play(); });
        video.focus();
      });

      video.addEventListener("ended", function () {
        if (chosen === clip) {
          chosen = null;
          clip.classList.remove("is-playing");
          video.controls = false;
          try { video.currentTime = 0; } catch (e) {}
          play.focus({ preventScroll: true });
          if (seq.indexOf(clip) >= 0) resumeTimer = setTimeout(function () { runSeq(at + 1); }, 1200);
        } else if (seqOn && seq.indexOf(clip) === at) {
          runSeq(at + 1);
        }
      });
      /* a chosen film paused by its own controls simply stays paused; the sequence waits */
      /* a film playing with sound stops once it has left the screen */
      if (hasIO) new IntersectionObserver(function (e) { if (!e[0].isIntersecting && chosen === clip) video.pause(); }).observe(clip);
    });
  })();

  /* ---------- Colour preview (one per .colours block) ----------
     A new board is laid across the plate along its grain, left to right,
     with a brass edge leading it. */
  document.querySelectorAll(".colours").forEach(function (block) {
    var swatches = Array.prototype.slice.call(block.querySelectorAll(".swatch"));
    var plate = block.querySelector(".colours__plate");
    var img = plate && plate.querySelector("img");
    var nameEl = block.querySelector(".colours__name");
    var rangeEl = block.querySelector(".colours__range");
    var laying = null;

    function finishLaying() {
      if (!laying) return;
      img.src = laying.img.src;
      img.alt = laying.img.alt;
      laying.img.remove();
      laying.edge.remove();
      laying = null;
    }

    function lay(src, alt) {
      finishLaying();
      var next = new Image();
      next.className = "colours__incoming";
      next.alt = alt;
      next.onload = function () {
        var edge = document.createElement("span");
        edge.className = "colours__edge";
        edge.setAttribute("aria-hidden", "true");
        plate.appendChild(next);
        plate.appendChild(edge);
        laying = { img: next, edge: edge };
        next.addEventListener("animationend", finishLaying, { once: true });
      };
      next.src = src;
    }

    function select(btn) {
      if (btn.getAttribute("aria-pressed") === "true") return;
      swatches.forEach(function (s) { s.setAttribute("aria-pressed", String(s === btn)); });
      var d = btn.dataset;
      if (img) lay(d.src, "Trex " + d.range + " board in " + d.name);
      if (nameEl) nameEl.textContent = d.name;
      if (rangeEl) {
        rangeEl.textContent = d.range;
        /* a colour with a note (Island Mist is currently exclusive) shows it quietly under the range */
        if (d.note) {
          var note = document.createElement("span");
          note.className = "colours__note";
          note.textContent = d.note;
          rangeEl.appendChild(document.createTextNode(" "));
          rangeEl.appendChild(note);
        }
      }
    }

    swatches.forEach(function (btn, i) {
      if (!btn.hasAttribute("aria-pressed")) btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", function () { select(btn); });
      /* arrow keys walk the whole lineup */
      btn.addEventListener("keydown", function (e) {
        var step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!step) return;
        e.preventDefault();
        var to = swatches[(i + step + swatches.length) % swatches.length];
        to.focus();
        select(to);
      });
    });

  });

  /* ---------- Reviews (one per .reviews__stage) ---------- */
  document.querySelectorAll(".reviews__stage").forEach(function (stage) {
    var reviews = stage.querySelectorAll(".review");
    var scope = stage.closest(".reviews") || stage;
    var countEl = scope.querySelector(".reviews__index");
    var current = 0;
    if (!reviews.length) return;
    /* a brass rule under the controls fills a step for each review read */
    var controls = scope.querySelector(".reviews__controls");
    var bar = null;
    if (controls) {
      bar = document.createElement("span");
      bar.className = "reviews__bar"; bar.setAttribute("aria-hidden", "true");
      bar.appendChild(document.createElement("span"));
      controls.insertAdjacentElement("afterend", bar);
    }
    function show(i, dir) {
      var prev = reviews[current];
      current = (i + reviews.length) % reviews.length;
      stage.style.setProperty("--review-in", (dir < 0 ? -32 : 32) + "px");
      stage.classList.toggle("is-back", dir < 0);
      reviews.forEach(function (r, n) {
        r.classList.remove("is-leaving");
        r.classList.toggle("is-active", n === current);
        r.setAttribute("aria-hidden", String(n !== current));
      });
      if (dir && prev !== reviews[current]) prev.classList.add("is-leaving");
      if (countEl) countEl.textContent = current + 1;
      if (bar) bar.firstChild.style.transform = "scaleX(" + ((current + 1) / reviews.length).toFixed(4) + ")";
    }
    show(0, 0);
    scope.querySelector(".reviews__prev").addEventListener("click", function () { show(current - 1, -1); });
    scope.querySelector(".reviews__next").addEventListener("click", function () { show(current + 1, 1); });
  });
})();
