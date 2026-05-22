/* ===================== NAVBAR ===================== */
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ===================== THEME TOGGLE ===================== */
function applyTheme(theme) {
  if (theme === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  try { localStorage.setItem('theme', theme); } catch(e){}
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = (function(){ try { return localStorage.getItem('theme'); } catch(e){ return null; } })();
  if (saved) applyTheme(saved);
  else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
  const tbtn = document.getElementById('themeToggle'); if (tbtn) tbtn.addEventListener('click', toggleTheme);
});

/* ===================== ORBIT ROTATION ===================== */
(function() {
  const orbitContainer = document.getElementById('orbitContainer');
  const orbitCenter = document.getElementById('orbitCenter');
  if (!orbitContainer) return;

  const baseAngles = [0, 51, 103, 154, 206, 257, 309];
  let baseRadii = [];
  let rotation = 0, isHovering = false;

  function computeRadii() {
    const rect = orbitContainer.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height) || 400;
    const outer = Math.round(size * 0.47);
    const inner = Math.round(size * 0.31);
    baseRadii = [outer, inner, outer, inner, outer, inner, outer];
    const nodes = orbitContainer.querySelectorAll('.orbit-node');
    nodes.forEach((node, i) => {
      const angle = baseAngles[i];
      const r = baseRadii[i] || outer;
      node.style.transform = 'rotate(' + angle + 'deg) translateX(' + r + 'px) rotate(' + (-angle) + 'deg)';
    });
  }

  orbitContainer.addEventListener('mouseenter', () => { isHovering = true; });
  orbitContainer.addEventListener('mouseleave', () => { isHovering = false; });

  computeRadii();
  baseAngles.forEach((angle, i) => {
    const node = document.createElement('div');
    node.className = 'orbit-node';
    const delays = ['0s','0.3s','0.6s','0.9s','1.2s','1.5s','1.8s'];
    const r = baseRadii[i] || Math.round((orbitContainer.offsetWidth || 400) * 0.4);
    node.style.transform = 'rotate(' + angle + 'deg) translateX(' + r + 'px) rotate(' + (-angle) + 'deg)';
    node.style.animationDelay = delays[i];
    node.innerHTML = '<svg width="20" height="20" viewBox="0 0 64 64" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><line x1="20" y1="8" x2="20" y2="24"/><line x1="28" y1="8" x2="28" y2="24"/><line x1="36" y1="8" x2="36" y2="24"/><path d="M16 24 Q28 30 40 24" fill="none"/><line x1="28" y1="28" x2="28" y2="56"/><ellipse cx="50" cy="22" rx="6" ry="9"/><line x1="50" y1="31" x2="50" y2="56"/></svg>';
    orbitContainer.appendChild(node);
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      computeRadii();
    }, 120);
  });

  function rotateOrbit() {
    if (!isHovering) {
      rotation += 0.08;
      orbitContainer.style.transform = 'rotate(' + rotation + 'deg)';
      const nodes = orbitContainer.querySelectorAll('.orbit-node');
      nodes.forEach((node, i) => {
        node.style.transform = 'rotate(' + baseAngles[i] + 'deg) translateX(' + baseRadii[i] + 'px) rotate(' + (-baseAngles[i] - rotation) + 'deg)';
      });
      if (orbitCenter) orbitCenter.style.transform = 'translate(-50%, -50%) rotate(' + (-rotation) + 'deg)';
    }
    requestAnimationFrame(rotateOrbit);
  }
  rotateOrbit();
})();

