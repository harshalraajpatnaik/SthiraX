import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-disclosures',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-legal">
      <div class="container legal-container">
        <h1 class="page-title">Methodological Disclosures & Limitations</h1>
        <p class="last-updated">Published: April 2026 &bull; SthiraX Climate Integrity Framework</p>

        <div class="card legal-card">
          <h3>1. Nature of the Platform</h3>
          <p>
            SthiraX is currently an active industrial prototype, engineering decision-support system, and pilot-validation platform. Descriptions of manufacturing operations, CO₂ transport corridors, and partner networks represent validated laboratory methods, skid engineering designs, and planned pilot cohorts. SthiraX does not claim to be a mature nationwide industrial conglomerate.
          </p>

          <h3>2. Carbon Removal & Mineralization Claims</h3>
          <p>
            CO₂ mineralization in precast concrete chemically binds carbon dioxide into stable calcium carbonate (CaCO₃). However:
          </p>
          <ul>
            <li><strong>Not All Injected CO₂ Reacts:</strong> Actual uptake depends on matrix calcium availability, porosity, humidity, and curing kinetics (typically 75 - 90% of injected gas). Unreacted gas must be captured or accounted for.</li>
            <li><strong>Gate-to-Gate Life Cycle Emissions:</strong> Physical net removal must deduct electrical energy consumed by curing chamber compressors and diesel fuel emissions from cryogenic road tanker delivery.</li>
            <li><strong>Avoided Emissions Are Not Removals:</strong> Avoiding clinker emissions by substituting slag or fly ash constitutes an avoided emission baseline, which must never be conflated with physical atmospheric removal.</li>
            <li><strong>Voluntary Carbon Credits Are Non-Guaranteed:</strong> Carbon crediting requires formal methodology acceptance by recognized accreditation registries (e.g. Puro.earth, ISO 14064-2, domestic CCTS). SthiraX does not issue unaccredited carbon credits or promise guaranteed carbon revenue.</li>
          </ul>

          <h3>3. Regulatory Compliance Notice</h3>
          <p>
            References to the Construction and Demolition Waste Management Rules, 2025, Bureau of Indian Standards (BIS) specifications, and Extended Producer Responsibility (EPR) guidelines are provided for informational orientation. Purchasing SthiraX materials or licensing SthiraX skids does not automatically discharge all statutory compliance requirements. Compliance requires independent review by qualified legal and environmental professionals.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-legal {
      padding: 4rem 0 5rem;
    }
    .page-title {
      font-size: 2.2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
      color: var(--color-text-main);
    }
    .last-updated {
      font-size: 0.85rem;
      color: var(--color-text-subtle);
      margin-bottom: 2rem;
    }
    .legal-card {
      background: #ffffff;
      padding: 2.5rem;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
    }
    .legal-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin: 1.5rem 0 0.5rem;
    }
    .legal-card p, .legal-card ul {
      font-size: 0.92rem;
      color: var(--color-text-muted);
      line-height: 1.65;
    }
    .legal-card ul {
      padding-left: 1.25rem;
    }
  `]
})
export class DisclosuresComponent {}
