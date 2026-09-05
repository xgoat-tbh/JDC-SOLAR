import React, { useState, useEffect } from 'react';

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  serviceSlug: string;
  capacityKw: number;
  capacityDisplay: string;
  location: string;
  sector: string;
  monthlyGenerationKwh: number;
  annualSavingsInr: number;
  annualSavingsDisplay: string;
  paybackYears: string;
  co2OffsetTonsPerYear: number;
  panelBrand: string;
  inverterBrand: string;
  gridConnection: string;
  description: string;
  image: string;
  featured: boolean;
}

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'residential', label: 'Residential Solar' },
  { id: 'commercial', label: 'Commercial & Industrial' },
  { id: 'institutional', label: 'Institutional Solar' },
  { id: 'government', label: 'Government Solar' },
  { id: 'street-lights', label: 'Street Lighting' },
  { id: 'solar-parks', label: 'Utility Solar Parks' },
];

export default function ProjectExplorer() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => {
        const list = data.projects || [];
        setProjects(list);

        // Check if hash matches a project slug
        if (typeof window !== 'undefined') {
          const hash = window.location.hash;
          if (hash && hash.startsWith('#project-')) {
            const slug = hash.replace('#project-', '');
            const found = list.find((p: Project) => p.slug === slug || p.id === slug);
            if (found) setSelectedProject(found);
          }
        }
      })
      .catch((err) => console.error('Failed to load projects.json:', err));
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'commercial') {
      return project.category === 'commercial' || project.category === 'industrial';
    }
    return project.category === activeCategory;
  });

  const openModal = (project: Project) => {
    setSelectedProject(project);
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', `#project-${project.slug}`);
    }
  };

  const closeModal = () => {
    setSelectedProject(null);
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#project-')) {
      window.history.replaceState({}, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <div>
      {/* Filter Controls Bar */}
      <div className="project-filters" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div className="flex gap-xs" style={{ flexWrap: 'wrap' }} role="group" aria-label="Filter Projects by Category">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`filter-pill ${isActive ? 'filter-pill--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={isActive}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
        <div>
          <span className="badge badge--outline" aria-live="polite">
            {filteredProjects.length} Project{filteredProjects.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid--3col">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="card-project"
            data-category={project.category}
            data-project-slug={project.slug}
          >
            <div className="card-project__media-wrap">
              <img
                src={project.image}
                alt={project.title}
                className="card-project__image"
                loading="lazy"
                width={600}
                height={400}
              />
              <span className="card-project__category-tag">{project.categoryLabel}</span>
            </div>
            <div className="card-project__body">
              <div className="card-project__location">
                <svg className="icon" aria-hidden="true">
                  <use href="/assets/icons/sprite.svg#icon-location"></use>
                </svg>
                <span>{project.location}</span>
              </div>
              <h2 className="card-project__title" style={{ fontSize: '1.25rem' }}>
                {project.title}
              </h2>
              <div className="card-project__metrics">
                <div className="card-project__metric-item">
                  <span className="card-project__metric-label">System Size</span>
                  <span className="card-project__metric-value">{project.capacityDisplay}</span>
                </div>
                <div className="card-project__metric-item">
                  <span className="card-project__metric-label">Annual Savings</span>
                  <span className="card-project__metric-value">{project.annualSavingsDisplay}</span>
                </div>
              </div>
              <div className="card-project__footer">
                <span className="text-small text-muted">Payback: {project.paybackYears}</span>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => openModal(project)}
                >
                  View Case Study →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div
          className="empty-state"
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px dashed var(--color-border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-2xl)',
            textAlign: 'center',
            marginTop: '1.5rem',
          }}
        >
          <svg
            className="icon"
            style={{ width: '48px', height: '48px', color: 'var(--color-brand-accent)', marginBottom: '1rem' }}
            aria-hidden="true"
          >
            <use href="/assets/icons/sprite.svg#icon-solar-panel"></use>
          </svg>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>No Projects Found for This Category</h3>
          <p className="text-small text-muted" style={{ maxWidth: '450px', margin: '0 auto 1.5rem auto' }}>
            We have delivered over 500+ customized solar installations across Eastern India. Try selecting another category or view all projects.
          </p>
          <button type="button" className="btn btn--secondary" onClick={() => setActiveCategory('all')}>
            Reset All Filters
          </button>
        </div>
      )}

      {/* Case Study Modal Dialog */}
      {selectedProject && (
        <dialog
          open
          className="modal-dialog fixed inset-0 z-50 p-4 m-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full backdrop:bg-black/60 backdrop:backdrop-blur-sm"
          style={{ display: 'flex', flexDirection: 'column' }}
          aria-labelledby="case-study-title"
        >
          <div className="modal-dialog__header">
            <div>
              <span className="modal-category-tag">{selectedProject.categoryLabel}</span>
              <h2 id="case-study-title" className="modal-dialog__title" style={{ fontSize: '1.35rem' }}>
                {selectedProject.title}
              </h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <svg className="icon" style={{ width: '14px', height: '14px' }}>
                  <use href="/assets/icons/sprite.svg#icon-location"></use>
                </svg>
                <span>{selectedProject.location}</span>
              </div>
            </div>
            <button
              type="button"
              className="modal-dialog__close-btn"
              onClick={closeModal}
              aria-label="Close Dialog"
            >
              <svg className="icon" aria-hidden="true">
                <use href="/assets/icons/sprite.svg#icon-close"></use>
              </svg>
            </button>
          </div>

          <div className="modal-dialog__body">
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
              {selectedProject.description}
            </p>

            <div className="modal-stat-grid">
              <div className="modal-stat-card">
                <span className="modal-stat-lbl">Installed Capacity</span>
                <strong className="modal-stat-val modal-stat-val--capacity">{selectedProject.capacityDisplay}</strong>
              </div>
              <div className="modal-stat-card">
                <span className="modal-stat-lbl">Annual Savings</span>
                <strong className="modal-stat-val modal-stat-val--savings">{selectedProject.annualSavingsDisplay}</strong>
              </div>
              <div className="modal-stat-card">
                <span className="modal-stat-lbl">Monthly Generation</span>
                <strong className="modal-stat-val modal-stat-val--generation">
                  ~{selectedProject.monthlyGenerationKwh.toLocaleString('en-IN')} kWh / mo
                </strong>
              </div>
              <div className="modal-stat-card">
                <span className="modal-stat-lbl">Estimated Payback</span>
                <strong className="modal-stat-val modal-stat-val--payback">{selectedProject.paybackYears}</strong>
              </div>
            </div>

            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', color: 'var(--color-text-headings)', fontWeight: 700 }}>
              Technical Equipment & Grid Specs
            </h3>
            <table className="modal-spec-table">
              <tbody>
                <tr>
                  <td className="modal-spec-label">Solar Panels</td>
                  <td className="modal-spec-value">{selectedProject.panelBrand}</td>
                </tr>
                <tr>
                  <td className="modal-spec-label">Inverters</td>
                  <td className="modal-spec-value">{selectedProject.inverterBrand}</td>
                </tr>
                <tr>
                  <td className="modal-spec-label">Grid Connection</td>
                  <td className="modal-spec-value">{selectedProject.gridConnection}</td>
                </tr>
              </tbody>
            </table>

            <div className="modal-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <a href={selectedProject.serviceSlug} className="btn btn--secondary">
                Explore Related Service →
              </a>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  closeModal();
                  const surveyModal = document.getElementById('survey-modal') as HTMLDialogElement | null;
                  if (surveyModal && typeof surveyModal.showModal === 'function') {
                    surveyModal.showModal();
                  }
                }}
              >
                Book Free Site Survey
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
