import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { ProductPassport } from '../../core/models';

@Component({
  selector: 'app-trace-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="trace-admin-portal-page">
      <div class="page-header mb-8">
        <div>
          <span class="badge badge-accent mb-2">Digital Traceability</span>
          <h1 class="page-title text-3xl font-display">SthiraX Trace™ Passport Administration</h1>
          <p class="text-secondary text-sm">Issue, configure, and audit cryptographic Digital Product Passports (DPP) for customer compliance.</p>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Total Passports</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">{{ passports.length }}</div>
          <span class="text-xs text-muted">Issued to precast batches</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Publicly Scannable</span>
          <div class="text-2xl font-bold font-mono text-accent mt-1">{{ publishedCount }}</div>
          <span class="text-xs text-muted">Available via QR URL</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Verified Mineralized</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">{{ totalMineralized | number:'1.1-1' }} kg</div>
          <span class="text-xs text-muted">Audited with Coriolis logs</span>
        </div>
        <div class="card p-4 bg-surface border-subtle">
          <span class="text-xs text-secondary font-mono uppercase tracking-wider">Verification Standard</span>
          <div class="text-2xl font-bold font-mono text-primary mt-1">ISO 14064-2</div>
          <span class="text-xs text-muted">Gate-to-gate GHG protocol</span>
        </div>
      </div>

      <!-- Selected Passport Inspector Drawer -->
      <div *ngIf="selectedPassport" class="card p-6 bg-surface border-subtle mb-8 shadow-sm">
        <div class="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-subtle">
          <div>
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-display font-semibold text-primary">Passport #{{ selectedPassport.passportId }}</h2>
              <span class="badge" [ngClass]="selectedPassport.publiclyScannable ? 'badge-accent' : 'badge-secondary'">
                {{ selectedPassport.publiclyScannable ? 'PUBLIC / SCANNABLE' : 'INTERNAL DRAFT' }}
              </span>
            </div>
            <p class="text-xs text-secondary mt-1">
              Batch: <strong>{{ selectedPassport.batchId }}</strong> • Issued: {{ selectedPassport.issueDate }} • Plant: {{ selectedPassport.plantName }}
            </p>
          </div>
          <div class="flex gap-2">
            <a [href]="'/passports/' + selectedPassport.passportId" target="_blank" class="btn btn-outline text-xs">
              View Public Page
              <svg width="14" height="14" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-left: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
            <button class="btn btn-primary text-xs" (click)="togglePublic()">
              {{ selectedPassport.publiclyScannable ? 'Make Private' : 'Publish to Public' }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <!-- QR Code and Hash Seal -->
          <div class="p-4 bg-canvas rounded border border-subtle flex flex-col items-center justify-center text-center">
            <div class="w-32 h-32 bg-white p-2 rounded shadow-sm border border-subtle flex items-center justify-center mb-3">
              <div class="font-mono text-[10px] text-primary p-2 break-all border border-dashed border-subtle">
                [QR CODE]<br>
                {{ selectedPassport.passportId }}
              </div>
            </div>
            <span class="text-xs font-semibold text-primary">Scan to Verify Authenticity</span>
            <span class="text-[11px] font-mono text-muted mt-1 break-all">/passports/{{ selectedPassport.passportId }}</span>
            <div class="mt-4 text-[10px] text-muted text-left w-full border-t border-subtle pt-2">
              <span class="font-mono text-secondary">SHA-256 Hash Seal:</span>
              <p class="font-mono text-[9px] break-all text-primary mt-0.5">{{ selectedPassport.verificationHash }}</p>
            </div>
          </div>

          <!-- Product & Mineralization Claims -->
          <div class="p-4 bg-canvas rounded border border-subtle text-xs space-y-2.5">
            <h3 class="text-sm font-semibold font-display mb-2">Verified Claims & Metrics</h3>
            <div class="flex justify-between py-1 border-b border-subtle">
              <span class="text-secondary">Product Name:</span>
              <span class="font-medium text-primary">{{ selectedPassport.productName }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-subtle">
              <span class="text-secondary">Gross Mineralized:</span>
              <span class="font-mono font-bold text-accent">{{ selectedPassport.co2MineralizedKg }} kg</span>
            </div>
            <div class="flex justify-between py-1 border-b border-subtle">
              <span class="text-secondary">Gate-to-Gate Net Removal:</span>
              <span class="font-mono font-bold text-primary">{{ selectedPassport.netGateToGateRemovalKg }} kg</span>
            </div>
            <div class="flex justify-between py-1 border-b border-subtle">
              <span class="text-secondary">Net Impact / Tonne:</span>
              <span class="font-mono text-primary">{{ ((selectedPassport.netGateToGateRemovalKg || 0) / 37.5) | number:'1.1-1' }} kg CO₂e/t</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-secondary">Testing Lab:</span>
              <span class="font-medium text-primary">{{ selectedPassport.testingLaboratory }}</span>
            </div>
          </div>

          <!-- Privacy & Field Disclosure Config -->
          <div class="p-4 bg-canvas rounded border border-subtle text-xs space-y-3">
            <h3 class="text-sm font-semibold font-display mb-2">Public Disclosure Controls</h3>
            <p class="text-muted leading-relaxed">
              Control what information is visible to external buyers and green building auditors scanning the physical paletted blocks.
            </p>
            <div class="space-y-2 pt-1">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked disabled class="rounded text-accent">
                <span>Gross mineralized CO₂ & Net gate-to-gate removal (Required)</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked class="rounded text-accent">
                <span>NABL 28-day Compressive Strength Test Report</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked class="rounded text-accent">
                <span>CO₂ Supplier source facility and purity grade</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" [checked]="false" class="rounded text-accent">
                <span>Proprietary chemical additive mix ratios (Trade secret - hidden)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Passport Registry Table -->
      <div class="card overflow-hidden bg-surface border-subtle">
        <div class="p-4 border-b border-subtle flex justify-between items-center">
          <h2 class="text-base font-display font-semibold text-primary">Issued Product Passports</h2>
          <span class="text-xs text-muted">Showing {{ passports.length }} passports</span>
        </div>

        <div class="overflow-x-auto">
          <table class="table w-full text-xs">
            <thead>
              <tr class="text-secondary border-b border-subtle bg-canvas/50">
                <th class="py-3 px-4 text-left font-mono">Passport ID</th>
                <th class="py-3 px-4 text-left font-mono">Batch Number</th>
                <th class="py-3 px-4 text-left">Product</th>
                <th class="py-3 px-4 text-left">Plant</th>
                <th class="py-3 px-4 text-right font-mono">Mineralized CO₂</th>
                <th class="py-3 px-4 text-right font-mono">Net Gate-to-Gate</th>
                <th class="py-3 px-4 text-center">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-subtle font-mono">
              <tr *ngFor="let p of passports" class="hover:bg-canvas/30 transition-colors cursor-pointer" (click)="selectedPassport = p">
                <td class="py-3 px-4 font-bold text-accent">{{ p.passportId }}</td>
                <td class="py-3 px-4">{{ p.batchId }}</td>
                <td class="py-3 px-4 font-sans">{{ p.productName }}</td>
                <td class="py-3 px-4 font-sans">{{ p.plantName }}</td>
                <td class="py-3 px-4 text-right font-bold text-accent">{{ p.co2MineralizedKg }} kg</td>
                <td class="py-3 px-4 text-right text-primary">{{ p.netGateToGateRemovalKg }} kg</td>
                <td class="py-3 px-4 text-center font-sans">
                  <span class="badge" [ngClass]="p.publiclyScannable ? 'badge-accent' : 'badge-secondary'">
                    {{ p.publiclyScannable ? 'Published' : 'Draft' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right" (click)="$event.stopPropagation()">
                  <button class="btn btn-outline text-[11px] py-1 px-2.5 mr-2" (click)="selectedPassport = p">Manage</button>
                  <a [href]="'/passports/' + p.passportId" target="_blank" class="btn btn-secondary text-[11px] py-1 px-2">Public View</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class TraceAdminComponent implements OnInit {
  passports: ProductPassport[] = [];
  selectedPassport: ProductPassport | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.api.getPassports().subscribe((p: ProductPassport[]) => {
      this.passports = p;
      if (p.length > 0) this.selectedPassport = p[0];
    });
  }

  get publishedCount(): number {
    return this.passports.filter(p => p.publiclyScannable).length;
  }

  get totalMineralized(): number {
    return this.passports.reduce((sum, p) => sum + (p.co2MineralizedKg || 0), 0);
  }

  togglePublic(): void {
    if (!this.selectedPassport) return;
    this.selectedPassport.publiclyScannable = !this.selectedPassport.publiclyScannable;
    alert(`Passport ${this.selectedPassport.passportId} public status set to: ${this.selectedPassport.publiclyScannable ? 'PUBLIC' : 'PRIVATE'}`);
  }
}
