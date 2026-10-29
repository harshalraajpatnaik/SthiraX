package com.sthirax.domain.model;

import java.time.Instant;

public class RegulatoryDocument {
    private String id;
    private String title;
    private String issuingAuthority; // CPCB, MoEFCC, BIS, IRC, BEE
    private String category; // CD_WASTE_RULES, EPR, BIS_STANDARD, IRC_GUIDELINE, CARBON_TRADING, QUALITY
    private String documentNumber; // e.g. "IS 15658:2006", "S.O. 1234(E)"
    private String effectiveDate;
    private String officialSourceUrl;
    private String summary;
    private String relevanceToSthirax;
    private String reviewStatus; // VERIFIED, UNDER_LEGAL_REVIEW, DRAFT_INTERPRETATION
    private String lastReviewedDate;
    private String keyClauses;
    private Instant createdAt;

    public RegulatoryDocument() {}

    public RegulatoryDocument(String id, String title, String issuingAuthority, String category, 
                              String documentNumber, String effectiveDate, String officialSourceUrl, 
                              String summary, String relevanceToSthirax, String reviewStatus, 
                              String lastReviewedDate, String keyClauses) {
        this.id = id;
        this.title = title;
        this.issuingAuthority = issuingAuthority;
        this.category = category;
        this.documentNumber = documentNumber;
        this.effectiveDate = effectiveDate;
        this.officialSourceUrl = officialSourceUrl;
        this.summary = summary;
        this.relevanceToSthirax = relevanceToSthirax;
        this.reviewStatus = reviewStatus;
        this.lastReviewedDate = lastReviewedDate;
        this.keyClauses = keyClauses;
        this.createdAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getIssuingAuthority() { return issuingAuthority; }
    public void setIssuingAuthority(String issuingAuthority) { this.issuingAuthority = issuingAuthority; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDocumentNumber() { return documentNumber; }
    public void setDocumentNumber(String documentNumber) { this.documentNumber = documentNumber; }
    public String getEffectiveDate() { return effectiveDate; }
    public void setEffectiveDate(String effectiveDate) { this.effectiveDate = effectiveDate; }
    public String getOfficialSourceUrl() { return officialSourceUrl; }
    public void setOfficialSourceUrl(String officialSourceUrl) { this.officialSourceUrl = officialSourceUrl; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getRelevanceToSthirax() { return relevanceToSthirax; }
    public void setRelevanceToSthirax(String relevanceToSthirax) { this.relevanceToSthirax = relevanceToSthirax; }
    public String getReviewStatus() { return reviewStatus; }
    public void setReviewStatus(String reviewStatus) { this.reviewStatus = reviewStatus; }
    public String getLastReviewedDate() { return lastReviewedDate; }
    public void setLastReviewedDate(String lastReviewedDate) { this.lastReviewedDate = lastReviewedDate; }
    public String getKeyClauses() { return keyClauses; }
    public void setKeyClauses(String keyClauses) { this.keyClauses = keyClauses; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
