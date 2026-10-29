import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { RoadmapMilestone } from '../../core/models/models';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-roadmap">
      <header class="page-header">
        <div class="container">
          <span class="section-tag">Strategic Execution Plan</span>
          <h1 class="page-title">SthiraX Development Roadmap & Pilot Budget</h1>
          <p class="page-subtitle">
            A transparent timeline of laboratory validation, plant retrofit engineering, pilot cohort deployment, and commercial expansion. All timelines and budget ranges represent draft operational assumptions.
          </p>
        </div>
      </header>

      <section class="container content-section">
        <!-- Budget Scenario Overview -->
        <div class="card budget-summary-card">
          <div class="b-header">
            <h3>Pilot Programme Capital & Validation Budget (Phases 1 - 4)</h3>
            <span class="badge badge-warning">Draft Scenario Estimate</span>
          </div>
          <div class="b-metrics-grid">
            <div class="b-metric">
              <span class="b-label">Estimated Minimum Budget</span>
              <span class="b-value">&#8377;58.5 Lakhs</span>
              <small>Lean prototype & single-plant skid</small>
            </div>
            <div class="b-metric">
              <span class="b-label">Estimated Maximum Budget</span>
              <span class="b-value">&#8377;85.0 Lakhs</span>
              <small>Includes NABL verification & 5k m² batch trials</small>
            </div>
            <div class="b-metric highlight">
              <span class="b-label">Current Progress</span>
              <span class="b-value">Phase 2 In-Progress</span>
              <small>Laboratory formulation validated</small>
            </div>
          </div>
        </div>

        <!-- Timeline Phases -->
        <div class="timeline-container">
          <div class="phase-card card" *ngFor="let m of milestones" [class.validated]="m.status === 'VALIDATED'" [class.inprogress]="m.status === 'IN_PROGRESS'">
            <div class="phase-top">
              <div class="phase-meta">
                <span class="phase-num">Phase {{ m.orderIndex }}</span>
                <span class="phase-timeline">{{ m.plannedTimeline }}</span>
              </div>
              <span class="badge" [ngClass]="getStatusBadge(m.status)">{{ m.status }}</span>
            </div>

            <h2 class="phase-title">{{ m.phaseName }}</h2>
            <p class="phase-obj"><strong>Primary Objective:</strong> {{ m.objective }}</p>

            <div class="phase-details-grid">
              <div class="detail-box">
                <span class="d-label">Responsible Lead:</span>
                <span class="d-val">{{ m.responsibleLead }}</span>
              </div>
              <div class="detail-box">
                <span class="d-label">Dependencies:</span>
                <span class="d-val">{{ m.dependencies }}</span>
              </div>
              <div class="detail-box">
                <span class="d-label">Estimated Budget Range:</span>
                <span class="d-val">&#8377;{{ (m.estimatedCostMinInr / 100000) | number:'1.1-1' }}L - &#8377;{{ (m.estimatedCostMaxInr / 100000) | number:'1.1-1' }}L</span>
              </div>
            </div>

            <div class="phase-cols">
              <div class="col-half">
                <h4>Key Deliverables</h4>
                <ul class="check-list">
                  <li *ngFor="let d of m.deliverables">{{ d }}</li>
                </ul>
              </div>

              <div class="col-half">
                <h4>Identified Risks & Mitigations</h4>
                <ul class="risk-list">
                  <li *ngFor="let r of m.keyRisks">{{ r }}</li>
                </ul>
              </div>
            </div>

            <div class="phase-evidence" *ngIf="m.completionEvidence">
              <span class="e-label">Completion / Verification Evidence:</span>
              <p>{{ m.completionEvidence }}</p>
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
    .budget-summary-card {
      background: #171b1d;
      color: #ffffff;
      border-radius: var(--radius-md);
      padding: 2rem 2.5rem;
      margin-bottom: 3rem;
    }
    .b-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .b-header h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0;
    }
    .b-metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    .b-metric {
      display: flex;
      flex-direction: column;
    }
    .b-label {
      font-size: 0.75rem;
      color: #8c979a;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 0.35rem;
    }
    .b-value {
      font-size: 1.6rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.2;
    }
    .b-metric.highlight .b-value {
      color: #48a380;
    }
    .b-metric small {
      font-size: 0.72rem;
      color: #8c979a;
      margin-top: 0.25rem;
    }
    .timeline-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .phase-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 2.25rem;
      box-shadow: var(--shadow-subtle);
      border-left: 4px solid var(--color-border-medium);
    }
    .phase-card.validated {
      border-left-color: var(--color-status-success);
    }
    .phase-card.inprogress {
      border-left-color: var(--color-accent);
    }
    .phase-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .phase-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .phase-num {
      font-size: 0.8rem;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--color-accent);
      background: var(--color-accent-subtle);
      padding: 2px 8px;
      border-radius: 3px;
    }
    .phase-timeline {
      font-size: 0.85rem;
      color: var(--color-text-subtle);
      font-weight: 600;
    }
    .phase-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.5rem;
    }
    .phase-obj {
      font-size: 0.92rem;
      color: var(--color-text-muted);
      line-height: 1.55;
      margin-bottom: 1.5rem;
    }
    .phase-details-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-sm);
      padding: 1rem 1.25rem;
      margin-bottom: 1.5rem;
      font-size: 0.85rem;
    }
    .detail-box {
      display: flex;
      flex-direction: column;
    }
    .d-label {
      font-size: 0.72rem;
      color: var(--color-text-subtle);
      font-weight: 600;
      margin-bottom: 2px;
    }
    .d-val {
      color: var(--color-text-main);
      font-weight: 600;
    }
    .phase-cols {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin-bottom: 1.5rem;
    }
    .phase-cols h4 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.75rem;
    }
    .check-list, .risk-list {
      padding-left: 1.25rem;
      font-size: 0.85rem;
      color: var(--color-text-muted);
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .check-list li::marker {
      color: var(--color-status-success);
    }
    .risk-list li::marker {
      color: var(--color-status-warning);
    }
    .phase-evidence {
      background: var(--color-status-success-bg);
      border: 1px solid rgba(27, 99, 62, 0.2);
      border-radius: var(--radius-sm);
      padding: 0.85rem 1.25rem;
      font-size: 0.84rem;
    }
    .e-label {
      font-weight: 700;
      color: var(--color-status-success);
      display: block;
      margin-bottom: 2px;
    }
    .phase-evidence p {
      color: var(--color-text-main);
      margin: 0;
    }
    @media (max-width: 900px) {
      .b-metrics-grid, .phase-details-grid, .phase-cols {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RoadmapComponent implements OnInit {
  milestones: RoadmapMilestone[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getRoadmapMilestones().subscribe(res => {
      this.milestones = res;
    });
  }

  getStatusBadge(status: string): string {
    if (status === 'VALIDATED') return 'badge-success';
    if (status === 'IN_PROGRESS') return 'badge-info';
    return 'badge-neutral';
  }
}
