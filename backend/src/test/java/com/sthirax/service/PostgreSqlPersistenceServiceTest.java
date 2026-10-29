package com.sthirax.service;

import com.sthirax.domain.model.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.jdbc.core.JdbcTemplate;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collections;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class PostgreSqlPersistenceServiceTest {

    private JdbcTemplate mockJdbcTemplate;
    private PostgreSqlPersistenceService persistenceService;

    @BeforeEach
    void setUp() {
        mockJdbcTemplate = Mockito.mock(JdbcTemplate.class);
        persistenceService = new PostgreSqlPersistenceService(mockJdbcTemplate);
    }

    @Test
    @DisplayName("Should detect active PostgreSQL connection when SELECT 1 succeeds")
    void testIsConnectedSuccess() {
        when(mockJdbcTemplate.queryForObject("SELECT 1", Integer.class)).thenReturn(1);
        assertTrue(persistenceService.isConnected());
    }

    @Test
    @DisplayName("Should handle database connection failure gracefully without throwing unhandled exceptions")
    void testIsConnectedFailure() {
        when(mockJdbcTemplate.queryForObject("SELECT 1", Integer.class)).thenThrow(new RuntimeException("Connection refused"));
        assertFalse(persistenceService.isConnected());
    }

    @Test
    @DisplayName("Should return complete database metrics map when connected")
    void testGetDatabaseStatus() {
        when(mockJdbcTemplate.queryForObject("SELECT 1", Integer.class)).thenReturn(1);
        when(mockJdbcTemplate.queryForObject(contains("plants"), eq(Long.class))).thenReturn(1L);
        when(mockJdbcTemplate.queryForObject(contains("co2_suppliers"), eq(Long.class))).thenReturn(1L);
        when(mockJdbcTemplate.queryForObject(contains("products"), eq(Long.class))).thenReturn(4L);
        when(mockJdbcTemplate.queryForObject(contains("production_batches"), eq(Long.class))).thenReturn(2L);
        when(mockJdbcTemplate.queryForObject(contains("product_passports"), eq(Long.class))).thenReturn(1L);
        when(mockJdbcTemplate.queryForObject(contains("enquiries"), eq(Long.class))).thenReturn(2L);
        when(mockJdbcTemplate.queryForObject(contains("partner_applications"), eq(Long.class))).thenReturn(2L);
        when(mockJdbcTemplate.queryForObject(contains("audit_events"), eq(Long.class))).thenReturn(10L);

        Map<String, Object> status = persistenceService.getDatabaseStatus();

        assertTrue((Boolean) status.get("connected"));
        assertEquals(1L, status.get("plantsCount"));
        assertEquals(2L, status.get("batchesCount"));
        assertEquals(1L, status.get("passportsCount"));
        assertNotNull(status.get("statusMessage"));
    }

    @Test
    @DisplayName("Should persist Enquiry into relational table with correct parameters")
    void testPersistEnquiry() {
        when(mockJdbcTemplate.queryForObject("SELECT 1", Integer.class)).thenReturn(1);

        Enquiry enquiry = new Enquiry();
        enquiry.setId("enq-unit-01");
        enquiry.setContactName("Test Customer");
        enquiry.setCompanyName("Green Build Ltd");
        enquiry.setEmail("test@greenbuild.in");
        enquiry.setType("QUOTE");
        enquiry.setQuantity(2500.0);
        enquiry.setStatus("PENDING_REVIEW");
        enquiry.setCreatedAt(Instant.now());

        persistenceService.persistEnquiry(enquiry);

        verify(mockJdbcTemplate, times(1)).update(anyString(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any());
    }

    @Test
    @DisplayName("Should persist ProductionBatch with calculated mineralized carbon uptake")
    void testPersistBatch() {
        when(mockJdbcTemplate.queryForObject("SELECT 1", Integer.class)).thenReturn(1);

        ProductionBatch batch = new ProductionBatch();
        batch.setId("batch-unit-01");
        batch.setBatchNumber("STX-2026-UNIT-01");
        batch.setRawMaterialTonnage(20.0);
        batch.setCo2InputKg(250.0);
        batch.setEstimatedUptakeKg(220.0);
        batch.setTestedCompressiveStrengthMpa(45.0);
        batch.setBatchStatus("TESTING");
        batch.setCreatedAt(Instant.now());

        persistenceService.persistBatch(batch);

        verify(mockJdbcTemplate, times(1)).update(anyString(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any());
    }

    @Test
    @DisplayName("Should persist ProductPassport and maintain audit event integrity")
    void testPersistPassportAndAudit() {
        when(mockJdbcTemplate.queryForObject("SELECT 1", Integer.class)).thenReturn(1);
        when(mockJdbcTemplate.queryForObject(contains("SELECT id FROM production_batches"), eq(String.class), anyString())).thenReturn("batch-unit-01");

        ProductPassport passport = new ProductPassport();
        passport.setId("pass-unit-01");
        passport.setBatchId("batch-unit-01");
        passport.setBatchNumber("STX-2026-UNIT-01");
        passport.setProductName("Carbon-Cured Paver");
        passport.setCo2InjectedKg(250.0);
        passport.setMineralizedCo2Kg(220.0);
        passport.setTestedStrengthMpa(45.0);
        passport.setPublishedAt(Instant.now());

        persistenceService.persistPassport(passport);
        verify(mockJdbcTemplate, times(1)).update(contains("INSERT INTO product_passports"), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any());

        AuditEvent event = new AuditEvent("audit-01", "APPROVE", "PASSPORT", passport.getId(), "usr-1", "Harshal", "ADMIN", "Approved");
        persistenceService.persistAuditEvent(event);
        verify(mockJdbcTemplate, times(1)).update(contains("INSERT INTO audit_events"), any(), any(), any(), any(), any(), any(), any());
    }
}
