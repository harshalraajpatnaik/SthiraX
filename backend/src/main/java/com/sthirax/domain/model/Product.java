package com.sthirax.domain.model;

import java.math.BigDecimal;
import java.util.List;

public class Product {
    private String id;
    private String slug;
    private String name;
    private String category; // PAVER, KERBSTONE, MASONRY_BLOCK, DRAIN_COVER
    private String application;
    private String dimensions;
    private String unit; // m2, piece, tonne
    private String specificationStatus; // "Under Validation", "Pilot Formulation", "Validated"
    private String compressiveStrengthTarget; // e.g., "M30-M40 equivalent"
    private String co2UptakeTarget; // e.g., "5 - 12% by binder weight (estimated)"
    private List<String> availableFormulations;
    private String documentationUrl;
    private String qualityTestStatus;
    private BigDecimal indicativePriceInr;
    private String priceBasis;
    private String availabilityStatus; // "In Pilot Trials", "Commercial Order on Request", "Under Lab Testing"
    private String description;

    public Product() {}

    public Product(String id, String slug, String name, String category, String application, String dimensions, 
                   String unit, String specificationStatus, String compressiveStrengthTarget, String co2UptakeTarget, 
                   List<String> availableFormulations, String qualityTestStatus, BigDecimal indicativePriceInr, 
                   String priceBasis, String availabilityStatus, String description) {
        this.id = id;
        this.slug = slug;
        this.name = name;
        this.category = category;
        this.application = application;
        this.dimensions = dimensions;
        this.unit = unit;
        this.specificationStatus = specificationStatus;
        this.compressiveStrengthTarget = compressiveStrengthTarget;
        this.co2UptakeTarget = co2UptakeTarget;
        this.availableFormulations = availableFormulations;
        this.qualityTestStatus = qualityTestStatus;
        this.indicativePriceInr = indicativePriceInr;
        this.priceBasis = priceBasis;
        this.availabilityStatus = availabilityStatus;
        this.description = description;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getApplication() { return application; }
    public void setApplication(String application) { this.application = application; }
    public String getDimensions() { return dimensions; }
    public void setDimensions(String dimensions) { this.dimensions = dimensions; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public String getSpecificationStatus() { return specificationStatus; }
    public void setSpecificationStatus(String specificationStatus) { this.specificationStatus = specificationStatus; }
    public String getCompressiveStrengthTarget() { return compressiveStrengthTarget; }
    public void setCompressiveStrengthTarget(String compressiveStrengthTarget) { this.compressiveStrengthTarget = compressiveStrengthTarget; }
    public String getCo2UptakeTarget() { return co2UptakeTarget; }
    public void setCo2UptakeTarget(String co2UptakeTarget) { this.co2UptakeTarget = co2UptakeTarget; }
    public List<String> getAvailableFormulations() { return availableFormulations; }
    public void setAvailableFormulations(List<String> availableFormulations) { this.availableFormulations = availableFormulations; }
    public String getDocumentationUrl() { return documentationUrl; }
    public void setDocumentationUrl(String documentationUrl) { this.documentationUrl = documentationUrl; }
    public String getQualityTestStatus() { return qualityTestStatus; }
    public void setQualityTestStatus(String qualityTestStatus) { this.qualityTestStatus = qualityTestStatus; }
    public BigDecimal getIndicativePriceInr() { return indicativePriceInr; }
    public void setIndicativePriceInr(BigDecimal indicativePriceInr) { this.indicativePriceInr = indicativePriceInr; }
    public String getPriceBasis() { return priceBasis; }
    public void setPriceBasis(String priceBasis) { this.priceBasis = priceBasis; }
    public String getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
