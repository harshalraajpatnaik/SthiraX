import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { QualityReview } from '../../core/models';

@Component({
  selector: 'app-quality',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="quality-portal-page space-y-8">
      
      <!-- In-app Action Notification Banner -->
      <div *ngIf="toastMessage" class="bg-emerald-500 text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-md animate-fade">
        <div class="flex items-center gap-2.5 text-xs font-semibold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>{{ toastMessage }}</span>
        </div>
        <button (click)="toastMessage = null" class="text-white/80 hover:text-white text-lg font-bold leading-none">&times;</button>
      </div>

      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            Compliance & Verification Desk
          </span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quality Assurance & Lab Approvals
          </h1>
          <p class="text-slate-500 text-sm mt-1 max-w-2xl">
            Audit mechanical break certificates, Coriolis mass-flow logs, and authorize cryptographic Digital Product Passports for batch release.
          </p>
        </div>
      </div>

      <!-- KPI Metrics Overview -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="kpi-card">
          <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Pending Reviews</span>
          <div class="text-3xl font-black font-mono text-amber-600 mt-1.5">{{ pendingReviewsCount }}</div>
          <span class="text-xs text-slate-500 mt-1 block">Awaiting QA Lead sign-off</span>
        </div>
        <div class="kpi-card">
          <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Approved Passports</span>
          <div class="text-3xl font-black font-mono text-emerald-700 mt-1.5">{{ approvedCount }}</div>
          <span class="text-xs text-slate-500 mt-1 block">Verified & issued to public</span>
        </div>
        <div class="kpi-card">
          <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">NABL Accredited Labs</span>
          <div class="text-3xl font-black font-mono text-slate-900 mt-1.5">2 Facilities</div>
          <span class="text-xs text-slate-500 mt-1 block">CivilAid & National Test House</span>
        </div>
        <div class="kpi-card">
          <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Rejection / Defect Rate</span>
          <div class="text-3xl font-black font-mono text-slate-900 mt-1.5">0.4 %</div>
          <span class="text-xs text-slate-500 mt-1 block">Strictly below 1.5% tolerance</span>
        </div>
      </div>

      <!-- Inspector Panel when a review is selected -->
      <div *ngIf="selectedReview" class="inspector-panel space-y-6">
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-bold text-slate-900">Inspection Review #{{ selectedReview.id }}</h2>
              <span class="px-2.5 py-1 rounded-full text-xs font-mono font-bold" 
                    [ngClass]="selectedReview.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'">
                {{ selectedReview.approved ? 'PASSED & APPROVED' : 'REVIEW PENDING' }}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Target Batch: <strong class="text-slate-800 font-mono">{{ selectedReview.batchId }}</strong> &bull; 
              Assigned Inspector: <strong class="text-slate-800">{{ selectedReview.reviewedBy }}</strong> &bull; 
              Inspection Date: <span class="font-mono">{{ selectedReview.reviewDate }}</span>
            </p>
          </div>

          <div class="flex items-center gap-2.5">
            <button class="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors" (click)="selectedReview = null">
              Close Detail
            </button>
            <button *ngIf="!selectedReview.approved" class="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm" (click)="approveSelected()">
              Sign & Approve Batch
            </button>
            <button *ngIf="!selectedReview.approved" class="px-4 py-2 text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors" (click)="rejectSelected()">
              Reject Batch
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Column 1: Lab Test Spec Verification -->
          <div class="space-y-3">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
              NABL Laboratory Strength Break Results
            </h3>
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs">
              <div class="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Standard Reference:</span>
                <span class="font-mono font-semibold text-slate-800">IS 15658:2006 (Paver Blocks)</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Target 28d Strength:</span>
                <span class="font-mono font-semibold text-slate-800">&ge; 35.0 MPa (Grade M-35)</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Tested 28d Result:</span>
                <span class="font-mono font-bold text-emerald-700">42.8 MPa (Pass +22.3%)</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Water Absorption:</span>
                <span class="font-mono font-semibold text-emerald-700">4.9% (Spec &le; 6.0%)</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Dimensional Tolerance:</span>
                <span class="font-mono font-semibold text-emerald-700">&plusmn; 1.2 mm (Tolerance &plusmn; 2.0 mm)</span>
              </div>
              <div class="flex justify-between items-center py-1">
                <span class="text-slate-500">Accredited Laboratory:</span>
                <span class="font-semibold text-slate-800">CivilAid NABL Bangalore (Accreditation #TC-5192)</span>
              </div>
            </div>
          </div>

          <!-- Column 2: Sensor Telemetry & Auditor Notes -->
          <div class="space-y-3">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Coriolis Mass-Balance & Inspection Log
            </h3>
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div>
                <span class="text-slate-400 font-medium block mb-1">Coriolis Mass Balance Audit Note:</span>
                <p class="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200/80">
                  "Mass flow sensor Emerson CMF025 calibrated on 2026-01-10. Chamber cycle #284 confirmed 580 kg gross CO₂ injection with 534 kg net mineralization fixation into calcium silicate hydrate matrices."
                </p>
              </div>
              <div>
                <label class="text-slate-700 font-semibold block mb-1">Auditor Remarks</label>
                <textarea [(ngModel)]="selectedReview.notes" rows="2" class="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="Enter inspection notes..."></textarea>
              </div>
              <div class="text-[11px] text-slate-400 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span>Cryptographic SHA-256 seal will be attached upon approval to unlock public QR passport.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- Main Review Queue Table -->
      <div class="table-card">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-slate-900">Inspection & Review Queue</h2>
            <p class="text-xs text-slate-500 mt-0.5">Click any row to open the complete NABL break inspection workspace.</p>
          </div>
          <span class="text-xs font-mono font-medium text-slate-400">{{ reviews.length }} Review Records</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono tracking-wider text-[11px]">
                <th class="py-3.5 px-5">Review ID</th>
                <th class="py-3.5 px-5">Batch ID</th>
                <th class="py-3.5 px-5">Auditor / Lead</th>
                <th class="py-3.5 px-5">Review Date</th>
                <th class="py-3.5 px-5">Audit Remarks</th>
                <th class="py-3.5 px-5 text-center">Status</th>
                <th class="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              <tr *ngFor="let r of reviews" 
                  class="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  [class.bg-emerald-50]="selectedReview?.id === r.id"
                  (click)="selectedReview = r">
                <td class="py-4 px-5 font-mono font-bold text-slate-900">{{ r.id }}</td>
                <td class="py-4 px-5 font-mono font-medium text-emerald-800">{{ r.batchId }}</td>
                <td class="py-4 px-5 font-medium text-slate-800">{{ r.reviewedBy }}</td>
                <td class="py-4 px-5 font-mono text-slate-500">{{ r.reviewDate }}</td>
                <td class="py-4 px-5 text-slate-500 max-w-xs truncate">{{ r.notes }}</td>
                <td class="py-4 px-5 text-center">
                  <span class="px-2.5 py-1 rounded-full font-mono font-bold text-[11px]"
                        [ngClass]="r.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'">
                    {{ r.approved ? 'Approved' : 'Pending' }}
                  </span>
                </td>
                <td class="py-4 px-5 text-right" (click)="$event.stopPropagation()">
                  <button class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors" (click)="selectedReview = r">
                    Inspect
                  </button>
                </td>
              </tr>
              <tr *ngIf="reviews.length === 0">
                <td colspan="7" class="py-12 text-center text-slate-400">No review records found in database.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .quality-portal-page {
      padding: 0.5rem 0 3rem;
    }
    .kpi-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1rem;
      padding: 1.25rem 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }
    .inspector-panel {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1.25rem;
      padding: 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .spec-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 0.85rem;
      padding: 1.25rem;
    }
    .table-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      overflow: hidden;
    }
  `]
})
export class QualityComponent implements OnInit {
  reviews: QualityReview[] = [];
  selectedReview: QualityReview | null = null;
  toastMessage: string | null = null;

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
    this.toastMessage = `Batch ${this.selectedReview.batchId} approved! Digital Product Passport is now unlocked for verification.`;
    setTimeout(() => { if (this.toastMessage) this.toastMessage = null; }, 5000);
  }

  rejectSelected(): void {
    if (!this.selectedReview) return;
    this.selectedReview.approved = false;
    this.selectedReview.notes += ' [REJECTED: Compression break failure. Re-test requested.]';
    this.toastMessage = `Batch ${this.selectedReview.batchId} rejected. Production manager notified.`;
    setTimeout(() => { if (this.toastMessage) this.toastMessage = null; }, 5000);
  }
}
