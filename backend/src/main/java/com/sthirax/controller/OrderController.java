package com.sthirax.controller;

import com.sthirax.domain.model.CustomerOrder;
import com.sthirax.domain.model.Quote;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class OrderController {

    private final DataStore dataStore;

    public OrderController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping("/orders")
    public ResponseEntity<List<CustomerOrder>> listOrders() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.customerOrders.values()));
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<?> getOrder(@PathVariable String id) {
        CustomerOrder o = dataStore.customerOrders.get(id);
        if (o == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(o);
    }

    @PatchMapping("/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable String id, @RequestParam String status) {
        CustomerOrder o = dataStore.customerOrders.get(id);
        if (o == null) return ResponseEntity.notFound().build();

        String oldStatus = o.getOrderStatus();
        o.setOrderStatus(status);
        o.setUpdatedAt(Instant.now());

        dataStore.logAudit("ORDER_STATUS_CHANGE", "ORDER", o.getId(), "ops-1", "Ops Manager", 
                "OPERATIONS_MANAGER", "Status moved from " + oldStatus + " to " + status);
        return ResponseEntity.ok(o);
    }

    @GetMapping("/quotes")
    public ResponseEntity<List<Quote>> listQuotes() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.quotes.values()));
    }

    @GetMapping("/quotes/{id}")
    public ResponseEntity<?> getQuote(@PathVariable String id) {
        Quote q = dataStore.quotes.get(id);
        if (q == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(q);
    }

    @PostMapping("/orders/{orderId}/quotes")
    public ResponseEntity<?> prepareQuote(@PathVariable String orderId, @RequestBody Quote quote) {
        CustomerOrder order = dataStore.customerOrders.get(orderId);
        if (order == null) return ResponseEntity.notFound().build();

        if (quote.getId() == null) {
            quote.setId("quote-" + UUID.randomUUID().toString().substring(0, 6));
        }
        quote.setOrderId(orderId);
        quote.setQuoteNumber("QT-" + (2000 + dataStore.quotes.size() + 1));
        quote.setVersion(quote.getVersion() != null ? quote.getVersion() : 1);
        quote.setStatus("ISSUED");
        quote.setCreatedAt(Instant.now());

        dataStore.quotes.put(quote.getId(), quote);

        order.setActiveQuoteId(quote.getId());
        order.setQuotedPriceInr(quote.getTotalAmountInr());
        order.setOrderStatus("AWAITING_CUSTOMER");
        order.setUpdatedAt(Instant.now());

        dataStore.logAudit("QUOTE_PREPARED", "QUOTE", quote.getId(), "finance-1", "Finance Lead", 
                "FINANCE_MANAGER", "Prepared quote " + quote.getQuoteNumber() + " for order " + order.getOrderNumber());

        return ResponseEntity.ok(quote);
    }

    @PostMapping("/quotes/{id}/accept")
    public ResponseEntity<?> acceptQuote(@PathVariable String id) {
        Quote quote = dataStore.quotes.get(id);
        if (quote == null) return ResponseEntity.notFound().build();

        CustomerOrder order = dataStore.customerOrders.get(quote.getOrderId());
        if (order == null) return ResponseEntity.notFound().build();

        quote.setStatus("ACCEPTED");
        order.setOrderStatus("ACCEPTED");
        order.setUpdatedAt(Instant.now());

        dataStore.logAudit("QUOTE_ACCEPTED", "QUOTE", quote.getId(), "buyer-1", order.getCustomerName(), 
                "BUYER", "Accepted commercial terms for quote " + quote.getQuoteNumber());

        return ResponseEntity.ok(Map.of("status", "success", "quote", quote, "order", order));
    }
}
