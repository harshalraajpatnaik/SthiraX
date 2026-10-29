package com.sthirax.domain.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;

public class PartnerApplicationRequest {
    @NotBlank(message = "Applicant role is required")
    private String applicantRole; // MANUFACTURER, CO2_SUPPLIER, LOGISTICS_PARTNER, BUYER

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Contact person is required")
    private String contactPerson;

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    private String email;

    private String phone;
    private String facilityLocation;
    private String facilityPincode;
    private List<String> manufacturedProducts;
    private Double monthlyCapacityTPA;
    private String currentFeedstocks;
    private String curingMethod;
    private String co2SourceType;
    private Double availableCo2TonnesPerMonth;
    private String co2PurityEstimate;
    private String logisticsCapabilities;

    public PartnerApplicationRequest() {}

    public String getApplicantRole() { return applicantRole; }
    public void setApplicantRole(String applicantRole) { this.applicantRole = applicantRole; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getFacilityLocation() { return facilityLocation; }
    public void setFacilityLocation(String facilityLocation) { this.facilityLocation = facilityLocation; }
    public String getFacilityPincode() { return facilityPincode; }
    public void setFacilityPincode(String facilityPincode) { this.facilityPincode = facilityPincode; }
    public List<String> getManufacturedProducts() { return manufacturedProducts; }
    public void setManufacturedProducts(List<String> manufacturedProducts) { this.manufacturedProducts = manufacturedProducts; }
    public Double getMonthlyCapacityTPA() { return monthlyCapacityTPA; }
    public void setMonthlyCapacityTPA(Double monthlyCapacityTPA) { this.monthlyCapacityTPA = monthlyCapacityTPA; }
    public String getCurrentFeedstocks() { return currentFeedstocks; }
    public void setCurrentFeedstocks(String currentFeedstocks) { this.currentFeedstocks = currentFeedstocks; }
    public String getCuringMethod() { return curingMethod; }
    public void setCuringMethod(String curingMethod) { this.curingMethod = curingMethod; }
    public String getCo2SourceType() { return co2SourceType; }
    public void setCo2SourceType(String co2SourceType) { this.co2SourceType = co2SourceType; }
    public Double getAvailableCo2TonnesPerMonth() { return availableCo2TonnesPerMonth; }
    public void setAvailableCo2TonnesPerMonth(Double availableCo2TonnesPerMonth) { this.availableCo2TonnesPerMonth = availableCo2TonnesPerMonth; }
    public String getCo2PurityEstimate() { return co2PurityEstimate; }
    public void setCo2PurityEstimate(String co2PurityEstimate) { this.co2PurityEstimate = co2PurityEstimate; }
    public String getLogisticsCapabilities() { return logisticsCapabilities; }
    public void setLogisticsCapabilities(String logisticsCapabilities) { this.logisticsCapabilities = logisticsCapabilities; }
}