/* ===================== FITUR MARQUEE + FOCAL ZOOM ===================== */
(function() {
  const SET = ['public/fitur-pengawasan.png', 'public/fitur-analisis.png', 'public/fitur-integritas.png'];

  function makeCard(src, idx) {
    return '<div class="fitur-card fitur-card-item" data-set-idx="' + idx + '">' +
      '<img src="' + src + '" alt="Fitur" loading="lazy" draggable="false">' +
      '</div>';
  }

  const trackWrapper = document.querySelector('.marquee-track-wrapper');
  
  let cardsHtml = '';
  for (let i = 0; i < 4; i++) {
    SET.forEach((src, j) => { cardsHtml += makeCard(src, j); });
  }
  
  trackWrapper.innerHTML = '<div class="marquee-track">' + cardsHtml + '</div>';

  let raf;
  function tick() {
    const all = document.querySelectorAll('.fitur-card-item');
    if (!all.length) { raf = requestAnimationFrame(tick); return; }
    
    const cx = window.innerWidth / 2;
    
    let ci = 0, cd = Infinity;
    all.forEach((c, i) => {
      const rect = c.getBoundingClientRect();
      const centerOfCard = rect.left + (rect.width / 2);
      const d = Math.abs(centerOfCard - cx);
      
      if (d < cd) { 
        cd = d; 
        ci = i; 
      }
    });
    
    all.forEach((c, i) => {
      const isCenter = (i === ci);
      c.style.transform = 'scale(' + (isCenter ? 1.06 : 0.88) + ')';
      c.style.opacity = isCenter ? '1' : '0.5';
    });
    
    raf = requestAnimationFrame(tick);
  }
  
  if (window.innerWidth > 768) raf = requestAnimationFrame(tick);
})();

/* ===================== TEKNOLOGI MARQUEE + FOCAL ZOOM ===================== */
(function() {
  const SET = [
    { name: 'TensorFlow', desc: 'Framework ML untuk model prediksi', src: 'https://img.icons8.com/color/1200/tensorflow.jpg' },
    { name: 'PyTorch', desc: 'Deep learning untuk analisis data', src: 'https://img.icons8.com/fluency/1200/pytorch.png' },
    { name: 'Laravel', desc: 'Backend framework PHP', src: 'https://img.icons8.com/fluency/1200/laravel.png' },
    { name: 'Hyperledger Fabric', desc: 'Blockchain untuk transparansi', src: 'https://products.containerize.com/id/blockchain-platforms/hyperledger-fabric/menu_image.png' },
    { name: 'Pandas', desc: 'Data manipulation & analysis', src: 'https://img.icons8.com/color/1200/pandas.jpg' },
  ];
  const CARD_W = 280, GAP = 20, SET_W = (CARD_W + GAP) * SET.length;

  function makeTechCard(tech, idx) {
    return '<div class="tech-card tech-card-item" data-set-idx="' + idx + '">' +
      '<div class="tech-card-img"><img src="' + tech.src + '" alt="' + tech.name + '" loading="lazy" onerror="this.style.display=\'none\'" draggable="false"></div>' +
      '<div class="tech-card-info"><h4>' + tech.name + '</h4><p>' + tech.desc + '</p></div>' +
      '</div>';
  }

  const trackA = document.getElementById('techTrackA');
  const trackB = document.getElementById('techTrackB');
  let cardsHtml = '';
  SET.forEach((tech, i) => { cardsHtml += makeTechCard(tech, i); });
  trackA.innerHTML = cardsHtml;
  trackB.innerHTML = cardsHtml;

  let raf;
  function tick() {
    const all = document.querySelectorAll('.tech-card-item');
    if (!all.length) { raf = requestAnimationFrame(tick); return; }
    const cx = window.innerWidth / 2;
    let ci = 0, cd = Infinity;
    all.forEach((c, i) => {
      const d = Math.abs((c.getBoundingClientRect().left + c.offsetWidth / 2) - cx);
      if (d < cd) { cd = d; ci = i; }
    });
    const mi = ci % SET.length;
    all.forEach((c, i) => {
      const isCenter = (i % SET.length) === mi;
      c.style.transform = 'scale(' + (isCenter ? 1.06 : 0.88) + ')';
      c.style.opacity = isCenter ? '1' : '0.5';
    });
    raf = requestAnimationFrame(tick);
  }
  if (window.innerWidth > 768) raf = requestAnimationFrame(tick);
})();

/* ===================== CARA KERJA PETA TOGGLE ===================== */
let petaVisible = false;
function togglePeta() {
  petaVisible = !petaVisible;
  const peta = document.getElementById('cara-kerja-peta');
  const icon = document.getElementById('btnPetaIcon');
  const text = document.getElementById('btnPetaText');

  if (petaVisible) {
    peta.classList.add('open');
    icon.classList.add('open');
    text.textContent = 'Sembunyikan Peta';
    setTimeout(() => { initFlowchart(); }, 100);
    setTimeout(() => { document.getElementById('cara-kerja-peta').scrollIntoView({behavior: 'smooth'}); }, 150);
  } else {
    peta.classList.remove('open');
    icon.classList.remove('open');
    text.textContent = 'Lihat Peta';
  }
}

