/* =============================================
   PIXELCRAFT STUDIO – JAVASCRIPT
   ============================================= */

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ---- ACTIVE NAV LINK ----
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 120;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const link   = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

// ---- HERO PARTICLES ----
(function createParticles() {
  const container = document.getElementById('particles');
  const colors    = ['#7c3aed','#a855f7','#22d3ee','#f472b6','#fbbf24'];
  for (let i = 0; i < 30; i++) {
    const p   = document.createElement('div');
    const size= Math.random() * 6 + 2;
    p.classList.add('particle');
    Object.assign(p.style, {
      width:       size + 'px',
      height:      size + 'px',
      left:        Math.random() * 100 + '%',
      background:  colors[Math.floor(Math.random() * colors.length)],
      animationDuration: (Math.random() * 12 + 8) + 's',
      animationDelay:    (Math.random() * 8) + 's',
    });
    container.appendChild(p);
  }
})();

// ---- COUNTDOWN TIMER ----
(function startCountdown() {
  const endTime = new Date();
  endTime.setDate(endTime.getDate() + (7 - endTime.getDay())); // next Sunday
  endTime.setHours(23, 59, 59, 0);

  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function pad(n) { return String(n).padStart(2, '0'); }

  function update() {
    const diff = endTime - Date.now();
    if (diff <= 0) { hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = '00'; return; }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    hoursEl.textContent   = pad(h);
    minutesEl.textContent = pad(m);
    secondsEl.textContent = pad(s);
  }
  update();
  setInterval(update, 1000);
})();

// ---- SCROLL REVEAL ----
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // Add reveal class to elements
  const targets = [
    '.service-card',
    '.offer-card',
    '.portfolio-item',
    '.testimonial-card',
    '.info-card',
    '.section-header',
    '.ad-banner',
    '.contact-form',
    '.footer-brand',
    '.footer-links',
    '.footer-newsletter',
  ];
  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  });
})();

// ---- PORTFOLIO FILTER ----
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.style.display = match ? '' : 'none';
      item.style.animation = match ? 'fadeInUp 0.5s ease both' : '';
    });
  });
});

// ---- CONTACT FORM SUBMISSION ----
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Simple validation
  const name  = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!name || !email) {
    shake(document.getElementById(!name ? 'name' : 'email'));
    return;
  }

  // Simulate sending
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').style.display = 'none';
  submitBtn.querySelector('.btn-loader').style.display = 'inline';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').style.display = '';
    submitBtn.querySelector('.btn-loader').style.display = 'none';
    formSuccess.style.display = 'block';
    contactForm.reset();
    setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
  }, 2000);
});

function shake(el) {
  el.style.borderColor = '#ef4444';
  el.style.animation   = 'shake 0.4s ease';
  setTimeout(() => { el.style.animation = ''; el.style.borderColor = ''; }, 500);
}

// Add shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%,100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}`;
document.head.appendChild(shakeStyle);



// ---- SMOOTH ANCHOR SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- CURSOR GLOW EFFECT ----
(function initCursorGlow() {
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position: 'fixed',
    width:    '300px',
    height:   '300px',
    borderRadius: '50%',
    background:   'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
    pointerEvents:'none',
    transform:    'translate(-50%, -50%)',
    transition:   'left 0.1s ease, top 0.1s ease',
    zIndex:       '0',
    top: '-300px', left: '-300px',
  });
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();

// ---- PORTFOLIO LIGHTBOX & HOVER PREVIEWS ----
(function initLightbox() {
  const lightbox = document.getElementById('portfolioLightbox');
  if (!lightbox) return;

  const imgEl    = document.getElementById('lightboxImg');
  const videoEl  = document.getElementById('lightboxVideo');
  const titleEl  = document.getElementById('lightboxTitle');
  const tagEl    = document.getElementById('lightboxTag');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn  = document.getElementById('lightboxPrev');
  const nextBtn  = document.getElementById('lightboxNext');
  const contentEl = lightbox.querySelector('.lightbox-content');

  let portfolioItems = [];
  let currentIndex = 0;

  function updateItemsList() {
    // Only cycle through elements that are not filtered out (hidden by display: none)
    portfolioItems = Array.from(document.querySelectorAll('.portfolio-item')).filter(
      item => item.style.display !== 'none'
    );
  }

  // Set up hover playback for video items
  document.querySelectorAll('.portfolio-item').forEach(item => {
    const video = item.querySelector('.portfolio-video');
    if (video) {
      item.addEventListener('mouseenter', () => {
        // Only preview if lightbox isn't active
        if (!lightbox.classList.contains('active')) {
          video.play().catch(err => console.log('Hover autoplay failed:', err));
        }
      });
      item.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });

  function openLightbox(itemElement) {
    updateItemsList();
    currentIndex = portfolioItems.indexOf(itemElement);
    if (currentIndex === -1) return;

    // Pause all inline video previews
    document.querySelectorAll('.portfolio-video').forEach(vid => {
      vid.pause();
      vid.currentTime = 0;
    });

    const title = itemElement.querySelector('h4').textContent;
    const tag   = itemElement.querySelector('.port-type').textContent;
    const mediaSrc = itemElement.getAttribute('data-src');

    // Add a smooth transition effect if already active (switching items) or opening
    contentEl.style.opacity = '0';
    contentEl.style.transform = 'scale(0.96)';
    contentEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

    setTimeout(() => {
      tagEl.textContent = tag;
      titleEl.textContent = title;

      if (mediaSrc.endsWith('.mp4')) {
        imgEl.style.display = 'none';
        videoEl.style.display = 'block';
        videoEl.src = mediaSrc;
        videoEl.play().catch(err => console.log('Autoplay blocked:', err));
      } else {
        videoEl.style.display = 'none';
        imgEl.style.display = 'block';
        imgEl.src = mediaSrc;
      }

      // Force reflow and animate in
      requestAnimationFrame(() => {
        contentEl.style.opacity = '1';
        contentEl.style.transform = 'scale(1)';
      });
    }, 120);

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable scroll on body
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    videoEl.pause();
    videoEl.src = '';
    imgEl.src = '';
    
    // Reset transitional styles
    contentEl.style.opacity = '';
    contentEl.style.transform = '';
    contentEl.style.transition = '';
  }

  function showNext() {
    updateItemsList();
    if (portfolioItems.length <= 1) return;
    currentIndex = (currentIndex + 1) % portfolioItems.length;
    openLightbox(portfolioItems[currentIndex]);
  }

  function showPrev() {
    updateItemsList();
    if (portfolioItems.length <= 1) return;
    currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
    openLightbox(portfolioItems[currentIndex]);
  }

  // Attach click listener to portfolio items
  document.querySelectorAll('.portfolio-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      // If clicked on an actual link that isn't pointing to an image/video, let it navigate normally.
      // Otherwise, prevent default and open lightbox.
      const anchor = e.target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.match(/\.(jpeg|jpg|png|gif|webp|mp4)$/i)) {
          e.preventDefault();
        } else {
          return; // Let normal link navigation happen
        }
      }
      openLightbox(item);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
})();

console.log('%c☁ Sky Blue Creations', 'color: #22d3ee; font-size: 24px; font-weight: 900; font-family: Outfit');
console.log('%cWebsite loaded. Ready to create visual magic! 🎬', 'color: #94a3b8; font-size: 14px;');
