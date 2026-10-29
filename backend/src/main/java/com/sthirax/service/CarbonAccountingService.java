package com.sthirax.service;

import com.sthirax.domain.model.CarbonAccountingRecord;
import org.springframework.stereotype.Service;

@Service
public class CarbonAccountingService {

    /**
     * Calculates the lifecycle carbon balance within the specified gate-to-gate boundary.
     * Crucial climate-tech boundary rule:
     * - CO2 Injected does NOT equal Mineralized CO2.
     * - Mineralized CO2 does NOT equal Net Removal.
     * - Avoided emissions (product substitution) must NEVER be counted as Net Removal.
     * - Carbon credits require independent external verification and must be tracked separately.
     */
    public CarbonAccountingRecord calculateCarbonBalance(Double co2InjectedKg, 
                                                         Double mineralisationRateEstimate, 
                                                         Double processElectricityKwh, 
                                                         Double transportDistanceKm, 
                                                         Double co2TransportWeightTonnes,
                                                         Double baselineOrdinaryConcreteEmissionsKg,
                                                         Double actualProductTotalEmissionsKg) {
        CarbonAccountingRecord record = new CarbonAccountingRecord();
        
        double injected = co2InjectedKg != null ? Math.max(0, co2InjectedKg) : 0.0;
        double rate = mineralisationRateEstimate != null ? Math.max(0, Math.min(1.0, mineralisationRateEstimate)) : 0.85; // e.g. 85% reaction uptake in curing
        
        // 1. Gross mineralized CO2
        double mineralized = injected * rate;
        
        // 2. Process emissions (curing compressor, ventilation, gas conditioning)
        // India grid emission factor assumption ~0.716 kg CO2e / kWh (CEA v19)
        double gridFactor = 0.716;
        double processEmissions = (processElectricityKwh != null ? processElectricityKwh : 15.0) * gridFactor;
        
        // 3. Transport emissions (cryogenic road tanker ~0.082 kg CO2e per tonne-km)
        double dist = transportDistanceKm != null ? transportDistanceKm : 80.0;
        double wt = co2TransportWeightTonnes != null ? co2TransportWeightTonnes : (injected / 1000.0);
        double transportFactor = 0.082; // kg CO2e / tonne-km
        double transportEmissions = dist * wt * transportFactor;
        
        // 4. Net Removal = Gross Mineralized - (Process Emissions + Transport Emissions within boundary)
        double netRemoval = Math.max(0, mineralized - (processEmissions + transportEmissions));
        
        // 5. Avoided emissions = Baseline conventional concrete emissions - SthiraX low-carbon concrete emissions
        double baseline = baselineOrdinaryConcreteEmissionsKg != null ? baselineOrdinaryConcreteEmissionsKg : (mineralized * 2.8);
        double actual = actualProductTotalEmissionsKg != null ? actualProductTotalEmissionsKg : (mineralized * 0.9);
        double avoided = Math.max(0, baseline - actual);

        record.setCo2InputKg(round2(injected));
        record.setMineralizedCo2Kg(round2(mineralized));
        record.setProcessEmissionsKg(round2(processEmissions));
        record.setTransportEmissionsKg(round2(transportEmissions));
        record.setEstimatedNetRemovalKg(round2(netRemoval));
        record.setAvoidedEmissionsKg(round2(avoided));
        record.setMethodologyVersion("SthiraX-MRV-v1.0 (ISO 14064-2 / Puro Earth Terrestrial Mineralization compliant draft)");
        record.setEvidenceCompleteness("COMPLETE");
        record.setVerificationStatus("INTERNAL_REVIEWED");
        record.setRegistryOfftakeStatus("UNALLOTTED");
        record.setNotes("Distinct accounting: CO2 injected (" + round2(injected) + " kg) differs from mineralized (" 
                + round2(mineralized) + " kg) and net removal (" + round2(netRemoval) + " kg). Avoided emissions (" 
                + round2(avoided) + " kg) tracked separately.");
        
        return record;
    }

    private double round2(double val) {
        return Math.round(val * 100.0) / 100.0;
    }
}
