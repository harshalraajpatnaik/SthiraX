package com.sthirax.domain.repository;

import com.sthirax.domain.model.*;
import com.sthirax.service.CostCalculationService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
public class DataStore {

    private final PasswordEncoder passwordEncoder;
    private final CostCalculationService costService;

    public final Map<String, User> users = new ConcurrentHashMap<>();
    public final Map<String, Organisation> organisations = new ConcurrentHashMap<>();
    public final Map<String, Product> products = new ConcurrentHashMap<>();
    public final Map<String, Enquiry> enquiries = new ConcurrentHashMap<>();
    public final Map<String, PartnerApplication> partnerApplications = new ConcurrentHashMap<>();
    public final Map<String, Plant> plants = new ConcurrentHashMap<>();
    public final Map<String, CO2Supplier> co2Suppliers = new ConcurrentHashMap<>();
    public final Map<String, CustomerOrder> customerOrders = new ConcurrentHashMap<>();
    public final Map<String, Quote> quotes = new ConcurrentHashMap<>();
    public final Map<String, Shipment> shipments = new ConcurrentHashMap<>();
    public final Map<String, ProductionBatch> productionBatches = new ConcurrentHashMap<>();
    public final Map<String, QualityReview> qualityReviews = new ConcurrentHashMap<>();
    public final Map<String, ProductPassport> productPassports = new ConcurrentHashMap<>();
    public final Map<String, CostModel> costModels = new ConcurrentHashMap<>();
    public final Map<String, CarbonAccountingRecord> carbonRecords = new ConcurrentHashMap<>();
    public final Map<String, CarbonOfftakeOpportunity> carbonOfftakes = new ConcurrentHashMap<>();
    public final Map<String, RegulatoryDocument> regulatoryDocuments = new ConcurrentHashMap<>();
    public final Map<String, RoadmapMilestone> roadmapMilestones = new ConcurrentHashMap<>();
    public final List<AuditEvent> auditEvents = Collections.synchronizedList(new ArrayList<>());

    public DataStore(PasswordEncoder passwordEncoder, CostCalculationService costService) {
        this.passwordEncoder = passwordEncoder;
        this.costService = costService;
    }

    @PostConstruct
    public void seedInitialData() {
        seedOrganisationsAndUsers();
        seedProducts();
        seedRegulatoryDocuments();
        seedRoadmapMilestones();
        seedPlantsAndSuppliers();
        seedOrdersQuotesAndBatches();
        seedCostModels();
        seedCarbonOfftake();
    }

