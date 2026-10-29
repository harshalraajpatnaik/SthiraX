import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { ProductPassport } from '../../core/models/models';

@Component({
  selector: 'app-passport',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-passport" *ngIf="passport">
      <div class="top-banner">
        <div class="container banner-inner">
          <div class="banner-title">
            <span class="shield-icon">&check;</span>
            <div>
              <h2>SthiraX Digital Product Passport</h2>
              <p>Cryptographically logged batch traceability certificate &bull; Public View</p>
            </div>
          </div>
          <div class="status-tags">
            <span class="badge badge-success">{{ passport.publicationStatus }}</span>
            <span class="badge badge-info">{{ passport.verificationStatus }}</span>
          </div>
        </div>
      </div>

      <div class="container passport-body">
        <!-- Prominent Disclosure Callout -->
        <div class="disclosure-alert">
          <strong>Transparency Notice:</strong> {{ passport.disclaimer }}
        </div>

        <div class="passport-grid">
          <!-- Main Passport Sheet -->
          <div class="passport-sheet">
            <!-- Header Block -->
            <div class="sheet-header">
              <div class="sheet-id">
                <span class="id-label">Batch Identifier</span>
                <h1 class="batch-code">{{ passport.batchNumber }}</h1>
              </div>
              <div class="sheet-qr">
                <div class="qr-mock">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><line x1="10" y1="3" x2="10" y2="10"></line><line x1="3" y1="10" x2="10" y2="10"></line><line x1="14" y1="10" x2="21" y2="10"></line><line x1="10" y1="14" x2="10" y2="21"></line></svg>
                </div>
                <span class="qr-label">Passport ID: {{ passport.id }}</span>
              </div>
            </div>

            <!-- Material Details -->
            <div class="sheet-section">
              <h3>Product & Production Provenance</h3>
              <div class="props-grid">
                <div class="prop-item">
                  <span class="prop-label">Product Name</span>
                  <span class="prop-val">{{ passport.productName }}</span>
                </div>
                <div class="prop-item">
                  <span class="prop-label">Product Category</span>
                  <span class="prop-val">{{ passport.productCategory }}</span>
                </div>
                <div class="prop-item">
                  <span class="prop-label">Manufacturing Plant</span>
                  <span class="prop-val">{{ passport.plantLocation }}</span>
                </div>
                <div class="prop-item">
                  <span class="prop-label">Production Date</span>
                  <span class="prop-val">{{ passport.productionDate }}</span>
                </div>
                <div class="prop-item">
                  <span class="prop-label">Certified Batch Output</span>
                  <span class="prop-val">{{ passport.totalOutputUnits }} {{ passport.outputUnit }}</span>
                </div>
                <div class="prop-item">
                  <span class="prop-label">Applicable BIS Standard</span>
                  <span class="prop-val">{{ passport.bisStandardReference }}</span>
                </div>
              </div>
            </div>

            <!-- Feedstock Breakdown -->
            <div class="sheet-section">
              <h3>Verified Input Materials (Secondary Feedstocks)</h3>
              <div class="feedstock-list">
                <div class="feedstock-tag" *ngFor="let f of passport.verifiedRecycledFeedstocks">
                  <span class="dot"></span>
                  <span>{{ f }}</span>
                </div>
              </div>
              <p class="section-note">
                Input material weight tickets reconciled against batch formula before chamber sealing.
              </p>
            </div>

            <!-- Mineralization & Carbon Science -->
            <div class="sheet-section">
              <h3>CO₂ Mineralization Telemetry</h3>
              <div class="carbon-stats-grid">
                <div class="c-stat-box">
                  <span class="c-stat-label">CO₂ Injected (Coriolis Log)</span>
                  <span class="c-stat-val">{{ passport.co2InjectedKg }} kg</span>
                  <small>Mass-flow meter reading</small>
                </div>
                <div class="c-stat-box highlight">
                  <span class="c-stat-label">Mineralized CO₂ (Permanent)</span>
                  <span class="c-stat-val">{{ passport.mineralizedCo2Kg }} kg</span>
                  <small>Differential mass & TGA verification</small>
                </div>
                <div class="c-stat-box">
                  <span class="c-stat-label">Tested 28d Strength</span>
                  <span class="c-stat-val">{{ passport.testedStrengthMpa }} MPa</span>
                  <small>Exceeds IS 15658 M40 Grade</small>
                </div>
              </div>

              <div class="methodology-box">
                <span class="meth-label">Accounting Methodology:</span>
                <p>{{ passport.measurementMethodology }}</p>
              </div>
            </div>

            <!-- Governance & Signoff -->
            <div class="sheet-footer">
              <div class="signoff-box">
                <span class="sign-label">Review & Authorization Lead</span>
                <span class="sign-name">{{ passport.reviewerRole }}</span>
                <span class="sign-date">Published: {{ passport.publishedAt | date:'mediumDate' }}</span>
              </div>
              <div class="audit-seal">
                <span class="seal-icon">&checkmark;</span>
                <span>SthiraX Authenticated Record</span>
              </div>
            </div>
          </div>

          <!-- Sidebar: Status Ladder & Explanations -->
          <div class="passport-side">
            <div class="card ladder-card">
              <h3>Verification Status Ladder</h3>
              <p class="ladder-desc">
                SthiraX records progress through strict verification tiers.
              </p>

              <div class="ladder-steps">
                <div class="ladder-step completed">
                  <span class="step-icon">&check;</span>
                  <div>
                    <strong>1. Estimated</strong>
                    <p>Mix design calculation based on binder chemistry</p>
                  </div>
                </div>
                <div class="ladder-step completed">
                  <span class="step-icon">&check;</span>
                  <div>
                    <strong>2. Recorded</strong>
                    <p>Plant weighbridge and Coriolis flow telemetry logged</p>
                  </div>
                </div>
                <div class="ladder-step completed">
                  <span class="step-icon">&check;</span>
                  <div>
                    <strong>3. Evidence Submitted</strong>
                    <p>Laboratory compressive strength break report attached</p>
                  </div>
                </div>
                <div class="ladder-step active">
                  <span class="step-icon">&check;</span>
                  <div>
                    <strong>4. Reviewed</strong>
                    <p>Authorized SthiraX Quality Reviewer signoff completed</p>
                  </div>
                </div>
                <div class="ladder-step future">
                  <span class="step-icon">&bull;</span>
                  <div>
                    <strong>5. Independently Verified</strong>
                    <p>Accredited third-party VVB audit (commercial registry phase)</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card privacy-card">
              <h4>Confidentiality Protections</h4>
              <p>
                In compliance with commercial agreements, public passports expose verified technical, quality, and environmental metrics while strictly redacting:
              </p>
              <ul>
                <li>Individual raw material supplier contract prices</li>
                <li>CO₂ procurement and transport tariffs</li>
                <li>Customer commercial invoice totals</li>
                <li>Confidential production floor operational records</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-passport-loading container text-center" *ngIf="!passport" style="padding: 6rem 1rem; text-align: center;">
      <div class="card p-8 max-w-lg mx-auto bg-surface border-subtle" style="display: inline-block; padding: 2.5rem; border: 1px solid #e0e2db; border-radius: 8px;">
        <h3 class="text-xl font-display font-bold text-primary mb-2" style="font-size: 1.3rem; margin-bottom: 0.5rem;">Loading SthiraX Digital Product Passport...</h3>
        <p class="text-sm text-secondary mb-4" style="color: #626a6c; margin-bottom: 1.5rem;">Connecting to SthiraX Trace registry and verifying SHA-256 seal.</p>
        <a routerLink="/trace" class="btn btn-primary text-xs">Back to Trace Registry</a>
      </div>
    </div>
  `,
  styles: [`
    .top-banner {
      background: #171b1d;
      color: #ffffff;
      padding: 2rem 0;
      border-bottom: 1px solid #23292c;
    }
    .banner-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .banner-title {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .shield-icon {
      width: 38px;
      height: 38px;
      background: var(--color-accent);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      font-weight: bold;
    }
    .banner-title h2 {
      font-size: 1.35rem;
      font-weight: 800;
      margin: 0;
      line-height: 1.2;
    }
    .banner-title p {
      font-size: 0.8rem;
      color: #8c979a;
      margin: 2px 0 0;
    }
    .status-tags {
      display: flex;
      gap: 0.5rem;
    }
    .passport-body {
      padding-top: 2rem;
      padding-bottom: 5rem;
    }
    .disclosure-alert {
      background: var(--color-status-warning-bg);
      border: 1px solid rgba(158, 100, 6, 0.25);
      color: var(--color-status-warning);
      border-radius: var(--radius-sm);
      padding: 0.85rem 1.25rem;
      font-size: 0.84rem;
      line-height: 1.5;
      margin-bottom: 2rem;
    }
    .passport-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 2.5rem;
      align-items: start;
    }
    .passport-sheet {
      background: #ffffff;
      border: 1px solid var(--color-border-medium);
      border-radius: var(--radius-md);
      padding: 2.5rem;
      box-shadow: var(--shadow-card);
    }
    .sheet-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 1.5rem;
      border-bottom: 2px solid var(--color-border-subtle);
      margin-bottom: 2rem;
    }
    .id-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--color-text-subtle);
    }
    .batch-code {
      font-family: var(--font-mono);
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--color-accent);
      margin: 0;
    }
    .sheet-qr {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.35rem;
    }
    .qr-mock {
      color: var(--color-text-main);
      background: var(--color-bg-base);
      padding: 0.4rem;
      border-radius: 4px;
      border: 1px solid var(--color-border-subtle);
    }
    .qr-label {
      font-size: 0.7rem;
      font-family: var(--font-mono);
      color: var(--color-text-subtle);
    }
    .sheet-section {
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--color-border-subtle);
    }
    .sheet-section h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 1rem;
    }
    .props-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem 1.5rem;
      font-size: 0.86rem;
    }
    .prop-item {
      display: flex;
      flex-direction: column;
    }
    .prop-label {
      font-size: 0.75rem;
      color: var(--color-text-subtle);
      font-weight: 600;
      margin-bottom: 2px;
    }
    .prop-val {
      color: var(--color-text-main);
      font-weight: 600;
    }
    .feedstock-list {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      margin-bottom: 0.6rem;
    }
    .feedstock-tag {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--color-bg-base);
      padding: 0.5rem 0.8rem;
      border-radius: var(--radius-sm);
      font-size: 0.84rem;
      font-weight: 500;
      color: var(--color-text-main);
    }
    .feedstock-tag .dot {
      width: 6px;
      height: 6px;
      background: var(--color-accent);
      border-radius: 50%;
    }
    .section-note {
      font-size: 0.78rem;
      color: var(--color-text-subtle);
      font-style: italic;
    }
    .carbon-stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 1.25rem;
    }
    .c-stat-box {
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-sm);
      padding: 1rem;
      display: flex;
      flex-direction: column;
    }
    .c-stat-box.highlight {
      background: var(--color-accent-subtle);
      border-color: var(--color-accent-border);
    }
    .c-stat-label {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--color-text-subtle);
      margin-bottom: 0.25rem;
    }
    .c-stat-val {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--color-text-main);
      line-height: 1.2;
    }
    .c-stat-box.highlight .c-stat-val {
      color: var(--color-accent);
    }
    .c-stat-box small {
      font-size: 0.7rem;
      color: var(--color-text-muted);
      margin-top: 0.25rem;
    }
    .methodology-box {
      font-size: 0.82rem;
      background: var(--color-bg-base);
      padding: 0.75rem 1rem;
      border-radius: var(--radius-sm);
    }
    .meth-label {
      font-weight: 700;
      color: var(--color-text-subtle);
      display: block;
      margin-bottom: 2px;
    }
    .methodology-box p {
      color: var(--color-text-muted);
      margin: 0;
    }
    .sheet-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
    }
    .sign-label {
      font-size: 0.72rem;
      color: var(--color-text-subtle);
      text-transform: uppercase;
      font-weight: 600;
      display: block;
    }
    .sign-name {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-text-main);
      display: block;
    }
    .sign-date {
      font-size: 0.75rem;
      color: var(--color-text-subtle);
    }
    .audit-seal {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--color-status-success);
      background: var(--color-status-success-bg);
      padding: 0.4rem 0.8rem;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(27, 99, 62, 0.2);
    }
    .ladder-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 1.75rem;
      margin-bottom: 1.5rem;
      box-shadow: var(--shadow-subtle);
    }
    .ladder-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.35rem;
    }
    .ladder-desc {
      font-size: 0.82rem;
      color: var(--color-text-muted);
      margin-bottom: 1.5rem;
    }
    .ladder-steps {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .ladder-step {
      display: flex;
      gap: 0.75rem;
      font-size: 0.82rem;
    }
    .ladder-step .step-icon {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .ladder-step.completed .step-icon {
      background: var(--color-status-success-bg);
      color: var(--color-status-success);
    }
    .ladder-step.active .step-icon {
      background: var(--color-accent);
      color: #ffffff;
    }
    .ladder-step.future .step-icon {
      background: var(--color-bg-subtle);
      color: var(--color-text-subtle);
    }
    .ladder-step strong {
      display: block;
      color: var(--color-text-main);
    }
    .ladder-step p {
      color: var(--color-text-muted);
      margin: 2px 0 0;
      font-size: 0.78rem;
    }
    .privacy-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 1.5rem;
    }
    .privacy-card h4 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.5rem;
    }
    .privacy-card p {
      font-size: 0.82rem;
      color: var(--color-text-muted);
      margin-bottom: 0.75rem;
      line-height: 1.5;
    }
    .privacy-card ul {
      padding-left: 1.25rem;
      font-size: 0.78rem;
      color: var(--color-text-muted);
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    @media (max-width: 992px) {
      .passport-grid {
        grid-template-columns: 1fr;
      }
      .carbon-stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PassportComponent implements OnInit {
  @Input() id?: string;
  passport?: ProductPassport;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    const passportId = this.id || routeId || 'pass-7f9a2b4c';
    this.api.getPassport(passportId).subscribe(res => {
      this.passport = res || this.api.getFallbackPassport('pass-7f9a2b4c');
    });
  }
}
