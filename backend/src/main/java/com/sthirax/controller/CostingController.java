package com.sthirax.controller;

import com.sthirax.domain.model.CostModel;
import com.sthirax.domain.repository.DataStore;
import com.sthirax.service.CostCalculationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/cost-models")
public class CostingController {

    private final DataStore dataStore;
    private final CostCalculationService costService;

    public CostingController(DataStore dataStore, CostCalculationService costService) {
        this.dataStore = dataStore;
        this.costService = costService;
    }

    @GetMapping
    public ResponseEntity<List<CostModel>> listCostModels() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.costModels.values()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCostModel(@PathVariable String id) {
        CostModel cm = dataStore.costModels.get(id);
        if (cm == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(cm);
    }

    @PostMapping("/calculate")
    public ResponseEntity<CostModel> calculateModel(@RequestBody CostModel input) {
        CostModel result = costService.calculate(input);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<?> saveCostModel(@RequestBody CostModel model) {
        if (model.getId() == null) {
            model.setId("cost-" + UUID.randomUUID().toString().substring(0, 8));
        }
        model.setCreatedAt(Instant.now());
        CostModel calculated = costService.calculate(model);
        dataStore.costModels.put(calculated.getId(), calculated);
        dataStore.logAudit("SAVE_COST_MODEL", "COST_MODEL", calculated.getId(), "finance-1", 
                "Finance Lead", "FINANCE_MANAGER", "Saved cost model: " + calculated.getName());
        return ResponseEntity.ok(calculated);
    }
}
