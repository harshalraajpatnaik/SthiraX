package com.sthirax.controller;

import com.sthirax.service.PostgreSqlPersistenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/system")
@Tag(name = "System & Database", description = "PostgreSQL 15 persistence status, health checks, and database metrics")
public class DatabaseStatusController {

    private final PostgreSqlPersistenceService persistenceService;

    public DatabaseStatusController(PostgreSqlPersistenceService persistenceService) {
        this.persistenceService = persistenceService;
    }

    @GetMapping("/database-status")
    @Operation(summary = "Get PostgreSQL Database Health & Metrics", description = "Returns live connection status and row counts across all relational tables in PostgreSQL 15.")
    public ResponseEntity<Map<String, Object>> getDatabaseStatus() {
        return ResponseEntity.ok(persistenceService.getDatabaseStatus());
    }
}
