package com.sthirax.domain.model;

import java.time.Instant;

public class Organisation {
    private String id;
    private String name;
    private String type; // MANUFACTURER, BUYER, SUPPLIER, LOGISTICS, OPERATOR
    private String registrationNumber;
    private String address;
    private String contactEmail;
    private String contactPhone;
    private boolean verified;
    private Instant createdAt;

    public Organisation() {}

    public Organisation(String id, String name, String type, String registrationNumber, String address, String contactEmail, String contactPhone, boolean verified) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.registrationNumber = registrationNumber;
        this.address = address;
        this.contactEmail = contactEmail;
        this.contactPhone = contactPhone;
        this.verified = verified;
        this.createdAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
