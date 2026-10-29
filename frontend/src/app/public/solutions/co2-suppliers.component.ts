import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-co2-suppliers',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="page-solutions">
      <header class="page-header">
        <div class="container">
          <span class="section-tag">CO₂ Supply Solutions</span>
          <h1 class="page-title">Route Captured CO₂ into Permanent Construction Sinks</h1>
          <p class="page-subtitle">
            SthiraX coordinates supply aggregation, road tanker logistics, and off-take routing for industrial and biogenic CO₂ sources across India's manufacturing clusters.
          </p>
        </div>
      </header>

      <section class="container content-section">
        <div class="layout-grid">
          <!-- Left: Source Suitability Guidelines -->
          <div class="info-side">
            <h2 class="sub-heading">Feedstock Quality & Suitability Standards</h2>
            <p class="text-lead">
              Precast concrete carbonation curing requires specific gas conditioning thresholds. We review gas purity, moisture, and contaminants prior to route authorization.
            </p>

            <div class="source-types-grid">
              <div class="card source-card">
                <span class="tag-priority">High Priority</span>
                <h4>Biogenic Fermentation CO₂</h4>
                <p>Distilleries, bio-ethanol plants, and breweries. Typically &gt;98% purity with minimal heavy-metal or sulfur contamination.</p>
              </div>

              <div class="card source-card">
                <span class="tag-priority">Evaluated</span>
                <h4>Ammonia & Fertilizer Gas</h4>
                <p>Concentrated process streams from urea synthesis and hydrogen units; requires gas chilling and pressure regulation review.</p>
              </div>

              <div class="card source-card">
                <span class="tag-warning">Special Conditioning</span>
                <h4>Flue Gas & Industrial Exhaust</h4>
                <p>Direct flue gas requires de-dusting, SOx/NOx scrubbing, and moisture separation before curing chamber injection.</p>
              </div>
            </div>

            <div class="card criteria-card">
              <h3>Technical Quality Acceptance Criteria</h3>
              <table class="criteria-table">
                <tbody>
                  <tr>
                    <th>Minimum CO₂ Concentration</th>
                    <td>&ge; 90% preferred for accelerated chamber curing</td>
                  </tr>
                  <tr>
                    <th>Delivery Physical State</th>
                    <td>Liquid CO₂ (cryogenic insulated road tanker at 16 - 22 bar)</td>
                  </tr>
                  <tr>
                    <th>Permissible Sulfur (SOx)</th>
                    <td>&lt; 50 ppm to prevent sulfate attack on concrete matrix</td>
                  </tr>
                  <tr>
                    <th>Logistics Service Radius</th>
                    <td>Within 150 km road transit distance to precast partner clusters</td>
                  </tr>
                </tbody>
              </table>
              <small class="disclaimer-text">
                *Technical suitability is determined via GC-MS chemical spectrometry of supplier source samples.
              </small>
            </div>
          </div>

          <!-- Right: Supply Proposal Form -->
          <div class="form-side">
            <div class="card proposal-card">
              <div class="app-header">
                <h3>Submit CO₂ Supply Proposal</h3>
                <p>Provide your facility location, available capacity, and gas quality specifications for technical review.</p>
              </div>

              <div class="alert alert-info">
                <span>&#9432; Submitting a proposal initiates technical source evaluation. Not all gas streams qualify for precast curing.</span>
              </div>

              <div class="alert alert-success" *ngIf="submitSuccess">
                <h4>Proposal Received</h4>
                <p>{{ submitMessage }}</p>
                <small>Proposal ID: {{ proposalId }} &bull; SthiraX Logistics & Chemical Review</small>
              </div>

              <div class="alert alert-danger" *ngIf="submitError">
                <p>{{ submitError }}</p>
              </div>

              <form [formGroup]="supplyForm" (ngSubmit)="onSubmit()" *ngIf="!submitSuccess">
                <div class="form-group">
                  <label class="form-label">Company Name *</label>
                  <input type="text" formControlName="companyName" class="form-control" placeholder="e.g. Deccan Distilleries Ltd">
                  <span class="form-error" *ngIf="supplyForm.get('companyName')?.touched && supplyForm.get('companyName')?.invalid">
                    Company name is required.
                  </span>
                </div>

                <div class="form-group">
                  <label class="form-label">Contact Person *</label>
                  <input type="text" formControlName="contactPerson" class="form-control" placeholder="Commercial Lead / Technical Director">
                </div>

                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Email *</label>
                    <input type="email" formControlName="email" class="form-control" placeholder="co2@company.com">
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">Phone *</label>
                    <input type="text" formControlName="phone" class="form-control" placeholder="+91 98765 43210">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Facility Location (City / State) *</label>
                    <input type="text" formControlName="facilityLocation" class="form-control" placeholder="e.g. Belagavi, Karnataka">
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">PIN Code *</label>
                    <input type="text" formControlName="facilityPincode" class="form-control" placeholder="590001">
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">CO₂ Source Category *</label>
                  <select formControlName="co2SourceType" class="form-control">
                    <option value="BIOETHANOL_FERMENTATION">Bio-Ethanol / Distillery Fermentation</option>
                    <option value="AMMONIA_FERTILIZER">Ammonia / Fertilizer Process Stream</option>
                    <option value="CHEMICAL_SYNTHESIS">Chemical Synthesis / Petrochemical</option>
                    <option value="BIOGAS_UPGRADING">Biogas Upgrading / Bio-CNG</option>
                    <option value="POWER_FLUE_GAS">Thermal Power / Flue Gas Capture</option>
                  </select>
                </div>

                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Available Tonnes / Month *</label>
                    <input type="number" formControlName="availableCo2TonnesPerMonth" class="form-control" placeholder="e.g. 500">
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">Estimated Purity (%)</label>
                    <input type="text" formControlName="co2PurityEstimate" class="form-control" placeholder="e.g. 98.5% biogenic">
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Delivery & Logistics Capabilities</label>
                  <select formControlName="logisticsCapabilities" class="form-control">
                    <option value="CIP_DELIVERED_TANKER">Supplier Owns/Contracts Cryogenic Road Tankers (Delivered)</option>
                    <option value="EX_WORKS_STORAGE">Ex-Works: Bulk Storage Tank Available On-Site (Buyer Collects)</option>
                    <option value="PIPELINE_OR_LOCAL">Over-the-fence pipeline to adjacent industrial park</option>
                  </select>
                </div>

                <button type="submit" class="btn btn-primary btn-block" [disabled]="supplyForm.invalid || isSubmitting">
                  <span *ngIf="!isSubmitting">Submit Supply Proposal</span>
                  <span *ngIf="isSubmitting">Submitting Proposal...</span>
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
    .source-types-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .source-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 1.25rem 1.5rem;
    }
    .tag-priority {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      background: var(--color-accent-subtle);
      color: var(--color-accent);
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      display: inline-block;
      margin-bottom: 0.4rem;
    }
    .tag-warning {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      background: var(--color-status-warning-bg);
      color: var(--color-status-warning);
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      display: inline-block;
      margin-bottom: 0.4rem;
    }
    .source-card h4 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.3rem;
    }
    .source-card p {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      line-height: 1.5;
    }
    .criteria-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 1.75rem;
    }
    .criteria-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 1rem;
    }
    .criteria-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
    .criteria-table th {
      text-align: left;
      padding: 0.6rem 0;
      color: var(--color-text-subtle);
      font-weight: 600;
      border-bottom: 1px solid var(--color-border-subtle);
      width: 45%;
    }
    .criteria-table td {
      padding: 0.6rem 0;
      color: var(--color-text-main);
      font-weight: 500;
      border-bottom: 1px solid var(--color-border-subtle);
    }
    .disclaimer-text {
      font-size: 0.75rem;
      color: var(--color-text-subtle);
    }
    .proposal-card {
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
      .proposal-card {
        position: static;
      }
    }
  `]
})
export class Co2SuppliersComponent {
  supplyForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitMessage = '';
  proposalId = '';
  submitError = '';

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.supplyForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      contactPerson: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      facilityLocation: ['', [Validators.required]],
      facilityPincode: ['', [Validators.required, Validators.minLength(6)]],
      co2SourceType: ['BIOETHANOL_FERMENTATION', [Validators.required]],
      availableCo2TonnesPerMonth: [500, [Validators.required, Validators.min(1)]],
      co2PurityEstimate: ['98.5%'],
      logisticsCapabilities: ['CIP_DELIVERED_TANKER', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.supplyForm.invalid) return;

    this.isSubmitting = true;
    this.submitError = '';

    const payload = {
      ...this.supplyForm.value,
      applicantRole: 'CO2_SUPPLIER'
    };

    this.api.submitPartnerApplication(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.submitMessage = res.message || 'Supply proposal submitted successfully. Scheduled for technical chemical evaluation.';
        this.proposalId = res.applicationId || 'SUP-REF';
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = 'Failed to submit proposal. Please verify connection and retry.';
      }
    });
  }
}
