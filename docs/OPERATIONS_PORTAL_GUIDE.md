# SthiraX Operations Portal (Console) — Complete User & Operational Manual

The SthiraX Operations Console (`/app/*`) is an industrial operating system connecting point-source $\text{CO}_2$ supply, regional precast manufacturing, cryogenic transport logistics, quality assurance, digital traceability, and financial margins.

This manual provides an in-depth walkthrough of each section, explaining its purpose, data inputs, automated calculations, and administrative workflows.

---

## 1. Access Matrix & User Roles

| Module / URL | Purpose | Primary Roles | Key Actions |
| :--- | :--- | :--- | :--- |
| **Dashboard** (`/app/dashboard`) | Executive summary of network throughput, active chambers, and commercial orders | `ROLE_ADMIN`, `ROLE_OPERATIONS` | Monitor network pulse, jump to pending actions |
| **Partner Approvals** (`/app/approvals`) | Screening & auditing precast plant and $\text{CO}_2$ supplier onboarding applications | `ROLE_ADMIN`, `ROLE_OPERATIONS` | Review facility specs, approve or reject applicants |
| **Plant Network** (`/app/plants`) | Facility inventory, chamber dimensions, monthly capacities, and retrofit status | `ROLE_ADMIN`, `ROLE_OPERATIONS`, `ROLE_PLANT_OPERATOR` | Inspect plant retrofits, track active chamber runs |
| **$\text{CO}_2$ Supply** (`/app/co2-suppliers`) | Emitter tracking (distilleries, ammonia plants), purity grades, and buffer tanks | `ROLE_ADMIN`, `ROLE_OPERATIONS` | Coordinate supply contracts, monitor tank levels |
| **Orders & Quotes** (`/app/orders`) | Commercial buyer contracts, quote creation, pricing approvals, and delivery status | `ROLE_ADMIN`, `ROLE_OPERATIONS` | Create quotes, advance order lifecycle stages |
| **Cryogenic Logistics** (`/app/logistics`) | Road tanker dispatch schedules, GPS telemetry, and decanting confirmations | `ROLE_OPERATIONS` | Dispatch tankers, record transport emissions |
| **Batches & Telemetry** (`/app/batches`) | Mineralization run logs, Coriolis mass-flow dosing, and curing sensor telemetry | `ROLE_PLANT_OPERATOR`, `ROLE_OPERATIONS` | Record production batch, log chamber temperature/RH |
| **Quality & Lab Approvals** (`/app/quality`)| NABL third-party mechanical test reviews (compressive strength, water absorption) | `ROLE_QA_INSPECTOR`, `ROLE_ADMIN` | Inspect break certificates, sign-off or reject batches |
| **Trace™ DPP Admin** (`/app/trace-admin`) | Batch-to-passport issuance, QR tag generation, and public field disclosure controls | `ROLE_ADMIN`, `ROLE_QA_INSPECTOR` | Issue digital product passports, toggle public visibility |
| **Unit Economics** (`/app/costing`) | Interactive financial modeling, per-tonne cost waterfall, and retrofit capex payback | `ROLE_ADMIN`, `ROLE_OPERATIONS` | Simulate $\text{CO}_2$ price variations and margin sensitivity |
| **Carbon Offtake** (`/app/carbon-offtake`) | Prospective CDR buyer pipeline under Puro.earth and India's CCTS framework | `ROLE_ADMIN`, `ROLE_AUDITOR` | Review buyer term sheets, verify additionality criteria |
| **System Audit Trail** (`/app/audit-log`) | Immutable security ledger capturing administrative approvals and sensor events | `ROLE_ADMIN`, `ROLE_AUDITOR` | Filter compliance logs, verify actor principals |

---

## 2. In-Depth Screen Walkthroughs

### 2.1 Executive Dashboard (`/app/dashboard`)
* **Core Function**: Aggregates the macro state of the SthiraX distributed network into real-time key performance indicators.
* **Top Metric Tiles**:
  * **Network Production Volume**: Total tonnes of mineralized precast produced across all partner plants.
  * **Gross $\text{CO}_2$ Mineralized**: Cumulative mass (kg) of $\text{CO}_2$ fixed permanently as calcium carbonate crystals ($CaCO_3$).
  * **Active Curing Chambers**: Number of retrofitted enclosures currently under active carbonation cycles.
  * **Open Procurement Orders**: Active commercial orders from developers and infrastructure contractors.
* **Charts & Visualizations**:
  * 30-day production run velocity.
  * Chamber utilization breakdown by facility.
  * Recent activity feed showing new batches, lab approvals, and tanker deliveries.

