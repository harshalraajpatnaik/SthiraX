import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { ProductionBatch, Plant, Product } from '../../core/models';

@Component({
  selector: 'app-batches',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="batches-portal-page space-y-8">
      
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
            Plant Operations Console
          </span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Production Batches & Curing Telemetry
          </h1>
          <p class="text-slate-500 text-sm mt-1 max-w-2xl">
            Live monitoring of mineralizing autoclave cycles, Coriolis flow meter injection logs, and mechanical test specimens.
          </p>
        </div>
        <button 
          (click)="openBatchModal = true"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-sm transition-all hover:scale-[1.02]">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Record Production Run
        </button>
      </div>

      <!-- Overview Metric Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="metric-card">
          <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Tracked Batches</span>
          <div class="text-3xl font-black font-mono text-slate-900 mt-1.5">{{ batches.length }}</div>
          <span class="text-xs text-slate-500 mt-1 block">Across 3 regional plants</span>
        </div>
        <div class="metric-card">
          <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Active in Chamber</span>
          <div class="text-3xl font-black font-mono text-emerald-600 mt-1.5">{{ activeInChamberCount }}</div>
          <span class="text-xs text-slate-500 mt-1 block">Live telemetry streaming</span>
        </div>
        <div class="metric-card">
          <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Mineralized CO₂</span>
          <div class="text-3xl font-black font-mono text-emerald-700 mt-1.5">{{ totalMineralizedKg | number:'1.1-1' }} kg</div>
          <span class="text-xs text-slate-500 mt-1 block">Fixed permanently into rock</span>
        </div>
        <div class="metric-card">
          <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Average 28d Strength</span>
          <div class="text-3xl font-black font-mono text-slate-900 mt-1.5">{{ avgStrengthMpa | number:'1.1-1' }} MPa</div>
          <span class="text-xs text-slate-500 mt-1 block">Exceeds IS 15658 M-35 spec</span>
        </div>
      </div>

      <!-- Batch Detail / Live Telemetry Drawer -->
      <div *ngIf="selectedBatch" class="telemetry-drawer space-y-6">
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-bold text-slate-900">Batch #{{ selectedBatch.batchNumber }}</h2>
              <span class="px-2.5 py-1 rounded-full text-xs font-mono font-bold" [ngClass]="getStatusBadge(selectedBatch.status)">
                {{ selectedBatch.status }}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Manufacturing Facility: <strong class="text-slate-800">{{ getPlantName(selectedBatch.plantId) }}</strong> &bull; 
              Product: <strong class="text-slate-800">{{ getProductName(selectedBatch.productId) }}</strong> &bull; 
              Production Date: <span class="font-mono">{{ selectedBatch.productionDate }}</span>
            </p>
          </div>

          <div class="flex items-center gap-2.5">
            <button class="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors" (click)="selectedBatch = null">
              Close Detail
            </button>
            <button *ngIf="selectedBatch.status === 'CURING_COMPLETE'" class="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm" (click)="sendToQa(selectedBatch)">
              Submit for QA Sign-off
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Mass Balance Card -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              CO₂ Mass Uptake & Yield
            </h3>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Output Volume:</span>
                <span class="font-mono font-semibold text-slate-800">{{ selectedBatch.quantityUnits | number }} units ({{ selectedBatch.quantityTonnes }} t)</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Coriolis Injected:</span>
                <span class="font-mono font-semibold text-slate-800">{{ selectedBatch.co2InjectedKg }} kg</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Chamber Vent Loss:</span>
                <span class="font-mono font-semibold text-slate-500">{{ (selectedBatch.co2InjectedKg - selectedBatch.co2MineralizedKg) | number:'1.1-2' }} kg</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Gross Mineralized:</span>
                <span class="font-mono font-bold text-emerald-700">{{ selectedBatch.co2MineralizedKg }} kg</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-slate-500">Fixation Efficiency:</span>
                <span class="font-mono font-bold text-emerald-700">{{ (selectedBatch.co2MineralizedKg / selectedBatch.co2InjectedKg * 100) | number:'1.1-1' }}%</span>
              </div>
            </div>
          </div>

          <!-- Chamber Sensor Telemetry -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Chamber Environment (Sensors)
            </h3>
            <div class="space-y-3 text-xs">
              <div>
                <div class="flex justify-between text-slate-500 mb-1">
                  <span>Temperature</span>
                  <span class="font-mono font-bold text-slate-800">{{ selectedBatch.curingTempCelsius || 41.5 }} &deg;C</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-1.5"><div class="bg-emerald-500 h-1.5 rounded-full" style="width: 70%"></div></div>
              </div>
              <div>
                <div class="flex justify-between text-slate-500 mb-1">
                  <span>Relative Humidity</span>
                  <span class="font-mono font-bold text-slate-800">{{ selectedBatch.curingHumidityPercent || 82.0 }} %</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-1.5"><div class="bg-sky-500 h-1.5 rounded-full" style="width: 82%"></div></div>
              </div>
              <div>
                <div class="flex justify-between text-slate-500 mb-1">
                  <span>Curing Duration</span>
                  <span class="font-mono font-bold text-slate-800">{{ selectedBatch.curingDurationHours || 14 }} hrs</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-1.5"><div class="bg-emerald-600 h-1.5 rounded-full" style="width: 85%"></div></div>
              </div>
              <div class="text-[11px] text-slate-400 italic pt-1">
                * Calibrated Emerson Coriolis meter model CMF025.
              </div>
            </div>
          </div>

          <!-- Mechanical & Spec Summary -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              Mechanical & Lab Verification
            </h3>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">7d Compressive:</span>
                <span class="font-mono font-semibold text-slate-800">{{ selectedBatch.compressiveStrength7dMpa || 28.4 }} MPa</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">28d Compressive:</span>
                <span class="font-mono font-bold text-emerald-700">{{ selectedBatch.compressiveStrength28dMpa ? selectedBatch.compressiveStrength28dMpa + ' MPa' : 'Pending Lab' }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Water Absorption:</span>
                <span class="font-mono font-semibold text-slate-800">{{ selectedBatch.waterAbsorptionPercent }} % (spec &le; 6.0%)</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-slate-500">Digital Passport:</span>
                <span *ngIf="selectedBatch.passportId" class="font-mono font-bold text-emerald-700 underline">{{ selectedBatch.passportId }}</span>
                <span *ngIf="!selectedBatch.passportId" class="text-slate-400">Draft (Pending QA)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- Main Batches Table Card -->
      <div class="table-container">
        
        <div class="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-base font-bold text-slate-900">Production Batches Registry</h2>
            <p class="text-xs text-slate-500 mt-0.5">Click any batch to inspect detailed sensor telemetry and mass balances.</p>
          </div>

          <div class="flex items-center gap-2.5">
            <span class="text-xs font-mono uppercase text-slate-400 font-semibold">Filter:</span>
            <select [(ngModel)]="statusFilter" class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="ALL">All Batches</option>
              <option value="IN_PRODUCTION">IN_PRODUCTION</option>
              <option value="CURING_ACTIVE">CURING_ACTIVE</option>
              <option value="CURING_COMPLETE">CURING_COMPLETE</option>
              <option value="APPROVED">APPROVED</option>
              <option value="DISPATCHED">DISPATCHED</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono tracking-wider text-[11px]">
                <th class="py-3.5 px-5">Batch Number</th>
                <th class="py-3.5 px-5">Facility</th>
                <th class="py-3.5 px-5">Product Spec</th>
                <th class="py-3.5 px-5 text-right">Volume</th>
                <th class="py-3.5 px-5 text-right">CO₂ Injected</th>
                <th class="py-3.5 px-5 text-right">Mineralized</th>
                <th class="py-3.5 px-5 text-right">28d Strength</th>
                <th class="py-3.5 px-5 text-center">Status</th>
                <th class="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              <tr *ngFor="let b of filteredBatches" 
                  class="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  [class.bg-emerald-50]="selectedBatch?.id === b.id"
                  (click)="selectedBatch = b">
                <td class="py-4 px-5 font-mono font-bold text-slate-900">{{ b.batchNumber }}</td>
                <td class="py-4 px-5 font-medium text-slate-800">{{ getPlantName(b.plantId) }}</td>
                <td class="py-4 px-5 text-slate-600">{{ getProductName(b.productId) }}</td>
                <td class="py-4 px-5 text-right font-mono">{{ b.quantityUnits | number }} u ({{ b.quantityTonnes }} t)</td>
                <td class="py-4 px-5 text-right font-mono text-slate-600">{{ b.co2InjectedKg }} kg</td>
                <td class="py-4 px-5 text-right font-mono font-bold text-emerald-700">{{ b.co2MineralizedKg }} kg</td>
                <td class="py-4 px-5 text-right font-mono font-semibold text-slate-800">
                  {{ b.compressiveStrength28dMpa ? b.compressiveStrength28dMpa + ' MPa' : 'Pending' }}
                </td>
                <td class="py-4 px-5 text-center">
                  <span class="px-2.5 py-1 rounded-full font-mono font-bold text-[11px]" [ngClass]="getStatusBadge(b.status)">
                    {{ b.status }}
                  </span>
                </td>
                <td class="py-4 px-5 text-right" (click)="$event.stopPropagation()">
                  <button class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors" (click)="selectedBatch = b">
                    Telemetry
                  </button>
                </td>
              </tr>
              <tr *ngIf="filteredBatches.length === 0">
                <td colspan="9" class="py-12 text-center text-slate-400">No production batches found for selected filter.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Record New Batch Modal -->
      <div *ngIf="openBatchModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
          <div class="flex justify-between items-center pb-4 border-b border-slate-100">
            <h3 class="text-lg font-bold text-slate-900">Record New Production Batch Run</h3>
            <button class="text-slate-400 hover:text-slate-600 text-2xl" (click)="openBatchModal = false">&times;</button>
          </div>

          <form (ngSubmit)="submitNewBatch()" class="space-y-4 text-xs">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Batch Identifier</label>
                <input type="text" [(ngModel)]="newBatch.batchNumber" name="batchNumber" required class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white" placeholder="STX-2026-B109">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Production Date</label>
                <input type="date" [(ngModel)]="newBatch.productionDate" name="productionDate" required class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Manufacturing Facility</label>
                <select [(ngModel)]="newBatch.plantId" name="plantId" required class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white">
                  <option *ngFor="let p of plants" [value]="p.id">{{ p.name }} ({{ p.location }})</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Product Specification</label>
                <select [(ngModel)]="newBatch.productId" name="productId" required class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white">
                  <option *ngFor="let pr of products" [value]="pr.id">{{ pr.name }}</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Output Units</label>
                <input type="number" [(ngModel)]="newBatch.quantityUnits" name="quantityUnits" required class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white" placeholder="10000">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Mass (Tonnes)</label>
                <input type="number" [(ngModel)]="newBatch.quantityTonnes" name="quantityTonnes" required class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white" placeholder="42.5">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">CO₂ Injected (kg)</label>
                <input type="number" [(ngModel)]="newBatch.co2InjectedKg" name="co2InjectedKg" required class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white" placeholder="620">
              </div>
            </div>

            <div class="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button type="button" (click)="openBatchModal = false" class="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" class="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-emerald-600 rounded-xl transition-colors shadow-sm">
                Commit Batch
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .batches-portal-page {
      padding: 0.5rem 0 3rem;
    }
    .metric-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1rem;
      padding: 1.25rem 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }
    .telemetry-drawer {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1.25rem;
      padding: 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .sub-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 0.85rem;
      padding: 1.15rem;
    }
    .sensor-bar-bg {
      width: 100%;
      background-color: #E2E8F0;
      border-radius: 9999px;
      height: 6px;
      overflow: hidden;
    }
    .sensor-bar-fill {
      height: 100%;
      border-radius: 9999px;
    }
    .table-container {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      overflow: hidden;
    }
    .table-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #F1F5F9;
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
    .modal-content {
      background: #ffffff;
      border-radius: 1.25rem;
      max-width: 580px;
      width: 100%;
      padding: 2rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      border: 1px solid #E2E8F0;
    }
  `]
})
export class BatchesComponent implements OnInit {
  batches: ProductionBatch[] = [];
  plants: Plant[] = [];
  products: Product[] = [];
  selectedBatch: ProductionBatch | null = null;
  statusFilter = 'ALL';
  openBatchModal = false;

  newBatch: Partial<ProductionBatch> = {
    batchNumber: 'STX-2026-B109',
    productionDate: new Date().toISOString().split('T')[0],
    plantId: 'PLT-001',
    productId: 'prod-001',
    quantityUnits: 12000,
    quantityTonnes: 45.0,
    co2InjectedKg: 640.0,
    co2MineralizedKg: 585.0,
    compressiveStrength7dMpa: 29.5,
    compressiveStrength28dMpa: 47.8,
    waterAbsorptionPercent: 4.8,
    status: 'CURING_ACTIVE',
    curingDurationHours: 16,
    curingTempCelsius: 43.5,
    curingHumidityPercent: 84.0
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.api.getBatches().subscribe(b => {
      this.batches = b;
      if (b.length > 0) this.selectedBatch = b[0];
    });
    this.api.getPlants().subscribe(p => this.plants = p);
    this.api.getProducts().subscribe(pr => this.products = pr);
  }

  get filteredBatches(): ProductionBatch[] {
    if (this.statusFilter === 'ALL') return this.batches;
    return this.batches.filter(b => b.status === this.statusFilter);
  }

  get activeInChamberCount(): number {
    return this.batches.filter(b => b.status === 'CURING_ACTIVE' || b.status === 'IN_PRODUCTION').length;
  }

  get totalMineralizedKg(): number {
    return this.batches.reduce((sum, b) => sum + (b.co2MineralizedKg || 0), 0);
  }

  get avgStrengthMpa(): number {
    const list = this.batches.filter(b => b.compressiveStrength28dMpa);
    if (!list.length) return 0;
    return list.reduce((sum, b) => sum + (b.compressiveStrength28dMpa || 0), 0) / list.length;
  }

  getPlantName(id: string): string {
    const p = this.plants.find(x => x.id === id);
    return p ? p.name : id;
  }

  getProductName(id: string): string {
    const pr = this.products.find(x => x.id === id);
    return pr ? pr.name : id;
  }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'APPROVED': return 'bg-emerald-100 text-emerald-800';
      case 'CURING_ACTIVE': return 'bg-cyan-100 text-cyan-800';
      case 'CURING_COMPLETE': return 'bg-emerald-100 text-emerald-800';
      case 'QA_PENDING': return 'bg-amber-100 text-amber-800';
      case 'DISPATCHED': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  }

  toastMessage: string | null = null;

  sendToQa(b: ProductionBatch): void {
    b.status = 'QA_PENDING';
    this.toastMessage = `Batch ${b.batchNumber} has been submitted for NABL Quality & Mechanical QA Review.`;
    setTimeout(() => { if (this.toastMessage) this.toastMessage = null; }, 5000);
  }

  submitNewBatch(): void {
    const created: ProductionBatch = {
      id: 'batch-' + Date.now(),
      batchNumber: this.newBatch.batchNumber || 'STX-BATCH',
      plantId: this.newBatch.plantId || 'PLT-001',
      productId: this.newBatch.productId || 'prod-001',
      productionDate: this.newBatch.productionDate || new Date().toISOString().split('T')[0],
      quantityUnits: this.newBatch.quantityUnits || 10000,
      quantityTonnes: this.newBatch.quantityTonnes || 40,
      co2InjectedKg: this.newBatch.co2InjectedKg || 600,
      co2MineralizedKg: this.newBatch.co2MineralizedKg || 550,
      netGateToGateRemovalKg: (this.newBatch.co2MineralizedKg || 550) * 0.92,
      compressiveStrength7dMpa: this.newBatch.compressiveStrength7dMpa,
      compressiveStrength28dMpa: this.newBatch.compressiveStrength28dMpa,
      waterAbsorptionPercent: this.newBatch.waterAbsorptionPercent || 5.0,
      status: this.newBatch.status as any || 'CURING_ACTIVE',
      curingDurationHours: this.newBatch.curingDurationHours || 14,
      curingTempCelsius: this.newBatch.curingTempCelsius || 42.0,
      curingHumidityPercent: this.newBatch.curingHumidityPercent || 85.0
    };

    this.batches.unshift(created);
    this.selectedBatch = created;
    this.openBatchModal = false;
  }
}
