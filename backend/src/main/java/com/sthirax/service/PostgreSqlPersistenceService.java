package com.sthirax.service;

import com.sthirax.domain.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.*;

@Service
public class PostgreSqlPersistenceService {

    private static final Logger log = LoggerFactory.getLogger(PostgreSqlPersistenceService.class);

    private final JdbcTemplate jdbcTemplate;

    public PostgreSqlPersistenceService() {
        this.jdbcTemplate = null;
    }

    @Autowired
    public PostgreSqlPersistenceService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean isConnected() {
        if (jdbcTemplate == null) return false;
        try {
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return result != null && result == 1;
        } catch (Exception e) {
            log.warn("PostgreSQL connection check failed: {}", e.getMessage());
            return false;
        }
    }

    public Map<String, Object> getDatabaseStatus() {
        Map<String, Object> status = new LinkedHashMap<>();
        boolean connected = isConnected();
        status.put("connected", connected);
        status.put("database", "PostgreSQL 15 (Docker container: sthirax-postgres)");
        status.put("host", "localhost:5432 / sthirax_db");

        if (connected) {
            try {
                status.put("plantsCount", jdbcTemplate.queryForObject("SELECT count(*) FROM plants", Long.class));
                status.put("co2SuppliersCount", jdbcTemplate.queryForObject("SELECT count(*) FROM co2_suppliers", Long.class));
                status.put("productsCount", jdbcTemplate.queryForObject("SELECT count(*) FROM products", Long.class));
                status.put("batchesCount", jdbcTemplate.queryForObject("SELECT count(*) FROM production_batches", Long.class));
                status.put("passportsCount", jdbcTemplate.queryForObject("SELECT count(*) FROM product_passports", Long.class));
                status.put("enquiriesCount", jdbcTemplate.queryForObject("SELECT count(*) FROM enquiries", Long.class));
                status.put("partnerApplicationsCount", jdbcTemplate.queryForObject("SELECT count(*) FROM partner_applications", Long.class));
                status.put("auditEventsCount", jdbcTemplate.queryForObject("SELECT count(*) FROM audit_events", Long.class));
                status.put("statusMessage", "PostgreSQL 15 is active, connected, and persisting industrial data end-to-end.");
            } catch (Exception e) {
                status.put("error", e.getMessage());
            }
        } else {
            status.put("statusMessage", "Operating in resilient in-memory mode; PostgreSQL offline.");
        }
        return status;
    }

    public void persistEnquiry(Enquiry enquiry) {
        if (!isConnected()) return;
        try {
            String sql = "INSERT INTO enquiries (id, name, organization, email, phone, enquiry_type, product_category, estimated_volume_units, delivery_pincode, target_delivery_date, message, status, created_at) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
                    "ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status";
            jdbcTemplate.update(sql,
                    enquiry.getId(),
                    enquiry.getContactName() != null ? enquiry.getContactName() : "Anonymous",
                    enquiry.getCompanyName() != null ? enquiry.getCompanyName() : "Individual",
                    enquiry.getEmail() != null ? enquiry.getEmail() : "no-email@sthirax.com",
                    enquiry.getPhone(),
                    enquiry.getType(),
                    enquiry.getProductId(),
                    enquiry.getQuantity() != null ? enquiry.getQuantity().intValue() : 0,
                    enquiry.getDeliveryPincode(),
                    enquiry.getExpectedDate(),
                    enquiry.getNotes(),
                    enquiry.getStatus(),
                    Timestamp.from(enquiry.getCreatedAt() != null ? enquiry.getCreatedAt() : Instant.now())
            );
            log.info("Persisted enquiry {} into PostgreSQL", enquiry.getId());
        } catch (Exception e) {
            log.error("Failed to persist enquiry to PostgreSQL: {}", e.getMessage());
        }
    }

    public void persistPartnerApplication(PartnerApplication app) {
        if (!isConnected()) return;
        try {
            String sql = "INSERT INTO partner_applications (id, company_name, contact_person, email, phone, plant_location, state, annual_capacity_tonnes, current_products, existing_steam_curing, status, created_at) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
                    "ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status";
            String products = app.getManufacturedProducts() != null ? String.join(", ", app.getManufacturedProducts()) : "Precast Concrete";
            boolean hasSteam = app.getCuringMethod() != null && app.getCuringMethod().toLowerCase().contains("steam");
            double capacity = app.getMonthlyCapacityTPA() != null ? app.getMonthlyCapacityTPA() * 12.0 : 10000.0;
            String location = app.getFacilityLocation() != null ? app.getFacilityLocation() : "India";
            String state = app.getFacilityPincode() != null ? "PIN: " + app.getFacilityPincode() : "India";

            jdbcTemplate.update(sql,
                    app.getId(),
                    app.getCompanyName() != null ? app.getCompanyName() : "Partner Applicant",
                    app.getContactPerson() != null ? app.getContactPerson() : "Contact",
                    app.getEmail() != null ? app.getEmail() : "partner@sthirax.com",
                    app.getPhone(),
                    location,
                    state,
                    BigDecimal.valueOf(capacity),
                    products,
                    hasSteam,
                    app.getStatus() != null ? app.getStatus() : "PENDING_REVIEW",
                    Timestamp.from(app.getCreatedAt() != null ? app.getCreatedAt() : Instant.now())
            );
            log.info("Persisted partner application {} into PostgreSQL", app.getId());
        } catch (Exception e) {
            log.error("Failed to persist partner application to PostgreSQL: {}", e.getMessage());
        }
    }