### 2.2 Partner Onboarding & Approvals (`/app/approvals`)
* **Core Function**: Enforces strict operational and safety due diligence before a third-party facility is granted permission to receive $\text{CO}_2$ or produce SthiraX-certified materials.
* **Intake Funnels**:
  * **Precast Plants**: Evaluates current block-making machinery (e.g. Columbia, Hess, Tiger presses), annual output, steam/water curing setup, and yard area for modular chamber installation.
  * **$\text{CO}_2$ Suppliers**: Evaluates industrial point-source type (e.g. grain ethanol distillery, ammonia synthesis), raw off-gas purity ($\ge 95\%$), liquefaction availability, and cryogenic truck loading bays.
* **Review Workflow**:
  1. Application received in `PENDING_REVIEW` state.
  2. Technical team conducts desk audit of boiler/curing logs and PESO tanker access.
  3. Lead reviewer (e.g. Operations Admin) records inspection notes and executes an automated decision (`APPROVED` or `REJECTED`).
  4. On approval, the facility is automatically provisioned in the active network.

### 2.3 Precast Plant Network (`/app/plants`)
* **Core Function**: Centralized registry of all certified, retrofitted, and prospective partner precast facilities.
* **Key Attributes Tracked per Facility**:
  * Facility Name & Legal Entity (e.g., *Prakriti Precast Infrastructure Pvt Ltd*).
  * Geographic Coordinates & State (enables regional freight radius optimization).
  * Monthly Tonnage Capacity ($1,000 - 5,000\text{ t/month}$).
  * Curing Chamber Geometry: Enclosure type (gas-tight modular panel vs. autoclave retrofit), interior volume ($m^3$), and max pallet capacity.
  * Gas Infrastructure: On-site liquid $\text{CO}_2$ vacuum-insulated storage tank capacity ($5 - 20\text{ tonnes}$ buffer) and vaporiser rating ($kg/hr$).

### 2.4 $\text{CO}_2$ Supply & Storage Routing (`/app/co2-suppliers`)
* **Core Function**: Coordinates point-source industrial emission offtake to guarantee uninterrupted curing gas supply to regional plants.
* **Supply Profile Data**:
  * Source Facility (e.g., *Deccan Distilleries & Biofuels Ltd, Mandya*).
  * Emission Type: Biogenic fermentation (sugar/grain ethanol) or chemical synthesis.
  * Offtake Capacity: Available monthly volume ($500 - 3,000\text{ t/month}$).
  * Purity & Moisture Analysis: Pre-liquefaction purity percentage ($\ge 99.5\%$ food/industrial grade) and dew-point verification (prevents carbonic acid corrosion in transport piping).
  * Buffer Storage Telemetry: Current fill levels in main liquid tanks.

### 2.5 Orders & Dynamic Quotation Portal (`/app/orders`)
* **Core Function**: Manages the commercial lifecycle of low-carbon precast procurement contracts for infrastructure developers.
* **Workflow Stages**:
  1. `ENQUIRY_RECEIVED`: Inward RFQ submitted by developer via public product specification page.
  2. `QUOTE_GENERATED`: SthiraX costing engine computes delivered cost, transport freight from nearest plant, and green precast margin.
  3. `CUSTOMER_ACCEPTED`: Formal contract signed; batches assigned to closest regional facility.
  4. `IN_PRODUCTION`: Manufacturing plant demoulds blocks and initiates chamber carbonation.
  5. `QUALITY_PASSED`: NABL crush tests confirm compliance with target strength grade (e.g. M-35).
  6. `DISPATCHED` & `DELIVERED`: Pallets tagged with physical QR codes delivered to construction job site.

### 2.6 Cryogenic Logistics & Fleet Routing (`/app/logistics`)
* **Core Function**: Coordinates insulated road tanker movements from emitter capture units to precast receiving yards.
* **Logistics Telemetry**:
  * Tanker Fleet ID & Capacity ($10 - 20\text{ tonnes}$ liquid $CO_2$ at $-20^\circ\text{C}$ and $20\text{ bar}$).
  * Origin Emitter to Destination Precast Plant road distance ($km$).
  * Automated Freight Emissions Calculation ($0.082\text{ kg CO}_2\text{e per t-km}$), which is automatically deducted from gross mineralization to determine gate-to-gate net removal.
  * Decanting confirmation and receiver tank mass reconciliation.

### 2.7 Production Batches & Curing Telemetry (`/app/batches`)
* **Core Function**: The heart of industrial operations—recording physical manufacturing batches and capturing sensor logs during accelerated mineralization.
* **Batch Data Fields**:
  * Alphanumeric Batch ID (e.g. `STX-2026-B108`).
  * Product Type & Standard (e.g. *80mm Heavy-Duty Pavers, IS 15658*).
  * Quantity: Output units (e.g. $15,000\text{ pavers}$) and weight ($54.0\text{ tonnes}$).
