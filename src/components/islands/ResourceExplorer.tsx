import React, { useState, useMemo } from 'react';

interface ResourceItem {
  id: string;
  category: 'basics' | 'maintenance' | 'commercial';
  categoryLabel: string;
  badgeClass: string;
  readTime: string;
  title: string;
  url: string;
  summary: string;
}

const RESOURCES: ResourceItem[] = [
  {
    id: 'how-solar-works',
    category: 'basics',
    categoryLabel: 'Solar Basics',
    badgeClass: 'badge--primary',
    readTime: '5 min read',
    title: 'How Rooftop Solar Works: Net-Metering, Inverters & Grid Synchronization',
    url: '/resources/how-solar-rooftop-works/',
    summary: 'Understand how photovoltaic cells convert sunlight into DC electricity, how inverters synchronize with the grid, and how bidirectional net-meters reduce power bills.'
  },
  {
    id: 'solar-maintenance',
    category: 'maintenance',
    categoryLabel: 'Maintenance & O&M',
    badgeClass: 'badge--accent',
    readTime: '6 min read',
    title: 'Solar Panel Maintenance & Cleaning: Preventive Care for Maximum Generation',
    url: '/resources/solar-maintenance-guide/',
    summary: 'Learn recommended cleaning cycles, water quality standards, thermal hotspot inspection, and inverter health monitoring to safeguard your 25-year solar investment.'
  },
  {
    id: 'tax-depreciation',
    category: 'commercial',
    categoryLabel: 'Commercial & Tax',
    badgeClass: 'badge--success',
    readTime: '7 min read',
    title: 'Section 32 Accelerated Depreciation: 40% Year-1 Tax Shield for Businesses',
    url: '/resources/commercial-solar-tax-benefits/',
    summary: 'A comprehensive financial guide on how Indian corporate and commercial entities can claim 40% accelerated depreciation to write off solar capital costs in Year 1.'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Resources' },
  { id: 'basics', label: 'Solar Basics' },
  { id: 'maintenance', label: 'Maintenance & O&M' },
  { id: 'commercial', label: 'Commercial & Tax' }
] as const;

export default function ResourceExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredResources = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return RESOURCES.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery = !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <div>
      {/* Search & Filter Toolbar */}
      <div style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-xl)',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="grid grid--2col" style={{ alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <label className="form-label" htmlFor="resource-search-input">Search Guides &amp; Technical Topics</label>
            <input
              type="text"
              id="resource-search-input"
              className="form-control"
              placeholder="e.g. Net-metering, cleaning, tax depreciation, subsidy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Filter by Topic</label>
            <div className="flex gap-xs" style={{ flexWrap: 'wrap' }} role="group" aria-label="Filter Resources by Category">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  className={`filter-pill resource-filter-pill ${selectedCategory === cat.id ? 'filter-pill--active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={selectedCategory === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <span id="resource-count-badge" className="badge badge--outline" aria-live="polite">
            {filteredResources.length} {filteredResources.length === 1 ? 'Guide' : 'Guides'}
          </span>
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <div id="resources-grid" className="grid grid--3col">
          {filteredResources.map(item => (
            <article
              key={item.id}
              className="card card-resource"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className={`badge ${item.badgeClass}`}>{item.categoryLabel}</span>
                  <span className="text-small text-muted">{item.readTime}</span>
                </div>
                <h2 className="card-resource__title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                  <a href={item.url} style={{ color: 'var(--color-brand-accent)' }}>
                    {item.title}
                  </a>
                </h2>
                <p className="card-resource__summary text-small text-muted" style={{ lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {item.summary}
                </p>
              </div>
              <div>
                <a href={item.url} className="btn btn--secondary btn--block btn--sm">Read Complete Guide →</a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div
          id="resources-empty-state"
          className="empty-state"
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px dashed var(--color-border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-2xl)',
            textAlign: 'center',
            marginTop: '1.5rem'
          }}
        >
          <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>No Guides Match Your Search</h2>
          <p className="text-small text-muted" style={{ maxWidth: '450px', margin: '0 auto 1.5rem auto' }}>
            Try clearing your search query or selecting another category.
          </p>
          <button type="button" id="reset-resource-filters" className="btn btn--secondary" onClick={resetFilters}>
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
