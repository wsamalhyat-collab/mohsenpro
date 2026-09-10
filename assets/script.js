(() => {
  'use strict';

  const root = document.documentElement;
  const themeButton = document.getElementById('theme');
  const menuButton = document.getElementById('menu');
  const nav = document.getElementById('nav');
  const topButton = document.getElementById('top');
  const form = document.getElementById('contact-form');
  const note = document.getElementById('note');

  const setTheme = (dark) => {
    root.classList.toggle('dark', dark);
    try { localStorage.setItem('mohsen-theme', dark ? 'dark' : 'light'); } catch (e) {}
    if (themeButton) {
      themeButton.textContent = dark ? '☀️' : '🌙';
      themeButton.setAttribute('aria-label', dark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي');
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.title = dark ? 'الوضع النهاري' : 'الوضع الليلي';
    }
  };

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('mohsen-theme'); } catch (e) {}
  setTheme(savedTheme === 'dark' || (savedTheme === null && window.matchMedia?.('(prefers-color-scheme: dark)').matches));

  themeButton?.addEventListener('click', () => setTheme(!root.classList.contains('dark')));

  const closeMenu = () => {
    nav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'فتح القائمة');
  };

  menuButton?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') ?? false;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('click', (event) => {
    if (nav?.classList.contains('open') && !nav.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
  });

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    revealElements.forEach((el) => observer.observe(el));
  } else revealElements.forEach((el) => el.classList.add('visible'));

  document.querySelectorAll('[data-n]').forEach((el) => {
    const goal = Number(el.dataset.n);
    if (!Number.isFinite(goal)) return;
    const startCounter = () => {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      let value = 0;
      const step = Math.max(1, Math.ceil(goal / 30));
      const tick = () => {
        value = Math.min(goal, value + step);
        el.textContent = value + (goal === 100 ? '%' : '+');
        if (value < goal) requestAnimationFrame(tick);
      };
      tick();
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) { startCounter(); obs.disconnect(); }
      }, { threshold: 0.5 });
      observer.observe(el);
    } else startCounter();
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('#nav a')];
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const updateTopButton = () => topButton?.classList.toggle('show', window.scrollY > 450);
  window.addEventListener('scroll', updateTopButton, { passive: true });
  updateTopButton();
  topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const text = `مرحباً MOHSEN PRO
الاسم: ${name}
البريد: ${email}
الرسالة: ${message}`;
    const url = `https://wa.me/967774757163?text=${encodeURIComponent(text)}`;
    if (note) note.textContent = 'جاري فتح WhatsApp...';
    const popup = window.open(url, '_blank', 'noopener,noreferrer');
    if (!popup) window.location.href = url;
    if (note) note.textContent = 'تم تجهيز الرسالة وفتح WhatsApp.';
  });
})();