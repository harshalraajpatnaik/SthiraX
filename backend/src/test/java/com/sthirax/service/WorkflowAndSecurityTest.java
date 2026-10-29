package com.sthirax.service;

import com.sthirax.controller.QualityReviewController;
import com.sthirax.domain.dto.QualityReviewDecisionRequest;
import com.sthirax.domain.model.ProductPassport;
import com.sthirax.domain.model.ProductionBatch;
import com.sthirax.domain.model.QualityReview;
import com.sthirax.domain.repository.DataStore;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

public class WorkflowAndSecurityTest {

    private DataStore dataStore;
    private QualityReviewController reviewController;

    @BeforeEach
    void setUp() {
        dataStore = new DataStore(new BCryptPasswordEncoder(), new CostCalculationService());
        dataStore.seedInitialData();
        reviewController = new QualityReviewController(dataStore);
    }

    @Test
    @DisplayName("Critical Business Rule: A rejected batch must NOT be published as an approved passport")
    void testRejectedBatchCannotPublishPassport() {
        // Setup a batch in TESTING state
        ProductionBatch testBatch = new ProductionBatch();
        testBatch.setId("batch-test-reject");
        testBatch.setBatchNumber("STX-TEST-REJECT-01");
        testBatch.setBatchStatus("TESTING");
        testBatch.setCo2InputKg(400.0);
        testBatch.setTestedCompressiveStrengthMpa(22.0); // Fails M40 standard!
        dataStore.productionBatches.put(testBatch.getId(), testBatch);

        QualityReview testReview = new QualityReview();
        testReview.setId("rev-test-reject");
        testReview.setBatchId(testBatch.getId());
        testReview.setBatchNumber(testBatch.getBatchNumber());
        testReview.setDecision("PENDING");
        dataStore.qualityReviews.put(testReview.getId(), testReview);

        // Submit Rejection
        QualityReviewDecisionRequest rejectReq = new QualityReviewDecisionRequest();
        rejectReq.setDecision("REJECTED");
        rejectReq.setDecisionReason("Compressive strength failed: 22 MPa vs 40 MPa minimum BIS standard requirement.");
        rejectReq.setStrengthMetBisStandard(false);
        rejectReq.setCo2FlowEvidenceVerified(false);
        rejectReq.setChecklistPassed(Collections.emptyList());

        reviewController.recordDecision(testReview.getId(), rejectReq);

        // Assert batch is marked REJECTED
        assertEquals("REJECTED", testBatch.getBatchStatus());
        assertNull(testBatch.getPublicPassportId(), "Rejected batch must not have a public passport identifier");

        // Verify no approved passport exists for this batch
        boolean passportExists = dataStore.productPassports.values().stream()
                .anyMatch(p -> p.getBatchId().equals(testBatch.getId()));
        assertFalse(passportExists, "No passport record may be generated for a rejected production batch");
    }

    @Test
    @DisplayName("Approved batch produces published product passport with verifiable telemetry")
    void testApprovedBatchGeneratesPassport() {
        ProductionBatch testBatch = new ProductionBatch();
        testBatch.setId("batch-test-approve");
        testBatch.setBatchNumber("STX-TEST-APP-01");
        testBatch.setBatchStatus("TESTING");
        testBatch.setPlantName("Hosur Pilot Plant");
        testBatch.setProductName("SthiraX Carbon-Cured Pavers");
        testBatch.setProductionDate("2026-10-28");
        testBatch.setCo2InputKg(450.0);
        testBatch.setEstimatedUptakeKg(390.0);
        testBatch.setTestedCompressiveStrengthMpa(44.1);
        testBatch.setRawMaterialMix("35% C&D Fines, 30% GGBS, 20% Fly Ash, 15% OPC");
        dataStore.productionBatches.put(testBatch.getId(), testBatch);

        QualityReview testReview = new QualityReview();
        testReview.setId("rev-test-app");
        testReview.setBatchId(testBatch.getId());
        testReview.setBatchNumber(testBatch.getBatchNumber());
        testReview.setDecision("PENDING");
        dataStore.qualityReviews.put(testReview.getId(), testReview);

        QualityReviewDecisionRequest approveReq = new QualityReviewDecisionRequest();
        approveReq.setDecision("APPROVED");
        approveReq.setDecisionReason("Passed all tests with 44.1 MPa compressive strength.");
        approveReq.setStrengthMetBisStandard(true);
        approveReq.setCo2FlowEvidenceVerified(true);
        approveReq.setRawMaterialBatchTicketsVerified(true);
        approveReq.setChecklistPassed(Collections.singletonList("All checks passed"));

        reviewController.recordDecision(testReview.getId(), approveReq);

        assertEquals("RELEASED", testBatch.getBatchStatus());
        assertNotNull(testBatch.getPublicPassportId());

        ProductPassport passport = dataStore.productPassports.get(testBatch.getPublicPassportId());
        assertNotNull(passport);
        assertEquals("PUBLISHED", passport.getPublicationStatus());
        assertEquals("REVIEWED", passport.getVerificationStatus());
        assertEquals(390.0, passport.getMineralizedCo2Kg());
    }
}
