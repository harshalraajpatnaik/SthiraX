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
    <div class="carbon-offtake-portal-page space-y-8">
      
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            Carbon Offtake & Registry Governance
          </span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Carbon Offtake & Removal Registry Workspace
          </h1>
          <p class="text-slate-500 text-sm mt-1 max-w-2xl">
            Track prospective corporate carbon removal dialogues under Puro.earth, Isometric, and India's Carbon Credit Trading Scheme (CCTS).
          </p>
        </div>
      </div>

      <!-- Compliance Disclaimer Banner -->
      <div class="disclaimer-banner flex items-start gap-3.5 shadow-sm">
        <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </div>
        <div class="text-xs sm:text-sm text-emerald-950 leading-relaxed">
          <strong class="font-bold text-emerald-900 block mb-0.5">Strict Governance & Additionality Boundary:</strong>
          Carbon credits represent non-guaranteed prospective upside. SthiraX unit economics and partner facility payback are modelled to be self-sustaining without carbon removal revenue. Credits are never pre-sold before third-party verification and physical mineralisation confirmation.
        </div>
      </div>

      <!-- Pipeline Summary Metric Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div class="kpi-card flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Active Pipeline</span>
            <div class="text-3xl font-black font-mono text-slate-900 mt-1.5">{{ opportunities.length }} Leads</div>
          </div>
          <span class="text-xs text-slate-500 mt-2 block">Prospective corporate buyers</span>
        </div>

        <div class="kpi-card flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Prospective Volume</span>
            <div class="text-3xl font-black font-mono text-slate-900 mt-1.5">{{ totalProspectiveTonnes | number }} t CO₂e</div>
          </div>
          <span class="text-xs text-slate-500 mt-2 block">Over 24-month horizon</span>
        </div>

        <div class="kpi-card flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Avg Indicative Price</span>
            <div class="text-3xl font-black font-mono text-emerald-700 mt-1.5">\${{ avgPriceUsd | number:'1.0-0' }} / t</div>
          </div>
          <span class="text-xs text-slate-500 mt-2 block">approx. ₹{{ (avgPriceUsd * 83) | number:'1.0-0' }} / t CO₂</span>
        </div>

        <div class="kpi-card flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Registry Alignment</span>
            <div class="text-2xl font-black font-mono text-slate-900 mt-1.5">Puro.earth / CCTS</div>
          </div>
          <span class="text-xs text-slate-500 mt-2 block">Carbonated Materials Standard</span>
        </div>

      </div>

      <!-- Opportunities Pipeline Table Card -->
      <div class="pipeline-table-card">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-slate-900">Prospective Carbon Removal Pipeline</h2>
            <p class="text-xs text-slate-500 mt-0.5">Corporate offtake dialogues and forward procurement interest.</p>
          </div>
          <span class="text-xs font-mono font-medium text-slate-400">{{ opportunities.length }} Qualified Records</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono tracking-wider text-[11px]">
                <th class="py-3.5 px-5">Lead ID</th>
                <th class="py-3.5 px-5">Prospective Counterparty</th>
                <th class="py-3.5 px-5">Registry Standard</th>
                <th class="py-3.5 px-5 text-right font-mono">Volume (t CO₂)</th>
                <th class="py-3.5 px-5 text-right font-mono">Indicative Price</th>
                <th class="py-3.5 px-5 text-center">Status</th>
                <th class="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              <tr *ngFor="let o of opportunities" class="hover:bg-slate-50/80 transition-colors">
                <td class="py-4 px-5 font-mono font-bold text-slate-900">{{ o.id }}</td>
                <td class="py-4 px-5 font-bold text-slate-800">{{ o.buyerName }}</td>
                <td class="py-4 px-5 text-slate-600">{{ o.registryStandard }}</td>
                <td class="py-4 px-5 text-right font-mono font-medium text-slate-800">{{ o.volumeTonnes | number }} t</td>
                <td class="py-4 px-5 text-right font-mono font-bold text-emerald-700">\${{ o.pricePerTonneUsd }} / t</td>
                <td class="py-4 px-5 text-center">
                  <span class="px-2.5 py-1 rounded-full font-mono font-bold text-[11px]" [ngClass]="getStatusBadge(o.status)">
                    {{ o.status }}
                  </span>
                </td>
                <td class="py-4 px-5 text-right">
                  <button class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors" (click)="viewDetails(o)">
                    Inspect
                  </button>
                </td>
              </tr>
              <tr *ngIf="opportunities.length === 0">
                <td colspan="7" class="py-12 text-center text-slate-400">No offtake opportunities found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Methodology Alignment Grid -->
      <div class="checklist-card space-y-4">
        <div>
          <h3 class="text-base font-bold text-slate-900">Methodology & Standard Qualification Checklist</h3>
          <p class="text-xs text-slate-500 mt-0.5">Verification criteria required to tokenize physical mineralization into durable carbon removal credits:</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          
          <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">&check;</span>
                <span class="font-bold text-slate-900 text-sm">1. Permanence & Durability</span>
              </div>
              <p class="text-slate-600 leading-relaxed">
                CO₂ is reacted into thermodynamically stable calcium carbonate (CaCO₃). Risk of reversal is near zero under ambient conditions below 800&deg;C. Exceeds the 1,000-year durability threshold required by durable CDR standards.
              </p>
            </div>
            <span class="text-[11px] font-mono text-emerald-700 mt-2 block">Standard: Puro.earth &bull; &gt;1000y</span>
          </div>

          <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">&check;</span>
                <span class="font-bold text-slate-900 text-sm">2. Clear Additionality</span>
              </div>
              <p class="text-slate-600 leading-relaxed">
                Precast factories do not naturally absorb bulk industrial CO₂ in commercial timescales without specialized pressurization retrofit skids. Baselines are established against standard ambient steam curing.
              </p>
            </div>
            <span class="text-[11px] font-mono text-emerald-700 mt-2 block">Baseline: Ambient Steam Curing</span>
          </div>

          <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">&check;</span>
                <span class="font-bold text-slate-900 text-sm">3. Gate-to-Gate Life Cycle</span>
              </div>
              <p class="text-slate-600 leading-relaxed">
                Life cycle emissions from liquid CO₂ transport, compression energy, and chamber fan ventilation are rigorously subtracted from gross mineralization to yield verified net physical removal.
              </p>
            </div>
            <span class="text-[11px] font-mono text-emerald-700 mt-2 block">Protocol: ISO 14064-2</span>
          </div>

        </div>
      </div>

      <!-- Detail Modal Dialog -->
      <div *ngIf="selectedOpportunity" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
          <div class="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                OFFTAKE LEAD #{{ selectedOpportunity.id }}
              </span>
              <h3 class="text-lg font-bold text-slate-900 mt-1">{{ selectedOpportunity.buyerName }}</h3>
            </div>
            <button class="text-slate-400 hover:text-slate-600 text-2xl" (click)="selectedOpportunity = null">&times;</button>
          </div>

          <div class="space-y-3 text-xs">
            <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Registry Standard:</span>
                <span class="font-semibold text-slate-800">{{ selectedOpportunity.registryStandard }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Contract Volume:</span>
                <span class="font-mono font-bold text-slate-900">{{ selectedOpportunity.volumeTonnes | number }} tonnes CO₂e</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Indicative Price:</span>
                <span class="font-mono font-bold text-emerald-700">\${{ selectedOpportunity.pricePerTonneUsd }} / t CO₂</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-slate-500">Pipeline Status:</span>
                <span class="px-2 py-0.5 rounded font-mono font-bold text-[11px]" [ngClass]="getStatusBadge(selectedOpportunity.status)">
                  {{ selectedOpportunity.status }}
                </span>
              </div>
            </div>

            <div class="text-[11px] text-slate-500 leading-relaxed">
              * Prospective counterparty terms require physical confirmation of batch-level mineralization via SthiraX Trace™ Coriolis mass-balance telemetry before issuance.
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex justify-end">
            <button (click)="selectedOpportunity = null" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors">
              Close Inspection
            </button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .carbon-offtake-portal-page {
      padding: 0.5rem 0 3rem;
    }
    .disclaimer-banner {
      background: rgba(236, 253, 245, 0.8);
      border: 1px solid #A7F3D0;
      border-radius: 1rem;
      padding: 1.25rem 1.5rem;
    }
    .kpi-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1rem;
      padding: 1.25rem 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }
    .pipeline-table-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      overflow: hidden;
    }
    .checklist-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1.25rem;
      padding: 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
    }
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .modal-box {
      background: #ffffff;
      border-radius: 1.25rem;
      max-width: 520px;
      width: 100%;
      padding: 1.75rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      border: 1px solid #E2E8F0;
    }
  `]
})
export class CarbonOfftakeComponent implements OnInit {
  opportunities: CarbonOfftakeOpportunity[] = [];
  selectedOpportunity: CarbonOfftakeOpportunity | null = null;

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
      case 'QUALIFIED': return 'bg-emerald-100 text-emerald-800';
      case 'TERM_SHEET': return 'bg-cyan-100 text-cyan-800';
      case 'DIALOGUE': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  }

  viewDetails(o: CarbonOfftakeOpportunity): void {
    this.selectedOpportunity = o;
  }
}
