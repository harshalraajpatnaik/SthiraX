package com.sthirax.controller;

import com.sthirax.domain.model.CarbonAccountingRecord;
import com.sthirax.domain.model.ProductionBatch;
import com.sthirax.domain.model.QualityReview;
import com.sthirax.domain.repository.DataStore;
import com.sthirax.service.CarbonAccountingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/api/v1/batches")
public class BatchController {

    private final DataStore dataStore;
    private final CarbonAccountingService carbonService;

    public BatchController(DataStore dataStore, CarbonAccountingService carbonService) {
        this.dataStore = dataStore;
        this.carbonService = carbonService;
    }

    @GetMapping
    public ResponseEntity<List<ProductionBatch>> listBatches() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.productionBatches.values()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBatch(@PathVariable String id) {
        ProductionBatch b = dataStore.productionBatches.get(id);
        if (b == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(b);
    }

    @PostMapping
    public ResponseEntity<?> createBatch(@RequestBody ProductionBatch batch) {
        if (batch.getId() == null) {
            batch.setId("batch-" + UUID.randomUUID().toString().substring(0, 6));
        }
        if (batch.getBatchNumber() == null) {
            batch.setBatchNumber("STX-2026-B" + (100 + dataStore.productionBatches.size() + 1));
        }
        batch.setBatchStatus("TESTING");
        batch.setCreatedAt(Instant.now());

        // Calculate and link carbon accounting record
        CarbonAccountingRecord car = carbonService.calculateCarbonBalance(
                batch.getCo2InputKg(), 0.85, 20.0, 75.0, 
                (batch.getCo2InputKg() != null ? batch.getCo2InputKg() / 1000.0 : 0.5), null, null
        );
        car.setId("car-" + UUID.randomUUID().toString().substring(0, 6));
        car.setBatchId(batch.getId());
        car.setBatchNumber(batch.getBatchNumber());
        dataStore.carbonRecords.put(car.getId(), car);

        // Pre-create quality review record in PENDING state
        QualityReview qr = new QualityReview();
        qr.setId("rev-" + UUID.randomUUID().toString().substring(0, 6));
        qr.setBatchId(batch.getId());
        qr.setBatchNumber(batch.getBatchNumber());
        qr.setDecision("PENDING");
        qr.setChecklistPassed(new ArrayList<>());
        qr.setCreatedAt(Instant.now());
        dataStore.qualityReviews.put(qr.getId(), qr);

        batch.setQualityReviewId(qr.getId());
        dataStore.saveBatch(batch);

        dataStore.logAudit("CREATE_BATCH", "BATCH", batch.getId(), "operator-1", 
                batch.getOperatorName() != null ? batch.getOperatorName() : "Plant Operator", 
                "PLANT_OPERATOR", "Logged production batch " + batch.getBatchNumber());

        return ResponseEntity.ok(batch);
    }
}
