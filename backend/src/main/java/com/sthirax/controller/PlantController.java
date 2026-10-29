package com.sthirax.controller;

import com.sthirax.domain.model.Plant;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/plants")
public class PlantController {

    private final DataStore dataStore;

    public PlantController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<Plant>> listPlants() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.plants.values()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlant(@PathVariable String id) {
        Plant p = dataStore.plants.get(id);
        if (p == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(p);
    }

    @PostMapping
    public ResponseEntity<?> createPlant(@RequestBody Plant plant) {
        if (plant.getId() == null) {
            plant.setId("plant-" + UUID.randomUUID().toString().substring(0, 6));
        }
        dataStore.plants.put(plant.getId(), plant);
        dataStore.logAudit("CREATE_PLANT", "PLANT", plant.getId(), "admin-1", "Admin", "ADMIN", "Registered plant: " + plant.getName());
        return ResponseEntity.ok(plant);
    }
}
