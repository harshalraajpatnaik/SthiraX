-- SthiraX Industrial Relational Schema (PostgreSQL 15)

CREATE TABLE IF NOT EXISTS organisations (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(64) NOT NULL,
    status VARCHAR(64) NOT NULL,
    gstin VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    organisation_id VARCHAR(64) REFERENCES organisations(id),
    roles VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plants (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    state VARCHAR(64) NOT NULL,
    latitude NUMERIC(9,6),
    longitude NUMERIC(9,6),
    annual_capacity_tonnes NUMERIC(12,2) NOT NULL,
    curing_enclosure_type VARCHAR(64) NOT NULL,
    curing_volume_m3 NUMERIC(10,2) NOT NULL,
    co2_storage_capacity_kg NUMERIC(12,2) NOT NULL,
    status VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS co2_suppliers (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    emitter_type VARCHAR(64) NOT NULL,
    co2_purity_percent NUMERIC(5,2) NOT NULL,
    monthly_capacity_tonnes NUMERIC(12,2) NOT NULL,
    storage_tank_capacity_kg NUMERIC(12,2) NOT NULL,
    status VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    dimensions VARCHAR(128) NOT NULL,
    compressive_strength_target VARCHAR(64) NOT NULL,
    co2_uptake_target VARCHAR(64) NOT NULL,
    bis_standard_reference VARCHAR(64) NOT NULL,
    indicative_price_inr NUMERIC(10,2) NOT NULL,
    status VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS production_batches (
    id VARCHAR(64) PRIMARY KEY,
    batch_number VARCHAR(64) UNIQUE NOT NULL,
    plant_id VARCHAR(64) REFERENCES plants(id),
    product_id VARCHAR(64) REFERENCES products(id),
    production_date DATE NOT NULL,
    quantity_units INTEGER NOT NULL,
    quantity_tonnes NUMERIC(10,2) NOT NULL,
    co2_injected_kg NUMERIC(10,2) NOT NULL,
    co2_mineralized_kg NUMERIC(10,2) NOT NULL,
    net_gate_to_gate_removal_kg NUMERIC(10,2) NOT NULL,
    compressive_strength_7d_mpa NUMERIC(6,2),
    compressive_strength_28d_mpa NUMERIC(6,2),
    water_absorption_percent NUMERIC(5,2),
    curing_duration_hours INTEGER,
    curing_temp_celsius NUMERIC(5,2),
    curing_humidity_percent NUMERIC(5,2),
    status VARCHAR(64) NOT NULL,
    passport_id VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_passports (
    id VARCHAR(64) PRIMARY KEY,
    batch_id VARCHAR(64) REFERENCES production_batches(id),
    batch_number VARCHAR(64) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    plant_location VARCHAR(255) NOT NULL,
    co2_injected_kg NUMERIC(10,2) NOT NULL,
    mineralized_co2_kg NUMERIC(10,2) NOT NULL,
    net_gate_to_gate_removal_kg NUMERIC(10,2) NOT NULL,
    bis_standard_reference VARCHAR(64) NOT NULL,
    tested_strength_mpa NUMERIC(6,2) NOT NULL,
    verification_hash VARCHAR(255) NOT NULL,
    publicly_scannable BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quality_reviews (
    id VARCHAR(64) PRIMARY KEY,
    batch_id VARCHAR(64) REFERENCES production_batches(id),
    reviewed_by VARCHAR(255) NOT NULL,
    review_date DATE NOT NULL,
    approved BOOLEAN NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_events (
    id VARCHAR(64) PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    action VARCHAR(64) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id VARCHAR(64) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    details TEXT
);

-- Seed initial organizations
INSERT INTO organisations (id, name, type, status, gstin) VALUES
('ORG-STHIRAX', 'SthiraX Technologies Pvt Ltd', 'STHIRAX_ADMIN', 'ACTIVE', '29AABCS1234F1Z5'),
('ORG-PRAKRITI', 'Prakriti Precast Infrastructure Pvt Ltd', 'MANUFACTURER', 'ACTIVE', '33AABCP5678M1Z2'),
('ORG-DECCAN', 'Deccan Distilleries & Biofuels Ltd', 'CO2_SUPPLIER', 'ACTIVE', '29AABCD9012L1Z8')
ON CONFLICT (id) DO NOTHING;

-- Seed initial products
INSERT INTO products (id, slug, name, category, dimensions, compressive_strength_target, co2_uptake_target, bis_standard_reference, indicative_price_inr, status) VALUES
('prod-paver-interlock', 'interlocking-paving-blocks', 'SthiraX Carbon-Cured Interlocking Pavers', 'PAVER', '200 x 100 x 80 mm', '35.0 - 45.0 MPa', '28 - 34 kg/m2', 'IS 15658:2006', 48.00, 'AVAILABLE'),
('prod-block-solid', 'solid-concrete-blocks', 'SthiraX Mineralized Solid Masonry Blocks', 'BLOCK', '400 x 200 x 200 mm', '7.5 - 12.0 MPa', '1.8 - 2.4 kg/block', 'IS 2185 Part 1', 65.00, 'AVAILABLE'),
('prod-kerb-industrial', 'heavy-duty-kerbstones', 'Carbon-Sequestrated Heavy Duty Kerbstones', 'KERB', '450 x 300 x 150 mm', '30.0 - 40.0 MPa', '3.2 - 4.1 kg/unit', 'IRC:SP:63', 280.00, 'AVAILABLE'),
('prod-drain-cover', 'stormwater-drain-covers', 'SthiraX Carbonated Stormwater Drain Slabs', 'DRAIN_COVER', '600 x 450 x 75 mm', '25.0 - 35.0 MPa', '2.5 - 3.2 kg/slab', 'CPWD Specifications', 340.00, 'AVAILABLE')
ON CONFLICT (id) DO NOTHING;

-- Seed Hosur pilot plant
INSERT INTO plants (id, name, location, state, latitude, longitude, annual_capacity_tonnes, curing_enclosure_type, curing_volume_m3, co2_storage_capacity_kg, status) VALUES
('PLT-001', 'Hosur Pilot Precast Facility', 'Hosur Industrial Complex, Tamil Nadu', 'Tamil Nadu', 12.7409, 77.8253, 18000.00, 'SEALED_CHAMBER', 120.00, 15000.00, 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- Seed Deccan CO2 supplier
INSERT INTO co2_suppliers (id, name, location, emitter_type, co2_purity_percent, monthly_capacity_tonnes, storage_tank_capacity_kg, status) VALUES
('CO2-001', 'Deccan Distilleries & Biofuels Unit', 'Mandya District, Karnataka', 'DISTILLERY', 99.60, 1200.00, 45000.00, 'ACTIVE')
ON CONFLICT (id) DO NOTHING;
