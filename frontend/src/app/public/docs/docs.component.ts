import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="docs-hub-root">
      
      <!-- Premium Hero Header -->
      <section class="docs-hero-section">
        <div class="container-wide">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            <span>PUBLIC KNOWLEDGE BASE &bull; SYSTEM ARCHITECTURE &bull; VALUE CHAIN FLOWS</span>
          </div>

          <h1 class="hero-title">
            How SthiraX Works: <span class="gradient-text">Architecture, Flows & Science</span>
          </h1>

          <p class="hero-lead">
            A clear, visual guide designed for infrastructure buyers, precast plant owners, and curious observers alike. Discover how industrial CO₂ emissions are permanently transformed into certified high-strength precast concrete.
          </p>

          <!-- Interactive Nav Tabs / Segmented Control -->
          <div class="segmented-nav">
            <button 
              type="button"
              (click)="activeTab = 'simple'" 
              [class.active]="activeTab === 'simple'"
              class="tab-btn">
              <span class="tab-icon">💡</span>
              <span class="tab-text">60-Second Beginner Guide</span>
            </button>

            <button 
              type="button"
              (click)="activeTab = 'flow'" 
              [class.active]="activeTab === 'flow'"
              class="tab-btn">
              <span class="tab-icon">🔄</span>
              <span class="tab-text">Industrial Value Chain Flow</span>
            </button>

            <button 
              type="button"
              (click)="activeTab = 'system'" 
              [class.active]="activeTab === 'system'"
              class="tab-btn">
              <span class="tab-icon">🏗️</span>
              <span class="tab-text">Software & IoT Architecture</span>
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
        <!-- TAB 1: 60-SECOND GUIDE FOR AMATEURS        -->
        <!-- ========================================== -->
        <section *ngIf="activeTab === 'simple'" class="tab-pane animate-fade">
          
          <!-- Key Callout Card -->
          <div class="overview-banner mb-10">
            <div class="banner-badge">Simple Analogy</div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Think of it like turning fizzy soda gas into natural granite stone.
            </h2>
            <p class="text-slate-600 text-base leading-relaxed max-w-4xl">
              Concrete is the world's most consumed material after water, producing 8% of all global greenhouse gases. SthiraX changes the equation: instead of emitting CO₂, we capture it from factory exhaust and inject it into curing concrete, permanently trapping it forever as mineralized rock.
            </p>
          </div>

          <!-- 4 Clean Step Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            <!-- Step 1 -->
            <div class="step-card">
              <div class="step-num step-num-rose">01</div>
              <div class="step-badge text-rose-700 bg-rose-50 border-rose-200">The Problem</div>
              <h3 class="step-title">Cement Emits Heavy CO₂</h3>
              <p class="step-desc">
                Roasting limestone at 1450°C releases immense carbon into the sky. Every footpath paver and drain cover historically carried this heavy carbon footprint.
              </p>
            </div>

            <!-- Step 2 -->
            <div class="step-card">
              <div class="step-num step-num-cyan">02</div>
              <div class="step-badge text-cyan-700 bg-cyan-50 border-cyan-200">The Harvest</div>
              <h3 class="step-title">We Trap Factory Exhaust</h3>
              <p class="step-desc">
                From ethanol distilleries and chemical fermenters, high-purity CO₂ is captured, liquefied, and safely transported in cryogenic road tankers to regional precast clusters.
              </p>
            </div>

            <!-- Step 3 -->
            <div class="step-card">
              <div class="step-num step-num-emerald">03</div>
              <div class="step-badge text-emerald-700 bg-emerald-50 border-emerald-200">The Reaction</div>
              <h3 class="step-title">Gas Becomes Solid Stone</h3>
              <p class="step-desc">
                Inside sealed curing kilns, CO₂ reacts with industrial byproducts (fly ash & slag), crystallizing into solid calcium carbonate rock. It can <strong>never</strong> evaporate.
              </p>
            </div>

            <!-- Step 4 -->
            <div class="step-card">
              <div class="step-num step-num-emerald">04</div>
              <div class="step-badge text-emerald-800 bg-emerald-100 border-emerald-300">The Result</div>
              <h3 class="step-title">Stronger, Greener Blocks</h3>
              <p class="step-desc">
                The resulting pavers achieve 45+ MPa compressive strength (20% higher than standard), reduce virgin cement by 25%, and lock up 28–34 kg CO₂ per m².
              </p>
            </div>

          </div>

          <!-- Executive Material Benchmark Comparison Cards -->
          <div class="benchmark-section mt-10">
            <div class="benchmark-header mb-6">
              <span class="text-xs font-mono font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 inline-block mb-2">Empirical Material Benchmark</span>
              <h3 class="text-2xl font-bold text-slate-900 tracking-tight">
                Ordinary Precast Concrete vs. SthiraX Carbon-Cured Precast
              </h3>
              <p class="text-slate-600 text-sm max-w-3xl mt-1">
                Side-by-side technical performance matrix across carbon balance, mechanical compressive load, recycled secondary binder uptake, and proof verification.
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
                      <span class="text-xs text-slate-500">Gate-to-gate lifecycle emissions footprint</span>
                    </div>
                  </div>
                </div>
                
                <div class="benchmark-split mt-4">
                  <div class="split-col standard">
                    <span class="split-label">Traditional Precast</span>
                    <div class="split-value text-rose-600 font-mono font-bold">+350 to +450 kg</div>
                    <p class="split-desc">CO₂e emitted per tonne due to intensive virgin clinker calcination.</p>
                  </div>
                  <div class="split-col sthirax">
                    <span class="split-label">SthiraX Carbonation</span>
                    <div class="split-value text-emerald-700 font-mono font-bold">Permanently Sequestered</div>
                    <p class="split-desc">Exothermic mineralization locks up to 34 kg CO₂ per m² into stable rock.</p>
                  </div>
                </div>

                <div class="benchmark-footer mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="text-slate-500">Why It Matters:</span>
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
                      <h4 class="font-bold text-slate-900 text-base">28-Day Compressive Strength</h4>
                      <span class="text-xs text-slate-500">Mechanical load tolerance under IS 15658 / IS 2185</span>
                    </div>
                  </div>
                </div>
                
                <div class="benchmark-split mt-4">
                  <div class="split-col standard">
                    <span class="split-label">Traditional Precast</span>
                    <div class="split-value text-slate-700 font-mono font-bold">35 – 40 MPa</div>
                    <p class="split-desc">Requires 28 days of wet curing; susceptible to internal pore voids.</p>
                  </div>
                  <div class="split-col sthirax">
                    <span class="split-label">SthiraX Carbonation</span>
                    <div class="split-value text-emerald-700 font-mono font-bold">46.2 – 48.5 MPa</div>
                    <p class="split-desc">+22% gain over M40 spec achieved within 24 hours via micro-pore sealing.</p>
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
                      <span class="text-xs text-slate-500">Secondary binders, slag, fly ash & C&D waste uptake</span>
                    </div>
                  </div>
                </div>
                
                <div class="benchmark-split mt-4">
                  <div class="split-col standard">
                    <span class="split-label">Traditional Precast</span>
                    <div class="split-value text-slate-700 font-mono font-bold">10% – 15% Max</div>
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
                      <span class="text-xs text-slate-500">Batch-level traceability and sensor telemetry proof</span>
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
              How captured gas journeys from ethanol distilleries to finished footpath pavers in 5 transparent, verifiable stages:
            </p>
          </div>

          <!-- Vertical Timeline with High-Contrast Stage Cards -->
          <div class="timeline-container">
            
            <!-- Stage 1 -->
            <div class="timeline-row">
              <div class="timeline-marker">1</div>
              <div class="timeline-card">
                <div class="timeline-tag">STAGE 01 &bull; SOURCE OFFTAKE</div>
                <h3 class="timeline-title">Biogenic CO₂ Capture & Cryogenic Liquefaction</h3>
                <p class="timeline-body">
                  High-purity CO₂ (>98.5%) is captured from industrial fermentation (e.g., Deccan Distilleries, Belagavi). The gas is scrubbed, compressed, and liquefied at -20°C / 20 bar, then loaded into 18-tonne vacuum-insulated cryogenic road tankers.
                </p>
                <div class="timeline-metrics">
                  <span class="metric-pill">Feedstock: Biogenic Ethanol Flue</span>
                  <span class="metric-pill">Purity: >98.5% Vol</span>
                  <span class="metric-pill">Logistics: Cryo Tankers (80–120 km)</span>
                </div>
              </div>
            </div>

            <!-- Stage 2 -->
            <div class="timeline-row">
              <div class="timeline-marker">2</div>
              <div class="timeline-card">
                <div class="timeline-tag">STAGE 02 &bull; PLANT RETROFIT</div>
                <h3 class="timeline-title">Modular Precast Kiln Skid & Controlled Injection</h3>
                <p class="timeline-body">
                  Existing partner precast sheds (e.g. Hosur Pilot Facility) are upgraded with airtight silicone door gaskets, vaporization manifolds, and Coriolis mass-flow meters. Liquefied CO₂ is vaporized and metered into curing enclosures at 1.2 – 1.4 bar.
                </p>
                <div class="timeline-metrics">
                  <span class="metric-pill">Retrofit CapEx: ~₹18.0 Lakhs</span>
                  <span class="metric-pill">Install Time: 3 Weeks</span>
                  <span class="metric-pill">Pressure: 1.25 bar Controlled</span>
                </div>
              </div>
            </div>

            <!-- Stage 3 -->
            <div class="timeline-row">
              <div class="timeline-marker">3</div>
              <div class="timeline-card">
                <div class="timeline-tag">STAGE 03 &bull; THERMOCHEMICAL REACTION</div>
                <h3 class="timeline-title">Accelerated Carbonation Curing (18–24 Hours)</h3>
                <p class="timeline-body">
                  CO₂ gas diffuses into porous fresh concrete, reacting exothermically with free calcium hydroxide (Portlandite) to form microscopic calcite crystals (CaCO₃). This seals micro-capillaries, delivering 28-day target strength in just 24 hours.
                </p>
                <div class="timeline-metrics">
                  <span class="metric-pill">Curing Cycle: 18 – 24 Hours</span>
                  <span class="metric-pill">Reaction Yield: 85% – 89%</span>
                  <span class="metric-pill">Chamber Temp: 45°C Controlled</span>
                </div>
              </div>
            </div>

            <!-- Stage 4 -->
            <div class="timeline-row">
              <div class="timeline-marker">4</div>
              <div class="timeline-card">
                <div class="timeline-tag">STAGE 04 &bull; QUALITY AUDIT</div>
                <h3 class="timeline-title">NABL Laboratory Compressive Strength Break Tests</h3>
                <p class="timeline-body">
                  Core sample specimens from every batch run are crushed in calibrated compressive testing machines. Independent NABL-accredited test reports verify M40 / M50 strength compliance under Indian Standards (IS 15658 / IS 2185).
                </p>
                <div class="timeline-metrics">
                  <span class="metric-pill">Target: 40.0 MPa (Achieved: 46.2 – 48.5 MPa)</span>
                  <span class="metric-pill">Standard: IS 15658:2006</span>
                  <span class="metric-pill">Carbonation Depth: Verified by Phenolphthalein</span>
                </div>
              </div>
            </div>

            <!-- Stage 5 -->
            <div class="timeline-row">
              <div class="timeline-marker">5</div>
              <div class="timeline-card">
                <div class="timeline-tag">STAGE 05 &bull; DIGITAL PASSPORT</div>
                <h3 class="timeline-title">Cryptographic Digital Product Passport & Site Delivery</h3>
                <p class="timeline-body">
                  Approved batches generate an immutable Digital Product Passport. A tamper-evident QR code is affixed to every shipping pallet. Site engineers and sustainability auditors scan the code to inspect gas injection logs, NABL lab certificates, and net carbon balances.
                </p>
                <div class="timeline-metrics">
                  <span class="metric-pill">Cryptographic Proof: SHA-256 Hash</span>
                  <span class="metric-pill">Passport Status: Publicly Verifiable</span>
                  <span class="metric-pill">Audit Trail: PostgreSQL Timestamped</span>
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
              Software & Industrial Hardware Architecture
            </h2>
            <p class="text-slate-600 text-base max-w-3xl mt-1">
              Engineered as a high-reliability, modular monolith designed for industrial telemetry ingestion, zero data loss, and seamless operational audits:
            </p>
          </div>

          <!-- Clean Tiered System Cards -->
          <div class="space-y-6 mb-10">
            
            <!-- Tier 1: Client Layer -->
            <div class="arch-card border-l-4 border-l-cyan-500">
              <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
                <span class="arch-tier-pill text-cyan-800 bg-cyan-100">CLIENT & AUDITOR INTERFACE</span>
                <span class="font-mono text-xs text-slate-500">Port 4200 &bull; Single-Page App</span>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">Angular 17 Standalone Architecture</h3>
              <p class="text-sm text-slate-600 leading-relaxed mb-3">
                Reactive, modern TypeScript frontend featuring standalone components, Tailwind CSS styling, responsive layout controls, and client-side economic calculators. Integrates role-based route guards for Operations Managers, Plant Operators, and QA Reviewers.
              </p>
              <div class="flex flex-wrap gap-2 text-xs">
                <span class="tech-tag">Angular 17</span>
                <span class="tech-tag">Tailwind CSS</span>
                <span class="tech-tag">Reactive Forms</span>
                <span class="tech-tag">Standalone Components</span>
              </div>
            </div>

            <!-- Tier 2: Application Layer -->
            <div class="arch-card border-l-4 border-l-emerald-500">
              <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
                <span class="arch-tier-pill text-emerald-800 bg-emerald-100">CORE APPLICATION ENGINE</span>
                <span class="font-mono text-xs text-slate-500">Port 8088 &bull; REST API</span>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">Spring Boot 2.6 Modular Monolith (Java 17)</h3>
              <p class="text-sm text-slate-600 leading-relaxed mb-3">
                High-throughput, stateless Spring Boot service housing the Carbon Accounting Service (Gate-to-Gate mass balance engine), Retrofit Economics Engine, and Tamper-Evident Audit Logger. Exposes full OpenAPI 3.0 documentation via interactive Swagger UI.
              </p>
              <div class="flex flex-wrap gap-2 text-xs">
                <span class="tech-tag">Java 17</span>
                <span class="tech-tag">Spring Security RBAC</span>
                <span class="tech-tag">Springdoc OpenAPI 3.0</span>
                <span class="tech-tag">HikariCP Pool</span>
              </div>
            </div>

            <!-- Tier 3: Persistence & IoT Layer -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div class="arch-card border-l-4 border-l-purple-500">
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="arch-tier-pill text-purple-800 bg-purple-100">PERSISTENCE TIER</span>
                  <span class="font-mono text-xs text-slate-500">Port 5432</span>
                </div>
                <h4 class="text-base font-bold text-slate-900 mb-1">PostgreSQL 15 (Dockerized)</h4>
                <p class="text-xs text-slate-600 leading-relaxed mb-3">
                  Persistent Docker container volume storage. Houses 9 relational tables: plants, suppliers, batches, curing telemetry, product passports, enquiries, and immutable audit logs.
                </p>
                <div class="flex flex-wrap gap-1.5 text-xs">
                  <span class="tech-tag">Docker Compose</span>
                  <span class="tech-tag">Health Checks</span>
                  <span class="tech-tag">Persistent Volumes</span>
                </div>
              </div>

              <div class="arch-card border-l-4 border-l-amber-500">
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="arch-tier-pill text-amber-800 bg-amber-100">IOT HARDWARE INGESTION</span>
                  <span class="font-mono text-xs text-slate-500">Modbus TCP</span>
                </div>
                <h4 class="text-base font-bold text-slate-900 mb-1">Coriolis Mass Flow Ingestion</h4>
                <p class="text-xs text-slate-600 leading-relaxed mb-3">
                  Direct physical sensor integration with Endress+Hauser Promass Coriolis meters, chamber thermocouple arrays, and pressure transducers to record tamper-proof mass balance data.
                </p>
                <div class="flex flex-wrap gap-1.5 text-xs">
                  <span class="tech-tag">Coriolis Flow Sensors</span>
                  <span class="tech-tag">PT100 Probes</span>
                  <span class="tech-tag">Differential Pressure</span>
                </div>
              </div>

            </div>

          </div>

          <!-- Interactive API Explorer CTA Card -->
          <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8 rounded-xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
            <div>
              <div class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Developer & Integration Access</div>
              <h3 class="text-xl font-bold text-white">Interactive Swagger OpenAPI Explorer</h3>
              <p class="text-sm text-slate-300 mt-1 max-w-xl">
                Inspect REST endpoints, test live batch submissions, and review JSON schema contracts directly in your browser.
              </p>
            </div>
            <a href="http://localhost:8088/swagger-ui/index.html" target="_blank" class="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shrink-0">
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
              Carbon Accounting & Reaction Chemistry
            </h2>
            <p class="text-slate-600 text-base max-w-3xl mt-1">
              Scientific boundary definitions distinguishing gross mineralized carbon, gate-to-gate net removal, and avoided scope 3 emissions:
            </p>
          </div>

          <!-- Chemistry & Math Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <span class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full uppercase">Thermodynamic Chemistry</span>
              <h3 class="text-lg font-bold text-slate-900 mt-3 mb-2">Mineralization Reaction Stoichiometry</h3>
              <div class="bg-slate-900 text-emerald-400 font-mono text-sm p-4 rounded-lg my-3 overflow-x-auto">
                Ca(OH)₂ + CO₂ &rarr; CaCO₃ + H₂O (&Delta;H = &minus;74.4 kJ/mol)
              </div>
              <p class="text-sm text-slate-600 leading-relaxed">
                The carbonation reaction is naturally exothermic. Free calcium hydroxide (Portlandite) present in hydrating cement combines with dissolved aqueous CO₂ to precipitate synthetic calcium carbonate (calcite). The crystal structure permanently bonds into the aggregate matrix.
              </p>
            </div>

            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <span class="text-xs font-bold text-cyan-700 bg-cyan-50 border-cyan-200 px-2.5 py-1 rounded-full uppercase">Gate-to-Gate Boundary</span>
              <h3 class="text-lg font-bold text-slate-900 mt-3 mb-2">Net Physical Removal Equation</h3>
              <div class="bg-slate-900 text-cyan-400 font-mono text-sm p-4 rounded-lg my-3 overflow-x-auto">
                Net_Removal = CO₂_Mineralized &minus; (E_process + E_transport)
              </div>
              <p class="text-sm text-slate-600 leading-relaxed">
                Gross injected gas is NOT the same as certified net removal. SthiraX explicitly deducts parasitic electricity consumed by kiln blowers (0.04 kg CO₂/kWh) and diesel consumed by cryogenic road tankers (0.082 kg CO₂/tonne-km) before calculating net sequestered tons.
              </p>
            </div>

          </div>

          <!-- Detailed Boundary Comparison Card -->
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900 mb-4">Boundary Hierarchy & Disclosure Standards</h3>
            <div class="space-y-4">
              <div class="p-4 bg-slate-50 rounded-lg border border-slate-200/80">
                <div class="font-bold text-slate-900 text-sm">1. Gross Injected CO₂ (Physical Input)</div>
                <p class="text-xs text-slate-600 mt-1">Total mass of vaporized industrial gas metered into the chamber via Coriolis flow meter. Typically 32.0 kg / m².</p>
              </div>

              <div class="p-4 bg-emerald-50/60 rounded-lg border border-emerald-200">
                <div class="font-bold text-emerald-900 text-sm">2. Gross Mineralized CO₂ (Permanent Calcite)</div>
                <p class="text-xs text-emerald-800 mt-1">Gas chemically bound as solid calcium carbonate rock, verified via Thermal Gravimetric Analysis (TGA) & differential mass balance. Typically 28.5 kg / m² (89% uptake).</p>
              </div>

              <div class="p-4 bg-cyan-50/60 rounded-lg border border-cyan-200">
                <div class="font-bold text-cyan-900 text-sm">3. Net Gate-to-Gate Carbon Removal (Certified Claim)</div>
                <p class="text-xs text-cyan-800 mt-1">Gross mineralized carbon minus all process parasitic emissions (cryogenic trucking, vaporization energy, exhaust blowers). Typically 25.1 kg / m².</p>
              </div>

              <div class="p-4 bg-amber-50/60 rounded-lg border border-amber-200">
                <div class="font-bold text-amber-900 text-sm">4. Scope 3 Avoided Emissions (Substitution Baseline)</div>
                <p class="text-xs text-amber-800 mt-1">Emissions avoided by displacing virgin ordinary Portland cement through supplementary slag and fly ash pozzolans. Reported separately in LCA to maintain integrity.</p>
              </div>
            </div>
          </div>

        </section>

        <!-- ========================================== -->
        <!-- TAB 5: STANDARDS & FAQS                    -->
        <!-- ========================================== -->
        <section *ngIf="activeTab === 'faq'" class="tab-pane animate-fade">
          
          <div class="section-intro mb-8">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Indian Standards & Frequently Asked Questions
            </h2>
            <p class="text-slate-600 text-base max-w-3xl mt-1">
              Clear answers to technical compliance, economics, and operational questions for contractors and plant partners:
            </p>
          </div>

          <!-- FAQ Cards with Generous Spacing -->
          <div class="space-y-4 mb-10">
            
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span class="text-emerald-600">✓</span> Does SthiraX precast meet Bureau of Indian Standards (BIS)?
              </h3>
              <p class="text-sm text-slate-600 leading-relaxed">
                Yes. All materials are engineered and laboratory-tested to satisfy or exceed Indian national codes:
                <br>&bull; <strong>IS 15658:2006</strong>: Precast Concrete Blocks for Paving (M35 – M50 commercial grades).
                <br>&bull; <strong>IS 2185 Part 1:2005</strong>: Concrete Masonry Blocks (Solid load-bearing units).
                <br>&bull; <strong>IRC:SP:63</strong>: Interlocking Concrete Block Pavement guidelines for heavy-traffic municipal highways.
                <br>&bull; <strong>CPCB C&D Waste Rules, 2025</strong>: Certified 20% to 50% recycled aggregate content.
              </p>
            </div>

            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span class="text-emerald-600">✓</span> What changes are needed at an existing precast plant?
              </h3>
              <p class="text-sm text-slate-600 leading-relaxed">
                No new factory construction is required. SthiraX installs a modular, skid-mounted vaporization manifold onto existing curing rooms, adds airtight silicone perimeter seals, and connects Coriolis gas meters and telemetry probes. Retrofit downtime is typically under 3 weeks.
              </p>
            </div>

            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span class="text-emerald-600">✓</span> What is the payback period for a precast plant retrofit?
              </h3>
              <p class="text-sm text-slate-600 leading-relaxed">
                At an average annual volume of 12,000 tonnes and retrofit CapEx of ₹18 Lakhs, cement savings (replacing 20% OPC with fly ash/slag) combined with premium low-carbon selling prices deliver full capital payback within <strong>1.4 to 1.8 years</strong>.
              </p>
            </div>

            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span class="text-emerald-600">✓</span> Are carbon removal credits needed for the business to be profitable?
              </h3>
              <p class="text-sm text-slate-600 leading-relaxed">
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
    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #34D399;
      box-shadow: 0 0 8px #34D399;
    }
    .hero-title {
      font-size: 2.25rem;
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.15;
      margin-bottom: 0.75rem;
      max-width: 900px;
    }
    @media (min-width: 640px) {
      .hero-title { font-size: 3rem; }
    }
    .gradient-text {
      background: linear-gradient(135deg, #34D399 0%, #38BDF8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-lead {
      font-size: 1rem;
      color: #94A3B8;
      max-width: 760px;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    
    /* Segmented Nav Tabs */
    .segmented-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding-top: 0.5rem;
    }
    .tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.825rem;
      font-weight: 600;
      color: #CBD5E1;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(51, 65, 85, 0.8);
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .tab-btn:hover {
      background: #334155;
      color: #ffffff;
    }
    .tab-btn.active {
      background: #059669;
      color: #ffffff;
      border-color: #10B981;
      box-shadow: 0 4px 12px rgba(5, 150, 105, 0.35);
    }

    /* Overview Banner */
    .overview-banner {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
      position: relative;
    }
    .banner-badge {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #059669;
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      margin-bottom: 0.75rem;
    }

    /* Step Cards */
    .step-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 1rem;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
      position: relative;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .step-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
    }
    .step-num {
      font-size: 2.25rem;
      font-weight: 900;
      line-height: 1;
      margin-bottom: 0.75rem;
    }
    .step-num-rose { color: #F43F5E; }
    .step-num-cyan { color: #06B6D4; }
    .step-num-emerald { color: #10B981; }
    
    .step-badge {
      display: inline-block;
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 0.15rem 0.5rem;
      border-radius: 0.25rem;
      border-width: 1px;
      margin-bottom: 0.75rem;
    }
    .step-title {
      font-size: 1.05rem;
      font-weight: 800;
      color: #0F172A;
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }
    .step-desc {
      font-size: 0.85rem;
      color: #64748B;
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
      font-size: 0.8rem;
      font-weight: 800;
      box-shadow: 0 0 0 4px #F8FAFC;
    }
    @media (min-width: 640px) {
      .timeline-marker {
        left: -3rem;
        width: 32px;
        height: 32px;
        font-size: 0.85rem;
      }
    }
    .timeline-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 0.875rem;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
    }
    .timeline-tag {
      font-size: 0.68rem;
      font-weight: 700;
      color: #059669;
      letter-spacing: 0.08em;
      margin-bottom: 0.35rem;
    }
    .timeline-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: #0F172A;
      margin-bottom: 0.5rem;
    }
    .timeline-body {
      font-size: 0.875rem;
      color: #475569;
      line-height: 1.6;
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
    }

    /* Architecture Tier Cards */
    .arch-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 0.875rem;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
    }
    .arch-tier-pill {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 0.2rem 0.5rem;
      border-radius: 0.25rem;
    }
    .tech-tag {
      font-size: 0.7rem;
      font-weight: 600;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      color: #475569;
      padding: 0.2rem 0.5rem;
      border-radius: 0.3rem;
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
  activeTab: 'simple' | 'flow' | 'system' | 'carbon' | 'faq' = 'simple';
}