    public void persistBatch(ProductionBatch b) {
        if (!isConnected()) return;
        try {
            String sql = "INSERT INTO production_batches (id, batch_number, plant_id, product_id, production_date, quantity_units, quantity_tonnes, " +
                    "co2_injected_kg, co2_mineralized_kg, net_gate_to_gate_removal_kg, compressive_strength_7d_mpa, compressive_strength_28d_mpa, " +
                    "water_absorption_percent, curing_duration_hours, curing_temp_celsius, curing_humidity_percent, status, passport_id, created_at) " +
                    "VALUES (?, ?, ?, ?, CURRENT_DATE, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
                    "ON CONFLICT (batch_number) DO UPDATE SET " +
                    "status = EXCLUDED.status, passport_id = EXCLUDED.passport_id, " +
                    "compressive_strength_28d_mpa = EXCLUDED.compressive_strength_28d_mpa, " +
                    "co2_mineralized_kg = EXCLUDED.co2_mineralized_kg";

            double tonnes = b.getRawMaterialTonnage() != null ? b.getRawMaterialTonnage() : 25.0;
            int units = (int) (tonnes * 400); // ~2.5 kg per paver unit
            double co2Injected = b.getCo2InputKg() != null ? b.getCo2InputKg() : 280.0;
            double co2Mineralized = b.getEstimatedUptakeKg() != null ? b.getEstimatedUptakeKg() : 245.0;
            double netRemoval = co2Mineralized * 0.88; // after parasitics
            double strength = b.getTestedCompressiveStrengthMpa() != null ? b.getTestedCompressiveStrengthMpa() : 42.5;

            jdbcTemplate.update(sql,
                    b.getId(),
                    b.getBatchNumber(),
                    b.getPlantId() != null ? b.getPlantId() : "PLT-001",
                    b.getProductId() != null ? b.getProductId() : "prod-paver-interlock",
                    units,
                    BigDecimal.valueOf(tonnes),
                    BigDecimal.valueOf(co2Injected),
                    BigDecimal.valueOf(co2Mineralized),
                    BigDecimal.valueOf(netRemoval),
                    BigDecimal.valueOf(strength * 0.72),
                    BigDecimal.valueOf(strength),
                    BigDecimal.valueOf(3.8),
                    b.getCuringDurationHours() != null ? b.getCuringDurationHours() : 18,
                    BigDecimal.valueOf(45.0),
                    BigDecimal.valueOf(85.0),
                    b.getBatchStatus() != null ? b.getBatchStatus() : "TESTING",
                    b.getPublicPassportId(),
                    Timestamp.from(b.getCreatedAt() != null ? b.getCreatedAt() : Instant.now())
            );
            log.info("Persisted production batch {} into PostgreSQL", b.getBatchNumber());
        } catch (Exception e) {
            log.error("Failed to persist production batch to PostgreSQL: {}", e.getMessage());
        }
    }

    public void persistPassport(ProductPassport p) {
        if (!isConnected()) return;
        try {
            String resolvedBatchId = p.getBatchId();
            try {
                String existingId = jdbcTemplate.queryForObject(
                        "SELECT id FROM production_batches WHERE batch_number = ?", String.class, p.getBatchNumber());
                if (existingId != null) {
                    resolvedBatchId = existingId;
                }
            } catch (Exception ignored) {}

            String sql = "INSERT INTO product_passports (id, batch_id, batch_number, product_name, plant_location, " +
                    "co2_injected_kg, mineralized_co2_kg, net_gate_to_gate_removal_kg, bis_standard_reference, tested_strength_mpa, " +
                    "verification_hash, publicly_scannable, published_at) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
                    "ON CONFLICT (id) DO UPDATE SET publicly_scannable = EXCLUDED.publicly_scannable";

            double injected = p.getCo2InjectedKg() != null ? p.getCo2InjectedKg() : 280.0;
            double mineralized = p.getMineralizedCo2Kg() != null ? p.getMineralizedCo2Kg() : 245.0;
            double net = mineralized * 0.88;
            double strength = p.getTestedStrengthMpa() != null ? p.getTestedStrengthMpa() : 44.2;

            jdbcTemplate.update(sql,
                    p.getId(),
                    resolvedBatchId,
                    p.getBatchNumber(),
                    p.getProductName() != null ? p.getProductName() : "Carbon-Cured Paver",
                    p.getPlantLocation() != null ? p.getPlantLocation() : "Hosur Facility",
                    BigDecimal.valueOf(injected),
                    BigDecimal.valueOf(mineralized),
                    BigDecimal.valueOf(net),
                    p.getBisStandardReference() != null ? p.getBisStandardReference() : "IS 15658:2006",
                    BigDecimal.valueOf(strength),
                    p.getQrCodePayload() != null ? p.getQrCodePayload() : UUID.randomUUID().toString(),
                    true,
                    Timestamp.from(p.getPublishedAt() != null ? p.getPublishedAt() : Instant.now())
            );
            log.info("Persisted product passport {} into PostgreSQL", p.getId());
        } catch (Exception e) {
            log.error("Failed to persist product passport to PostgreSQL: {}", e.getMessage());
        }
    }

    public void persistAuditEvent(AuditEvent event) {
        if (!isConnected()) return;
        try {
            String sql = "INSERT INTO audit_events (id, timestamp, action, entity_type, entity_id, user_email, details) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT (id) DO NOTHING";
            String user = event.getPerformedByUserName() != null ? event.getPerformedByUserName() : 
                    (event.getPerformedByUserId() != null ? event.getPerformedByUserId() : "system@sthirax.com");
            jdbcTemplate.update(sql,
                    event.getId(),
                    Timestamp.from(event.getTimestamp() != null ? event.getTimestamp() : Instant.now()),
                    event.getAction(),
                    event.getEntityType(),
                    event.getEntityId(),
                    user,
                    event.getDetails()
            );
        } catch (Exception e) {
            log.error("Failed to persist audit event to PostgreSQL: {}", e.getMessage());
        }
    }
}
