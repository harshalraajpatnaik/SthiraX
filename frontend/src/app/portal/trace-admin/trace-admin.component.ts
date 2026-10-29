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
    <div class="trace-admin-portal-page space-y-8">
      
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            Digital Traceability Administration
          </span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            SthiraX Trace™ Passport Registry
          </h1>
          <p class="text-slate-500 text-sm mt-1 max-w-2xl">
            Configure public disclosure boundaries, audit SHA-256 integrity hashes, and manage customer QR passport access.
          </p>
        </div>
      </div>

      <!-- Quick KPI Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Total Passports</span>
          <div class="text-3xl font-black font-mono text-slate-900 mt-1.5">{{ passports.length }}</div>
          <span class="text-xs text-slate-500 mt-1 block">Issued to verified batches</span>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Publicly Scannable</span>
          <div class="text-3xl font-black font-mono text-emerald-700 mt-1.5">{{ publishedCount }}</div>
          <span class="text-xs text-slate-500 mt-1 block">Active across jobsite QR codes</span>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Audited Mineralized</span>
          <div class="text-3xl font-black font-mono text-emerald-700 mt-1.5">{{ totalMineralized | number:'1.1-1' }} kg</div>
          <span class="text-xs text-slate-500 mt-1 block">Coriolis mass flow logged</span>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Audit Standard</span>
          <div class="text-3xl font-black font-mono text-slate-900 mt-1.5">ISO 14064-2</div>
          <span class="text-xs text-slate-500 mt-1 block">Gate-to-gate GHG protocol</span>
        </div>
      </div>

      <!-- Selected Passport Inspector Drawer -->
      <div *ngIf="selectedPassport" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-bold text-slate-900">Passport #{{ selectedPassport.passportId }}</h2>
              <span class="px-2.5 py-1 rounded-full text-xs font-mono font-bold" 
                    [ngClass]="selectedPassport.publiclyScannable ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'">
                {{ selectedPassport.publiclyScannable ? 'PUBLIC / SCANNABLE' : 'INTERNAL DRAFT' }}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Batch: <strong class="text-slate-800 font-mono">{{ selectedPassport.batchId }}</strong> &bull; 
              Issued: <span class="font-mono">{{ selectedPassport.issueDate }}</span> &bull; 
              Facility: <strong class="text-slate-800">{{ selectedPassport.plantName }}</strong>
            </p>
          </div>

          <div class="flex items-center gap-2.5">
            <a [href]="'/passports/' + selectedPassport.passportId" target="_blank" class="px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors inline-flex items-center gap-1.5">
              <span>View Public Certificate</span>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
            <button class="px-4 py-2 text-xs font-bold text-white rounded-xl transition-colors shadow-sm"
                    [ngClass]="selectedPassport.publiclyScannable ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'"
                    (click)="togglePublic()">
              {{ selectedPassport.publiclyScannable ? 'Revoke to Private' : 'Publish to QR Public' }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- QR Code and SHA-256 Card -->
          <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
            <div class="w-28 h-28 bg-white p-2 rounded-xl shadow-inner border border-slate-200 flex items-center justify-center mb-3">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="text-slate-900"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><line x1="10" y1="3" x2="10" y2="10"></line><line x1="3" y1="10" x2="10" y2="10"></line><line x1="14" y1="10" x2="21" y2="10"></line><line x1="10" y1="14" x2="10" y2="21"></line></svg>
            </div>
            <span class="text-xs font-bold text-slate-800">Tamper-Evident Pallet QR</span>
            <span class="text-[11px] font-mono text-slate-500 mt-0.5">/passports/{{ selectedPassport.passportId }}</span>
            <div class="mt-4 pt-3 border-t border-slate-200 w-full text-left">
              <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">Cryptographic Hash:</span>
              <p class="font-mono text-[10px] text-emerald-800 break-all mt-1 bg-white p-2 rounded border border-slate-200">
                {{ selectedPassport.verificationHash }}
              </p>
            </div>
          </div>

          <!-- Verified Claims & Metrics -->
          <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Audited Claims & Metrics
            </h3>
            <div class="space-y-2">
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Product Name:</span>
                <span class="font-semibold text-slate-800">{{ selectedPassport.productName }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Gross Mineralized:</span>
                <span class="font-mono font-bold text-emerald-700">{{ selectedPassport.co2MineralizedKg }} kg</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Gate-to-Gate Net Removal:</span>
                <span class="font-mono font-bold text-slate-800">{{ selectedPassport.netGateToGateRemovalKg }} kg</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="text-slate-500">Embodied Carbon Reduction:</span>
                <span class="font-mono text-emerald-700 font-semibold">{{ ((selectedPassport.netGateToGateRemovalKg || 0) / 37.5) | number:'1.1-1' }} kg CO₂e/t</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-slate-500">Testing Laboratory:</span>
                <span class="font-semibold text-slate-800">{{ selectedPassport.testingLaboratory }}</span>
              </div>
            </div>
          </div>

          <!-- Public Disclosure Rules -->
          <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Public Disclosure Boundary
            </h3>
            <p class="text-slate-500 leading-relaxed">
              Enforce zero-knowledge disclosure to verify technical claims while protecting commercial tariffs:
            </p>
            <div class="space-y-2 pt-1 text-slate-700">
              <label class="flex items-center gap-2">
                <input type="checkbox" checked disabled class="rounded text-emerald-600">
                <span>Coriolis Mineralized Mass Balance (Required)</span>
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" checked class="rounded text-emerald-600">
                <span>NABL 28-day Crush Break Test Certificate</span>
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" checked class="rounded text-emerald-600">
                <span>Biogenic CO₂ Source Certification</span>
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" [checked]="false" class="rounded text-emerald-600">
                <span class="text-slate-400">Chemical Admixture Formulation (Redacted)</span>
              </label>
            </div>
          </div>

        </div>

      </div>

      <!-- Passports Registry Table -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-slate-900">Digital Product Passports Registry</h2>
            <p class="text-xs text-slate-500 mt-0.5">Click any passport to inspect disclosure permissions and QR endpoints.</p>
          </div>
          <span class="text-xs font-mono font-medium text-slate-400">{{ passports.length }} Issued DPPs</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono tracking-wider text-[11px]">
                <th class="py-3.5 px-5">Passport ID</th>
                <th class="py-3.5 px-5">Batch ID</th>
                <th class="py-3.5 px-5">Product Name</th>
                <th class="py-3.5 px-5">Plant Facility</th>
                <th class="py-3.5 px-5 text-right">Mineralized CO₂</th>
                <th class="py-3.5 px-5 text-right">Net Removal</th>
                <th class="py-3.5 px-5 text-center">Status</th>
                <th class="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              <tr *ngFor="let p of passports" 
                  class="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  [class.bg-emerald-50]="selectedPassport?.passportId === p.passportId"
                  (click)="selectedPassport = p">
                <td class="py-4 px-5 font-mono font-bold text-emerald-800">{{ p.passportId }}</td>
                <td class="py-4 px-5 font-mono font-medium text-slate-900">{{ p.batchId }}</td>
                <td class="py-4 px-5 font-medium text-slate-800">{{ p.productName }}</td>
                <td class="py-4 px-5 text-slate-600">{{ p.plantName }}</td>
                <td class="py-4 px-5 text-right font-mono font-bold text-emerald-700">{{ p.co2MineralizedKg }} kg</td>
                <td class="py-4 px-5 text-right font-mono text-slate-800">{{ p.netGateToGateRemovalKg }} kg</td>
                <td class="py-4 px-5 text-center">
                  <span class="px-2.5 py-1 rounded-full font-mono font-bold text-[11px]"
                        [ngClass]="p.publiclyScannable ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'">
                    {{ p.publiclyScannable ? 'Published' : 'Draft' }}
                  </span>
                </td>
                <td class="py-4 px-5 text-right space-x-2" (click)="$event.stopPropagation()">
                  <button class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors" (click)="selectedPassport = p">
                    Manage
                  </button>
                  <a [href]="'/passports/' + p.passportId" target="_blank" class="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium text-xs transition-colors inline-block">
                    Public View &rarr;
                  </a>
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