* **Sensor Telemetry (Emerson Coriolis Flow Meter)**:
  * **$CO_2$ Injected**: Total mass of gas delivered to chamber ($780.0\text{ kg}$).
  * **$CO_2$ Mineralized**: Net mass permanently converted into $CaCO_3$ ($712.5\text{ kg}$, $91.3\%$ uptake efficiency).
  * **Environmental Sensors**: Enclosure temperature ($42.0^\circ\text{C}$), relative humidity ($85\%$), and cycle duration ($14\text{ hours}$).

### 2.8 Quality Assurance & Lab Approvals (`/app/quality`)
* **Core Function**: Mandatory quality gate preventing any batch from receiving certification without third-party mechanical verification.
* **Test Criteria Checked**:
  * Compressive Strength (7-day and 28-day breaks per IS 15658 / IS 2185). Example: Batch B108 achieved $44.8\text{ MPa}$, exceeding the $35.0\text{ MPa}$ requirement by $28\%$.
  * Water Absorption Test: $\le 6.0\%$ (Batch B108: $4.6\%$).
  * Abrasion Resistance: $\le 2.0\text{ mm}$ wear depth.
  * Visual & Dimensional Tolerance Check: $\pm 2.0\text{ mm}$.
* **Approval Action**: Certified Quality Inspector digitally signs the review, which unlocks the batch for dispatch and generates the public Digital Product Passport.

### 2.9 SthiraX Trace™ Passport Administration (`/app/trace-admin`)
* **Core Function**: Issues, audits, and manages cryptographic Digital Product Passports (DPP) attached to physical curing pallets via QR codes.
* **Key Features**:
  * **Cryptographic SHA-256 Hash**: Generates a tamper-evident seal calculated from batch weight, Coriolis injected gas, date, and testing laboratory certificate.
  * **Granular Public Disclosure Controls**:
    * *Public*: Gross mineralized $CO_2$, net gate-to-gate removal, NABL compressive strength, BIS code, and manufacturer plant city.
    * *Confidential (Redacted)*: Proprietary chemical accelerant formulas, raw material supplier tariffs, customer billing rates, and plant profit margins.
  * **Public Visibility Toggle**: Instantly publish or unpublish passports from public scanner access.

### 2.10 Unit Economics & Margin Architecture (`/app/costing`)
* **Core Function**: Real-time financial modeling tool for operations strategists and commercial teams.
* **Interactive Parameters**:
  * Delivered $CO_2$ Price (₹/t of gas, baseline ₹8,000/t).
  * Specific Mineral Uptake ($kg\text{ }CO_2$ per tonne of concrete, baseline $30\text{ kg/t}$).
  * Ex-Factory Finished Selling Price (₹/tonne, baseline ₹3,650/t).
  * SthiraX Platform Royalty & MRV Fee (₹/tonne, baseline ₹180/t).
* **Computed Outputs**:
  * Full cost waterfall (Binder, Aggregates, $CO_2$, Labor, Energy, Royalty, Depreciation).
  * Precast Manufacturer Net EBITDA Margin per tonne.
  * Payback on ₹35 Lakhs modular retrofit chamber in months (baseline $7.7 - 10.2\text{ months}$).
  * Two-dimensional sensitivity matrix mapping margin variance against delivered $CO_2$ costs.

### 2.11 Carbon Offtake Registry Workspace (`/app/carbon-offtake`)
* **Core Function**: Tracks commercial dialogues and term sheets with institutional buyers of durable Carbon Dioxide Removal (CDR) credits.
* **Strict Governance Banner**: Clearly reminds operators and prospective investors that **carbon credits represent non-guaranteed financial upside** and that the core business is profitable on physical concrete margins alone.
* **Methodology Screening**:
  * Verifies alignment against Puro.earth *Carbonated Building Materials* standard.
  * Validates geochemical permanence ($CaCO_3$ is stable up to $800^\circ\text{C}$, $\ge 1,000\text{ years}$ permanence).
  * Evaluates additionality against ambient water-curing baselines.

### 2.12 System Audit Trail & Access Logs (`/app/audit-log`)
* **Core Function**: Immutable compliance ledger satisfying Indian corporate governance and statutory ESG reporting (BRSR) requirements.
* **Log Structure**:
  * UTC Timestamp.
  * Action Name (e.g. `QUALITY_APPROVED`, `PASSPORT_ISSUED`, `PARTNER_APPROVED`, `BATCH_RECORDED`).
  * Target Entity Type & ID.
  * Responsible User Principal / Email.
  * Event Summary and state transition payload.
  * Append-only retention for 7 years.
