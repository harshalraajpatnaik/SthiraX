package com.sthirax.domain.model;

import java.math.BigDecimal;
import java.time.Instant;

public class CostModel {
    private String id;
    private String referenceType; // RETROFIT_SCENARIO, ORDER_COST_ESTIMATE
    private String referenceId;
    private String name;
    
    // Inputs
    private BigDecimal initialInvestmentInr;
    private Double annualCapacityTonnes;
    private Double expectedUtilisationRate;
    private BigDecimal conventionalSellingPriceInr;
    private BigDecimal sthiraxSellingPriceInr;
    private BigDecimal rawMaterialCostPerTonneInr;
    private BigDecimal co2CostPerTonneInr;
    private BigDecimal co2TransportCostPerTonneInr;
    private BigDecimal energyCostPerTonneInr;
    private BigDecimal laborCostPerTonneInr;
    private BigDecimal maintenanceCostPerTonneInr;
    private BigDecimal qualityTestingCostPerTonneInr;
    private BigDecimal equipmentLeasePerYearInr;
    private BigDecimal overheadCostPerTonneInr;
    private Double rejectionRate;
    
    // Calculated Outputs
    private Double effectiveSaleableOutputTonnes;
    private BigDecimal totalCostPerTonneInr;
    private BigDecimal contributionMarginPerTonneInr;
    private BigDecimal contributionMarginPercent;
    private BigDecimal annualOperatingContributionInr;
    private Double breakEvenVolumeTonnes;
    private Double approximatePaybackYears;

    private Instant createdAt;

    public CostModel() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getReferenceType() { return referenceType; }
    public void setReferenceType(String referenceType) { this.referenceType = referenceType; }
    public String getReferenceId() { return referenceId; }
    public void setReferenceId(String referenceId) { this.referenceId = referenceId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public BigDecimal getInitialInvestmentInr() { return initialInvestmentInr; }
    public void setInitialInvestmentInr(BigDecimal initialInvestmentInr) { this.initialInvestmentInr = initialInvestmentInr; }
    public Double getAnnualCapacityTonnes() { return annualCapacityTonnes; }
    public void setAnnualCapacityTonnes(Double annualCapacityTonnes) { this.annualCapacityTonnes = annualCapacityTonnes; }
    public Double getExpectedUtilisationRate() { return expectedUtilisationRate; }
    public void setExpectedUtilisationRate(Double expectedUtilisationRate) { this.expectedUtilisationRate = expectedUtilisationRate; }
    public BigDecimal getConventionalSellingPriceInr() { return conventionalSellingPriceInr; }
    public void setConventionalSellingPriceInr(BigDecimal conventionalSellingPriceInr) { this.conventionalSellingPriceInr = conventionalSellingPriceInr; }
    public BigDecimal getSthiraxSellingPriceInr() { return sthiraxSellingPriceInr; }
    public void setSthiraxSellingPriceInr(BigDecimal sthiraxSellingPriceInr) { this.sthiraxSellingPriceInr = sthiraxSellingPriceInr; }
    public BigDecimal getRawMaterialCostPerTonneInr() { return rawMaterialCostPerTonneInr; }
    public void setRawMaterialCostPerTonneInr(BigDecimal rawMaterialCostPerTonneInr) { this.rawMaterialCostPerTonneInr = rawMaterialCostPerTonneInr; }
    public BigDecimal getCo2CostPerTonneInr() { return co2CostPerTonneInr; }
    public void setCo2CostPerTonneInr(BigDecimal co2CostPerTonneInr) { this.co2CostPerTonneInr = co2CostPerTonneInr; }
    public BigDecimal getCo2TransportCostPerTonneInr() { return co2TransportCostPerTonneInr; }
    public void setCo2TransportCostPerTonneInr(BigDecimal co2TransportCostPerTonneInr) { this.co2TransportCostPerTonneInr = co2TransportCostPerTonneInr; }
    public BigDecimal getEnergyCostPerTonneInr() { return energyCostPerTonneInr; }
    public void setEnergyCostPerTonneInr(BigDecimal energyCostPerTonneInr) { this.energyCostPerTonneInr = energyCostPerTonneInr; }
    public BigDecimal getLaborCostPerTonneInr() { return laborCostPerTonneInr; }
    public void setLaborCostPerTonneInr(BigDecimal laborCostPerTonneInr) { this.laborCostPerTonneInr = laborCostPerTonneInr; }
    public BigDecimal getMaintenanceCostPerTonneInr() { return maintenanceCostPerTonneInr; }
    public void setMaintenanceCostPerTonneInr(BigDecimal maintenanceCostPerTonneInr) { this.maintenanceCostPerTonneInr = maintenanceCostPerTonneInr; }
    public BigDecimal getQualityTestingCostPerTonneInr() { return qualityTestingCostPerTonneInr; }
    public void setQualityTestingCostPerTonneInr(BigDecimal qualityTestingCostPerTonneInr) { this.qualityTestingCostPerTonneInr = qualityTestingCostPerTonneInr; }
    public BigDecimal getEquipmentLeasePerYearInr() { return equipmentLeasePerYearInr; }
    public void setEquipmentLeasePerYearInr(BigDecimal equipmentLeasePerYearInr) { this.equipmentLeasePerYearInr = equipmentLeasePerYearInr; }
    public BigDecimal getOverheadCostPerTonneInr() { return overheadCostPerTonneInr; }
    public void setOverheadCostPerTonneInr(BigDecimal overheadCostPerTonneInr) { this.overheadCostPerTonneInr = overheadCostPerTonneInr; }
    public Double getRejectionRate() { return rejectionRate; }
    public void setRejectionRate(Double rejectionRate) { this.rejectionRate = rejectionRate; }
    public Double getEffectiveSaleableOutputTonnes() { return effectiveSaleableOutputTonnes; }
    public void setEffectiveSaleableOutputTonnes(Double effectiveSaleableOutputTonnes) { this.effectiveSaleableOutputTonnes = effectiveSaleableOutputTonnes; }
    public BigDecimal getTotalCostPerTonneInr() { return totalCostPerTonneInr; }
    public void setTotalCostPerTonneInr(BigDecimal totalCostPerTonneInr) { this.totalCostPerTonneInr = totalCostPerTonneInr; }
    public BigDecimal getContributionMarginPerTonneInr() { return contributionMarginPerTonneInr; }
    public void setContributionMarginPerTonneInr(BigDecimal contributionMarginPerTonneInr) { this.contributionMarginPerTonneInr = contributionMarginPerTonneInr; }
    public BigDecimal getContributionMarginPercent() { return contributionMarginPercent; }
    public void setContributionMarginPercent(BigDecimal contributionMarginPercent) { this.contributionMarginPercent = contributionMarginPercent; }
    public BigDecimal getAnnualOperatingContributionInr() { return annualOperatingContributionInr; }
    public void setAnnualOperatingContributionInr(BigDecimal annualOperatingContributionInr) { this.annualOperatingContributionInr = annualOperatingContributionInr; }
    public Double getBreakEvenVolumeTonnes() { return breakEvenVolumeTonnes; }
    public void setBreakEvenVolumeTonnes(Double breakEvenVolumeTonnes) { this.breakEvenVolumeTonnes = breakEvenVolumeTonnes; }
    public Double getApproximatePaybackYears() { return approximatePaybackYears; }
    public void setApproximatePaybackYears(Double approximatePaybackYears) { this.approximatePaybackYears = approximatePaybackYears; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
