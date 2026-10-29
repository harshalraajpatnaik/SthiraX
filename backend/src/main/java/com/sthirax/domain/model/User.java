package com.sthirax.domain.model;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

public class User {
    private String id;
    private String email;
    private String passwordHash;
    private String fullName;
    private String organisationId;
    private String organisationName;
    private Set<Role> roles = new HashSet<>();
    private boolean enabled;
    private Instant createdAt;

    public User() {}

    public User(String id, String email, String passwordHash, String fullName, String organisationId, String organisationName, Set<Role> roles, boolean enabled) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
        this.organisationId = organisationId;
        this.organisationName = organisationName;
        this.roles = roles;
        this.enabled = enabled;
        this.createdAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getOrganisationId() { return organisationId; }
    public void setOrganisationId(String organisationId) { this.organisationId = organisationId; }
    public String getOrganisationName() { return organisationName; }
    public void setOrganisationName(String organisationName) { this.organisationName = organisationName; }
    public Set<Role> getRoles() { return roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }
    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
