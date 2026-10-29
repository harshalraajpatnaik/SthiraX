# SthiraX Architecture & Technical Design

## 1. Architectural Principles

SthiraX is designed as a **production-minded, modular monolithic architecture** optimized for industrial reliability, maintainability, low operational complexity, and strict regulatory auditability.

```
                           +------------------------------------------+
                           |           ANGULAR 17 FRONTEND            |
                           |   (Standalone Components, SCSS System)   |
                           +--------------------+---------------------+
                                                |
                                      REST / JSON APIs
                                                |
                           +--------------------v---------------------+
                           |        SPRING BOOT 2.6 / 3.x MONOLITH    |
                           |                                          |
                           |  [Security / RBAC]    [Controllers]      |
                           |  [Cost Engine]        [Carbon Engine]    |
                           |  [DataStore / JPA]    [Audit Logger]     |
                           +--------------------+---------------------+
                                                |
                         +----------------------+----------------------+
                         |                                             |
           +-------------v-------------+                 +-------------v-------------+
           |     POSTGRESQL 15 DB      |                 |  PYTHON ANALYTICS SERVICE |
           |  (Relational Persistence) |                 | (Regional Feasibility &   |
           +---------------------------+                 |  Sensitivity Matrices)    |
                                                         +---------------------------+
```

### 1.1 Non-Overengineered Tech Stack
* **Frontend**: Angular 17+ (standalone components, TypeScript 5, SCSS, responsive CSS grid/flexbox, zero heavy UI frameworks, Lucide iconography).
* **Backend Monolith**: Java 17 + Spring Boot (Spring Web, Spring Security, Bean Validation, Spring Data JPA, PostgreSQL driver).
* **Analytics Engine**: Python 3.9+ (`feasibility_engine.py`) executing multi-criteria spatial scoring and parameter sensitivity simulations.
* **Storage / Persistence**:
  * Production: PostgreSQL 15 with ACID compliance for batch certificates and financial ledgers.
  * Development / Prototyping: Thread-safe, pre-seeded concurrent in-memory `DataStore` allowing instant demonstration execution without mandatory Docker setup.
* **Infrastructure**: Docker Compose (`compose.yaml`) with volume persistence and healthcheck probes.

---

## 2. Monolithic Backend Layering

The Spring Boot backend is structured into clear modular packages:

```
backend/src/main/java/com/sthirax/
├── config/              # SecurityConfig, CORS mappings, password encoders
├── controller/          # 17 REST controllers mapping domain workflows
├── dto/                 # Request/Response data transfer objects with Bean Validation
├── model/               # 16 Domain entities (Batch, Plant, Passport, Order, etc.)
├── repository/          # Data persistence abstractions
├── service/             # Domain logic (Costing, Carbon Accounting, Workflow)
├── store/               # ThreadSafe DataStore pre-seeded with Hosur Pilot data
└── SthiraxApplication.java # Application entry point
```

### 2.1 Domain Separation & Climate Integrity in Code
The backend strictly isolates:
1. **Mechanical Concrete Quality**: Tested compressive strength (MPa), water absorption (%), dimensional tolerance according to Bureau of Indian Standards (BIS).
2. **CO₂ Carbonation Mass Balance**: Coriolis-measured injected $CO_2$ (kg), chamber leakage/venting (kg), and gross mineralized $CO_2$ ($CaCO_3$ mass fixation).
3. **Gate-to-Gate Net Life Cycle Accounting**: Gross mineralized minus cryogenic tanker transport emissions, compression energy, and curing enclosure auxiliary power.
4. **Commercial Product Sales**: Concrete material sales margin, retrofit royalty fee, and delivery charges.
5. **Carbon Finance**: Non-guaranteed, separate CDR pipeline managed strictly through third-party registry methodologies (Puro.earth / CCTS).

---

## 3. Angular 17 Frontend Design System

### 3.1 Design System Palette
* **Off-White Canvas**: `#f8f8f6`
* **Deep Charcoal / Slate Typography**: `#181c1c`
* **Mineral Green Accent**: `#2e624c`
* **Industrial Amber / Warning**: `#c27803`
* **Surface Neutral**: `#ffffff` and `#eff0ec`
* **Fine Border**: `#e0e2db`

### 3.2 Dual-Experience Routing
* **Public Corporate Website**: Clean, informative pages with global navigation (`app-navbar`) and footer (`app-footer`). Fully accessible without credentials.
* **Authenticated Portal (`/app/*`)**: Protected by `authGuard`. Uses `PortalLayoutComponent` containing its own dedicated sticky operations topbar and collapsible navigation sidebar with real-time status indicators.
* **Offline Resilience**: All API services in `api.service.ts` feature automatic `catchError` fallbacks to internal demo datasets, ensuring the user experience never breaks even if the backend is stopped.
