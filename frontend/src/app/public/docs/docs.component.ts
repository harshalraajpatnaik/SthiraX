import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="docs-page">
      <!-- Breadcrumb & Top Bar -->
      <section class="docs-hero bg-slate-900 border-b border-slate-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Public Knowledge Base & Architecture Hub
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            How SthiraX Works: <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Architecture, Flows & Science</span>
          </h1>
          <p class="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-6">
            Everything you need to understand our distributed CO₂-mineralization technology, industrial precast plant retrofits, end-to-end telemetry flow, and verified digital product passports — designed for beginners, enterprise buyers, and engineers alike.
          </p>

          <!-- Quick Navigation Pill Tabs -->
          <div class="flex flex-wrap gap-2 pt-2">
            <button 
              (click)="activeTab = 'simple'" 
              [class.bg-emerald-600]="activeTab === 'simple'"
              [class.bg-slate-800]="activeTab !== 'simple'"
              class="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all hover:bg-emerald-500 hover:text-white flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              60-Second Amateur Guide
            </button>
            <button 
              (click)="activeTab = 'flow'" 
              [class.bg-emerald-600]="activeTab === 'flow'"
              [class.bg-slate-800]="activeTab !== 'flow'"
              class="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all hover:bg-emerald-500 hover:text-white flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Industrial Value Chain Flow
            </button>
            <button 
              (click)="activeTab = 'system'" 
              [class.bg-emerald-600]="activeTab === 'system'"
              [class.bg-slate-800]="activeTab !== 'system'"
              class="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all hover:bg-emerald-500 hover:text-white flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
              Software & IoT Architecture
            </button>
            <button 
              (click)="activeTab = 'carbon'" 
              [class.bg-emerald-600]="activeTab === 'carbon'"
              [class.bg-slate-800]="activeTab !== 'carbon'"
              class="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all hover:bg-emerald-500 hover:text-white flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              Carbon Accounting & Chemistry
            </button>
            <button 
              (click)="activeTab = 'faq'" 
              [class.bg-emerald-600]="activeTab === 'faq'"
              [class.bg-slate-800]="activeTab !== 'faq'"
              class="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all hover:bg-emerald-500 hover:text-white flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Standards & FAQs
            </button>
          </div>
        </div>
      </section>

      <!-- Main Content Container -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <!-- ========================================== -->
        <!-- TAB 1: 60-SECOND GUIDE FOR AMATEURS        -->
        <!-- ========================================== -->
        <div *ngIf="activeTab === 'simple'" class="space-y-8 animate-fadeIn">
          <div class="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-2xl border border-emerald-800/40 shadow-xl">
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">💡</span>
              The SthiraX Concept Explained in Plain English
            </h2>
            <p class="text-slate-300 text-base leading-relaxed mb-6">
              You don't need a chemical engineering degree to understand what SthiraX does. Here is the entire business model in 4 simple steps:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- Step 1 -->
              <div class="bg-slate-900/90 p-5 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all">
                <div class="text-3xl mb-3">🏭</div>
                <div class="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">01. The Problem</div>
                <h3 class="text-lg font-bold text-white mb-2">Concrete Is Carbon-Heavy</h3>
                <p class="text-sm text-slate-400 leading-relaxed">
                  Making ordinary cement requires roasting limestone at 1450°C, releasing 8% of all global CO₂ emissions. Every building and road today carries that carbon footprint.
                </p>
              </div>

              <!-- Step 2 -->
              <div class="bg-slate-900/90 p-5 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all">
                <div class="text-3xl mb-3">💨</div>
                <div class="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">02. The Capture</div>
                <h3 class="text-lg font-bold text-white mb-2">We Collect Flue CO₂</h3>
                <p class="text-sm text-slate-400 leading-relaxed">
                  Instead of letting industrial smoke escape from distilleries and chemical plants, pure CO₂ is captured, liquefied into food-grade liquid, and transported via insulated tankers.
                </p>
              </div>

              <!-- Step 3 -->
              <div class="bg-slate-900/90 p-5 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all">
                <div class="text-3xl mb-3">⚗️</div>
                <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">03. The Mineralization</div>
                <h3 class="text-lg font-bold text-white mb-2">Gas Becomes Solid Stone</h3>
                <p class="text-sm text-slate-400 leading-relaxed">
                  Inside sealed curing chambers, CO₂ gas reacts with industrial byproducts (fly ash and slag). It converts permanently into solid calcium carbonate limestone inside the block!
                </p>
              </div>

              <!-- Step 4 -->
              <div class="bg-slate-900/90 p-5 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all">
                <div class="text-3xl mb-3">🧱</div>
                <div class="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">04. The Result</div>
                <h3 class="text-lg font-bold text-white mb-2">Superior Green Materials</h3>
                <p class="text-sm text-slate-400 leading-relaxed">
                  The pavers are 20% stronger, consume 25% less virgin cement, meet Indian Standards (IS 15658), and lock away 28–34 kg CO₂ per square meter forever.
                </p>
              </div>
            </div>
          </div>

          <!-- Amateur FAQ Callout Box -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <h4 class="font-bold text-white text-base mb-2 flex items-center gap-2">
                <span class="text-emerald-400">❓</span> Will the CO₂ ever leak out?
              </h4>
              <p class="text-sm text-slate-400 leading-relaxed">
                <strong>Never.</strong> This is not storing gas in a balloon. It is a chemical reaction that creates synthetic rock (limestone). The CO₂ is permanently locked in solid mineral form for millennia unless heated above 800°C.
              </p>
            </div>
            <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <h4 class="font-bold text-white text-base mb-2 flex items-center gap-2">
                <span class="text-emerald-400">❓</span> Does it cost twice as much?
              </h4>
              <p class="text-sm text-slate-400 leading-relaxed">
                <strong>No.</strong> Because accelerated CO₂ curing reduces Portland cement requirements and allows 60% fly ash/slag blends, material savings offset the CO₂ gas cost, making prices fully competitive (₹48/paver).
              </p>
            </div>
            <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <h4 class="font-bold text-white text-base mb-2 flex items-center gap-2">
                <span class="text-emerald-400">❓</span> How do buyers verify claims?
              </h4>
              <p class="text-sm text-slate-400 leading-relaxed">
                Every batch pallet carries a laser-etched or printed QR code linked to <a routerLink="/trace" class="text-emerald-400 underline font-semibold">SthiraX Trace™</a> showing Coriolis flow sensor readings, 28-day break tests, and SHA-256 digital proof.
              </p>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- TAB 2: INDUSTRIAL VALUE CHAIN FLOW         -->
        <!-- ========================================== -->
        <div *ngIf="activeTab === 'flow'" class="space-y-8 animate-fadeIn">
          <div class="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
            <div class="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <h2 class="text-2xl font-bold text-white">End-to-End Industrial Flow Architecture</h2>
                <p class="text-sm text-slate-400">Gate-to-gate operational progression from industrial emitter to certified delivery.</p>
              </div>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Hub-and-Spoke Regional Model
              </span>
            </div>

            <!-- Sequential Interactive Flow Steps -->
            <div class="relative border-l-2 border-emerald-500/30 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8 my-6">
              
              <!-- Flow Step 1 -->
              <div class="relative group">
                <div class="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-400">
                  1
                </div>
                <div class="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 group-hover:border-emerald-500/40 transition-all">
                  <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider">Source Point & Emitter Liquefaction</span>
                  <h3 class="text-lg font-bold text-white mt-1 mb-2">Industrial & Biogenic CO₂ Capture</h3>
                  <p class="text-sm text-slate-300 mb-3">
                    High-purity CO₂ (>98.5%) is captured from ethanol fermentation and chemical plants (e.g. Deccan Distilleries, Belagavi). Flue gas is scrubbed, compressed, and liquefied at -20°C and 20 bar.
                  </p>
                  <div class="flex flex-wrap gap-2 text-xs">
                    <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded">Feedstock: Biogenic Fermentation</span>
                    <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded">Transport: Insulated Road Tankers (18t)</span>
                    <span class="bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded">Delivered Cost: ₹6.50 – ₹8.50/kg</span>
                  </div>
                </div>
              </div>

              <!-- Flow Step 2 -->
              <div class="relative group">
                <div class="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-xs font-bold text-cyan-400">
                  2
                </div>
                <div class="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 group-hover:border-cyan-500/40 transition-all">
                  <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider">Precast Plant Retrofit Skid</span>
                  <h3 class="text-lg font-bold text-white mt-1 mb-2">Controlled Atmospheric Injection Manifold</h3>
                  <p class="text-sm text-slate-300 mb-3">
                    Existing precast steam kilns are upgraded with airtight silicone gaskets and our automated injection skid. Liquefied CO₂ is vaporized and metered via Coriolis mass-flow sensors into the chamber at 1.2 – 1.4 bar.
                  </p>
                  <div class="flex flex-wrap gap-2 text-xs">
                    <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded">Retrofit CapEx: ₹18.0 Lakhs</span>
                    <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded">Cycle Duration: 18 – 24 Hours</span>
                    <span class="bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded">Chamber Volume: 120 m³</span>
                  </div>
                </div>
              </div>

              <!-- Flow Step 3 -->
              <div class="relative group">
                <div class="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-400">
                  3
                </div>
                <div class="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 group-hover:border-emerald-500/40 transition-all">
                  <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Thermochemical Transformation</span>
                  <h3 class="text-lg font-bold text-white mt-1 mb-2">Accelerated Carbonation Mineralization</h3>
                  <p class="text-sm text-slate-300 mb-3">
                    CO₂ diffuses through pore networks in green concrete, reacting exothermically with free calcium hydroxide (Portlandite) to form nanostructured calcite (CaCO₃). This micro-crystalline matrix fills internal voids, radically increasing early strength.
                  </p>
                  <div class="flex flex-wrap gap-2 text-xs">
                    <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded">Uptake Efficiency: 82% – 88%</span>
                    <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded">Temperature: 45°C Controlled</span>
                    <span class="bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded">Early 24h Strength: 28+ MPa</span>
                  </div>
                </div>
              </div>

              <!-- Flow Step 4 -->
              <div class="relative group">
                <div class="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-xs font-bold text-amber-400">
                  4
                </div>
                <div class="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 group-hover:border-amber-500/40 transition-all">
                  <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">Independent Quality Assurance</span>
                  <h3 class="text-lg font-bold text-white mt-1 mb-2">NABL Laboratory Strength Break & Carbonation Depth Tests</h3>
                  <p class="text-sm text-slate-300 mb-3">
                    Core samples from every batch run are submitted to accredited NABL testing laboratories. 28-day compressive break tests confirm M40 / M50 structural compliance under IS 15658 standards.
                  </p>
                  <div class="flex flex-wrap gap-2 text-xs">
                    <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded">Target Strength: 45.0 MPa (Tested: 46.2 – 48.5 MPa)</span>
                    <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded">Phenolphthalein Test: Accelerated Carbonation</span>
                    <span class="bg-amber-950 text-amber-300 px-2.5 py-1 rounded">Governance: Dual Operations & QA Sign-off</span>
                  </div>
                </div>
              </div>

              <!-- Flow Step 5 -->
              <div class="relative group">
                <div class="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-400">
                  5
                </div>
                <div class="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 group-hover:border-emerald-500/40 transition-all">
                  <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Traceability & Delivery</span>
                  <h3 class="text-lg font-bold text-white mt-1 mb-2">Digital Product Passport Issuance & Site Dispatch</h3>
                  <p class="text-sm text-slate-300 mb-3">
                    Once QA approves, SthiraX generates a cryptographically signed Digital Product Passport. A tamper-evident QR code is issued and affixed to pallets. Infrastructure contractors scan on site to confirm ESG compliance and carbon savings.
                  </p>
                  <div class="flex flex-wrap gap-2 text-xs">
                    <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded">Cryptographic Proof: SHA-256 Hash</span>
                    <span class="bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded">Public URL: sthirax.com/passports/:id</span>
                    <span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded">Audit Trail: PostgreSQL Timestamped</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- TAB 3: SOFTWARE & IOT ARCHITECTURE        -->
        <!-- ========================================== -->
        <div *ngIf="activeTab === 'system'" class="space-y-8 animate-fadeIn">
          <div class="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
            <h2 class="text-2xl font-bold text-white mb-2">Technical System Architecture</h2>
            <p class="text-sm text-slate-400 mb-6">Designed as a modular monolith optimized for industrial reliability, high telemetry ingestion throughput, and low operational overhead.</p>

            <!-- 3-Tier Layered Diagram -->
            <div class="space-y-4">
              <!-- Frontend Layer -->
              <div class="bg-slate-950 p-5 rounded-xl border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-bold bg-cyan-500/20 text-cyan-400 uppercase">Presentation Layer</span>
                    <span class="text-xs text-slate-500">Port 4200</span>
                  </div>
                  <h3 class="text-base font-bold text-white mt-1">Angular 17 Standalone Single-Page Application</h3>
                  <p class="text-xs text-slate-400 mt-1 max-w-2xl">
                    Signals-ready, standalone components architecture. Includes public corporate portal, interactive economic feasibility calculators, and role-gated private Operations Console.
                  </p>
                </div>
                <div class="text-xs text-slate-300 bg-slate-900 px-3 py-2 rounded border border-slate-800 shrink-0">
                  Tailwind CSS &bull; Reactive Forms &bull; Leaflet GIS
                </div>
              </div>

              <!-- Connection Arrow -->
              <div class="flex justify-center text-slate-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>

              <!-- Backend Layer -->
              <div class="bg-slate-950 p-5 rounded-xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400 uppercase">Core Application Engine</span>
                    <span class="text-xs text-slate-500">Port 8088</span>
                  </div>
                  <h3 class="text-base font-bold text-white mt-1">Spring Boot 2.6 Modular Monolith (Java 17)</h3>
                  <p class="text-xs text-slate-400 mt-1 max-w-2xl">
                    Stateless REST API with Spring Security RBAC. Houses the Carbon Accounting Service (Gate-to-Gate mass balance), Plant Cost Calculation Engine, and Tamper-Evident Audit Logger.
                  </p>
                </div>
                <div class="text-xs text-slate-300 bg-slate-900 px-3 py-2 rounded border border-slate-800 shrink-0">
                  Springdoc OpenAPI 3.0 &bull; HikariCP &bull; BCrypt
                </div>
              </div>

              <!-- Connection Arrow -->
              <div class="flex justify-center text-slate-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>

              <!-- Database & IoT Layer -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-slate-950 p-5 rounded-xl border border-purple-500/30">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-bold bg-purple-500/20 text-purple-400 uppercase">Persistence Layer</span>
                    <span class="text-xs text-slate-500">Port 5432</span>
                  </div>
                  <h4 class="text-base font-bold text-white mt-1">PostgreSQL 15 Container</h4>
                  <p class="text-xs text-slate-400 mt-1">
                    Relational schema with persistent Docker volume. Stores 9 normalized entities (plants, suppliers, batches, passports, quality reviews, orders, enquiries, audit logs).
                  </p>
                </div>

                <div class="bg-slate-950 p-5 rounded-xl border border-amber-500/30">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-400 uppercase">Industrial Hardware Layer</span>
                    <span class="text-xs text-slate-500">Modbus TCP / MQTT</span>
                  </div>
                  <h4 class="text-base font-bold text-white mt-1">Coriolis Mass Flow Ingestion</h4>
                  <p class="text-xs text-slate-400 mt-1">
                    Direct integration with Endress+Hauser Promass Coriolis meters, chamber PT100 temperature probes, and differential pressure sensors for automated verification.
                  </p>
                </div>
              </div>
            </div>

            <!-- Swagger Interactive API Box -->
            <div class="mt-8 bg-emerald-950/30 border border-emerald-500/30 p-5 rounded-xl flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 class="text-sm font-bold text-white">Interactive Swagger OpenAPI Explorer Available</h4>
                <p class="text-xs text-slate-300 mt-0.5">Test endpoints, inspect DTO schemas, and review payload structures directly in your browser.</p>
              </div>
              <a href="http://localhost:8088/swagger-ui/index.html" target="_blank" class="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-all">
                <span>Open Swagger UI</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- TAB 4: CARBON ACCOUNTING & CHEMISTRY       -->
        <!-- ========================================== -->
        <div *ngIf="activeTab === 'carbon'" class="space-y-8 animate-fadeIn">
          <div class="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
            <h2 class="text-2xl font-bold text-white mb-2">Climate-Tech Carbon Accounting Boundaries</h2>
            <p class="text-sm text-slate-400 mb-6">SthiraX enforces strict scientific boundaries to prevent double-counting and carbon greenwashing.</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <!-- Equation Card -->
              <div class="bg-slate-950 p-6 rounded-xl border border-emerald-500/30">
                <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Chemical Reaction</div>
                <h3 class="text-lg font-bold text-white mb-2">Mineralization Stoichiometry</h3>
                <div class="p-4 bg-slate-900 rounded-lg font-mono text-emerald-300 text-sm mb-3">
                  Ca(OH)₂ + CO₂ &rarr; CaCO₃ + H₂O + 74.4 kJ/mol
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                  Thermodynamically exothermic reaction. Calcium hydroxide from hydrated cement and pozzolanic fines reacts with dissolved CO₂ to crystallize into stable calcium carbonate rock. Reaction is permanent and irreversible under ambient conditions.
                </p>
              </div>

              <!-- Boundary Card -->
              <div class="bg-slate-950 p-6 rounded-xl border border-cyan-500/30">
                <div class="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Carbon Accounting Metric</div>
                <h3 class="text-lg font-bold text-white mb-2">Net Gate-to-Gate Removal Formula</h3>
                <div class="p-4 bg-slate-900 rounded-lg font-mono text-cyan-300 text-xs sm:text-sm mb-3">
                  Net = CO₂_Mineralized &minus; (E_process + E_transport)
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                  Gross injected CO₂ is NOT equal to net removal. SthiraX explicitly deducts parasitic blower electricity (0.04 kg CO₂/kWh) and road cryogenic tanker transport (0.082 kg CO₂/tonne-km) from the final certified claim.
                </p>
              </div>
            </div>

            <!-- Boundary Distinction Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-400 uppercase text-xs">
                    <th class="py-3 px-4">Metric</th>
                    <th class="py-3 px-4">Definition</th>
                    <th class="py-3 px-4">Typical Value (per m²)</th>
                    <th class="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60">
                  <tr>
                    <td class="py-3 px-4 font-bold text-white">Gross CO₂ Injected</td>
                    <td class="py-3 px-4 text-slate-400">Total gas metered into the curing chamber</td>
                    <td class="py-3 px-4 font-mono text-slate-200">32.0 kg</td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300">Measured (Coriolis)</span></td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-bold text-emerald-400">Gross Mineralized</td>
                    <td class="py-3 px-4 text-slate-400">CO₂ chemically converted into solid calcite</td>
                    <td class="py-3 px-4 font-mono text-emerald-300">28.5 kg (89%)</td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-xs bg-emerald-950 text-emerald-400">TGA Validated</span></td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-bold text-cyan-400">Net Gate-to-Gate Removal</td>
                    <td class="py-3 px-4 text-slate-400">Gross mineralized minus parasitic electricity & transport</td>
                    <td class="py-3 px-4 font-mono text-cyan-300">25.1 kg</td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-xs bg-cyan-950 text-cyan-400">Certified Claim</span></td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-bold text-amber-400">Avoided Emissions</td>
                    <td class="py-3 px-4 text-slate-400">Displaced virgin Portland cement via pozzolanic blends</td>
                    <td class="py-3 px-4 font-mono text-amber-300">14.8 kg</td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-xs bg-amber-950 text-amber-400">Separate LCA Metric</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- TAB 5: STANDARDS & FAQS                    -->
        <!-- ========================================== -->
        <div *ngIf="activeTab === 'faq'" class="space-y-8 animate-fadeIn">
          <div class="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
            <h2 class="text-2xl font-bold text-white mb-2">Indian Standards & Frequently Asked Questions</h2>
            <p class="text-sm text-slate-400 mb-6">Certified testing compliance and answers for plant owners, procurement executives, and consumers.</p>

            <div class="space-y-4">
              <div class="bg-slate-950 p-5 rounded-xl border border-slate-800">
                <h3 class="text-base font-bold text-emerald-400 mb-2">Which Bureau of Indian Standards (BIS) specifications apply?</h3>
                <p class="text-sm text-slate-300 leading-relaxed">
                  All SthiraX products are formulated to exceed standard Indian construction specifications:
                  <br>&bull; <strong>IS 15658:2006</strong>: Precast Concrete Blocks for Paving (M35 – M50 commercial grades).
                  <br>&bull; <strong>IS 2185 Part 1:2005</strong>: Concrete Masonry Blocks (Solid and Hollow load-bearing units).
                  <br>&bull; <strong>IRC:SP:63</strong>: Guidelines for Interlocking Concrete Block Pavements in Highway Infrastructure.
                  <br>&bull; <strong>CPCB C&D Waste Rules, 2025</strong>: Mandates 20%–50% recycled aggregate utilization in municipal works.
                </p>
              </div>

              <div class="bg-slate-950 p-5 rounded-xl border border-slate-800">
                <h3 class="text-base font-bold text-emerald-400 mb-2">Can a precast manufacturer keep using existing curing chambers?</h3>
                <p class="text-sm text-slate-300 leading-relaxed">
                  <strong>Yes, absolutely.</strong> That is the core of our retrofit strategy. Instead of spending ₹5+ Crore on building a brand new plant, we install our turnkey skid (CO₂ vaporization manifold, airtight chamber gaskets, safety sensors, and telemetry controller) onto your existing steam or ambient curing sheds in 3 weeks for ~₹18 Lakhs.
                </p>
              </div>

              <div class="bg-slate-950 p-5 rounded-xl border border-slate-800">
                <h3 class="text-base font-bold text-emerald-400 mb-2">What is the delivery radius for liquid CO₂ tankers?</h3>
                <p class="text-sm text-slate-300 leading-relaxed">
                  Our regional cluster analysis indicates an optimal economic logistics radius of <strong>80 – 150 km</strong> from cryogenic liquefaction nodes (e.g. Bangalore-Hosur hub, Chennai-Sri City, Belagavi). Beyond 200 km, road freight parasitics reduce net removal efficiency.
                </p>
              </div>

              <div class="bg-slate-950 p-5 rounded-xl border border-slate-800">
                <h3 class="text-base font-bold text-emerald-400 mb-2">Are carbon credits guaranteed as upfront revenue?</h3>
                <p class="text-sm text-slate-300 leading-relaxed">
                  <strong>No.</strong> SthiraX treats carbon credits strictly as a non-guaranteed commercial upside. Our plant economics are designed to be profitable on precast material margins alone (selling pavers and blocks competitively to infrastructure contractors). When third-party VVB validation is completed under Puro.earth or India's CCTS, offtake proceeds provide bonus dividends.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action Banner -->
        <div class="mt-12 bg-gradient-to-r from-emerald-900/60 to-slate-900 p-8 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 class="text-xl sm:text-2xl font-bold text-white">Ready to explore actual sample batches?</h3>
            <p class="text-sm text-slate-300 mt-1">Look up verified Digital Product Passports with real telemetry and laboratory test data.</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <a routerLink="/trace" class="btn btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2">
              <span>View SthiraX Trace™</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a routerLink="/tools" class="btn btn-secondary px-5 py-2.5 rounded-lg text-sm font-semibold">
              Economics Calculators
            </a>
          </div>
        </div>

      </main>
    </div>
  `,
  styles: [`
    .docs-page {
      background-color: var(--color-bg-base, #0F172A);
      min-height: calc(100vh - 70px);
    }
    .animate-fadeIn {
      animation: fadeIn 0.25s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class DocsComponent {
  activeTab: 'simple' | 'flow' | 'system' | 'carbon' | 'faq' = 'simple';
}
