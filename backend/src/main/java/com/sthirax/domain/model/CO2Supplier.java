package com.sthirax.domain.model;

import java.math.BigDecimal;

public class CO2Supplier {
    private String id;
    private String organisationId;
    private String companyName;
    private String facilityLocation;
    private String sourceCategory; // BIOETHANOL_FERMENTATION, AMMONIA_FERTILIZER, STEEL_SLAG_GAS, CAPTURE_PILOT
    private String purityGrade; // e.g., "99.2% industrial gas", "95% conditioned"
    private Double monthlyAvailableTonnes;
    private BigDecimal pricePerTonneInr;
    private String deliveryTerms; // EX_WORKS, CIP_DELIVERED
    private String transportMode; // CRYOGENIC_TANKER, PRESSURE_CYLINDER
    private String technicalApprovalStatus; // PENDING_TESTING, APPROVED, RESTRICTED
    private String notes;

    public CO2Supplier() {}

    public CO2Supplier(String id, String organisationId, String companyName, String facilityLocation, 
                       String sourceCategory, String purityGrade, Double monthlyAvailableTonnes, 
                       BigDecimal pricePerTonneInr, String deliveryTerms, String transportMode, 
                       String technicalApprovalStatus, String notes) {
        this.id = id;
        this.organisationId = organisationId;
        this.companyName = companyName;
        this.facilityLocation = facilityLocation;
        this.sourceCategory = sourceCategory;
        this.purityGrade = purityGrade;
        this.monthlyAvailableTonnes = monthlyAvailableTonnes;
        this.pricePerTonneInr = pricePerTonneInr;
        this.deliveryTerms = deliveryTerms;
        this.transportMode = transportMode;
        this.technicalApprovalStatus = technicalApprovalStatus;
        this.notes = notes;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getOrganisationId() { return organisationId; }
    public void setOrganisationId(String organisationId) { this.organisationId = organisationId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getFacilityLocation() { return facilityLocation; }
    public void setFacilityLocation(String facilityLocation) { this.facilityLocation = facilityLocation; }
    public String getSourceCategory() { return sourceCategory; }
    public void setSourceCategory(String sourceCategory) { this.sourceCategory = sourceCategory; }
    public String getPurityGrade() { return purityGrade; }
    public void setPurityGrade(String purityGrade) { this.purityGrade = purityGrade; }
    public Double getMonthlyAvailableTonnes() { return monthlyAvailableTonnes; }
    public void setMonthlyAvailableTonnes(Double monthlyAvailableTonnes) { this.monthlyAvailableTonnes = monthlyAvailableTonnes; }
    public BigDecimal getPricePerTonneInr() { return pricePerTonneInr; }
    public void setPricePerTonneInr(BigDecimal pricePerTonneInr) { this.pricePerTonneInr = pricePerTonneInr; }
    public String getDeliveryTerms() { return deliveryTerms; }
    public void setDeliveryTerms(String deliveryTerms) { this.deliveryTerms = deliveryTerms; }
    public String getTransportMode() { return transportMode; }
    public void setTransportMode(String transportMode) { this.transportMode = transportMode; }
    public String getTechnicalApprovalStatus() { return technicalApprovalStatus; }
    public void setTechnicalApprovalStatus(String technicalApprovalStatus) { this.technicalApprovalStatus = technicalApprovalStatus; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
