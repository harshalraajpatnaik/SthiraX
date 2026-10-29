package com.sthirax.controller;

import com.sthirax.domain.dto.QualityReviewDecisionRequest;
import com.sthirax.domain.model.ProductPassport;
import com.sthirax.domain.model.ProductionBatch;
import com.sthirax.domain.model.QualityReview;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/api/v1/quality-reviews")
public class QualityReviewController {

    private final DataStore dataStore;

    public QualityReviewController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<QualityReview>> listReviews() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.qualityReviews.values()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReview(@PathVariable String id) {
        QualityReview rev = dataStore.qualityReviews.get(id);
        if (rev == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(rev);
    }

    @PostMapping("/{id}/decision")
    public ResponseEntity<?> recordDecision(@PathVariable String id, @Valid @RequestBody QualityReviewDecisionRequest req) {
        QualityReview rev = dataStore.qualityReviews.get(id);
        if (rev == null) return ResponseEntity.notFound().build();

        rev.setDecision(req.getDecision());
        rev.setDecisionReason(req.getDecisionReason());
        rev.setChecklistPassed(req.getChecklistPassed());
        rev.setStrengthMetBisStandard(req.isStrengthMetBisStandard());
        rev.setCo2FlowEvidenceVerified(req.isCo2FlowEvidenceVerified());
        rev.setRawMaterialBatchTicketsVerified(req.isRawMaterialBatchTicketsVerified());
        rev.setLaboratoryReportReference(req.getLaboratoryReportReference());
        rev.setReviewerId("usr-quality-1");
        rev.setReviewerName("Shashank Verma (Civil QA Lead)");
        rev.setDecisionTimestamp(Instant.now());

        ProductionBatch batch = dataStore.productionBatches.get(rev.getBatchId());
        if (batch != null) {
            if ("APPROVED".equalsIgnoreCase(req.getDecision())) {
                batch.setBatchStatus("RELEASED");

                // Generate approved Public Product Passport
                ProductPassport passport = new ProductPassport();
                passport.setId("pass-" + UUID.randomUUID().toString().substring(0, 8));
                passport.setBatchId(batch.getId());
                passport.setBatchNumber(batch.getBatchNumber());
                passport.setProductName(batch.getProductName());
                passport.setProductCategory("PRECAST");
                passport.setPlantLocation(batch.getPlantName());
                passport.setProductionDate(batch.getProductionDate());
                passport.setPublicationStatus("PUBLISHED");
                passport.setVerificationStatus("REVIEWED");
                passport.setReviewerRole("Quality Reviewer (" + rev.getReviewerName() + ")");
                passport.setTotalOutputUnits(batch.getRawMaterialTonnage() != null ? batch.getRawMaterialTonnage() * 45 : 1000.0);
                passport.setOutputUnit("m2");
                passport.setCo2InjectedKg(batch.getCo2InputKg());
                passport.setMineralizedCo2Kg(batch.getEstimatedUptakeKg());
                passport.setMeasurementMethodology("Direct Coriolis Mass Flow Injection & Accelerated Carbonation Mass Balance");
                passport.setBisStandardReference("IS 15658 / IS 2185 verified compliance");
                passport.setTestedStrengthMpa(batch.getTestedCompressiveStrengthMpa());
                passport.setVerifiedRecycledFeedstocks(Collections.singletonList(batch.getRawMaterialMix()));
                passport.setQrCodePayload("https://sthirax.com/passports/" + passport.getId());
                passport.setDisclaimer("Published under verified quality review protocol. Commercial terms and private supplier identifiers are redacted.");
                passport.setPublishedAt(Instant.now());

                dataStore.productPassports.put(passport.getId(), passport);
                batch.setPublicPassportId(passport.getId());
            } else if ("REJECTED".equalsIgnoreCase(req.getDecision())) {
                batch.setBatchStatus("REJECTED");
                // Rule: Rejected batches cannot have published passports!
                batch.setPublicPassportId(null);
            }
        }

        dataStore.logAudit("QUALITY_REVIEW_DECISION", "QUALITY_REVIEW", rev.getId(), "quality-1", 
                rev.getReviewerName(), "QUALITY_REVIEWER", "Decision: " + req.getDecision() + ". Reason: " + req.getDecisionReason());

        return ResponseEntity.ok(Map.of("status", "success", "review", rev, "batch", batch));
    }
}
