package com.sthirax.controller;

import com.sthirax.domain.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/analytics")
public class AnalyticsController {

    private final DataStore dataStore;

    public AnalyticsController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping("/dashboard-summary")
    public ResponseEntity<Map<String, Object>> getDashboardSummary() {
        Map<String, Object> summary = new LinkedHashMap<>();
        summary.put("openOrdersCount", dataStore.customerOrders.size());
        summary.put("ordersAwaitingCustomerDecision", dataStore.customerOrders.values().stream()
                .filter(o -> "AWAITING_CUSTOMER".equalsIgnoreCase(o.getOrderStatus())).count());
        summary.put("pendingPartnerApplications", dataStore.partnerApplications.values().stream()
                .filter(a -> "PENDING_REVIEW".equalsIgnoreCase(a.getStatus())).count());
        summary.put("activePlantsCount", dataStore.plants.values().stream().filter(p -> p.isActive()).count());
        summary.put("co2SuppliersCount", dataStore.co2Suppliers.size());
        summary.put("monthlyAvailableCo2Tonnes", dataStore.co2Suppliers.values().stream()
                .mapToDouble(s -> s.getMonthlyAvailableTonnes() != null ? s.getMonthlyAvailableTonnes() : 0.0).sum());
        summary.put("productionBatchesCount", dataStore.productionBatches.size());
        summary.put("pendingQualityReviewsCount", dataStore.qualityReviews.values().stream()
                .filter(q -> "PENDING".equalsIgnoreCase(q.getDecision())).count());
        summary.put("totalRecordedCo2InjectedKg", dataStore.productionBatches.values().stream()
                .mapToDouble(b -> b.getCo2InputKg() != null ? b.getCo2InputKg() : 0.0).sum());
        summary.put("totalEstimatedMineralizedCo2Kg", dataStore.productionBatches.values().stream()
                .mapToDouble(b -> b.getEstimatedUptakeKg() != null ? b.getEstimatedUptakeKg() : 0.0).sum());
        summary.put("publishedProductPassportsCount", dataStore.productPassports.values().stream()
                .filter(p -> "PUBLISHED".equalsIgnoreCase(p.getPublicationStatus())).count());
        summary.put("isDemoData", true);
        summary.put("demoDataNotice", "Persistent industrial prototype simulation data — clearly distinguished from certified commercial telemetry.");

        return ResponseEntity.ok(summary);
    }

    @PostMapping("/regional-feasibility")
    public ResponseEntity<List<Map<String, Object>>> calculateRegionalFeasibility(@RequestBody(required = false) Map<String, Double> customWeights) {
        // Default weights: co2Availability (0.25), deliveredCost (0.20), feedstockProximity (0.20), plantDensity (0.15), demandProximity (0.20)
        double wCo2 = customWeights != null && customWeights.containsKey("co2") ? customWeights.get("co2") : 0.25;
        double wCost = customWeights != null && customWeights.containsKey("cost") ? customWeights.get("cost") : 0.20;
        double wFeedstock = customWeights != null && customWeights.containsKey("feedstock") ? customWeights.get("feedstock") : 0.20;
        double wPlants = customWeights != null && customWeights.containsKey("plants") ? customWeights.get("plants") : 0.15;
        double wDemand = customWeights != null && customWeights.containsKey("demand") ? customWeights.get("demand") : 0.20;

        List<Map<String, Object>> regions = new ArrayList<>();

        // Region 1: Bangalore - Hosur Corridor (Karnataka / TN)
        regions.add(buildRegion("Bengaluru - Hosur Industrial Corridor", "Karnataka / Tamil Nadu",
                90.0, 85.0, 88.0, 92.0, 95.0,
                "Proximity to high-purity ethanol CO2 in Mandya/Belagavi, Salem GGBS slag, and booming IT corridor precast paving demand.",
                wCo2, wCost, wFeedstock, wPlants, wDemand));

        // Region 2: Mumbai - Pune - Navi Mumbai (Maharashtra)
        regions.add(buildRegion("Mumbai - Pune - JNPT Industrial Belt", "Maharashtra",
                82.0, 78.0, 85.0, 88.0, 94.0,
                "Extensive metro & expressway civil works; chemical & refinery CO2 sources; high transport toll costs.",
                wCo2, wCost, wFeedstock, wPlants, wDemand));

        // Region 3: Hyderabad - Miyapur - Patancheru (Telangana)
        regions.add(buildRegion("Hyderabad - ORR Precast Hub", "Telangana",
                78.0, 82.0, 84.0, 80.0, 88.0,
                "Strong industrial corridor, moderate bio-CO2 transport distance, abundant thermal fly ash from Ramagundam.",
                wCo2, wCost, wFeedstock, wPlants, wDemand));

        // Region 4: Ahmedabad - Vadodara (Gujarat)
        regions.add(buildRegion("Ahmedabad - Vadodara Chemical & Precast Corridor", "Gujarat",
                92.0, 86.0, 80.0, 82.0, 84.0,
                "Highest concentration of industrial and ammonia-fertilizer CO2 sources; strong precast manufacturing base.",
                wCo2, wCost, wFeedstock, wPlants, wDemand));

        // Region 5: NCR - Noida - Gurugram (Delhi-NCR)
        regions.add(buildRegion("Delhi NCR - Noida - Greater Faridabad", "Delhi / Haryana / UP",
                65.0, 70.0, 82.0, 85.0, 96.0,
                "Very high municipal C&D recycled aggregate availability under MCD/DDA; higher delivered CO2 transport distance.",
                wCo2, wCost, wFeedstock, wPlants, wDemand));

        regions.sort((a, b) -> Double.compare((Double) b.get("compositeScore"), (Double) a.get("compositeScore")));
        return ResponseEntity.ok(regions);
    }

    private Map<String, Object> buildRegion(String name, String state, 
                                            double co2, double cost, double feedstock, double plants, double demand, 
                                            String notes, double wCo2, double wCost, double wFeedstock, double wPlants, double wDemand) {
        Map<String, Object> r = new LinkedHashMap<>();
        r.put("regionName", name);
        r.put("state", state);
        r.put("co2AvailabilityScore", co2);
        r.put("deliveredCostScore", cost);
        r.put("feedstockSuitabilityScore", feedstock);
        r.put("plantDensityScore", plants);
        r.put("constructionDemandScore", demand);
        
        double composite = (co2 * wCo2) + (cost * wCost) + (feedstock * wFeedstock) + (plants * wPlants) + (demand * wDemand);
        r.put("compositeScore", Math.round(composite * 10.0) / 10.0);
        r.put("strategicNotes", notes);
        r.put("basis", "Illustrative multi-criteria scoring model based on regional industrial infrastructure data.");
        return r;
    }
}
