package com.sthirax.service;

import com.sthirax.domain.model.CostModel;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

public class CostCalculationServiceTest {

    private CostCalculationService costService;

    @BeforeEach
    void setUp() {
        costService = new CostCalculationService();
    }

    @Test
    @DisplayName("Should accurately calculate saleable output, cost per tonne, and contribution margin")
    void testStandardCalculation() {
        CostModel model = new CostModel();
        model.setAnnualCapacityTonnes(10000.0);
        model.setExpectedUtilisationRate(0.80); // 8,000 tonnes gross
        model.setRejectionRate(0.05); // 5% rejection -> 7,600 tonnes saleable

        model.setSthiraxSellingPriceInr(new BigDecimal("3500.00"));
        model.setRawMaterialCostPerTonneInr(new BigDecimal("1800.00"));
        model.setCo2CostPerTonneInr(new BigDecimal("100.00"));
        model.setCo2TransportCostPerTonneInr(new BigDecimal("50.00"));
        model.setEnergyCostPerTonneInr(new BigDecimal("100.00"));
        model.setLaborCostPerTonneInr(new BigDecimal("200.00"));
        model.setMaintenanceCostPerTonneInr(new BigDecimal("50.00"));
        model.setQualityTestingCostPerTonneInr(new BigDecimal("30.00"));
        model.setOverheadCostPerTonneInr(new BigDecimal("70.00"));
        model.setEquipmentLeasePerYearInr(new BigDecimal("500000.00")); // Fixed annual lease

        CostModel result = costService.calculate(model);

        assertEquals(7600.0, result.getEffectiveSaleableOutputTonnes(), 0.01);
        assertNotNull(result.getTotalCostPerTonneInr());
        assertTrue(result.getContributionMarginPerTonneInr().compareTo(BigDecimal.ZERO) > 0);
        assertTrue(result.getContributionMarginPercent().compareTo(BigDecimal.ZERO) > 0);
        assertTrue(result.getBreakEvenVolumeTonnes() > 0);
    }

    @Test
    @DisplayName("Should handle edge cases like zero capacity, zero price and zero lease without divide-by-zero")
    void testZeroDivisionSafeties() {
        CostModel model = new CostModel();
        model.setAnnualCapacityTonnes(0.0);
        model.setExpectedUtilisationRate(0.0);
        model.setRejectionRate(0.0);
        model.setSthiraxSellingPriceInr(BigDecimal.ZERO);
        model.setEquipmentLeasePerYearInr(BigDecimal.ZERO);
        model.setInitialInvestmentInr(BigDecimal.ZERO);

        CostModel result = costService.calculate(model);

        assertEquals(0.0, result.getEffectiveSaleableOutputTonnes());
        assertEquals(0.0, result.getBreakEvenVolumeTonnes());
        assertEquals(0.0, result.getApproximatePaybackYears());
        assertEquals(BigDecimal.ZERO, result.getContributionMarginPercent());
    }
}
