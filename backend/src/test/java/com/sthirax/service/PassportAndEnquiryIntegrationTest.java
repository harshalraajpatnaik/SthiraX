package com.sthirax.service;

import com.sthirax.controller.EnquiryController;
import com.sthirax.controller.PassportController;
import com.sthirax.domain.dto.EnquiryRequest;
import com.sthirax.domain.model.CustomerOrder;
import com.sthirax.domain.model.Enquiry;
import com.sthirax.domain.model.ProductPassport;
import com.sthirax.domain.repository.DataStore;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class PassportAndEnquiryIntegrationTest {

    private DataStore dataStore;
    private PassportController passportController;
    private EnquiryController enquiryController;

    @BeforeEach
    void setUp() {
        dataStore = new DataStore(new BCryptPasswordEncoder(), new CostCalculationService());
        dataStore.seedInitialData();
        passportController = new PassportController(dataStore);
        enquiryController = new EnquiryController(dataStore);
    }

    @Test
    @DisplayName("Should successfully retrieve public digital passport by exact Passport ID")
    void testGetPassportById() {
        ResponseEntity<?> response = passportController.getPassport("pass-7f9a2b4c");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        ProductPassport passport = (ProductPassport) response.getBody();
        assertEquals("pass-7f9a2b4c", passport.getId());
        assertEquals("STX-2026-B108", passport.getBatchNumber());
        assertEquals("PUBLISHED", passport.getPublicationStatus());
        assertTrue(passport.getMineralizedCo2Kg() > 0);
    }

    @Test
    @DisplayName("Should retrieve public digital passport by associated Batch Number")
    void testGetPassportByBatchNumber() {
        ResponseEntity<?> response = passportController.getPassport("STX-2026-B108");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        ProductPassport passport = (ProductPassport) response.getBody();
        assertEquals("pass-7f9a2b4c", passport.getId());
    }

    @Test
    @DisplayName("Should return 404 Not Found for non-existent passport identifier")
    void testGetPassportNotFound() {
        ResponseEntity<?> response = passportController.getPassport("non-existent-passport-id");
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    @DisplayName("Submitting a quote enquiry should automatically generate a draft customer order for operations review")
    void testQuoteEnquiryCreatesDraftOrder() {
        int initialOrderCount = dataStore.customerOrders.size();

        EnquiryRequest req = new EnquiryRequest();
        req.setType("QUOTE");
        req.setContactName("Vikram Malhotra");
        req.setEmail("v.malhotra@metroinfra.in");
        req.setPhone("+91 98450 12345");
        req.setCompanyName("Bangalore Metro Rail Corporation Ltd");
        req.setProductId("prod-paver-interlock");
        req.setProductName("SthiraX Carbon-Cured Interlocking Pavers");
        req.setQuantity(10000.0);
        req.setUnit("m2");
        req.setDeliveryPincode("560001");
        req.setExpectedDate("2026-11-30");
        req.setNotes("Walkway pavers for Metro Phase 2B.");

        ResponseEntity<?> response = enquiryController.submitEnquiry(req);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        assertEquals(initialOrderCount + 1, dataStore.customerOrders.size());

        CustomerOrder createdOrder = dataStore.customerOrders.values().stream()
                .filter(o -> "Bangalore Metro Rail Corporation Ltd".equals(o.getCustomerName()))
                .findFirst()
                .orElse(null);

        assertNotNull(createdOrder);
        assertEquals("QUOTE_REQUESTED", createdOrder.getOrderStatus());
        assertEquals("v.malhotra@metroinfra.in", createdOrder.getContactEmail());
    }
}
