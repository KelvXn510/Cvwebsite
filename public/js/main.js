/* ─── EmailJS config (client-side) ─── */
const emailjsConfig = {
  publicKey: 'XxRhBbtrkE2MrZWa1',
  serviceId: 'service_sm09jrf',
  templateId: 'template_7u6j5ih'
};

const isEmailjsConfigured =
  emailjsConfig.publicKey !== 'XxRhBbtrkE2MrZWa1' &&
  emailjsConfig.serviceId !== 'service_sm09jrf' &&
  emailjsConfig.templateId !== 'template_7u6j5ih';

if (typeof emailjs !== 'undefined' && isEmailjsConfigured) {
  emailjs.init({ publicKey: emailjsConfig.publicKey });
}

/* ─── Scroll Reveal ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── Navbar scroll state ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ─── Mobile menu ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

/* ─── Smooth scroll for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─── Active nav link highlight ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          if (!link.classList.contains('nav-cta')) link.style.color = 'var(--ink)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));

/* ─── Contact Form ─── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const submitText = btn.querySelector('.submit-text');
    const submitLoading = btn.querySelector('.submit-loading');
    const successMsg = document.getElementById('formSuccess');

    // Show loading state
    submitText.style.display = 'none';
    submitLoading.style.display = 'inline';
    btn.disabled = true;

    try {
      if (!isEmailjsConfigured || typeof emailjs === 'undefined') {
        throw new Error('EmailJS is not configured.');
      }

      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        form
      );

      form.reset();
      successMsg.style.display = 'block';
      setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
    } catch (err) {
      alert('Could not send message. Please try again later.');
    } finally {
      submitText.style.display = 'inline';
      submitLoading.style.display = 'none';
      btn.disabled = false;
    }
  });
}

/* ─── Parallax hero grid subtle effect ─── */
const heroBg = document.querySelector('.hero-bg-grid');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.15}px)`;
  }, { passive: true });
}

/* ─── Stagger CV section reveals on CV section enter ─── */
const cvSection = document.querySelector('#cv');
if (cvSection) {
  const cvObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = cvSection.querySelectorAll('.cv-ach-row, .cv-project-card, .cv-edu-block, .cv-exp-item');
        cards.forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          card.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100 + i * 60);
        });
        cvObserver.disconnect();
      }
    });
  }, { threshold: 0.1 });
  cvObserver.observe(cvSection);
}
