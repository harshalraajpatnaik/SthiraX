package com.sthirax.domain.model;

import java.math.BigDecimal;
import java.time.Instant;

public class CarbonOfftakeOpportunity {
    private String id;
    private String prospectiveBuyerName;
    private String buyerType; // TECH_CORPORATE, SUSTAINABLE_REAL_ESTATE, ESG_FUND, AGGREGATOR
    private Double targetQuantityTonnes;
    private String deliveryPeriod; // e.g. "Q3 2026 - Q2 2027"
    private BigDecimal indicativePricePerTonneInr;
    private String applicableMethodology;
    private String eligibilityStatus; // EVALUATING, QUALIFIED, AUDIT_REQUIRED, NOT_ELIGIBLE
    private String contractStatus; // PROSPECT, NDA_SIGNED, TERM_SHEET, EXECUTED, CANCELLED
    private BigDecimal expectedTransactionCostsInr;
    private BigDecimal actualRealizedRevenueInr;
    private String notes;
    private Instant createdAt;

    public CarbonOfftakeOpportunity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getProspectiveBuyerName() { return prospectiveBuyerName; }
    public void setProspectiveBuyerName(String prospectiveBuyerName) { this.prospectiveBuyerName = prospectiveBuyerName; }
    public String getBuyerType() { return buyerType; }
    public void setBuyerType(String buyerType) { this.buyerType = buyerType; }
    public Double getTargetQuantityTonnes() { return targetQuantityTonnes; }
    public void setTargetQuantityTonnes(Double targetQuantityTonnes) { this.targetQuantityTonnes = targetQuantityTonnes; }
    public String getDeliveryPeriod() { return deliveryPeriod; }
    public void setDeliveryPeriod(String deliveryPeriod) { this.deliveryPeriod = deliveryPeriod; }
    public BigDecimal getIndicativePricePerTonneInr() { return indicativePricePerTonneInr; }
    public void setIndicativePricePerTonneInr(BigDecimal indicativePricePerTonneInr) { this.indicativePricePerTonneInr = indicativePricePerTonneInr; }
    public String getApplicableMethodology() { return applicableMethodology; }
    public void setApplicableMethodology(String applicableMethodology) { this.applicableMethodology = applicableMethodology; }
    public String getEligibilityStatus() { return eligibilityStatus; }
    public void setEligibilityStatus(String eligibilityStatus) { this.eligibilityStatus = eligibilityStatus; }
    public String getContractStatus() { return contractStatus; }
    public void setContractStatus(String contractStatus) { this.contractStatus = contractStatus; }
    public BigDecimal getExpectedTransactionCostsInr() { return expectedTransactionCostsInr; }
    public void setExpectedTransactionCostsInr(BigDecimal expectedTransactionCostsInr) { this.expectedTransactionCostsInr = expectedTransactionCostsInr; }
    public BigDecimal getActualRealizedRevenueInr() { return actualRealizedRevenueInr; }
    public void setActualRealizedRevenueInr(BigDecimal actualRealizedRevenueInr) { this.actualRealizedRevenueInr = actualRealizedRevenueInr; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
