(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const yearEl = document.getElementById('year');
  const contactForm = document.getElementById('contactForm');

  // Init year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Persisted theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? '🌞' : '🌙';
  }

  // Theme toggle
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.textContent = next === 'dark' ? '🌞' : '🌙';
  });

  // Mobile nav toggle
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav?.classList.toggle('open');
  });
  // Close nav on link click (mobile)
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  // Smooth scroll (native CSS is fine, but ensure hash focus)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id.length === 1) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', id);
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // Contact form -> mailto
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const messageEl = document.getElementById('message');
    const name = nameEl && 'value' in nameEl ? String(nameEl.value).trim() : '';
    const email = emailEl && 'value' in emailEl ? String(emailEl.value).trim() : '';
    const message = messageEl && 'value' in messageEl ? String(messageEl.value).trim() : '';
    const subject = encodeURIComponent(`New inquiry via Fronify from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:muhammadalibhati0342@gmail.com?subject=${subject}&body=${body}`;
  });
})();


