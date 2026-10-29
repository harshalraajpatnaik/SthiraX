import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-manufacturers',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="page-solutions">
      <header class="page-header">
        <div class="container">
          <span class="section-tag">Manufacturer Solutions</span>
          <h1 class="page-title">Retrofit Your Precast Plant for Certified Low-Carbon Production</h1>
          <p class="page-subtitle">
            An asset-light technology partnership for established regional precast manufacturers in India. Introduce accelerated CO₂ curing into your existing facility to produce high-performance, compliant precast materials without greenfield capital outlay.
          </p>
        </div>
      </header>

      <section class="container content-section">
        <div class="layout-grid">
          <!-- Left: Partner Model Walkthrough -->
          <div class="info-side">
            <h2 class="sub-heading">The 10-Stage Onboarding & Retrofit Model</h2>
            <p class="text-lead">
              Our engineering team collaborates with plant operators through a phased, de-risked onboarding process before commercial production release.
            </p>

            <div class="stages-timeline">
              <div class="timeline-item">
                <span class="timeline-step">1</span>
                <div>
                  <h4>Facility Feasibility & Capacity Review</h4>
                  <p>Evaluation of plant footprint, existing mixer capability, press/mold types, and daily output volume.</p>
                </div>
              </div>

              <div class="timeline-item">
                <span class="timeline-step">2</span>
                <div>
                  <h4>Feedstock Suitability Assessment</h4>
                  <p>Chemical & physical analysis of regional industrial byproducts (GGBS slag, fly ash, quarry dust, and processed C&D recycled fines).</p>
                </div>
              </div>

              <div class="timeline-item">
                <span class="timeline-step">3</span>
                <div>
                  <h4>CO₂ Supply Corridor Analysis</h4>
                  <p>Transit distance and cryogenic delivery economics from approved regional industrial or biogenic CO₂ sources.</p>
                </div>
              </div>

              <div class="timeline-item">
                <span class="timeline-step">4</span>
                <div>
                  <h4>Chamber Retrofit Engineering</h4>
                  <p>P&ID schematic and fabrication of an enclosed curing chamber or sealed rack skid with automated gas injection manifold.</p>
                </div>
              </div>

              <div class="timeline-item">
                <span class="timeline-step">5</span>
                <div>
                  <h4>Sensors, Safety & HAZOP Installation</h4>
                  <p>Ambient CO₂ safety monitors, automated pressure relief valves, exhaust vents, and Coriolis flow telemetry logger.</p>
                </div>
              </div>

              <div class="timeline-item">
                <span class="timeline-step">6</span>
                <div>
                  <h4>Operator Training & Safety Protocols</h4>
                  <p>Hands-on operational training for plant mixing, mold cycle timing, chamber sealing, and batch ticket logging.</p>
                </div>
              </div>

              <div class="timeline-item">
                <span class="timeline-step">7</span>
                <div>
                  <h4>Trial Batch Production</h4>
                  <p>Pilot batch runs under controlled carbonation pressure (2.0 - 2.5 bar) to establish optimal reaction curves.</p>
                </div>
              </div>

              <div class="timeline-item">
                <span class="timeline-step">8</span>
                <div>
                  <h4>NABL Quality & BIS Validation</h4>
                  <p>Third-party testing for compressive strength (M30 - M40), water absorption, and abrasion resistance against IS 15658 / IS 2185.</p>
                </div>
              </div>

              <div class="timeline-item">
                <span class="timeline-step">9</span>
                <div>
                  <h4>Platform Onboarding & Authorization</h4>
                  <p>Formal approval by SthiraX Quality & Operations leads, connecting the facility to regional procurement orders.</p>
                </div>
              </div>

              <div class="timeline-item">
                <span class="timeline-step">10</span>
                <div>
                  <h4>SthiraX Trace Digital Batch Issuance</h4>
                  <p>Automated public batch passport generation for all dispatched commercial lots.</p>
                </div>
              </div>
            </div>

            <div class="card fee-card">
              <h3>Commercial Structures</h3>
              <p>
                SthiraX works with partners through flexible models tailored to plant scale:
              </p>
              <ul>
                <li><strong>Skid Lease + Production Royalty:</strong> Minimal upfront capex; recurring monthly equipment lease and per-tonne technology royalty.</li>
                <li><strong>Direct Equipment Ownership:</strong> Plant purchases and owns the skid hardware; SthiraX provides MRV software subscription and quality support.</li>
                <li><strong>Procurement Off-Take:</strong> SthiraX routes contracted municipal and commercial developer purchase orders directly to participating network plants.</li>
              </ul>
              <small class="fee-disclaimer">
                *Final fee structures are determined following technical plant audit and feedstock verification.
              </small>
            </div>
          </div>

          <!-- Right: Onboarding Form -->
          <div class="form-side">
            <div class="card application-card">
              <div class="app-header">
                <h3>Plant Partner Application</h3>
                <p>Register your precast manufacturing facility for initial technical audit and pilot cohort review.</p>
              </div>

              <div class="alert alert-info">
                <span>&#9432; Submission places your plant in a pending-review workflow. It does not constitute immediate commercial approval or a binding contract.</span>
              </div>

              <div class="alert alert-success" *ngIf="submitSuccess">
                <h4>Application Logged</h4>
                <p>{{ submitMessage }}</p>
                <small>Application ID: {{ applicationId }} &bull; SthiraX Operations Review</small>
              </div>

              <div class="alert alert-danger" *ngIf="submitError">
                <p>{{ submitError }}</p>
              </div>

              <form [formGroup]="partnerForm" (ngSubmit)="onSubmit()" *ngIf="!submitSuccess">
                <div class="form-group">
                  <label class="form-label">Company Name *</label>
                  <input type="text" formControlName="companyName" class="form-control" placeholder="e.g. Prakriti Precast Elements LLP">
                  <span class="form-error" *ngIf="partnerForm.get('companyName')?.touched && partnerForm.get('companyName')?.invalid">
                    Company name is required.
                  </span>
                </div>

                <div class="form-group">
                  <label class="form-label">Contact Person *</label>
                  <input type="text" formControlName="contactPerson" class="form-control" placeholder="Managing Director / Plant Head">
                </div>

                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Business Email *</label>
                    <input type="email" formControlName="email" class="form-control" placeholder="contact@company.com">
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">Phone *</label>
                    <input type="text" formControlName="phone" class="form-control" placeholder="+91 98765 43210">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Plant Location (City / State) *</label>
                    <input type="text" formControlName="facilityLocation" class="form-control" placeholder="e.g. Hosur, Tamil Nadu">
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">PIN Code *</label>
                    <input type="text" formControlName="facilityPincode" class="form-control" placeholder="635126">
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Estimated Monthly Production Capacity (Tonnes) *</label>
                  <input type="number" formControlName="monthlyCapacityTPA" class="form-control" placeholder="e.g. 2500">
                </div>

                <div class="form-group">
                  <label class="form-label">Current Curing Method</label>
                  <select formControlName="curingMethod" class="form-control">
                    <option value="Ambient Air & Water Spray">Ambient Air & Water Spray Curing</option>
                    <option value="Steam Curing Chamber">Steam Curing Chamber</option>
                    <option value="Curing Pond / Water Submersion">Curing Pond / Water Submersion</option>
                    <option value="Covered Rack Shed">Covered Rack Shed</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Current Raw Materials & Feedstocks Used</label>
                  <input type="text" formControlName="currentFeedstocks" class="form-control" placeholder="e.g. OPC 53, Fly Ash (Class F), GGBS Slag, Crushed Sand">
                </div>

                <button type="submit" class="btn btn-primary btn-block" [disabled]="partnerForm.invalid || isSubmitting">
                  <span *ngIf="!isSubmitting">Submit Onboarding Application</span>
                  <span *ngIf="isSubmitting">Submitting Application...</span>
                </button>
              </form>
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
    .layout-grid {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      gap: 3.5rem;
      align-items: start;
    }
    .sub-heading {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.75rem;
    }
    .text-lead {
      font-size: 0.95rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .stages-timeline {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-bottom: 2.5rem;
    }
    .timeline-item {
      display: flex;
      gap: 1rem;
    }
    .timeline-step {
      width: 28px;
      height: 28px;
      background: var(--color-accent);
      color: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.78rem;
      font-weight: 800;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .timeline-item h4 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.2rem;
    }
    .timeline-item p {
      font-size: 0.84rem;
      color: var(--color-text-muted);
      line-height: 1.5;
    }
    .fee-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 1.75rem;
    }
    .fee-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.75rem;
    }
    .fee-card p {
      font-size: 0.88rem;
      color: var(--color-text-muted);
      margin-bottom: 1rem;
    }
    .fee-card ul {
      padding-left: 1.25rem;
      font-size: 0.84rem;
      color: var(--color-text-muted);
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      margin-bottom: 1rem;
    }
    .fee-card ul strong {
      color: var(--color-text-main);
    }
    .fee-disclaimer {
      font-size: 0.75rem;
      color: var(--color-text-subtle);
    }
    .application-card {
      background: #ffffff;
      border: 1px solid var(--color-border-medium);
      border-radius: var(--radius-md);
      padding: 2rem;
      box-shadow: var(--shadow-card);
      position: sticky;
      top: 90px;
    }
    .app-header h3 {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.35rem;
    }
    .app-header p {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin-bottom: 1.25rem;
    }
    .form-row {
      display: flex;
      gap: 1rem;
    }
    .form-col {
      flex: 1;
    }
    .btn-block {
      width: 100%;
      padding: 0.75rem;
      font-size: 0.95rem;
    }
    .alert {
      padding: 0.85rem 1rem;
      border-radius: var(--radius-sm);
      margin-bottom: 1.25rem;
      font-size: 0.84rem;
      line-height: 1.5;
    }
    .alert-info {
      background: var(--color-status-info-bg);
      border: 1px solid rgba(31, 95, 139, 0.2);
      color: var(--color-status-info);
    }
    .alert-success {
      background: var(--color-status-success-bg);
      border: 1px solid rgba(27, 99, 62, 0.2);
      color: var(--color-status-success);
    }
    .alert-success h4 {
      font-weight: 700;
      margin-bottom: 0.25rem;
    }
    .alert-danger {
      background: var(--color-status-danger-bg);
      border: 1px solid rgba(164, 35, 35, 0.2);
      color: var(--color-status-danger);
    }
    @media (max-width: 992px) {
      .layout-grid {
        grid-template-columns: 1fr;
      }
      .application-card {
        position: static;
      }
    }
  `]
})
export class ManufacturersComponent {
  partnerForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitMessage = '';
  applicationId = '';
  submitError = '';

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.partnerForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      contactPerson: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      facilityLocation: ['', [Validators.required]],
      facilityPincode: ['', [Validators.required, Validators.minLength(6)]],
      monthlyCapacityTPA: [2500, [Validators.required, Validators.min(10)]],
      curingMethod: ['Ambient Air & Water Spray', [Validators.required]],
      currentFeedstocks: ['']
    });
  }

  onSubmit(): void {
    if (this.partnerForm.invalid) return;

    this.isSubmitting = true;
    this.submitError = '';

    const payload = {
      ...this.partnerForm.value,
      applicantRole: 'MANUFACTURER'
    };

    this.api.submitPartnerApplication(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.submitMessage = res.message || 'Application submitted successfully. Under review by operations team.';
        this.applicationId = res.applicationId || 'APP-REF';
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = 'Could not submit partner application. Please verify connection and try again.';
      }
    });
  }
}
