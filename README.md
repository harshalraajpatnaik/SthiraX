# SthiraX (स्थिरX)
### Distributed CO₂-Mineralization Platform for Lower-Carbon Precast Materials in India

[![Java 17](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.6.2%20%2F%203.x-green.svg)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-17.3.17-red.svg)](https://angular.dev/)
[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![License](https://img.shields.io/badge/Compliance-ISO%2014064--2%20%7C%20IS%2015658-emerald.svg)]()

---

## 1. Executive Overview

**SthiraX** is a production-minded climate-technology platform and industrial operations management system designed for distributed CO₂ mineralization in India's precast concrete sector.

Instead of deploying capital-intensive greenfield manufacturing plants, SthiraX operates an **asset-light regional retrofit model**:
* Sourcing high-purity point-source industrial CO₂ from distilleries, fertilizer plants, and chemical emitters.
* Retrofitting independently operated, regional precast manufacturing facilities with gas-sealed curing enclosures, automated Coriolis mass-flow meters, and micro-droplet moisture dosing controls.
* Permanently sequestering CO₂ into non-structural precast materials (interlocking pavers, concrete masonry blocks, kerbstones, stormwater drain covers) as stable calcium carbonate ($CaCO_3$).
* Delivering tamper-evident cryptographic Digital Product Passports (**SthiraX Trace™**) backed by NABL mechanical laboratory tests and strict gate-to-gate life cycle accounting.

---

## 2. Commercial Discipline & Climate Integrity

SthiraX enforces rigorous scientific and financial boundaries across all calculations and customer disclosures:

1. **Self-Sustaining Unit Economics**:
   * Precast facility retrofits and product sales are modelled to be **financially viable and profitable on physical material margins alone** (driven by 15–20% cement binder reduction and premium procurement margins).
   * **Zero dependence on carbon credits**: Carbon credit offtake (via Puro.earth or India's CCTS) is strictly treated as non-guaranteed upside.
2. **Clear Accounting Separation**:
   * **Gross Mineralized CO₂**: Physical mass of $CO_2$ converted into $CaCO_3$ minerals verified by Coriolis flow meters and gravimetric mass balance.
   * **Gate-to-Gate Net Removal**: Gross mineralized minus road tanker cryogenic transport emissions, compression electricity, and chamber auxiliary power.
   * **Avoided Emissions**: Scope 3 reductions from substituted clinker calcination. Kept strictly distinct from carbon removal claims.
3. **Restrained Product Scope**:
   * Focused strictly on **non-structural and semi-structural precast** where carbonation improves compressive strength and durability without corrosion risks.
   * Reinforced structural elements are intentionally out of current scope.

---

## 3. System Architecture & Components

```
                           +------------------------------------------+
                           |           ANGULAR 17 FRONTEND            |
                           |    Public Website & Operations Portal    |
                           +--------------------+---------------------+
                                                |
                                      REST / JSON APIs
                                                |
                           +--------------------v---------------------+
                           |      SPRING BOOT MONOLITH BACKEND        |
                           |                                          |
                           |  [Security / RBAC]    [Controllers]      |
                           |  [Cost Engine]        [Carbon Engine]    |
                           |  [DataStore / JPA]    [Audit Trail]      |
                           +--------------------+---------------------+
                                                |
                         +----------------------+----------------------+
                         |                                             |
           +-------------v-------------+                 +-------------v-------------+
           |     POSTGRESQL 15 DB      |                 |  PYTHON ANALYTICS ENGINE  |
           |  (Relational Persistence) |                 | (Regional Feasibility &   |
           +---------------------------+                 |  Sensitivity Matrices)    |
                                                         +---------------------------+
```

### 3.1 Repository Structure
```
SthiraX/
├── backend/                   # Spring Boot modular monolith (Java 17)
│   ├── src/main/java/com/sthirax/
│   │   ├── config/            # SecurityConfig, CORS, PasswordEncoder
│   │   ├── controller/        # 17 REST controllers
│   │   ├── dto/               # Request/Response DTOs with validation
│   │   ├── model/             # 16 Domain entities
│   │   ├── service/           # Costing & Carbon lifecycle engines
│   │   └── store/             # ThreadSafe DataStore pre-seeded with Hosur Pilot data
│   └── src/test/java/         # Unit and integration tests (JUnit 5)
├── frontend/                  # Angular 17 Standalone SPA
│   ├── src/app/
│   │   ├── core/              # Models, ApiService, AuthService, AuthGuard
│   │   ├── public/            # 18 Public corporate website pages
│   │   ├── portal/            # 12 Authenticated industrial operations portals
│   │   └── shared/            # Navbar, Footer, PortalLayout components
│   └── src/styles.scss        # Industrial climate-tech design system
├── analytics/                 # Python analytics module
│   ├── feasibility_engine.py  # Spatial multi-criteria scoring & sensitivity matrix
│   └── tests/                 # Python unit tests
├── docs/                      # Comprehensive technical documentation suite
│   ├── OPERATIONS_PORTAL_GUIDE.md # Complete screen-by-screen operations manual
│   ├── TEAM_AND_STAKEHOLDERS.md # Founding team profiles and expertise matrix
│   ├── PRODUCT_SPEC.md        # Product requirements & user personas
│   ├── ARCHITECTURE.md        # Technical architecture & data flows
│   ├── DATA_MODEL.md          # Domain models & ER diagrams
│   ├── API.md                 # REST API reference & payloads
│   ├── SECURITY.md            # Security, RBAC & trade secret boundaries
│   ├── COST_MODEL.md          # Financial unit economics & payback equations
│   ├── CARBON_ACCOUNTING.md   # ISO 14064-2 lifecycle equations
│   ├── REGULATORY_SOURCES.md  # BIS codes (IS 15658, IS 2185) & CCTS rules
│   ├── DEPLOYMENT.md          # Setup & execution instructions
│   └── ROADMAP.md             # Multi-phase scale-up roadmap
├── compose.yaml               # Docker Compose file for PostgreSQL 15
├── .env.example               # Environment variable template
├── .gitignore                 # Safe repository exclusions
└── README.md                  # System overview and quickstart guide
```

---

## 4. Quickstart Guide

### 4.1 Standalone Zero-Prerequisites Mode (Instant Run)
The application can be run immediately on standard developer workstations without requiring Docker Desktop:

#### 1. Start Spring Boot Backend
```bash
# Verify Java 17 and Maven
java -version
mvn -version

# Run backend unit tests
mvn -f backend/pom.xml test

# Launch Spring Boot server
mvn -f backend/pom.xml spring-boot:run
```
* Backend starts at `http://localhost:8088` (REST APIs at `http://localhost:8088/api/v1/*`).
* Pre-seeded with Hosur Pilot facility, Deccan Distilleries CO₂ supply, Metro Infra commercial order, batch `STX-2026-B108`, and verified passport `pass-7f9a2b4c`.

#### 2. Start Angular Frontend
```bash
# Verify Node.js (v18+) and npm
node -v
npm -v

# Build production bundle
cd frontend
npm run build

# Start Angular local development server
npm start
```
* Application launches at `http://localhost:4200`.

#### 3. Run Python Analytics Engine
```bash
# Run analytics unit tests
PYTHONPATH=analytics python3 -m unittest discover -s analytics/tests

# Run interactive feasibility scoring
python3 analytics/feasibility_engine.py
```

---

### 4.2 Docker Compose Mode (When Docker is Running)
To run with a dedicated PostgreSQL 15 database container:

```bash
# Spin up PostgreSQL container
docker compose up -d postgres

# Verify container health
docker compose ps
```

---

## 5. Demonstration Credentials

All credentials are pre-seeded in the local environment:

| User Principal | Email | Password | Console Role | Permitted Workflows |
| :--- | :--- | :--- | :--- | :--- |
| **Executive Admin** | `admin@sthirax.com` | `sthirax_admin_pass` | `ROLE_ADMIN` | Executive Dashboard, Partner Approvals, Orders, Audits |
| **Plant Operations** | `plant.hosur@sthirax.com` | `plant_manager_pass` | `ROLE_OPERATIONS` | Batches, Curing Telemetry, Plants, CO₂ Logistics |
| **Quality Inspector**| `qa@sthirax.com` | `quality_qa_pass` | `ROLE_QA_INSPECTOR` | NABL Break Reviews, Quality Sign-off, Passport Issuance |
| **Auditor (ESG)** | `auditor@registry.org` | `auditor_pass` | `ROLE_AUDITOR` | Read-only Audit Logs, Carbon Offtake Registry |

---

## 6. Founding Team & Key Contributors

| Name | Role | Background & Experience |
| :--- | :--- | :--- |
| **Sai Nikhil Y** | Product Leadership & Operations | 7 years as a product leader across logistics, retail intelligence, operations and manufacturing digitization. Mechanical Engineering background. |
| **Hitesh Jain A** | Construction Materials & Plant Operations | 8+ years into family business, Civil Engineering graduate, works in construction materials and construction activities. |
| **Shashank Verma** | Engineering & Projects, Safety & QA | Holding 13+ years of experience in handling leading roles in Engineering & Projects, Operations cum Safety Officer and sales division of Bharat Petroleum Corporation Limited (BPCL). Civil Engineering background. |
| **Harshal Raaj Patnaik** | Enterprise Technology & Architecture | 5+ years in enterprise technology and digital transformation across cloud platforms, software engineering, and business solutions. Computer Science and Engineering background. |
| **Pankaj Adhikari** | Process Chemistry & Refinery Operations | 12+ years of experience in refinery operations at Bharat Petroleum and Reliance Industries Limited. Chemical Engineering graduate. |
| **Lakshmi N Menon** | Production, Content Integration & Media | 20 years of editorial and media production experience across Asianet News, The New Indian Express, and Jaihind TV; currently Manager, Production & Content Integration at AsiaNXT Digital, Kochi. LLB & PGD (Journalism & Mass Communication Graduate). |

---

## 7. Route Sitemap

### 7.1 Public Corporate Website (Unauthenticated)
* `/` — Corporate Homepage (Value Proposition, Mineralization Science, Interactive Chain, Pilot Highlights).
* `/materials` — Product Catalogue (Interlocking Pavers, Masonry Blocks, Kerbstones, Drain Covers).
* `/materials/:slug` — Product Specification & Direct Quotation Form.
* `/solutions/manufacturers` — Precast Manufacturer Retrofit Program & Blueprint.
* `/solutions/co2-suppliers` — CO₂ Emitter Offtake Qualification & Onboarding.
* `/technology` — Mineralization Science & 11-Stage Value Chain Walkthrough.
* `/trace` — SthiraX Trace™ Digital Product Passport Overview, Architecture & Direct Lookup Bar.
* `/passports/:id` (and `/passport/:id`) — Live Public Passport Verification Page (e.g. `/passports/pass-7f9a2b4c`).
* `/tools` — Interactive Decision Support Tools (Retrofit Payback, Order Estimator, Regional Feasibility).
* `/roadmap` — Industrial & Technology Roadmap (Phases 1 through 4).
* `/about` — Company Mission, Thesis, & Governance Principles.
* `/team` — Leadership, Technical Advisors, and Materials Scientists.
* `/regulatory` — Indian Regulatory Frameworks, BIS Codes & Fly Ash Notifications.
* `/pilot` — Hosur Pilot Demonstration Facility Case Study.
* `/contact` — Commercial Inquiries & Offtake Contacts.
* `/privacy` — Privacy Policy & Data Handling.
* `/disclosures` — Scientific Claims & Environmental Disclosures.
* `/login` — Operations Console Authentication.

### 7.2 Authenticated Industrial Operations Portal (`/app/*`)
* `/app/dashboard` — Operations Dashboard (Chambers, Batches, Orders, Partner Pipeline).
* `/app/approvals` — Partner Onboarding Queue (Plant inspections & CO₂ sources).
* `/app/plants` — Precast Plant Network (Chamber capacities, autoclave retrofits, status).
* `/app/co2-suppliers` — Point-Source Emitter Logistics & Cryogenic Buffer Storage.
* `/app/orders` — Orders & Quotation Management.
* `/app/logistics` — Road Tanker Dispatches & Cryogenic Delivery Schedules.
* `/app/batches` — Production Batches, Curing Enclosure Telemetry & Coriolis Uptake Logs.
* `/app/quality` — Quality Assurance & NABL Laboratory Break Tests.
* `/app/trace` (and `/app/trace-admin`) — SthiraX Trace™ Passport Issuance & Public Disclosure Controls.
* `/app/costing` — Financial Unit Economics & Sensitivity Simulator.
* `/app/carbon-offtake` — Carbon Removal Offtake Pipeline & Methodology Verification.
* `/app/audit-log` — Immutable System Audit Trail & Compliance Records.

---

## 8. Verification & Test Summary

All automated test suites execute cleanly offline:

* **Spring Boot Unit & Integration Tests**:
  ```bash
  mvn -f backend/pom.xml test
  ```
  * `CostCalculationServiceTest`: Verifies decimal arithmetic, saleable output, contribution margin %, and capex payback.
  * `CarbonAccountingServiceTest`: Verifies gross mineralization vs net gate-to-gate life cycle equations.
  * `WorkflowAndSecurityTest`: Verifies password hashing, authentication token generation, and role authorization.
  * **Status**: 5 tests passed, 0 failures, 0 errors.

* **Python Feasibility & Sensitivity Tests**:
  ```bash
  PYTHONPATH=analytics python3 -m unittest discover -s analytics/tests
  ```
  * `test_composite_scoring_weights`: Verifies weight normalization and ranking calculations.
  * `test_top_region_bangalore`: Verifies Bangalore-Hosur ranking with high CO₂ availability and plant density.
  * `test_sensitivity_matrix_monotonicity`: Verifies margin sensitivity monotonicity.
  * **Status**: 3 tests passed, 0 failures, 0 errors.

* **Angular Production Build**:
  ```bash
  cd frontend && npm run build
  ```
  * Generates optimized production bundles in `frontend/dist/frontend`.
  * **Status**: Build successful with zero compilation errors.

---

## 9. GitHub Deployment & Repository Management

The local project directory is structured cleanly with `.gitignore` and `.env.example`.

Per safety rules, automatic creation of remote repositories or automated pushing without credentials is not performed autonomously.

To publish this project to your GitHub account:

```bash
# 1. Initialize local git repository (if not already initialized)
git init

# 2. Add files and make initial commit
git add .
git commit -m "Initial commit: SthiraX climate-tech platform and industrial operations system"

# 3. Create a repository on GitHub (e.g. sthirax-platform)
# 4. Link your remote repository and push:
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git branch -M main
git push -u origin main
```
