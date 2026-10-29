import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-technology">
      <header class="page-header">
        <div class="container">
          <span class="section-tag">Engineering & Process Science</span>
          <h1 class="page-title">Accelerated CO₂ Mineralization & Material Chemistry</h1>
          <p class="page-subtitle">
            How SthiraX introduces captured carbon dioxide into calcium-rich supplementary cementitious matrices, triggering thermodynamic carbonate crystallization and producing durable precast materials.
          </p>
        </div>
      </header>

      <section class="container content-section">
        <!-- 1. The Carbon Chemistry Box -->
        <div class="card chemistry-card">
          <div class="card-header">
            <span class="badge badge-info">Reaction Mechanism</span>
            <h2>Mineral Carbonation in Cementitious Concrete</h2>
          </div>
          <p class="chem-text">
            When carbon dioxide gas is injected into moist, unhydrated or early-stage calcium silicate and calcium hydroxide matrices under controlled temperature and pressure (2.0 - 2.5 bar), an exothermic carbonation reaction takes place:
          </p>
          <div class="equation-box">
            <div class="equation-line">
              <span class="eq-term">Ca(OH)₂ (Portlandite)</span> + 
              <span class="eq-term highlight-gas">CO₂ (Gas)</span> &rarr; 
              <span class="eq-term highlight-mineral">CaCO₃ (Calcite)</span> + 
              <span class="eq-term">H₂O</span>
            </div>
            <div class="equation-sub">
              &Delta;H = -74.4 kJ/mol (Exothermic spontaneous crystallization)
            </div>
          </div>
          <p class="chem-subtext">
            The precipitated microcrystalline calcium carbonate densifies the pore structure of the concrete matrix, reducing capillary porosity, accelerating early compressive strength gain, and locking CO₂ into thermodynamically stable stone permanently.
          </p>
        </div>

        <!-- 2. Boundary Clarification Grid (Section 9 Requirement) -->
        <div class="boundary-section">
          <span class="section-tag">Climate Accounting Integrity</span>
          <h2 class="sub-heading">Boundary Distinction: What SthiraX Claims and What It Does Not</h2>
          <p class="text-muted">
            Climate-tech credibility requires absolute transparency. We strictly differentiate between four terms that are often misleadingly conflated in the market.
          </p>

          <div class="boundary-grid">
            <div class="card boundary-card">
              <span class="boundary-pill pill-1">Term 01</span>
              <h3>CO₂ Injected</h3>
              <p>
                The physical mass of gaseous CO₂ fed into the curing chamber from the cryogenic storage vessel, measured via an in-line Coriolis mass flow meter.
              </p>
              <div class="boundary-footer">
                <strong>Measurement:</strong> Coriolis Flow Meter (kg)
              </div>
            </div>

            <div class="card boundary-card">
              <span class="boundary-pill pill-2">Term 02</span>
              <h3>Mineralized CO₂</h3>
              <p>
                The fraction of injected CO₂ that chemically reacts with calcium ions to form permanent solid carbonates, validated via differential mass balance and thermal gravimetric analysis (TGA).
              </p>
              <div class="boundary-footer">
                <strong>Measurement:</strong> Differential Mass + TGA Test
              </div>
            </div>

            <div class="card boundary-card">
              <span class="boundary-pill pill-3">Term 03</span>
              <h3>Net Carbon Removal</h3>
              <p>
                Mineralized CO₂ minus gate-to-gate lifecycle emissions (curing compressor grid electricity and road tanker transit fuel).
              </p>
              <div class="boundary-footer">
                <strong>Calculation:</strong> Mineralized &minus; Lifecycle Emissions
              </div>
            </div>

            <div class="card boundary-card">
              <span class="boundary-pill pill-4">Term 04</span>
              <h3>Avoided Emissions</h3>
              <p>
                Emissions saved by replacing clinker-intensive Ordinary Portland Cement with GGBS slag, fly ash, and C&D recycled fines. This is a baseline reduction, <em>never</em> counted as carbon removal.
              </p>
              <div class="boundary-footer">
                <strong>Category:</strong> Comparative Baseline Savings
              </div>
            </div>
          </div>
        </div>

        <!-- 3. The 11-Stage End-to-End Industrial Process Flow -->
        <div class="process-section">
          <span class="section-tag">Operating Architecture</span>
          <h2 class="sub-heading">The 11-Stage End-to-End System Workflow</h2>
          <p class="text-muted">
            Tracing every step from point-source capture through regional manufacturing to QR-verifiable public delivery.
          </p>

          <div class="flow-list">
            <div class="flow-card" *ngFor="let step of steps">
              <div class="step-badge">{{ step.num }}</div>
              <div class="step-info">
                <div class="step-header">
                  <h4>{{ step.title }}</h4>
                  <span class="badge" [ngClass]="step.maturityClass">{{ step.maturity }}</span>
                </div>
                <p>{{ step.desc }}</p>
                <div class="step-evidence"><strong>Verification / Telemetry:</strong> {{ step.evidence }}</div>
              </div>
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
    .chemistry-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 2.5rem;
      margin-bottom: 4rem;
      box-shadow: var(--shadow-subtle);
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .card-header h2 {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--color-text-main);
    }
    .chem-text {
      font-size: 0.95rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .equation-box {
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-medium);
      border-radius: var(--radius-sm);
      padding: 1.5rem;
      text-align: center;
      margin-bottom: 1.25rem;
    }
    .equation-line {
      font-family: var(--font-mono);
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-main);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      flex-wrap: wrap;
    }
    .highlight-gas {
      color: #b7791f;
      background: rgba(183, 121, 31, 0.1);
      padding: 2px 6px;
      border-radius: 3px;
    }
    .highlight-mineral {
      color: var(--color-accent);
      background: var(--color-accent-subtle);
      padding: 2px 6px;
      border-radius: 3px;
    }
    .equation-sub {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--color-text-subtle);
      margin-top: 0.6rem;
    }
    .chem-subtext {
      font-size: 0.88rem;
      color: var(--color-text-muted);
      line-height: 1.55;
    }
    .boundary-section {
      margin-bottom: 4.5rem;
    }
    .sub-heading {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.5rem;
    }
    .text-muted {
      font-size: 0.95rem;
      color: var(--color-text-muted);
      max-width: 750px;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .boundary-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    .boundary-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-subtle);
    }
    .boundary-pill {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: var(--radius-sm);
      display: inline-block;
      margin-bottom: 0.75rem;
      align-self: flex-start;
    }
    .pill-1 { background: #eef6fc; color: #1f5f8b; }
    .pill-2 { background: var(--color-accent-subtle); color: var(--color-accent); }
    .pill-3 { background: #fdf6e7; color: #9e6406; }
    .pill-4 { background: #f1f2ee; color: #535c5c; }
    .boundary-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.6rem;
    }
    .boundary-card p {
      font-size: 0.84rem;
      color: var(--color-text-muted);
      line-height: 1.55;
      margin-bottom: 1.25rem;
    }
    .boundary-footer {
      margin-top: auto;
      padding-top: 0.75rem;
      border-top: 1px solid var(--color-border-subtle);
      font-size: 0.75rem;
      color: var(--color-text-subtle);
    }
    .boundary-footer strong {
      color: var(--color-text-main);
    }
    .flow-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .flow-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      display: flex;
      gap: 1.5rem;
      align-items: flex-start;
      box-shadow: var(--shadow-subtle);
    }
    .step-badge {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--color-accent);
      background: var(--color-accent-subtle);
      width: 44px;
      height: 44px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .step-info {
      flex: 1;
    }
    .step-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.4rem;
    }
    .step-header h4 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--color-text-main);
    }
    .step-info p {
      font-size: 0.88rem;
      color: var(--color-text-muted);
      line-height: 1.5;
      margin-bottom: 0.6rem;
    }
    .step-evidence {
      font-size: 0.78rem;
      color: var(--color-text-subtle);
      background: var(--color-bg-base);
      padding: 0.4rem 0.75rem;
      border-radius: var(--radius-sm);
      display: inline-block;
    }
    @media (max-width: 1024px) {
      .boundary-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 600px) {
      .boundary-grid {
        grid-template-columns: 1fr;
      }
      .flow-card {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `]
})
export class TechnologyComponent {
  steps = [
    {
      num: '01',
      title: 'CO₂ Source Identification',
      maturity: 'Implemented in Prototype',
      maturityClass: 'badge-info',
      desc: 'Mapping industrial capture units (bioethanol distilleries, ammonia fertilizer plants, biogas upgraders) in regional proximity to target precast manufacturing clusters.',
      evidence: 'Supplier database registry with GIS coordinates & purity certifications'
    },
    {
      num: '02',
      title: 'Source & Quality Assessment',
      maturity: 'Lab Validated Protocol',
      maturityClass: 'badge-success',
      desc: 'Gas chromatography spectrometry analysis to verify minimum 90% CO₂ concentration and ensure sulfur (SOx) is <50 ppm to prevent concrete sulfate degradation.',
      evidence: 'Chemical lab spectrometry certificate'
    },
    {
      num: '03',
      title: 'Conditioning & Liquefaction',
      maturity: 'Commercial Industry Standard',
      maturityClass: 'badge-neutral',
      desc: 'Compression, dehydration, and chilling of gaseous CO₂ into liquid phase at 16 - 22 bar for economical road transport.',
      evidence: 'Bulk tank vessel pressure logs & temperature readings'
    },
    {
      num: '04',
      title: 'Transport Logistics Planning',
      maturity: 'Implemented in Prototype',
      maturityClass: 'badge-info',
      desc: 'Scheduling cryogenic road tanker routes to maintain delivery radius within 150 km, tracking transit distance and associated fuel emissions.',
      evidence: 'Digital shipment bill with origin, destination, vehicle number & km log'
    },
    {
      num: '05',
      title: 'Plant Receiving & Storage',
      maturity: 'Engineering Specification',
      maturityClass: 'badge-warning',
      desc: 'Offloading into vacuum-insulated on-site liquid storage vessels equipped with pressure regulators and ambient safety sensors.',
      evidence: 'Weighbridge tickets and receiver tank telemetry'
    },
    {
      num: '06',
      title: 'Feedstock Selection & Batch Mixing',
      maturity: 'Lab Validated Mix STX-F1',
      maturityClass: 'badge-success',
      desc: 'Formulation blending processed C&D recycled aggregate fines (35%), GGBS blast-furnace slag (30%), fly ash (20%), and OPC (15%) with controlled moisture (7 - 8%).',
      evidence: 'Automated batching plant scale printout & moisture meter log'
    },
    {
      num: '07',
      title: 'CO₂ Mineralization & Chamber Curing',
      maturity: 'Phase 2 Skid Design',
      maturityClass: 'badge-warning',
      desc: 'Demolded green blocks are sealed in the curing chamber. Gaseous CO₂ is metered at 2.2 - 2.5 bar for 12 - 16 hours, driving rapid calcite mineralization.',
      evidence: 'Coriolis mass flow meter (Promass 83F) time-series telemetry'
    },
    {
      num: '08',
      title: 'Quality Testing & Compressive Strength',
      maturity: 'BIS Protocol IS 15658',
      maturityClass: 'badge-success',
      desc: 'Random core compression crushing at 7 and 28-day equivalents to ensure M40 grade compliance (>40 MPa), water absorption (<6%), and abrasion limits.',
      evidence: 'NABL accredited test laboratory test certificate'
    },
    {
      num: '09',
      title: 'Batch Traceability & Evidence Audit',
      maturity: 'Implemented in Prototype',
      maturityClass: 'badge-info',
      desc: 'SthiraX Quality Reviewer validates the digital checklist: raw materials tickets, Coriolis injection logs, and lab crush test certificates.',
      evidence: 'Cryptographically hashed review decision log with reviewer signature'
    },
    {
      num: '10',
      title: 'Product Dispatch & Delivery',
      maturity: 'Implemented in Prototype',
      maturityClass: 'badge-info',
      desc: 'Release of certified precast pallets to the construction buyer with physical QR tags stamped onto cured batches.',
      evidence: 'Goods Receipt Note (GRN) and digital delivery acknowledgement'
    },
    {
      num: '11',
      title: 'Digital Passport & MRV Accounting',
      maturity: 'Implemented in Prototype',
      maturityClass: 'badge-info',
      desc: 'Public Product Passport published on SthiraX Trace. Carbon records archived for potential future voluntary registry audit without premature claims.',
      evidence: 'Public URL passport and ISO 14064-2 gate-to-gate lifecycle balance'
    }
  ];
}
