
    //  JAVASCRIPT


/* ── PARTICLE CANVAS ─────────────────────────────── */
(function(){
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, pts = [], raf;

  function resize(){
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initPts(){
    pts = [];
    const n = Math.min(Math.floor((W * H) / 16000), 90);
    for(let i = 0; i < n; i++){
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.5 + 0.2
      });
    }
  }

  function draw(){
    ctx.clearRect(0, 0, W, H);
    /* connections */
    for(let i = 0; i < pts.length; i++){
      for(let j = i + 1; j < pts.length; j++){
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 130){
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0,229,255,${0.07 * (1 - dist/130)})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }
    /* dots */
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(0,229,255,${p.o})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0 || p.x > W) p.vx *= -1;
      if(p.y < 0 || p.y > H) p.vy *= -1;
    });
    raf = requestAnimationFrame(draw);
  }

  resize(); initPts(); draw();
  window.addEventListener('resize', () => { resize(); initPts(); });
})();

/* ── TYPING EFFECT ──────────────────────────────── */
(function(){
  const el    = document.getElementById('typing-text');
  const words = ['Full Stack Developer', 'Frontend Engineer', 'UI/UX Enthusiast', 'React Learner'];
  let wi = 0, ci = 0, deleting = false, pause = 0;

  function tick(){
    const word = words[wi];
    if(!deleting){
      el.textContent = word.slice(0, ci++);
      if(ci > word.length){ deleting = true; pause = 60; }
    } else {
      pause--;
      if(pause <= 0){
        el.textContent = word.slice(0, ci--);
        if(ci < 0){ deleting = false; wi = (wi + 1) % words.length; ci = 0; pause = 0; }
      }
    }
    setTimeout(tick, deleting && pause > 0 ? 40 : deleting ? 55 : 80);
  }
  setTimeout(tick, 1000);
})();

/* ── NAVBAR ─────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const ham    = document.getElementById('hamburger');
const mob    = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mob.classList.toggle('open');
});

function closeMob(){
  ham.classList.remove('open');
  mob.classList.remove('open');
}

/* ── ACTIVE NAV ─────────────────────────────────── */
const allSections = document.querySelectorAll('section[id]');
const navAs       = document.querySelectorAll('.nav-links a');

function updateActiveNav(){
  let cur = '';
  allSections.forEach(s => {
    if(window.scrollY >= s.offsetTop - 100) cur = s.id;
  });
  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
}

/* ── SCROLL REVEAL ──────────────────────────────── */
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('vis');
      /* skill bar */
      const fill = e.target.querySelector('.sk-fill');
      if(fill){
        const lvl = e.target.getAttribute('data-level') || '0';
        setTimeout(() => { fill.style.width = lvl + '%'; }, 150);
      }
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ── CURSOR GLOW ────────────────────────────────── */
if(window.innerWidth > 1024){
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position:'fixed', width:'420px', height:'420px',
    borderRadius:'50%', pointerEvents:'none', zIndex:'0',
    background:'radial-gradient(circle,rgba(0,229,255,0.035) 0%,transparent 70%)',
    transform:'translate(-50%,-50%)',
    transition:'left 0.8s cubic-bezier(0.2,0,0,1), top 0.8s cubic-bezier(0.2,0,0,1)'
  });
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ── CONTACT FORM ───────────────────────────────── */
function handleForm(){
  const name    = document.getElementById('f-name');
  const email   = document.getElementById('f-email');
  const msg     = document.getElementById('f-msg');
  const btn     = document.querySelector('.form-submit-btn');
  const success = document.getElementById('form-success');

  let valid = true;

  function clearErr(input, errId){
    input.classList.remove('err');
    document.getElementById(errId).classList.remove('show');
  }
  function setErr(input, errId){
    input.classList.add('err'); input.classList.remove('err');
    input.classList.add('err');
    document.getElementById(errId).classList.add('show');
    valid = false;
  }

  clearErr(name,'err-name'); clearErr(email,'err-email'); clearErr(msg,'err-msg');

  if(!name.value.trim())  setErr(name,'err-name');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) setErr(email,'err-email');
  if(!msg.value.trim())   setErr(msg,'err-msg');

  if(!valid) return;

  btn.disabled = true;
  document.getElementById('btn-text').textContent = 'Sending...';

  setTimeout(() => {
    btn.disabled = false;
    document.getElementById('btn-text').textContent = 'Send Message →';
    success.classList.add('show');
    name.value = ''; email.value = ''; msg.value = '';
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1200);
}

/* ── 3D TILT ──────────────────────────────────── */
document.querySelectorAll('[data-tilt]').forEach(card => {
  const inner = card.querySelector('.pc-inner');
  const MAX   = 10;

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    const rx   =  dy * MAX;
    const ry   = -dx * MAX;
    inner.style.transform     = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    inner.style.transition    = 'transform 0.08s linear';
  });

  card.addEventListener('mouseleave', () => {
    inner.style.transform  = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    inner.style.transition = 'transform 0.5s cubic-bezier(0.2,0,0,1)';
  });
});

/* ── INPUT FOCUS ICON COLOUR (handled by CSS :focus sibling) ── */
document.querySelectorAll('.form-field input, .form-field textarea').forEach(inp => {
  inp.addEventListener('focus', () => {
    const ico = inp.parentElement.querySelector('.input-ico');
    if(ico) ico.style.color = 'var(--accent)';
  });
  inp.addEventListener('blur', () => {
    const ico = inp.parentElement.querySelector('.input-ico');
    if(ico) ico.style.color = '';
  });
});