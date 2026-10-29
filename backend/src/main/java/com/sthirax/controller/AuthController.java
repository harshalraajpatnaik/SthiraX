package com.sthirax.controller;

import com.sthirax.domain.dto.AuthResponse;
import com.sthirax.domain.dto.LoginRequest;
import com.sthirax.domain.model.User;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final DataStore dataStore;
    private final PasswordEncoder passwordEncoder;

    public AuthController(DataStore dataStore, PasswordEncoder passwordEncoder) {
        this.dataStore = dataStore;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required"));
        }

        User user = dataStore.users.get(request.getEmail().toLowerCase().trim());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid email or password credentials"));
        }

        if (!user.isEnabled()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Account is pending approval or disabled"));
        }

        // Issue token with role metadata
        String token = "stx-" + UUID.randomUUID().toString();
        AuthResponse response = new AuthResponse(
                token, user.getId(), user.getEmail(), user.getFullName(),
                user.getOrganisationId(), user.getOrganisationName(), user.getRoles()
        );

        dataStore.logAudit("LOGIN", "USER", user.getId(), user.getId(), user.getFullName(), 
                user.getRoles().iterator().next().name(), "User successfully logged in via credentials");

        return ResponseEntity.ok(response);
    }
}
