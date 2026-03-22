/* ═══════════════════════════════════════════════════
   PREMIUM PORTFOLIO — SCRIPT.JS
   Full upgrade: cursor, particles, parallax, tilt,
   magnetic buttons, ripple, smooth reveal, timeline
═══════════════════════════════════════════════════ */

/* ── PAGE LOADER ─────────────────────────────────── */
(function () {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('done'), 1400);
  });
})();

/* ── PARTICLE CANVAS ─────────────────────────────── */
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [], mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initPts() {
    pts = [];
    const n = Math.min(Math.floor((W * H) / 14000), 100);
    for (let i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.4,
        o: Math.random() * 0.55 + 0.2,
        hue: Math.random() > 0.7 ? 280 : 190
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0,229,255,${0.09 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      /* mouse attraction */
      const mdx = mouse.x - pts[i].x, mdy = mouse.y - pts[i].y;
      const md = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 160) {
        pts[i].x += mdx * 0.012;
        pts[i].y += mdy * 0.012;
      }

      ctx.beginPath();
      ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
      const c = pts[i].hue === 280 ? `rgba(124,92,252,${pts[i].o})` : `rgba(0,229,255,${pts[i].o})`;
      ctx.fillStyle = c;
      ctx.fill();

      pts[i].x += pts[i].vx;
      pts[i].y += pts[i].vy;
      if (pts[i].x < 0 || pts[i].x > W) pts[i].vx *= -1;
      if (pts[i].y < 0 || pts[i].y > H) pts[i].vy *= -1;
    }
    requestAnimationFrame(draw);
  }

  resize(); initPts(); draw();
  window.addEventListener('resize', () => { resize(); initPts(); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
})();

/* ── CUSTOM CURSOR ───────────────────────────────── */
(function () {
  if (window.innerWidth <= 768) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let cx = -100, cy = -100;
  let rx = -100, ry = -100;

  function moveCursor(e) {
    cx = e.clientX; cy = e.clientY;
    dot.style.left = cx + 'px';
    dot.style.top = cy + 'px';
  }

  function animRing() {
    rx += (cx - rx) * 0.1;
    ry += (cy - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }

  document.addEventListener('mousemove', moveCursor);
  animRing();

  /* hover state on interactive elements */
  const interactives = 'a, button, .btn, .pc-link, .ct-lnk, .chip, .hsoc, .ftr-soc, .skill-c, .stat-c, input, textarea, .nav-cta';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  /* Global cursor glow */
  const glow = document.createElement('div');
  glow.className = 'global-glow';
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();

/* ── ORBS (ambient bg) ───────────────────────────── */
(function () {
  const layer = document.createElement('div');
  layer.className = 'orb-layer';
  [1, 2, 3].forEach(i => {
    const orb = document.createElement('div');
    orb.className = `orb orb-${i}`;
    layer.appendChild(orb);
  });
  document.body.insertBefore(layer, document.body.firstChild);
})();

/* ── TYPING EFFECT ──────────────────────────────── */
(function () {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const words = ['Full Stack Developer', 'Frontend Engineer', 'UI/UX Enthusiast', 'React Learner'];
  let wi = 0, ci = 0, deleting = false, pause = 0;

  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ci++);
      if (ci > word.length) { deleting = true; pause = 60; }
    } else {
      pause--;
      if (pause <= 0) {
        el.textContent = word.slice(0, ci--);
        if (ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; pause = 0; }
      }
    }
    setTimeout(tick, deleting && pause > 0 ? 40 : deleting ? 55 : 80);
  }
  setTimeout(tick, 1600);
})();

/* ── NAVBAR ─────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const s = window.scrollY;
  navbar.classList.toggle('scrolled', s > 50);
  /* hide on scroll down, show on scroll up */
  if (s > 200 && s > lastScroll) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
  lastScroll = s;
  updateActiveNav();
}, { passive: true });

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mob.classList.toggle('open');
});

function closeMob() {
  ham.classList.remove('open');
  mob.classList.remove('open');
}

/* ── ACTIVE NAV + SLIDING INDICATOR ─────────────── */
const allSections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let cur = '';
  allSections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navAs.forEach(a => {
    const isActive = a.getAttribute('href') === '#' + cur;
    a.classList.toggle('active', isActive);
  });
}

/* ── BUTTON RIPPLE ───────────────────────────────── */
document.querySelectorAll('.btn, .form-submit-btn, .nav-cta').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 560);
  });
});

/* ── MOUSE PARALLAX (hero + grid layer) ─────────── */
(function () {
  if (window.innerWidth <= 768) return;
  const gridLayer = document.querySelector('.grid-layer');
  const heroRight = document.querySelector('.hero-right');

  window.addEventListener('mousemove', e => {
    const nx = (e.clientX / window.innerWidth - 0.5);
    const ny = (e.clientY / window.innerHeight - 0.5);

    if (gridLayer) {
      gridLayer.style.transform = `translate(${nx * 12}px, ${ny * 12}px)`;
    }
    if (heroRight) {
      heroRight.style.transform = `translate(${nx * -10}px, ${ny * -8}px)`;
    }
  }, { passive: true });
})();

