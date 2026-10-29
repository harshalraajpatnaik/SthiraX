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
        <div class="passport-hero-banner relative overflow-hidden">
          <div class="hero-glow-blob pointer-events-none"></div>
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <!-- Left Info Column -->
            <div class="lg:col-span-7 space-y-4">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE PRODUCTION RECORD &bull; TAMPER-SEALED
              </div>
              
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Inspect Batch #STX-2026-B108 Public Passport
              </h2>
              
              <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Explore an authenticated, commercial batch: 12,000 M-40 heavy-duty paving blocks cured at Hosur Precast Plant #1. Sequestering 580.4 kg CO₂ under 1.25 bar curing pressure, achieving 48.2 MPa 28-day tested strength with zero structural compromise.
              </p>

              <!-- Key Specification Chips -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs font-mono">
                <div class="hero-chip">
                  <span class="text-[10px] text-slate-400 uppercase tracking-wider block">SHA-256 Hash</span>
                  <span class="text-emerald-400 font-bold truncate block">7f9a2b4c...</span>
                </div>
                <div class="hero-chip">
                  <span class="text-[10px] text-slate-400 uppercase tracking-wider block">BIS Code</span>
                  <span class="text-white font-bold block">IS 15658:2006</span>
                </div>
                <div class="hero-chip">
                  <span class="text-[10px] text-slate-400 uppercase tracking-wider block">Test Lab</span>
                  <span class="text-white font-bold block">CivilAid NABL</span>
                </div>
                <div class="hero-chip">
                  <span class="text-[10px] text-slate-400 uppercase tracking-wider block">Embodied Carbon</span>
                  <span class="text-emerald-400 font-bold block">-42% Net</span>
                </div>
              </div>
            </div>
            
            <!-- Right Mockup / Live DPP Preview Card -->
            <div class="lg:col-span-5">
              <div class="passport-preview-card">
                <div class="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span class="text-xs font-mono font-bold text-slate-300 tracking-wider">DIGITAL PRODUCT PASSPORT</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    VERIFIED & SEALED
                  </span>
                </div>

                <div class="flex items-center gap-4 mb-4">
                  <!-- Stylized QR Code Graphic -->
                  <div class="passport-qr-box shrink-0">
                    <svg width="68" height="68" viewBox="0 0 64 64" fill="none">
                      <!-- Corner Target Squares -->
                      <rect x="4" y="4" width="18" height="18" rx="3" stroke="#34D399" stroke-width="2.5" fill="none"/>
                      <rect x="8" y="8" width="10" height="10" rx="1.5" fill="#34D399"/>
                      <rect x="42" y="4" width="18" height="18" rx="3" stroke="#34D399" stroke-width="2.5" fill="none"/>
                      <rect x="46" y="8" width="10" height="10" rx="1.5" fill="#34D399"/>
                      <rect x="4" y="42" width="18" height="18" rx="3" stroke="#34D399" stroke-width="2.5" fill="none"/>
                      <rect x="8" y="46" width="10" height="10" rx="1.5" fill="#34D399"/>
                      <!-- Data Matrix Pixels -->
                      <rect x="28" y="6" width="4" height="4" fill="#38BDF8"/>
                      <rect x="34" y="10" width="4" height="4" fill="#F8FAFC"/>
                      <rect x="26" y="16" width="4" height="4" fill="#34D399"/>
                      <rect x="12" y="28" width="4" height="4" fill="#38BDF8"/>
                      <rect x="18" y="34" width="4" height="4" fill="#F8FAFC"/>
                      <rect x="28" y="28" width="8" height="8" rx="2" fill="#10B981"/>
                      <rect x="42" y="28" width="4" height="4" fill="#34D399"/>
                      <rect x="48" y="34" width="4" height="4" fill="#38BDF8"/>
                      <rect x="28" y="44" width="4" height="4" fill="#F8FAFC"/>
                      <rect x="34" y="52" width="4" height="4" fill="#34D399"/>
                      <rect x="46" y="46" width="6" height="6" rx="1" fill="#34D399"/>
                      <rect x="54" y="54" width="4" height="4" fill="#38BDF8"/>
                    </svg>
                    <span class="text-[9px] font-mono text-emerald-400 mt-1 block text-center">SCAN QR</span>
                  </div>

                  <div class="space-y-1 min-w-0">
                    <span class="text-[11px] font-mono text-slate-400 block truncate">Batch #STX-2026-B108</span>
                    <h4 class="text-white font-bold text-sm truncate">M-40 Heavy-Duty Pavers (80mm)</h4>
                    <p class="text-xs text-slate-400 truncate">Plant: Hosur Precast Facility #1</p>
                    <span class="text-[11px] font-mono text-emerald-400 block">ID: pass-7f9a2b4c</span>
                  </div>
                </div>

                <!-- 2x2 Telemetry Snapshot -->
                <div class="grid grid-cols-2 gap-2 mb-4 text-xs font-mono">
                  <div class="p-2 bg-slate-900/80 rounded-lg border border-slate-700/60">
                    <span class="text-[10px] text-slate-400 block font-sans">Mineralized CO₂</span>
                    <strong class="text-emerald-400 text-sm">580.4 kg</strong>
                  </div>
                  <div class="p-2 bg-slate-900/80 rounded-lg border border-slate-700/60">
                    <span class="text-[10px] text-slate-400 block font-sans">28d Strength</span>
                    <strong class="text-white text-sm">48.2 MPa</strong>
                  </div>
                </div>

                <a routerLink="/passports/pass-7f9a2b4c" class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 hover:scale-[1.01]">
                  <span>Open Full Digital Passport</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>
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
              <div class="search-wrapper">
                <div class="search-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input 
                  type="text" 
                  [(ngModel)]="searchPassportId" 
                  placeholder="e.g. pass-7f9a2b4c or STX-2026-B108" 
                  class="search-field"
                  (keyup.enter)="verifyPassport()">
              </div>
              <button 
                (click)="verifyPassport()" 
                class="px-6 py-3 bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0">
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
    .passport-hero-banner {
      background: linear-gradient(135deg, #0f172a 0%, #022c22 100%);
      border: 1px solid #1e293b;
      border-radius: 1.5rem;
      padding: 2rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.25);
    }
    @media (min-width: 640px) {
      .passport-hero-banner {
        padding: 2.5rem;
      }
    }
    .hero-glow-blob {
      position: absolute;
      top: -4rem;
      right: -4rem;
      width: 20rem;
      height: 20rem;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(0, 0, 0, 0) 70%);
      border-radius: 9999px;
      filter: blur(40px);
    }
    .hero-chip {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid #334155;
      border-radius: 0.625rem;
      padding: 0.5rem 0.65rem;
      color: #ffffff;
    }
    .passport-preview-card {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(6, 78, 59, 0.6));
      border: 1px solid rgba(52, 211, 153, 0.35);
      border-radius: 1.25rem;
      padding: 1.5rem;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
    }
    .passport-qr-box {
      background: #020617;
      border: 1px solid #1e293b;
      border-radius: 0.75rem;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .search-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      flex: 1 1 auto;
      width: 100%;
    }
    .search-icon {
      position: absolute;
      left: 1.15rem;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      pointer-events: none;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .search-field {
      width: 100% !important;
      padding-left: 3.25rem !important; /* 52px ensures search text and placeholder never touch the icon */
      padding-right: 1rem !important;
      padding-top: 0.75rem !important;
      padding-bottom: 0.75rem !important;
      font-family: var(--font-mono, monospace);
      font-size: 0.875rem;
      color: #0f172a;
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
      transition: all 0.15s ease-in-out;
      outline: none;
      box-sizing: border-box;
    }
    .search-field:focus {
      background-color: #ffffff;
      border-color: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.18);
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
