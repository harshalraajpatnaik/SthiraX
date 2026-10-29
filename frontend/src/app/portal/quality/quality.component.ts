import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { QualityReview, ProductionBatch } from '../../core/models';

@Component({
  selector: 'app-quality',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="quality-portal-page">
      <div class="page-header mb-8">
        <div>
          <span class="badge badge-accent mb-2">Compliance & Verification</span>
          <h1 class="page-title text-3xl font-display">Quality Assurance & Lab Approvals</h1>
          <p class="text-secondary text-sm">Review mechanical test certificates, NABL break reports, and release digital production passports.</p>
        </div>
      </div>

      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Pending Lab Reviews</span>
          <div class="text-2xl font-bold font-mono text-warning mt-1">{{ pendingReviewsCount }}</div>
          <span class="text-xs text-muted">Awaiting QA sign-off</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Approved Passports</span>
          <div class="text-2xl font-bold font-mono text-accent mt-1">{{ approvedCount }}</div>
          <span class="text-xs text-muted">Verified & published</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">NABL Accreditations</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">2 Labs</div>
          <span class="text-xs text-muted">National Test House, CivilAid</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Defect / Rejection Rate</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">0.4 %</div>
          <span class="text-xs text-muted">Within strict 1.5% tolerance</span>
        </div>
      </div>

      <!-- Main Review Details & Action Panel (if review selected) -->
      <div *ngIf="selectedReview" class="card p-6 bg-surface border-subtle mb-8 shadow-sm">
        <div class="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-subtle">
          <div>
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-display font-semibold text-primary">Quality Review #{{ selectedReview.id }}</h2>
              <span class="badge" [ngClass]="selectedReview.approved ? 'badge-accent' : 'badge-warning'">
                {{ selectedReview.approved ? 'PASSED & APPROVED' : 'REVIEW PENDING' }}
              </span>
            </div>
            <p class="text-xs text-secondary mt-1">
              Batch: <strong>{{ selectedReview.batchId }}</strong> • Reviewed By: <strong>{{ selectedReview.reviewedBy }}</strong> • Date: {{ selectedReview.reviewDate }}
            </p>
          </div>
          <div class="flex gap-2">
            <button class="btn btn-outline text-xs" (click)="selectedReview = null">Deselect</button>
            <button *ngIf="!selectedReview.approved" class="btn btn-accent text-xs" (click)="approveSelected()">
              Sign & Approve Batch
            </button>
            <button *ngIf="!selectedReview.approved" class="btn btn-outline text-xs text-danger" (click)="rejectSelected()">
              Reject Batch
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <!-- Laboratory Specs Checklist -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold font-display">NABL Laboratory Break Results</h3>
            <div class="p-4 bg-canvas rounded border border-subtle space-y-3 text-xs">
              <div class="flex justify-between items-center py-1 border-b border-subtle">
                <span class="text-secondary">Testing Standard:</span>
                <span class="font-mono font-medium">IS 15658:2006 (Precast Concrete Blocks for Paving)</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-subtle">
                <span class="text-secondary">28-day Compressive Target:</span>
                <span class="font-mono font-medium">≥ 35.0 MPa (Grade M-35)</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-subtle">
                <span class="text-secondary">Tested 28-day Result:</span>
                <span class="font-mono font-bold text-accent">42.8 MPa (Pass +22.3%)</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-subtle">
                <span class="text-secondary">Water Absorption:</span>
                <span class="font-mono font-bold text-accent">4.9% (Requirement: ≤ 6.0%)</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-subtle">
                <span class="text-secondary">Dimensional Deviation:</span>
                <span class="font-mono font-bold text-accent">± 1.2 mm (Tolerance: ± 2.0 mm)</span>
              </div>
              <div class="flex justify-between items-center py-1">
                <span class="text-secondary">Laboratory Name:</span>
                <span class="font-mono text-primary font-medium">CivilAid NABL Accredited Lab, Bangalore</span>
              </div>
            </div>
          </div>

          <!-- Auditor Notes and Digital Signature -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold font-display">Auditor Sign-off & CO₂ Uptake Audit</h3>
            <div class="p-4 bg-canvas rounded border border-subtle space-y-3 text-xs">
              <div>
                <label class="block text-secondary mb-1">Coriolis Mass Balance Audit Note</label>
                <p class="text-muted leading-relaxed">
                  "Mass flow sensor Emerson CMF025 calibrated on 2026-01-10. Chamber cycle #284 confirmed 580 kg gross CO₂ injection with 534 kg net mineralization fixation into calcium silicate hydrate matrices."
                </p>
              </div>
              <div>
                <label class="block text-secondary mb-1">Auditor Remarks</label>
                <textarea [(ngModel)]="selectedReview.notes" rows="3" class="input w-full" placeholder="Enter quality inspection remarks..."></textarea>
              </div>
              <div class="pt-2 text-[11px] text-muted flex items-center gap-2">
                <svg width="16" height="16" style="width: 16px; height: 16px; min-width: 16px; min-height: 16px; color: #2e624c;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                Cryptographic hash will be issued upon approval and permanently attached to public passport.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews Table -->
      <div class="card overflow-hidden bg-surface border-subtle">
        <div class="p-4 border-b border-subtle flex justify-between items-center">
          <h2 class="text-base font-display font-semibold text-primary">Inspection & Review Queue</h2>
          <span class="text-xs text-muted">Showing {{ reviews.length }} reviews</span>
        </div>

        <div class="overflow-x-auto">
          <table class="table w-full text-xs">
            <thead>
              <tr class="text-secondary border-b border-subtle bg-canvas/50">
                <th class="py-3 px-4 text-left font-mono">Review ID</th>
                <th class="py-3 px-4 text-left font-mono">Batch ID</th>
                <th class="py-3 px-4 text-left">Inspector / Auditor</th>
                <th class="py-3 px-4 text-left">Review Date</th>
                <th class="py-3 px-4 text-left">Audit Notes</th>
                <th class="py-3 px-4 text-center">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-subtle">
              <tr *ngFor="let r of reviews" class="hover:bg-canvas/30 transition-colors cursor-pointer" (click)="selectedReview = r">
                <td class="py-3 px-4 font-mono font-bold text-primary">{{ r.id }}</td>
                <td class="py-3 px-4 font-mono">{{ r.batchId }}</td>
                <td class="py-3 px-4">{{ r.reviewedBy }}</td>
                <td class="py-3 px-4 font-mono">{{ r.reviewDate }}</td>
                <td class="py-3 px-4 text-muted truncate max-w-xs">{{ r.notes }}</td>
                <td class="py-3 px-4 text-center">
                  <span class="badge" [ngClass]="r.approved ? 'badge-accent' : 'badge-warning'">
                    {{ r.approved ? 'Approved' : 'Pending' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right" (click)="$event.stopPropagation()">
                  <button class="btn btn-outline text-[11px] py-1 px-2.5" (click)="selectedReview = r">Inspect</button>
                </td>
              </tr>
              <tr *ngIf="reviews.length === 0">
                <td colspan="7" class="py-8 text-center text-secondary">No quality review records found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class QualityComponent implements OnInit {
  reviews: QualityReview[] = [];
  selectedReview: QualityReview | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.api.getQualityReviews().subscribe(r => {
      this.reviews = r;
      if (r.length > 0) this.selectedReview = r[0];
    });
  }

  get pendingReviewsCount(): number {
    return this.reviews.filter(r => !r.approved).length;
  }

  get approvedCount(): number {
    return this.reviews.filter(r => r.approved).length;
  }

  approveSelected(): void {
    if (!this.selectedReview) return;
    this.selectedReview.approved = true;
    this.selectedReview.notes += ' [Approved by QA Lead. Certificate issued.]';
    alert(`Batch ${this.selectedReview.batchId} approved! Digital passport is now unlocked for verification.`);
  }

  rejectSelected(): void {
    if (!this.selectedReview) return;
    this.selectedReview.approved = false;
    this.selectedReview.notes += ' [REJECTED: Compression break failure. Re-test requested.]';
    alert(`Batch ${this.selectedReview.batchId} rejected. Production manager notified.`);
  }
}
