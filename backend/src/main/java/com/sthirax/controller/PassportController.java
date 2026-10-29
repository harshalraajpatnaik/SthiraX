package com.sthirax.controller;

import com.sthirax.domain.model.ProductPassport;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/passports")
public class PassportController {

    private final DataStore dataStore;

    public PassportController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<ProductPassport>> listPublicPassports() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.productPassports.values()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPassport(@PathVariable String id) {
        ProductPassport passport = dataStore.productPassports.get(id);
        if (passport == null) {
            // Check by batchId
            passport = dataStore.productPassports.values().stream()
                    .filter(p -> p.getBatchId().equalsIgnoreCase(id) || p.getBatchNumber().equalsIgnoreCase(id))
                    .findFirst()
                    .orElse(null);
        }
        if (passport == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(passport);
    }
}
