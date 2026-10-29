package com.sthirax.domain.model;

import java.math.BigDecimal;
import java.time.Instant;

public class Quote {
    private String id;
    private String quoteNumber;
    private String orderId;
    private Integer version;
    private String status; // DRAFT, ISSUED, ACCEPTED, SUPERSEDED, DECLINED, EXPIRED
    private BigDecimal unitPriceInr;
    private BigDecimal totalAmountInr;
    private BigDecimal estimatedCostTotalInr;
    private BigDecimal targetMarginPercent;
    private String validityDate;
    private String terms;
    private Instant createdAt;

    public Quote() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getQuoteNumber() { return quoteNumber; }
    public void setQuoteNumber(String quoteNumber) { this.quoteNumber = quoteNumber; }
    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public Integer getVersion() { return version; }
    public void setVersion(Integer version) { this.version = version; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public BigDecimal getUnitPriceInr() { return unitPriceInr; }
    public void setUnitPriceInr(BigDecimal unitPriceInr) { this.unitPriceInr = unitPriceInr; }
    public BigDecimal getTotalAmountInr() { return totalAmountInr; }
    public void setTotalAmountInr(BigDecimal totalAmountInr) { this.totalAmountInr = totalAmountInr; }
    public BigDecimal getEstimatedCostTotalInr() { return estimatedCostTotalInr; }
    public void setEstimatedCostTotalInr(BigDecimal estimatedCostTotalInr) { this.estimatedCostTotalInr = estimatedCostTotalInr; }
    public BigDecimal getTargetMarginPercent() { return targetMarginPercent; }
    public void setTargetMarginPercent(BigDecimal targetMarginPercent) { this.targetMarginPercent = targetMarginPercent; }
    public String getValidityDate() { return validityDate; }
    public void setValidityDate(String validityDate) { this.validityDate = validityDate; }
    public String getTerms() { return terms; }
    public void setTerms(String terms) { this.terms = terms; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
