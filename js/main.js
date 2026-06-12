/* ============================================================
   CANADIAN IMMIGRATION CONCIERGE — MAIN JS
   ============================================================ */

// NAV: scroll shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// NAV: hamburger toggle
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  navMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile nav when any link is clicked
navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// NAV: dropdown toggles
// On mobile — tap to open/close. On desktop — hover handles it via CSS.
document.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', e => {
    const isMobile = window.getComputedStyle(navToggle).display !== 'none';
    if (isMobile) {
      e.stopPropagation();
      const dropdown = toggle.closest('.nav-dropdown');
      // Close other open dropdowns first
      document.querySelectorAll('.nav-dropdown.open').forEach(d => {
        if (d !== dropdown) {
          d.classList.remove('open');
          d.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        }
      });
      const isOpen = dropdown.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    }
  });
});

// Desktop: add hover-delay so menu doesn't snap closed when mouse briefly leaves
let closeTimers = new WeakMap();
document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(closeTimers.get(dropdown));
  });
  dropdown.addEventListener('mouseleave', () => {
    const t = setTimeout(() => {
      // CSS :hover already handles closing; this handles edge cases
    }, 150);
    closeTimers.set(dropdown, t);
  });
});

// Close open mobile dropdowns when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown.open').forEach(d => {
      d.classList.remove('open');
      d.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    });
  }
});

// ACTIVE NAV LINK
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// FAQ ACCORDION
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = btn.classList.contains('open');

    // Close all open items
    document.querySelectorAll('.faq-question.open').forEach(q => {
      q.classList.remove('open');
      q.closest('.faq-item').querySelector('.faq-answer').style.maxHeight = '0';
    });

    // If it was closed, open it
    if (!isOpen) {
      btn.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// SCROLL ANIMATIONS — IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Staggered child animations
document.querySelectorAll('.fade-in-group').forEach(group => {
  const children = group.children;
  Array.from(children).forEach((child, i) => {
    child.style.opacity = '0';
    child.style.transform = 'translateY(24px)';
    child.style.transition = `opacity .6s cubic-bezier(.65,0,.35,1) ${i * 0.08}s, transform .6s cubic-bezier(.65,0,.35,1) ${i * 0.08}s`;
  });

  const groupObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        Array.from(children).forEach(child => {
          child.style.opacity = '1';
          child.style.transform = 'none';
        });
        groupObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  groupObserver.observe(group);
});

// CONTACT FORM
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate send (replace with Netlify Forms / Formspree / etc.)
  setTimeout(() => {
    btn.textContent = "✓ Message sent! We'll respond within 24 hours.";
    btn.style.background = '#2e7d32';
    btn.style.borderColor = '#2e7d32';
  }, 900);
});
