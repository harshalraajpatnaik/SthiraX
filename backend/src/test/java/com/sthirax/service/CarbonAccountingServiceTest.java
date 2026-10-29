package com.sthirax.service;

import com.sthirax.domain.model.CarbonAccountingRecord;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class CarbonAccountingServiceTest {

    private CarbonAccountingService carbonService;

    @BeforeEach
    void setUp() {
        carbonService = new CarbonAccountingService();
    }

    @Test
    @DisplayName("Should strictly enforce boundary separation: Injected != Mineralized != Net Removal != Avoided")
    void testBoundarySeparation() {
        double injected = 500.0;
        double uptakeRate = 0.85; // 85% reaction uptake
        double electricityKwh = 25.0;
        double transportDist = 100.0;
        double transportWeight = 0.5; // tonnes

        CarbonAccountingRecord record = carbonService.calculateCarbonBalance(
                injected, uptakeRate, electricityKwh, transportDist, transportWeight, 1400.0, 450.0
        );

        assertEquals(500.0, record.getCo2InputKg());
        assertEquals(425.0, record.getMineralizedCo2Kg());
        
        // Net removal must be strictly LESS than gross mineralized due to gate-to-gate deductions
        assertTrue(record.getEstimatedNetRemovalKg() < record.getMineralizedCo2Kg(), 
                "Net removal must deduct process and transport emissions");
        
        // Avoided emissions (substitution) must be separate
        assertEquals(950.0, record.getAvoidedEmissionsKg()); // 1400 - 450
        assertNotEquals(record.getEstimatedNetRemovalKg(), record.getAvoidedEmissionsKg(),
                "Avoided emissions must not be conflated with physical net carbon removal");
    }
}
