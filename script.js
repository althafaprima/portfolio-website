// ===== PROJECT DATA =====
const projects = [
  {
    id: 1,
    title: 'Culture Division Website',
    organization: 'BSI',
    tools: ['Google Sites'],
    isBSI: true,
    gradient: 'linear-gradient(135deg, #1e40af, #3b82f6)',
    cardLabel: 'BSI Culture Division Website',
    caseStudy: {
      context: 'The Culture Division at PT Bank Syariah Indonesia needed a centralized platform to distribute internal employee activity content and manage attendance for each activity across all BSI employees.',
      problem: 'Division data was scattered across different channels and not easily accessible to all employees.',
      myRole: null,
      tools: ['Google Sites'],
      process: null,
      outcome: 'I delivered a website that integrates Culture Division data so it can be distributed to all BSI employees, matching the division\u2019s needs. It also became the basis for my bachelor\u2019s thesis: "Design and Build a Website for the Culture Division of Bank Syariah Indonesia Using Google Sites".',
      gallery: [
        { caption: 'Culture Division website homepage with content navigation', blurred: true },
        { caption: 'Employee activity attendance menu showing registered participants', blurred: true },
        { caption: 'Content page template for internal BSI employee activities', blurred: true }
      ]
    }
  },
  {
    id: 2,
    title: 'Regional Data Visualization',
    organization: 'BSI',
    tools: ['Google Data Studio', 'Google Spreadsheet'],
    isBSI: true,
    gradient: 'linear-gradient(135deg, #0e7490, #06b6d4)',
    cardLabel: 'BSI Regional Data Dashboards',
    caseStudy: {
      context: 'BSI needed region-level dashboards to monitor employee activity across all branches in Indonesia, built from normalized internal data.',
      problem: 'Data from approximately 18,000 employees across Indonesia was not normalized, making consistent reporting difficult.',
      myRole: null,
      tools: ['Google Data Studio', 'Google Spreadsheet'],
      process: null,
      outcome: 'I built region-level Google Data Studio dashboards from normalized data, enabling consistent monitoring of employee activity across all BSI regions.',
      gallery: [
        { caption: 'Regional dashboard overview with normalized employee activity metrics', blurred: true },
        { caption: 'Weekly TAUJIH Ber-AKHLAK session attendance dashboard', blurred: true },
        { caption: 'Branch office (KCP and KK) ranking visualization by score', blurred: true }
      ]
    }
  },
  {
    id: 3,
    title: 'Berbagi Mobile App UI Design',
    organization: 'Figma',
    tools: ['Figma'],
    isBSI: false,
    gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    cardLabel: 'Berbagi Mobile App UI',
    caseStudy: {
      context: 'The "Berbagi" mobile application needed a user-friendly interface design to serve its target users effectively.',
      problem: null,
      myRole: null,
      tools: ['Figma'],
      process: null,
      outcome: null,
      gallery: [
        { caption: 'Berbagi app home screen with main navigation', blurred: false },
        { caption: 'Sharing and donation flow interface design', blurred: false },
        { caption: 'User profile and settings screen layout', blurred: false },
        { caption: 'Onboarding screens for first-time users', blurred: false }
      ]
    }
  },
  {
    id: 4,
    title: 'Personalized Recommendation System Research',
    organization: 'BINUS (Master\u2019s Thesis)',
    tools: ['RapidMiner'],
    isBSI: false,
    gradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
    cardLabel: 'SVOD Recommendation Research',
    caseStudy: {
      context: 'My master\u2019s thesis research explored how personalized recommendation systems can improve SVOD (Subscription Video on Demand) subscription renewal decisions among Jakarta university students.',
      problem: null,
      myRole: null,
      tools: null,
      process: null,
      outcome: null,
      gallery: null
    }
  }
];