/* ── PROFILE IMAGE 3D TILT ON MOUSE ─────────────── */
(function () {
  if (window.innerWidth <= 768) return;
  const wrap = document.querySelector('.profile-wrap');
  if (!wrap) return;
  const MAX = 14;

  document.querySelector('#hero').addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (window.innerWidth / 2);
    const dy = (e.clientY - cy) / (window.innerHeight / 2);
    const rx = dy * MAX;
    const ry = -dx * MAX;
    wrap.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
    wrap.style.transition = 'transform 0.08s linear';
  });

  document.querySelector('#hero').addEventListener('mouseleave', () => {
    wrap.style.transform = '';
    wrap.style.transition = 'transform 0.8s cubic-bezier(0.22,1,0.36,1)';
  });
})();

/* ── PROJECT CARD 3D TILT ────────────────────────── */
document.querySelectorAll('[data-tilt]').forEach(card => {
  const inner = card.querySelector('.pc-inner');
  const MAX = 12;

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    inner.style.transform = `perspective(900px) rotateX(${dy * MAX}deg) rotateY(${-dx * MAX}deg) translateZ(10px)`;
    inner.style.transition = 'transform 0.07s linear';

    /* move bg rx/ry for cursor highlight */
    card.style.setProperty('--rx', ((e.clientX - rect.left) / rect.width * 100) + '%');
    card.style.setProperty('--ry', ((e.clientY - rect.top) / rect.height * 100) + '%');
  });

  card.addEventListener('mouseleave', () => {
    inner.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
    inner.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
  });
});

/* ── MAGNETIC BUTTONS ────────────────────────────── */
(function () {
  if (window.innerWidth <= 768) return;

  document.querySelectorAll('.btn-prim, .btn-sec, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;
      this.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
      this.style.transition = 'transform 0.1s linear';
      /* set ripple position */
      this.style.setProperty('--rx', ((e.clientX - rect.left) / rect.width * 100) + '%');
      this.style.setProperty('--ry', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });

    btn.addEventListener('mouseleave', function () {
      this.style.transform = '';
      this.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s';
    });
  });
})();

/* ── SCROLL REVEAL (enhanced) ────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');

      /* skill bars */
      const fill = e.target.querySelector('.sk-fill');
      if (fill) {
        const lvl = e.target.getAttribute('data-level') || '0';
        setTimeout(() => { fill.style.width = lvl + '%'; }, 200);
      }

      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-scale').forEach(el => revealObs.observe(el));

/* ── EDUCATION TIMELINE ANIMATION ───────────────── */
const eduObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      /* grow timeline line */
      const timeline = e.target.closest('.edu-timeline');
      if (timeline) timeline.classList.add('vis');

      /* stagger dots and cards */
      const items = document.querySelectorAll('.edu-item');
      items.forEach((item, i) => {
        setTimeout(() => item.classList.add('vis'), i * 250);
      });

      eduObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.edu-timeline').forEach(el => eduObs.observe(el));

/* ── INPUT FOCUS ICON ────────────────────────────── */
document.querySelectorAll('.form-field input, .form-field textarea').forEach(inp => {
  inp.addEventListener('focus', () => {
    const ico = inp.parentElement.querySelector('.input-ico');
    if (ico) ico.style.color = 'var(--accent)';
  });
  inp.addEventListener('blur', () => {
    const ico = inp.parentElement.querySelector('.input-ico');
    if (ico) ico.style.color = '';
  });
});

