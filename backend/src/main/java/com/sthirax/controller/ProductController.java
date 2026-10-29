package com.sthirax.controller;

import com.sthirax.domain.model.Product;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final DataStore dataStore;

    public ProductController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.products.values()));
    }

    @GetMapping("/{slugOrId}")
    public ResponseEntity<Product> getProduct(@PathVariable String slugOrId) {
        Product product = dataStore.products.get(slugOrId);
        if (product == null) {
            product = dataStore.products.values().stream()
                    .filter(p -> p.getSlug().equalsIgnoreCase(slugOrId))
                    .findFirst()
                    .orElse(null);
        }
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }
}