    private void seedOrganisationsAndUsers() {
        // 1. SthiraX Admin Organisation
        Organisation sthiraxCorp = new Organisation(
                "org-sthirax-core", "SthiraX Technologies Pvt Ltd", "OPERATOR",
                "U74999KA2026PTC109821", "Whitefield Industrial Area, Bengaluru, Karnataka",
                "operations@sthirax.com", "+91 80 4099 8800", true
        );
        organisations.put(sthiraxCorp.getId(), sthiraxCorp);

        // 2. Regional Manufacturer Partner
        Organisation prakritiPrecast = new Organisation(
                "org-prakriti-precast", "Prakriti Precast Elements LLP", "MANUFACTURER",
                "AAH-3392-MH", "Hosur Industrial Complex, Tamil Nadu",
                "contact@prakritiprecast.com", "+91 4344 249012", true
        );
        organisations.put(prakritiPrecast.getId(), prakritiPrecast);

        // 3. CO2 Supplier Partner
        Organisation deccanGases = new Organisation(
                "org-deccan-co2", "Deccan Distilleries & Biofuels Ltd", "SUPPLIER",
                "L15511KA1998PLC023411", "Belagavi Sugar & Ethanol Belt, Karnataka",
                "co2-offtake@deccangases.com", "+91 831 245 9180", true
        );
        organisations.put(deccanGases.getId(), deccanGases);

        // Seed Users
        // Admin
        User admin = new User(
                "usr-admin-1", "admin@sthirax.com", passwordEncoder.encode("SthiraX#Admin2026"),
                "Harshal Raaj Patnaik", sthiraxCorp.getId(), sthiraxCorp.getName(),
                new HashSet<>(Arrays.asList(Role.ADMIN, Role.OPERATIONS_MANAGER)), true
        );
        users.put(admin.getEmail(), admin);

        // Operations Manager
        User ops = new User(
                "usr-ops-1", "ops@sthirax.com", passwordEncoder.encode("SthiraX#Ops2026"),
                "Sai Nikhil Y", sthiraxCorp.getId(), sthiraxCorp.getName(),
                new HashSet<>(Arrays.asList(Role.OPERATIONS_MANAGER)), true
        );
        users.put(ops.getEmail(), ops);

        // Quality Reviewer
        User quality = new User(
                "usr-quality-1", "quality@sthirax.com", passwordEncoder.encode("SthiraX#Quality2026"),
                "Shashank Verma", sthiraxCorp.getId(), sthiraxCorp.getName(),
                new HashSet<>(Arrays.asList(Role.QUALITY_REVIEWER)), true
        );
        users.put(quality.getEmail(), quality);

        // Plant Operator
        User operator = new User(
                "usr-operator-1", "operator@prakriti.com", passwordEncoder.encode("Prakriti#Plant2026"),
                "Hitesh Jain A", prakritiPrecast.getId(), prakritiPrecast.getName(),
                new HashSet<>(Arrays.asList(Role.PLANT_OPERATOR)), true
        );
        users.put(operator.getEmail(), operator);

        // Process Chemistry & Refinery Operations
        User processChem = new User(
                "usr-chem-1", "chemistry@sthirax.com", passwordEncoder.encode("SthiraX#Chem2026"),
                "Pankaj Adhikari", sthiraxCorp.getId(), sthiraxCorp.getName(),
                new HashSet<>(Arrays.asList(Role.OPERATIONS_MANAGER)), true
        );
        users.put(processChem.getEmail(), processChem);

        // Editorial & Communications Lead
        User mediaLead = new User(
                "usr-media-1", "media@sthirax.com", passwordEncoder.encode("SthiraX#Media2026"),
                "Lakshmi N Menon", sthiraxCorp.getId(), sthiraxCorp.getName(),
                new HashSet<>(Arrays.asList(Role.AUDITOR)), true
        );
        users.put(mediaLead.getEmail(), mediaLead);

        // Buyer Demo
        User buyer = new User(
                "usr-buyer-1", "procurement@metroinfra.in", passwordEncoder.encode("Buyer#Metro2026"),
                "Ramesh Chandran", "org-metro-infra", "Metro Infrastructure Projects Ltd",
                new HashSet<>(Arrays.asList(Role.BUYER)), true
        );
        users.put(buyer.getEmail(), buyer);
    }

