package com.sthirax.controller;

import com.sthirax.domain.model.CO2Supplier;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/co2-suppliers")
public class CO2SupplierController {

    private final DataStore dataStore;

    public CO2SupplierController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<CO2Supplier>> listSuppliers() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.co2Suppliers.values()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSupplier(@PathVariable String id) {
        CO2Supplier s = dataStore.co2Suppliers.get(id);
        if (s == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(s);
    }

    @PostMapping
    public ResponseEntity<?> createSupplier(@RequestBody CO2Supplier supplier) {
        if (supplier.getId() == null) {
            supplier.setId("sup-" + UUID.randomUUID().toString().substring(0, 6));
        }
        dataStore.co2Suppliers.put(supplier.getId(), supplier);
        dataStore.logAudit("CREATE_SUPPLIER", "CO2_SUPPLIER", supplier.getId(), "admin-1", "Admin", "ADMIN", "Registered supplier: " + supplier.getCompanyName());
        return ResponseEntity.ok(supplier);
    }
}
