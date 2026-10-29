package com.sthirax.domain.model;

import java.time.Instant;
import java.util.Map;

public class ProductionBatch {
    private String id;
    private String batchNumber; // e.g., "STX-2026-B108"
    private String plantId;
    private String plantName;
    private String productId;
    private String productName;
    private String associatedOrderId;
    private String productionDate;
    private Double rawMaterialTonnage;
    private String rawMaterialMix; // e.g. "Fly Ash 35%, Slag 25%, Quarry Dust 25%, OPC 15%"
    private Double co2InputKg; // Injected CO2
    private String co2MeasurementSource; // "Coriolis mass flow meter (Endress+Hauser Promass)"
    private Double estimatedUptakeKg; // mineralized CO2
    private String mineralisationBasis; // "Calculated via thermal gravimetric analysis (TGA) & differential mass balance"
    private Integer curingDurationHours;
    private String chamberPressureBar;
    private Double testedCompressiveStrengthMpa;
    private String operatorName;
    private String batchStatus; // IN_CURING, TESTING, REVIEW_PENDING, RELEASED, REJECTED
    private String qualityReviewId;
    private String publicPassportId;
    private Instant createdAt;

    public ProductionBatch() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }
    public String getPlantId() { return plantId; }
    public void setPlantId(String plantId) { this.plantId = plantId; }
    public String getPlantName() { return plantName; }
    public void setPlantName(String plantName) { this.plantName = plantName; }
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public String getAssociatedOrderId() { return associatedOrderId; }
    public void setAssociatedOrderId(String associatedOrderId) { this.associatedOrderId = associatedOrderId; }
    public String getProductionDate() { return productionDate; }
    public void setProductionDate(String productionDate) { this.productionDate = productionDate; }
    public Double getRawMaterialTonnage() { return rawMaterialTonnage; }
    public void setRawMaterialTonnage(Double rawMaterialTonnage) { this.rawMaterialTonnage = rawMaterialTonnage; }
    public String getRawMaterialMix() { return rawMaterialMix; }
    public void setRawMaterialMix(String rawMaterialMix) { this.rawMaterialMix = rawMaterialMix; }
    public Double getCo2InputKg() { return co2InputKg; }
    public void setCo2InputKg(Double co2InputKg) { this.co2InputKg = co2InputKg; }
    public String getCo2MeasurementSource() { return co2MeasurementSource; }
    public void setCo2MeasurementSource(String co2MeasurementSource) { this.co2MeasurementSource = co2MeasurementSource; }
    public Double getEstimatedUptakeKg() { return estimatedUptakeKg; }
    public void setEstimatedUptakeKg(Double estimatedUptakeKg) { this.estimatedUptakeKg = estimatedUptakeKg; }
    public String getMineralisationBasis() { return mineralisationBasis; }
    public void setMineralisationBasis(String mineralisationBasis) { this.mineralisationBasis = mineralisationBasis; }
    public Integer getCuringDurationHours() { return curingDurationHours; }
    public void setCuringDurationHours(Integer curingDurationHours) { this.curingDurationHours = curingDurationHours; }
    public String getChamberPressureBar() { return chamberPressureBar; }
    public void setChamberPressureBar(String chamberPressureBar) { this.chamberPressureBar = chamberPressureBar; }
    public Double getTestedCompressiveStrengthMpa() { return testedCompressiveStrengthMpa; }
    public void setTestedCompressiveStrengthMpa(Double testedCompressiveStrengthMpa) { this.testedCompressiveStrengthMpa = testedCompressiveStrengthMpa; }
    public String getOperatorName() { return operatorName; }
    public void setOperatorName(String operatorName) { this.operatorName = operatorName; }
    public String getBatchStatus() { return batchStatus; }
    public void setBatchStatus(String batchStatus) { this.batchStatus = batchStatus; }
    public String getQualityReviewId() { return qualityReviewId; }
    public void setQualityReviewId(String qualityReviewId) { this.qualityReviewId = qualityReviewId; }
    public String getPublicPassportId() { return publicPassportId; }
    public void setPublicPassportId(String publicPassportId) { this.publicPassportId = publicPassportId; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
