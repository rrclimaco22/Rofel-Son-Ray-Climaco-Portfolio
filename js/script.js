/* ==========================================================================
   ROFEL CLIMACO — PORTFOLIO SCRIPT
   Handles: dark mode toggle (persisted), mobile nav, scroll-progress
   connector node, back-to-top button, current year, and AOS init.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- AOS (Animate On Scroll) ---------------- */
  if (window.AOS) {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* ---------------- Dark mode toggle ---------------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon = document.getElementById('themeIcon');
  var STORAGE_KEY = 'rc-theme';

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      root.removeAttribute('data-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }

  // Respect saved preference, otherwise fall back to system preference
  var saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  themeToggle.addEventListener('click', function () {
    var isDark = root.getAttribute('data-theme') === 'dark';
    var next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close mobile menu when a link is tapped
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------- Scroll-progress connector node ---------------- */
  var connectorNode = document.getElementById('connectorNode');

  function updateConnector() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? scrollTop / docHeight : 0;
    var railHeight = window.innerHeight; // rail is position:fixed, spans viewport
    if (connectorNode) {
      connectorNode.style.top = (progress * railHeight) + 'px';
    }
  }

  /* ---------------- Back to top button ---------------- */
  var backToTop = document.getElementById('backToTop');

  function updateBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  /* ---------------- Sticky header shadow on scroll (optional polish) ---------------- */
  var header = document.getElementById('siteHeader');
  function updateHeader() {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 8px 24px rgba(11,18,32,0.06)';
    } else {
      header.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', function () {
    updateConnector();
    updateBackToTop();
    updateHeader();
  }, { passive: true });

  updateConnector();
  updateBackToTop();
  updateHeader();

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
