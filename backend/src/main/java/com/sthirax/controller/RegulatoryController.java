package com.sthirax.controller;

import com.sthirax.domain.model.RegulatoryDocument;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/regulatory-documents")
public class RegulatoryController {

    private final DataStore dataStore;

    public RegulatoryController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<RegulatoryDocument>> listDocuments() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.regulatoryDocuments.values()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDocument(@PathVariable String id) {
        RegulatoryDocument doc = dataStore.regulatoryDocuments.get(id);
        if (doc == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(doc);
    }

    @PostMapping
    public ResponseEntity<?> createDocument(@RequestBody RegulatoryDocument doc) {
        if (doc.getId() == null) {
            doc.setId("reg-" + UUID.randomUUID().toString().substring(0, 6));
        }
        doc.setCreatedAt(Instant.now());
        dataStore.regulatoryDocuments.put(doc.getId(), doc);
        dataStore.logAudit("CREATE_REGULATORY_DOC", "REGULATORY", doc.getId(), "legal-1", 
                "Compliance Officer", "ADMIN", "Added regulatory document: " + doc.getTitle());
        return ResponseEntity.ok(doc);
    }
}
