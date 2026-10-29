package com.sthirax.domain.model;

import java.math.BigDecimal;
import java.time.Instant;

public class Shipment {
    private String id;
    private String shipmentNumber;
    private String type; // CO2_DELIVERY, PRECAST_FINISHED_DISPATCH
    private String referenceOrderId;
    private String origin;
    private String destination;
    private Double quantityTonnes;
    private Double distanceKm;
    private String transportMode; // CRYOGENIC_TANKER, FLATBED_TRUCK, BOX_TRUCK
    private BigDecimal transportCostInr;
    private String status; // PLANNED, DISPATCHED, IN_TRANSIT, DELIVERED, DELAYED, EXCEPTION
    private String dispatchTimestamp;
    private String arrivalTimestamp;
    private String carrierName;
    private String vehicleNumber;
    private String deliveryNotes;
    private Instant createdAt;

    public Shipment() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getShipmentNumber() { return shipmentNumber; }
    public void setShipmentNumber(String shipmentNumber) { this.shipmentNumber = shipmentNumber; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getReferenceOrderId() { return referenceOrderId; }
    public void setReferenceOrderId(String referenceOrderId) { this.referenceOrderId = referenceOrderId; }
    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public Double getQuantityTonnes() { return quantityTonnes; }
    public void setQuantityTonnes(Double quantityTonnes) { this.quantityTonnes = quantityTonnes; }
    public Double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(Double distanceKm) { this.distanceKm = distanceKm; }
    public String getTransportMode() { return transportMode; }
    public void setTransportMode(String transportMode) { this.transportMode = transportMode; }
    public BigDecimal getTransportCostInr() { return transportCostInr; }
    public void setTransportCostInr(BigDecimal transportCostInr) { this.transportCostInr = transportCostInr; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDispatchTimestamp() { return dispatchTimestamp; }
    public void setDispatchTimestamp(String dispatchTimestamp) { this.dispatchTimestamp = dispatchTimestamp; }
    public String getArrivalTimestamp() { return arrivalTimestamp; }
    public void setArrivalTimestamp(String arrivalTimestamp) { this.arrivalTimestamp = arrivalTimestamp; }
    public String getCarrierName() { return carrierName; }
    public void setCarrierName(String carrierName) { this.carrierName = carrierName; }
    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }
    public String getDeliveryNotes() { return deliveryNotes; }
    public void setDeliveryNotes(String deliveryNotes) { this.deliveryNotes = deliveryNotes; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