    private void seedProducts() {
        Product paver = new Product(
                "prod-paver-interlock", "interlocking-paving-blocks",
                "SthiraX Carbon-Cured Interlocking Pavers", "PAVER",
                "Urban pedestrian walkways, parking bays, industrial yard pavements",
                "200 x 100 x 80 mm (Uni-paver shape)", "m2",
                "Pilot Formulation Under Validation", "M40 Equivalent (IS 15658 target)",
                "6.8 - 9.2% CO2 uptake by binder mass (estimated)",
                Arrays.asList("STX-F1: 40% GGBS + 30% Fly Ash + 30% OPC", "STX-F2: 50% C&D Recycled Fine Aggregate + Slag"),
                "Compressive strength 42.5 MPa verified in laboratory batch trials",
                new BigDecimal("68.00"), "per sq. meter (ex-works, indicative)",
                "Commercial Pilot Trials Available",
                "Engineered heavy-duty interlocking precast paver blocks cured in an accelerated CO2 carbonation chamber. Chemically sequesters industrial CO2 into stable calcium carbonate microstructures, delivering rapid early strength and reduced permeability."
        );
        products.put(paver.getId(), paver);

        Product kerb = new Product(
                "prod-kerbstone-standard", "carbon-mineralized-kerbstones",
                "SthiraX Heavy-Duty Road Kerbstones", "KERBSTONE",
                "Municipal road dividers, highway shoulders, urban stormwater channels",
                "300 x 300 x 150 mm chamfered", "piece",
                "Pilot Formulation Under Validation", "M30 Equivalent (IRC:SP:99-2013)",
                "5.5 - 7.5% CO2 uptake by binder mass (estimated)",
                Arrays.asList("STX-K1: High slag alkali-activated composite", "STX-K2: Recycled aggregate concrete blend"),
                "Impact abrasion resistance verified; flexural test in progress",
                new BigDecimal("280.00"), "per piece (ex-works, indicative)",
                "Pilot Production on Scheduled Batches",
                "High-durability roadway kerbstones formulated with supplementary cementitious materials and sealed under controlled carbon dioxide curing chambers to maximize weather and freeze-thaw endurance."
        );
        products.put(kerb.getId(), kerb);

        Product block = new Product(
                "prod-masonry-block-hollow", "co2-cured-masonry-blocks",
                "SthiraX Low-Carbon Solid & Hollow Blocks", "MASONRY_BLOCK",
                "Non-load-bearing partition walls, boundary walls, multi-storey infill",
                "400 x 200 x 200 mm (Standard modular)", "piece",
                "Specification Under Validation", "5.0 - 7.5 MPa (IS 2185 Part 1)",
                "4.0 - 6.0% CO2 uptake by binder mass (estimated)",
                Arrays.asList("STX-B1: C&D fines + Lime-pozzolana binder", "STX-B2: Slag-pozzolana blend"),
                "Initial batch density 1650 kg/m3; sound insulation index under test",
                new BigDecimal("48.00"), "per piece (ex-works, indicative)",
                "Under Lab Validation",
                "Eco-efficient lightweight masonry blocks utilizing captured carbon dioxide for dimensional stability and reduced water absorption, substituting conventional red clay bricks."
        );
        products.put(block.getId(), block);

        Product drain = new Product(
                "prod-drain-cover-perforated", "precast-perforated-drain-covers",
                "SthiraX Reinforced Precast Storm Drain Slabs", "DRAIN_COVER",
                "Stormwater utility trenches, pedestrian plazas, roadside drainage",
                "600 x 450 x 75 mm with water intake slots", "piece",
                "Specification Under Validation", "Heavy Duty (IS 12592 Class E target)",
                "6.0 - 8.0% CO2 uptake by binder mass (estimated)",
                Arrays.asList("STX-D1: Polymer-modified slag composite with fiber reinforcement"),
                "Wheel load deflection test pending NABL accredited lab signoff",
                new BigDecimal("750.00"), "per piece (ex-works, indicative)",
                "Under Technical Validation",
                "Precision-cast precast drainage covers engineered for high durability against runoff abrasion and corrosive stormwater chemicals."
        );
        products.put(drain.getId(), drain);
    }

