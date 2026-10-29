package com.sthirax.controller;

import com.sthirax.domain.dto.EnquiryRequest;
import com.sthirax.domain.model.CustomerOrder;
import com.sthirax.domain.model.Enquiry;
import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/enquiries")
public class EnquiryController {

    private final DataStore dataStore;

    public EnquiryController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @PostMapping
    public ResponseEntity<?> submitEnquiry(@Valid @RequestBody EnquiryRequest req) {
        Enquiry enquiry = new Enquiry();
        enquiry.setId("enq-" + UUID.randomUUID().toString().substring(0, 8));
        enquiry.setType(req.getType() != null ? req.getType() : "QUOTE");
        enquiry.setContactName(req.getContactName());
        enquiry.setEmail(req.getEmail());
        enquiry.setPhone(req.getPhone());
        enquiry.setCompanyName(req.getCompanyName());
        enquiry.setProductId(req.getProductId());
        enquiry.setProductName(req.getProductName());
        enquiry.setQuantity(req.getQuantity());
        enquiry.setUnit(req.getUnit());
        enquiry.setDeliveryPincode(req.getDeliveryPincode());
        enquiry.setExpectedDate(req.getExpectedDate());
        enquiry.setNotes(req.getNotes());
        enquiry.setStatus("PENDING_REVIEW");
        enquiry.setCreatedAt(Instant.now());

        dataStore.saveEnquiry(enquiry);

        // If it's a quote enquiry, automatically establish a draft customer order for operational review
        if ("QUOTE".equalsIgnoreCase(enquiry.getType())) {
            CustomerOrder draftOrder = new CustomerOrder();
            draftOrder.setId("ord-auto-" + UUID.randomUUID().toString().substring(0, 6));
            draftOrder.setOrderNumber("STX-ORD-" + (10000 + dataStore.customerOrders.size() + 1));
            draftOrder.setCustomerName(req.getCompanyName() != null ? req.getCompanyName() : req.getContactName());
            draftOrder.setContactEmail(req.getEmail());
            draftOrder.setProductId(req.getProductId());
            draftOrder.setProductName(req.getProductName());
            draftOrder.setQuantity(req.getQuantity() != null ? req.getQuantity() : 1000.0);
            draftOrder.setUnit(req.getUnit() != null ? req.getUnit() : "m2");
            draftOrder.setDestinationPincode(req.getDeliveryPincode());
            draftOrder.setOrderStatus("QUOTE_REQUESTED");
            draftOrder.setQuotedPriceInr(BigDecimal.ZERO);
            draftOrder.setEstimatedCostInr(BigDecimal.ZERO);
            draftOrder.setActualCostInr(BigDecimal.ZERO);
            draftOrder.setRealizedContributionMarginInr(BigDecimal.ZERO);
            draftOrder.setExpectedDeliveryDate(req.getExpectedDate());
            draftOrder.setCreatedAt(Instant.now());
            draftOrder.setUpdatedAt(Instant.now());

            dataStore.customerOrders.put(draftOrder.getId(), draftOrder);
        }

        dataStore.logAudit("ENQUIRY_SUBMITTED", "ENQUIRY", enquiry.getId(), "public-user", 
                req.getContactName(), "PUBLIC", "Public commercial enquiry received for: " + req.getProductName());

        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Your enquiry has been received and logged under SthiraX Operations Review.",
                "enquiryId", enquiry.getId()
        ));
    }

    @GetMapping
    public ResponseEntity<List<Enquiry>> listEnquiries() {
        return ResponseEntity.ok(new ArrayList<>(dataStore.enquiries.values()));
    }
}
