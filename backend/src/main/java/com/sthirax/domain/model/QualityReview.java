package com.sthirax.domain.model;

import java.time.Instant;
import java.util.List;

public class QualityReview {
    private String id;
    private String batchId;
    private String batchNumber;
    private String reviewerId;
    private String reviewerName;
    private String decision; // PENDING, UNDER_REVIEW, APPROVED, REJECTED, CORRECTION_REQUESTED
    private String decisionReason;
    private List<String> checklistPassed;
    private boolean strengthMetBisStandard;
    private boolean co2FlowEvidenceVerified;
    private boolean rawMaterialBatchTicketsVerified;
    private String laboratoryReportReference;
    private Instant decisionTimestamp;
    private Instant createdAt;

    public QualityReview() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getBatchId() { return batchId; }
    public void setBatchId(String batchId) { this.batchId = batchId; }
    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }
    public String getReviewerId() { return reviewerId; }
    public void setReviewerId(String reviewerId) { this.reviewerId = reviewerId; }
    public String getReviewerName() { return reviewerName; }
    public void setReviewerName(String reviewerName) { this.reviewerName = reviewerName; }
    public String getDecision() { return decision; }
    public void setDecision(String decision) { this.decision = decision; }
    public String getDecisionReason() { return decisionReason; }
    public void setDecisionReason(String decisionReason) { this.decisionReason = decisionReason; }
    public List<String> getChecklistPassed() { return checklistPassed; }
    public void setChecklistPassed(List<String> checklistPassed) { this.checklistPassed = checklistPassed; }
    public boolean isStrengthMetBisStandard() { return strengthMetBisStandard; }
    public void setStrengthMetBisStandard(boolean strengthMetBisStandard) { this.strengthMetBisStandard = strengthMetBisStandard; }
    public boolean isCo2FlowEvidenceVerified() { return co2FlowEvidenceVerified; }
    public void setCo2FlowEvidenceVerified(boolean co2FlowEvidenceVerified) { this.co2FlowEvidenceVerified = co2FlowEvidenceVerified; }
    public boolean isRawMaterialBatchTicketsVerified() { return rawMaterialBatchTicketsVerified; }
    public void setRawMaterialBatchTicketsVerified(boolean rawMaterialBatchTicketsVerified) { this.rawMaterialBatchTicketsVerified = rawMaterialBatchTicketsVerified; }
    public String getLaboratoryReportReference() { return laboratoryReportReference; }
    public void setLaboratoryReportReference(String laboratoryReportReference) { this.laboratoryReportReference = laboratoryReportReference; }
    public Instant getDecisionTimestamp() { return decisionTimestamp; }
    public void setDecisionTimestamp(Instant decisionTimestamp) { this.decisionTimestamp = decisionTimestamp; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
