package com.sthirax.domain.model;

import java.util.List;

public class Plant {
    private String id;
    private String name;
    private String organisationId;
    private String state;
    private String location;
    private String pincode;
    private String contactPerson;
    private String contactPhone;
    private String retrofitStatus; // NOT_STARTED, AUDITED, RETROFIT_PLANNED, COMMISSIONED, OPERATIONAL
    private Double annualCapacityTonnes;
    private Double currentUtilisationPercent;
    private List<String> supportedProducts;
    private String feedstockSuitabilityScore; // e.g. "8.5/10 - High GGBS & slag availability"
    private String co2CuringChamberType; // e.g. "Enclosed sealed curing rack with flow meter"
    private boolean active;

    public Plant() {}

    public Plant(String id, String name, String organisationId, String state, String location, String pincode, 
                 String contactPerson, String contactPhone, String retrofitStatus, Double annualCapacityTonnes, 
                 Double currentUtilisationPercent, List<String> supportedProducts, String feedstockSuitabilityScore, 
                 String co2CuringChamberType, boolean active) {
        this.id = id;
        this.name = name;
        this.organisationId = organisationId;
        this.state = state;
        this.location = location;
        this.pincode = pincode;
        this.contactPerson = contactPerson;
        this.contactPhone = contactPhone;
        this.retrofitStatus = retrofitStatus;
        this.annualCapacityTonnes = annualCapacityTonnes;
        this.currentUtilisationPercent = currentUtilisationPercent;
        this.supportedProducts = supportedProducts;
        this.feedstockSuitabilityScore = feedstockSuitabilityScore;
        this.co2CuringChamberType = co2CuringChamberType;
        this.active = active;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getOrganisationId() { return organisationId; }
    public void setOrganisationId(String organisationId) { this.organisationId = organisationId; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }
    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }
    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    public String getRetrofitStatus() { return retrofitStatus; }
    public void setRetrofitStatus(String retrofitStatus) { this.retrofitStatus = retrofitStatus; }
    public Double getAnnualCapacityTonnes() { return annualCapacityTonnes; }
    public void setAnnualCapacityTonnes(Double annualCapacityTonnes) { this.annualCapacityTonnes = annualCapacityTonnes; }
    public Double getCurrentUtilisationPercent() { return currentUtilisationPercent; }
    public void setCurrentUtilisationPercent(Double currentUtilisationPercent) { this.currentUtilisationPercent = currentUtilisationPercent; }
    public List<String> getSupportedProducts() { return supportedProducts; }
    public void setSupportedProducts(List<String> supportedProducts) { this.supportedProducts = supportedProducts; }
    public String getFeedstockSuitabilityScore() { return feedstockSuitabilityScore; }
    public void setFeedstockSuitabilityScore(String feedstockSuitabilityScore) { this.feedstockSuitabilityScore = feedstockSuitabilityScore; }
    public String getCo2CuringChamberType() { return co2CuringChamberType; }
    public void setCo2CuringChamberType(String co2CuringChamberType) { this.co2CuringChamberType = co2CuringChamberType; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
