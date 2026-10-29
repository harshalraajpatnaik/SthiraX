import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-about">
      <header class="page-header">
        <div class="container">
          <span class="section-tag">About SthiraX</span>
          <h1 class="page-title">Industrial Climate-Tech for India's Built Environment</h1>
          <p class="page-subtitle">
            A distributed CO₂ mineralization platform transforming captured industrial emissions into certified, lower-carbon precast construction materials.
          </p>
        </div>
      </header>

      <section class="container content-section">
        <div class="about-grid">
          <div class="card mission-card">
            <span class="sub-tag">Why SthiraX Exists</span>
            <h2>The Decarbonization Dilemma of Indian Infrastructure</h2>
            <p>
              India is adding the equivalent of a new Chicago to its urban built environment every year. Traditional Ordinary Portland Cement (OPC) is among the single largest industrial greenhouse gas contributors, accounting for over 7% of national emissions.
            </p>
            <p>
              At the same time, massive industrial hubs—including sugar distilleries, ammonia fertilizer plants, and chemical synthesis units—vent millions of tonnes of pure, captured carbon dioxide. Meanwhile, municipal urban centers generate hundreds of millions of tonnes of concrete rubble under escalating regulatory mandates.
            </p>
            <p>
              <strong>SthiraX bridges this gap.</strong> Rather than treating captured CO₂ as a hazardous waste to inject into deep geological caverns, we direct it into regional precast manufacturing plants as a reactive hardening agent.
            </p>
          </div>

          <div class="card model-card">
            <span class="sub-tag">Operating Strategy</span>
            <h2>The Distributed Network Approach</h2>
            <p>
              Traditional clean-tech cement startups attempt to build multi-million dollar greenfield cement mega-plants. This approach requires vast capital, takes half a decade to permit, and introduces immense logistics overheads.
            </p>
            <p>
              <strong>SthiraX operates asset-light:</strong>
            </p>
            <ul class="model-points">
              <li>We retrofit existing regional precast facilities with skid-mounted CO₂ carbonation enclosures.</li>
              <li>We source local industrial byproducts: Ground Granulated Blast Furnace Slag (GGBS), thermal fly ash, and processed C&D recycled fines.</li>
              <li>We supply digital verification, gas telemetry, and NABL testing protocols to certify products against Indian Standards (IS 15658, IS 2185).</li>
              <li>Every batch is backed by SthiraX Trace product passports for total regulatory and EPR transparency.</li>
            </ul>
          </div>
        </div>

        <div class="priorities-section">
          <span class="section-tag">Current Operational Horizon</span>
          <h2 class="sub-heading">Validation Priorities & Commercial Restraint</h2>
          <div class="priorities-grid">
            <div class="card p-card">
              <h4>1. Material Science Over Hype</h4>
              <p>We do not make unsupported claims of 'carbon negativity' or universal carbon removal. Actual uptake and strength depend on raw material chemistry, chamber curing kinetics, and physical testing.</p>
            </div>
            <div class="card p-card">
              <h4>2. Focus on Non-Structural Precast</h4>
              <p>Initial commercialization concentrates on pavers, kerbstones, and masonry blocks where carbonation provides rapid early strength and water impermeability without structural rebar corrosion risks.</p>
            </div>
            <div class="card p-card">
              <h4>3. Viability Without Carbon Credits</h4>
              <p>Our business and financial models are engineered to be commercially profitable from material sales margins alone. Carbon removal credits represent potential long-term upside, never guaranteed cash flow.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .page-header {
      background: #ffffff;
      border-bottom: 1px solid var(--color-border-subtle);
      padding: 4rem 0 3rem;
    }
    .page-title {
      font-size: 2.3rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.75rem;
      color: var(--color-text-main);
    }
    .page-subtitle {
      font-size: 1.05rem;
      color: var(--color-text-muted);
      max-width: 800px;
      line-height: 1.6;
    }
    .content-section {
      padding-top: 3.5rem;
      padding-bottom: 5rem;
    }
    .about-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
      margin-bottom: 4rem;
    }
    .sub-tag {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-accent);
      display: block;
      margin-bottom: 0.5rem;
    }
    .about-grid h2 {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 1rem;
    }
    .about-grid p {
      font-size: 0.95rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    .model-points {
      padding-left: 1.25rem;
      font-size: 0.9rem;
      color: var(--color-text-muted);
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .sub-heading {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 2rem;
    }
    .priorities-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    .p-card h4 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.5rem;
    }
    .p-card p {
      font-size: 0.86rem;
      color: var(--color-text-muted);
      line-height: 1.55;
    }
    @media (max-width: 900px) {
      .about-grid, .priorities-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {}