// ===== RENDER PROJECT CARDS =====
function renderProjectCards() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects.map(p => `
    <article class="project-card" data-project-id="${p.id}" tabindex="0" role="button"
             aria-label="View case study: ${p.title}">
      <div class="project-card__image" style="background: ${p.gradient};">
        ${p.cardLabel}
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__subtitle">${p.organization}</p>
        <div class="project-card__tags">
          ${p.tools.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(parseInt(card.dataset.projectId)));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(parseInt(card.dataset.projectId));
      }
    });
  });
}

// ===== PROJECT MODAL =====
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
let lastFocused = null;

function todoPlaceholder(label) {
  return `<div class="project-modal__todo">TODO: ${label}</div>`;
}

function renderGallery(images) {
  if (!images) return todoPlaceholder('Gallery images to be added');
  return `
    <div class="project-modal__gallery">
      ${images.map((img, i) => `
        <figure class="project-modal__gallery-item">
          <div class="project-modal__gallery-image ${img.blurred ? 'project-modal__gallery-image--blurred' : ''}"
               style="background: linear-gradient(135deg, #475569, #94a3b8);"
               aria-label="${img.caption}">Placeholder Image ${i + 1}</div>
          <figcaption class="project-modal__gallery-caption">${img.caption}</figcaption>
        </figure>
      `).join('')}
    </div>
  `;
}

function openModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  lastFocused = document.activeElement;

  const cs = project.caseStudy;

  modalContent.innerHTML = `
    <h2 id="modal-title">${project.title}</h2>
    <p style="color: var(--text-muted); margin-bottom: 4px;">${project.organization}</p>
    <div class="project-modal__tools">
      ${(cs.tools || []).map(t => `<span class="tag">${t}</span>`).join('')}
    </div>

    <h3>Context</h3>
    <p>${cs.context || todoPlaceholder('Context to be added')}</p>

    <h3>Problem</h3>
    <p>${cs.problem || todoPlaceholder('Problem to be added')}</p>

    <h3>My Role</h3>
    <p>${cs.myRole || todoPlaceholder('My role and team details')}</p>

    <h3>Tools</h3>
    ${cs.tools ? `<div class="project-modal__tools">${cs.tools.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : todoPlaceholder('Tools used')}

    <h3>Process</h3>
    ${cs.process
      ? `<ol>${cs.process.map(s => `<li>${s}</li>`).join('')}</ol>`
      : todoPlaceholder('Process steps (3-5) to be added')}

    <h3>Outcome</h3>
    <p>${cs.outcome || todoPlaceholder('Outcome and results to be added')}</p>

    <h3>Gallery</h3>
    ${renderGallery(cs.gallery)}

    ${project.isBSI ? '<div class="project-modal__confidential">Data shown is illustrative / anonymized.</div>' : ''}
  `;

  modal.showModal();
  modalClose.focus();
}

function closeModal() {
  modal.close();
  if (lastFocused) lastFocused.focus();
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function initTheme() {
  const isDark = prefersDark.matches;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menu-toggle');
const headerNav = document.getElementById('header-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = headerNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

headerNav.addEventListener('click', e => {
  if (e.target.classList.contains('nav-link')) {
    headerNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }
});

// ===== ACTIVE SECTION TRACKING =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.target === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY >= 400) {
    backToTop.hidden = false;
    requestAnimationFrame(() => backToTop.classList.add('visible'));
  } else {
    backToTop.classList.remove('visible');
    setTimeout(() => { if (window.scrollY < 400) backToTop.hidden = true; }, 300);
  }
}, { passive: true });

backToTop.addEventListener('click', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});

// ===== SCROLL REVEAL =====
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!reduceMotion.matches) {
  const revealTargets = document.querySelectorAll(
    '.section__container, .timeline__item, .project-card, .edu-card, .cert-card, .skill-group, .fact-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));
}

// ===== KEYBOARD: ESC closes modal (native dialog handles this, but ensure focus restore) =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.open) {
    closeModal();
  }
});

// ===== INIT =====
initTheme();
renderProjectCards();

// Update footer year
document.querySelector('.site-footer__text').textContent = `\u00A9 ${new Date().getFullYear()} Althaf Aprima Ksatria`;
