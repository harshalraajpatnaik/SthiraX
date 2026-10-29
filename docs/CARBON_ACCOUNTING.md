# SthiraX Carbon Accounting & Lifecycle Methodology

## 1. Accounting Boundaries & Methodological Alignment

SthiraX calculates environmental impact strictly according to:
* **ISO 14064-2:2019**: Greenhouse gases — Specification with guidance at the project level for quantification, monitoring and reporting of greenhouse gas emission reductions or removal enhancements.
* **ISO 14044:2006**: Environmental management — Life cycle assessment — Requirements and guidelines.
* **Puro.earth Standard for Geologically Stored Carbon & Carbonated Building Materials (2024)**.

---

## 2. Gate-to-Gate Life Cycle Equation

The net gate-to-gate carbon removal $E_{\text{net}}$ is governed by:

$$E_{\text{net}} = M_{\text{gross}} - (E_{\text{transport}} + E_{\text{compression}} + E_{\text{curing\_aux}} + E_{\text{vent\_loss}})$$

Where:
* $M_{\text{gross}}$: Gross $CO_2$ mass permanently reacted into calcium carbonate ($CaCO_3$) crystals inside the concrete matrix, verified by Coriolis mass flow logs and post-carbonation mass balance testing.
* $E_{\text{transport}}$: Upstream road transport emissions from point-source capture facility to the precast plant via cryogenic liquid tanker.
  $$E_{\text{transport}} = D \times W_{\text{CO2}} \times EF_{\text{diesel\_tanker}}$$
  *(Where $D$ is round-trip distance in km, $EF = 0.082\text{ kg CO}_2\text{e / t-km}$ for heavy cryogenic transport in India).*
* $E_{\text{compression}}$: Electrical grid emissions associated with cryogenic liquefaction and on-site vaporisation:
  $$E_{\text{compression}} = \text{Electricity (kWh)} \times EF_{\text{grid\_CEA}}$$
  *(Where $EF_{\text{grid\_CEA}} = 0.716\text{ kg CO}_2\text{ / kWh}$ per Central Electricity Authority of India Baseline Database v19).*
* $E_{\text{curing\_aux}}$: Electrical energy for chamber blowers, fans, and sensor telemetry.
* $E_{\text{vent\_loss}}$: Residual unreacted $CO_2$ gas safely evacuated through scrubber during chamber purge cycles.

---

## 3. Strict Boundary Separation: Mineralization vs Avoided Emissions

To maintain scientific integrity and prevent greenwashing, SthiraX enforces a strict reporting taxonomy:

```
+-------------------------------------------------------------------------+
| TOTAL NET ENVIRONMENTAL BENEFIT                                          |
+------------------------------------+------------------------------------+
| A. Gate-to-Gate Net Removal (CDR)  | B. Avoided Embodied Emissions      |
| (Permanent Geochemical Fixation)   | (Binder Substitution)              |
+------------------------------------+------------------------------------+
| * Coriolis-measured CO2 uptake     | * 15-20% reduced OPC clinker       |
| * Stable CaCO3 mineral matrix      | * Substituted with fly ash/slag    |
| * > 1,000 year durability          | * Avoided calcination in kiln      |
| * Potential CDR credit eligibility | * Product Scope 3 reduction        |
| * NOT counted as avoided cement    | * NOT tradeable as removal credit  |
+------------------------------------+------------------------------------+
```

### 3.1 Additionality Justification
* Commercial precast plants in India cure concrete under ambient air or high-pressure water steam without $CO_2$ gas.
* Ambient carbonation in mature concrete occurs over decades through atmospheric diffusion and is restricted to the outer 2–5 mm surface layer.
* Accelerated early-age curing inside pressurized chambers forces deep, bulk carbonation through the entire component cross-section, forming stable dicalcium silicate and calcium carbonate phases that would never occur in baseline operations.
