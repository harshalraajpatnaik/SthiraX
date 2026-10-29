package com.sthirax.domain.model;

import java.time.Instant;

public class CarbonAccountingRecord {
    private String id;
    private String batchId;
    private String batchNumber;
    private Double co2InputKg;
    private Double mineralizedCo2Kg;
    private Double processEmissionsKg;
    private Double transportEmissionsKg;
    private Double estimatedNetRemovalKg; // Stored minus life-cycle emissions within boundary
    private Double avoidedEmissionsKg; // Comparative baseline savings vs ordinary Portland cement
    private String methodologyVersion; // e.g. "SthiraX-MRV-v1.0 (Draft based on ISO 14064-2 principles)"
    private String evidenceCompleteness; // COMPLETE, PARTIAL, PENDING_LAB
    private String verificationStatus; // INTERNAL_REVIEWED, THIRD_PARTY_AUDIT_PENDING, VERIFIED
    private String registryOfftakeStatus; // UNALLOTTED, PLEDGED, NOT_OFFERED
    private String notes;
    private Instant createdAt;

    public CarbonAccountingRecord() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getBatchId() { return batchId; }
    public void setBatchId(String batchId) { this.batchId = batchId; }
    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }
    public Double getCo2InputKg() { return co2InputKg; }
    public void setCo2InputKg(Double co2InputKg) { this.co2InputKg = co2InputKg; }
    public Double getMineralizedCo2Kg() { return mineralizedCo2Kg; }
    public void setMineralizedCo2Kg(Double mineralizedCo2Kg) { this.mineralizedCo2Kg = mineralizedCo2Kg; }
    public Double getProcessEmissionsKg() { return processEmissionsKg; }
    public void setProcessEmissionsKg(Double processEmissionsKg) { this.processEmissionsKg = processEmissionsKg; }
    public Double getTransportEmissionsKg() { return transportEmissionsKg; }
    public void setTransportEmissionsKg(Double transportEmissionsKg) { this.transportEmissionsKg = transportEmissionsKg; }
    public Double getEstimatedNetRemovalKg() { return estimatedNetRemovalKg; }
    public void setEstimatedNetRemovalKg(Double estimatedNetRemovalKg) { this.estimatedNetRemovalKg = estimatedNetRemovalKg; }
    public Double getAvoidedEmissionsKg() { return avoidedEmissionsKg; }
    public void setAvoidedEmissionsKg(Double avoidedEmissionsKg) { this.avoidedEmissionsKg = avoidedEmissionsKg; }
    public String getMethodologyVersion() { return methodologyVersion; }
    public void setMethodologyVersion(String methodologyVersion) { this.methodologyVersion = methodologyVersion; }
    public String getEvidenceCompleteness() { return evidenceCompleteness; }
    public void setEvidenceCompleteness(String evidenceCompleteness) { this.evidenceCompleteness = evidenceCompleteness; }
    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }
    public String getRegistryOfftakeStatus() { return registryOfftakeStatus; }
    public void setRegistryOfftakeStatus(String registryOfftakeStatus) { this.registryOfftakeStatus = registryOfftakeStatus; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
