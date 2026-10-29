package com.sthirax.controller;

import com.sthirax.domain.model.Shipment;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/shipments")
public class ShipmentController {

    private final DataStore dataStore;

    public ShipmentController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<Shipment>> listShipments() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.shipments.values()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShipment(@PathVariable String id) {
        Shipment s = dataStore.shipments.get(id);
        if (s == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(s);
    }

    @PostMapping
    public ResponseEntity<?> createShipment(@RequestBody Shipment shipment) {
        if (shipment.getId() == null) {
            shipment.setId("ship-" + UUID.randomUUID().toString().substring(0, 6));
        }
        if (shipment.getShipmentNumber() == null) {
            shipment.setShipmentNumber("SHP-" + (1000 + dataStore.shipments.size() + 1));
        }
        shipment.setCreatedAt(Instant.now());
        dataStore.shipments.put(shipment.getId(), shipment);
        dataStore.logAudit("CREATE_SHIPMENT", "SHIPMENT", shipment.getId(), "ops-1", "Ops Manager", "OPERATIONS_MANAGER", "Created shipment " + shipment.getShipmentNumber());
        return ResponseEntity.ok(shipment);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestParam String status, @RequestParam(required = false) String notes) {
        Shipment s = dataStore.shipments.get(id);
        if (s == null) return ResponseEntity.notFound().build();

        s.setStatus(status);
        if (notes != null) s.setDeliveryNotes(notes);
        if ("DELIVERED".equalsIgnoreCase(status) && s.getArrivalTimestamp() == null) {
            s.setArrivalTimestamp(Instant.now().toString());
        }

        dataStore.logAudit("UPDATE_SHIPMENT_STATUS", "SHIPMENT", s.getId(), "logistics-1", "Logistics Lead", "LOGISTICS_PARTNER", "Updated status to " + status);
        return ResponseEntity.ok(s);
    }
}
