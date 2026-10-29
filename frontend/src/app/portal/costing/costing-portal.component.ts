import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { CostModel } from '../../core/models';

@Component({
  selector: 'app-costing-portal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="costing-portal-page">
      <div class="page-header mb-8">
        <div>
          <span class="badge badge-accent mb-2">Financial Architecture</span>
          <h1 class="page-title text-3xl font-display">Unit Economics & Margin Architecture</h1>
          <p class="text-secondary text-sm">Industrial precast cost breakdowns, plant retrofit payback, and carbon upside sensitivity.</p>
        </div>
      </div>

      <!-- Live Scenario Controls -->
      <div class="card p-6 bg-surface border-subtle mb-8">
        <h2 class="text-lg font-display font-semibold text-primary mb-4">Plant Retrofit & Batch Cost Simulator</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          <div>
            <label class="block text-secondary mb-1">Delivered CO₂ Cost (₹ / tonne CO₂)</label>
            <input type="number" [(ngModel)]="co2DeliveredCost" (ngModelChange)="recalc()" class="input w-full font-mono" step="500">
            <span class="text-[11px] text-muted">Baseline: ₹8,000 / t from Deccan Distilleries</span>
          </div>
          <div>
            <label class="block text-secondary mb-1">Specific CO₂ Uptake (kg / tonne block)</label>
            <input type="number" [(ngModel)]="uptakeKgPerTonne" (ngModelChange)="recalc()" class="input w-full font-mono" step="1">
            <span class="text-[11px] text-muted">Tested range: 25 - 35 kg/t</span>
          </div>
          <div>
            <label class="block text-secondary mb-1">Finished Selling Price (₹ / tonne)</label>
            <input type="number" [(ngModel)]="sellingPricePerTonne" (ngModelChange)="recalc()" class="input w-full font-mono" step="50">
            <span class="text-[11px] text-muted">Market average: ₹3,500 - ₹3,800 / t</span>
          </div>
          <div>
            <label class="block text-secondary mb-1">SthiraX Platform Royalty (₹ / tonne)</label>
            <input type="number" [(ngModel)]="royaltyPerTonne" (ngModelChange)="recalc()" class="input w-full font-mono" step="25">
            <span class="text-[11px] text-muted">Platform fee & trace license</span>
          </div>
        </div>
      </div>

      <!-- Summary KPI Row -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">CO₂ Cost per Tonne Block</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">₹ {{ co2CostPerTonneBlock | number:'1.1-1' }}</div>
          <span class="text-xs text-muted">({{ uptakeKgPerTonne }} kg &#64; ₹{{ (co2DeliveredCost/1000) | number:'1.2-2' }}/kg)</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Total Production Cost</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">₹ {{ totalDeliveredCostPerTonne | number:'1.0-0' }}</div>
          <span class="text-xs text-muted">Raw + CO₂ + Energy + Royalty</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Manufacturer Net Margin</span>
          <div class="text-2xl font-bold font-mono text-accent mt-1">₹ {{ manufacturerMarginPerTonne | number:'1.0-0' }} / t</div>
          <span class="text-xs text-muted">{{ (manufacturerMarginPerTonne / sellingPricePerTonne * 100) | number:'1.1-1' }}% EBITDA contribution</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Retrofit Payback (18k t/yr)</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">{{ retrofitPaybackMonths | number:'1.1-1' }} Months</div>
          <span class="text-xs text-muted">On ₹35 Lakhs modular chamber capex</span>
        </div>
      </div>

      <!-- Cost Waterfall Comparison -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Conventional vs SthiraX Breakdown -->
        <div class="card p-6 bg-surface border-subtle">
          <h3 class="text-base font-display font-semibold text-primary mb-4">Cost Comparison: Conventional vs SthiraX Precast</h3>
          <div class="space-y-4 text-xs font-mono">
            <div>
              <div class="flex justify-between py-1 text-secondary font-sans font-medium">
                <span>Standard OPC Precast Concrete</span>
                <span class="font-mono text-primary">₹ 3,120 / t</span>
              </div>
              <div class="w-full bg-canvas rounded h-2 overflow-hidden flex">
                <div class="bg-gray-400 h-full" style="width: 65%" title="Cement & Aggregates ₹2,050"></div>
                <div class="bg-gray-500 h-full" style="width: 20%" title="Labor & Power ₹620"></div>
                <div class="bg-gray-600 h-full" style="width: 15%" title="Depreciation ₹450"></div>
              </div>
              <div class="flex justify-between text-[11px] text-muted mt-1 font-sans">
                <span>Selling Price: ₹ 3,450 / t</span>
                <span class="text-primary font-bold">Standard Margin: ₹ 330 / t (9.5%)</span>
              </div>
            </div>

            <div class="pt-4 border-t border-subtle">
              <div class="flex justify-between py-1 text-secondary font-sans font-medium">
                <span>SthiraX Mineralized Precast (with 15% Cement Reduction)</span>
                <span class="font-mono text-primary">₹ {{ totalDeliveredCostPerTonne | number:'1.0-0' }} / t</span>
              </div>
              <div class="w-full bg-canvas rounded h-2 overflow-hidden flex">
                <div class="bg-gray-400 h-full" style="width: 55%" title="Reduced Cement + Slag/Fly Ash ₹1,820"></div>
                <div class="bg-accent h-full" style="width: 8%" title="CO2 Injected Cost"></div>
                <div class="bg-gray-500 h-full" style="width: 18%" title="Labor & Curing Chamber Power ₹640"></div>
                <div class="bg-primary h-full" style="width: 7%" title="SthiraX Royalty ₹180"></div>
              </div>
              <div class="flex justify-between text-[11px] text-muted mt-1 font-sans">
                <span>Selling Price: ₹ {{ sellingPricePerTonne | number:'1.0-0' }} / t</span>
                <span class="text-accent font-bold">SthiraX Margin: ₹ {{ manufacturerMarginPerTonne | number:'1.0-0' }} / t ({{ (manufacturerMarginPerTonne / sellingPricePerTonne * 100) | number:'1.1-1' }}%)</span>
              </div>
            </div>
          </div>

          <div class="mt-6 p-3 bg-canvas rounded border border-subtle text-xs text-muted">
            <span class="font-bold text-primary block mb-1">Commercial Rule of Discipline:</span>
            "The SthiraX model delivers positive gross margin to the precast manufacturer purely through reduced cement binder consumption and premium procurement pricing, with zero dependence on carbon credit offtake subsidies."
          </div>
        </div>

        <!-- Sensitivity Matrix -->
        <div class="card p-6 bg-surface border-subtle">
          <h3 class="text-base font-display font-semibold text-primary mb-4">Sensitivity Matrix: Delivered CO₂ Price vs Margin</h3>
          <p class="text-xs text-secondary mb-4">Manufacturer margin (₹ / t) across varied bulk liquid CO₂ transport costs and selling prices:</p>

          <div class="overflow-x-auto">
            <table class="table w-full text-xs font-mono">
              <thead>
                <tr class="text-secondary border-b border-subtle bg-canvas/50">
                  <th class="py-2 px-3 text-left">Delivered CO₂</th>
                  <th class="py-2 px-3 text-right">₹3,400 / t</th>
                  <th class="py-2 px-3 text-right">₹3,650 / t (Base)</th>
                  <th class="py-2 px-3 text-right">₹3,900 / t</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-subtle">
                <tr>
                  <td class="py-2 px-3 font-sans text-secondary">₹ 6,000 / t CO₂</td>
                  <td class="py-2 px-3 text-right text-primary">₹ 310</td>
                  <td class="py-2 px-3 text-right font-bold text-accent">₹ 560</td>
                  <td class="py-2 px-3 text-right text-accent font-bold">₹ 810</td>
                </tr>
                <tr class="bg-canvas/30 font-bold">
                  <td class="py-2 px-3 font-sans text-secondary">₹ 8,000 / t CO₂ (Base)</td>
                  <td class="py-2 px-3 text-right text-primary">₹ 250</td>
                  <td class="py-2 px-3 text-right text-accent">₹ 500</td>
                  <td class="py-2 px-3 text-right text-accent font-bold">₹ 750</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-sans text-secondary">₹ 10,000 / t CO₂</td>
                  <td class="py-2 px-3 text-right text-primary">₹ 190</td>
                  <td class="py-2 px-3 text-right text-primary">₹ 440</td>
                  <td class="py-2 px-3 text-right text-accent">₹ 690</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-sans text-secondary">₹ 12,000 / t CO₂</td>
                  <td class="py-2 px-3 text-right text-warning">₹ 130</td>
                  <td class="py-2 px-3 text-right text-primary">₹ 380</td>
                  <td class="py-2 px-3 text-right text-accent">₹ 630</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-4 text-[11px] text-muted">
            * Assuming 30 kg/t specific uptake and ₹35L retrofit amortised over 5 years.
          </div>
        </div>
      </div>
    </div>
  `
})
export class CostingPortalComponent implements OnInit {
  co2DeliveredCost = 8000; // ₹ / t of CO2
  uptakeKgPerTonne = 30; // kg CO2 / t block
  sellingPricePerTonne = 3650; // ₹ / t block
  royaltyPerTonne = 180; // ₹ / t block

  baseRawMaterialsCost = 1820; // Reduced cement + aggregates
  laborAndPowerCost = 640;
  retrofitCapex = 3500000; // ₹ 35 Lakhs
  annualVolumeTonnes = 18000;

  co2CostPerTonneBlock = 0;
  totalDeliveredCostPerTonne = 0;
  manufacturerMarginPerTonne = 0;
  retrofitPaybackMonths = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.recalc();
  }

  recalc(): void {
    this.co2CostPerTonneBlock = (this.co2DeliveredCost / 1000) * this.uptakeKgPerTonne;
    this.totalDeliveredCostPerTonne = this.baseRawMaterialsCost + this.co2CostPerTonneBlock + this.laborAndPowerCost + this.royaltyPerTonne;
    this.manufacturerMarginPerTonne = this.sellingPricePerTonne - this.totalDeliveredCostPerTonne;

    const annualNetMargin = this.manufacturerMarginPerTonne * this.annualVolumeTonnes;
    if (annualNetMargin > 0) {
      this.retrofitPaybackMonths = (this.retrofitCapex / annualNetMargin) * 12;
    } else {
      this.retrofitPaybackMonths = 999;
    }
  }
}
