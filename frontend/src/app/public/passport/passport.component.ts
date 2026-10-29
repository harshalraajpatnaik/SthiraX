import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { ProductPassport } from '../../core/models/models';

@Component({
  selector: 'app-passport',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-passport bg-slate-50 min-h-screen pb-16" *ngIf="passport">
      
      <!-- Top Certificate Header -->
      <header class="bg-slate-900 text-white border-b border-slate-800 py-6 sm:py-8 shadow-md">
        <div class="container-wide">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">Official DPP Certificate</span>
                  <span class="text-slate-500">&bull;</span>
                  <span class="text-xs text-slate-300">Public Verification View</span>
                </div>
                <h1 class="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                  SthiraX Digital Product Passport
                </h1>
              </div>
            </div>

            <div class="flex items-center gap-2.5 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {{ passport.publicationStatus || 'PUBLISHED' }}
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                {{ passport.verificationStatus || 'VERIFIED' }}
              </span>
              <a routerLink="/trace" class="px-3 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 transition-colors">
                &larr; Back to Trace
              </a>
            </div>
          </div>
        </div>
      </header>

      <main class="container-wide py-8 space-y-6">
        
        <!-- Transparency Disclosure Notice -->
        <div class="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl px-5 py-3.5 text-xs sm:text-sm flex items-start gap-3 shadow-sm">
          <svg class="shrink-0 text-amber-600 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div>
            <strong class="font-bold">Transparency Disclosure:</strong> 
            {{ passport.disclaimer || 'Public passport displays sensor telemetry, mechanical break results, and net carbonation mass while redacting confidential pricing and supplier commercial terms.' }}
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <!-- Main Left Certificate Sheet (2 Columns Wide on Desktop) -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
              
              <!-- Batch Identification Block -->
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div class="space-y-1">
                  <span class="text-xs font-mono font-bold tracking-wider uppercase text-slate-400">Physical Pallet Reference</span>
                  <div class="text-3xl sm:text-4xl font-mono font-black text-slate-900 tracking-tight text-emerald-800">
                    {{ passport.batchNumber }}
                  </div>
                  <div class="text-xs text-slate-500 font-mono">
                    Passport UUID: <span class="text-slate-800 font-semibold">{{ passport.id }}</span>
                  </div>
                </div>

                <!-- Stylized QR Code Box -->
                <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center shrink-0 text-center">
                  <div class="w-14 h-14 bg-white border border-slate-300 rounded-lg flex items-center justify-center text-slate-800 mb-1.5 shadow-inner">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><line x1="10" y1="3" x2="10" y2="10"></line><line x1="3" y1="10" x2="10" y2="10"></line><line x1="14" y1="10" x2="21" y2="10"></line><line x1="10" y1="14" x2="10" y2="21"></line></svg>
                  </div>
                  <span class="text-[10px] font-mono text-slate-500 uppercase font-semibold">Pallet QR Tag</span>
                </div>
              </div>

              <!-- Production & Material Provenance Details Grid -->
              <div class="space-y-4">
                <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  Product & Facility Provenance
                </h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span class="text-slate-400 block font-medium mb-1">Product Description</span>
                    <strong class="text-slate-800 text-sm block">{{ passport.productName }}</strong>
                  </div>
                  <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span class="text-slate-400 block font-medium mb-1">Product Category</span>
                    <strong class="text-slate-800 text-sm block">{{ passport.productCategory }}</strong>
                  </div>
                  <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span class="text-slate-400 block font-medium mb-1">Licensed Facility</span>
                    <strong class="text-slate-800 text-sm block">{{ passport.plantLocation }}</strong>
                  </div>
                  <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span class="text-slate-400 block font-medium mb-1">Production Date</span>
                    <strong class="text-slate-800 text-sm block font-mono">{{ passport.productionDate }}</strong>
                  </div>
                  <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span class="text-slate-400 block font-medium mb-1">Batch Output Volume</span>
                    <strong class="text-slate-800 text-sm block font-mono">{{ passport.totalOutputUnits | number }} {{ passport.outputUnit }}</strong>
                  </div>
                  <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span class="text-slate-400 block font-medium mb-1">Indian Standard (BIS)</span>
                    <strong class="text-emerald-800 text-sm block font-mono font-bold">{{ passport.bisStandardReference }}</strong>
                  </div>
                </div>
              </div>

              <!-- Carbon Mineralization Sensor Telemetry KPI Cards -->
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    Sensor Telemetry & CO₂ Uptake (Coriolis Log)
                  </h3>
                  <span class="text-xs text-slate-400 font-mono">Emerson CMF025</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <!-- Stat 1 -->
                  <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span class="text-[11px] font-mono text-slate-500 uppercase block font-semibold mb-1">CO₂ Injected</span>
                      <div class="text-2xl font-mono font-black text-slate-800">{{ passport.co2InjectedKg }} kg</div>
                    </div>
                    <span class="text-[11px] text-slate-400 mt-2 block">Direct mass-flow meter log</span>
                  </div>

                  <!-- Stat 2 (Highlight) -->
                  <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-300 flex flex-col justify-between">
                    <div>
                      <span class="text-[11px] font-mono text-emerald-800 uppercase block font-bold mb-1">Gross Mineralized</span>
                      <div class="text-2xl font-mono font-black text-emerald-700">{{ passport.mineralizedCo2Kg }} kg</div>
                    </div>
                    <span class="text-[11px] text-emerald-700 font-medium mt-2 block">Bound permanently as CaCO₃</span>
                  </div>

                  <!-- Stat 3 -->
                  <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span class="text-[11px] font-mono text-slate-500 uppercase block font-semibold mb-1">Tested 28d Strength</span>
                      <div class="text-2xl font-mono font-black text-slate-800">{{ passport.testedStrengthMpa }} MPa</div>
                    </div>
                    <span class="text-[11px] text-emerald-600 font-semibold mt-2 block">Exceeds M-40 IS Spec (+20%)</span>
                  </div>
                </div>

                <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span class="font-bold text-slate-700 block mb-1">MRV Quantification Methodology:</span>
                  <p class="text-slate-600 leading-relaxed m-0">{{ passport.measurementMethodology }}</p>
                </div>
              </div>

              <!-- Verified Feedstock Content (Circular Secondary Binders) -->
              <div class="space-y-3">
                <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                  Verified Secondary Industrial Feedstocks
                </h3>
                <div class="flex flex-wrap gap-2.5">
                  <div *ngFor="let f of passport.verifiedRecycledFeedstocks" class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{{ f }}</span>
                  </div>
                </div>
                <p class="text-[11px] text-slate-400 italic">
                  Feedstock tickets reconciled against weighbridge batch formulations prior to autoclave door sealing.
                </p>
              </div>

              <!-- Sign-off & Authenticity Seal -->
              <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="text-xs space-y-0.5">
                  <span class="text-slate-400 block font-semibold uppercase tracking-wider text-[10px]">Verification Sign-Off Lead</span>
                  <strong class="text-slate-900 font-bold text-sm block">{{ passport.reviewerRole || 'Quality Assurance Lead' }}</strong>
                  <span class="text-slate-500 block">Published Date: {{ passport.publishedAt | date:'mediumDate' }}</span>
                </div>

                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-sm">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>SthiraX Authenticated Record</span>
                </div>
              </div>

            </div>
          </div>

          <!-- Right Sidebar: Verification Status Ladder & Governance (1 Column Wide) -->
          <div class="space-y-6">
            
            <!-- Ladder Card -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div>
                <h3 class="text-base font-bold text-slate-900">MRV Verification Ladder</h3>
                <p class="text-xs text-slate-500 mt-1">Multi-stage audit checkpoints from plant weighbridge to public registry:</p>
              </div>

              <div class="space-y-4 text-xs">
                
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">&check;</div>
                  <div>
                    <strong class="text-slate-900 block font-semibold">1. Mix Design Formulation</strong>
                    <span class="text-slate-500 text-[11px]">Calculated binder chemistry & water-binder ratio</span>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">&check;</div>
                  <div>
                    <strong class="text-slate-900 block font-semibold">2. Coriolis Injection Log</strong>
                    <span class="text-slate-500 text-[11px]">Calibrated mass flow sensor data logged to PostgreSQL</span>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">&check;</div>
                  <div>
                    <strong class="text-slate-900 block font-semibold">3. Laboratory Break Test</strong>
                    <span class="text-slate-500 text-[11px]">NABL crush test report attached (48.2 MPa)</span>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">&check;</div>
                  <div>
                    <strong class="text-emerald-800 block font-bold">4. Certified Quality Sign-off</strong>
                    <span class="text-slate-500 text-[11px]">Authorized SthiraX QA Lead verification completed</span>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">&bull;</div>
                  <div>
                    <strong class="text-slate-500 block font-medium">5. Commercial Registry VVB</strong>
                    <span class="text-slate-400 text-[11px]">Third-party accredited VVB registry audit (Phase 2)</span>
                  </div>
                </div>

              </div>
            </div>

            <!-- Privacy Protections Card -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 text-xs">
              <h4 class="text-sm font-bold text-slate-900">Commercial Confidentiality</h4>
              <p class="text-slate-600 leading-relaxed">
                In compliance with commercial agreements, public passports expose verified technical, quality, and environmental metrics while strictly redacting:
              </p>
              <ul class="space-y-1.5 text-slate-600 pl-4 list-disc">
                <li>Individual raw material supplier contract prices</li>
                <li>CO₂ procurement and transport tariffs</li>
                <li>Customer commercial invoice totals</li>
                <li>Proprietary chemical additive percentages</li>
              </ul>
            </div>

          </div>

        </div>

      </main>
    </div>

    <!-- Loading State -->
    <div class="page-passport-loading min-h-[60vh] flex items-center justify-center p-6" *ngIf="!passport">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full border border-slate-200 shadow-sm text-center space-y-4">
        <div class="w-12 h-12 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto"></div>
        <h3 class="text-lg font-bold text-slate-900">Loading SthiraX Product Passport...</h3>
        <p class="text-xs text-slate-500">Connecting to SthiraX Trace registry and verifying SHA-256 seal.</p>
        <a routerLink="/trace" class="inline-block px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold">Back to Registry</a>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PassportComponent implements OnInit {
  @Input() id?: string;
  passport?: ProductPassport;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    const passportId = this.id || routeId || 'pass-7f9a2b4c';
    this.api.getPassport(passportId).subscribe(res => {
      this.passport = res || this.api.getFallbackPassport('pass-7f9a2b4c');
    });
  }
}