/* ===================== FLOWCHART (VERSI 25) ===================== */
let flowchartInited = false;
function initFlowchart() {
  if (flowchartInited) {
    showFlowchartAnim();
    return;
  }
  flowchartInited = true;

  const icons = {
    'log-in': '<svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>',
    'user-plus': '<svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
    'user-cog': '<svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><circle cx="19" cy="11" r="2"/><path d="M19 8v1"/><path d="M19 13v1"/><path d="M21.6 9.5l-.8.8"/><path d="M17.2 9.5l.8.8"/></svg>',
    'store': '<svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M9 21v-6h6v6"/><path d="M10 9h4"/><path d="M10 13h4"/></svg>',
    'database': '<svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>',
    'truck': '<svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    'bar-chart-3': '<svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
    'message-square': '<svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  };

  const flowSteps = [
    { id: 1, title: 'Akses Sistem', desc: 'Pengguna mengakses sistem Q.ven melalui aplikasi web.', icon: 'log-in', x: 6, y: 50 },
    { id: 2, title: 'Registrasi', desc: 'Pengguna melakukan registrasi akun atau login ke sistem.', icon: 'user-plus', x: 18, y: 20 },
    { id: 3, title: 'Role Check', desc: 'Sistem mengidentifikasi role pengguna (Admin, Vendor, atau Penerima).', icon: 'user-cog', x: 32, y: 50 },
    { id: 4, title: 'Kelola Vendor', desc: 'Admin melakukan pengelolaan vendor makanan yang bergabung.', icon: 'store', x: 44, y: 20 },
    { id: 5, title: 'Data Admin', desc: 'Admin vendor mengelola data distribusi dan stok makanan.', icon: 'database', x: 56, y: 50 },
    { id: 6, title: 'Distribusi', desc: 'Vendor mendistribusikan makanan sesuai jadwal dan lokasi.', icon: 'truck', x: 68, y: 20 },
    { id: 7, title: 'Blockchain', desc: 'Sistem menganalisis data dan menyimpannya di blockchain.', icon: 'bar-chart-3', x: 80, y: 50 },
    { id: 8, title: 'Feedback', desc: 'Penerima manfaat memberikan feedback terhadap kualitas makanan.', icon: 'message-square', x: 94, y: 35 },
  ];

  const linesSvg = document.getElementById('flowLines');
  const nodesContainer = document.getElementById('flowNodes');

  let linesHtml = '';
  for (let i = 0; i < flowSteps.length - 1; i++) {
    const from = flowSteps[i];
    const to = flowSteps[i + 1];
    linesHtml += '<line x1="' + from.x + '%" y1="' + from.y + '%" x2="' + to.x + '%" y2="' + to.y + '%" data-idx="' + i + '"/>';
  }
  linesSvg.innerHTML = linesHtml;

  let nodesHtml = '';
  flowSteps.forEach((step, i) => {
    const isBottom = i % 2 === 0;
    nodesHtml +=
      '<div class="flow-node-wrap" style="left:' + step.x + '%;top:' + step.y + '%;" data-idx="' + i + '">' +
        '<div class="flow-node-group">' +
          '<div class="flow-node-circle">' +
            '<div class="inner">' + icons[step.icon] + '</div>' +
          '</div>' +
          '<div class="flow-tooltip tooltip-' + (isBottom ? 'bottom' : 'top') + '">' +
            '<div class="tt-title">' + step.title + '</div>' +
            '<div class="tt-desc">' + step.desc + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="flow-label">' + step.title + '</div>' +
      '</div>';
  });
  nodesContainer.innerHTML = nodesHtml;

  showFlowchartAnim();
}

function showFlowchartAnim() {
  setTimeout(() => {
    document.querySelectorAll('.flowchart svg.lines line').forEach((line, i) => {
      setTimeout(() => { line.classList.add('visible'); }, 500 + i * 250);
    });
  }, 100);

  document.querySelectorAll('.flow-node-wrap').forEach((node, i) => {
    setTimeout(() => { node.classList.add('visible'); }, i * 200);
  });
}

/* ===================== SCROLL REVEAL ===================== */
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .fitur-header, .tech-header, .ck-header, .ck-peta-header, .steps-wrap').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();

window.addEventListener('resize', function() {
  if (window.innerWidth > 768) closeMenu();
});