/* Beams & Braces homepage: nav, menu, scroll unveil, colours, reviews */
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var menu = document.getElementById('menu');
  var menuButton = document.getElementById('menuButton');

  /* ---------- Nav turns solid once the hero is behind it ---------- */
  function updateNav() {
    nav.classList.toggle('is-solid', document.body.classList.contains('page--solid') || window.scrollY > 40);
  }
  if (nav) {
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
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
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    update();
  });

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
    window.addEventListener("resize", onScroll);
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
      }, { rootMargin: '600px 0px' }).observe(lens);
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
      Promise.all(imgs.map(function (i) { return i.decode ? i.decode().catch(function () {}) : null; })).then(function () {
        document.startViewTransition(function () { apply(tab); });
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
     wrapping at the height of one run so the loop is seamless. Constant speed, so it
     is driven per frame rather than by an easing curve. Pauses under a mouse or
     keyboard focus, while it is off screen or the tab is hidden; reduced
     motion: no drift, the photos sit as a still grid. */
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
    var state = cols.map(function (col, i) {
      return { col: col, run: col.querySelector('.sheet__run'), y: 0, v: speeds[i % speeds.length] * (col.dataset.dir === 'down' ? -1 : 1) };
    });
    var visible = false, held = false, last = 0, raf = 0;
    function frame(t) {
      var dt = last ? Math.min(64, t - last) / 1000 : 0; last = t;
      state.forEach(function (s) {
        var h = s.run.offsetHeight; if (!h) return;
        s.y = (s.y + s.v * dt) % h; if (s.y < 0) s.y += h;
        s.col.style.transform = 'translate3d(0,' + (-s.y).toFixed(2) + 'px,0)';
      });
      raf = requestAnimationFrame(frame);
    }
    function run() {
      var go = visible && !held && !document.hidden;
      if (go && !raf) { last = 0; raf = requestAnimationFrame(frame); }
      if (!go && raf) { cancelAnimationFrame(raf); raf = 0; }
    }
    /* start the downward columns part-way so the sheet opens full */
    state.forEach(function (s, i) { s.y = (i * 97) % 300; s.col.style.transform = 'translate3d(0,' + (-s.y) + 'px,0)'; });
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
     speed (driven per frame, not by an easing curve), looping seamlessly: the line is
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
    var track = null, runA = null, x = 0, last = 0, raf = 0;
    var visible = !('IntersectionObserver' in window), held = false, stopped = false;

    function frame(t) {
      var dt = last ? Math.min(64, t - last) / 1000 : 0; last = t;
      var w = runA.offsetWidth;
      if (w) { x = (x + SPEED * dt) % w; track.style.transform = 'translate3d(' + (-x).toFixed(2) + 'px,0,0)'; }
      raf = requestAnimationFrame(frame);
    }
    function run() {
      var go = !!track && visible && !held && !stopped && !document.hidden;
      if (go && !raf) { last = 0; raf = requestAnimationFrame(frame); }
      if (!go && raf) { cancelAnimationFrame(raf); raf = 0; }
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
      x = 0; run();
    }
    function unbuild() {
      if (!track) return;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
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
    sync();
  })();

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
      if (rangeEl) rangeEl.textContent = d.range;
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
    function show(i, dir) {
      var prev = reviews[current];
      current = (i + reviews.length) % reviews.length;
      stage.style.setProperty("--review-in", (dir < 0 ? -32 : 32) + "px");
      reviews.forEach(function (r, n) {
        r.classList.remove("is-leaving");
        r.classList.toggle("is-active", n === current);
        r.setAttribute("aria-hidden", String(n !== current));
      });
      if (dir && prev !== reviews[current]) prev.classList.add("is-leaving");
      if (countEl) countEl.textContent = current + 1;
    }
    show(0, 0);
    scope.querySelector(".reviews__prev").addEventListener("click", function () { show(current - 1, -1); });
    scope.querySelector(".reviews__next").addEventListener("click", function () { show(current + 1, 1); });
  });
})();