/* ── CONTACT FORM ────────────────────────────────── */
function handleForm() {
  const name = document.getElementById('f-name');
  const email = document.getElementById('f-email');
  const msg = document.getElementById('f-msg');
  const btn = document.querySelector('.form-submit-btn');
  const success = document.getElementById('form-success');
  let valid = true;

  function clearErr(input, errId) {
    input.classList.remove('err');
    const err = document.getElementById(errId);
    if (err) { err.classList.remove('show'); }
  }
  function setErr(input, errId) {
    input.classList.add('err');
    const err = document.getElementById(errId);
    if (err) { err.classList.add('show'); }
    valid = false;
  }

  clearErr(name, 'err-name');
  clearErr(email, 'err-email');
  clearErr(msg, 'err-msg');

  if (!name.value.trim()) setErr(name, 'err-name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) setErr(email, 'err-email');
  if (!msg.value.trim()) setErr(msg, 'err-msg');

  if (!valid) return;

  btn.disabled = true;
  btn.classList.add('loading');
  document.getElementById('btn-text').textContent = 'Sending...';

  /* inject spinner */
  let spinner = btn.querySelector('.btn-spinner');
  if (!spinner) {
    spinner = document.createElement('span');
    spinner.className = 'btn-spinner';
    btn.insertBefore(spinner, btn.firstChild);
  }

  setTimeout(() => {
    btn.disabled = false;
    btn.classList.remove('loading');
    document.getElementById('btn-text').textContent = 'Send Message →';
    spinner.remove();

    success.classList.add('show');
    name.value = ''; email.value = ''; msg.value = '';
    setTimeout(() => success.classList.remove('show'), 5500);
  }, 1600);
}

/* ── STAGGER HERO CHILDREN ───────────────────────── */
(function () {
  document.querySelectorAll('.hero-left > *').forEach((el, i) => {
    if (!el.style.animationDelay) return;
  });
})();

/* ── COUNTER ANIMATION (stat numbers) ───────────── */
(function () {
  /* If any stat has a number, animate it — future-proof */
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.getAttribute('data-count'));
      let current = 0;
      const step = Math.ceil(target / 50);
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (el.getAttribute('data-suffix') || '');
        if (current >= target) clearInterval(interval);
      }, 30);
      cObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => cObs.observe(el));
})();

/* ── SECTION CLIP-PATH TITLE REVEAL ─────────────── */
(function () {
  const headings = document.querySelectorAll('h2.sec-h');
  const hObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.animation = 'heading-reveal 0.9s cubic-bezier(0.22,1,0.36,1) forwards';
      hObs.unobserve(e.target);
    });
  }, { threshold: 0.2 });

  /* inject keyframe once */
  if (!document.getElementById('heading-kf')) {
    const style = document.createElement('style');
    style.id = 'heading-kf';
    style.textContent = `
      @keyframes heading-reveal {
        from { clip-path: inset(0 100% 0 0); opacity: 0.1; }
        to   { clip-path: inset(0 0% 0 0);   opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  headings.forEach(h => {
    /* start hidden until observed */
    h.style.clipPath = 'inset(0 100% 0 0)';
    h.style.opacity = '0.1';
    hObs.observe(h);
  });
})();

/* ── SMOOTH SCROLL ───────────────────────────────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── "VIEW PROJECT" CURSOR FOLLOW ON PROJECT CARDS ── */
(function () {
  if (window.innerWidth <= 768) return;

  const label = document.createElement('div');
  Object.assign(label.style, {
    position: 'fixed',
    padding: '0.45rem 0.85rem',
    background: 'var(--accent)',
    color: '#010e14',
    fontFamily: 'var(--mono)',
    fontSize: '0.68rem',
    fontWeight: '700',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    borderRadius: '100px',
    pointerEvents: 'none',
    zIndex: '9996',
    opacity: '0',
    transform: 'translate(-50%,-50%) scale(0.8)',
    transition: 'opacity 0.2s, transform 0.2s cubic-bezier(0.22,1,0.36,1)',
    whiteSpace: 'nowrap',
  });
  label.textContent = '↗ View Project';
  document.body.appendChild(label);

  let lx = 0, ly = 0;

  document.querySelectorAll('.pc').forEach(card => {
    card.addEventListener('mouseenter', () => {
      label.style.opacity = '1';
      label.style.transform = 'translate(-50%,-50%) scale(1)';
    });
    card.addEventListener('mouseleave', () => {
      label.style.opacity = '0';
      label.style.transform = 'translate(-50%,-50%) scale(0.8)';
    });
    card.addEventListener('mousemove', e => {
      lx += (e.clientX - lx) * 0.18;
      ly += (e.clientY - ly) * 0.18;
      label.style.left = lx + 'px';
      label.style.top = ly + 'px';
    });
  });

  /* smooth follow */
  function follow() {
    requestAnimationFrame(follow);
  }
  follow();
})();

/* ── FLOATING SKILL ICONS PULSE ──────────────────── */
(function () {
  document.querySelectorAll('.sk-ico i').forEach((ico, i) => {
    ico.style.animationDelay = (i * 0.15) + 's';
  });
})();

/* ── ADD PAGE LOADER TO DOM IF MISSING ───────────── */
(function () {
  if (!document.querySelector('.page-loader')) {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
      <div class="loader-logo">Shobhit <span>Asthana</span></div>
      <div class="loader-bar"><div class="loader-bar-fill"></div></div>
    `;
    document.body.insertBefore(loader, document.body.firstChild);

    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('done'), 1400);
    });
  }
})();

/* ── PROFILE BADGE TOOLTIP ───────────────────────── */
(function () {
  const badge = document.querySelector('.profile-badge');
  if (!badge) return;
  badge.title = 'Open to frontend / React opportunities';
})();