import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-portal-approvals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="portal-pane">
      <div class="pane-header">
        <div>
          <span class="sub-title">ONBOARDING GOVERNANCE</span>
          <h1 class="main-title">Partner Applications & Approvals Center</h1>
        </div>
      </div>

      <div class="card table-card">
        <div class="table-responsive">
          <table class="portal-table">
            <thead>
              <tr>
                <th>Applicant / Company</th>
                <th>Role</th>
                <th>Location</th>
                <th>Capacity / Volume</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let app of applications">
                <td>
                  <strong>{{ app.companyName }}</strong>
                  <small>{{ app.contactPerson }} &bull; {{ app.email }}</small>
                </td>
                <td><span class="role-pill">{{ app.applicantRole }}</span></td>
                <td>{{ app.facilityLocation }}</td>
                <td>
                  <span *ngIf="app.monthlyCapacityTPA">{{ app.monthlyCapacityTPA | number }} T/mo</span>
                  <span *ngIf="app.availableCo2TonnesPerMonth">{{ app.availableCo2TonnesPerMonth | number }} T/mo</span>
                </td>
                <td>
                  <span class="badge" [ngClass]="getStatusBadge(app.status)">{{ app.status }}</span>
                </td>
                <td><small>{{ app.createdAt ? (app.createdAt | date:'shortDate') : 'Recently' }}</small></td>
                <td>
                  <button class="btn btn-secondary btn-sm" (click)="openReview(app)">
                    Review Application
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Decision Modal -->
      <div class="modal-backdrop" *ngIf="selectedApp">
        <div class="modal-box card">
          <div class="modal-header">
            <h3>Review Partner Application</h3>
            <button class="close-btn" (click)="selectedApp = null">&times;</button>
          </div>

          <div class="modal-body">
            <div class="app-summary-grid">
              <div><strong>Company:</strong> {{ selectedApp.companyName }}</div>
              <div><strong>Role:</strong> {{ selectedApp.applicantRole }}</div>
              <div><strong>Facility:</strong> {{ selectedApp.facilityLocation }} (PIN: {{ selectedApp.facilityPincode }})</div>
              <div><strong>Contact:</strong> {{ selectedApp.contactPerson }} ({{ selectedApp.phone }})</div>
              <div *ngIf="selectedApp.currentFeedstocks"><strong>Feedstocks:</strong> {{ selectedApp.currentFeedstocks }}</div>
              <div *ngIf="selectedApp.curingMethod"><strong>Current Curing:</strong> {{ selectedApp.curingMethod }}</div>
              <div *ngIf="selectedApp.co2SourceType"><strong>CO₂ Source:</strong> {{ selectedApp.co2SourceType }}</div>
            </div>

            <hr class="modal-divider">

            <div class="form-group">
              <label class="form-label">Reviewer Technical Notes</label>
              <textarea [(ngModel)]="reviewNotes" class="form-control" rows="2" placeholder="Plant layout checked; slag supply within 40 km..."></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Decision Reason *</label>
              <input type="text" [(ngModel)]="decisionReason" class="form-control" placeholder="Audit criteria satisfied for Phase 2 skid installation.">
            </div>

            <div class="modal-actions">
              <button class="btn btn-primary" (click)="submitDecision('APPROVED')" [disabled]="isSubmitting">
                Approve Partner & Provision Facility
              </button>
              <button class="btn btn-secondary" (click)="submitDecision('CHANGES_REQUESTED')" [disabled]="isSubmitting">
                Request Clarification
              </button>
              <button class="btn btn-dark" (click)="submitDecision('REJECTED')" [disabled]="isSubmitting">
                Reject Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .portal-pane { display: flex; flex-direction: column; gap: 1.5rem; }
    .pane-header { display: flex; justify-content: space-between; align-items: center; }
    .sub-title { font-size: 0.72rem; font-weight: 700; color: var(--color-accent); letter-spacing: 0.08em; display: block; }
    .main-title { font-size: 1.8rem; font-weight: 800; color: var(--color-text-main); margin: 0; }
    .table-card { background: #ffffff; padding: 0; overflow: hidden; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); }
    .portal-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
    .portal-table th { background: var(--color-bg-base); text-align: left; padding: 0.85rem 1rem; font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-subtle); font-weight: 700; border-bottom: 1px solid var(--color-border-subtle); }
    .portal-table td { padding: 1rem; border-bottom: 1px solid var(--color-border-subtle); color: var(--color-text-main); vertical-align: middle; }
    .portal-table td small { display: block; color: var(--color-text-subtle); font-size: 0.76rem; }
    .role-pill { font-size: 0.72rem; font-weight: 700; color: var(--color-accent); background: var(--color-accent-subtle); padding: 2px 6px; border-radius: 3px; }
    .modal-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 1rem; }
    .modal-box { width: 100%; max-width: 600px; background: #ffffff; padding: 2rem; border-radius: var(--radius-md); box-shadow: var(--shadow-elevation); }
    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
    .modal-header h3 { font-size: 1.25rem; font-weight: 700; margin: 0; }
    .close-btn { font-size: 1.5rem; color: var(--color-text-subtle); }
    .app-summary-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; font-size: 0.85rem; }
    .modal-divider { margin: 1.25rem 0; border: none; border-top: 1px solid var(--color-border-subtle); }
    .modal-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.5rem; }
  `]
})
export class ApprovalsComponent implements OnInit {
  applications: any[] = [];
  selectedApp: any = null;
  reviewNotes = '';
  decisionReason = '';
  isSubmitting = false;

  constructor(private http: HttpClient, public auth: AuthService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.http.get<any[]>('http://localhost:8080/api/v1/approvals').subscribe({
      next: (res) => this.applications = res,
      error: () => {
        // Fallback demo data
        this.applications = [
          {
            id: 'app-sample-01',
            companyName: 'Prakriti Precast Elements LLP',
            applicantRole: 'MANUFACTURER',
            contactPerson: 'M. Selvakumar',
            email: 'contact@prakritiprecast.com',
            phone: '+91 4344 249012',
            facilityLocation: 'Hosur Industrial Complex, Tamil Nadu',
            facilityPincode: '635126',
            monthlyCapacityTPA: 3500,
            curingMethod: 'Ambient Air & Water Spray',
            currentFeedstocks: 'OPC 53, GGBS Slag, Fly Ash',
            status: 'APPROVED',
            createdAt: new Date().toISOString()
          },
          {
            id: 'app-sample-02',
            companyName: 'Deccan Distilleries CO2 Unit',
            applicantRole: 'CO2_SUPPLIER',
            contactPerson: 'S. Kulkarni',
            email: 'co2@deccangases.com',
            phone: '+91 831 245 9180',
            facilityLocation: 'Belagavi, Karnataka',
            facilityPincode: '590001',
            availableCo2TonnesPerMonth: 1200,
            co2SourceType: 'BIOETHANOL_FERMENTATION',
            status: 'PENDING_REVIEW',
            createdAt: new Date().toISOString()
          }
        ];
      }
    });
  }

  openReview(app: any): void {
    this.selectedApp = app;
    this.reviewNotes = app.reviewNotes || '';
    this.decisionReason = app.decisionReason || '';
  }

  submitDecision(decision: string): void {
    if (!this.selectedApp) return;
    this.isSubmitting = true;

    const payload = {
      decision: decision,
      reviewerNotes: this.reviewNotes,
      decisionReason: this.decisionReason || `Reviewed and marked ${decision}`
    };

    this.http.post(`http://localhost:8080/api/v1/approvals/${this.selectedApp.id}/decision`, payload).subscribe({
      next: () => {
        this.selectedApp.status = decision;
        this.selectedApp = null;
        this.isSubmitting = false;
        this.loadApplications();
      },
      error: () => {
        // Fallback for standalone demo
        this.selectedApp.status = decision;
        this.selectedApp = null;
        this.isSubmitting = false;
      }
    });
  }

  getStatusBadge(status: string): string {
    if (status === 'APPROVED') return 'badge-success';
    if (status === 'REJECTED') return 'badge-danger';
    return 'badge-warning';
  }
}
