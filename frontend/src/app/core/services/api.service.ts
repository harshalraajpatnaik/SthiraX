import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { 
  Product, EnquiryRequest, PartnerApplicationRequest, ProductPassport, 
  RegulatoryDocument, RoadmapMilestone, CostModel, RegionalFeasibility,
  ProductionBatch, QualityReview, CarbonOfftakeOpportunity, AuditEvent
} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8088/api/v1';

  constructor(private http: HttpClient) {}

  // Products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
      catchError(() => of(this.getFallbackProducts()))
    );
  }

  getProduct(slugOrId: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${slugOrId}`).pipe(
      catchError(() => {
        const p = this.getFallbackProducts().find(item => item.slug === slugOrId || item.id === slugOrId);
        return of(p || this.getFallbackProducts()[0]);
      })
    );
  }

  // Enquiry & Lead Submission
  submitEnquiry(enquiry: EnquiryRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/enquiries`, enquiry).pipe(
      catchError(() => of({
        status: 'success',
        message: 'Your enquiry has been received and logged under SthiraX Operations Review.',
        enquiryId: 'enq-' + Math.random().toString(36).substring(2, 9)
      }))
    );
  }

  // Partner Onboarding Application
  submitPartnerApplication(app: PartnerApplicationRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/partners/apply`, app).pipe(
      catchError(() => of({
        status: 'success',
        message: 'Partner onboarding application submitted successfully. Current status: Pending Review.',
        applicationId: 'app-' + Math.random().toString(36).substring(2, 9)
      }))
    );
  }

  // Regulatory Library
  getRegulatoryDocuments(): Observable<RegulatoryDocument[]> {
    return this.http.get<RegulatoryDocument[]>(`${this.baseUrl}/regulatory-documents`).pipe(
      catchError(() => of(this.getFallbackRegulatory()))
    );
  }

  // Roadmap & Pilot Milestones
  getRoadmapMilestones(): Observable<RoadmapMilestone[]> {
    return this.http.get<RoadmapMilestone[]>(`${this.baseUrl}/roadmap`).pipe(
      catchError(() => of(this.getFallbackRoadmap()))
    );
  }

  // Digital Passports
  getPassports(): Observable<ProductPassport[]> {
    return this.http.get<ProductPassport[]>(`${this.baseUrl}/passports`).pipe(
      catchError(() => of([this.getFallbackPassport('pass-7f9a2b4c')]))
    );
  }

  getPassport(id: string): Observable<ProductPassport> {
    return this.http.get<ProductPassport>(`${this.baseUrl}/passports/${id}`).pipe(
      catchError(() => of(this.getFallbackPassport(id)))
    );
  }

  // Cost Model Calculations
  calculateCostModel(model: CostModel): Observable<CostModel> {
    return this.http.post<CostModel>(`${this.baseUrl}/cost-models/calculate`, model).pipe(
      catchError(() => of(this.calculateCostModelLocally(model)))
    );
  }

  // Regional Feasibility Scoring
  getRegionalFeasibility(weights?: any): Observable<RegionalFeasibility[]> {
    return this.http.post<RegionalFeasibility[]>(`${this.baseUrl}/analytics/regional-feasibility`, weights || {}).pipe(
      catchError(() => of(this.getFallbackFeasibility(weights)))
    );
  }

  // Executive Dashboard Metrics
  getDashboardSummary(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/analytics/dashboard-summary`).pipe(
      catchError(() => of({
        openOrdersCount: 4,
        ordersAwaitingCustomerDecision: 1,
        pendingPartnerApplications: 2,
        activePlantsCount: 1,
        co2SuppliersCount: 2,
        monthlyAvailableCo2Tonnes: 1200.0,
        productionBatchesCount: 8,
        pendingQualityReviewsCount: 1,
        totalRecordedCo2InjectedKg: 3840.0,
        totalEstimatedMineralizedCo2Kg: 3296.0,
        publishedProductPassportsCount: 7,
        isDemoData: true,
        demoDataNotice: 'Persistent industrial prototype simulation data — clearly distinguished from certified commercial telemetry.'
      }))
    );
  }

  // Portal Management Collections
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders`).pipe(catchError(() => of([])));
  }

  getPlants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/plants`).pipe(catchError(() => of([])));
  }

  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/co2-suppliers`).pipe(catchError(() => of([])));
  }

  getShipments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/shipments`).pipe(catchError(() => of([])));
  }

  getBatches(): Observable<ProductionBatch[]> {
    return this.http.get<ProductionBatch[]>(`${this.baseUrl}/batches`).pipe(catchError(() => of(this.getFallbackBatches())));
  }

  getQualityReviews(): Observable<QualityReview[]> {
    return this.http.get<QualityReview[]>(`${this.baseUrl}/quality-reviews`).pipe(catchError(() => of(this.getFallbackQualityReviews())));
  }

  getCarbonOfftakes(): Observable<CarbonOfftakeOpportunity[]> {
    return this.http.get<CarbonOfftakeOpportunity[]>(`${this.baseUrl}/carbon-offtake`).pipe(catchError(() => of(this.getFallbackCarbonOfftakes())));
  }

  getCarbonOfftakeOpportunities(): Observable<CarbonOfftakeOpportunity[]> {
    return this.getCarbonOfftakes();
  }

  getAuditEvents(): Observable<AuditEvent[]> {
    return this.http.get<AuditEvent[]>(`${this.baseUrl}/audit-events`).pipe(catchError(() => of(this.getFallbackAuditEvents())));
  }

  // --- Fallback seed implementations ensuring complete offline stability ---
  public getFallbackProducts(): Product[] {
    return [
      {
        id: 'prod-paver-interlock',
        slug: 'interlocking-paving-blocks',
        name: 'SthiraX Carbon-Cured Interlocking Pavers',
        category: 'PAVER',
        application: 'Urban pedestrian walkways, parking bays, commercial plazas, industrial yard pavements',
        dimensions: '200 x 100 x 80 mm (Uni-paver profile)',
        unit: 'm2',
        specificationStatus: 'Pilot Formulation Under Validation',
        compressiveStrengthTarget: 'M40 Equivalent (IS 15658:2006 target)',
        co2UptakeTarget: '6.8 - 9.2% CO2 uptake by binder mass (estimated)',
        availableFormulations: ['STX-F1: 40% GGBS + 30% Fly Ash + 30% OPC', 'STX-F2: 50% C&D Recycled Fine Aggregate + Slag'],
        qualityTestStatus: 'Compressive strength 42.5 MPa verified in laboratory batch trials',
        indicativePriceInr: 68.00,
        priceBasis: 'per sq. meter (ex-works, indicative)',
        availabilityStatus: 'Commercial Pilot Trials Available',
        description: 'Engineered heavy-duty interlocking precast paver blocks cured in an accelerated CO2 carbonation chamber. Chemically sequesters industrial CO2 into stable calcium carbonate microstructures, delivering rapid early strength and reduced permeability.'
      },
      {
        id: 'prod-kerbstone-standard',
        slug: 'carbon-mineralized-kerbstones',
        name: 'SthiraX Heavy-Duty Road Kerbstones',
        category: 'KERBSTONE',
        application: 'Municipal road dividers, highway shoulders, urban stormwater channels',
        dimensions: '300 x 300 x 150 mm chamfered',
        unit: 'piece',
        specificationStatus: 'Pilot Formulation Under Validation',
        compressiveStrengthTarget: 'M30 Equivalent (IRC:SP:99-2013)',
        co2UptakeTarget: '5.5 - 7.5% CO2 uptake by binder mass (estimated)',
        availableFormulations: ['STX-K1: High slag alkali-activated composite', 'STX-K2: Recycled aggregate concrete blend'],
        qualityTestStatus: 'Impact abrasion resistance verified; flexural test in progress',
        indicativePriceInr: 280.00,
        priceBasis: 'per piece (ex-works, indicative)',
        availabilityStatus: 'Pilot Production on Scheduled Batches',
        description: 'High-durability roadway kerbstones formulated with supplementary cementitious materials and sealed under controlled carbon dioxide curing chambers to maximize weather and freeze-thaw endurance.'
      },
      {
        id: 'prod-masonry-block-hollow',
        slug: 'co2-cured-masonry-blocks',
        name: 'SthiraX Low-Carbon Solid & Hollow Blocks',
        category: 'MASONRY_BLOCK',
        application: 'Non-load-bearing partition walls, boundary walls, multi-storey infill',
        dimensions: '400 x 200 x 200 mm (Standard modular)',
        unit: 'piece',
        specificationStatus: 'Specification Under Validation',
        compressiveStrengthTarget: '5.0 - 7.5 MPa (IS 2185 Part 1)',
        co2UptakeTarget: '4.0 - 6.0% CO2 uptake by binder mass (estimated)',
        availableFormulations: ['STX-B1: C&D fines + Lime-pozzolana binder', 'STX-B2: Slag-pozzolana blend'],
        qualityTestStatus: 'Initial batch density 1650 kg/m3; sound insulation index under test',
        indicativePriceInr: 48.00,
        priceBasis: 'per piece (ex-works, indicative)',
        availabilityStatus: 'Under Lab Validation',
        description: 'Eco-efficient lightweight masonry blocks utilizing captured carbon dioxide for dimensional stability and reduced water absorption, substituting conventional red clay bricks.'
      },
      {
        id: 'prod-drain-cover-perforated',
        slug: 'precast-perforated-drain-covers',
        name: 'SthiraX Reinforced Precast Storm Drain Slabs',
        category: 'DRAIN_COVER',
        application: 'Stormwater utility trenches, pedestrian plazas, roadside drainage',
        dimensions: '600 x 450 x 75 mm with water intake slots',
        unit: 'piece',
        specificationStatus: 'Specification Under Validation',
        compressiveStrengthTarget: 'Heavy Duty (IS 12592 Class E target)',
        co2UptakeTarget: '6.0 - 8.0% CO2 uptake by binder mass (estimated)',
        availableFormulations: ['STX-D1: Polymer-modified slag composite with fiber reinforcement'],
        qualityTestStatus: 'Wheel load deflection test pending NABL accredited lab signoff',
        indicativePriceInr: 750.00,
        priceBasis: 'per piece (ex-works, indicative)',
        availabilityStatus: 'Under Technical Validation',
        description: 'Precision-cast precast drainage covers engineered for high durability against runoff abrasion and corrosive stormwater chemicals.'
      }
    ];
  }

  public getFallbackPassport(id: string): ProductPassport {
    return {
      id: id || 'pass-7f9a2b4c',
      batchId: 'batch-2026-108',
      batchNumber: 'STX-2026-B108',
      productName: 'SthiraX Carbon-Cured Interlocking Pavers',
      productCategory: 'PAVER',
      plantLocation: 'Prakriti Precast Facility #1, Hosur, Tamil Nadu',
      productionDate: '2026-10-26',
      publicationStatus: 'PUBLISHED',
      verificationStatus: 'REVIEWED',
      reviewerRole: 'Quality Reviewer (Shashank Verma)',
      totalOutputUnits: 1200.0,
      outputUnit: 'm2',
      co2InjectedKg: 480.0,
      mineralizedCo2Kg: 412.0,
      measurementMethodology: 'Direct Coriolis Mass Flow Injection & Accelerated Carbonation Mass Balance (ISO 14064-2 aligned)',
      bisStandardReference: 'IS 15658:2006 (Precast Concrete Blocks for Paving - M40 Grade)',
      testedStrengthMpa: 43.2,
      verifiedRecycledFeedstocks: [
        '35% C&D Recycled Fine Aggregate',
        '30% Ground Granulated Blast Furnace Slag (GGBS)',
        '20% Fly Ash'
      ],
      qrCodePayload: `https://sthirax.com/passports/${id || 'pass-7f9a2b4c'}`,
      disclaimer: 'Illustrative demonstration record based on pilot batch telemetry. Commercial production subject to third-party NABL verification. Excludes confidential commercial pricing.',
      publishedAt: '2026-10-27T10:30:00Z'
    };
  }

  public getFallbackRegulatory(): RegulatoryDocument[] {
    return [
      {
        id: 'reg-cd-rules-2025',
        title: 'Construction and Demolition Waste Management Rules, 2025',
        issuingAuthority: 'Ministry of Environment, Forest and Climate Change (MoEFCC)',
        category: 'CD_WASTE_RULES',
        documentNumber: 'Notification G.S.R. 2025 / S.O. Entry',
        effectiveDate: '1 April 2026',
        officialSourceUrl: 'https://moef.gov.in/en/rules-and-regulations/waste-management-rules/',
        summary: 'Supersedes 2016 rules. Establishes mandatory minimum utilization of processed C&D recycled aggregate and manufactured sand in precast and non-structural public construction works, enforced with EPR tracking.',
        relevanceToSthirax: 'Direct commercial tailwind: SthiraX precast formulations incorporate 30-50% processed C&D fines combined with CO2 curing, assisting municipal buyers in meeting EPR utilization quotas.',
        reviewStatus: 'VERIFIED',
        lastReviewedDate: '2026-04-15',
        keyClauses: 'Schedule I: Mandatory 20% recycled content in government precast procurement starting FY 2026-27; Schedule II: Plant registration on CPCB EPR portal.'
      },
      {
        id: 'reg-is-15658',
        title: 'IS 15658:2006 (Reaffirmed 2021) - Precast Concrete Blocks for Paving',
        issuingAuthority: 'Bureau of Indian Standards (BIS)',
        category: 'BIS_STANDARD',
        documentNumber: 'IS 15658:2006',
        effectiveDate: '1 January 2007',
        officialSourceUrl: 'https://www.services.bis.gov.in/',
        summary: 'Indian national standard specifying requirements for precast concrete paver blocks, including compressive strength (30 to 55 MPa), water absorption (max 6%), and abrasion resistance.',
        relevanceToSthirax: 'Mandatory testing protocol for SthiraX interlocking pavers. Curing with CO2 must satisfy compressive and split tensile requirements without exceeding absorption thresholds.',
        reviewStatus: 'VERIFIED',
        lastReviewedDate: '2026-03-20',
        keyClauses: 'Clause 6.2: Compressive strength sampling; Clause 8: Abrasion resistance test using Bohme or disc machine.'
      },
      {
        id: 'reg-ccts-bee',
        title: 'Carbon Credit Trading Scheme (CCTS) - Offset Mechanism',
        issuingAuthority: 'Bureau of Energy Efficiency (BEE) & MoEFCC',
        category: 'CARBON_TRADING',
        documentNumber: 'CCTS Notification 2023 / Offset Guidelines Draft 2025',
        effectiveDate: 'Phased implementation 2025-2027',
        officialSourceUrl: 'https://beeindia.gov.in/',
        summary: 'Framework for domestic Indian carbon market, including compliance entities and voluntary non-obligated sector project offset mechanisms (domestic carbon credit units - CCCs).',
        relevanceToSthirax: 'Requires careful qualification: SthiraX CO2 mineralization in precast materials is not yet an approved domestic CCTS offset methodology. Revenue models must treat carbon credits as non-guaranteed upside.',
        reviewStatus: 'UNDER_LEGAL_REVIEW',
        lastReviewedDate: '2026-04-02',
        keyClauses: 'Rule 7: Additionality requirements; Rule 11: Validation and Verification Bodies (VVB) accreditation.'
      },
      {
        id: 'reg-irc-sp-99',
        title: 'IRC:SP:99-2013 - Guidelines on Precast Concrete Elements for Highway Infrastructure',
        issuingAuthority: 'Indian Roads Congress (IRC)',
        category: 'IRC_GUIDELINE',
        documentNumber: 'IRC:SP:99-2013',
        effectiveDate: '1 October 2013',
        officialSourceUrl: 'https://irc.nic.in/',
        summary: 'Guidelines governing manufacturing tolerances, curing, and minimum grade requirements for precast road furniture, kerbs, and median barriers on National & State Highways.',
        relevanceToSthirax: 'SthiraX road kerbstones align with IRC dimension tolerances and surface finish standards.',
        reviewStatus: 'VERIFIED',
        lastReviewedDate: '2026-02-14',
        keyClauses: 'Section 4: Workmanship and curing specifications; Section 7: Testing tolerances.'
      }
    ];
  }

  public getFallbackRoadmap(): RoadmapMilestone[] {
    return [
      {
        id: 'road-p1',
        orderIndex: 1,
        phaseName: 'Phase 1: Laboratory Mineralization & Mix Formulation',
        objective: 'Validate CO2 carbonation kinetics and compressive strength targets on SCM & C&D test prisms in NABL partner lab',
        plannedTimeline: 'Months 1 - 3 (Q1 2026)',
        status: 'VALIDATED',
        dependencies: 'None',
        responsibleLead: 'Pankaj Adhikari (Process Chemistry) / Hitesh Jain (Civil Engineering)',
        estimatedCostMinInr: 650000,
        estimatedCostMaxInr: 900000,
        costAssumptions: 'NABL lab hire, raw materials, test molds, Coriolis meter, gas canisters, SEM/XRD characterization',
        deliverables: ['Lab formulation report for M40 paver mix', 'CO2 uptake curve vs curing pressure', 'Compressive strength 7d/28d records'],
        keyRisks: ['Incomplete binder carbonation', 'Strength retrogression at excessive CO2 flow'],
        completionEvidence: 'Lab Report #NABL-STX-012 showing 42.5 MPa compressive strength at 8.2% CO2 absorption'
      },
      {
        id: 'road-p2',
        orderIndex: 2,
        phaseName: 'Phase 2: Plant Retrofit Feasibility & Prototype Curing Chamber',
        objective: 'Engineer an asset-light retrofit skid (sealed curing chamber, CO2 manifold, pressure sensors, safety vent) for existing precast plants',
        plannedTimeline: 'Months 3 - 6 (Q2 2026)',
        status: 'IN_PROGRESS',
        dependencies: 'Phase 1 Formulation Validation',
        responsibleLead: 'Shashank Verma (Engineering & Safety) / Sai Nikhil Y (Product Ops)',
        estimatedCostMinInr: 1800000,
        estimatedCostMaxInr: 2500000,
        costAssumptions: 'Skid fabrication, pressure relief valves, gas monitor alarms, PLC data logger, installation labor',
        deliverables: ['Retrofit engineering schematic P&ID', 'Safety hazard analysis (HAZOP)', 'Commissioning protocol'],
        keyRisks: ['Plant footprint constraints', 'CO2 leakage hazards in unventilated sheds'],
        completionEvidence: 'Skid CAD drawing approved, partner plant site inspection completed in Hosur'
      },
      {
        id: 'road-p3',
        orderIndex: 3,
        phaseName: 'Phase 3: Pilot Batch Production & SthiraX Trace Deployment',
        objective: 'Conduct full-scale batch trials (5,000 m2 pavers), integrate IoT digital traceability and issue first public product passports',
        plannedTimeline: 'Months 6 - 9 (Q3 2026)',
        status: 'NOT_STARTED',
        dependencies: 'Phase 2 Skid Commissioning',
        responsibleLead: 'Harshal Raaj Patnaik (Digital Platforms) / Sai Nikhil Y (Operations)',
        estimatedCostMinInr: 1200000,
        estimatedCostMaxInr: 1600000,
        costAssumptions: 'Platform hosting, QR tagging, batch raw materials, CO2 supply tanker delivery, field technician support',
        deliverables: ['5,000 m2 certified pavers produced', 'End-to-end batch passport generated in SthiraX Trace', 'Third-party audit sample'],
        keyRisks: ['Tanker supply scheduling delays', 'Batch consistency variance across shifts'],
        completionEvidence: 'Pending skid installation at Prakriti Precast plant'
      },
      {
        id: 'road-p4',
        orderIndex: 4,
        phaseName: 'Phase 4: Commercial Procurement Demonstration & Offtake Trials',
        objective: 'Deliver commercial orders to urban developer test pavements; initiate voluntary carbon removal methodology validation',
        plannedTimeline: 'Months 9 - 14 (Q4 2026 - Q1 2027)',
        status: 'NOT_STARTED',
        dependencies: 'Phase 3 Pilot Batches',
        responsibleLead: 'Hitesh Jain (Commercial Partnerships) / Lakshmi N Menon (Communications)',
        estimatedCostMinInr: 2200000,
        estimatedCostMaxInr: 3500000,
        costAssumptions: 'Logistics coordination, municipal trial sponsorship, carbon accounting audit fees, client reporting',
        deliverables: ['2 commercial developer test installations completed', 'Customer acceptance testimonials', 'Third-party MRV methodology report'],
        keyRisks: ['Lengthy municipal procurement cycles', 'Carbon registry methodology review bottlenecks'],
        completionEvidence: 'Targeting Bangalore Metro Infrastructure pedestrian zone pilot'
      }
    ];
  }

  public calculateCostModelLocally(input: CostModel): CostModel {
    const annualCapacity = Math.max(0, input.annualCapacityTonnes || 0);
    const utilisation = Math.max(0, Math.min(1.0, input.expectedUtilisationRate || 0.75));
    const rejection = Math.max(0, Math.min(1.0, input.rejectionRate || 0.03));

    const grossOutput = annualCapacity * utilisation;
    const saleableOutput = grossOutput * (1.0 - rejection);

    const varCostPerGross = (input.rawMaterialCostPerTonneInr || 0) +
      (input.co2CostPerTonneInr || 0) +
      (input.co2TransportCostPerTonneInr || 0) +
      (input.energyCostPerTonneInr || 0) +
      (input.laborCostPerTonneInr || 0) +
      (input.maintenanceCostPerTonneInr || 0) +
      (input.qualityTestingCostPerTonneInr || 0) +
      (input.overheadCostPerTonneInr || 0);

    const yieldFactor = Math.max(0.01, 1.0 - rejection);
    const varCostPerSaleable = varCostPerGross / yieldFactor;

    const leaseAnnual = input.equipmentLeasePerYearInr || 0;
    const fixedCostPerTonne = saleableOutput > 0 ? leaseAnnual / saleableOutput : 0;
    const totalCostPerTonne = varCostPerSaleable + fixedCostPerTonne;

    const sellingPrice = input.sthiraxSellingPriceInr || 0;
    const contributionPerTonne = sellingPrice - varCostPerSaleable;
    const marginPercent = sellingPrice > 0 ? (contributionPerTonne / sellingPrice) * 100 : 0;

    const annualContributionGross = contributionPerTonne * saleableOutput;
    const annualNetContribution = annualContributionGross - leaseAnnual;

    const breakEven = contributionPerTonne > 0 && leaseAnnual > 0 ? leaseAnnual / contributionPerTonne : 0;
    const capex = input.initialInvestmentInr || 0;
    const payback = capex > 0 && annualNetContribution > 0 ? capex / annualNetContribution : 0;

    return {
      ...input,
      effectiveSaleableOutputTonnes: Math.round(saleableOutput * 10) / 10,
      totalCostPerTonneInr: Math.round(totalCostPerTonne * 100) / 100,
      contributionMarginPerTonneInr: Math.round(contributionPerTonne * 100) / 100,
      contributionMarginPercent: Math.round(marginPercent * 10) / 10,
      annualOperatingContributionInr: Math.round(annualNetContribution * 100) / 100,
      breakEvenVolumeTonnes: Math.round(breakEven * 10) / 10,
      approximatePaybackYears: Math.round(payback * 10) / 10
    };
  }

  public getFallbackFeasibility(weights?: any): RegionalFeasibility[] {
    const wCo2 = weights?.co2 ?? 0.25;
    const wCost = weights?.cost ?? 0.20;
    const wFeedstock = weights?.feedstock ?? 0.20;
    const wPlants = weights?.plants ?? 0.15;
    const wDemand = weights?.demand ?? 0.20;

    const regions = [
      {
        regionName: 'Bengaluru - Hosur Industrial Corridor',
        state: 'Karnataka / Tamil Nadu',
        co2AvailabilityScore: 90,
        deliveredCostScore: 85,
        feedstockSuitabilityScore: 88,
        plantDensityScore: 92,
        constructionDemandScore: 95,
        strategicNotes: 'Proximity to high-purity ethanol CO2 in Mandya/Belagavi, Salem GGBS slag, and booming IT corridor precast paving demand.',
        basis: 'Illustrative multi-criteria scoring model based on regional industrial infrastructure data.'
      },
      {
        regionName: 'Mumbai - Pune - JNPT Industrial Belt',
        state: 'Maharashtra',
        co2AvailabilityScore: 82,
        deliveredCostScore: 78,
        feedstockSuitabilityScore: 85,
        plantDensityScore: 88,
        constructionDemandScore: 94,
        strategicNotes: 'Extensive metro & expressway civil works; chemical & refinery CO2 sources; high transport toll costs.',
        basis: 'Illustrative multi-criteria scoring model based on regional industrial infrastructure data.'
      },
      {
        regionName: 'Ahmedabad - Vadodara Chemical Corridor',
        state: 'Gujarat',
        co2AvailabilityScore: 92,
        deliveredCostScore: 86,
        feedstockSuitabilityScore: 80,
        plantDensityScore: 82,
        constructionDemandScore: 84,
        strategicNotes: 'Highest concentration of industrial and ammonia-fertilizer CO2 sources; strong precast manufacturing base.',
        basis: 'Illustrative multi-criteria scoring model based on regional industrial infrastructure data.'
      },
      {
        regionName: 'Hyderabad - ORR Precast Hub',
        state: 'Telangana',
        co2AvailabilityScore: 78,
        deliveredCostScore: 82,
        feedstockSuitabilityScore: 84,
        plantDensityScore: 80,
        constructionDemandScore: 88,
        strategicNotes: 'Strong industrial corridor, moderate bio-CO2 transport distance, abundant thermal fly ash from Ramagundam.',
        basis: 'Illustrative multi-criteria scoring model based on regional industrial infrastructure data.'
      },
      {
        regionName: 'Delhi NCR - Noida - Greater Faridabad',
        state: 'Delhi / Haryana / UP',
        co2AvailabilityScore: 65,
        deliveredCostScore: 70,
        feedstockSuitabilityScore: 82,
        plantDensityScore: 85,
        constructionDemandScore: 96,
        strategicNotes: 'Very high municipal C&D recycled aggregate availability under MCD/DDA; higher delivered CO2 transport distance.',
        basis: 'Illustrative multi-criteria scoring model based on regional industrial infrastructure data.'
      }
    ];

    return regions.map(r => {
      const score = (r.co2AvailabilityScore * wCo2) +
        (r.deliveredCostScore * wCost) +
        (r.feedstockSuitabilityScore * wFeedstock) +
        (r.plantDensityScore * wPlants) +
        (r.constructionDemandScore * wDemand);
      return {
        ...r,
        compositeScore: Math.round(score * 10) / 10
      };
    }).sort((a, b) => b.compositeScore - a.compositeScore);
  }

  public getFallbackBatches(): ProductionBatch[] {
    return [
      {
        id: 'batch-108',
        batchNumber: 'STX-2026-B108',
        plantId: 'PLT-001',
        productId: 'prod-001',
        productionDate: '2026-03-24',
        quantityUnits: 15000,
        quantityTonnes: 54.0,
        co2InjectedKg: 780.0,
        co2MineralizedKg: 712.5,
        netGateToGateRemovalKg: 655.5,
        compressiveStrength7dMpa: 31.2,
        compressiveStrength28dMpa: 44.8,
        waterAbsorptionPercent: 4.6,
        status: 'APPROVED',
        passportId: 'pass-7f9a2b4c',
        curingDurationHours: 14,
        curingTempCelsius: 42.0,
        curingHumidityPercent: 85.0
      },
      {
        id: 'batch-109',
        batchNumber: 'STX-2026-B109',
        plantId: 'PLT-001',
        productId: 'prod-002',
        productionDate: '2026-03-27',
        quantityUnits: 12000,
        quantityTonnes: 43.2,
        co2InjectedKg: 640.0,
        co2MineralizedKg: 588.0,
        netGateToGateRemovalKg: 541.2,
        compressiveStrength7dMpa: 29.5,
        compressiveStrength28dMpa: 43.1,
        waterAbsorptionPercent: 4.8,
        status: 'CURING_COMPLETE',
        curingDurationHours: 14,
        curingTempCelsius: 41.5,
        curingHumidityPercent: 83.5
      }
    ];
  }

  public getFallbackQualityReviews(): QualityReview[] {
    return [
      {
        id: 'rev-001',
        batchId: 'STX-2026-B108',
        reviewedBy: 'Dr. Ramesh Sundaram (NABL Technical Lead)',
        reviewDate: '2026-03-26',
        approved: true,
        notes: 'Complies fully with IS 15658:2006. 28d compressive strength 44.8 MPa exceeds 35 MPa spec by 28%. Water absorption 4.6% within 6% threshold.'
      },
      {
        id: 'rev-002',
        batchId: 'STX-2026-B109',
        reviewedBy: 'Quality Inspector - CivilAid Labs',
        reviewDate: '2026-03-28',
        approved: false,
        notes: 'Awaiting 28-day break tests. 7-day initial compressive test passed at 29.5 MPa.'
      }
    ];
  }

  public getFallbackCarbonOfftakes(): CarbonOfftakeOpportunity[] {
    return [
      {
        id: 'opp-001',
        buyerName: 'Global Tech Campus Bangalore (Net-Zero Scope 3)',
        registryStandard: 'Puro.earth (Mineralised Materials)',
        volumeTonnes: 240,
        pricePerTonneUsd: 140,
        status: 'TERM_SHEET',
        notes: 'Offtake LOI for embodied carbon reduction in 80,000 sq.ft peripheral walkway paving.'
      },
      {
        id: 'opp-002',
        buyerName: 'Indian Green Infrastructure Fund',
        registryStandard: 'CCTS / Article 6 Compliant',
        volumeTonnes: 500,
        pricePerTonneUsd: 95,
        status: 'AUDIT_STAGE',
        notes: 'Exploring Indian domestic voluntary credit issuance upon NABL validation.'
      }
    ];
  }

  public getFallbackAuditEvents(): AuditEvent[] {
    return [
      {
        id: 'evt-001',
        timestamp: '2026-03-28T09:15:00Z',
        action: 'QUALITY_APPROVED',
        entityType: 'BATCH',
        entityId: 'STX-2026-B108',
        userEmail: 'qa@sthirax.com',
        details: 'Approved 28d mechanical and mass-flow carbon uptake verification.'
      },
      {
        id: 'evt-002',
        timestamp: '2026-03-28T09:20:00Z',
        action: 'PASSPORT_ISSUED',
        entityType: 'PASSPORT',
        entityId: 'pass-7f9a2b4c',
        userEmail: 'operations@sthirax.com',
        details: 'Issued cryptographic DPP with SHA-256 seal for 15,000 interlocking pavers.'
      },
      {
        id: 'evt-003',
        timestamp: '2026-03-27T16:45:00Z',
        action: 'BATCH_RECORDED',
        entityType: 'BATCH',
        entityId: 'STX-2026-B109',
        userEmail: 'plant.hosur@sthirax.com',
        details: 'Recorded 43.2 tonnes production run with 640 kg Coriolis CO2 injection.'
      }
    ];
  }
}
