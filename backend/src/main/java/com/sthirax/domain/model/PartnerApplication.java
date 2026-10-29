package com.sthirax.domain.model;

import java.time.Instant;
import java.util.List;

public class PartnerApplication {
    private String id;
    private String applicantRole; // MANUFACTURER, CO2_SUPPLIER, LOGISTICS_PARTNER, BUYER
    private String companyName;
    private String contactPerson;
    private String email;
    private String phone;
    private String facilityLocation;
    private String facilityPincode;
    private List<String> manufacturedProducts;
    private Double monthlyCapacityTPA;
    private String currentFeedstocks; // e.g., OPC, Fly Ash, GGBS, C&D Recycled Fines
    private String curingMethod; // e.g., Ambient steam, dry chamber, natural
    private String co2SourceType; // For suppliers: Chemical plant, Fermentation, Power, Biogas
    private Double availableCo2TonnesPerMonth;
    private String co2PurityEstimate; // e.g. "98.5% food-grade" or "raw flue"
    private String logisticsCapabilities;
    private String status; // SUBMITTED, PENDING_REVIEW, UNDER_REVIEW, APPROVED, REJECTED, CHANGES_REQUESTED
    private String assignedReviewer;
    private String reviewNotes;
    private String decisionReason;
    private Instant decisionTimestamp;
    private Instant createdAt;

    public PartnerApplication() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getApplicantRole() { return applicantRole; }
    public void setApplicantRole(String applicantRole) { this.applicantRole = applicantRole; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getFacilityLocation() { return facilityLocation; }
    public void setFacilityLocation(String facilityLocation) { this.facilityLocation = facilityLocation; }
    public String getFacilityPincode() { return facilityPincode; }
    public void setFacilityPincode(String facilityPincode) { this.facilityPincode = facilityPincode; }
    public List<String> getManufacturedProducts() { return manufacturedProducts; }
    public void setManufacturedProducts(List<String> manufacturedProducts) { this.manufacturedProducts = manufacturedProducts; }
    public Double getMonthlyCapacityTPA() { return monthlyCapacityTPA; }
    public void setMonthlyCapacityTPA(Double monthlyCapacityTPA) { this.monthlyCapacityTPA = monthlyCapacityTPA; }
    public String getCurrentFeedstocks() { return currentFeedstocks; }
    public void setCurrentFeedstocks(String currentFeedstocks) { this.currentFeedstocks = currentFeedstocks; }
    public String getCuringMethod() { return curingMethod; }
    public void setCuringMethod(String curingMethod) { this.curingMethod = curingMethod; }
    public String getCo2SourceType() { return co2SourceType; }
    public void setCo2SourceType(String co2SourceType) { this.co2SourceType = co2SourceType; }
    public Double getAvailableCo2TonnesPerMonth() { return availableCo2TonnesPerMonth; }
    public void setAvailableCo2TonnesPerMonth(Double availableCo2TonnesPerMonth) { this.availableCo2TonnesPerMonth = availableCo2TonnesPerMonth; }
    public String getCo2PurityEstimate() { return co2PurityEstimate; }
    public void setCo2PurityEstimate(String co2PurityEstimate) { this.co2PurityEstimate = co2PurityEstimate; }
    public String getLogisticsCapabilities() { return logisticsCapabilities; }
    public void setLogisticsCapabilities(String logisticsCapabilities) { this.logisticsCapabilities = logisticsCapabilities; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getAssignedReviewer() { return assignedReviewer; }
    public void setAssignedReviewer(String assignedReviewer) { this.assignedReviewer = assignedReviewer; }
    public String getReviewNotes() { return reviewNotes; }
    public void setReviewNotes(String reviewNotes) { this.reviewNotes = reviewNotes; }
    public String getDecisionReason() { return decisionReason; }
    public void setDecisionReason(String decisionReason) { this.decisionReason = decisionReason; }
    public Instant getDecisionTimestamp() { return decisionTimestamp; }
    public void setDecisionTimestamp(Instant decisionTimestamp) { this.decisionTimestamp = decisionTimestamp; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
