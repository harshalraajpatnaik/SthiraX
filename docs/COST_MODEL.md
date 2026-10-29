# SthiraX Financial Architecture & Unit Economics

## 1. Core Operating Philosophy

The foundational commercial tenet of SthiraX is:
> **The precast manufacturing business must be viable and profitable on physical product sales alone, with zero dependence on carbon credit or removal offtake revenue.**

Carbon removal credits (via voluntary registries like Puro.earth or compliance systems like CCTS) represent non-guaranteed upside.

---

## 2. Mathematical Formulations

### 2.1 Effective Saleable Output
Given plant annual capacity $C$ (tonnes), expected utilization factor $U \in [0, 1]$, and quality defect/rejection rate $R \in [0, 1]$:

$$\text{Effective Saleable Tonnes} = C \times U \times (1 - R)$$

### 2.2 Per-Tonne Cost Stack
Let:
* $C_{\text{raw}}$: Binder and aggregate raw materials (incorporating 15–20% cement reduction via mineralized fly ash/slag activation).
* $C_{\text{CO2}}$: Delivered liquid $CO_2$ price per tonne of gas multiplied by specific uptake per tonne of finished block.
* $C_{\text{energy}}$: Electricity for chamber blowers, vaporizers, and telemetry.
* $C_{\text{labor}}$: Direct plant handling and mould demoulding.
* $C_{\text{royalty}}$: SthiraX technology license, MRV telemetry, and digital passport issuance fee.

$$\text{Total Cost Per Tonne} = C_{\text{raw}} + C_{\text{CO2}} + C_{\text{energy}} + C_{\text{labor}} + C_{\text{royalty}}$$

### 2.3 Unit Contribution Margin & Payback
With realized ex-factory selling price $P$:

$$\text{Margin Per Tonne} = P - \text{Total Cost Per Tonne}$$

$$\text{Contribution Margin \%} = \frac{\text{Margin Per Tonne}}{P} \times 100$$

$$\text{Annual Operating Contribution} = \text{Margin Per Tonne} \times \text{Effective Saleable Tonnes}$$

For modular curing chamber retrofit capex $I_{\text{initial}}$:

$$\text{Payback Period (Years)} = \frac{I_{\text{initial}}}{\text{Annual Operating Contribution}}$$

$$\text{Break-Even Volume (Tonnes)} = \frac{\text{Fixed Overhead Annual Costs}}{\text{Margin Per Tonne}}$$

---

## 3. Benchmark Unit Economics Stack (Hosur Model)

| Cost Component | Conventional OPC Paver (M-35) | SthiraX Mineralized Paver (M-35) | Difference & Driver |
| :--- | :--- | :--- | :--- |
| **Cement Binder** | ₹ 1,480 / t | ₹ 1,220 / t | -₹ 260 / t (17.5% OPC reduction) |
| **Aggregates & Sand** | ₹ 620 / t | ₹ 600 / t | Recycled aggregate compatibility |
| **CO₂ Gas Delivered** | ₹ 0 / t | ₹ 240 / t | 30 kg CO₂ @ ₹8,000 / t delivered |
| **Energy & Steam** | ₹ 220 / t | ₹ 180 / t | Elimination of 14-day steam curing |
| **Labor & Overhead** | ₹ 400 / t | ₹ 400 / t | Parity |
| **SthiraX License Fee** | ₹ 0 / t | ₹ 180 / t | Platform MRV & trace certification |
| **Depreciation** | ₹ 400 / t | ₹ 420 / t | Amortization of ₹35L retrofit chamber |
| **Total Production Cost** | **₹ 3,120 / t** | **₹ 3,240 / t** | +₹ 120 / t gross manufacturing cost |
| **Ex-Factory Price** | **₹ 3,450 / t** | **₹ 3,650 / t** | +₹ 200 / t green procurement premium |
| **Net EBITDA Margin** | **₹ 330 / t (9.5%)** | **₹ 410 / t (11.2%)** | **+₹ 80 / t higher net margin** |

---

## 4. Retrofit Capital Expenditure & Payback

* **Modular Curing Chamber Retrofit Capex**: ₹ 35,00,000 ($35 Lakhs INR).
  * Gas-tight insulated panel enclosure ($120\text{ m}^3$).
  * Automated pneumatically controlled gas manifold and vent valves.
  * Coriolis mass flow meter (Emerson CMF025).
  * High-precision humidity, temperature, and $CO_2$ sensor suite.
  * Edge telemetry PLC gateway with cellular upload.
* **Annual Output (at 75% utilization of 18,000 t capacity)**: $13,365\text{ tonnes}$.
* **Annual Net Contribution Increase**: $13,365\text{ t} \times ₹ 410\text{ / t} = ₹ 54,79,650$.
* **Simple Capex Payback**: $\mathbf{7.7\text{ months}}$ (or $10.2\text{ months}$ assuming zero green price premium).
