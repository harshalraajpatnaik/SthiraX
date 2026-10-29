import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-portal-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="portal-dashboard">
      <!-- Dashboard Header -->
      <div class="dashboard-header">
        <div>
          <span class="sub-title">OPERATIONS & SUPPLY-CHAIN INTELLIGENCE</span>
          <h1 class="main-title">Executive Operations Dashboard</h1>
        </div>
        <div class="header-actions">
          <span class="badge badge-warning">Simulated Environment</span>
          <button class="btn btn-secondary btn-sm" (click)="loadSummary()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            Refresh Telemetry
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="kpi-grid" *ngIf="summary">
        <div class="card kpi-card">
          <span class="kpi-label">Open Customer Orders</span>
          <span class="kpi-num">{{ summary.openOrdersCount }}</span>
          <div class="kpi-foot">
            <span class="badge badge-warning">{{ summary.ordersAwaitingCustomerDecision }} Awaiting Customer</span>
          </div>
        </div>

        <div class="card kpi-card">
          <span class="kpi-label">Pending Partner Applications</span>
          <span class="kpi-num">{{ summary.pendingPartnerApplications }}</span>
          <div class="kpi-foot">
            <a routerLink="/app/approvals" class="kpi-link">Review Queue &rarr;</a>
          </div>
        </div>

        <div class="card kpi-card">
          <span class="kpi-label">Active Plant Network</span>
          <span class="kpi-num">{{ summary.activePlantsCount }}</span>
          <div class="kpi-foot">
            <span class="sub-text">1 Retrofitted &bull; Hosur Facility</span>
          </div>
        </div>

        <div class="card kpi-card">
          <span class="kpi-label">Monthly CO₂ Supply Available</span>
          <span class="kpi-num">{{ summary.monthlyAvailableCo2Tonnes | number }} T</span>
          <div class="kpi-foot">
            <span class="sub-text">2 Capture units registered</span>
          </div>
        </div>
      </div>

      <!-- Climate & MRV Metric Strip -->
      <div class="card mrv-strip" *ngIf="summary">
        <div class="mrv-header">
          <h3>Climate Accounting Telemetry (Current Cohort)</h3>
          <span class="badge badge-info">Gate-to-Gate Scope (ISO 14064-2)</span>
        </div>
        <div class="mrv-grid">
          <div class="mrv-box">
            <span class="mrv-label">Gross CO₂ Injected</span>
            <span class="mrv-val">{{ summary.totalRecordedCo2InjectedKg | number }} kg</span>
            <small>Coriolis flow meter readings</small>
          </div>
          <div class="mrv-box highlight">
            <span class="mrv-label">Permanent Mineralized CO₂</span>
            <span class="mrv-val">{{ summary.totalEstimatedMineralizedCo2Kg | number }} kg</span>
            <small>Chemically bound calcite CaCO₃</small>
          </div>
          <div class="mrv-box">
            <span class="mrv-label">Published Passports</span>
            <span class="mrv-val">{{ summary.publishedProductPassportsCount }}</span>
            <small>QR public certificates</small>
          </div>
          <div class="mrv-box">
            <span class="mrv-label">QA Review Backlog</span>
            <span class="mrv-val">{{ summary.pendingQualityReviewsCount }}</span>
            <small>Batches awaiting signoff</small>
          </div>
        </div>
      </div>

      <!-- Operations Shortcuts Grid -->
      <div class="ops-grid">
        <div class="card op-action-card">
          <h4>Partner Onboarding Pipeline</h4>
          <p>Review pending precast manufacturer retrofit applications and industrial CO₂ gas supplier proposals.</p>
          <a routerLink="/app/approvals" class="btn btn-secondary btn-sm">Open Approvals Center</a>
        </div>

        <div class="card op-action-card">
          <h4>Batch QA & Sensor Telemetry</h4>
          <p>Validate Coriolis injection logs, chamber pressure curves, and 28-day compression break reports.</p>
          <a routerLink="/app/quality" class="btn btn-secondary btn-sm">Inspect Quality Reviews</a>
        </div>

        <div class="card op-action-card">
          <h4>Digital Material Passports</h4>
          <p>Publish approved batch passports to SthiraX Trace and generate physical job-site pallet QR tags.</p>
          <a routerLink="/app/trace" class="btn btn-secondary btn-sm">Manage Product Passports</a>
        </div>

        <div class="card op-action-card">
          <h4>Cost Modeling & Financials</h4>
          <p>Track plant retrofit unit economics, break-even volumes, and actual order contribution margins.</p>
          <a routerLink="/app/costing" class="btn btn-secondary btn-sm">Access Financial Engine</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .portal-dashboard {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .sub-title {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--color-accent);
      display: block;
      margin-bottom: 2px;
    }
    .main-title {
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--color-text-main);
      margin: 0;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
    }
    .kpi-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
    }
    .kpi-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-subtle);
      margin-bottom: 0.4rem;
    }
    .kpi-num {
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-text-main);
      line-height: 1.1;
      margin-bottom: 0.75rem;
    }
    .kpi-foot {
      margin-top: auto;
      font-size: 0.78rem;
    }
    .kpi-link {
      font-weight: 600;
      color: var(--color-accent);
    }
    .sub-text {
      color: var(--color-text-subtle);
    }
    .mrv-strip {
      background: #171b1d;
      color: #ffffff;
      border-radius: var(--radius-md);
      padding: 2rem;
    }
    .mrv-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .mrv-header h3 {
      font-size: 1.15rem;
      font-weight: 700;
      margin: 0;
    }
    .mrv-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
    }
    .mrv-box {
      background: #202629;
      border: 1px solid #2d3539;
      border-radius: var(--radius-sm);
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
    }
    .mrv-box.highlight {
      background: rgba(46, 98, 76, 0.25);
      border-color: var(--color-accent);
    }
    .mrv-label {
      font-size: 0.72rem;
      color: #8c979a;
      font-weight: 600;
      margin-bottom: 0.35rem;
    }
    .mrv-val {
      font-size: 1.6rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.2;
    }
    .mrv-box.highlight .mrv-val {
      color: #48a380;
    }
    .mrv-box small {
      font-size: 0.72rem;
      color: #8c979a;
      margin-top: 0.35rem;
    }
    .ops-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    .op-action-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .op-action-card h4 {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.4rem;
    }
    .op-action-card p {
      font-size: 0.86rem;
      color: var(--color-text-muted);
      line-height: 1.5;
      margin-bottom: 1.25rem;
    }
    .op-action-card a {
      margin-top: auto;
    }
    @media (max-width: 1024px) {
      .kpi-grid, .mrv-grid, .ops-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 600px) {
      .kpi-grid, .mrv-grid, .ops-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  summary: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary(): void {
    this.api.getDashboardSummary().subscribe(s => {
      this.summary = s;
    });
  }
}