    private void seedRegulatoryDocuments() {
        RegulatoryDocument cdRules = new RegulatoryDocument(
                "reg-cd-rules-2025", "Construction and Demolition Waste Management Rules, 2025",
                "Ministry of Environment, Forest and Climate Change (MoEFCC)", "CD_WASTE_RULES",
                "Notification G.S.R. 2025 / S.O. Entry", "1 April 2026",
                "https://moef.gov.in/en/rules-and-regulations/waste-management-rules/",
                "Supersedes 2016 rules. Establishes mandatory minimum utilization of processed C&D recycled aggregate and manufactured sand in precast and non-structural public construction works, enforced with EPR tracking.",
                "Direct commercial tailwind: SthiraX precast formulations incorporate 30-50% processed C&D fines combined with CO2 curing, assisting municipal buyers in meeting EPR utilization quotas.",
                "VERIFIED", "2026-04-15",
                "Schedule I: Mandatory 20% recycled content in government precast procurement starting FY 2026-27; Schedule II: Plant registration on CPCB EPR portal."
        );
        regulatoryDocuments.put(cdRules.getId(), cdRules);

        RegulatoryDocument is15658 = new RegulatoryDocument(
                "reg-is-15658", "IS 15658:2006 (Reaffirmed 2021) - Precast Concrete Blocks for Paving",
                "Bureau of Indian Standards (BIS)", "BIS_STANDARD",
                "IS 15658:2006", "1 January 2007",
                "https://www.services.bis.gov.in/",
                "Indian national standard specifying requirements for precast concrete paver blocks, including compressive strength (30 to 55 MPa), water absorption (max 6%), and abrasion resistance.",
                "Mandatory testing protocol for SthiraX interlocking pavers. Curing with CO2 must satisfy compressive and split tensile requirements without exceeding absorption thresholds.",
                "VERIFIED", "2026-03-20",
                "Clause 6.2: Compressive strength sampling; Clause 8: Abrasion resistance test using Bohme or disc machine."
        );
        regulatoryDocuments.put(is15658.getId(), is15658);

        RegulatoryDocument ccts = new RegulatoryDocument(
                "reg-ccts-bee", "Carbon Credit Trading Scheme (CCTS) - Offset Mechanism",
                "Bureau of Energy Efficiency (BEE) & MoEFCC", "CARBON_TRADING",
                "CCTS Notification 2023 / Offset Guidelines Draft 2025", "Phased implementation 2025-2027",
                "https://beeindia.gov.in/",
                "Framework for domestic Indian carbon market, including compliance entities and voluntary non-obligated sector project offset mechanisms (domestic carbon credit units - CCCs).",
                "Requires careful qualification: SthiraX CO2 mineralization in precast materials is not yet an approved domestic CCTS offset methodology. Revenue models must treat carbon credits as non-guaranteed upside.",
                "UNDER_LEGAL_REVIEW", "2026-04-02",
                "Rule 7: Additionality requirements; Rule 11: Validation and Verification Bodies (VVB) accreditation."
        );
        regulatoryDocuments.put(ccts.getId(), ccts);

        RegulatoryDocument ircSp99 = new RegulatoryDocument(
                "reg-irc-sp-99", "IRC:SP:99-2013 - Guidelines on Precast Concrete Elements for Highway Infrastructure",
                "Indian Roads Congress (IRC)", "IRC_GUIDELINE",
                "IRC:SP:99-2013", "1 October 2013",
                "https://irc.nic.in/",
                "Guidelines governing manufacturing tolerances, curing, and minimum grade requirements for precast road furniture, kerbs, and median barriers on National & State Highways.",
                "SthiraX road kerbstones align with IRC dimension tolerances and surface finish standards.",
                "VERIFIED", "2026-02-14",
                "Section 4: Workmanship and curing specifications; Section 7: Testing tolerances."
        );
        regulatoryDocuments.put(ircSp99.getId(), ircSp99);
    }

    private void seedRoadmapMilestones() {
        RoadmapMilestone p1 = new RoadmapMilestone(
                "road-p1", 1, "Phase 1: Laboratory Mineralization & Mix Formulation",
                "Validate CO2 carbonation kinetics and compressive strength targets on SCM & C&D test prisms in NABL partner lab",
                "Months 1 - 3 (Q1 2026)", "VALIDATED", "None",
                "Pankaj Adhikari (Process Chemistry) / Hitesh Jain A (Civil Engineering)",
                new BigDecimal("650000.00"), new BigDecimal("900000.00"),
                "NABL lab hire, raw materials, test molds, Coriolis meter, gas canisters, SEM/XRD characterization",
                Arrays.asList("Lab formulation report for M40 paver mix", "CO2 uptake curve vs curing pressure", "Compressive strength 7d/28d records"),
                Arrays.asList("Incomplete binder carbonation", "Strength retrogression at excessive CO2 flow"),
                "Lab Report #NABL-STX-012 showing 42.5 MPa compressive strength at 8.2% CO2 absorption"
        );
        roadmapMilestones.put(p1.getId(), p1);

        RoadmapMilestone p2 = new RoadmapMilestone(
                "road-p2", 2, "Phase 2: Plant Retrofit Feasibility & Prototype Curing Chamber",
                "Engineer an asset-light retrofit skid (sealed curing chamber, CO2 manifold, pressure sensors, safety vent) for existing precast plants",
                "Months 3 - 6 (Q2 2026)", "IN_PROGRESS", "Phase 1 Formulation Validation",
                "Shashank Verma (Engineering & Safety) / Sai Nikhil Y (Product Ops)",
                new BigDecimal("1800000.00"), new BigDecimal("2500000.00"),
                "Skid fabrication, pressure relief valves, gas monitor alarms, PLC data logger, installation labor",
                Arrays.asList("Retrofit engineering schematic P&ID", "Safety hazard analysis (HAZOP)", "Commissioning protocol"),
                Arrays.asList("Plant footprint constraints", "CO2 leakage hazards in unventilated sheds"),
                "Skid CAD drawing approved, partner plant site inspection completed in Hosur"
        );
        roadmapMilestones.put(p2.getId(), p2);

        RoadmapMilestone p3 = new RoadmapMilestone(
                "road-p3", 3, "Phase 3: Pilot Batch Production & SthiraX Trace Deployment",
                "Conduct full-scale batch trials (5,000 m2 pavers), integrate IoT digital traceability and issue first public product passports",
                "Months 6 - 9 (Q3 2026)", "NOT_STARTED", "Phase 2 Skid Commissioning",
                "Harshal Raaj Patnaik (Digital Platforms) / Sai Nikhil Y (Operations)",
                new BigDecimal("1200000.00"), new BigDecimal("1600000.00"),
                "Platform hosting, QR tagging, batch raw materials, CO2 supply tanker delivery, field technician support",
                Arrays.asList("5,000 m2 certified pavers produced", "End-to-end batch passport generated in SthiraX Trace", "Third-party audit sample"),
                Arrays.asList("Tanker supply scheduling delays", "Batch consistency variance across shifts"),
                "Pending skid installation at Prakriti Precast plant"
        );
        roadmapMilestones.put(p3.getId(), p3);

        RoadmapMilestone p4 = new RoadmapMilestone(
                "road-p4", 4, "Phase 4: Commercial Procurement Demonstration & Offtake Trials",
                "Deliver commercial orders to urban developer test pavements; initiate voluntary carbon removal methodology validation",
                "Months 9 - 14 (Q4 2026 - Q1 2027)", "NOT_STARTED", "Phase 3 Pilot Batches",
                "Hitesh Jain A (Commercial Partnerships) / Lakshmi N Menon (Communications)",
                new BigDecimal("2200000.00"), new BigDecimal("3500000.00"),
                "Logistics coordination, municipal trial sponsorship, carbon accounting audit fees, client reporting",
                Arrays.asList("2 commercial developer test installations completed", "Customer acceptance testimonials", "Third-party MRV methodology report"),
                Arrays.asList("Lengthy municipal procurement cycles", "Carbon registry methodology review bottlenecks"),
                "Targeting Bangalore Metro Infrastructure pedestrian zone pilot"
        );
        roadmapMilestones.put(p4.getId(), p4);
    }

