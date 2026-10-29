package com.sthirax.service;

import com.sthirax.domain.model.CostModel;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class CostCalculationService {

    private static final int SCALE = 4;
    private static final int CURRENCY_SCALE = 2;

    /**
     * Calculates the complete financial model according to SthiraX engineering rules.
     * All financial operations use BigDecimal with explicit RoundingMode to prevent floating point inaccuracies.
     */
    public CostModel calculate(CostModel input) {
        if (input == null) {
            throw new IllegalArgumentException("Cost model input cannot be null");
        }

        double annualCapacity = input.getAnnualCapacityTonnes() != null ? Math.max(0, input.getAnnualCapacityTonnes()) : 0.0;
        double utilisation = input.getExpectedUtilisationRate() != null ? Math.max(0, Math.min(1.0, input.getExpectedUtilisationRate())) : 0.75;
        double rejection = input.getRejectionRate() != null ? Math.max(0, Math.min(1.0, input.getRejectionRate())) : 0.03;

        // Gross production = annual capacity * utilisation
        double grossOutputTonnes = annualCapacity * utilisation;
        // Saleable output = gross output * (1 - rejection rate)
        double saleableOutputTonnes = grossOutputTonnes * (1.0 - rejection);
        input.setEffectiveSaleableOutputTonnes(saleableOutputTonnes);

        BigDecimal rawMaterialCost = defaultZero(input.getRawMaterialCostPerTonneInr());
        BigDecimal co2Cost = defaultZero(input.getCo2CostPerTonneInr());
        BigDecimal co2TransportCost = defaultZero(input.getCo2TransportCostPerTonneInr());
        BigDecimal energyCost = defaultZero(input.getEnergyCostPerTonneInr());
        BigDecimal laborCost = defaultZero(input.getLaborCostPerTonneInr());
        BigDecimal maintenanceCost = defaultZero(input.getMaintenanceCostPerTonneInr());
        BigDecimal qualityCost = defaultZero(input.getQualityTestingCostPerTonneInr());
        BigDecimal overheadCost = defaultZero(input.getOverheadCostPerTonneInr());

        // Variable cost per gross tonne
        BigDecimal variableCostPerGrossTonne = rawMaterialCost
                .add(co2Cost)
                .add(co2TransportCost)
                .add(energyCost)
                .add(laborCost)
                .add(maintenanceCost)
                .add(qualityCost)
                .add(overheadCost);

        // Account for rejection loss: Cost per saleable tonne = Variable cost per gross tonne / (1 - rejection)
        BigDecimal yieldFactor = BigDecimal.valueOf(Math.max(0.01, 1.0 - rejection));
        BigDecimal effectiveVariableCostPerSaleableTonne = variableCostPerGrossTonne.divide(yieldFactor, CURRENCY_SCALE, RoundingMode.HALF_UP);

        // Fixed annual costs: equipment lease per year (if leasing)
        BigDecimal annualLease = defaultZero(input.getEquipmentLeasePerYearInr());
        BigDecimal fixedCostPerTonne = BigDecimal.ZERO;
        if (saleableOutputTonnes > 0 && annualLease.compareTo(BigDecimal.ZERO) > 0) {
            fixedCostPerTonne = annualLease.divide(BigDecimal.valueOf(saleableOutputTonnes), CURRENCY_SCALE, RoundingMode.HALF_UP);
        }

        BigDecimal totalCostPerTonne = effectiveVariableCostPerSaleableTonne.add(fixedCostPerTonne);
        input.setTotalCostPerTonneInr(totalCostPerTonne);

        BigDecimal sellingPrice = defaultZero(input.getSthiraxSellingPriceInr());

        // Contribution per tonne = Selling Price - Total Variable Cost per saleable tonne
        BigDecimal contributionPerTonne = sellingPrice.subtract(effectiveVariableCostPerSaleableTonne);
        input.setContributionMarginPerTonneInr(contributionPerTonne);

        // Contribution margin percentage = (Contribution / Selling Price) * 100
        BigDecimal marginPercent = BigDecimal.ZERO;
        if (sellingPrice.compareTo(BigDecimal.ZERO) > 0) {
            marginPercent = contributionPerTonne
                    .multiply(BigDecimal.valueOf(100))
                    .divide(sellingPrice, CURRENCY_SCALE, RoundingMode.HALF_UP);
        }
        input.setContributionMarginPercent(marginPercent);

        // Annual operating contribution = Contribution per tonne * saleable output - annual fixed lease
        BigDecimal annualContributionGross = contributionPerTonne.multiply(BigDecimal.valueOf(saleableOutputTonnes));
        BigDecimal annualNetContribution = annualContributionGross.subtract(annualLease);
        input.setAnnualOperatingContributionInr(annualNetContribution.setScale(CURRENCY_SCALE, RoundingMode.HALF_UP));

        // Break-even volume = Fixed annual cost / Contribution per tonne
        double breakEvenVolume = 0.0;
        if (contributionPerTonne.compareTo(BigDecimal.ZERO) > 0 && annualLease.compareTo(BigDecimal.ZERO) > 0) {
            breakEvenVolume = annualLease.divide(contributionPerTonne, CURRENCY_SCALE, RoundingMode.HALF_UP).doubleValue();
        }
        input.setBreakEvenVolumeTonnes(breakEvenVolume);

        // Approximate payback period = Initial Investment / Annual Operating Contribution (when positive)
        BigDecimal initialCapex = defaultZero(input.getInitialInvestmentInr());
        double paybackYears = 0.0;
        if (initialCapex.compareTo(BigDecimal.ZERO) > 0 && annualNetContribution.compareTo(BigDecimal.ZERO) > 0) {
            paybackYears = initialCapex.divide(annualNetContribution, 2, RoundingMode.HALF_UP).doubleValue();
        }
        input.setApproximatePaybackYears(paybackYears);

        return input;
    }

    private BigDecimal defaultZero(BigDecimal val) {
        return val != null ? val : BigDecimal.ZERO;
    }
}
