package com.sthirax.controller;

import com.sthirax.domain.dto.ApprovalDecisionRequest;
import com.sthirax.domain.dto.PartnerApplicationRequest;
import com.sthirax.domain.model.CO2Supplier;
import com.sthirax.domain.model.PartnerApplication;
import com.sthirax.domain.model.Plant;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class PartnerController {

    private final DataStore dataStore;

    public PartnerController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @PostMapping("/partners/apply")
    public ResponseEntity<?> applyPartner(@Valid @RequestBody PartnerApplicationRequest req) {
        PartnerApplication app = new PartnerApplication();
        app.setId("app-" + UUID.randomUUID().toString().substring(0, 8));
        app.setApplicantRole(req.getApplicantRole());
        app.setCompanyName(req.getCompanyName());
        app.setContactPerson(req.getContactPerson());
        app.setEmail(req.getEmail());
        app.setPhone(req.getPhone());
        app.setFacilityLocation(req.getFacilityLocation());
        app.setFacilityPincode(req.getFacilityPincode());
        app.setManufacturedProducts(req.getManufacturedProducts());
        app.setMonthlyCapacityTPA(req.getMonthlyCapacityTPA());
        app.setCurrentFeedstocks(req.getCurrentFeedstocks());
        app.setCuringMethod(req.getCuringMethod());
        app.setCo2SourceType(req.getCo2SourceType());
        app.setAvailableCo2TonnesPerMonth(req.getAvailableCo2TonnesPerMonth());
        app.setCo2PurityEstimate(req.getCo2PurityEstimate());
        app.setLogisticsCapabilities(req.getLogisticsCapabilities());
        app.setStatus("PENDING_REVIEW");
        app.setCreatedAt(Instant.now());

        dataStore.savePartnerApplication(app);
        dataStore.logAudit("PARTNER_APPLICATION_SUBMITTED", "PARTNER_APPLICATION", app.getId(), 
                "public", req.getContactPerson(), "PUBLIC", "Partner application submitted by " + req.getCompanyName());

        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Partner onboarding application submitted successfully. Current status: Pending Review.",
                "applicationId", app.getId()
        ));
    }

    @GetMapping("/approvals")
    public ResponseEntity<List<PartnerApplication>> listPendingApprovals() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.partnerApplications.values()));
    }

    @GetMapping("/approvals/{id}")
    public ResponseEntity<?> getApproval(@PathVariable String id) {
        PartnerApplication app = dataStore.partnerApplications.get(id);
        if (app == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(app);
    }

    @PostMapping("/approvals/{id}/decision")
    public ResponseEntity<?> recordDecision(@PathVariable String id, @Valid @RequestBody ApprovalDecisionRequest req) {
        PartnerApplication app = dataStore.partnerApplications.get(id);
        if (app == null) return ResponseEntity.notFound().build();

        app.setStatus(req.getDecision());
        app.setReviewNotes(req.getReviewerNotes());
        app.setDecisionReason(req.getDecisionReason());
        app.setDecisionTimestamp(Instant.now());
        app.setAssignedReviewer("Harshal Raaj Patnaik (Admin)");

        // If approved, provision operational plant or supplier entity
        if ("APPROVED".equalsIgnoreCase(req.getDecision())) {
            if ("MANUFACTURER".equalsIgnoreCase(app.getApplicantRole())) {
                Plant p = new Plant(
                        "plant-" + UUID.randomUUID().toString().substring(0, 6),
                        app.getCompanyName() + " Facility",
                        "org-" + UUID.randomUUID().toString().substring(0, 6),
                        "Regional State", app.getFacilityLocation(), app.getFacilityPincode(),
                        app.getContactPerson(), app.getPhone(),
                        "AUDITED", app.getMonthlyCapacityTPA() != null ? app.getMonthlyCapacityTPA() * 12 : 24000.0,
                        50.0, Arrays.asList("prod-paver-interlock", "prod-kerbstone-standard"),
                        "Technical audit pending: Feedstock " + app.getCurrentFeedstocks(),
                        "Under retrofit planning (" + app.getCuringMethod() + ")",
                        true
                );
                dataStore.plants.put(p.getId(), p);
            } else if ("CO2_SUPPLIER".equalsIgnoreCase(app.getApplicantRole())) {
                CO2Supplier sup = new CO2Supplier(
                        "sup-" + UUID.randomUUID().toString().substring(0, 6),
                        "org-" + UUID.randomUUID().toString().substring(0, 6),
                        app.getCompanyName(), app.getFacilityLocation(),
                        app.getCo2SourceType() != null ? app.getCo2SourceType() : "BIOETHANOL_FERMENTATION",
                        app.getCo2PurityEstimate() != null ? app.getCo2PurityEstimate() : "Commercial gas",
                        app.getAvailableCo2TonnesPerMonth() != null ? app.getAvailableCo2TonnesPerMonth() : 500.0,
                        new BigDecimal("6500.00"), "EX_WORKS", "CRYOGENIC_TANKER",
                        "APPROVED", "Approved via onboarding application review."
                );
                dataStore.co2Suppliers.put(sup.getId(), sup);
            }
        }

        dataStore.logAudit("APPROVAL_DECISION", "PARTNER_APPLICATION", app.getId(), 
                "admin-1", "Harshal Raaj Patnaik", "ADMIN", "Decision: " + req.getDecision() + ". Reason: " + req.getDecisionReason());

        return ResponseEntity.ok(Map.of("status", "success", "application", app));
    }
}