    private void seedPlantsAndSuppliers() {
        Plant plant1 = new Plant(
                "plant-hosur-01", "Prakriti Precast Facility #1", "org-prakriti-precast",
                "Tamil Nadu", "Hosur Industrial Complex, Krishnagiri District", "635126",
                "M. Selvakumar (Plant Head)", "+91 94432 10980",
                "COMMISSIONED", 45000.0, 68.0,
                Arrays.asList("prod-paver-interlock", "prod-kerbstone-standard"),
                "8.8/10 - High proximity to JSW Steel Salem slag & Ennore fly ash",
                "Enclosed batch chamber with automated CO2 pressure regulation (2.5 bar)",
                true
        );
        plants.put(plant1.getId(), plant1);

        CO2Supplier sup1 = new CO2Supplier(
                "sup-belagavi-01", "org-deccan-co2", "Deccan Distilleries CO2 Capture Unit",
                "Belagavi, Karnataka", "BIOETHANOL_FERMENTATION",
                "99.4% biogenic fermentation grade", 1200.0,
                new BigDecimal("6200.00"), "CIP_DELIVERED", "CRYOGENIC_TANKER",
                "APPROVED", "High biogenic purity stream, minimal sulfur contamination; road tanker transit time ~4.5 hours to regional hubs."
        );
        co2Suppliers.put(sup1.getId(), sup1);
    }

