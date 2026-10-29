import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trace',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="page-trace">
      <header class="page-header">
        <div class="container">
          <span class="section-tag">Product Architecture</span>
          <h1 class="page-title">SthiraX Trace: Industrial Material Passports</h1>
          <p class="page-subtitle">
            A digital MRV (Measurement, Reporting & Verification) platform connecting industrial sensors, plant batch tickets, and quality certificates into tamper-evident product passports.
          </p>
        </div>
      </header>

      <section class="container content-section">
        <!-- Interactive Demo Callout -->
        <div class="card demo-passport-banner">
          <div class="banner-text">
            <span class="badge badge-warning">Live Demonstration</span>
            <h2>Explore a Sample Public Product Passport</h2>
            <p>
              Inspect how a released batch of carbon-cured pavers reveals Coriolis flow meter telemetry, verified raw-material percentages, and 28-day BIS test certificates while protecting private supplier commercial data.
            </p>
          </div>
          <div class="banner-action">
            <a routerLink="/passports/pass-7f9a2b4c" class="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><line x1="4" y1="9" x2="20" y2="9"></line><line x1="9" y1="20" x2="9" y2="9"></line></svg>
              View Batch #STX-2026-B108 Passport
            </a>
            <small>Demo Record &bull; QR Accessible</small>
          </div>
        </div>

        <!-- Quick Lookup Box -->
        <div class="card p-6 bg-surface border-subtle mb-12 shadow-sm" style="background: #ffffff; padding: 1.5rem 2rem; border: 1px solid #e0e2db; border-radius: 8px; margin-bottom: 3rem;">
          <h3 class="text-base font-bold text-primary mb-2" style="font-size: 1.1rem; margin-bottom: 0.5rem;">Direct Batch Passport Verification Lookup</h3>
          <p class="text-xs text-secondary mb-4" style="color: #626a6c; font-size: 0.85rem; margin-bottom: 1rem;">Enter a digital product passport reference ID (e.g. from job-site delivery pallet QR codes):</p>
          <div style="display: flex; gap: 0.75rem; max-width: 600px; flex-wrap: wrap;">
            <input type="text" [(ngModel)]="searchPassportId" placeholder="e.g. pass-7f9a2b4c" class="input" style="flex: 1; min-width: 240px; padding: 0.6rem 0.8rem; border: 1px solid #cbd0d2; border-radius: 4px; font-family: monospace;">
            <button class="btn btn-primary" (click)="verifyPassport()" style="padding: 0.6rem 1.25rem;">Verify Passport &rarr;</button>
          </div>
        </div>

        <!-- Trace Pillars -->
        <div class="pillars-section">
          <span class="section-tag">Trust & Audit Architecture</span>
          <h2 class="sub-heading">Nine Layers of Batch Verifiability</h2>

          <div class="pillars-grid">
            <div class="card pillar-card">
              <span class="p-num">01</span>
              <h4>Unique Batch Identification</h4>
              <p>Every curing pallet is assigned an immutable alphanumeric identifier linking raw materials, plant location, shift operator, and date.</p>
            </div>

            <div class="card pillar-card">
              <span class="p-num">02</span>
              <h4>Raw Material Traceability</h4>
              <p>Feedstock tickets log the exact mass ratios of secondary cementitious materials (GGBS slag, fly ash, and processed C&D fines).</p>
            </div>

            <div class="card pillar-card">
              <span class="p-num">03</span>
              <h4>Coriolis CO₂ Telemetry</h4>
              <p>Direct integration with Coriolis mass flow meters (Endress+Hauser Promass) recording exact kilograms of CO₂ gas injected.</p>
            </div>

            <div class="card pillar-card">
              <span class="p-num">04</span>
              <h4>Chamber Process Parameters</h4>
              <p>Time-series logging of internal chamber pressure (bar), temperature (&deg;C), and curing duration to guarantee complete carbonation.</p>
            </div>

            <div class="card pillar-card">
              <span class="p-num">05</span>
              <h4>Dual Review Governance</h4>
              <p>Mandatory approval workflow requiring certified Quality Reviewers to inspect laboratory break reports before release.</p>
            </div>

            <div class="card pillar-card">
              <span class="p-num">06</span>
              <h4>Independent NABL Certificates</h4>
              <p>Attachment of accredited third-party crush test results verifying compliance with IS 15658 / IS 2185 standards.</p>
            </div>

            <div class="card pillar-card">
              <span class="p-num">07</span>
              <h4>Separated Climate Balances</h4>
              <p>Rigorous reporting keeping CO₂ injected, gross mineralized, gate-to-gate net removal, and avoided emissions separate.</p>
            </div>

            <div class="card pillar-card">
              <span class="p-num">08</span>
              <h4>Commercial Data Redaction</h4>
              <p>Strict access controls ensuring public QR passports reveal only certified sustainability and quality fields, protecting private pricing.</p>
            </div>

            <div class="card pillar-card">
              <span class="p-num">09</span>
              <h4>QR-Enabled Mobile Access</h4>
              <p>Job-site inspectors, municipal auditors, and structural engineers can scan pallet QR codes with standard smartphone cameras.</p>
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
    .demo-passport-banner {
      background: #171b1d;
      color: #ffffff;
      border-radius: var(--radius-lg);
      padding: 2.5rem 3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      margin-bottom: 4rem;
    }
    .banner-text h2 {
      font-size: 1.7rem;
      font-weight: 700;
      margin: 0.6rem 0;
    }
    .banner-text p {
      font-size: 0.95rem;
      color: #9ea9ac;
      max-width: 600px;
      line-height: 1.55;
    }
    .banner-action {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }
    .banner-action small {
      color: #8c979a;
      font-size: 0.75rem;
    }
    .sub-heading {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 2rem;
    }
    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    .pillar-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 1.75rem;
      box-shadow: var(--shadow-subtle);
      display: flex;
      flex-direction: column;
    }
    .p-num {
      font-size: 0.8rem;
      font-weight: 800;
      color: var(--color-accent);
      margin-bottom: 0.75rem;
    }
    .pillar-card h4 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.4rem;
    }
    .pillar-card p {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      line-height: 1.55;
    }
    @media (max-width: 992px) {
      .demo-passport-banner {
        flex-direction: column;
        align-items: flex-start;
      }
      .pillars-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TraceComponent {
  searchPassportId = 'pass-7f9a2b4c';

  constructor(private router: Router) {}

  verifyPassport(): void {
    const id = this.searchPassportId.trim() || 'pass-7f9a2b4c';
    this.router.navigate(['/passports', id]);
  }
}
