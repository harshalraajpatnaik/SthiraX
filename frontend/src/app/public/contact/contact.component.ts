import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="page-contact">
      <header class="page-header">
        <div class="container">
          <span class="section-tag">Direct Communications</span>
          <h1 class="page-title">Commercial & Technical Enquiries</h1>
          <p class="page-subtitle">
            Connect directly with SthiraX project operations across procurement, plant partnerships, CO₂ off-take, and research validation.
          </p>
        </div>
      </header>

      <section class="container content-section">
        <div class="contact-grid">
          <!-- Left: Pathways Info & Physical Locations -->
          <div class="info-side">
            <h2>Select Your Engagement Pathway</h2>
            <p class="intro-p">
              Every submission is routed directly to the responsible team lead. All data is processed under strict business confidentiality.
            </p>

            <div class="pathway-options">
              <div class="p-item" [class.selected]="contactForm.get('type')?.value === 'QUOTE'" (click)="selectType('QUOTE')">
                <span class="p-radio"></span>
                <div>
                  <strong>Construction Material Buyer</strong>
                  <p>Request commercial paver, kerb, or block pricing for municipal & private infrastructure projects.</p>
                </div>
              </div>

              <div class="p-item" [class.selected]="contactForm.get('type')?.value === 'MANUFACTURER_PILOT'" (click)="selectType('MANUFACTURER_PILOT')">
                <span class="p-radio"></span>
                <div>
                  <strong>Precast Plant Operator</strong>
                  <p>Inquire regarding plant retrofit skids, technical feedstock audits, and pilot cohort onboarding.</p>
                </div>
              </div>

              <div class="p-item" [class.selected]="contactForm.get('type')?.value === 'CO2_SUPPLY'" (click)="selectType('CO2_SUPPLY')">
                <span class="p-radio"></span>
                <div>
                  <strong>Industrial CO₂ Supplier</strong>
                  <p>Propose captured bioethanol, ammonia, or chemical process carbon dioxide streams.</p>
                </div>
              </div>

              <div class="p-item" [class.selected]="contactForm.get('type')?.value === 'CARBON_OFFTAKE'" (click)="selectType('CARBON_OFFTAKE')">
                <span class="p-radio"></span>
                <div>
                  <strong>Carbon Removal Offtake Buyer</strong>
                  <p>Evaluate future voluntary durable carbon mineralization offtake term sheets.</p>
                </div>
              </div>

              <div class="p-item" [class.selected]="contactForm.get('type')?.value === 'RESEARCH_PARTNER'" (click)="selectType('RESEARCH_PARTNER')">
                <span class="p-radio"></span>
                <div>
                  <strong>Research & Technical Testing</strong>
                  <p>Collaborate on NABL laboratory testing, carbonation kinetics, or lifecycle analysis (LCA).</p>
                </div>
              </div>
            </div>

            <div class="card location-card">
              <h4>Operations & Registered Address</h4>
              <p>
                <strong>SthiraX Technologies Pvt Ltd</strong><br>
                Whitefield Industrial Hub, Bengaluru 560066, Karnataka, India<br>
                Operations Coordination: <code>operations&#64;sthirax.com</code>
              </p>
            </div>
          </div>

          <!-- Right: Working Enquiry Form -->
          <div class="form-side">
            <div class="card form-card">
              <h3>Submit Enquiry Form</h3>

              <div class="alert alert-success" *ngIf="submitSuccess">
                <h4>Submission Received</h4>
                <p>{{ submitMessage }}</p>
                <small>Reference: {{ enquiryId }} &bull; SthiraX Operations</small>
              </div>

              <div class="alert alert-danger" *ngIf="submitError">
                <p>{{ submitError }}</p>
              </div>

              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" *ngIf="!submitSuccess">
                <div class="form-group">
                  <label class="form-label">Engagement Type</label>
                  <select formControlName="type" class="form-control">
                    <option value="QUOTE">Construction Material Buyer (Quotation)</option>
                    <option value="MANUFACTURER_PILOT">Precast Manufacturer Onboarding</option>
                    <option value="CO2_SUPPLY">Industrial CO₂ Capture Off-Take</option>
                    <option value="LOGISTICS">Cryogenic Road Transport & Logistics</option>
                    <option value="CARBON_OFFTAKE">Carbon Removal Buyer / Offtake</option>
                    <option value="RESEARCH_PARTNER">Academic & NABL Testing Partner</option>
                    <option value="GENERAL">General Enquiry</option>
                  </select>
                </div>

                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Contact Name *</label>
                    <input type="text" formControlName="contactName" class="form-control" placeholder="Full name">
                    <span class="form-error" *ngIf="contactForm.get('contactName')?.touched && contactForm.get('contactName')?.invalid">
                      Name is required.
                    </span>
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">Company / Organisation</label>
                    <input type="text" formControlName="companyName" class="form-control" placeholder="Company name">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Business Email *</label>
                    <input type="email" formControlName="email" class="form-control" placeholder="name&#64;company.com">
                    <span class="form-error" *ngIf="contactForm.get('email')?.touched && contactForm.get('email')?.invalid">
                      Valid email required.
                    </span>
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">Phone / WhatsApp</label>
                    <input type="text" formControlName="phone" class="form-control" placeholder="+91 98765 43210">
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Project Location / PIN Code</label>
                  <input type="text" formControlName="deliveryPincode" class="form-control" placeholder="e.g. 560100">
                </div>

                <div class="form-group">
                  <label class="form-label">Detailed Message or Technical Requirement *</label>
                  <textarea formControlName="notes" class="form-control" rows="4" placeholder="Detail your project specifications, estimated volume, delivery timeline, or questions..."></textarea>
                  <span class="form-error" *ngIf="contactForm.get('notes')?.touched && contactForm.get('notes')?.invalid">
                    Message is required.
                  </span>
                </div>

                <button type="submit" class="btn btn-primary btn-block" [disabled]="contactForm.invalid || isSubmitting">
                  <span *ngIf="!isSubmitting">Send Enquiry</span>
                  <span *ngIf="isSubmitting">Submitting Enquiry...</span>
                </button>
                <small class="privacy-note">Submissions are logged into the private operations database and handled under our data privacy terms.</small>
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
    .contact-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3.5rem;
      align-items: start;
    }
    .intro-p {
      font-size: 0.95rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .pathway-options {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 2.5rem;
    }
    .p-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-sm);
      padding: 1rem 1.25rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .p-item:hover {
      border-color: var(--color-accent);
    }
    .p-item.selected {
      border-color: var(--color-accent);
      background: var(--color-accent-subtle);
    }
    .p-radio {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--color-border-medium);
      flex-shrink: 0;
      margin-top: 3px;
    }
    .p-item.selected .p-radio {
      border-color: var(--color-accent);
      background: var(--color-accent);
    }
    .p-item strong {
      font-size: 0.92rem;
      color: var(--color-text-main);
      display: block;
      margin-bottom: 2px;
    }
    .p-item p {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      margin: 0;
      line-height: 1.45;
    }
    .location-card {
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-sm);
      padding: 1.5rem;
    }
    .location-card h4 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.5rem;
    }
    .location-card p {
      font-size: 0.84rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin: 0;
    }
    .form-card {
      background: #ffffff;
      border: 1px solid var(--color-border-medium);
      border-radius: var(--radius-md);
      padding: 2.25rem;
      box-shadow: var(--shadow-card);
      position: sticky;
      top: 90px;
    }
    .form-card h3 {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--color-text-main);
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
    .privacy-note {
      display: block;
      font-size: 0.74rem;
      color: var(--color-text-subtle);
      margin-top: 0.75rem;
      text-align: center;
    }
    .alert {
      padding: 1rem;
      border-radius: var(--radius-sm);
      margin-bottom: 1.25rem;
      font-size: 0.86rem;
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
      .contact-grid {
        grid-template-columns: 1fr;
      }
      .form-card {
        position: static;
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitMessage = '';
  enquiryId = '';
  submitError = '';

  constructor(private fb: FormBuilder, private api: ApiService, private route: ActivatedRoute) {
    this.contactForm = this.fb.group({
      type: ['QUOTE', Validators.required],
      contactName: ['', [Validators.required, Validators.minLength(2)]],
      companyName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      deliveryPincode: [''],
      notes: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['type']) {
        this.contactForm.patchValue({ type: params['type'] });
      }
    });
  }

  selectType(type: string): void {
    this.contactForm.patchValue({ type });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;
    this.submitError = '';

    this.api.submitEnquiry(this.contactForm.value).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.submitMessage = res.message || 'Enquiry successfully submitted and queued for review.';
        this.enquiryId = res.enquiryId || 'ENQ-REF';
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = 'Could not submit enquiry. Please verify your connection and try again.';
      }
    });
  }
}
