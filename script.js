(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const brand = document.querySelector('.brand');
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------
     Header state
     ------------------------------------------------------------ */
  let lastScroll = -1;

  const updateHeader = () => {
    const y = window.scrollY;
    if (y === lastScroll) return;
    lastScroll = y;
    header?.classList.toggle('is-scrolled', y > 18);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------ */
  const setMenu = (open) => {
    if (!menuToggle) return;
    body.classList.toggle('nav-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    if (open) {
      window.setTimeout(() => nav?.querySelector('a')?.focus(), 280);
    }
  };

  menuToggle?.addEventListener('click', () => {
    setMenu(!body.classList.contains('nav-open'));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  brand?.addEventListener('click', () => setMenu(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && body.classList.contains('nav-open')) {
      setMenu(false);
      menuToggle?.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && body.classList.contains('nav-open')) {
      setMenu(false);
    }
  });

  /* ------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------ */
  const revealItems = [...document.querySelectorAll('.reveal')];

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* ------------------------------------------------------------
     Scrollspy
     ------------------------------------------------------------ */
  const sections = ['project', 'world', 'studio', 'acknowledgements', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setActiveNav = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.dataset.nav === id;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveNav(visible.target.id);
      },
      { rootMargin: '-22% 0px -58% 0px', threshold: [0, 0.08, 0.2] }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ------------------------------------------------------------
     Lightbox
     ------------------------------------------------------------ */
  const dialog = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = dialog?.querySelector('.lightbox-close');
  const lightboxTriggers = [...document.querySelectorAll('[data-lightbox]')];
  let lightboxTrigger = null;

  const openLightbox = (trigger) => {
    if (!dialog || !lightboxImage) return;

    const source = trigger.dataset.image;
    const title = trigger.dataset.title || 'Project visual';
    const caption = trigger.dataset.caption || '';
    if (!source) return;

    lightboxImage.src = source;
    lightboxImage.alt = trigger.querySelector('img')?.alt || title;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightboxTrigger = trigger;

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      body.classList.add('lightbox-open');
      lightboxClose?.focus();
    } else {
      window.open(source, '_blank', 'noopener');
    }
  };

  const closeLightbox = () => {
    if (!dialog?.open) return;
    dialog.close();
  };

  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openLightbox(trigger));
  });

  lightboxClose?.addEventListener('click', closeLightbox);

  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) closeLightbox();
  });

  dialog?.addEventListener('close', () => {
    body.classList.remove('lightbox-open');
    if (lightboxTrigger) {
      lightboxTrigger.focus();
      lightboxTrigger = null;
    }
  });

  /* ------------------------------------------------------------
     Copy email
     ------------------------------------------------------------ */
  const toast = document.querySelector('[data-toast]');
  let toastTimer = 0;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2600);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    const copied = document.execCommand('copy');
    helper.remove();
    return copied;
  };

  document.querySelectorAll('[data-copy-email]').forEach((button) => {
    button.addEventListener('click', async () => {
      const email = button.dataset.copyEmail;
      if (!email) return;
      const label = button.querySelector('span');
      const original = label ? label.textContent : '';

      try {
        const copied = await copyText(email);
        if (!copied) throw new Error('Copy command failed');
        if (label) label.textContent = '已复制';
        showToast('邮箱已复制：' + email);
        window.setTimeout(() => {
          if (label) label.textContent = original;
        }, 2400);
      } catch {
        if (label) label.textContent = '请手动复制';
        showToast('未能自动复制，请手动选择邮箱地址。');
        window.setTimeout(() => {
          if (label) label.textContent = original;
        }, 2600);
      }
    });
  });

  /* ------------------------------------------------------------
     Footer year
     ------------------------------------------------------------ */
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  /* ------------------------------------------------------------
     Keep focus styling robust inside the native dialog
     ------------------------------------------------------------ */
  dialog?.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeLightbox();
  });

  root.classList.add('is-ready');
})();