    private void seedOrdersQuotesAndBatches() {
        // Customer Order 1
        CustomerOrder order1 = new CustomerOrder();
        order1.setId("ord-metro-2026-01");
        order1.setOrderNumber("STX-ORD-10024");
        order1.setOrganisationId("org-metro-infra");
        order1.setCustomerName("Metro Infrastructure Projects Ltd");
        order1.setContactEmail("procurement@metroinfra.in");
        order1.setProductId("prod-paver-interlock");
        order1.setProductName("SthiraX Carbon-Cured Interlocking Pavers");
        order1.setQuantity(2500.0);
        order1.setUnit("m2");
        order1.setDeliveryAddress("Metro Station Depot #4, Electronic City Phase 1, Bengaluru");
        order1.setDestinationPincode("560100");
        order1.setAssignedPlantId("plant-hosur-01");
        order1.setAssignedPlantName("Prakriti Precast Facility #1 (Hosur)");
        order1.setOrderStatus("IN_PRODUCTION");
        order1.setQuotedPriceInr(new BigDecimal("170000.00")); // 2500 m2 @ 68 INR/m2
        order1.setEstimatedCostInr(new BigDecimal("128500.00"));
        order1.setActualCostInr(new BigDecimal("127200.00"));
        order1.setRealizedContributionMarginInr(new BigDecimal("42800.00"));
        order1.setActiveQuoteId("quote-10024-v1");
        order1.setExpectedDeliveryDate("2026-11-15");
        order1.setCreatedAt(Instant.now().minusSeconds(86400 * 5));
        order1.setUpdatedAt(Instant.now().minusSeconds(3600 * 4));
        customerOrders.put(order1.getId(), order1);

        // Quote for Order 1
        Quote q1 = new Quote();
        q1.setId("quote-10024-v1");
        q1.setQuoteNumber("QT-2026-0881");
        q1.setOrderId(order1.getId());
        q1.setVersion(1);
        q1.setStatus("ACCEPTED");
        q1.setUnitPriceInr(new BigDecimal("68.00"));
        q1.setTotalAmountInr(new BigDecimal("170000.00"));
        q1.setEstimatedCostTotalInr(new BigDecimal("128500.00"));
        q1.setTargetMarginPercent(new BigDecimal("24.41"));
        q1.setValidityDate("2026-11-30");
        q1.setTerms("Payment 30% advance, 70% upon delivery and receipt of verified SthiraX Batch Passport. Excludes unloading at buyer site.");
        q1.setCreatedAt(Instant.now().minusSeconds(86400 * 6));
        quotes.put(q1.getId(), q1);

        // Shipment for CO2 supply
        Shipment s1 = new Shipment();
        s1.setId("ship-co2-001");
        s1.setShipmentNumber("SHP-CO2-8802");
        s1.setType("CO2_DELIVERY");
        s1.setReferenceOrderId(order1.getId());
        s1.setOrigin("Deccan Distilleries, Belagavi");
        s1.setDestination("Prakriti Precast Facility #1, Hosur");
        s1.setQuantityTonnes(8.5);
        s1.setDistanceKm(360.0);
        s1.setTransportMode("CRYOGENIC_TANKER");
        s1.setTransportCostInr(new BigDecimal("18200.00"));
        s1.setStatus("DELIVERED");
        s1.setDispatchTimestamp("2026-10-24 06:00:00");
        s1.setArrivalTimestamp("2026-10-24 16:30:00");
        s1.setCarrierName("CryoLogix Bulk Transporters");
        s1.setVehicleNumber("KA-22-B-9142");
        s1.setDeliveryNotes("Delivered liquid CO2 into on-site vacuum insulated storage vessel; Coriolis calibration verified.");
        s1.setCreatedAt(Instant.now().minusSeconds(86400 * 4));
        shipments.put(s1.getId(), s1);

        // Production Batch
        ProductionBatch b1 = new ProductionBatch();
        b1.setId("batch-2026-108");
        b1.setBatchNumber("STX-2026-B108");
        b1.setPlantId("plant-hosur-01");
        b1.setPlantName("Prakriti Precast Facility #1 (Hosur)");
        b1.setProductId("prod-paver-interlock");
        b1.setProductName("SthiraX Carbon-Cured Interlocking Pavers");
        b1.setAssociatedOrderId(order1.getId());
        b1.setProductionDate("2026-10-26");
        b1.setRawMaterialTonnage(24.5);
        b1.setRawMaterialMix("Processed C&D Recycled Fines 35%, GGBS 30%, Fly Ash 20%, OPC 15%");
        b1.setCo2InputKg(480.0);
        b1.setCo2MeasurementSource("Coriolis mass flow meter (Endress+Hauser Promass 83F), calibrated 2026-09-15");
        b1.setEstimatedUptakeKg(412.0); // ~85.8% uptake
        b1.setMineralisationBasis("Differential mass balance and post-cure thermal gravimetric analysis (TGA) sampling");
        b1.setCuringDurationHours(14);
        b1.setChamberPressureBar("2.2 - 2.5 bar controlled");
        b1.setTestedCompressiveStrengthMpa(43.2);
        b1.setOperatorName("K. Natarajan");
        b1.setBatchStatus("RELEASED");
        b1.setQualityReviewId("rev-108");
        b1.setPublicPassportId("pass-7f9a2b4c");
        b1.setCreatedAt(Instant.now().minusSeconds(86400 * 2));
        productionBatches.put(b1.getId(), b1);

        // Quality Review for Batch
        QualityReview rev1 = new QualityReview();
        rev1.setId("rev-108");
        rev1.setBatchId(b1.getId());
        rev1.setBatchNumber(b1.getBatchNumber());
        rev1.setReviewerId("usr-quality-1");
        rev1.setReviewerName("Shashank Verma (Civil QA Lead)");
        rev1.setDecision("APPROVED");
        rev1.setDecisionReason("Batch compressive strength 43.2 MPa exceeds IS 15658 M40 target. CO2 flow telemetry log confirmed within tolerance (480 kg input, 412 kg mineralized). Zero visual spalling or cracking.");
        rev1.setChecklistPassed(Arrays.asList(
                "Raw material weight tickets verified against batch formula STX-F1",
                "CO2 continuous chamber pressure log checked (2.2 - 2.5 bar maintained)",
                "Moisture content in pre-curing green block validated (7.2% optimum)",
                "28-day equivalent accelerated strength reached (>40 MPa)",
                "Water absorption test within BIS 6% limit (tested 4.4%)"
        ));
        rev1.setStrengthMetBisStandard(true);
        rev1.setCo2FlowEvidenceVerified(true);
        rev1.setRawMaterialBatchTicketsVerified(true);
        rev1.setLaboratoryReportReference("LAB-STX-2026-OCT-094 (Civil Eng Dept, Hosur Test Centre)");
        rev1.setDecisionTimestamp(Instant.now().minusSeconds(86400));
        rev1.setCreatedAt(Instant.now().minusSeconds(86400 * 2));
        qualityReviews.put(rev1.getId(), rev1);

        // Demonstration Public Passport
        ProductPassport passport = new ProductPassport();
        passport.setId("pass-7f9a2b4c");
        passport.setBatchId(b1.getId());
        passport.setBatchNumber(b1.getBatchNumber());
        passport.setProductName(b1.getProductName());
        passport.setProductCategory("PAVER");
        passport.setPlantLocation("Prakriti Precast Facility #1, Hosur, Tamil Nadu");
        passport.setProductionDate(b1.getProductionDate());
        passport.setPublicationStatus("PUBLISHED");
        passport.setVerificationStatus("REVIEWED");
        passport.setReviewerRole("Quality Reviewer (Shashank Verma)");
        passport.setTotalOutputUnits(1200.0);
        passport.setOutputUnit("m2");
        passport.setCo2InjectedKg(480.0);
        passport.setMineralizedCo2Kg(412.0);
        passport.setMeasurementMethodology("Direct Coriolis Mass Flow Injection & Accelerated Carbonation Mass Balance (ISO 14064-2 aligned)");
        passport.setBisStandardReference("IS 15658:2006 (Precast Concrete Blocks for Paving - M40 Grade)");
        passport.setTestedStrengthMpa(43.2);
        passport.setVerifiedRecycledFeedstocks(Arrays.asList("35% C&D Recycled Fine Aggregate", "30% Ground Granulated Blast Furnace Slag (GGBS)", "20% Fly Ash"));
        passport.setQrCodePayload("https://sthirax.com/passports/pass-7f9a2b4c");
        passport.setDisclaimer("Illustrative demonstration record based on pilot batch telemetry. Commercial production subject to third-party NABL verification. Excludes confidential commercial pricing.");
        passport.setPublishedAt(Instant.now().minusSeconds(86400));
        productPassports.put(passport.getId(), passport);

        // Carbon Accounting Record
        CarbonAccountingRecord car1 = new CarbonAccountingRecord();
        car1.setId("car-108");
        car1.setBatchId(b1.getId());
        car1.setBatchNumber(b1.getBatchNumber());
        car1.setCo2InputKg(480.0);
        car1.setMineralizedCo2Kg(412.0);
        car1.setProcessEmissionsKg(18.6);
        car1.setTransportEmissionsKg(14.2);
        car1.setEstimatedNetRemovalKg(379.2); // 412 - (18.6 + 14.2)
        car1.setAvoidedEmissionsKg(1150.0); // SCM substitution baseline vs OPC
        car1.setMethodologyVersion("SthiraX-MRV-v1.0 (Gate-to-Gate Mineralization Scope)");
        car1.setEvidenceCompleteness("COMPLETE");
        car1.setVerificationStatus("INTERNAL_REVIEWED");
        car1.setRegistryOfftakeStatus("UNALLOTTED");
        car1.setNotes("CO2 input (480 kg) chemically mineralized into 412 kg calcium carbonate. Net gate-to-gate removal estimated at 379.2 kg after process grid electricity and tanker transport deductions. Distinct from 1,150 kg avoided emissions.");
        car1.setCreatedAt(Instant.now().minusSeconds(86400));
        carbonRecords.put(car1.getId(), car1);
    }

