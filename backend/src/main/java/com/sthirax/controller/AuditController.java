package com.sthirax.controller;

import com.sthirax.domain.model.AuditEvent;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/audit-events")
public class AuditController {

    private final DataStore dataStore;

    public AuditController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<AuditEvent>> listAuditEvents() {
        List<AuditEvent> copy = new ArrayList<>(dataStore.auditEvents);
        Collections.reverse(copy); // latest first
        return ResponseEntity.ok(copy);
    }
}
