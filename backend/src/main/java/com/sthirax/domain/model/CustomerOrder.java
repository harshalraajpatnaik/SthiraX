package com.sthirax.domain.model;

import java.math.BigDecimal;
import java.time.Instant;

public class CustomerOrder {
    private String id;
    private String orderNumber;
    private String organisationId;
    private String customerName;
    private String contactEmail;
    private String productId;
    private String productName;
    private Double quantity;
    private String unit;
    private String deliveryAddress;
    private String destinationPincode;
    private String assignedPlantId;
    private String assignedPlantName;
    private String orderStatus; 
    // DRAFT, QUOTE_REQUESTED, QUOTE_PREPARED, AWAITING_CUSTOMER, ACCEPTED, PLANNED, IN_PRODUCTION, QUALITY_REVIEW, READY_FOR_DISPATCH, DISPATCHED, DELIVERED, CLOSED, CANCELLED
    private BigDecimal quotedPriceInr;
    private BigDecimal estimatedCostInr;
    private BigDecimal actualCostInr;
    private BigDecimal realizedContributionMarginInr;
    private String activeQuoteId;
    private String expectedDeliveryDate;
    private Instant createdAt;
    private Instant updatedAt;

    public CustomerOrder() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public String getOrganisationId() { return organisationId; }
    public void setOrganisationId(String organisationId) { this.organisationId = organisationId; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }
    public String getDestinationPincode() { return destinationPincode; }
    public void setDestinationPincode(String destinationPincode) { this.destinationPincode = destinationPincode; }
    public String getAssignedPlantId() { return assignedPlantId; }
    public void setAssignedPlantId(String assignedPlantId) { this.assignedPlantId = assignedPlantId; }
    public String getAssignedPlantName() { return assignedPlantName; }
    public void setAssignedPlantName(String assignedPlantName) { this.assignedPlantName = assignedPlantName; }
    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }
    public BigDecimal getQuotedPriceInr() { return quotedPriceInr; }
    public void setQuotedPriceInr(BigDecimal quotedPriceInr) { this.quotedPriceInr = quotedPriceInr; }
    public BigDecimal getEstimatedCostInr() { return estimatedCostInr; }
    public void setEstimatedCostInr(BigDecimal estimatedCostInr) { this.estimatedCostInr = estimatedCostInr; }
    public BigDecimal getActualCostInr() { return actualCostInr; }
    public void setActualCostInr(BigDecimal actualCostInr) { this.actualCostInr = actualCostInr; }
    public BigDecimal getRealizedContributionMarginInr() { return realizedContributionMarginInr; }
    public void setRealizedContributionMarginInr(BigDecimal realizedContributionMarginInr) { this.realizedContributionMarginInr = realizedContributionMarginInr; }
    public String getActiveQuoteId() { return activeQuoteId; }
    public void setActiveQuoteId(String activeQuoteId) { this.activeQuoteId = activeQuoteId; }
    public String getExpectedDeliveryDate() { return expectedDeliveryDate; }
    public void setExpectedDeliveryDate(String expectedDeliveryDate) { this.expectedDeliveryDate = expectedDeliveryDate; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
