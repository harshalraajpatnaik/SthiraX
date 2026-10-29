package com.sthirax.domain.dto;

import com.sthirax.domain.model.Role;
import java.util.Set;

public class AuthResponse {
    private String token;
    private String userId;
    private String email;
    private String fullName;
    private String organisationId;
    private String organisationName;
    private Set<Role> roles;

    public AuthResponse() {}

    public AuthResponse(String token, String userId, String email, String fullName, 
                        String organisationId, String organisationName, Set<Role> roles) {
        this.token = token;
        this.userId = userId;
        this.email = email;
        this.fullName = fullName;
        this.organisationId = organisationId;
        this.organisationName = organisationName;
        this.roles = roles;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getOrganisationId() { return organisationId; }
    public void setOrganisationId(String organisationId) { this.organisationId = organisationId; }
    public String getOrganisationName() { return organisationName; }
    public void setOrganisationName(String organisationName) { this.organisationName = organisationName; }
    public Set<Role> getRoles() { return roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }
}
