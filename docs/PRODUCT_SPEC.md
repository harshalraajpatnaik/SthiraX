# SthiraX Platform Product Specification

## 1. Executive Summary & Problem Space

In India's rapidly urbanising infrastructure economy, conventional concrete production accounts for over 7% of national greenhouse gas emissions, primarily driven by the calcination and clinker burning of Ordinary Portland Cement (OPC). Concurrently, point-source industrial emitters (distilleries, ammonia plants, chemical refineries) vent high-purity biogenic and industrial CO₂.

**SthiraX** is a distributed CO₂-mineralization technology and operations management platform. Rather than building expensive greenfield manufacturing facilities, SthiraX deploys an asset-light retrofit model:
1. Converting captured, industrial-grade point-source CO₂ into pressurized curing gas.
2. Retrofitting independently operated, regional precast concrete facilities with gas-sealed curing enclosures and automated Coriolis mass-flow dosing systems.
3. Mineralizing gaseous CO₂ into thermodynamically stable calcium carbonates ($CaCO_3$) within non-structural precast products (interlocking pavers, solid masonry blocks, kerbstones, stormwater drain slabs).
4. Generating verifiable, tamper-evident Digital Product Passports (**SthiraX Trace™**) backed by NABL-accredited compressive strength reports and ISO 14064-2 gate-to-gate carbon accounting.

---

## 2. User Personas & Value Propositions

### 2.1 Regional Precast Concrete Manufacturer (Partner)
* **Profile**: Operates an automated block press plant producing 10,000–30,000 tonnes of precast pavers and masonry blocks annually.
* **Pain Point**: High cement input costs (₹360–₹420 per 50 kg bag), 14–28 day water-curing curing bottleneck, yard space congestion, and margin commoditization.
* **SthiraX Value Proposition**:
  * Early 24-hour compressive strength gain allows 15–20% OPC binder reduction by substituting low-cost supplementary cementitious materials (fly ash, GGBS).
  * Reduced curing duration from 14 days wet curing to 12–16 hours CO₂ carbonation curing.
  * Turnkey retrofit package with modular capex payback in 8–14 months.
  * Access to institutional corporate procurement contracts commanding green precast premiums.

### 2.2 Industrial CO₂ Point-Source Emitter (Supplier)
* **Profile**: Operates an ethanol distillery, grain fermentation plant, fertilizer complex, or chemical plant generating 10–100 TPD of 95%+ purity CO₂.
* **Pain Point**: Vented emissions, regulatory scrutiny, intermittent merchant gas demand.
* **SthiraX Value Proposition**: Long-term offtake agreements (3–5 years) with regional supply aggregation and predictable tanker logistics.

### 2.3 Institutional Infrastructure Buyer & Real Estate Developer
* **Profile**: Procurement directors for metro rail projects, NHAI highway corridors, SEZs, smart city road contractors, and LEED/IGBC green commercial campuses.
* **Pain Point**: Mandatory ESG decarbonization targets (BRSR in India), risk of greenwashing, premium price sensitivity, compliance audits.
* **SthiraX Value Proposition**:
  * Mechanically superior precast exceeding IS 15658 / IS 2185 strength specifications.
  * Transparent cryptographic SthiraX Trace™ passports verifying real mineralization vs avoided emissions.
  * Competitive delivered pricing at or below conventional premium pavers.

### 2.4 Voluntary & Compliance Carbon Removal Buyer (Non-Guaranteed Upside)
* **Profile**: Corporate sustainability funds, Puro.earth / Isometric registry verifiers, prospective Indian CCTS compliance participants.
* **Pain Point**: Lack of permanent, additionality-verified durable Carbon Dioxide Removal (CDR) in Global South jurisdictions.
* **SthiraX Value Proposition**: Thousand-year geochemical permanence ($CaCO_3$) with Coriolis sensor-verified mass balance.

---

## 3. Product Features & Modules

### 3.1 Public Corporate Website
* **Home (`/`)**: Value proposition, scientific mineralization principles, interactive supply chain flow, pilot highlights, clear commercial disclaimers.
* **Materials & Products Catalogue (`/materials`)**: Specifications for interlocking pavers, solid blocks, kerbstones, and drain covers. Filterable by compressive strength, dimensions, and uptake target.
* **Product Detail & RFQ Engine (`/materials/:slug`)**: In-depth mechanical specifications, dimensional drawings, testing certificates, and direct commercial RFQ quote request forms.
* **Solutions (`/solutions/manufacturers`, `/solutions/co2-suppliers`)**: Dedicated qualification funnels, technical requirements, retrofit blueprints, and partner application intake.
* **Technology & Process (`/technology`)**: 11-stage value chain engineering walkthrough from capture to dispatch.
* **SthiraX Trace™ Portal (`/trace`, `/passports/:id`)**: Public Digital Product Passport viewer showing batch number, NABL test break reports, gate-to-gate LCA boundaries, and verification SHA-256 seal.
* **Decision Support Calculators (`/tools`)**:
  * Manufacturer Retrofit Profitability Calculator.
  * Buyer Order & Embodied Carbon Calculator.
  * Regional Feasibility Multi-Criteria Scoring Engine.
* **Corporate Governance & Disclosures (`/roadmap`, `/about`, `/team`, `/regulatory`, `/pilot`, `/contact`, `/privacy`, `/disclosures`)**:
  * Indian BIS standards cross-reference (IS 15658, IS 2185, IS 1077, IS 3812).
  * Hosur demonstration pilot facility case study.
  * Clear environmental claims disclaimers.

### 3.2 Authenticated Industrial Operations Console (`/app/*`)
* **Executive Operations Dashboard (`/app/dashboard`)**: Production runs, active curing chambers, CO₂ uptake volume, partner approvals queue, and open procurement orders.
* **Partner Onboarding & Approval Queue (`/app/approvals`)**: Review precast plant and CO₂ emitter applications, inspection logs, and approval actions.
* **Plant Network Management (`/app/plants`)**: Detailed records of participating plants, curing chamber capacity, autoclave/atmospheric chamber volumes, and live status.
* **CO₂ Supply & Storage Routing (`/app/co2-suppliers`)**: Source emitter profiles, cryogenic buffer tank inventories, and liquefaction purity grades.
* **Orders & Dynamic Quotation Portal (`/app/orders`)**: Commercial contract management, order status transitions, delivery logistics, and quotation approvals.
* **Logistics & Cryogenic Routing (`/app/logistics`)**: Road tanker dispatch schedules, telemetry tracking, route optimization, and delivery confirmations.
* **Production Batches & Curing Telemetry (`/app/batches`)**: Real-time mass flow sensor inputs, chamber temperature, relative humidity, and curing cycle duration logs.
* **Quality Assurance & Lab Approvals (`/app/quality`)**: Review NABL third-party mechanical break tests (7d & 28d compressive strength, water absorption, abrasion resistance) with sign-off workflows.
* **Digital Passport Administration (`/app/trace-admin`)**: Batch-to-passport issuance, QR payload generator, and public field disclosure toggles.
* **Unit Economics & Margin Architecture (`/app/costing`)**: Live financial simulator analyzing cost per tonne, capex amortization, and sensitivity matrices.
* **Carbon Offtake Registry Workspace (`/app/carbon-offtake`)**: Prospective CDR buyer pipeline under Puro.earth and CCTS standards with strict governance separation.
* **System Audit Trail (`/app/audit-log`)**: Immutable compliance log capturing administrative approvals, sensor telemetry events, and certificate publications.
