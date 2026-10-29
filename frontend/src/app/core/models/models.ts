export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  application: string;
  dimensions: string;
  unit: string;
  specificationStatus: string;
  compressiveStrengthTarget: string;
  co2UptakeTarget: string;
  availableFormulations: string[];
  documentationUrl?: string;
  qualityTestStatus: string;
  indicativePriceInr: number;
  priceBasis: string;
  availabilityStatus: string;
  description: string;
}

export interface EnquiryRequest {
  contactName: string;
  email: string;
  phone?: string;
  companyName?: string;
  type?: string;
  productId?: string;
  productName?: string;
  quantity?: number;
  unit?: string;
  deliveryPincode?: string;
  expectedDate?: string;
  notes?: string;
}

export interface PartnerApplicationRequest {
  applicantRole: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  facilityLocation?: string;
  facilityPincode?: string;
  manufacturedProducts?: string[];
  monthlyCapacityTPA?: number;
  currentFeedstocks?: string;
  curingMethod?: string;
  co2SourceType?: string;
  availableCo2TonnesPerMonth?: number;
  co2PurityEstimate?: string;
  logisticsCapabilities?: string;
}

export interface ProductPassport {
  id: string;
  passportId?: string;
  batchId: string;
  batchNumber: string;
  productName: string;
  productCategory: string;
  plantLocation?: string;
  plantName?: string;
  productionDate: string;
  publicationStatus: string;
  verificationStatus: string;
  reviewerRole: string;
  totalOutputUnits: number;
  outputUnit: string;
  co2InjectedKg: number;
  mineralizedCo2Kg: number;
  co2MineralizedKg?: number;
  netGateToGateRemovalKg?: number;
  testingLaboratory?: string;
  publiclyScannable?: boolean;
  issueDate?: string;
  verificationHash?: string;
  measurementMethodology: string;
  bisStandardReference: string;
  testedStrengthMpa: number;
  verifiedRecycledFeedstocks: string[];
  qrCodePayload: string;
  disclaimer: string;
  publishedAt: string;
}

export interface Plant {
  id: string;
  name: string;
  location: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  capacityTonnesPerMonth?: number;
  chamberVolumeM3?: number;
  curingEnclosureType?: string;
  curingSource?: string;
  co2StorageCapacityKg?: number;
  status: string;
}

export interface ProductionBatch {
  id: string;
  batchNumber: string;
  plantId: string;
  productId: string;
  productionDate: string;
  quantityUnits: number;
  quantityTonnes: number;
  co2InjectedKg: number;
  co2MineralizedKg: number;
  netGateToGateRemovalKg?: number;
  compressiveStrength7dMpa?: number;
  compressiveStrength28dMpa?: number;
  waterAbsorptionPercent?: number;
  status: 'IN_PRODUCTION' | 'CURING_ACTIVE' | 'CURING_COMPLETE' | 'QA_PENDING' | 'APPROVED' | 'DISPATCHED';
  passportId?: string;
  curingDurationHours?: number;
  curingTempCelsius?: number;
  curingHumidityPercent?: number;
}

export interface QualityReview {
  id: string;
  batchId: string;
  reviewedBy: string;
  reviewDate: string;
  approved: boolean;
  notes: string;
}

export interface CarbonOfftakeOpportunity {
  id: string;
  buyerName: string;
  registryStandard: string;
  volumeTonnes: number;
  pricePerTonneUsd: number;
  status: string;
  notes?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  action: string;
  entityType: string;
  entityId: string;
  userEmail: string;
  details: string;
}

export interface RegulatoryDocument {
  id: string;
  title: string;
  issuingAuthority: string;
  category: string;
  documentNumber: string;
  effectiveDate: string;
  officialSourceUrl: string;
  summary: string;
  relevanceToSthirax: string;
  reviewStatus: string;
  lastReviewedDate: string;
  keyClauses: string;
}

export interface RoadmapMilestone {
  id: string;
  orderIndex: number;
  phaseName: string;
  objective: string;
  plannedTimeline: string;
  status: string;
  dependencies: string;
  responsibleLead: string;
  estimatedCostMinInr: number;
  estimatedCostMaxInr: number;
  costAssumptions: string;
  deliverables: string[];
  keyRisks: string[];
  completionEvidence: string;
}

export interface CostModel {
  id?: string;
  referenceType?: string;
  name: string;
  initialInvestmentInr: number;
  annualCapacityTonnes: number;
  expectedUtilisationRate: number;
  conventionalSellingPriceInr: number;
  sthiraxSellingPriceInr: number;
  rawMaterialCostPerTonneInr: number;
  co2CostPerTonneInr: number;
  co2TransportCostPerTonneInr: number;
  energyCostPerTonneInr: number;
  laborCostPerTonneInr: number;
  maintenanceCostPerTonneInr: number;
  qualityTestingCostPerTonneInr: number;
  equipmentLeasePerYearInr: number;
  overheadCostPerTonneInr: number;
  rejectionRate: number;
  
  effectiveSaleableOutputTonnes?: number;
  totalCostPerTonneInr?: number;
  contributionMarginPerTonneInr?: number;
  contributionMarginPercent?: number;
  annualOperatingContributionInr?: number;
  breakEvenVolumeTonnes?: number;
  approximatePaybackYears?: number;
}

export interface RegionalFeasibility {
  regionName: string;
  state: string;
  co2AvailabilityScore: number;
  deliveredCostScore: number;
  feedstockSuitabilityScore: number;
  plantDensityScore: number;
  constructionDemandScore: number;
  compositeScore: number;
  strategicNotes: string;
  basis: string;
}

export interface UserSession {
  token: string;
  userId: string;
  email: string;
  fullName: string;
  organisationId: string;
  organisationName: string;
  roles: string[];
}
