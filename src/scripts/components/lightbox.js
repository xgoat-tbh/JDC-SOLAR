import { qs, qsa } from '../core/dom.js';

let projectsCache = [];
let currentIndex = 0;
let lightboxDialog = null;

async function loadProjectsData() {
  if (projectsCache.length) return projectsCache;
  try {
    const res = await fetch('/data/projects.json');
    if (res.ok) {
      projectsCache = await res.json();
    }
  } catch (err) {
    console.warn('Could not load projects.json for lightbox', err);
  }
  return projectsCache;
}

function ensureLightboxDOM() {
  if (lightboxDialog) return lightboxDialog;

  lightboxDialog = document.createElement('dialog');
  lightboxDialog.id = 'project-lightbox';
  lightboxDialog.className = 'modal-dialog lightbox-dialog';
  lightboxDialog.setAttribute('aria-label', 'Project Case Study Lightbox');

  lightboxDialog.innerHTML = `
    <div class="lightbox-content">
      <div class="lightbox-media-wrap">
        <img id="lb-img" src="" alt="Project Photo" class="lightbox-img">
        <button type="button" class="lightbox-nav-btn lightbox-nav-btn--prev" id="lb-prev" aria-label="Previous Project">
          <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-chevron-down"></use></svg>
        </button>
        <button type="button" class="lightbox-nav-btn lightbox-nav-btn--next" id="lb-next" aria-label="Next Project">
          <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-chevron-down"></use></svg>
        </button>
      </div>

      <div class="lightbox-info">
        <div>
          <div class="lightbox-info-header">
            <div>
              <div id="lb-tag" class="lightbox-tag">Commercial Rooftop EPC</div>
              <h3 id="lb-title" class="lightbox-title">Project Title</h3>
              <div id="lb-location" class="lightbox-location">
                <svg class="icon" style="width: 14px; height: 14px; color: var(--color-brand-accent);" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-globe"></use></svg>
                <span>Location</span>
              </div>
            </div>
            <button type="button" class="modal-dialog__close-btn" data-modal-close aria-label="Close Lightbox">
              <svg class="icon" style="width: 20px; height: 20px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-close"></use></svg>
            </button>
          </div>

          <div class="lightbox-specs-grid">
            <div class="lightbox-spec-item">
              <div class="lightbox-spec-label">System Size</div>
              <div id="lb-spec-size" class="lightbox-spec-val">100 kWp</div>
            </div>
            <div class="lightbox-spec-item">
              <div class="lightbox-spec-label">Annual Generation</div>
              <div id="lb-spec-gen" class="lightbox-spec-val">1,46,000 kWh</div>
            </div>
            <div class="lightbox-spec-item">
              <div class="lightbox-spec-label">Module Standard</div>
              <div id="lb-spec-tech" class="lightbox-spec-val">Tier-1 Mono PERC</div>
            </div>
            <div class="lightbox-spec-item">
              <div class="lightbox-spec-label">DISCOM Liaison</div>
              <div id="lb-spec-grid" class="lightbox-spec-val">JBVNL Net Metering</div>
            </div>
          </div>

          <p id="lb-desc" class="lightbox-desc">Project engineering description.</p>
        </div>

        <div class="lightbox-actions">
          <button type="button" class="btn btn--primary btn--block" id="lb-btn-survey">
            Book Site Survey for Similar Project →
          </button>
        </div>
      </div>
    </div>
  `;

  
  const prevIcon = qs('#lb-prev .icon', lightboxDialog);
  const nextIcon = qs('#lb-next .icon', lightboxDialog);
  if (prevIcon) prevIcon.style.transform = 'rotate(90deg)';
  if (nextIcon) nextIcon.style.transform = 'rotate(-90deg)';

  document.body.appendChild(lightboxDialog);

  
  const prevBtn = qs('#lb-prev', lightboxDialog);
  const nextBtn = qs('#lb-next', lightboxDialog);
  const surveyBtn = qs('#lb-btn-survey', lightboxDialog);

  if (prevBtn) prevBtn.addEventListener('click', () => showPreviousProject());
  if (nextBtn) nextBtn.addEventListener('click', () => showNextProject());

  if (surveyBtn) {
    surveyBtn.addEventListener('click', () => {
      if (typeof lightboxDialog.close === 'function') lightboxDialog.close();
      const surveyModal = qs('#survey-modal');
      if (surveyModal && typeof surveyModal.showModal === 'function') {
        surveyModal.showModal();
        document.body.style.overflow = 'hidden';
      }
    });
  }

  
  lightboxDialog.addEventListener('click', (e) => {
    const rect = lightboxDialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog && typeof lightboxDialog.close === 'function') {
      lightboxDialog.close();
      document.body.style.overflow = '';
    }
  });

  
  lightboxDialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showPreviousProject();
    if (e.key === 'ArrowRight') showNextProject();
  });

  return lightboxDialog;
}

