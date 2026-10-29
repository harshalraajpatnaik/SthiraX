import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trace',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="page-trace bg-slate-50 min-h-screen">
      
      <!-- High-Impact Hero Header -->
      <header class="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div class="container-wide">
          <div class="max-w-4xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              SthiraX Digital Product Passport (DPP) Registry
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Cryptographic Batch Traceability & Sensor Telemetry
            </h1>
            <p class="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed max-w-3xl">
              Every production curing pallet carries an immutable Digital Product Passport. Connecting Endress+Hauser Coriolis mass flow meters, batch weigh tickets, and NABL crush strength certificates into tamper-evident public proofs.
            </p>
          </div>
        </div>
      </header>

      <main class="container-wide py-10 lg:py-14 space-y-12">
        
        <!-- Live Featured Passport Hero Banner -->
        <div class="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
          <div class="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div class="space-y-3 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                LIVE PRODUCTION RECORD &bull; QR CODE ACTIVE
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Inspect Batch #STX-2026-B108 Public Passport
              </h2>
              <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                Explore a live certified batch: 12,000 M-40 heavy-duty paving blocks produced at Hosur Precast Plant #1, sequestering 580.4 kg CO₂ under 1.25 bar curing pressure with 48.2 MPa tested strength.
              </p>
              <div class="flex flex-wrap gap-3 pt-2 text-xs font-mono text-emerald-400">
                <span class="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">SHA-256: 7f9a2b4c...</span>
                <span class="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">BIS: IS 15658:2006</span>
                <span class="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">Lab: CivilAid NABL</span>
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
              <a routerLink="/passports/pass-7f9a2b4c" class="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><path d="M10 10l4 4"></path></svg>
                Open Digital Passport
              </a>
            </div>
          </div>
        </div>

        <!-- Direct Instant Verification Search Bar -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div class="max-w-3xl">
            <span class="text-xs font-mono font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mb-2">Instant Audit Console</span>
            <h3 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Direct Batch Verification & Passport Lookup
            </h3>
            <p class="text-slate-600 text-sm mt-1 mb-5">
              Enter any QR reference or passport ID found on physical pallet tags or delivery bills of lading:
            </p>

            <div class="flex flex-col sm:flex-row items-stretch gap-3">
              <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input 
                  type="text" 
                  [(ngModel)]="searchPassportId" 
                  placeholder="e.g. pass-7f9a2b4c or STX-2026-B108" 
                  class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  (keyup.enter)="verifyPassport()">
              </div>
              <button 
                (click)="verifyPassport()" 
                class="px-6 py-3 bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
                <span>Verify Record</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>

            <div class="flex items-center gap-2 mt-4 text-xs text-slate-500 flex-wrap">
              <span class="font-medium">Quick Try Samples:</span>
              <button (click)="searchPassportId = 'pass-7f9a2b4c'; verifyPassport()" class="font-mono bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-2.5 py-1 rounded border border-slate-200 transition-colors">pass-7f9a2b4c (M40 Pavers)</button>
              <button (click)="searchPassportId = 'pass-3d8e1a90'; verifyPassport()" class="font-mono bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-2.5 py-1 rounded border border-slate-200 transition-colors">pass-3d8e1a90 (Kerbstones)</button>
              <button (click)="searchPassportId = 'pass-9c4b7e21'; verifyPassport()" class="font-mono bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-2.5 py-1 rounded border border-slate-200 transition-colors">pass-9c4b7e21 (Solid Blocks)</button>
            </div>
          </div>
        </div>

        <!-- 9 Pillars Verification Architecture Grid -->
        <div class="space-y-6">
          <div class="max-w-3xl">
            <span class="text-xs font-mono font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mb-2">Trust & Governance</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Nine Layers of Batch Verifiability
            </h2>
            <p class="text-slate-600 text-sm sm:text-base mt-1">
              Engineered to eliminate greenwashing and comply with ISO 14064-2 greenhouse gas project quantification:
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <!-- Pillar 1 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mb-3">PILLAR 01</span>
                <h3 class="text-base font-bold text-slate-900 mb-2">Immutable Pallet UUID</h3>
                <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Every curing pallet receives a permanent alphanumeric serial number binding raw material mix tickets, plant batching telemetry, shift operator, and date.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                Data Point: QR Reference Token
              </div>
            </div>

            <!-- Pillar 2 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mb-3">PILLAR 02</span>
                <h3 class="text-base font-bold text-slate-900 mb-2">Secondary Binder Ratios</h3>
                <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Feedstock tickets log exact mass percentages of GGBS slag, thermal power fly ash, and processed C&D fines, verifying low virgin clinker content.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                Data Point: MoEFCC C&D Recycled Content
              </div>
            </div>

            <!-- Pillar 3 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mb-3">PILLAR 03</span>
                <h3 class="text-base font-bold text-slate-900 mb-2">Coriolis Mass-Flow Logs</h3>
                <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Direct telemetry from calibrated Endress+Hauser Promass Coriolis meters records exact kilograms of gaseous CO₂ injected into the sealed chamber.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                Data Point: Coriolis Differential kg CO₂
              </div>
            </div>

            <!-- Pillar 4 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mb-3">PILLAR 04</span>
                <h3 class="text-base font-bold text-slate-900 mb-2">Chamber Temperature & Pressure</h3>
                <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Time-series sensor telemetry logging internal chamber pressure (1.2–1.4 bar), temperature (42–46°C), and humidity (80% RH) guarantees complete carbonation.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                Data Point: Pressure & Kinetics Curve
              </div>
            </div>

            <!-- Pillar 5 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mb-3">PILLAR 05</span>
                <h3 class="text-base font-bold text-slate-900 mb-2">Dual Quality Governance</h3>
                <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Mandatory sign-off requiring certified Quality Reviewers to inspect lab reports and sensor logs before any batch passport status can transition to Published.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                Data Point: Role-Based Audit Signoff
              </div>
            </div>

            <!-- Pillar 6 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mb-3">PILLAR 06</span>
                <h3 class="text-base font-bold text-slate-900 mb-2">NABL Laboratory Break Tests</h3>
                <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Third-party crush test certificates from accredited civil engineering laboratories validating 28-day compressive strength under IS 15658 / IS 2185.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                Data Point: NABL Certificate Reference
              </div>
            </div>

            <!-- Pillar 7 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mb-3">PILLAR 07</span>
                <h3 class="text-base font-bold text-slate-900 mb-2">Transparent Carbon Accounting</h3>
                <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Rigorous separation of injected CO₂, vent losses, net gate-to-gate sequestered mass, and avoided supply chain emissions to prevent double counting.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                Data Point: Net Removal Ledger
              </div>
            </div>

            <!-- Pillar 8 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mb-3">PILLAR 08</span>
                <h3 class="text-base font-bold text-slate-900 mb-2">Commercial Privacy Protection</h3>
                <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Strict redaction ensuring public QR scans verify technical, environmental, and strength parameters while protecting private plant pricing and contracts.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                Data Point: Zero-Knowledge Public View
              </div>
            </div>

            <!-- Pillar 9 -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mb-3">PILLAR 09</span>
                <h3 class="text-base font-bold text-slate-900 mb-2">Site-Ready Mobile QR Scan</h3>
                <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Designed for instantaneous browser verification on iOS and Android smartphones without downloading proprietary apps or registering accounts.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                Data Point: Smartphone Camera Compatible
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class TraceComponent {
  searchPassportId = 'pass-7f9a2b4c';

  constructor(private router: Router) {}

  verifyPassport(): void {
    const id = this.searchPassportId.trim() || 'pass-7f9a2b4c';
    this.router.navigate(['/passports', id]);
  }
}
