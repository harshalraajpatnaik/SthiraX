# SthiraX REST API & OpenAPI Specification

Base URL: `http://localhost:8088/api/v1`

## Interactive OpenAPI & Swagger Documentation
* **Swagger UI (Interactive API Explorer)**: [`http://localhost:8088/swagger-ui/index.html`](http://localhost:8088/swagger-ui/index.html)
* **OpenAPI 3.0.1 Specification (JSON)**: [`http://localhost:8088/v3/api-docs`](http://localhost:8088/v3/api-docs)

All responses are formatted in UTF-8 JSON. Standard HTTP status codes are used:
* `200 OK`: Successful retrieval / calculation
* `201 Created`: Entity created
* `400 Bad Request`: Validation failure
* `401 Unauthorized`: Authentication missing or expired
* `403 Forbidden`: Insufficient role permissions
* `404 Not Found`: Resource does not exist

---

## 0. System & Database Health (PostgreSQL 15)

### `GET /system/database-status`
Returns real-time PostgreSQL 15 connection state, container status, and live row counts across all relational tables.

**Response (200 OK):**
```json
{
  "connected": true,
  "database": "PostgreSQL 15 (Docker container: sthirax-postgres)",
  "host": "localhost:5432 / sthirax_db",
  "plantsCount": 1,
  "co2SuppliersCount": 1,
  "productsCount": 4,
  "batchesCount": 2,
  "passportsCount": 1,
  "enquiriesCount": 2,
  "partnerApplicationsCount": 2,
  "auditEventsCount": 10,
  "statusMessage": "PostgreSQL 15 is active, connected, and persisting industrial data end-to-end."
}
```

---

---

## 1. Authentication & Session

### `POST /auth/login`
Authenticates a user and issues an active session token.

**Request:**
```json
{
  "email": "admin@sthirax.com",
  "password": "sthirax_admin_pass"
}
```

**Response (200 OK):**
```json
{
  "token": "demo-jwt-token-sthirax-ops-2026",
  "userId": "USR-001",
  "email": "admin@sthirax.com",
  "fullName": "SthiraX Operations Admin",
  "organisationId": "ORG-STHIRAX",
  "organisationName": "SthiraX Technologies Pvt Ltd",
  "roles": ["ROLE_ADMIN", "ROLE_OPERATIONS"]
}
```

---

## 2. Public Catalog & Inquiries

### `GET /products`
Returns active precast products.

### `GET /products/{slug}`
Returns detailed specifications for a specific product slug (`interlocking-paving-blocks`).

### `POST /enquiries`
Submits a commercial quotation or information inquiry.

**Request:**
```json
{
  "contactName": "Vikram Malhotra",
  "email": "v.malhotra@metroinfra.in",
  "phone": "+91 98450 12345",
  "companyName": "Bangalore Metro Rail Corporation Ltd",
  "type": "QUOTE",
  "productId": "prod-001",
  "quantity": 10000,
  "unit": "SQ_METRE",
  "deliveryPincode": "560001",
  "expectedDate": "2026-05-15",
  "notes": "Required for Phase 2B walkway paving."
}
```

---

## 3. Partner Onboarding & Approvals

### `POST /partners/apply`
Submits an onboarding application for a precast plant or CO₂ supplier.

### `GET /partners` *(Authenticated: Admin/Operations)*
Returns pending and processed partner applications.

### `POST /partners/{id}/decision` *(Authenticated: Admin)*
Approves or rejects a partner application.

**Request:**
```json
{
  "decision": "APPROVED",
  "reviewerNotes": "Facility audit completed. Gas infrastructure compliant."
}
```

---

## 4. Digital Product Passports (SthiraX Trace™)

### `GET /passports/{id}`
Public endpoint retrieving verifiable DPP records by passport ID.

**Response (200 OK):**
```json
{
  "id": "pass-7f9a2b4c",
  "batchId": "batch-108",
  "batchNumber": "STX-2026-B108",
  "productName": "EcoPave Heavy-Duty 80mm Paver",
  "plantLocation": "Hosur, Tamil Nadu",
  "productionDate": "2026-03-24",
  "publicationStatus": "PUBLISHED",
  "verificationStatus": "VERIFIED_AUDITED",
  "co2InjectedKg": 780.0,
  "mineralizedCo2Kg": 712.5,
  "netGateToGateRemovalKg": 655.5,
  "bisStandardReference": "IS 15658:2006",
  "testedStrengthMpa": 44.8,
  "verificationHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "publishedAt": "2026-03-28T09:20:00Z"
}
```

---

## 5. Industrial Operations & Telemetry

### `GET /batches` *(Authenticated)*
Lists production runs, curing logs, and mass flow telemetry.

### `POST /batches` *(Authenticated)*
Records a new production run with Coriolis sensor readings.

### `GET /quality-reviews` *(Authenticated)*
Returns pending and completed NABL laboratory break reviews.

### `POST /quality-reviews/{id}/decision` *(Authenticated)*
Approves or rejects a batch following 28-day compression testing.

---

## 6. Financial Calculations & Feasibility

### `POST /cost-models/calculate`
Calculates full financial unit economics, cost per tonne, EBITDA contribution %, and retrofit payback in years.

### `POST /analytics/regional-feasibility`
Executes multi-criteria spatial ranking across regional industrial hubs (Bangalore-Hosur, Hyderabad, Chennai-Sri City, Delhi NCR, Pune-Chakan).