function updateLightboxContent(project) {
  if (!project || !lightboxDialog) return;

  const img = qs('#lb-img', lightboxDialog);
  const tag = qs('#lb-tag', lightboxDialog);
  const title = qs('#lb-title', lightboxDialog);
  const location = qs('#lb-location span', lightboxDialog);
  const specSize = qs('#lb-spec-size', lightboxDialog);
  const specGen = qs('#lb-spec-gen', lightboxDialog);
  const specTech = qs('#lb-spec-tech', lightboxDialog);
  const specGrid = qs('#lb-spec-grid', lightboxDialog);
  const desc = qs('#lb-desc', lightboxDialog);

  if (img) {
    img.src = project.image || project.imageUrl || '/assets/images/hero/cta-solar-farm.jpg';
    img.alt = project.title || 'JDC Solar Completed Project';
  }

  if (tag) tag.textContent = project.category || 'Solar EPC Project';
  if (title) title.textContent = project.title || 'Solar Power Plant';
  if (location) location.textContent = project.location || 'Jharkhand, India';
  if (specSize) specSize.textContent = project.capacity || '100 kWp';
  if (specGen) specGen.textContent = project.annualGeneration || `${(parseFloat(project.capacity) || 50) * 1460} kWh/yr`;
  if (specTech) specTech.textContent = project.modules || 'Tier-1 Mono PERC (550Wp)';
  if (specGrid) specGrid.textContent = project.discom || 'JBVNL / TSUISL Net Metered';
  if (desc) desc.textContent = project.description || 'Turnkey engineered, procured, and commissioned by JDC Solar.';
}

function showPreviousProject() {
  if (!projectsCache.length) return;
  currentIndex = (currentIndex - 1 + projectsCache.length) % projectsCache.length;
  updateLightboxContent(projectsCache[currentIndex]);
}

function showNextProject() {
  if (!projectsCache.length) return;
  currentIndex = (currentIndex + 1) % projectsCache.length;
  updateLightboxContent(projectsCache[currentIndex]);
}

export function openProjectLightbox(projectId) {
  ensureLightboxDOM();
  loadProjectsData().then(projects => {
    if (!projects || !projects.length) return;
    const foundIndex = projects.findIndex(p => p.id === projectId || p.slug === projectId);
    currentIndex = foundIndex !== -1 ? foundIndex : 0;
    updateLightboxContent(projects[currentIndex]);

    if (lightboxDialog && typeof lightboxDialog.showModal === 'function') {
      lightboxDialog.showModal();
      document.body.style.overflow = 'hidden';
    }
  });
}

export function initProjectLightbox() {
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.card-project, [data-project-id], .horizontal-project-card');
    if (card) {
      
      if (e.target.closest('a.btn, button.btn')) return;

      const projectId = card.getAttribute('data-project-id') ||
                        card.querySelector('[data-project-id]')?.getAttribute('data-project-id') ||
                        card.querySelector('a')?.getAttribute('href')?.split('/')?.filter(Boolean)?.pop();

      if (projectId) {
        e.preventDefault();
        openProjectLightbox(projectId);
      }
    }
  });
}
