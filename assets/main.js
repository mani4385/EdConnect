// ============================================================
// EdVanguard AI — Shared interactivity across all dashboards
// ============================================================

// ---- Lenis smooth scrolling ----
// Initialized as early as possible (outside DOMContentLoaded) so the
// very first scroll on the page is already smooth. Falls back silently
// if the CDN script hasn't loaded or the user prefers reduced motion.
window.__lenis = null;
(function initLenis() {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.15,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  window.__lenis = lenis;
})();

document.addEventListener('DOMContentLoaded', () => {

  // ---- Smooth in-page anchor scrolling (sidebar / bottom-nav links) ----
  // Skips bare "#" links, which are demo-action placeholders handled below.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    link.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -12, duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Mobile sidebar toggle ----
  const menuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');
  const sidebarScrim = document.getElementById('sidebarScrim');
  if (menuBtn && sidebar) {
    const openSidebar = () => {
      sidebar.classList.remove('-translate-x-full');
      if (sidebarScrim) sidebarScrim.classList.remove('hidden');
    };
    const closeSidebar = () => {
      sidebar.classList.add('-translate-x-full');
      if (sidebarScrim) sidebarScrim.classList.add('hidden');
    };
    menuBtn.addEventListener('click', openSidebar);
    if (sidebarScrim) sidebarScrim.addEventListener('click', closeSidebar);
  }

  // ---- Notification bell dropdown ----
  document.querySelectorAll('[data-toggle="notif"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const panel = document.getElementById('notifPanel');
      if (panel) panel.classList.toggle('hidden');
    });
  });
  document.addEventListener('click', (e) => {
    const panel = document.getElementById('notifPanel');
    if (panel && !panel.contains(e.target)) panel.classList.add('hidden');
  });

  // ---- AI Assistant Chatbot widget ----
  const chatFab = document.getElementById('chatFab');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');

  if (chatFab && chatWindow) {
    chatFab.addEventListener('click', () => chatWindow.classList.toggle('open'));
  }
  if (chatClose && chatWindow) {
    chatClose.addEventListener('click', () => chatWindow.classList.remove('open'));
  }
  if (chatForm && chatInput && chatBody) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;
      const userBubble = document.createElement('div');
      userBubble.className = 'ml-auto max-w-[85%] bg-primary text-on-primary text-[13px] rounded-2xl rounded-tr-sm px-4 py-2';
      userBubble.textContent = val;
      chatBody.appendChild(userBubble);
      chatInput.value = '';
      chatBody.scrollTop = chatBody.scrollHeight;
      setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.className = 'mr-auto max-w-[85%] bg-surface-container-low text-on-surface text-[13px] rounded-2xl rounded-tl-sm px-4 py-2';
        botBubble.textContent = "Thanks for your message — this is a demo assistant. Your live EdVanguard AI assistant will answer attendance, fee, and schedule questions here.";
        chatBody.appendChild(botBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 600);
    });
  }

  // ---- Generic toast helper ----
  window.showToast = function (title, subtitle, tone = 'primary') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    const bar = toast.querySelector('.toast-bar');
    const t = toast.querySelector('.toast-title');
    const s = toast.querySelector('.toast-subtitle');
    if (t) t.textContent = title;
    if (s) s.textContent = subtitle;
    if (bar) bar.style.borderColor = tone === 'error' ? '#ba1a1a' : (tone === 'tertiary' ? '#006242' : '#004ac6');
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  // ---- Facial recognition threshold slider (Admin) ----
  document.querySelectorAll('.fr-slider').forEach(slider => {
    const out = document.querySelector(slider.dataset.output);
    const setVal = () => {
      slider.style.setProperty('--val', slider.value + '%');
      if (out) out.textContent = slider.value + '%';
    };
    slider.addEventListener('input', setVal);
    setVal();
  });

  // ---- Manual attendance override buttons (Faculty) ----
  document.querySelectorAll('[data-mark-present]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = 'Marked Present';
      btn.classList.remove('bg-primary-fixed', 'text-on-primary-fixed-variant');
      btn.classList.add('bg-tertiary-container', 'text-on-tertiary-container');
      window.showToast('Attendance updated', 'Manual override recorded and synced to the roster.', 'tertiary');
    });
  });

  // ---- Notify parents buttons ----
  document.querySelectorAll('[data-notify-parent]').forEach(btn => {
    btn.addEventListener('click', () => {
      window.showToast('Parents notified', 'A push notification and SMS alert has been sent.', 'error');
    });
  });

  // ---- Generic "coming soon" for non-functional demo links ----
  document.querySelectorAll('[data-demo-action]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (el.tagName === 'A' && (!el.getAttribute('href') || el.getAttribute('href') === '#')) e.preventDefault();
      window.showToast(el.dataset.demoAction || 'Action complete', 'This is a front-end preview — connect a backend to make it live.');
    });
  });

  // ---- Multi-child / multi-view switcher (pill tabs) ----
  document.querySelectorAll('[data-switcher] [data-tab]').forEach(tabBtn => {
    tabBtn.addEventListener('click', function () {
      const group = this.closest('[data-switcher]');
      group.querySelectorAll('[data-tab]').forEach(b => {
        b.classList.remove('bg-white', 'shadow-sm', 'text-primary', 'font-semibold');
        b.classList.add('text-on-surface-variant');
      });
      this.classList.add('bg-white', 'shadow-sm', 'text-primary', 'font-semibold');
      this.classList.remove('text-on-surface-variant');
    });
  });

  // ---- Fade-in for bento cards ----
  const cards = document.querySelectorAll('.bento-grid > section, .fade-in-item');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    setTimeout(() => {
      card.style.transition = 'all .5s cubic-bezier(0.4,0,0.2,1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 60 * i);
  });

  // ---- Attendance progress ring animation ----
  document.querySelectorAll('.progress-bar-fill').forEach(circle => {
    const pct = parseFloat(circle.dataset.percent || '0') / 100;
    const r = parseFloat(circle.getAttribute('r'));
    const total = 2 * Math.PI * r;
    circle.style.strokeDasharray = total;
    circle.style.strokeDashoffset = total;
    requestAnimationFrame(() => {
      circle.style.strokeDashoffset = total * (1 - pct);
    });
  });

});
