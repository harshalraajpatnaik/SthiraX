import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Product } from '../../core/models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-home">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container hero-container">
          <div class="hero-content">
            <div class="badge badge-neutral stage-badge">
              <span>Industrial Prototype & Pilot Validation Platform</span>
            </div>
            <h1 class="hero-headline">
              Turning captured CO₂ into traceable construction materials.
            </h1>
            <p class="hero-subtext">
              SthiraX connects industrial CO₂ suppliers, regional precast manufacturers and construction buyers through a distributed mineralization and material-traceability platform in India.
            </p>
            <div class="hero-ctas">
              <a routerLink="/contact" class="btn btn-primary">Request a Quotation</a>
              <a routerLink="/technology" class="btn btn-secondary">Explore How It Works</a>
            </div>
            <div class="hero-metric-strip">
              <div class="metric-item">
                <span class="metric-num">30-50%</span>
                <span class="metric-label">Processed C&D Recycled Fines</span>
              </div>
              <div class="metric-divider"></div>
              <div class="metric-item">
                <span class="metric-num">M30 - M40</span>
                <span class="metric-label">Compressive Strength Targets</span>
              </div>
              <div class="metric-divider"></div>
              <div class="metric-item">
                <span class="metric-num">Asset-Light</span>
                <span class="metric-label">Regional Plant Retrofit Skid</span>
              </div>
            </div>
          </div>

          <div class="hero-graphic">
            <div class="mineral-diagram-card">
              <div class="diagram-header">
                <span class="status-dot"></span>
                <span>Accelerated Carbonation Kinetics</span>
                <span class="tag-accent">Lab Validated</span>
              </div>
              <div class="reaction-formula">
                <div class="molecule-badge">Ca(OH)₂ + CO₂</div>
                <div class="reaction-arrow">&rarr;</div>
                <div class="molecule-badge highlight">CaCO₃ + H₂O</div>
              </div>
              <p class="diagram-desc">
                Permanent calcium carbonate crystallization within supplementary cementitious matrix during early hydration.
              </p>
              <div class="telemetry-preview">
                <div class="tele-row">
                  <span>Chamber Pressure</span>
                  <strong>2.2 - 2.5 bar</strong>
                </div>
                <div class="tele-row">
                  <span>Target Uptake by Binder</span>
                  <strong>6.8 - 9.2% wt</strong>
                </div>
                <div class="tele-row">
                  <span>Curing Cycle Time</span>
                  <strong>12 - 16 hrs</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Architecture & Amateur Guide Callout Banner -->
      <section class="docs-callout-banner">
        <div class="container-wide banner-inner">
          <div class="banner-left">
            <span class="banner-icon-badge">💡</span>
            <div class="banner-text">
              <span class="banner-tag">Beginner & Technical Guide</span>
              <h3 class="banner-heading">How captured factory CO₂ permanently becomes solid precast stone</h3>
              <p class="banner-sub">Explore our 60-second amateur guide, 5-step industrial value chain, and interactive software & IoT architecture.</p>
            </div>
          </div>
          <div class="banner-right">
            <a routerLink="/docs" class="btn btn-primary btn-sm whitespace-nowrap">
              <span>Explore Architecture & Flows</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </section>

      <!-- Three Commercial Pathways -->
      <section class="section pathways-section">
        <div class="container">
          <span class="section-tag">Value Chain Collaboration</span>
          <h2 class="section-title">Coordinating three key industrial participants</h2>
          <p class="section-subtitle">
            An ecosystem model designed to mobilize existing precast plants without heavy capital expenditure.
          </p>

          <div class="pathway-grid">
            <div class="pathway-card">
              <div class="pathway-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              </div>
              <h3>Construction Buyers & Infrastructure</h3>
              <p>
                Procure certified low-carbon pavers, kerbs, and blocks to fulfill C&D Waste Management Rules 2025 recycled-material targets with QR-verifiable batch passports.
              </p>
              <ul class="pathway-bullets">
                <li>Commercial quotes with batch traceability</li>
                <li>NABL accredited compressive strength validation</li>
                <li>EPR compliance audit documentation</li>
              </ul>
              <a routerLink="/materials" class="pathway-link">Explore Material Catalogue &rarr;</a>
            </div>

            <div class="pathway-card highlighted-path">
              <div class="pathway-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
              <h3>Precast Concrete Manufacturers</h3>
              <p>
                Retrofit your existing curing chambers with modular SthiraX CO₂ skid technology. Cut curing times, boost early strength, and produce premium certified low-carbon precast.
              </p>
              <ul class="pathway-bullets">
                <li>No greenfield factory capex required</li>
                <li>Turnkey skid retrofit & telemetry installation</li>
                <li>Local feedstock & slag optimization</li>
              </ul>
              <a routerLink="/solutions/manufacturers" class="pathway-link">Manufacturer Onboarding &rarr;</a>
            </div>

            <div class="pathway-card">
              <div class="pathway-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3>Industrial CO₂ Capture Suppliers</h3>
              <p>
                Route captured biogenic or industrial CO₂ from fermentation distilleries, fertilizer units, and chemical facilities into regional mineralization manufacturing sinks.
              </p>
              <ul class="pathway-bullets">
                <li>Regional off-take logistics coordination</li>
                <li>Bulk cryogenic road tanker planning</li>
                <li>Verifiable utilization telemetry</li>
              </ul>
              <a routerLink="/solutions/co2-suppliers" class="pathway-link">CO₂ Supplier Proposals &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <!-- End-to-End Value Chain Section -->
      <section class="section value-chain-section">
        <div class="container">
          <span class="section-tag">Operating Model</span>
          <h2 class="section-title">The SthiraX Value Chain Architecture</h2>
          <p class="section-subtitle">
            From industrial emission capture to installed infrastructure with digital proof.
          </p>

          <div class="chain-flow">
            <div class="flow-step">
              <span class="step-num">01</span>
              <h4>CO₂ Sourcing</h4>
              <p>Biogenic & industrial capture sources evaluated for purity and regional transit economics.</p>
            </div>
            <div class="flow-arrow">&rarr;</div>

            <div class="flow-step">
              <span class="step-num">02</span>
              <h4>Logistics</h4>
              <p>Bulk cryogenic delivery to regional precast partner plants within economical 150 km radii.</p>
            </div>
            <div class="flow-arrow">&rarr;</div>

            <div class="flow-step">
              <span class="step-num">03</span>
              <h4>Mineralization</h4>
              <p>Accelerated curing chamber injects CO₂ into slag & C&D pozzolanic mix for permanent mineral bonding.</p>
            </div>
            <div class="flow-arrow">&rarr;</div>

            <div class="flow-step">
              <span class="step-num">04</span>
              <h4>Quality Review</h4>
              <p>Compressive strength tested to BIS standards with mass-flow Coriolis meter telemetry.</p>
            </div>
            <div class="flow-arrow">&rarr;</div>

            <div class="flow-step">
              <span class="step-num">05</span>
              <h4>Digital Passport</h4>
              <p>QR-tagged batch passports issued via SthiraX Trace, linking buyers directly to verified records.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Product Catalogue Preview -->
      <section class="section products-preview-section">
        <div class="container">
          <div class="section-header-flex">
            <div>
              <span class="section-tag">Initial Product Scope</span>
              <h2 class="section-title">Non-structural Precast Materials</h2>
            </div>
            <a routerLink="/materials" class="btn btn-secondary btn-sm">View Full Catalogue</a>
          </div>

          <div class="products-grid">
            <div class="product-card" *ngFor="let p of featuredProducts">
              <div class="product-badge">{{ p.specificationStatus }}</div>
              <h3>{{ p.name }}</h3>
              <p class="product-app">{{ p.application }}</p>
              <div class="product-specs">
                <div class="spec-row">
                  <span>Dimensions:</span>
                  <strong>{{ p.dimensions }}</strong>
                </div>
                <div class="spec-row">
                  <span>Target Grade:</span>
                  <strong>{{ p.compressiveStrengthTarget }}</strong>
                </div>
                <div class="spec-row">
                  <span>Estimated Uptake:</span>
                  <strong>{{ p.co2UptakeTarget }}</strong>
                </div>
              </div>
              <div class="product-footer">
                <div class="price-box">
                  <span class="price-val">&#8377;{{ p.indicativePriceInr }}</span>
                  <span class="price-basis">{{ p.priceBasis }}</span>
                </div>
                <a [routerLink]="['/materials', p.slug]" class="btn btn-primary btn-sm">Details & Quote</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Team & Leadership Highlight -->
      <section class="section" style="padding: 2rem 0; background: #ffffff;">
        <div class="container">
          <div class="team-preview-section" style="padding: 2.5rem; background: #fdfdfc; border: 1px solid #e0e2db; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
              <div>
                <span class="section-tag" style="color: #2e624c; font-weight: 700; font-size: 0.75rem; text-transform: uppercase;">Multidisciplinary Engineering</span>
                <h2 style="font-size: 1.6rem; font-weight: 700; color: #181c1c; margin-top: 0.25rem;">Founding & Industrial Operations Team</h2>
                <p style="color: #626a6c; font-size: 0.95rem; margin-top: 0.25rem;">Decades of hands-on experience across BPCL refineries, civil materials, mechanical engineering, enterprise platforms, and media integration.</p>
              </div>
              <a routerLink="/team" class="btn btn-secondary btn-sm" style="white-space: nowrap;">Meet the Entire Team &rarr;</a>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
              <div style="padding: 1.25rem; background: #ffffff; border-radius: 6px; border: 1px solid #e0e2db;">
                <strong style="color: #181c1c; display: block; font-size: 0.95rem;">Sai Nikhil Y</strong>
                <span style="font-size: 0.75rem; color: #2e624c; font-weight: 600;">Product Leadership & Ops</span>
                <p style="font-size: 0.75rem; color: #626a6c; margin-top: 6px; line-height: 1.4;">7 yrs logistics, retail intelligence & manufacturing digitization. Mechanical Engineering.</p>
              </div>
              <div style="padding: 1.25rem; background: #ffffff; border-radius: 6px; border: 1px solid #e0e2db;">
                <strong style="color: #181c1c; display: block; font-size: 0.95rem;">Hitesh Jain A</strong>
                <span style="font-size: 0.75rem; color: #2e624c; font-weight: 600;">Construction Materials</span>
                <p style="font-size: 0.75rem; color: #626a6c; margin-top: 6px; line-height: 1.4;">8+ yrs family business, Civil Engineering graduate, precast materials.</p>
              </div>
              <div style="padding: 1.25rem; background: #ffffff; border-radius: 6px; border: 1px solid #e0e2db;">
                <strong style="color: #181c1c; display: block; font-size: 0.95rem;">Shashank Verma</strong>
                <span style="font-size: 0.75rem; color: #2e624c; font-weight: 600;">Engineering & Projects</span>
                <p style="font-size: 0.75rem; color: #626a6c; margin-top: 6px; line-height: 1.4;">13+ yrs BPCL engineering, safety officer & industrial B2B sales. Civil Engineering.</p>
              </div>
              <div style="padding: 1.25rem; background: #ffffff; border-radius: 6px; border: 1px solid #e0e2db;">
                <strong style="color: #181c1c; display: block; font-size: 0.95rem;">Harshal Raaj Patnaik</strong>
                <span style="font-size: 0.75rem; color: #2e624c; font-weight: 600;">Enterprise Technology</span>
                <p style="font-size: 0.75rem; color: #626a6c; margin-top: 6px; line-height: 1.4;">5+ yrs cloud platforms, software engineering & digital transformation. CSE background.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pilot Programme Section -->
      <section class="section pilot-section">
        <div class="container">
          <div class="pilot-banner">
            <div class="pilot-text">
              <span class="badge badge-warning">Commercial Pilot Program 2026</span>
              <h2>Join the Hosur - Bengaluru Demonstration Cohort</h2>
              <p>
                We are actively reviewing precast manufacturers, infrastructure buyers, and CO₂ suppliers for the Phase 3 pilot trials in the South India industrial corridor.
              </p>
            </div>
            <div class="pilot-actions">
              <a routerLink="/solutions/manufacturers" class="btn btn-dark">Apply as Manufacturer Partner</a>
              <a routerLink="/contact" class="btn btn-secondary">Request Pilot Batch Allocation</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .page-home {
      display: flex;
      flex-direction: column;
    }
    .hero-section {
      background: linear-gradient(180deg, #ffffff 0%, var(--color-bg-base) 100%);
      padding: 5rem 0 4rem;
      border-bottom: 1px solid var(--color-border-subtle);
    }
    .hero-container {
      display: grid;
      grid-template-columns: 1.2fr 0.9fr;
      gap: 3.5rem;
      align-items: center;
    }
    .stage-badge {
      margin-bottom: 1.25rem;
    }
    .hero-headline {
      font-size: 2.75rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.15;
      color: var(--color-text-main);
      margin-bottom: 1.25rem;
    }
    .hero-subtext {
      font-size: 1.15rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .hero-ctas {
      display: flex;
      gap: 1rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
    }
    .hero-metric-strip {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding-top: 2rem;
      border-top: 1px solid var(--color-border-subtle);
    }
    .metric-item {
      display: flex;
      flex-direction: column;
    }
    .metric-num {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--color-accent);
      line-height: 1.2;
    }
    .metric-label {
      font-size: 0.75rem;
      color: var(--color-text-subtle);
      font-weight: 500;
    }
    .metric-divider {
      width: 1px;
      height: 36px;
      background: var(--color-border-medium);
    }
    .mineral-diagram-card {
      background: #ffffff;
      border: 1px solid var(--color-border-medium);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-card);
    }
    .diagram-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 1.5rem;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      background: #27ae60;
      border-radius: 50%;
    }
    .tag-accent {
      margin-left: auto;
      font-size: 0.7rem;
      background: var(--color-accent-subtle);
      color: var(--color-accent);
      padding: 2px 8px;
      border-radius: var(--radius-sm);
    }
    .reaction-formula {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      background: var(--color-bg-subtle);
      padding: 1.25rem;
      border-radius: var(--radius-md);
      margin-bottom: 1rem;
    }
    .molecule-badge {
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-text-main);
      background: #ffffff;
      padding: 0.4rem 0.8rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border-subtle);
    }
    .molecule-badge.highlight {
      background: var(--color-accent);
      color: #ffffff;
      border-color: var(--color-accent);
    }
    .reaction-arrow {
      font-size: 1.3rem;
      color: var(--color-text-subtle);
    }
    .diagram-desc {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      line-height: 1.5;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    .telemetry-preview {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      background: #fbfbf9;
      padding: 1rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border-subtle);
      font-size: 0.85rem;
    }
    .tele-row {
      display: flex;
      justify-content: space-between;
      color: var(--color-text-muted);
    }
    .tele-row strong {
      color: var(--color-text-main);
    }
    .section {
      padding: 5rem 0;
    }
    .pathway-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.75rem;
    }
    .pathway-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-subtle);
    }
    .highlighted-path {
      border-color: var(--color-accent);
      box-shadow: 0 4px 16px rgba(46, 98, 76, 0.08);
    }
    .pathway-icon {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-sm);
      background: var(--color-accent-subtle);
      color: var(--color-accent);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
    }
    .pathway-card h3 {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.75rem;
    }
    .pathway-card p {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      line-height: 1.55;
      margin-bottom: 1.25rem;
    }
    .pathway-bullets {
      list-style: none;
      padding: 0;
      margin: 0 0 1.5rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.84rem;
      color: var(--color-text-muted);
    }
    .pathway-bullets li::before {
      content: "\u2022";
      color: var(--color-accent);
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
    .pathway-bullets li {
      padding-left: 1em;
    }
    .pathway-link {
      margin-top: auto;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--color-accent);
    }
    .value-chain-section {
      background-color: #ffffff;
      border-top: 1px solid var(--color-border-subtle);
      border-bottom: 1px solid var(--color-border-subtle);
    }
    .chain-flow {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 2rem;
    }
    .flow-step {
      flex: 1;
      min-width: 180px;
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 1.5rem 1.25rem;
    }
    .step-num {
      font-size: 0.8rem;
      font-weight: 800;
      color: var(--color-accent);
      display: block;
      margin-bottom: 0.5rem;
    }
    .flow-step h4 {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--color-text-main);
    }
    .flow-step p {
      font-size: 0.82rem;
      color: var(--color-text-muted);
      line-height: 1.45;
    }
    .flow-arrow {
      font-size: 1.5rem;
      color: var(--color-border-medium);
      font-weight: 300;
    }
    .section-header-flex {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 2rem;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.75rem;
    }
    .product-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 2rem;
      box-shadow: var(--shadow-subtle);
      display: flex;
      flex-direction: column;
    }
    .product-badge {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--color-status-warning);
      background: var(--color-status-warning-bg);
      display: inline-block;
      align-self: flex-start;
      padding: 2px 8px;
      border-radius: var(--radius-sm);
      margin-bottom: 0.75rem;
    }
    .product-card h3 {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.4rem;
    }
    .product-app {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin-bottom: 1.25rem;
    }
    .product-specs {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      background: var(--color-bg-base);
      padding: 1rem;
      border-radius: var(--radius-sm);
      margin-bottom: 1.5rem;
      font-size: 0.85rem;
    }
    .spec-row {
      display: flex;
      justify-content: space-between;
      color: var(--color-text-muted);
    }
    .spec-row strong {
      color: var(--color-text-main);
    }
    .product-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border-subtle);
    }
    .price-box {
      display: flex;
      flex-direction: column;
    }
    .price-val {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--color-text-main);
      line-height: 1;
    }
    .price-basis {
      font-size: 0.72rem;
      color: var(--color-text-subtle);
    }
    .pilot-banner {
      background: #171b1d;
      color: #ffffff;
      border-radius: var(--radius-lg);
      padding: 3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }
    .pilot-text h2 {
      font-size: 1.8rem;
      font-weight: 700;
      margin: 0.75rem 0;
    }
    .pilot-text p {
      font-size: 0.95rem;
      color: #9ea9ac;
      max-width: 550px;
    }
    .pilot-actions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      min-width: 250px;
    }
    .docs-callout-banner {
      background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
      border-top: 1px solid #334155;
      border-bottom: 1px solid #334155;
      padding: 1.5rem 0;
      color: #ffffff;
    }
    .banner-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .banner-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .banner-icon-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(5, 150, 105, 0.2);
      border: 1px solid rgba(52, 211, 153, 0.3);
      font-size: 1.35rem;
      flex-shrink: 0;
    }
    .banner-tag {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #34D399;
      display: block;
      margin-bottom: 0.2rem;
    }
    .banner-heading {
      font-size: 1.05rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.3;
      margin: 0;
    }
    .banner-sub {
      font-size: 0.8rem;
      color: #94A3B8;
      margin: 0.25rem 0 0 0;
    }
    .banner-right {
      flex-shrink: 0;
    }
    @media (max-width: 992px) {
      .hero-container {
        grid-template-columns: 1fr;
      }
      .pathway-grid, .products-grid {
        grid-template-columns: 1fr;
      }
      .pilot-banner {
        flex-direction: column;
        align-items: flex-start;
      }
      .flow-arrow {
        display: none;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 2);
    });
  }
}