    private void seedCostModels() {
        CostModel cm = new CostModel();
        cm.setId("cost-retrofit-sample-1");
        cm.setReferenceType("RETROFIT_SCENARIO");
        cm.setName("Standard Precast Plant Retrofit Baseline (Hosur / Bangalore Cluster)");
        cm.setInitialInvestmentInr(new BigDecimal("2200000.00")); // Rs 22 Lakhs for skid, enclosure & sensors
        cm.setAnnualCapacityTonnes(30000.0);
        cm.setExpectedUtilisationRate(0.70); // 70% utilisation
        cm.setConventionalSellingPriceInr(new BigDecimal("3400.00")); // per tonne conventional
        cm.setSthiraxSellingPriceInr(new BigDecimal("3650.00")); // modest green premium or parity
        cm.setRawMaterialCostPerTonneInr(new BigDecimal("1850.00")); // using slag/C&D blend
        cm.setCo2CostPerTonneInr(new BigDecimal("120.00")); // ~20 kg CO2 / tonne @ Rs 6/kg
        cm.setCo2TransportCostPerTonneInr(new BigDecimal("45.00"));
        cm.setEnergyCostPerTonneInr(new BigDecimal("90.00"));
        cm.setLaborCostPerTonneInr(new BigDecimal("210.00"));
        cm.setMaintenanceCostPerTonneInr(new BigDecimal("85.00"));
        cm.setQualityTestingCostPerTonneInr(new BigDecimal("40.00"));
        cm.setEquipmentLeasePerYearInr(BigDecimal.ZERO); // CaPex owned scenario
        cm.setOverheadCostPerTonneInr(new BigDecimal("160.00"));
        cm.setRejectionRate(0.025); // 2.5% scrap
        cm.setCreatedAt(Instant.now());

        costService.calculate(cm);
        costModels.put(cm.getId(), cm);
    }

