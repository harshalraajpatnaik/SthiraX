import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="docs-hub-root">
      
      <!-- Top Hero Section -->
      <section class="docs-hero-section">
        <div class="container-wide">
          <div class="hero-badge">
            <span class="pulse-dot"></span>
            <span>STHIRAX KNOWLEDGE & ARCHITECTURE HUB</span>
          </div>

          <h1 class="hero-title">
            Industrial Decarbonization: <span class="gradient-text">Science, Systems & Proof</span>
          </h1>

          <p class="hero-lead">
            An executive and technical reference for infrastructure developers, precast manufacturers, and sustainability auditors. Discover how industrial CO₂ emissions are permanently mineralized into certified high-strength building products.
          </p>

          <!-- Interactive Nav Tabs / Segmented Control -->
          <div class="segmented-nav">
            <button 
              type="button"
              (click)="activeTab = 'simple'" 
              [class.active]="activeTab === 'simple'"
              class="tab-btn">
              <span class="tab-icon">💡</span>
              <span class="tab-text">Executive Overview</span>
            </button>

            <button 
              type="button"
              (click)="activeTab = 'flow'" 
              [class.active]="activeTab === 'flow'"
              class="tab-btn">
              <span class="tab-icon">🔄</span>
              <span class="tab-text">Value Chain Flow</span>
            </button>

            <button 
              type="button"
              (click)="activeTab = 'system'" 
              [class.active]="activeTab === 'system'"
              class="tab-btn">
              <span class="tab-icon">🏗️</span>
              <span class="tab-text">Software & IoT Stack</span>
            </button>

            <button 
              type="button"
              (click)="activeTab = 'carbon'" 
              [class.active]="activeTab === 'carbon'"
              class="tab-btn">
              <span class="tab-icon">🧪</span>
              <span class="tab-text">Carbon Accounting & Math</span>
            </button>

            <button 
              type="button"
              (click)="activeTab = 'passport'" 
              [class.active]="activeTab === 'passport'"
              class="tab-btn">
              <span class="tab-icon">🛡️</span>
              <span class="tab-text">SthiraX Trace™ Passports</span>
            </button>

            <button 
              type="button"
              (click)="activeTab = 'faq'" 
              [class.active]="activeTab === 'faq'"
              class="tab-btn">
              <span class="tab-icon">📋</span>
              <span class="tab-text">Standards & FAQs</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Main Visual Workspace -->
      <main class="container-wide py-12">
        
        <!-- ========================================== -->
        <!-- TAB 1: EXECUTIVE OVERVIEW                  -->
        <!-- ========================================== -->
        <section *ngIf="activeTab === 'simple'" class="tab-pane animate-fade">
          
          <!-- Key Callout Card -->
          <div class="overview-banner mb-10">
            <div class="flex items-center gap-2 mb-3">
              <span class="banner-badge">Core Principle</span>
              <span class="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">Permanent Geochemical Mineralization</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Permanently binding captured CO₂ into synthetic limestone rock inside precast concrete.
            </h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed mb-6">
              <div class="bg-white/80 p-4 rounded-xl border border-slate-200/60 space-y-2">
                <span class="font-bold text-slate-900 block text-xs uppercase tracking-wider text-rose-700">The Conventional Challenge</span>
                <p>
                  Traditional concrete relies on virgin Portland cement clinker—a material generating ~800 kg CO₂ per tonne and responsible for roughly 8% of global greenhouse emissions. Conventional curing requires up to <strong>28 days of water curing</strong>, tying up plant pallets, working capital, and factory floor space.
                </p>
              </div>
              <div class="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80 space-y-2">
                <span class="font-bold text-emerald-950 block text-xs uppercase tracking-wider text-emerald-800">The SthiraX Breakthrough</span>
                <p>
                  We inject captured industrial CO₂ gas into sealed curing chambers filled with fresh green concrete blended with 20% to 50% recycled steel slag and fly ash. Within <strong>18 to 24 hours</strong>, CO₂ reacts exothermically with free calcium ions to precipitate microscopic calcium carbonate (CaCO₃) rock crystals. Compressive strength surges by +22% while permanently locking away CO₂ forever.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                <div>
                  <strong class="text-slate-900 text-sm block font-bold">24-Hour Strength Curing</strong>
                  <span class="text-xs text-slate-600">Reaches full 28-day commercial load capacity in under 24 hours, tripling plant pallet turnaround.</span>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                <div>
                  <strong class="text-slate-900 text-sm block font-bold">20% Virgin Cement Cut</strong>
                  <span class="text-xs text-slate-600">Replaced with secondary GGBS slag, thermal power fly ash, and processed C&D fines.</span>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                <div>
                  <strong class="text-slate-900 text-sm block font-bold">Tamper-Evident MRV</strong>
                  <span class="text-xs text-slate-600">Batch-level digital product passport with Coriolis sensor telemetry & SHA-256 seal.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3 Visual Steps Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            <div class="step-card">
              <div class="step-num">01</div>
              <div class="step-badge text-cyan-800 bg-cyan-100 border-cyan-300">Phase 1 &bull; Source Offtake</div>
              <h3 class="step-title">Biogenic CO₂ Capture</h3>
              <p class="step-desc">
                High-purity CO₂ (&gt;98.5% Vol) is captured directly from distillery fermentation flues, liquefied at &minus;20&deg;C, and delivered via cryogenic road tankers to partner precast facilities within an 80–120 km radius.
              </p>
              <div class="mt-4 pt-3 border-t border-slate-100 text-xs font-mono text-cyan-700 font-semibold">
                Purity: &gt;98.5% Vol &bull; Cryo Tanker Delivery
              </div>
            </div>

            <div class="step-card">
              <div class="step-num">02</div>
              <div class="step-badge text-emerald-800 bg-emerald-100 border-emerald-300">Phase 2 &bull; Mineralization</div>
              <h3 class="step-title">Accelerated Curing Skid</h3>
              <p class="step-desc">
                CO₂ gas is vaporized and metered under positive pressure (1.25 bar) into sealed curing enclosures. The gas diffuses through concrete capillary pores, precipitating stable calcium carbonate (CaCO₃) rock crystals.
              </p>
              <div class="mt-4 pt-3 border-t border-slate-100 text-xs font-mono text-emerald-700 font-semibold">
                Reaction: Exothermic &bull; 1.25 bar Pressure
              </div>
            </div>

            <div class="step-card">
              <div class="step-num">03</div>
              <div class="step-badge text-purple-800 bg-purple-100 border-purple-300">Phase 3 &bull; Quality Verification</div>
              <h3 class="step-title">Certified Material Passports</h3>
              <p class="step-desc">
                Every cured pallet is tested under IS 15658 / IS 2185 in NABL-accredited civil laboratories. Upon QA sign-off, a public Digital Product Passport with an immutable QR code is affixed to every shipping pallet.
              </p>
              <div class="mt-4 pt-3 border-t border-slate-100 text-xs font-mono text-purple-700 font-semibold">
                Compliance: IS 15658 M40 &bull; SHA-256 Proof
              </div>
            </div>

          </div>

          <!-- Executive Material Benchmark Comparison Cards -->
          <div class="benchmark-section mt-10">
            <div class="benchmark-header mb-6">
              <span class="text-xs font-mono font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 inline-block mb-2">Empirical Material Benchmark</span>
              <h3 class="text-2xl font-bold text-slate-900 tracking-tight">
                Traditional Precast Concrete vs. SthiraX Carbon-Cured Precast
              </h3>
              <p class="text-slate-600 text-sm max-w-3xl mt-1">
                Direct side-by-side comparison across embodied emissions, mechanical load tolerance, secondary waste utilization, and audit verifiability.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <!-- Card 1: Carbon Balance -->
              <div class="benchmark-card">
                <div class="benchmark-card-header">
                  <div class="flex items-center gap-2.5">
                    <div class="benchmark-icon-badge bg-rose-50 text-rose-600 border border-rose-200">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-slate-900 text-base">Carbon Balance & Embodied GHG</h4>
                      <span class="text-xs text-slate-500">Gate-to-gate lifecycle carbon footprint</span>
                    </div>
                  </div>
                </div>
                
                <div class="benchmark-split mt-4">
                  <div class="split-col standard">
                    <span class="split-label">Traditional Precast</span>
                    <div class="split-value text-rose-600 font-mono font-bold">+350 to +450 kg</div>
                    <p class="split-desc">CO₂e emitted per tonne due to intensive virgin limestone clinker calcination.</p>
                  </div>
                  <div class="split-col sthirax">
                    <span class="split-label">SthiraX Carbonation</span>
                    <div class="split-value text-emerald-700 font-mono font-bold">Permanently Sequestered</div>
                    <p class="split-desc">Exothermic mineralization locks up to 34 kg CO₂ per m² into stable mineral rock.</p>
                  </div>
                </div>

                <div class="benchmark-footer mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="text-slate-500">Regulatory Impact:</span>
                  <span class="font-semibold text-slate-700">Scope 3 ESG Compliance & Net-Zero Mandates</span>
                </div>
              </div>

              <!-- Card 2: 28-Day Strength -->
              <div class="benchmark-card">
                <div class="benchmark-card-header">
                  <div class="flex items-center gap-2.5">
                    <div class="benchmark-icon-badge bg-cyan-50 text-cyan-700 border border-cyan-200">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-slate-900 text-base">Compressive Strength & Durability</h4>
                      <span class="text-xs text-slate-500">Mechanical load tolerance under IS 15658 / IS 2185</span>
                    </div>
                  </div>
                </div>
                
                <div class="benchmark-split mt-4">
                  <div class="split-col standard">
                    <span class="split-label">Traditional Precast</span>
                    <div class="split-value text-slate-700 font-mono font-bold">35.0 – 40.0 MPa</div>
                    <p class="split-desc">Requires 28 days of water curing; remains vulnerable to internal capillary voids.</p>
                  </div>
                  <div class="split-col sthirax">
                    <span class="split-label">SthiraX Carbonation</span>
                    <div class="split-value text-emerald-700 font-mono font-bold">46.2 – 48.5 MPa</div>
                    <p class="split-desc">+22% gain over M40 spec achieved within 24 hours via micro-pore crystal sealing.</p>
                  </div>
                </div>

                <div class="benchmark-footer mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="text-slate-500">Structural Gain:</span>
                  <span class="font-semibold text-emerald-700">+22.3% Compressive Strength Margin</span>
                </div>
              </div>

              <!-- Card 3: Recycled Content -->
              <div class="benchmark-card">
                <div class="benchmark-card-header">
                  <div class="flex items-center gap-2.5">
                    <div class="benchmark-icon-badge bg-amber-50 text-amber-700 border border-amber-200">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-slate-900 text-base">Circular Industrial Feedstocks</h4>
                      <span class="text-xs text-slate-500">Secondary binders, slag, fly ash & C&D fines uptake</span>
                    </div>
                  </div>
                </div>
                
                <div class="benchmark-split mt-4">
                  <div class="split-col standard">
                    <span class="split-label">Traditional Precast</span>
                    <div class="split-value text-slate-700 font-mono font-bold">10% – 15% Maximum</div>
                    <p class="split-desc">Higher supplementary binder content causes delayed early-stage setting.</p>
                  </div>
                  <div class="split-col sthirax">
                    <span class="split-label">SthiraX Carbonation</span>
                    <div class="split-value text-emerald-700 font-mono font-bold">Up to 60% Slag & Fly Ash</div>
                    <p class="split-desc">CO₂ activates slag/fines rapidly, eliminating traditional hydration delays.</p>
                  </div>
                </div>

                <div class="benchmark-footer mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="text-slate-500">Policy Compliance:</span>
                  <span class="font-semibold text-slate-700">Fully Meets MoEFCC & CPCB C&D Rules 2025</span>
                </div>
              </div>

              <!-- Card 4: Verification & Audit -->
              <div class="benchmark-card">
                <div class="benchmark-card-header">
                  <div class="flex items-center gap-2.5">
                    <div class="benchmark-icon-badge bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-slate-900 text-base">Digital Provenance & MRV Verification</h4>
                      <span class="text-xs text-slate-500">Batch-level traceability and physical telemetry proof</span>
                    </div>
                  </div>
                </div>
                
                <div class="benchmark-split mt-4">
                  <div class="split-col standard">
                    <span class="split-label">Traditional Precast</span>
                    <div class="split-value text-slate-700 font-mono font-bold">Paper Mill Sheets</div>
                    <p class="split-desc">Untracked batch records, non-verifiable claims, vulnerable to greenwashing.</p>
                  </div>
                  <div class="split-col sthirax">
                    <span class="split-label">SthiraX Carbonation</span>
                    <div class="split-value text-emerald-700 font-mono font-bold">Scannable QR Passport</div>
                    <p class="split-desc">SHA-256 seal backed by Emerson Coriolis telemetry and NABL break reports.</p>
                  </div>
                </div>

                <div class="benchmark-footer mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="text-slate-500">Audit Status:</span>
                  <span class="font-semibold text-emerald-700">Tamper-Evident SHA-256 Public Proof</span>
                </div>
              </div>

            </div>
          </div>

        </section>

        <!-- ========================================== -->
        <!-- TAB 2: INDUSTRIAL VALUE CHAIN FLOW         -->
        <!-- ========================================== -->
        <section *ngIf="activeTab === 'flow'" class="tab-pane animate-fade">
          
          <div class="section-intro mb-8">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              End-to-End Industrial Value Chain Flow
            </h2>
            <p class="text-slate-600 text-base max-w-3xl mt-1">
              How captured industrial CO₂ travels from biogenic fermentation chimneys to certified municipal infrastructure across 5 verifiable, transparent stages:
            </p>
          </div>

          <!-- Vertical Timeline with High-Contrast Stage Cards -->
          <div class="timeline-container">
            
            <!-- Stage 1 -->
            <div class="timeline-row">
              <div class="timeline-marker">1</div>
              <div class="timeline-card">
                <div class="timeline-tag">STAGE 01 &bull; SOURCE OFFTAKE & CRYOGENICS</div>
                <h3 class="timeline-title">Biogenic CO₂ Capture & Cryogenic Liquefaction</h3>
                <p class="timeline-body">
                  High-purity CO₂ (&gt;98.5% Vol) is captured directly from agricultural fermentation chimneys (such as regional ethanol distilleries in Karnataka/Maharashtra). The gas stream is scrubbed, compressed, and liquefied at &minus;20&deg;C / 20 bar, then dispatched in vacuum-insulated 18-tonne cryogenic road tankers to partner precast yards.
                </p>
                <div class="timeline-metrics">
                  <span class="metric-pill">Feedstock: Biogenic Grain Ethanol Flue</span>
                  <span class="metric-pill">Gas Purity: &gt;98.5% Vol Chromatography</span>
                  <span class="metric-pill">Transit Radius: 80–120 km Regional Cluster</span>
                </div>
              </div>
            </div>

            <!-- Stage 2 -->
            <div class="timeline-row">
              <div class="timeline-marker">2</div>
              <div class="timeline-card">
                <div class="timeline-tag">STAGE 02 &bull; FACTORY RETROFIT & SKID INTEGRATION</div>
                <h3 class="timeline-title">Modular Vaporization Skid & Chamber Sealing</h3>
                <p class="timeline-body">
                  Existing partner precast sheds (e.g., Hosur Facility) are upgraded with modular skid-mounted vaporizers, airtight silicone perimeter seals, and Coriolis mass-flow meters. Liquefied CO₂ is vaporized on demand and injected through positive-displacement distribution manifolds at 1.2 to 1.4 bar positive pressure.
                </p>
                <div class="timeline-metrics">
                  <span class="metric-pill">Retrofit CapEx: ~₹18–25 Lakhs per Bay</span>
                  <span class="metric-pill">Installation Time: Under 3 Weeks</span>
                  <span class="metric-pill">Chamber Pressure: 1.25 bar Positive</span>
                </div>
              </div>
            </div>

            <!-- Stage 3 -->
            <div class="timeline-row">
              <div class="timeline-marker">3</div>
              <div class="timeline-card">
                <div class="timeline-tag">STAGE 03 &bull; THERMOCHEMICAL CARBONATION REACTION</div>
                <h3 class="timeline-title">Accelerated Carbonation Curing (18–24 Hours)</h3>
                <p class="timeline-body">
                  CO₂ gas diffuses rapidly into capillary pores of freshly compacted green concrete, reacting exothermically with free calcium hydroxide (Portlandite) to precipitate microscopic calcite crystals (CaCO₃). This micro-pore refinement permanently fills internal voids, delivering full 28-day target compressive strength in under 24 hours.
                </p>
                <div class="timeline-metrics">
                  <span class="metric-pill">Curing Cycle: 18 – 24 Hours</span>
                  <span class="metric-pill">Uptake Efficiency: 88% – 92%</span>
                  <span class="metric-pill">Chamber Temp: 42°C – 46°C Self-Sustaining</span>
                </div>
              </div>
            </div>

            <!-- Stage 4 -->
            <div class="timeline-row">
              <div class="timeline-marker">4</div>
              <div class="timeline-card">
                <div class="timeline-tag">STAGE 04 &bull; MECHANICAL AUDIT & LAB APPROVAL</div>
                <h3 class="timeline-title">NABL Laboratory Compressive Strength Break Tests</h3>
                <p class="timeline-body">
                  Specimen test blocks from every production run are crushed in calibrated compressive testing machines. Independent NABL-accredited test reports verify M-40 / M-50 strength compliance, water absorption (&le;4.9% vs &le;6.0% code limit), and dimensional stability under Indian Standards (IS 15658:2006 / IS 2185).
                </p>
                <div class="timeline-metrics">
                  <span class="metric-pill">Spec Target: 40.0 MPa (Tested: 46.2 – 48.5 MPa)</span>
                  <span class="metric-pill">Accreditation: CivilAid NABL Bangalore</span>
                  <span class="metric-pill">Depth: Phenolphthalein Verified</span>
                </div>
              </div>
            </div>

            <!-- Stage 5 -->
            <div class="timeline-row">
              <div class="timeline-marker">5</div>
              <div class="timeline-card">
                <div class="timeline-tag">STAGE 05 &bull; CRYPTOGRAPHIC PASSPORT & DISPATCH</div>
                <h3 class="timeline-title">Digital Product Passport & Jobsite Pallet QR Codes</h3>
                <p class="timeline-body">
                  Upon QA sign-off, a public Digital Product Passport is minted with an immutable SHA-256 seal. A weather-resistant QR code is affixed to every shipping pallet. Municipal site engineers, structural consultants, and green building certifiers scan the code to inspect gas mass-balance telemetry, break reports, and net carbon metrics.
                </p>
                <div class="timeline-metrics">
                  <span class="metric-pill">Integrity Seal: SHA-256 Hash</span>
                  <span class="metric-pill">Access: Public Smartphone Scan</span>
                  <span class="metric-pill">Ledger: PostgreSQL Timestamped</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        <!-- ========================================== -->
        <!-- TAB 3: SOFTWARE & IOT ARCHITECTURE        -->
        <!-- ========================================== -->
        <section *ngIf="activeTab === 'system'" class="tab-pane animate-fade">
          
          <div class="section-intro mb-8">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Software & Industrial IoT Architecture
            </h2>
            <p class="text-slate-600 text-base max-w-3xl mt-1">
              A high-reliability, modular enterprise platform bridging physical industrial curing hardware, relational persistence, and public verification explorers:
            </p>
          </div>

          <!-- Clean Tiered System Cards -->
          <div class="space-y-6 mb-10">
            
            <!-- Tier 1: Client Layer -->
            <div class="arch-card border-l-4 border-l-cyan-500">
              <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
                <span class="arch-tier-pill text-cyan-800 bg-cyan-100">TIER 1 &bull; CLIENT INTERFACE</span>
                <span class="font-mono text-xs text-slate-500">Port 4200 &bull; Single-Page App</span>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">Angular 17 Reactive Frontend</h3>
              <p class="text-sm text-slate-700 leading-relaxed mb-3">
                High-performance, standalone component architecture styled with Tailwind CSS. Incorporates real-time economic simulators and role-based route guards (RBAC) separating public Zero-Knowledge DPP explorers from authenticated plant operators, NABL lab certifiers, and corporate auditors.
              </p>
              <div class="flex flex-wrap gap-2 text-xs">
                <span class="tech-tag">Angular 17</span>
                <span class="tech-tag">Tailwind CSS</span>
                <span class="tech-tag">Reactive Forms</span>
                <span class="tech-tag">Standalone Architecture</span>
                <span class="tech-tag">Zero-Knowledge Views</span>
              </div>
            </div>

            <!-- Tier 2: Application Layer -->
            <div class="arch-card border-l-4 border-l-emerald-500">
              <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
                <span class="arch-tier-pill text-emerald-800 bg-emerald-100">TIER 2 &bull; APPLICATION SERVICES</span>
                <span class="font-mono text-xs text-slate-500">Port 8088 &bull; REST API</span>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">Spring Boot 2.6 Domain Core (Java 17)</h3>
              <p class="text-sm text-slate-700 leading-relaxed mb-3">
                Stateless, transactional backend running core business domains: ISO 14064-2 gate-to-gate carbon abatement engine, plant retrofit financial models, and SHA-256 cryptographic passport minting. Fully documented via OpenAPI 3.0 / Swagger UI.
              </p>
              <div class="flex flex-wrap gap-2 text-xs">
                <span class="tech-tag">Java 17</span>
                <span class="tech-tag">Spring Security RBAC</span>
                <span class="tech-tag">OpenAPI 3.0 / Swagger</span>
                <span class="tech-tag">HikariCP Pool</span>
                <span class="tech-tag">ISO 14064-2 Engine</span>
              </div>
            </div>

            <!-- Tier 3: Persistence & IoT Layer -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div class="arch-card border-l-4 border-l-purple-500">
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="arch-tier-pill text-purple-800 bg-purple-100">TIER 3A &bull; PERSISTENCE</span>
                  <span class="font-mono text-xs text-slate-500">Port 5432</span>
                </div>
                <h4 class="text-base font-bold text-slate-900 mb-1">PostgreSQL 15 (Docker Volume)</h4>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Docker container volume storage with 9 relational tables: partner manufacturing plants, CO₂ suppliers, batch runs, chamber sensor telemetry, product passports, and immutable audit logs.
                </p>
                <div class="flex flex-wrap gap-1.5 text-xs">
                  <span class="tech-tag">Docker Compose</span>
                  <span class="tech-tag">Postgres 15</span>
                  <span class="tech-tag">Foreign Key Enforced</span>
                  <span class="tech-tag">Append-Only Logs</span>
                </div>
              </div>

              <div class="arch-card border-l-4 border-l-amber-500">
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="arch-tier-pill text-amber-800 bg-amber-100">TIER 3B &bull; IOT SENSORS</span>
                  <span class="font-mono text-xs text-slate-500">Modbus TCP</span>
                </div>
                <h4 class="text-base font-bold text-slate-900 mb-1">Coriolis Mass-Flow Ingestion</h4>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Physical industrial fieldbus integration connecting Endress+Hauser Promass / Emerson CMF025 Coriolis mass-flow meters, 4–20 mA pressure transmitters, and PT100 thermal probes.
                </p>
                <div class="flex flex-wrap gap-1.5 text-xs">
                  <span class="tech-tag">Emerson CMF025</span>
                  <span class="tech-tag">Modbus TCP</span>
                  <span class="tech-tag">PT100 Probes</span>
                  <span class="tech-tag">Differential Bar</span>
                </div>
              </div>

            </div>

          </div>

          <!-- Interactive API Explorer CTA Card -->
          <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8 rounded-2xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg border border-slate-700">
            <div>
              <div class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Developer & Integration Access</div>
              <h3 class="text-xl font-bold text-white">Interactive Swagger OpenAPI Explorer</h3>
              <p class="text-sm text-slate-300 mt-1 max-w-xl">
                Inspect live REST endpoints, test batch submissions, and review JSON schema contracts directly in your browser.
              </p>
            </div>
            <a href="http://localhost:8088/swagger-ui/index.html" target="_blank" class="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shrink-0 shadow-md">
              <span>Open Swagger UI</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>

        </section>

        <!-- ========================================== -->
        <!-- TAB 4: CARBON ACCOUNTING & CHEMISTRY       -->
        <!-- ========================================== -->
        <section *ngIf="activeTab === 'carbon'" class="tab-pane animate-fade">
          
          <div class="section-intro mb-8">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Carbon Accounting & Reaction Stoichiometry
            </h2>
            <p class="text-slate-600 text-base max-w-3xl mt-1">
              Transparent, scientific boundary definitions separating gross mineralized carbon, gate-to-gate net physical removal, and avoided Scope 3 emissions:
            </p>
          </div>

          <!-- Chemistry & Math Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            
            <div class="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase">Thermodynamic Stoichiometry</span>
                <h3 class="text-lg font-bold text-slate-900 mt-3 mb-2">Exothermic Mineralization Reaction</h3>
                
                <div class="bg-slate-950 text-emerald-300 font-mono text-sm p-4 rounded-xl my-3 border border-slate-800 space-y-1.5">
                  <div class="text-xs text-slate-400 font-sans">Primary Calcium Carbonation Equation:</div>
                  <div class="font-bold text-base text-white">Ca(OH)₂ + CO₂ &rarr; CaCO₃ + H₂O</div>
                  <div class="text-xs text-emerald-400">&Delta;H = &minus;74.4 kJ / mol (Spontaneous & Exothermic)</div>
                  <div class="text-[11px] text-slate-400 border-t border-slate-800 pt-1 mt-1 font-sans">
                    Molar Ratio: 74.1 g Ca(OH)₂ + 44.0 g CO₂ &rarr; 100.1 g CaCO₃ + 18.0 g H₂O
                  </div>
                </div>

                <p class="text-sm text-slate-700 leading-relaxed mt-3">
                  Hydrated Portland cement and secondary pozzolans release soluble calcium hydroxide (Portlandite). Injected CO₂ dissolves rapidly into aqueous pore solution, precipitating stable microscopic calcium carbonate (calcite, CaCO₃) within the capillary void network.
                </p>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Permanence Horizon:</span>
                <span class="font-bold text-emerald-700">&gt; 1,000 Years (Irreversible below 800&deg;C)</span>
              </div>
            </div>

            <div class="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono font-bold text-cyan-800 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full uppercase">Gate-to-Gate Life Cycle Boundary</span>
                <h3 class="text-lg font-bold text-slate-900 mt-3 mb-2">Net Physical Removal Equation</h3>
                
                <div class="bg-slate-950 text-cyan-300 font-mono text-sm p-4 rounded-xl my-3 border border-slate-800 space-y-1.5">
                  <div class="text-xs text-slate-400 font-sans">ISO 14064-2 Net Quantified Mass:</div>
                  <div class="font-bold text-base text-white">Net Removal = CO₂ Mineralized &minus; (E_process + E_transport)</div>
                  <div class="text-xs text-cyan-400">E_process = 0.040 kg CO₂e / kWh &bull; E_transport = 0.082 kg CO₂e / t-km</div>
                  <div class="text-[11px] text-slate-400 border-t border-slate-800 pt-1 mt-1 font-sans">
                    Deductions: Cryogenic tanker fuel, skid vaporizer heater, and chamber blowers
                  </div>
                </div>

                <p class="text-sm text-slate-700 leading-relaxed mt-3">
                  Gross injected gas is <strong>never equated to net certified removal</strong>. SthiraX explicitly measures and subtracts all parasitic energy—cryogenic road freight, electric vaporization, and chamber fan circulation—before issuing any carbon removal claim.
                </p>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Net Removal Yield:</span>
                <span class="font-bold text-cyan-700">88% – 92% of gross injected CO₂</span>
              </div>
            </div>

          </div>

          <!-- Detailed Boundary Comparison Card -->
          <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-xl font-bold text-slate-900 mb-4">Four-Tier Boundary Hierarchy & Carbon Disclosures</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span class="text-xs font-mono font-bold uppercase text-slate-500 block mb-1">Tier 1 &bull; Physical Feedstock</span>
                <div class="font-bold text-slate-900 text-sm">Gross Injected CO₂ Mass</div>
                <p class="text-xs text-slate-700 mt-1">Total mass of vaporized gas metered into the curing chamber via Emerson Coriolis flow meters. Typically 32.0 kg per m².</p>
              </div>

              <div class="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200">
                <span class="text-xs font-mono font-bold uppercase text-emerald-800 block mb-1">Tier 2 &bull; Chemical Fixation</span>
                <div class="font-bold text-emerald-950 text-sm">Gross Mineralized Calcite (CaCO₃)</div>
                <p class="text-xs text-emerald-900 mt-1">Gas chemically locked into synthetic mineral rock, verified via Thermal Gravimetric Analysis (TGA) & differential mass balance. Typically 28.5 kg/m².</p>
              </div>

              <div class="p-4 bg-cyan-50/70 rounded-xl border border-cyan-200">
                <span class="text-xs font-mono font-bold uppercase text-cyan-800 block mb-1">Tier 3 &bull; Certified Carbon Removal</span>
                <div class="font-bold text-cyan-950 text-sm">Net Gate-to-Gate Removal (ISO 14064-2)</div>
                <p class="text-xs text-cyan-900 mt-1">Gross mineralized carbon minus all process parasitic emissions (cryogenic trucking, vaporization energy, blowers). Typically 25.1 kg/m².</p>
              </div>

              <div class="p-4 bg-amber-50/70 rounded-xl border border-amber-200">
                <span class="text-xs font-mono font-bold uppercase text-amber-800 block mb-1">Tier 4 &bull; Baseline Displacement</span>
                <div class="font-bold text-amber-950 text-sm">Scope 3 Avoided Clinker Emissions</div>
                <p class="text-xs text-amber-900 mt-1">Emissions avoided by replacing 20% to 25% virgin Portland cement with secondary GGBS slag and fly ash pozzolans. Kept strictly separate from net removals.</p>
              </div>

            </div>
          </div>

        </section>

        <!-- ========================================== -->
        <!-- TAB 5: STHIRAX TRACE™ PASSPORTS           -->
        <!-- ========================================== -->
        <section *ngIf="activeTab === 'passport'" class="tab-pane animate-fade">
          
          <div class="section-intro mb-8">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              SthiraX Trace™ Digital Product Passport (DPP)
            </h2>
            <p class="text-slate-600 text-base max-w-3xl mt-1">
              How physical Coriolis mass-flow logs, plant batch mix sheets, and NABL crush tests are cryptographically sealed into tamper-evident public passports:
            </p>
          </div>

          <!-- Passport Architecture Pipeline Card -->
          <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm mb-10">
            <div class="max-w-3xl mb-6">
              <span class="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase">DPP Data Pipeline</span>
              <h3 class="text-xl font-bold text-slate-900 mt-2">End-to-End Cryptographic Seal Generation</h3>
              <p class="text-sm text-slate-600 mt-1">
                Data travels from physical sensors through automated quality gates before receiving a verified SHA-256 seal.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-sans">
              
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span class="font-mono font-bold text-emerald-600 text-xs block mb-1">STEP 1</span>
                  <strong class="text-slate-900 text-sm block">Sensor Ingestion</strong>
                  <p class="text-slate-700 mt-1">Emerson Coriolis flow meter logs kg CO₂; batching weighbridge logs secondary slag and fly ash percentages.</p>
                </div>
                <span class="font-mono text-[10px] text-slate-500 mt-3 pt-2 border-t border-slate-200">Modbus TCP &bull; 1-Sec Telemetry</span>
              </div>

              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span class="font-mono font-bold text-emerald-600 text-xs block mb-1">STEP 2</span>
                  <strong class="text-slate-900 text-sm block">NABL Break Testing</strong>
                  <p class="text-slate-700 mt-1">Specimen cores crushed at 7d and 28d under IS 15658 / IS 2185. Calibrated break report digitally attached.</p>
                </div>
                <span class="font-mono text-[10px] text-slate-500 mt-3 pt-2 border-t border-slate-200">CivilAid NABL &bull; M40+ Spec</span>
              </div>

              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span class="font-mono font-bold text-emerald-600 text-xs block mb-1">STEP 3</span>
                  <strong class="text-slate-900 text-sm block">QA Lead Sign-off</strong>
                  <p class="text-slate-700 mt-1">Certified quality reviewer audits sensor mass balance and laboratory cert before batch release.</p>
                </div>
                <span class="font-mono text-[10px] text-slate-500 mt-3 pt-2 border-t border-slate-200">Role-Based &bull; Dual Verification</span>
              </div>

              <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-300 flex flex-col justify-between">
                <div>
                  <span class="font-mono font-bold text-emerald-800 text-xs block mb-1">STEP 4</span>
                  <strong class="text-emerald-950 text-sm block">Pallet QR Passport</strong>
                  <p class="text-emerald-900 mt-1">Unique SHA-256 hash issued. Scannable QR code affixed to shipping pallets for jobsite inspection.</p>
                </div>
                <span class="font-mono text-[10px] text-emerald-700 mt-3 pt-2 border-t border-emerald-200">Public &bull; Zero-Knowledge</span>
              </div>

            </div>
          </div>

          <!-- Sample Live Passport Interactive Box -->
          <div class="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-2 max-w-2xl">
              <span class="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                LIVE DEMONSTRATION &bull; BATCH #STX-2026-B108
              </span>
              <h3 class="text-xl sm:text-2xl font-bold text-white">
                Inspect a Released Public Digital Product Passport
              </h3>
              <p class="text-slate-300 text-sm leading-relaxed">
                Experience how municipal auditors, LEED consultants, and structural engineers scan jobsite pallets to verify 580 kg mineralized CO₂, 48.2 MPa tested strength, and NABL break certificates without revealing confidential pricing.
              </p>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              <a routerLink="/passports/pass-7f9a2b4c" class="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2">
                <span>Open Batch #B108 Passport</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </div>

        </section>

        <!-- ========================================== -->
        <!-- TAB 6: STANDARDS & FAQS                    -->
        <!-- ========================================== -->
        <section *ngIf="activeTab === 'faq'" class="tab-pane animate-fade">
          
          <div class="section-intro mb-8">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Indian Standards & Frequently Asked Questions
            </h2>
            <p class="text-slate-600 text-base max-w-3xl mt-1">
              Authoritative answers to technical compliance, capital payback economics, and operational plant retrofits:
            </p>
          </div>

          <!-- Structured FAQ Cards -->
          <div class="space-y-4 mb-10">
            
            <!-- FAQ 1: Standards -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">STANDARDS & COMPLIANCE</span>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">
                Does SthiraX precast concrete satisfy Bureau of Indian Standards (BIS) specifications?
              </h3>
              <p class="text-sm text-slate-700 leading-relaxed mb-3">
                Yes. All materials are engineered and laboratory-tested to satisfy or exceed Indian national codes:
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong class="text-slate-900 block font-mono">IS 15658:2006</strong>
                  <span class="text-slate-700">Precast Concrete Blocks for Paving (M35 – M50 commercial grades).</span>
                </div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong class="text-slate-900 block font-mono">IS 2185 Part 1:2005</strong>
                  <span class="text-slate-700">Concrete Masonry Blocks (Solid load-bearing structural units).</span>
                </div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong class="text-slate-900 block font-mono">IRC:SP:63</strong>
                  <span class="text-slate-700">Interlocking Concrete Block Pavement for heavy municipal highways.</span>
                </div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong class="text-slate-900 block font-mono">CPCB C&D Rules 2025</strong>
                  <span class="text-slate-700">Mandated 20% to 50% recycled construction fines uptake.</span>
                </div>
              </div>
            </div>

            <!-- FAQ 2: Retrofit -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-mono font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded border border-cyan-200">FACTORY RETROFIT</span>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">
                What modifications are required at an existing partner precast plant?
              </h3>
              <p class="text-sm text-slate-700 leading-relaxed">
                No civil construction or new building works are needed. SthiraX delivers a modular, skid-mounted vaporization manifold, installs airtight silicone perimeter seals onto existing curing rooms, and connects Emerson Coriolis gas meters and telemetry probes. Retrofit downtime is typically under 3 weeks.
              </p>
            </div>

            <!-- FAQ 3: Payback -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">FINANCIAL ECONOMICS</span>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">
                What is the estimated capital payback period for a precast plant retrofit?
              </h3>
              <p class="text-sm text-slate-700 leading-relaxed">
                At an average annual volume of 12,000 tonnes and retrofit CapEx of ₹18 to ₹25 Lakhs, cement binder savings (replacing 20% OPC with fly ash/slag) combined with modest green procurement premiums deliver full capital payback within <strong>14 to 18 months</strong> without any carbon credit subsidy.
              </p>
            </div>

            <!-- FAQ 4: Carbon Credits -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-mono font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-1 rounded border border-purple-200">CARBON OFFSETS</span>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">
                Does the business require carbon removal credit sales to remain profitable?
              </h3>
              <p class="text-sm text-slate-700 leading-relaxed">
                <strong>No.</strong> SthiraX operates profitably strictly from material sales of certified precast concrete products. Carbon credits (such as Puro.earth or India's Carbon Credit Trading Scheme) are treated strictly as non-guaranteed financial upside.
              </p>
            </div>

          </div>

        </section>

        <!-- Bottom Explorer Action Box -->
        <div class="docs-cta-card">
          <div class="cta-content">
            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900">Experience Live Batch Traceability</h3>
            <p class="text-sm text-slate-600 mt-1 max-w-xl">
              Inspect active Digital Product Passports with real mass-flow telemetry, NABL laboratory certificates, and cryptographic hashes.
            </p>
          </div>
          <div class="cta-actions">
            <a routerLink="/trace" class="btn btn-primary px-5 py-2.5 text-sm font-semibold flex items-center gap-2">
              <span>View SthiraX Trace™</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a routerLink="/tools" class="btn btn-secondary px-5 py-2.5 text-sm font-semibold">
              Economics Calculators
            </a>
          </div>
        </div>

      </main>

    </div>
  `,
  styles: [`
    .docs-hub-root {
      background-color: #F8FAFC;
      min-height: calc(100vh - 64px);
    }
    .docs-hero-section {
      background: linear-gradient(180deg, #0F172A 0%, #1E293B 100%);
      color: #ffffff;
      padding: 3rem 1.5rem 2.5rem;
      border-bottom: 1px solid #334155;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: #34D399;
      background: rgba(6, 78, 59, 0.4);
      border: 1px solid rgba(52, 211, 153, 0.3);
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      margin-bottom: 1rem;
    }
    .pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #34D399;
      box-shadow: 0 0 8px #34D399;
    }
    .hero-title {
      font-size: 2.25rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.15;
      margin-bottom: 1rem;
    }
    @media (min-width: 640px) {
      .hero-title {
        font-size: 3rem;
      }
    }
    .gradient-text {
      background: linear-gradient(135deg, #34D399 0%, #38BDF8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-lead {
      font-size: 1rem;
      color: #94A3B8;
      max-width: 780px;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    @media (min-width: 640px) {
      .hero-lead {
        font-size: 1.125rem;
      }
    }

    /* Segmented Navigation */
    .segmented-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      background: rgba(15, 23, 42, 0.7);
      padding: 0.35rem;
      border-radius: 0.85rem;
      border: 1px solid #334155;
      width: fit-content;
      max-width: 100%;
    }
    .tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.55rem 0.85rem;
      border-radius: 0.6rem;
      font-size: 0.825rem;
      font-weight: 600;
      color: #94A3B8;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .tab-btn:hover {
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.05);
    }
    .tab-btn.active {
      color: #FFFFFF;
      background: #059669;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
    .tab-icon {
      font-size: 0.95rem;
    }

    /* Overview Banner */
    .overview-banner {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1.25rem;
      padding: 2.25rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
    }
    .banner-badge {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #059669;
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      padding: 0.2rem 0.5rem;
      border-radius: 0.375rem;
    }

    /* Step Cards */
    .step-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1rem;
      padding: 1.75rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .step-num {
      font-size: 2.5rem;
      font-weight: 900;
      font-family: monospace;
      color: #E2E8F0;
      position: absolute;
      top: 1rem;
      right: 1.25rem;
      line-height: 1;
    }
    .step-badge {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.2rem 0.5rem;
      border-radius: 0.375rem;
      border-width: 1px;
      width: fit-content;
      margin-bottom: 0.75rem;
    }
    .step-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }
    .step-desc {
      font-size: 0.875rem;
      color: #475569;
      line-height: 1.55;
    }

    /* Benchmark Cards */
    .benchmark-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(15, 23, 42, 0.02);
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .benchmark-card:hover {
      border-color: #CBD5E1;
      box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.07);
    }
    .benchmark-icon-badge {
      width: 38px;
      height: 38px;
      border-radius: 0.65rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .benchmark-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.85rem;
    }
    .split-col {
      padding: 0.9rem;
      border-radius: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .split-col.standard {
      background-color: #F8FAFC;
      border: 1px solid #F1F5F9;
    }
    .split-col.sthirax {
      background-color: #ECFDF5;
      border: 1px solid #A7F3D0;
    }
    .split-label {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748B;
    }
    .split-col.sthirax .split-label {
      color: #065F46;
    }
    .split-value {
      font-size: 0.925rem;
      line-height: 1.25;
    }
    .split-desc {
      font-size: 0.75rem;
      color: #64748B;
      line-height: 1.4;
      margin-top: 0.2rem;
    }
    .split-col.sthirax .split-desc {
      color: #047857;
    }
    @media (max-width: 640px) {
      .benchmark-split {
        grid-template-columns: 1fr;
      }
    }

    /* Timeline Sequence */
    .timeline-container {
      position: relative;
      border-left: 2px solid #CBD5E1;
      margin-left: 1rem;
      padding-left: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    @media (min-width: 640px) {
      .timeline-container {
        margin-left: 1.5rem;
        padding-left: 2.25rem;
      }
    }
    .timeline-row {
      position: relative;
    }
    .timeline-marker {
      position: absolute;
      left: -2.45rem;
      top: 0;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #059669;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.8rem;
      box-shadow: 0 0 0 4px #F8FAFC;
    }
    @media (min-width: 640px) {
      .timeline-marker {
        left: -2.95rem;
        width: 32px;
        height: 32px;
        font-size: 0.875rem;
      }
    }
    .timeline-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1rem;
      padding: 1.5rem 1.75rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
    }
    .timeline-tag {
      font-size: 0.65rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #059669;
      margin-bottom: 0.4rem;
    }
    .timeline-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }
    .timeline-body {
      font-size: 0.875rem;
      color: #475569;
      line-height: 1.55;
      margin-bottom: 1rem;
    }
    .timeline-metrics {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .metric-pill {
      font-size: 0.725rem;
      font-weight: 600;
      background: #F1F5F9;
      color: #334155;
      padding: 0.25rem 0.6rem;
      border-radius: 0.375rem;
      border: 1px solid #E2E8F0;
    }

    /* Architecture Cards */
    .arch-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1rem;
      padding: 1.5rem 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(15, 23, 42, 0.02);
      transition: all 0.2s ease;
    }
    .arch-card:hover {
      border-color: #CBD5E1;
      box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.06);
    }
    .arch-tier-pill {
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      padding: 0.25rem 0.65rem;
      border-radius: 0.4rem;
    }
    .tech-tag {
      font-family: var(--font-mono, monospace);
      font-size: 0.725rem;
      background: #F1F5F9;
      color: #334155;
      border: 1px solid #CBD5E1;
      padding: 0.2rem 0.55rem;
      border-radius: 0.35rem;
      font-weight: 500;
    }

    /* Science & Math Cards */
    .science-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1.25rem;
      padding: 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .math-terminal {
      background-color: #020617;
      color: #34D399;
      font-family: var(--font-mono, monospace);
      border-radius: 0.85rem;
      padding: 1.25rem;
      border: 1px solid #1E293B;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    /* FAQ Cards */
    .faq-item-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1.15rem;
      padding: 1.75rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
      transition: border-color 0.15s ease;
    }
    .faq-item-card:hover {
      border-color: #CBD5E1;
    }
    .faq-tag {
      font-size: 0.68rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 0.25rem 0.65rem;
      border-radius: 0.375rem;
      display: inline-block;
      margin-bottom: 0.6rem;
    }

    /* Bottom CTA Card */
    .docs-cta-card {
      margin-top: 3rem;
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1.25rem;
      padding: 2rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      align-items: flex-start;
      justify-content: space-between;
    }
    @media (min-width: 640px) {
      .docs-cta-card {
        flex-direction: row;
        align-items: center;
      }
    }
    .cta-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      shrink: 0;
    }

    .animate-fade {
      animation: fadeIn 0.2s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class DocsComponent {
  activeTab: 'simple' | 'flow' | 'system' | 'carbon' | 'passport' | 'faq' = 'simple';
}
