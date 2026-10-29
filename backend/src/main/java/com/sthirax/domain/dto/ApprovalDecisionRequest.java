package com.sthirax.domain.dto;

import javax.validation.constraints.NotBlank;

public class ApprovalDecisionRequest {
    @NotBlank(message = "Decision is required (APPROVED, REJECTED, CHANGES_REQUESTED)")
    private String decision;
    private String reviewerNotes;
    private String decisionReason;

    public ApprovalDecisionRequest() {}

    public String getDecision() { return decision; }
    public void setDecision(String decision) { this.decision = decision; }
    public String getReviewerNotes() { return reviewerNotes; }
    public void setReviewerNotes(String reviewerNotes) { this.reviewerNotes = reviewerNotes; }
    public String getDecisionReason() { return decisionReason; }
    public void setDecisionReason(String decisionReason) { this.decisionReason = decisionReason; }
}
