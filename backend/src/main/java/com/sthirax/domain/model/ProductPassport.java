package com.sthirax.domain.model;

import java.time.Instant;
import java.util.List;

public class ProductPassport {
    private String id; // non-guessable slug or token, e.g. "pass-7f9a2b4c"
    private String batchId;
    private String batchNumber;
    private String productName;
    private String productCategory;
    private String plantLocation;
    private String productionDate;
    private String publicationStatus; // DRAFT, PUBLISHED, SUPERSEDED, REVOKED
    private String verificationStatus; // "ESTIMATED", "RECORDED", "EVIDENCE_SUBMITTED", "REVIEWED", "INDEPENDENTLY_VERIFIED"
    private String reviewerRole;
    private Double totalOutputUnits;
    private String outputUnit;
    private Double co2InjectedKg;
    private Double mineralizedCo2Kg;
    private String measurementMethodology;
    private String bisStandardReference;
    private Double testedStrengthMpa;
    private List<String> verifiedRecycledFeedstocks;
    private String qrCodePayload;
    private String disclaimer;
    private Instant publishedAt;

    public ProductPassport() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getBatchId() { return batchId; }
    public void setBatchId(String batchId) { this.batchId = batchId; }
    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public String getProductCategory() { return productCategory; }
    public void setProductCategory(String productCategory) { this.productCategory = productCategory; }
    public String getPlantLocation() { return plantLocation; }
    public void setPlantLocation(String plantLocation) { this.plantLocation = plantLocation; }
    public String getProductionDate() { return productionDate; }
    public void setProductionDate(String productionDate) { this.productionDate = productionDate; }
    public String getPublicationStatus() { return publicationStatus; }
    public void setPublicationStatus(String publicationStatus) { this.publicationStatus = publicationStatus; }
    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }
    public String getReviewerRole() { return reviewerRole; }
    public void setReviewerRole(String reviewerRole) { this.reviewerRole = reviewerRole; }
    public Double getTotalOutputUnits() { return totalOutputUnits; }
    public void setTotalOutputUnits(Double totalOutputUnits) { this.totalOutputUnits = totalOutputUnits; }
    public String getOutputUnit() { return outputUnit; }
    public void setOutputUnit(String outputUnit) { this.outputUnit = outputUnit; }
    public Double getCo2InjectedKg() { return co2InjectedKg; }
    public void setCo2InjectedKg(Double co2InjectedKg) { this.co2InjectedKg = co2InjectedKg; }
    public Double getMineralizedCo2Kg() { return mineralizedCo2Kg; }
    public void setMineralizedCo2Kg(Double mineralizedCo2Kg) { this.mineralizedCo2Kg = mineralizedCo2Kg; }
    public String getMeasurementMethodology() { return measurementMethodology; }
    public void setMeasurementMethodology(String measurementMethodology) { this.measurementMethodology = measurementMethodology; }
    public String getBisStandardReference() { return bisStandardReference; }
    public void setBisStandardReference(String bisStandardReference) { this.bisStandardReference = bisStandardReference; }
    public Double getTestedStrengthMpa() { return testedStrengthMpa; }
    public void setTestedStrengthMpa(Double testedStrengthMpa) { this.testedStrengthMpa = testedStrengthMpa; }
    public List<String> getVerifiedRecycledFeedstocks() { return verifiedRecycledFeedstocks; }
    public void setVerifiedRecycledFeedstocks(List<String> verifiedRecycledFeedstocks) { this.verifiedRecycledFeedstocks = verifiedRecycledFeedstocks; }
    public String getQrCodePayload() { return qrCodePayload; }
    public void setQrCodePayload(String qrCodePayload) { this.qrCodePayload = qrCodePayload; }
    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }
    public Instant getPublishedAt() { return publishedAt; }
    public void setPublishedAt(Instant publishedAt) { this.publishedAt = publishedAt; }
}
