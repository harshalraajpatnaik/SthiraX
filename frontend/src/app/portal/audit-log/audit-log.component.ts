import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuditEvent } from '../../core/models';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="audit-log-portal-page">
      <div class="page-header mb-8">
        <div>
          <span class="badge badge-accent mb-2">Governance & Security</span>
          <h1 class="page-title text-3xl font-display">System Audit Trail & Security Logs</h1>
          <p class="text-secondary text-sm">Immutable operational audit logs capturing administrative actions, batch modifications, and passport issuance.</p>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Total Recorded Events</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">{{ events.length }}</div>
          <span class="text-xs text-muted">Append-only audit store</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Security Status</span>
          <div class="text-2xl font-bold font-mono text-accent mt-1">Compliant</div>
          <span class="text-xs text-muted">RBAC & session verified</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Active Actors</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">4 Principals</div>
          <span class="text-xs text-muted">Admin, Ops, QA, Auditor</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Retention Window</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">7 Years</div>
          <span class="text-xs text-muted">Statutory ESG records</span>
        </div>
      </div>

      <!-- Audit Logs Table -->
      <div class="card overflow-hidden bg-surface border-subtle">
        <div class="p-4 border-b border-subtle flex flex-wrap justify-between items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono uppercase text-secondary">Filter Action:</span>
            <select [(ngModel)]="actionFilter" class="input py-1 text-xs w-48">
              <option value="ALL">All Actions</option>
              <option value="BATCH_RECORDED">BATCH_RECORDED</option>
              <option value="QUALITY_APPROVED">QUALITY_APPROVED</option>
              <option value="PASSPORT_ISSUED">PASSPORT_ISSUED</option>
              <option value="PARTNER_APPROVED">PARTNER_APPROVED</option>
              <option value="SHIPMENT_DISPATCHED">SHIPMENT_DISPATCHED</option>
            </select>
          </div>
          <span class="text-xs text-muted">Showing {{ filteredEvents.length }} events</span>
        </div>

        <div class="overflow-x-auto">
          <table class="table w-full text-xs font-mono">
            <thead>
              <tr class="text-secondary border-b border-subtle bg-canvas/50">
                <th class="py-3 px-4 text-left">Timestamp (UTC)</th>
                <th class="py-3 px-4 text-left font-sans">Action</th>
                <th class="py-3 px-4 text-left font-sans">Entity</th>
                <th class="py-3 px-4 text-left">Entity ID</th>
                <th class="py-3 px-4 text-left font-sans">Actor</th>
                <th class="py-3 px-4 text-left font-sans">Details</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-subtle">
              <tr *ngFor="let ev of filteredEvents" class="hover:bg-canvas/30 transition-colors">
                <td class="py-3 px-4 text-secondary">{{ ev.timestamp | date:'yyyy-MM-dd HH:mm:ss' }}</td>
                <td class="py-3 px-4 font-sans font-semibold">
                  <span class="badge" [ngClass]="getActionBadge(ev.action)">{{ ev.action }}</span>
                </td>
                <td class="py-3 px-4 font-sans text-secondary">{{ ev.entityType }}</td>
                <td class="py-3 px-4 text-primary font-bold">{{ ev.entityId }}</td>
                <td class="py-3 px-4 font-sans">{{ ev.userEmail }}</td>
                <td class="py-3 px-4 font-sans text-muted truncate max-w-sm">{{ ev.details }}</td>
              </tr>
              <tr *ngIf="filteredEvents.length === 0">
                <td colspan="6" class="py-8 text-center text-secondary font-sans">No audit events match current filter.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class AuditLogComponent implements OnInit {
  events: AuditEvent[] = [];
  actionFilter = 'ALL';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.api.getAuditEvents().subscribe(ev => this.events = ev);
  }

  get filteredEvents(): AuditEvent[] {
    if (this.actionFilter === 'ALL') return this.events;
    return this.events.filter(e => e.action === this.actionFilter);
  }

  getActionBadge(action: string): string {
    if (action.includes('APPROVED') || action.includes('ISSUED')) return 'badge-accent';
    if (action.includes('RECORDED') || action.includes('DISPATCHED')) return 'badge-primary';
    return 'badge-secondary';
  }
}
