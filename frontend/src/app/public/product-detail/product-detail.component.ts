import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Product } from '../../core/models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="page-product-detail" *ngIf="product">
      <!-- Breadcrumb & Top Bar -->
      <div class="breadcrumb-bar">
        <div class="container">
          <nav class="breadcrumbs">
            <a routerLink="/">Home</a> &rsaquo;
            <a routerLink="/materials">Materials</a> &rsaquo;
            <span>{{ product.name }}</span>
          </nav>
        </div>
      </div>

      <!-- Main Product View -->
      <section class="container detail-content">
        <div class="product-layout">
          <!-- Left Column: Technical Information -->
          <div class="tech-column">
            <div class="status-strip">
              <span class="badge badge-warning">{{ product.specificationStatus }}</span>
              <span class="badge badge-info">{{ product.availabilityStatus }}</span>
            </div>

            <h1 class="product-title">{{ product.name }}</h1>
            <p class="product-desc">{{ product.description }}</p>

            <div class="card spec-card">
              <h3>Technical Specifications & Standards</h3>
              <table class="spec-table">
                <tbody>
                  <tr>
                    <th>Category</th>
                    <td>{{ product.category }}</td>
                  </tr>
                  <tr>
                    <th>Dimensions / Profile</th>
                    <td>{{ product.dimensions }}</td>
                  </tr>
                  <tr>
                    <th>Target Grade / Strength</th>
                    <td>{{ product.compressiveStrengthTarget }}</td>
                  </tr>
                  <tr>
                    <th>CO₂ Mineralization Uptake</th>
                    <td>{{ product.co2UptakeTarget }}</td>
                  </tr>
                  <tr>
                    <th>Testing Status</th>
                    <td>{{ product.qualityTestStatus }}</td>
                  </tr>
                  <tr>
                    <th>Primary Applications</th>
                    <td>{{ product.application }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="card formula-card">
              <h3>Available Mix Formulations</h3>
              <div class="formula-list">
                <div class="formula-box" *ngFor="let f of product.availableFormulations">
                  <span class="formula-dot"></span>
                  <strong>{{ f }}</strong>
                </div>
              </div>
              <p class="formula-note">
                Formulations leverage high volumes of blast-furnace slag (GGBS), thermal fly ash, and processed C&D recycled fines under accelerated carbonation chamber curing.
              </p>
            </div>

            <div class="card trace-banner-card">
              <div class="trace-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <div>
                <h4>SthiraX Trace Digital Batch Passports</h4>
                <p>
                  Every commercial delivery batch is issued with an immutable digital product passport detailing Coriolis-metered CO₂ input, 28-day NABL strength test certificates, and raw-material origin tickets.
                </p>
                <a routerLink="/passports/pass-7f9a2b4c" class="trace-link">View Demonstration Passport &rarr;</a>
              </div>
            </div>
          </div>

          <!-- Right Column: Quotation Request Form -->
          <div class="quote-column">
            <div class="card quote-card">
              <div class="quote-header">
                <h3>Request Quotation & Allocation</h3>
                <p>Commercial quotation for project procurement, pilot trial quantities, and developer testing.</p>
              </div>

              <div class="indicative-callout">
                <span class="callout-label">Indicative Base Price:</span>
                <span class="callout-price">&#8377;{{ product.indicativePriceInr }}</span>
                <span class="callout-basis">{{ product.priceBasis }}</span>
              </div>

              <!-- Success Feedback -->
              <div class="alert alert-success" *ngIf="submitSuccess">
                <h4>Quotation Request Logged</h4>
                <p>{{ submitMessage }}</p>
                <small>Reference: {{ enquiryId }} &bull; SthiraX Operations Review</small>
              </div>

              <!-- Error Feedback -->
              <div class="alert alert-danger" *ngIf="submitError">
                <p>{{ submitError }}</p>
              </div>

              <form [formGroup]="quoteForm" (ngSubmit)="onSubmit()" *ngIf="!submitSuccess">
                <div class="form-group">
                  <label class="form-label">Contact Name *</label>
                  <input type="text" formControlName="contactName" class="form-control" placeholder="Full name">
                  <span class="form-error" *ngIf="quoteForm.get('contactName')?.touched && quoteForm.get('contactName')?.invalid">
                    Contact name is required.
                  </span>
                </div>

                <div class="form-group">
                  <label class="form-label">Business Email *</label>
                  <input type="email" formControlName="email" class="form-control" placeholder="name&#64;company.com">
                  <span class="form-error" *ngIf="quoteForm.get('email')?.touched && quoteForm.get('email')?.invalid">
                    Valid email address is required.
                  </span>
                </div>

                <div class="form-group">
                  <label class="form-label">Phone / WhatsApp</label>
                  <input type="text" formControlName="phone" class="form-control" placeholder="+91 98765 43210">
                </div>

                <div class="form-group">
                  <label class="form-label">Company / Contractor Name</label>
                  <input type="text" formControlName="companyName" class="form-control" placeholder="e.g. Metro Infra Projects Ltd">
                </div>

                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Quantity ({{ product.unit }}) *</label>
                    <input type="number" formControlName="quantity" class="form-control" placeholder="e.g. 2500">
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">Delivery PIN Code *</label>
                    <input type="text" formControlName="deliveryPincode" class="form-control" placeholder="e.g. 560100">
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Expected Delivery Date</label>
                  <input type="date" formControlName="expectedDate" class="form-control">
                </div>

                <div class="form-group">
                  <label class="form-label">Project Requirements / Notes</label>
                  <textarea formControlName="notes" class="form-control" rows="3" placeholder="Specify site unloading constraints, grade preferences, or C&D compliance quotas..."></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-block" [disabled]="quoteForm.invalid || isSubmitting">
                  <span *ngIf="!isSubmitting">Submit Quotation Request</span>
                  <span *ngIf="isSubmitting">Submitting Request...</span>
                </button>
                <span class="form-hint text-center">No registration required. Enquiries enter review queue immediately.</span>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .breadcrumb-bar {
      background: #ffffff;
      border-bottom: 1px solid var(--color-border-subtle);
      padding: 1rem 0;
      font-size: 0.85rem;
    }
    .breadcrumbs {
      display: flex;
      gap: 0.5rem;
      color: var(--color-text-subtle);
    }
    .breadcrumbs a {
      color: var(--color-text-muted);
    }
    .detail-content {
      padding-top: 3rem;
      padding-bottom: 5rem;
    }
    .product-layout {
      display: grid;
      grid-template-columns: 1.35fr 1fr;
      gap: 3rem;
      align-items: start;
    }
    .status-strip {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .product-title {
      font-size: 2.2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      color: var(--color-text-main);
    }
    .product-desc {
      font-size: 1.05rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .spec-card, .formula-card, .trace-banner-card {
      margin-bottom: 1.75rem;
    }
    .spec-card h3, .formula-card h3 {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--color-text-main);
    }
    .spec-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.88rem;
    }
    .spec-table th {
      text-align: left;
      width: 38%;
      padding: 0.65rem 0;
      color: var(--color-text-subtle);
      font-weight: 600;
      border-bottom: 1px solid var(--color-border-subtle);
    }
    .spec-table td {
      padding: 0.65rem 0;
      color: var(--color-text-main);
      font-weight: 500;
      border-bottom: 1px solid var(--color-border-subtle);
    }
    .formula-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .formula-box {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: var(--color-bg-base);
      padding: 0.75rem 1rem;
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-size: 0.84rem;
      color: var(--color-text-main);
    }
    .formula-dot {
      width: 8px;
      height: 8px;
      background: var(--color-accent);
      border-radius: 50%;
    }
    .formula-note {
      font-size: 0.8rem;
      color: var(--color-text-subtle);
      line-height: 1.5;
    }
    .trace-banner-card {
      background: #ffffff;
      border: 1px solid var(--color-accent-border);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      display: flex;
      gap: 1.25rem;
    }
    .trace-icon {
      color: var(--color-accent);
    }
    .trace-banner-card h4 {
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.35rem;
    }
    .trace-banner-card p {
      font-size: 0.84rem;
      color: var(--color-text-muted);
      line-height: 1.5;
      margin-bottom: 0.75rem;
    }
    .trace-link {
      font-size: 0.84rem;
      font-weight: 600;
      color: var(--color-accent);
    }
    .quote-card {
      background: #ffffff;
      border: 1px solid var(--color-border-medium);
      border-radius: var(--radius-md);
      padding: 2rem;
      box-shadow: var(--shadow-card);
      position: sticky;
      top: 90px;
    }
    .quote-header h3 {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.35rem;
    }
    .quote-header p {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin-bottom: 1.25rem;
    }
    .indicative-callout {
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-sm);
      padding: 0.85rem 1rem;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
    }
    .callout-label {
      font-size: 0.78rem;
      color: var(--color-text-subtle);
      font-weight: 600;
    }
    .callout-price {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--color-text-main);
    }
    .callout-basis {
      font-size: 0.75rem;
      color: var(--color-text-subtle);
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
    .text-center {
      text-align: center;
      display: block;
      margin-top: 0.6rem;
    }
    .alert {
      padding: 1rem;
      border-radius: var(--radius-sm);
      margin-bottom: 1.25rem;
      font-size: 0.88rem;
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
      .product-layout {
        grid-template-columns: 1fr;
      }
      .quote-card {
        position: static;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  @Input() slug!: string;
  product?: Product;
  quoteForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitMessage = '';
  enquiryId = '';
  submitError = '';

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.quoteForm = this.fb.group({
      contactName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      companyName: [''],
      quantity: [1000, [Validators.required, Validators.min(1)]],
      deliveryPincode: ['', [Validators.required, Validators.minLength(6)]],
      expectedDate: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    if (this.slug) {
      this.api.getProduct(this.slug).subscribe((p: Product) => {
        this.product = p;
      });
    }
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) return;

    this.isSubmitting = true;
    this.submitError = '';

    const payload = {
      ...this.quoteForm.value,
      type: 'QUOTE',
      productId: this.product?.id,
      productName: this.product?.name,
      unit: this.product?.unit
    };

    this.api.submitEnquiry(payload).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.submitMessage = res.message || 'Quotation request submitted successfully.';
        this.enquiryId = res.enquiryId || 'ENQ-REF';
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = 'Failed to submit enquiry. Please verify your internet connection or try again.';
      }
    });
  }
}
