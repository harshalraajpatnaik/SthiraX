package com.sthirax.domain.model;

import java.time.Instant;

public class AuditEvent {
    private String id;
    private String action; // CREATE, UPDATE, APPROVE, REJECT, PUBLISH, REVOKE
    private String entityType; // ORDER, BATCH, QUALITY_REVIEW, PARTNER, PASSPORT, COST_MODEL
    private String entityId;
    private String performedByUserId;
    private String performedByUserName;
    private String userRole;
    private String details;
    private Instant timestamp;

    public AuditEvent() {}

    public AuditEvent(String id, String action, String entityType, String entityId, 
                      String performedByUserId, String performedByUserName, String userRole, String details) {
        this.id = id;
        this.action = action;
        this.entityType = entityType;
        this.entityId = entityId;
        this.performedByUserId = performedByUserId;
        this.performedByUserName = performedByUserName;
        this.userRole = userRole;
        this.details = details;
        this.timestamp = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getEntityType() { return entityType; }
    public void setEntityType(String entityType) { this.entityType = entityType; }
    public String getEntityId() { return entityId; }
    public void setEntityId(String entityId) { this.entityId = entityId; }
    public String getPerformedByUserId() { return performedByUserId; }
    public void setPerformedByUserId(String performedByUserId) { this.performedByUserId = performedByUserId; }
    public String getPerformedByUserName() { return performedByUserName; }
    public void setPerformedByUserName(String performedByUserName) { this.performedByUserName = performedByUserName; }
    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
