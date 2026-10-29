# SthiraX Security & Access Governance

## 1. Authentication & Session Management

SthiraX enforces a zero-trust, stateless session model using cryptographically signed tokens.
* **Token Standard**: Signed bearer tokens with 24-hour expiration.
* **Storage**: Tokens are stored client-side in memory and authenticated via `Authorization: Bearer <TOKEN>` HTTP headers.
* **Password Hashing**: BCrypt with adaptive cost factor 12.

---

## 2. Role-Based Access Control (RBAC)

User privileges are governed by five granular principal roles:

| Role | Target Persona | Accessible Capabilities |
| :--- | :--- | :--- |
| `ROLE_ADMIN` | Executive Operations Lead | Full system access, partner approvals, audit inspection, user provisioning |
| `ROLE_OPERATIONS` | Logistics & Dispatch Lead | Plant network, tanker logistics, order fulfillment, cost model calculations |
| `ROLE_PLANT_OPERATOR`| Facility Plant Manager | Production batch recording, chamber telemetry logs, dispatch verification |
| `ROLE_QA_INSPECTOR` | NABL Accredited QA Lead | Compression break approvals, lab certificate attachments, batch approvals |
| `ROLE_AUDITOR` | Registry / ESG Auditor | Read-only access to immutable audit trails, Coriolis calibration logs, LCA calculations |

---

## 3. Data Protection & Trade Secret Safeguards

### 3.1 Public vs Confidential Data Boundaries
To preserve partner competitive advantage while providing transparent environmental claims, SthiraX Trace™ implements granular field-level publication controls:

* **Public Verification Layer (Unauthenticated)**:
  * Batch ID and date of manufacture.
  * Verified 28-day compressive strength (MPa) and NABL certificate number.
  * Gross $CO_2$ mineralized (kg) and net gate-to-gate removal (kg).
  * Applicable BIS compliance standard (e.g. IS 15658:2006).
  * Cryptographic SHA-256 integrity hash seal.

* **Confidential Internal Layer (Authenticated Only)**:
  * Exact proprietary chemical mix ratios (accelerators, carbonation promoters).
  * Raw material supplier pricing and procurement margins.
  * Precast plant commercial capacity utilization and cost sheets.
  * Customer commercial contracts and unit margins.

---

## 4. Operational Audit Trail

All critical state transitions generate append-only `AuditEvent` records containing:
* UTC timestamp.
* Actor principal identifier and IP origin.
* Action type (e.g. `PARTNER_APPROVED`, `QUALITY_APPROVED`, `PASSPORT_ISSUED`).
* Entity reference and JSON diff summary.
* Immutable storage retention meeting statutory ESG requirements (7 years in India).
