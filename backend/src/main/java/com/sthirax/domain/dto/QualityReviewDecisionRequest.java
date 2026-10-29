package com.sthirax.domain.dto;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class QualityReviewDecisionRequest {
    @NotBlank(message = "Decision is required (APPROVED, REJECTED, CORRECTION_REQUESTED)")
    private String decision;
    private String decisionReason;
    private List<String> checklistPassed;
    private boolean strengthMetBisStandard;
    private boolean co2FlowEvidenceVerified;
    private boolean rawMaterialBatchTicketsVerified;
    private String laboratoryReportReference;

    public QualityReviewDecisionRequest() {}

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
}
