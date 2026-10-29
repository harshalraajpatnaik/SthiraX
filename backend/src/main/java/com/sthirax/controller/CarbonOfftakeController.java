package com.sthirax.controller;

import com.sthirax.domain.model.CarbonAccountingRecord;
import com.sthirax.domain.model.CarbonOfftakeOpportunity;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/carbon-offtake")
public class CarbonOfftakeController {

    private final DataStore dataStore;

    public CarbonOfftakeController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<CarbonOfftakeOpportunity>> listOfftakes() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.carbonOfftakes.values()));
    }

    @GetMapping("/records")
    public ResponseEntity<List<CarbonAccountingRecord>> listCarbonRecords() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.carbonRecords.values()));
    }

    @PostMapping
    public ResponseEntity<?> createOfftake(@RequestBody CarbonOfftakeOpportunity opp) {
        if (opp.getId() == null) {
            opp.setId("offtake-" + UUID.randomUUID().toString().substring(0, 6));
        }
        opp.setCreatedAt(Instant.now());
        dataStore.carbonOfftakes.put(opp.getId(), opp);
        dataStore.logAudit("CREATE_OFFTAKE_OPP", "CARBON_OFFTAKE", opp.getId(), "ops-1", 
                "Ops Lead", "OPERATIONS_MANAGER", "Created carbon offtake prospect: " + opp.getProspectiveBuyerName());
        return ResponseEntity.ok(opp);
    }
}
