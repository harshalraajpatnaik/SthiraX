# SthiraX Deployment & Infrastructure Guide

## 1. Prerequisites & Execution Modes

SthiraX supports two execution modes:

### Mode A: Standalone In-Memory (Zero Prerequisites)
* Ideal for immediate local demonstration, code auditing, and offline testing without requiring Docker Desktop.
* Backend runs with pre-seeded `DataStore` containing realistic Hosur Pilot demonstration data.
* Frontend runs via Angular CLI with built-in mock fallbacks.

### Mode B: Containerized PostgreSQL Production Environment
* Runs PostgreSQL 15 database container via Docker Compose with volume persistence and healthcheck probes.

---

## 2. Step-by-Step Local Execution

### 2.1 Backend Monolith (Spring Boot)
1. Verify Java 17 and Maven:
   ```bash
   java -version
   mvn -version
   ```
2. Run backend unit tests:
   ```bash
   mvn -f backend/pom.xml test
   ```
3. Start the Spring Boot server:
   ```bash
   mvn -f backend/pom.xml spring-boot:run
   ```
   * The backend starts on `http://localhost:8080`.
   * REST APIs available at `http://localhost:8080/api/v1/*`.

### 2.2 Frontend Application (Angular 17)
1. Verify Node.js (v18+) and npm:
   ```bash
   node -v
   npm -v
   ```
2. Build the production bundle:
   ```bash
   cd frontend
   npm run build
   ```
3. Start the development server:
   ```bash
   cd frontend
   npm start
   ```
   * The application opens at `http://localhost:4200`.

### 2.3 Python Analytics Feasibility Engine
1. Run analytics unit tests:
   ```bash
   PYTHONPATH=analytics python3 -m unittest discover -s analytics/tests
   ```
2. Execute standalone regional feasibility scoring:
   ```bash
   python3 analytics/feasibility_engine.py
   ```

---

## 3. Docker Compose (When Docker is Running)

To spin up the PostgreSQL database container:

```bash
docker compose up -d postgres
```

Verify database health:
```bash
docker compose ps
```

To stop:
```bash
docker compose down
```

---

## 4. Default Demonstration Credentials

| Role | Username / Email | Password | Primary Console Access |
| :--- | :--- | :--- | :--- |
| **Operations Lead / Admin** | `admin@sthirax.com` | `sthirax_admin_pass` | `/app/dashboard`, `/app/approvals`, `/app/orders` |
| **Plant Manager** | `plant.hosur@sthirax.com` | `plant_manager_pass` | `/app/batches`, `/app/logistics`, `/app/plants` |
| **Quality Inspector** | `qa@sthirax.com` | `quality_qa_pass` | `/app/quality`, `/app/trace-admin` |
| **Auditor (Read-Only)** | `auditor@registry.org` | `auditor_pass` | `/app/audit-log`, `/app/carbon-offtake` |