    private void seedCarbonOfftake() {
        CarbonOfftakeOpportunity co1 = new CarbonOfftakeOpportunity();
        co1.setId("offtake-demo-01");
        co1.setProspectiveBuyerName("Apex Global Enterprise Tech (India Campus ESG)");
        co1.setBuyerType("TECH_CORPORATE");
        co1.setTargetQuantityTonnes(500.0);
        co1.setDeliveryPeriod("Q4 2026 - Q2 2027");
        co1.setIndicativePricePerTonneInr(new BigDecimal("8500.00")); // ~ $100/tCO2 mineralization
        co1.setApplicableMethodology("Puro.earth / ISO 14064-2 Terrestrial Mineralization Framework");
        co1.setEligibilityStatus("EVALUATING");
        co1.setContractStatus("TERM_SHEET");
        co1.setExpectedTransactionCostsInr(new BigDecimal("250000.00"));
        co1.setActualRealizedRevenueInr(BigDecimal.ZERO);
        co1.setNotes("Non-guaranteed commercial upside: Buyer requires accredited third-party VVB validation before executing offtake agreement.");
        co1.setCreatedAt(Instant.now());
        carbonOfftakes.put(co1.getId(), co1);
    }

    public void logAudit(String action, String entityType, String entityId, String userId, String userName, String role, String details) {
        AuditEvent event = new AuditEvent(
                "audit-" + UUID.randomUUID().toString().substring(0, 8),
                action, entityType, entityId, userId, userName, role, details
        );
        auditEvents.add(event);
    }
}
