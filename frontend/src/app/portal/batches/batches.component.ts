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
    <div class="batches-portal-page">
      <div class="page-header mb-8">
        <div>
          <span class="badge badge-accent mb-2">Production Operations</span>
          <h1 class="page-title text-3xl font-display">Production Batches & Curing Telemetry</h1>
          <p class="text-secondary text-sm">Monitor mineralization chamber runs, Coriolis mass-flow CO₂ uptake, and curing logs.</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary" (click)="openBatchModal = true">
            <svg width="16" height="16" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 6px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Record New Batch
          </button>
        </div>
      </div>

      <!-- Metrics Row -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Total Batches Tracked</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">{{ batches.length }}</div>
          <span class="text-xs text-muted">Across 3 regional plants</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Active in Chamber</span>
          <div class="text-2xl font-bold font-mono text-accent mt-1">{{ activeInChamberCount }}</div>
          <span class="text-xs text-muted">Coriolis telemetry streaming</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Gross CO₂ Mineralized</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">{{ totalMineralizedKg | number:'1.1-1' }} kg</div>
          <span class="text-xs text-muted">Permanently fixed as CaCO₃</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Avg 28d Strength</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">{{ avgStrengthMpa | number:'1.1-1' }} MPa</div>
          <span class="text-xs text-muted">vs 35.0 MPa IS 15658 spec</span>
        </div>
      </div>

      <!-- Batch Detail / Telemetry Drawer when selected -->
      <div *ngIf="selectedBatch" class="card p-6 bg-surface border-subtle mb-8 shadow-sm">
        <div class="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-subtle">
          <div>
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-display font-semibold text-primary">Batch #{{ selectedBatch.batchNumber }}</h2>
              <span class="badge" [ngClass]="getStatusBadge(selectedBatch.status)">{{ selectedBatch.status }}</span>
            </div>
            <p class="text-xs text-secondary mt-1">
              Plant ID: <strong>{{ selectedBatch.plantId }}</strong> • Product: <strong>{{ selectedBatch.productId }}</strong> • Cured: {{ selectedBatch.productionDate }}
            </p>
          </div>
          <div class="flex gap-2">
            <button class="btn btn-outline text-xs" (click)="selectedBatch = null">Close Telemetry</button>
            <button *ngIf="selectedBatch.status === 'CURING_COMPLETE'" class="btn btn-accent text-xs" (click)="sendToQa(selectedBatch)">Submit for QA Review</button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <!-- Mass balance card -->
          <div class="p-4 bg-canvas rounded border border-subtle">
            <h3 class="text-sm font-semibold font-display mb-3">CO₂ Mass Balance & Uptake</h3>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between py-1 border-b border-subtle">
                <span class="text-secondary">Quantity Produced:</span>
                <span class="font-mono font-medium">{{ selectedBatch.quantityUnits | number }} units ({{ selectedBatch.quantityTonnes }} t)</span>
              </div>
              <div class="flex justify-between py-1 border-b border-subtle">
                <span class="text-secondary">Coriolis Injected CO₂:</span>
                <span class="font-mono font-medium">{{ selectedBatch.co2InjectedKg }} kg</span>
              </div>
              <div class="flex justify-between py-1 border-b border-subtle">
                <span class="text-secondary">Chamber Vent Loss:</span>
                <span class="font-mono font-medium">{{ (selectedBatch.co2InjectedKg - selectedBatch.co2MineralizedKg) | number:'1.1-2' }} kg</span>
              </div>
              <div class="flex justify-between py-1 border-b border-subtle">
                <span class="text-secondary">Gross Mineralized:</span>
                <span class="font-mono font-bold text-accent">{{ selectedBatch.co2MineralizedKg }} kg</span>
              </div>
              <div class="flex justify-between py-1 border-b border-subtle">
                <span class="text-secondary">Gate-to-Gate Net Removal:</span>
                <span class="font-mono font-bold text-primary">{{ selectedBatch.netGateToGateRemovalKg }} kg</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-secondary">Mineralization Efficiency:</span>
                <span class="font-mono font-bold text-accent">{{ (selectedBatch.co2MineralizedKg / selectedBatch.co2InjectedKg * 100) | number:'1.1-1' }}%</span>
              </div>
            </div>
          </div>

          <!-- Environmental Chamber Logs -->
          <div class="p-4 bg-canvas rounded border border-subtle">
            <h3 class="text-sm font-semibold font-display mb-3">Chamber Conditions (Sensors)</h3>
            <div class="space-y-3 text-xs">
              <div>
                <div class="flex justify-between text-muted mb-1">
                  <span>Chamber Temp</span>
                  <span class="font-mono font-bold text-primary">{{ selectedBatch.curingTempCelsius || 41.5 }} °C</span>
                </div>
                <div class="w-full bg-surface rounded-full h-1.5"><div class="bg-accent h-1.5 rounded-full" style="width: 70%"></div></div>
              </div>
              <div>
                <div class="flex justify-between text-muted mb-1">
                  <span>Relative Humidity</span>
                  <span class="font-mono font-bold text-primary">{{ selectedBatch.curingHumidityPercent || 82.0 }} %</span>
                </div>
                <div class="w-full bg-surface rounded-full h-1.5"><div class="bg-primary h-1.5 rounded-full" style="width: 82%"></div></div>
              </div>
              <div>
                <div class="flex justify-between text-muted mb-1">
                  <span>Cycle Duration</span>
                  <span class="font-mono font-bold text-primary">{{ selectedBatch.curingDurationHours || 14 }} hrs</span>
                </div>
                <div class="w-full bg-surface rounded-full h-1.5"><div class="bg-accent h-1.5 rounded-full" style="width: 85%"></div></div>
              </div>
              <div class="pt-2 text-[11px] text-muted italic">
                * Micro-droplet misting active. ISO 14064-2 verified industrial mass flow meter model Emerson CMF025.
              </div>
            </div>
          </div>

          <!-- Quality & Laboratory Strength -->
          <div class="p-4 bg-canvas rounded border border-subtle">
            <h3 class="text-sm font-semibold font-display mb-3">Mechanical & QA Summary</h3>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between py-1 border-b border-subtle">
                <span class="text-secondary">7-day Compressive:</span>
                <span class="font-mono font-medium">{{ selectedBatch.compressiveStrength7dMpa || 28.4 }} MPa</span>
              </div>
              <div class="flex justify-between py-1 border-b border-subtle">
                <span class="text-secondary">28-day Compressive:</span>
                <span class="font-mono font-bold text-primary">{{ selectedBatch.compressiveStrength28dMpa }} MPa</span>
              </div>
              <div class="flex justify-between py-1 border-b border-subtle">
                <span class="text-secondary">Water Absorption:</span>
                <span class="font-mono font-medium">{{ selectedBatch.waterAbsorptionPercent }} % (spec ≤ 6.0%)</span>
              </div>
              <div class="flex justify-between py-1 border-b border-subtle">
                <span class="text-secondary">Abrasion Resistance:</span>
                <span class="font-mono font-medium">1.8 mm (spec ≤ 2.0 mm)</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-secondary">Digital Passport:</span>
                <span *ngIf="selectedBatch.passportId" class="font-mono text-accent underline cursor-pointer">{{ selectedBatch.passportId }}</span>
                <span *ngIf="!selectedBatch.passportId" class="text-muted">Draft (Pending QA)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Batches Data Table -->
      <div class="card overflow-hidden bg-surface border-subtle">
        <div class="p-4 border-b border-subtle flex flex-wrap justify-between items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono uppercase text-secondary">Filter Status:</span>
            <select [(ngModel)]="statusFilter" class="input py-1 text-xs w-44">
              <option value="ALL">All Statuses</option>
              <option value="IN_PRODUCTION">IN_PRODUCTION</option>
              <option value="CURING_ACTIVE">CURING_ACTIVE</option>
              <option value="CURING_COMPLETE">CURING_COMPLETE</option>
              <option value="APPROVED">APPROVED</option>
              <option value="DISPATCHED">DISPATCHED</option>
            </select>
          </div>
          <span class="text-xs text-muted">Showing {{ filteredBatches.length }} of {{ batches.length }} batches</span>
        </div>

        <div class="overflow-x-auto">
          <table class="table w-full text-xs">
            <thead>
              <tr class="text-secondary border-b border-subtle bg-canvas/50">
                <th class="py-3 px-4 text-left font-mono">Batch Number</th>
                <th class="py-3 px-4 text-left">Plant</th>
                <th class="py-3 px-4 text-left">Product</th>
                <th class="py-3 px-4 text-right font-mono">Quantity</th>
                <th class="py-3 px-4 text-right font-mono">CO₂ Injected</th>
                <th class="py-3 px-4 text-right font-mono">Mineralized</th>
                <th class="py-3 px-4 text-right font-mono">28d Strength</th>
                <th class="py-3 px-4 text-center">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-subtle font-mono">
              <tr *ngFor="let b of filteredBatches" class="hover:bg-canvas/30 transition-colors cursor-pointer" (click)="selectedBatch = b">
                <td class="py-3 px-4 font-bold text-primary">{{ b.batchNumber }}</td>
                <td class="py-3 px-4 font-sans">{{ getPlantName(b.plantId) }}</td>
                <td class="py-3 px-4 font-sans">{{ getProductName(b.productId) }}</td>
                <td class="py-3 px-4 text-right">{{ b.quantityUnits | number }} u ({{ b.quantityTonnes }} t)</td>
                <td class="py-3 px-4 text-right">{{ b.co2InjectedKg }} kg</td>
                <td class="py-3 px-4 text-right font-bold text-accent">{{ b.co2MineralizedKg }} kg</td>
                <td class="py-3 px-4 text-right">{{ b.compressiveStrength28dMpa ? b.compressiveStrength28dMpa + ' MPa' : 'Pending' }}</td>
                <td class="py-3 px-4 text-center font-sans">
                  <span class="badge" [ngClass]="getStatusBadge(b.status)">{{ b.status }}</span>
                </td>
                <td class="py-3 px-4 text-right" (click)="$event.stopPropagation()">
                  <button class="btn btn-outline text-[11px] py-1 px-2.5" (click)="selectedBatch = b">Telemetry</button>
                </td>
              </tr>
              <tr *ngIf="filteredBatches.length === 0">
                <td colspan="9" class="py-8 text-center text-secondary font-sans">No production batches found for selected filter.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- New Batch Modal -->
      <div *ngIf="openBatchModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="card bg-surface max-w-xl w-full p-6 shadow-xl border border-subtle">
          <div class="flex justify-between items-center pb-3 border-b border-subtle mb-4">
            <h3 class="text-lg font-display font-semibold text-primary">Record New Production Batch</h3>
            <button class="text-secondary hover:text-primary text-xl" (click)="openBatchModal = false">&times;</button>
          </div>
          <form (ngSubmit)="submitNewBatch()" class="space-y-4 text-xs font-sans">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-medium mb-1">Batch Number</label>
                <input type="text" [(ngModel)]="newBatch.batchNumber" name="batchNumber" required class="input w-full" placeholder="STX-2026-B109">
              </div>
              <div>
                <label class="block font-medium mb-1">Production Date</label>
                <input type="date" [(ngModel)]="newBatch.productionDate" name="productionDate" required class="input w-full">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-medium mb-1">Manufacturing Plant</label>
                <select [(ngModel)]="newBatch.plantId" name="plantId" required class="input w-full">
                  <option *ngFor="let p of plants" [value]="p.id">{{ p.name }} ({{ p.location }})</option>
                </select>
              </div>
              <div>
                <label class="block font-medium mb-1">Product Spec</label>
                <select [(ngModel)]="newBatch.productId" name="productId" required class="input w-full">
                  <option *ngFor="let pr of products" [value]="pr.id">{{ pr.name }}</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block font-medium mb-1">Quantity (Units)</label>
                <input type="number" [(ngModel)]="newBatch.quantityUnits" name="quantityUnits" required class="input w-full" placeholder="10000">
              </div>
              <div>
                <label class="block font-medium mb-1">Weight (Tonnes)</label>
                <input type="number" [(ngModel)]="newBatch.quantityTonnes" name="quantityTonnes" required class="input w-full" placeholder="42.5">
              </div>
              <div>
                <label class="block font-medium mb-1">Injected CO₂ (kg)</label>
                <input type="number" [(ngModel)]="newBatch.co2InjectedKg" name="co2InjectedKg" required class="input w-full" placeholder="620">
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block font-medium mb-1">Mineralized CO₂ (kg)</label>
                <input type="number" [(ngModel)]="newBatch.co2MineralizedKg" name="co2MineralizedKg" required class="input w-full" placeholder="572">
              </div>
              <div>
                <label class="block font-medium mb-1">Chamber Temp (°C)</label>
                <input type="number" [(ngModel)]="newBatch.curingTempCelsius" name="curingTempCelsius" class="input w-full" placeholder="42.0">
              </div>
              <div>
                <label class="block font-medium mb-1">RH (%)</label>
                <input type="number" [(ngModel)]="newBatch.curingHumidityPercent" name="curingHumidityPercent" class="input w-full" placeholder="85.0">
              </div>
            </div>

            <div class="flex justify-end gap-3 pt-4 border-t border-subtle">
              <button type="button" class="btn btn-outline" (click)="openBatchModal = false">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Batch</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
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
    quantityTonnes: 43.2,
    co2InjectedKg: 640.0,
    co2MineralizedKg: 588.0,
    netGateToGateRemovalKg: 541.2,
    compressiveStrength7dMpa: 29.1,
    compressiveStrength28dMpa: 43.4,
    waterAbsorptionPercent: 4.8,
    status: 'CURING_ACTIVE',
    curingDurationHours: 14,
    curingTempCelsius: 42.0,
    curingHumidityPercent: 85.0
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
      case 'APPROVED': return 'badge-accent';
      case 'CURING_ACTIVE': return 'badge-secondary';
      case 'CURING_COMPLETE': return 'badge-accent';
      case 'QA_PENDING': return 'badge-warning';
      case 'DISPATCHED': return 'badge-primary';
      default: return 'badge-secondary';
    }
  }

  sendToQa(b: ProductionBatch): void {
    b.status = 'QA_PENDING';
    alert(`Batch ${b.batchNumber} has been submitted for NABL Quality & Mechanical QA Review.`);
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
