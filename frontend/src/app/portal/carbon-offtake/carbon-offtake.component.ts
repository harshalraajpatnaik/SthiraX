import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { CarbonOfftakeOpportunity } from '../../core/models';

@Component({
  selector: 'app-carbon-offtake',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="carbon-offtake-portal-page">
      <div class="page-header mb-8">
        <div>
          <span class="badge badge-accent mb-2">Carbon Finance (Non-Guaranteed Upside)</span>
          <h1 class="page-title text-3xl font-display">Carbon Offtake & Removal Registry Workspace</h1>
          <p class="text-secondary text-sm">Manage potential carbon credit offtake dialogues under Puro.earth, Isometric, and India's Carbon Credit Trading Scheme (CCTS).</p>
        </div>
      </div>

      <!-- Compliance Disclaimer Banner -->
      <div style="background: #f0f7f3; border: 1px solid #c9decb; border-radius: 8px; padding: 1.25rem 1.5rem; display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 2rem;">
        <svg width="22" height="22" style="width: 22px; height: 22px; min-width: 22px; min-height: 22px; color: #2e624c; margin-top: 2px; flex-shrink: 0;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <div style="font-size: 0.85rem; color: #234d3b; line-height: 1.55;">
          <strong style="color: #1b3d2f; font-weight: 700; display: block; margin-bottom: 0.25rem;">Strict Governance Boundary:</strong>
          Carbon credits represent non-guaranteed potential upside. SthiraX unit economics and partner facility payback are modelled to be self-sustaining without carbon removal revenue. Credits are never pre-sold before third-party verification and physical mineralisation confirmation.
        </div>
      </div>

      <!-- Pipeline Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Pipeline Opportunities</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">{{ opportunities.length }}</div>
          <span class="text-xs text-muted">Prospective corporate buyers</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Prospective Volume</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">{{ totalProspectiveTonnes | number }} t CO₂e</div>
          <span class="text-xs text-muted">Over 24-month horizon</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Avg Indicative Price</span>
          <div class="text-2xl font-bold font-mono text-accent mt-1">&#36; {{ avgPriceUsd | number:'1.0-0' }} / t</div>
          <span class="text-xs text-muted">(approx. ₹{{ (avgPriceUsd * 83) | number:'1.0-0' }} / t)</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Registry Target</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">Puro.earth / CCTS</div>
          <span class="text-xs text-muted">Carbonated Materials Standard</span>
        </div>
      </div>

      <!-- Opportunities Table -->
      <div class="card overflow-hidden bg-surface border-subtle mb-8">
        <div class="p-4 border-b border-subtle flex justify-between items-center">
          <h2 class="text-base font-display font-semibold text-primary">Prospective Carbon Removal Offtake Pipeline</h2>
          <span class="text-xs text-muted">Showing {{ opportunities.length }} opportunities</span>
        </div>

        <div class="overflow-x-auto">
          <table class="table w-full text-xs">
            <thead>
              <tr class="text-secondary border-b border-subtle bg-canvas/50">
                <th class="py-3 px-4 text-left font-mono">Opportunity ID</th>
                <th class="py-3 px-4 text-left">Prospective Buyer / Counterparty</th>
                <th class="py-3 px-4 text-left">Registry Standard</th>
                <th class="py-3 px-4 text-right font-mono">Volume (t CO₂)</th>
                <th class="py-3 px-4 text-right font-mono">Indicative Price</th>
                <th class="py-3 px-4 text-center">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-subtle">
              <tr *ngFor="let o of opportunities" class="hover:bg-canvas/30 transition-colors">
                <td class="py-3 px-4 font-mono font-bold text-primary">{{ o.id }}</td>
                <td class="py-3 px-4 font-semibold text-primary">{{ o.buyerName }}</td>
                <td class="py-3 px-4">{{ o.registryStandard }}</td>
                <td class="py-3 px-4 text-right font-mono">{{ o.volumeTonnes | number }} t</td>
                <td class="py-3 px-4 text-right font-mono text-accent font-bold">&#36;{{ o.pricePerTonneUsd }} / t</td>
                <td class="py-3 px-4 text-center">
                  <span class="badge" [ngClass]="getStatusBadge(o.status)">{{ o.status }}</span>
                </td>
                <td class="py-3 px-4 text-right">
                  <button class="btn btn-outline text-[11px] py-1 px-2.5" (click)="viewDetails(o)">Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Methodology Alignment Grid -->
      <div class="card p-6 bg-surface border-subtle">
        <h3 class="text-base font-display font-semibold text-primary mb-4">Methodology & Standard Qualification Checklist</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div class="p-4 bg-canvas rounded border border-subtle space-y-2">
            <span class="font-bold text-primary block">1. Permanence & Durability</span>
            <p class="text-muted leading-relaxed">
              CO₂ is reacted into thermodynamically stable calcium carbonates ($CaCO_3$). Risk of reversal is near zero under ambient conditions below 800°C. Exceeds the 1,000-year permanence threshold required by durable CDR standards.
            </p>
          </div>
          <div class="p-4 bg-canvas rounded border border-subtle space-y-2">
            <span class="font-bold text-primary block">2. Additionality & Baselines</span>
            <p class="text-muted leading-relaxed">
              Precast plants do not naturally absorb bulk industrial CO₂ in commercial timescales without pressurized mineralization retrofit enclosures. Baselines are established against standard ambient steam curing.
            </p>
          </div>
          <div class="p-4 bg-canvas rounded border border-subtle space-y-2">
            <span class="font-bold text-primary block">3. Gate-to-Gate Life Cycle Boundaries</span>
            <p class="text-muted leading-relaxed">
              Life cycle emissions from liquid CO₂ transport, compression energy, and chamber fan ventilation are rigorously subtracted from gross mineralization to yield verified gate-to-gate net removal.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CarbonOfftakeComponent implements OnInit {
  opportunities: CarbonOfftakeOpportunity[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.api.getCarbonOfftakeOpportunities().subscribe(o => this.opportunities = o);
  }

  get totalProspectiveTonnes(): number {
    return this.opportunities.reduce((sum, o) => sum + (o.volumeTonnes || 0), 0);
  }

  get avgPriceUsd(): number {
    if (!this.opportunities.length) return 0;
    return this.opportunities.reduce((sum, o) => sum + (o.pricePerTonneUsd || 0), 0) / this.opportunities.length;
  }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'AGREEMENT_SIGNED': return 'badge-accent';
      case 'AUDIT_STAGE': return 'badge-primary';
      case 'TERM_SHEET': return 'badge-secondary';
      default: return 'badge-warning';
    }
  }

  viewDetails(o: CarbonOfftakeOpportunity): void {
    alert(`Opportunity ${o.id}: Buyer ${o.buyerName}, Status: ${o.status}, Notes: ${o.notes || 'Under review'}`);
  }
}
