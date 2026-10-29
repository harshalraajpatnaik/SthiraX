import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-costing-portal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="costing-portal-page space-y-8">
      
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            Financial Architecture & Economics
          </span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Unit Economics & Margin Architecture
          </h1>
          <p class="text-slate-500 text-sm mt-1 max-w-2xl">
            Interactive financial waterfall analyzing precast unit economics, modular curing retrofit CapEx recovery, and EBITDA sensitivity across delivered CO₂ tariffs.
          </p>
        </div>
      </div>

      <!-- Live Scenario Simulator Controls Card -->
      <div class="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div class="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 class="text-base font-bold text-slate-900">Plant Retrofit & Unit Cost Simulator</h2>
            <p class="text-xs text-slate-500">Adjust input assumptions to recalculate manufacturer EBITDA and payback periods in real time.</p>
          </div>
          <button (click)="resetDefaults()" class="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors">
            Reset to Baseline
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs font-sans">
          
          <div class="space-y-1.5">
            <label class="block font-semibold text-slate-700">Delivered CO₂ Cost (₹ / tonne)</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-mono">₹</span>
              <input type="number" [(ngModel)]="co2DeliveredCost" (ngModelChange)="recalc()" class="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white" step="500">
            </div>
            <span class="text-[11px] text-slate-400 block">Baseline: ₹8,000 / t (Deccan Distilleries)</span>
          </div>

          <div class="space-y-1.5">
            <label class="block font-semibold text-slate-700">Specific Uptake (kg CO₂ / t block)</label>
            <div class="relative">
              <input type="number" [(ngModel)]="uptakeKgPerTonne" (ngModelChange)="recalc()" class="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white" step="1">
            </div>
            <span class="text-[11px] text-slate-400 block">Tested range: 25 – 35 kg/t</span>
          </div>

          <div class="space-y-1.5">
            <label class="block font-semibold text-slate-700">Finished Selling Price (₹ / t)</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-mono">₹</span>
              <input type="number" [(ngModel)]="sellingPricePerTonne" (ngModelChange)="recalc()" class="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white" step="50">
            </div>
            <span class="text-[11px] text-slate-400 block">Market average: ₹3,500 – ₹3,800 / t</span>
          </div>

          <div class="space-y-1.5">
            <label class="block font-semibold text-slate-700">SthiraX Software Fee (₹ / t)</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-mono">₹</span>
              <input type="number" [(ngModel)]="royaltyPerTonne" (ngModelChange)="recalc()" class="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white" step="25">
            </div>
            <span class="text-[11px] text-slate-400 block">Trace license & sensor MRV telemetry</span>
          </div>

        </div>
      </div>

      <!-- Financial KPI Overview Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">CO₂ Cost per Tonne</span>
            <div class="text-3xl font-black font-mono text-slate-900 mt-1.5">₹ {{ co2CostPerTonneBlock | number:'1.1-1' }}</div>
          </div>
          <span class="text-xs text-slate-500 mt-2 block">{{ uptakeKgPerTonne }} kg &#64; ₹{{ (co2DeliveredCost/1000) | number:'1.2-2' }}/kg</span>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Total Delivered Cost</span>
            <div class="text-3xl font-black font-mono text-slate-900 mt-1.5">₹ {{ totalDeliveredCostPerTonne | number:'1.0-0' }} / t</div>
          </div>
          <span class="text-xs text-slate-500 mt-2 block">Raw + CO₂ + Energy + Software Fee</span>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Manufacturer Net Margin</span>
            <div class="text-3xl font-black font-mono text-emerald-700 mt-1.5">₹ {{ manufacturerMarginPerTonne | number:'1.0-0' }} / t</div>
          </div>
          <span class="text-xs text-emerald-700 font-semibold mt-2 block">{{ (manufacturerMarginPerTonne / sellingPricePerTonne * 100) | number:'1.1-1' }}% EBITDA contribution</span>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Retrofit CapEx Payback</span>
            <div class="text-3xl font-black font-mono text-emerald-700 mt-1.5">{{ retrofitPaybackMonths | number:'1.1-1' }} Mos</div>
          </div>
          <span class="text-xs text-slate-500 mt-2 block">On ₹35L CapEx &#64; 18,000 t/year</span>
        </div>

      </div>

      <!-- Cost Comparison Waterfall & Sensitivity Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Conventional vs SthiraX Breakdown -->
        <div class="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 class="text-base font-bold text-slate-900">Unit Cost Comparison: Conventional vs. SthiraX</h3>
            <p class="text-xs text-slate-500 mt-0.5">Illustrating how 20% cement replacement with industrial slag/fly ash lowers net bill of materials.</p>
          </div>

          <div class="space-y-5 text-xs font-mono">
            
            <!-- Standard OPC -->
            <div class="space-y-2">
              <div class="flex justify-between items-center font-sans">
                <span class="font-semibold text-slate-800">Standard OPC Precast Concrete</span>
                <span class="font-mono font-bold text-slate-900">₹ 3,120 / t</span>
              </div>
              <div class="w-full bg-slate-100 rounded-lg h-3 overflow-hidden flex">
                <div class="bg-slate-400 h-full" style="width: 65%" title="Cement & Aggregates ₹2,050"></div>
                <div class="bg-slate-500 h-full" style="width: 20%" title="Labor & Power ₹620"></div>
                <div class="bg-slate-600 h-full" style="width: 15%" title="Amortization ₹450"></div>
              </div>
              <div class="flex justify-between items-center text-[11px] font-sans text-slate-500 pt-0.5">
                <span>Selling Price: ₹ 3,450 / t</span>
                <span class="text-slate-800 font-semibold">Standard Margin: ₹ 330 / t (9.5%)</span>
              </div>
            </div>

            <!-- SthiraX Mineralized -->
            <div class="space-y-2 pt-4 border-t border-slate-100">
              <div class="flex justify-between items-center font-sans">
                <span class="font-semibold text-emerald-900">SthiraX Mineralized Precast (with 20% Cement Savings)</span>
                <span class="font-mono font-bold text-emerald-800">₹ {{ totalDeliveredCostPerTonne | number:'1.0-0' }} / t</span>
              </div>
              <div class="w-full bg-slate-100 rounded-lg h-3 overflow-hidden flex">
                <div class="bg-emerald-600 h-full" style="width: 55%" title="Reduced Cement + Slag/Fly Ash ₹1,820"></div>
                <div class="bg-cyan-500 h-full" style="width: 8%" title="CO2 Injected Cost"></div>
                <div class="bg-slate-500 h-full" style="width: 18%" title="Labor & Curing Chamber Power ₹640"></div>
                <div class="bg-emerald-800 h-full" style="width: 7%" title="SthiraX Software Fee ₹180"></div>
              </div>
              <div class="flex justify-between items-center text-[11px] font-sans text-slate-500 pt-0.5">
                <span>Selling Price: ₹ {{ sellingPricePerTonne | number:'1.0-0' }} / t</span>
                <span class="text-emerald-700 font-bold">SthiraX Margin: ₹ {{ manufacturerMarginPerTonne | number:'1.0-0' }} / t ({{ (manufacturerMarginPerTonne / sellingPricePerTonne * 100) | number:'1.1-1' }}%)</span>
              </div>
            </div>

          </div>

          <div class="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-950">
            <span class="font-bold block mb-1">Commercial Rule of Discipline:</span>
            "The SthiraX business model is profitable for the precast manufacturer purely through reduced cement binder consumption and premium procurement pricing, with zero dependence on carbon credit offtake subsidies."
          </div>
        </div>

        <!-- Sensitivity Matrix -->
        <div class="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 class="text-base font-bold text-slate-900">Sensitivity Matrix: Delivered CO₂ vs. Selling Price</h3>
            <p class="text-xs text-slate-500 mt-0.5">Manufacturer gross margin (₹ / t) across varied bulk liquid CO₂ transport costs and selling prices:</p>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px]">
                  <th class="py-3 px-3.5">Delivered CO₂</th>
                  <th class="py-3 px-3.5 text-right">₹3,400 / t</th>
                  <th class="py-3 px-3.5 text-right font-bold text-slate-900">₹3,650 / t (Base)</th>
                  <th class="py-3 px-3.5 text-right">₹3,900 / t</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                <tr class="hover:bg-slate-50/50">
                  <td class="py-3 px-3.5 font-sans font-medium text-slate-800">₹ 6,000 / t CO₂</td>
                  <td class="py-3 px-3.5 text-right text-slate-800">₹ 310</td>
                  <td class="py-3 px-3.5 text-right font-bold text-emerald-700">₹ 560</td>
                  <td class="py-3 px-3.5 text-right text-emerald-700 font-bold">₹ 810</td>
                </tr>
                <tr class="bg-emerald-50/60 font-semibold border-l-2 border-l-emerald-500">
                  <td class="py-3 px-3.5 font-sans font-bold text-emerald-900">₹ 8,000 / t CO₂ (Base)</td>
                  <td class="py-3 px-3.5 text-right text-slate-800">₹ 250</td>
                  <td class="py-3 px-3.5 text-right font-bold text-emerald-800">₹ 500</td>
                  <td class="py-3 px-3.5 text-right text-emerald-800 font-bold">₹ 750</td>
                </tr>
                <tr class="hover:bg-slate-50/50">
                  <td class="py-3 px-3.5 font-sans font-medium text-slate-800">₹ 10,000 / t CO₂</td>
                  <td class="py-3 px-3.5 text-right text-slate-800">₹ 190</td>
                  <td class="py-3 px-3.5 text-right text-slate-800">₹ 440</td>
                  <td class="py-3 px-3.5 text-right text-emerald-700">₹ 690</td>
                </tr>
                <tr class="hover:bg-slate-50/50">
                  <td class="py-3 px-3.5 font-sans font-medium text-slate-800">₹ 12,000 / t CO₂</td>
                  <td class="py-3 px-3.5 text-right text-amber-600">₹ 130</td>
                  <td class="py-3 px-3.5 text-right text-slate-800">₹ 380</td>
                  <td class="py-3 px-3.5 text-right text-emerald-700">₹ 630</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="text-[11px] text-slate-400 italic pt-1">
            * Assumptions: 30 kg/t specific CO₂ uptake and ₹35 Lakhs modular retrofit amortized over 5 years.
          </div>
        </div>

      </div>

    </div>
  `,
  styles: [`
    .costing-portal-page {
      padding: 0.5rem 0 3rem;
    }
    .simulator-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1.25rem;
      padding: 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
    }
    .kpi-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1rem;
      padding: 1.25rem 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }
    .waterfall-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1.25rem;
      padding: 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
    }
    .progress-bar-wrap {
      width: 100%;
      background-color: #F1F5F9;
      border-radius: 0.5rem;
      height: 12px;
      overflow: hidden;
      display: flex;
    }
    .matrix-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1.25rem;
      padding: 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
    }
  `]
})
export class CostingPortalComponent implements OnInit {
  co2DeliveredCost = 8000;
  uptakeKgPerTonne = 30;
  sellingPricePerTonne = 3650;
  royaltyPerTonne = 180;

  baseRawMaterialsCost = 1820;
  laborAndPowerCost = 640;
  retrofitCapex = 3500000;
  annualVolumeTonnes = 18000;

  co2CostPerTonneBlock = 0;
  totalDeliveredCostPerTonne = 0;
  manufacturerMarginPerTonne = 0;
  retrofitPaybackMonths = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.recalc();
  }

  resetDefaults(): void {
    this.co2DeliveredCost = 8000;
    this.uptakeKgPerTonne = 30;
    this.sellingPricePerTonne = 3650;
    this.royaltyPerTonne = 180;
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
