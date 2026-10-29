package com.sthirax.domain.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public class RoadmapMilestone {
    private String id;
    private Integer orderIndex;
    private String phaseName;
    private String objective;
    private String plannedTimeline;
    private String status; // NOT_STARTED, IN_PROGRESS, VALIDATED, DEFERRED
    private String dependencies;
    private String responsibleLead;
    private BigDecimal estimatedCostMinInr;
    private BigDecimal estimatedCostMaxInr;
    private String costAssumptions;
    private List<String> deliverables;
    private List<String> keyRisks;
    private String completionEvidence;
    private Instant createdAt;

    public RoadmapMilestone() {}

    public RoadmapMilestone(String id, Integer orderIndex, String phaseName, String objective, 
                            String plannedTimeline, String status, String dependencies, 
                            String responsibleLead, BigDecimal estimatedCostMinInr, 
                            BigDecimal estimatedCostMaxInr, String costAssumptions, 
                            List<String> deliverables, List<String> keyRisks, String completionEvidence) {
        this.id = id;
        this.orderIndex = orderIndex;
        this.phaseName = phaseName;
        this.objective = objective;
        this.plannedTimeline = plannedTimeline;
        this.status = status;
        this.dependencies = dependencies;
        this.responsibleLead = responsibleLead;
        this.estimatedCostMinInr = estimatedCostMinInr;
        this.estimatedCostMaxInr = estimatedCostMaxInr;
        this.costAssumptions = costAssumptions;
        this.deliverables = deliverables;
        this.keyRisks = keyRisks;
        this.completionEvidence = completionEvidence;
        this.createdAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
    public String getPhaseName() { return phaseName; }
    public void setPhaseName(String phaseName) { this.phaseName = phaseName; }
    public String getObjective() { return objective; }
    public void setObjective(String objective) { this.objective = objective; }
    public String getPlannedTimeline() { return plannedTimeline; }
    public void setPlannedTimeline(String plannedTimeline) { this.plannedTimeline = plannedTimeline; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDependencies() { return dependencies; }
    public void setDependencies(String dependencies) { this.dependencies = dependencies; }
    public String getResponsibleLead() { return responsibleLead; }
    public void setResponsibleLead(String responsibleLead) { this.responsibleLead = responsibleLead; }
    public BigDecimal getEstimatedCostMinInr() { return estimatedCostMinInr; }
    public void setEstimatedCostMinInr(BigDecimal estimatedCostMinInr) { this.estimatedCostMinInr = estimatedCostMinInr; }
    public BigDecimal getEstimatedCostMaxInr() { return estimatedCostMaxInr; }
    public void setEstimatedCostMaxInr(BigDecimal estimatedCostMaxInr) { this.estimatedCostMaxInr = estimatedCostMaxInr; }
    public String getCostAssumptions() { return costAssumptions; }
    public void setCostAssumptions(String costAssumptions) { this.costAssumptions = costAssumptions; }
    public List<String> getDeliverables() { return deliverables; }
    public void setDeliverables(List<String> deliverables) { this.deliverables = deliverables; }
    public List<String> getKeyRisks() { return keyRisks; }
    public void setKeyRisks(List<String> keyRisks) { this.keyRisks = keyRisks; }
    public String getCompletionEvidence() { return completionEvidence; }
    public void setCompletionEvidence(String completionEvidence) { this.completionEvidence = completionEvidence; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
