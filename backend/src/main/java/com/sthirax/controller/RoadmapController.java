package com.sthirax.controller;

import com.sthirax.domain.model.RoadmapMilestone;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/roadmap")
public class RoadmapController {

    private final DataStore dataStore;

    public RoadmapController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<RoadmapMilestone>> listMilestones() {
        List<RoadmapMilestone> sorted = dataStore.roadmapMilestones.values().stream()
                .sorted(Comparator.comparingInt(m -> m.getOrderIndex() != null ? m.getOrderIndex() : 0))
                .collect(Collectors.toList());
        return ResponseEntity.ok(sorted);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMilestone(@PathVariable String id) {
        RoadmapMilestone m = dataStore.roadmapMilestones.get(id);
        if (m == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(m);
    }

    @PostMapping
    public ResponseEntity<?> createMilestone(@RequestBody RoadmapMilestone m) {
        if (m.getId() == null) {
            m.setId("road-" + UUID.randomUUID().toString().substring(0, 6));
        }
        m.setCreatedAt(Instant.now());
        dataStore.roadmapMilestones.put(m.getId(), m);
        dataStore.logAudit("CREATE_ROADMAP_MILESTONE", "ROADMAP", m.getId(), "pm-1", 
                "Product Manager", "OPERATIONS_MANAGER", "Added milestone: " + m.getPhaseName());
        return ResponseEntity.ok(m);
    }
}
