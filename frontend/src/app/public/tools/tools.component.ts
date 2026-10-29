import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { CostModel, RegionalFeasibility } from '../../core/models/models';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="page-tools">
      <header class="page-header">
        <div class="container">
          <span class="section-tag">Engineering & Financial Decision Support</span>
          <h1 class="page-title">Operational Calculators & Feasibility Models</h1>
          <p class="page-subtitle">
            Interactive analytical tools designed to evaluate precast plant retrofit unit economics, full value-chain order cost breakdowns, and regional industrial launch feasibility.
          </p>
        </div>
      </header>

      <div class="container tools-container">
        <!-- Tool Tabs Navigation -->
        <div class="tool-tabs">
          <button class="tab-btn" [class.active]="activeTab === 'RETROFIT'" (click)="activeTab = 'RETROFIT'">
            1. Retrofit Profitability Calculator
          </button>
          <button class="tab-btn" [class.active]="activeTab === 'ORDER_COST'" (click)="activeTab = 'ORDER_COST'">
            2. Value-Chain Order Cost Estimator
          </button>
          <button class="tab-btn" [class.active]="activeTab === 'FEASIBILITY'" (click)="activeTab = 'FEASIBILITY'">
            3. Regional Feasibility Scoring
          </button>
        </div>

        <!-- TOOL 1: RETROFIT PROFITABILITY CALCULATOR -->
        <div class="tool-pane" *ngIf="activeTab === 'RETROFIT'">
          <div class="pane-intro">
            <h2>Precast Plant CO₂ Curing Retrofit Financial Model</h2>
            <p>
              Models the unit economics and payback period for retrofitting an existing precast plant with SthiraX accelerated CO₂ curing skids. Compares owned capital expenditure vs equipment leasing scenarios.
            </p>
            <div class="disclaimer-chip">
              <span>Notice: All outputs are deterministic engineering estimates based on user-supplied assumptions, not commercial guarantees.</span>
            </div>
          </div>

          <div class="tool-grid">
            <!-- Inputs Panel -->
            <div class="inputs-panel card">
              <h3>Operating & Cost Assumptions</h3>

              <div class="form-section">
                <span class="f-sub">Plant Capacity & Utilization</span>
                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Annual Plant Capacity (Tonnes)</label>
                    <input type="number" [(ngModel)]="costModel.annualCapacityTonnes" (input)="recalculateRetrofit()" class="form-control">
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">Utilization Rate (%)</label>
                    <input type="number" [(ngModel)]="costModelUtilisationPct" (input)="onUtilisationChange()" class="form-control" step="5" min="10" max="100">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Rejection / Scrap Rate (%)</label>
                    <input type="number" [(ngModel)]="costModelRejectionPct" (input)="onRejectionChange()" class="form-control" step="0.5" min="0" max="20">
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">Conventional Product Price (&#8377;/tonne)</label>
                    <input type="number" [(ngModel)]="costModel.conventionalSellingPriceInr" (input)="recalculateRetrofit()" class="form-control">
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Proposed SthiraX Selling Price (&#8377;/tonne)</label>
                  <input type="number" [(ngModel)]="costModel.sthiraxSellingPriceInr" (input)="recalculateRetrofit()" class="form-control">
                  <span class="form-hint">Reflects parity or modest green premium with C&D recycled content advantage.</span>
                </div>
              </div>

              <div class="form-section">
                <span class="f-sub">Variable Production Costs (&#8377; / gross tonne)</span>
                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Raw Materials (SCM / C&D)</label>
                    <input type="number" [(ngModel)]="costModel.rawMaterialCostPerTonneInr" (input)="recalculateRetrofit()" class="form-control">
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">CO₂ Sourcing Cost</label>
                    <input type="number" [(ngModel)]="costModel.co2CostPerTonneInr" (input)="recalculateRetrofit()" class="form-control">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">CO₂ Road Transport</label>
                    <input type="number" [(ngModel)]="costModel.co2TransportCostPerTonneInr" (input)="recalculateRetrofit()" class="form-control">
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">Energy & Electricity</label>
                    <input type="number" [(ngModel)]="costModel.energyCostPerTonneInr" (input)="recalculateRetrofit()" class="form-control">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Labor Cost</label>
                    <input type="number" [(ngModel)]="costModel.laborCostPerTonneInr" (input)="recalculateRetrofit()" class="form-control">
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">Maintenance & Spares</label>
                    <input type="number" [(ngModel)]="costModel.maintenanceCostPerTonneInr" (input)="recalculateRetrofit()" class="form-control">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Quality Testing & MRV</label>
                    <input type="number" [(ngModel)]="costModel.qualityTestingCostPerTonneInr" (input)="recalculateRetrofit()" class="form-control">
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">Plant Overheads</label>
                    <input type="number" [(ngModel)]="costModel.overheadCostPerTonneInr" (input)="recalculateRetrofit()" class="form-control">
                  </div>
                </div>
              </div>

              <div class="form-section">
                <span class="f-sub">Hardware Financing Scenario (Owned CaPex vs Lease)</span>
                <div class="form-row">
                  <div class="form-group form-col">
                    <label class="form-label">Initial Retrofit CaPex (&#8377;)</label>
                    <input type="number" [(ngModel)]="costModel.initialInvestmentInr" (input)="recalculateRetrofit()" class="form-control">
                  </div>
                  <div class="form-group form-col">
                    <label class="form-label">Or Annual Equipment Lease (&#8377;)</label>
                    <input type="number" [(ngModel)]="costModel.equipmentLeasePerYearInr" (input)="recalculateRetrofit()" class="form-control">
                  </div>
                </div>
                <span class="form-hint">Set lease to 0 for owned capex, or capex to 0 for pure leasing.</span>
              </div>
            </div>

            <!-- Calculated Outputs Panel -->
            <div class="outputs-panel">
              <div class="card result-card">
                <h3>Calculated Unit Economics</h3>

                <div class="kpi-grid">
                  <div class="kpi-box">
                    <span class="kpi-label">Saleable Output</span>
                    <span class="kpi-value">{{ costModel.effectiveSaleableOutputTonnes | number:'1.0-0' }} T</span>
                    <small>Net of {{ costModelRejectionPct }}% scrap loss</small>
                  </div>
                  <div class="kpi-box">
                    <span class="kpi-label">Total Cost / Saleable Tonne</span>
                    <span class="kpi-value">&#8377;{{ costModel.totalCostPerTonneInr | number:'1.2-2' }}</span>
                    <small>All variable + fixed allocations</small>
                  </div>
                  <div class="kpi-box highlight">
                    <span class="kpi-label">Contribution / Tonne</span>
                    <span class="kpi-value">&#8377;{{ costModel.contributionMarginPerTonneInr | number:'1.2-2' }}</span>
                    <small>Selling Price &minus; Variable Cost</small>
                  </div>
                  <div class="kpi-box highlight">
                    <span class="kpi-label">Contribution Margin</span>
                    <span class="kpi-value">{{ costModel.contributionMarginPercent | number:'1.1-1' }}%</span>
                    <small>Margin percentage</small>
                  </div>
                </div>

                <div class="secondary-results">
                  <div class="sec-row">
                    <span>Annual Net Operating Contribution:</span>
                    <strong>&#8377;{{ costModel.annualOperatingContributionInr | number:'1.0-0' }}</strong>
                  </div>
                  <div class="sec-row">
                    <span>Break-even Volume:</span>
                    <strong>{{ costModel.breakEvenVolumeTonnes | number:'1.0-0' }} Tonnes/year</strong>
                  </div>
                  <div class="sec-row" *ngIf="costModel.initialInvestmentInr > 0">
                    <span>Approximate Simple Payback Period:</span>
                    <strong class="accent">{{ costModel.approximatePaybackYears | number:'1.1-1' }} Years</strong>
                  </div>
                </div>

                <div class="formula-doc">
                  <h4>Documented Mathematical Formulas:</h4>
                  <ul>
                    <li><code>Saleable Output = Gross Output &times; (1 &minus; Rejection Rate)</code></li>
                    <li><code>Effective Variable Cost/Tonne = &sum; Variable Costs &divide; (1 &minus; Rejection Rate)</code></li>
                    <li><code>Contribution/Tonne = Selling Price &minus; Effective Variable Cost/Tonne</code></li>
                    <li><code>Contribution Margin % = (Contribution &divide; Selling Price) &times; 100</code></li>
                    <li><code>Payback Period = Initial CaPex &divide; Annual Net Operating Contribution</code></li>
                  </ul>
                  <small>Note: Payback calculation uses undiscounted annual cash flow; excludes debt financing costs or tax depreciation schedules.</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TOOL 2: VALUE CHAIN ORDER COST ESTIMATOR -->
        <div class="tool-pane" *ngIf="activeTab === 'ORDER_COST'">
          <div class="pane-intro">
            <h2>Value Chain Order Cost Estimator</h2>
            <p>
              Break down the end-to-end costs of fulfilling a commercial precast delivery order from raw CO₂ procurement to customer job-site unloading.
            </p>
          </div>

          <div class="tool-grid">
            <div class="inputs-panel card">
              <h3>Order Parameters</h3>
              <div class="form-group">
                <label class="form-label">Order Quantity (Square Meters)</label>
                <input type="number" [(ngModel)]="orderQuantityM2" (input)="recalculateOrderCost()" class="form-control">
              </div>

              <div class="form-group">
                <label class="form-label">Target Selling Price (&#8377; / m²)</label>
                <input type="number" [(ngModel)]="orderPricePerM2" (input)="recalculateOrderCost()" class="form-control">
              </div>

              <div class="form-group">
                <label class="form-label">CO₂ Tanker Transport Distance (km)</label>
                <input type="number" [(ngModel)]="orderCo2DistanceKm" (input)="recalculateOrderCost()" class="form-control">
              </div>

              <div class="form-group">
                <label class="form-label">Finished Product Delivery Distance (km)</label>
                <input type="number" [(ngModel)]="orderProductDistanceKm" (input)="recalculateOrderCost()" class="form-control">
              </div>
            </div>

            <div class="outputs-panel">
              <div class="card result-card">
                <h3>Value Chain Cost Breakdown</h3>

                <div class="breakdown-list">
                  <div class="b-row" *ngFor="let item of orderCostBreakdown">
                    <div class="b-left">
                      <strong>{{ item.stage }}</strong>
                      <small>{{ item.basis }}</small>
                    </div>
                    <div class="b-right">
                      <span class="b-amt">&#8377;{{ item.totalInr | number:'1.0-0' }}</span>
                      <span class="b-unit">&#8377;{{ item.perUnitInr | number:'1.2-2' }}/m²</span>
                    </div>
                  </div>
                </div>

                <div class="order-summary-box">
                  <div class="sum-row">
                    <span>Total Order Cost:</span>
                    <strong>&#8377;{{ orderTotalCostInr | number:'1.0-0' }}</strong>
                  </div>
                  <div class="sum-row">
                    <span>Total Order Revenue:</span>
                    <strong>&#8377;{{ orderTotalRevenueInr | number:'1.0-0' }}</strong>
                  </div>
                  <div class="sum-row highlight-sum">
                    <span>Gross Contribution:</span>
                    <strong class="accent">&#8377;{{ orderContributionInr | number:'1.0-0' }} ({{ orderMarginPct | number:'1.1-1' }}%)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TOOL 3: REGIONAL FEASIBILITY COMPARISON -->
        <div class="tool-pane" *ngIf="activeTab === 'FEASIBILITY'">
          <div class="pane-intro">
            <h2>Multi-Criteria Regional Feasibility Model</h2>
            <p>
              Compare potential geographic launch clusters across India by adjusting criteria weighting. Shows composite rankings based on CO₂ supply density, delivered logistics tariffs, slag/SCM feedstock availability, and municipal construction demand.
            </p>
          </div>

          <!-- Weight Adjustment Controls -->
          <div class="card weights-card">
            <h3>Adjust Criteria Weights</h3>
            <div class="weights-grid">
              <div class="weight-control">
                <label>CO₂ Availability: {{ (weightCo2 * 100) | number:'1.0-0' }}%</label>
                <input type="range" [(ngModel)]="weightCo2" (input)="recalculateFeasibility()" min="0.05" max="0.50" step="0.05">
              </div>
              <div class="weight-control">
                <label>Delivered Cost: {{ (weightCost * 100) | number:'1.0-0' }}%</label>
                <input type="range" [(ngModel)]="weightCost" (input)="recalculateFeasibility()" min="0.05" max="0.50" step="0.05">
              </div>
              <div class="weight-control">
                <label>Feedstock Proximity: {{ (weightFeedstock * 100) | number:'1.0-0' }}%</label>
                <input type="range" [(ngModel)]="weightFeedstock" (input)="recalculateFeasibility()" min="0.05" max="0.50" step="0.05">
              </div>
              <div class="weight-control">
                <label>Precast Density: {{ (weightPlants * 100) | number:'1.0-0' }}%</label>
                <input type="range" [(ngModel)]="weightPlants" (input)="recalculateFeasibility()" min="0.05" max="0.50" step="0.05">
              </div>
              <div class="weight-control">
                <label>Construction Demand: {{ (weightDemand * 100) | number:'1.0-0' }}%</label>
                <input type="range" [(ngModel)]="weightDemand" (input)="recalculateFeasibility()" min="0.05" max="0.50" step="0.05">
              </div>
            </div>
            <small class="weights-note">Weights automatically normalize to 100% during composite calculation.</small>
          </div>

          <!-- Ranking Table -->
          <div class="card ranking-card">
            <h3>Regional Corridor Rankings</h3>
            <div class="table-responsive">
              <table class="feasibility-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Industrial Corridor</th>
                    <th>State</th>
                    <th>CO₂ Score</th>
                    <th>Cost Score</th>
                    <th>Feedstock</th>
                    <th>Plants</th>
                    <th>Demand</th>
                    <th>Composite Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let r of feasibilityRankings; let i = index" [class.top-rank]="i === 0">
                    <td><span class="rank-badge">#{{ i + 1 }}</span></td>
                    <td>
                      <strong>{{ r.regionName }}</strong>
                      <small class="r-notes">{{ r.strategicNotes }}</small>
                    </td>
                    <td>{{ r.state }}</td>
                    <td>{{ r.co2AvailabilityScore }}</td>
                    <td>{{ r.deliveredCostScore }}</td>
                    <td>{{ r.feedstockSuitabilityScore }}</td>
                    <td>{{ r.plantDensityScore }}</td>
                    <td>{{ r.constructionDemandScore }}</td>
                    <td><strong class="score-highlight">{{ r.compositeScore }}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      background: #ffffff;
      border-bottom: 1px solid var(--color-border-subtle);
      padding: 4rem 0 3rem;
    }
    .page-title {
      font-size: 2.3rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.75rem;
      color: var(--color-text-main);
    }
    .page-subtitle {
      font-size: 1.05rem;
      color: var(--color-text-muted);
      max-width: 800px;
      line-height: 1.6;
    }
    .tools-container {
      padding-top: 2.5rem;
      padding-bottom: 5rem;
    }
    .tool-tabs {
      display: flex;
      gap: 0.5rem;
      border-bottom: 1px solid var(--color-border-subtle);
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
    }
    .tab-btn {
      padding: 0.85rem 1.5rem;
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--color-text-muted);
      border-bottom: 2px solid transparent;
      transition: all 0.15s ease;
    }
    .tab-btn:hover {
      color: var(--color-text-main);
    }
    .tab-btn.active {
      color: var(--color-accent);
      border-bottom-color: var(--color-accent);
    }
    .pane-intro {
      margin-bottom: 2rem;
    }
    .pane-intro h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.4rem;
    }
    .pane-intro p {
      font-size: 0.95rem;
      color: var(--color-text-muted);
      line-height: 1.55;
      margin-bottom: 0.75rem;
    }
    .disclaimer-chip {
      font-size: 0.78rem;
      color: var(--color-status-warning);
      background: var(--color-status-warning-bg);
      border: 1px solid rgba(158, 100, 6, 0.2);
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-sm);
      display: inline-block;
    }
    .tool-grid {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      gap: 2.5rem;
      align-items: start;
    }
    .inputs-panel h3, .result-card h3 {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 1.25rem;
    }
    .form-section {
      margin-bottom: 1.5rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--color-border-subtle);
    }
    .f-sub {
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--color-accent);
      display: block;
      margin-bottom: 0.75rem;
    }
    .form-row {
      display: flex;
      gap: 1rem;
    }
    .form-col {
      flex: 1;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .kpi-box {
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-sm);
      padding: 1rem;
      display: flex;
      flex-direction: column;
    }
    .kpi-box.highlight {
      background: var(--color-accent-subtle);
      border-color: var(--color-accent-border);
    }
    .kpi-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-subtle);
      margin-bottom: 0.25rem;
    }
    .kpi-value {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--color-text-main);
      line-height: 1.2;
    }
    .kpi-box.highlight .kpi-value {
      color: var(--color-accent);
    }
    .kpi-box small {
      font-size: 0.7rem;
      color: var(--color-text-muted);
      margin-top: 0.25rem;
    }
    .secondary-results {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-sm);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      font-size: 0.86rem;
      margin-bottom: 1.5rem;
    }
    .sec-row {
      display: flex;
      justify-content: space-between;
      color: var(--color-text-muted);
    }
    .sec-row strong {
      color: var(--color-text-main);
    }
    .sec-row strong.accent {
      color: var(--color-accent);
      font-size: 1.05rem;
    }
    .formula-doc {
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-sm);
      padding: 1rem;
      font-size: 0.8rem;
    }
    .formula-doc h4 {
      font-size: 0.82rem;
      color: var(--color-text-subtle);
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .formula-doc ul {
      padding-left: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      margin-bottom: 0.75rem;
      color: var(--color-text-muted);
    }
    .formula-doc code {
      font-family: var(--font-mono);
      color: var(--color-text-main);
      background: #ffffff;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .formula-doc small {
      color: var(--color-text-subtle);
      font-style: italic;
    }
    .breakdown-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    .b-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--color-bg-base);
      padding: 0.75rem 1rem;
      border-radius: var(--radius-sm);
    }
    .b-left strong {
      display: block;
      font-size: 0.88rem;
      color: var(--color-text-main);
    }
    .b-left small {
      font-size: 0.75rem;
      color: var(--color-text-subtle);
    }
    .b-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .b-amt {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-text-main);
    }
    .b-unit {
      font-size: 0.72rem;
      color: var(--color-text-subtle);
    }
    .order-summary-box {
      background: var(--color-accent-subtle);
      border: 1px solid var(--color-accent-border);
      border-radius: var(--radius-sm);
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      font-size: 0.9rem;
    }
    .sum-row {
      display: flex;
      justify-content: space-between;
      color: var(--color-text-muted);
    }
    .highlight-sum {
      padding-top: 0.5rem;
      border-top: 1px solid var(--color-accent-border);
    }
    .highlight-sum strong {
      font-size: 1.15rem;
      color: var(--color-accent);
    }
    .weights-card {
      margin-bottom: 2rem;
    }
    .weights-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1.5rem;
      margin-top: 1rem;
    }
    .weight-control {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .weight-control label {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--color-text-main);
    }
    .weights-note {
      display: block;
      margin-top: 1rem;
      font-size: 0.75rem;
      color: var(--color-text-subtle);
    }
    .feasibility-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
    }
    .feasibility-table th {
      background: var(--color-bg-base);
      text-align: left;
      padding: 0.75rem 0.6rem;
      color: var(--color-text-subtle);
      font-weight: 700;
      border-bottom: 1px solid var(--color-border-subtle);
    }
    .feasibility-table td {
      padding: 0.75rem 0.6rem;
      border-bottom: 1px solid var(--color-border-subtle);
      color: var(--color-text-muted);
    }
    .top-rank {
      background: rgba(46, 98, 76, 0.04);
    }
    .rank-badge {
      background: var(--color-bg-subtle);
      padding: 2px 6px;
      border-radius: 3px;
      font-weight: 700;
      font-size: 0.75rem;
    }
    .top-rank .rank-badge {
      background: var(--color-accent);
      color: #ffffff;
    }
    .r-notes {
      display: block;
      font-size: 0.74rem;
      color: var(--color-text-subtle);
      margin-top: 2px;
      max-width: 320px;
    }
    .score-highlight {
      font-size: 1.05rem;
      color: var(--color-accent);
    }
    @media (max-width: 992px) {
      .tool-grid {
        grid-template-columns: 1fr;
      }
      .weights-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ToolsComponent implements OnInit {
  activeTab: 'RETROFIT' | 'ORDER_COST' | 'FEASIBILITY' = 'RETROFIT';

  // Tool 1: Retrofit Profitability Model
  costModel: CostModel = {
    name: 'Hosur Plant Retrofit',
    initialInvestmentInr: 2200000.0,
    annualCapacityTonnes: 30000.0,
    expectedUtilisationRate: 0.70,
    conventionalSellingPriceInr: 3400.0,
    sthiraxSellingPriceInr: 3650.0,
    rawMaterialCostPerTonneInr: 1850.0,
    co2CostPerTonneInr: 120.0,
    co2TransportCostPerTonneInr: 45.0,
    energyCostPerTonneInr: 90.0,
    laborCostPerTonneInr: 210.0,
    maintenanceCostPerTonneInr: 85.0,
    qualityTestingCostPerTonneInr: 40.0,
    equipmentLeasePerYearInr: 0.0,
    overheadCostPerTonneInr: 160.0,
    rejectionRate: 0.025
  };

  costModelUtilisationPct = 70;
  costModelRejectionPct = 2.5;

  // Tool 2: Order Cost Breakdown
  orderQuantityM2 = 2500;
  orderPricePerM2 = 68.0;
  orderCo2DistanceKm = 120;
  orderProductDistanceKm = 40;
  orderCostBreakdown: any[] = [];
  orderTotalCostInr = 0;
  orderTotalRevenueInr = 0;
  orderContributionInr = 0;
  orderMarginPct = 0;

  // Tool 3: Regional Feasibility
  weightCo2 = 0.25;
  weightCost = 0.20;
  weightFeedstock = 0.20;
  weightPlants = 0.15;
  weightDemand = 0.20;
  feasibilityRankings: RegionalFeasibility[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.recalculateRetrofit();
    this.recalculateOrderCost();
    this.recalculateFeasibility();
  }

  onUtilisationChange(): void {
    this.costModel.expectedUtilisationRate = this.costModelUtilisationPct / 100.0;
    this.recalculateRetrofit();
  }

  onRejectionChange(): void {
    this.costModel.rejectionRate = this.costModelRejectionPct / 100.0;
    this.recalculateRetrofit();
  }

  recalculateRetrofit(): void {
    this.costModel = this.api.calculateCostModelLocally(this.costModel);
  }

  recalculateOrderCost(): void {
    const q = this.orderQuantityM2;
    const tonnage = q * 0.019; // ~19 kg per m2 80mm paver
    const co2RequiredKg = tonnage * 18.0; // ~18 kg CO2/tonne

    const co2PurchaseInr = (co2RequiredKg / 1000.0) * 6200.0;
    const co2TransportInr = (co2RequiredKg / 1000.0) * this.orderCo2DistanceKm * 8.5;
    const rawMaterialInr = tonnage * 1850.0;
    const manufacturingLaborInr = tonnage * (90 + 210 + 85);
    const qualityMrvInr = tonnage * 40.0;
    const productTransportInr = tonnage * this.orderProductDistanceKm * 6.5;
    const overheadsInr = tonnage * 160.0;

    this.orderCostBreakdown = [
      { stage: '1. CO₂ Gas Procurement', basis: `${(co2RequiredKg / 1000).toFixed(2)} tonnes @ ₹6,200/t`, totalInr: co2PurchaseInr, perUnitInr: co2PurchaseInr / q },
      { stage: '2. CO₂ Cryogenic Road Tanker', basis: `${this.orderCo2DistanceKm} km road transit`, totalInr: co2TransportInr, perUnitInr: co2TransportInr / q },
      { stage: '3. Raw Materials (SCM / C&D)', basis: `${tonnage.toFixed(1)} tonnes blended mix`, totalInr: rawMaterialInr, perUnitInr: rawMaterialInr / q },
      { stage: '4. Plant Manufacturing & Curing', basis: 'Chamber electricity, labor & maintenance', totalInr: manufacturingLaborInr, perUnitInr: manufacturingLaborInr / q },
      { stage: '5. Quality Testing & Trace MRV', basis: 'IS 15658 lab break tickets & Coriolis telemetry', totalInr: qualityMrvInr, perUnitInr: qualityMrvInr / q },
      { stage: '6. Finished Product Dispatch', basis: `Flatbed truck transit (${this.orderProductDistanceKm} km)`, totalInr: productTransportInr, perUnitInr: productTransportInr / q },
      { stage: '7. Commercial Overheads', basis: 'Project management & administration', totalInr: overheadsInr, perUnitInr: overheadsInr / q }
    ];

    this.orderTotalCostInr = this.orderCostBreakdown.reduce((sum, item) => sum + item.totalInr, 0);
    this.orderTotalRevenueInr = q * this.orderPricePerM2;
    this.orderContributionInr = this.orderTotalRevenueInr - this.orderTotalCostInr;
    this.orderMarginPct = this.orderTotalRevenueInr > 0 ? (this.orderContributionInr / this.orderTotalRevenueInr) * 100 : 0;
  }

  recalculateFeasibility(): void {
    const totalW = this.weightCo2 + this.weightCost + this.weightFeedstock + this.weightPlants + this.weightDemand;
    const normCo2 = this.weightCo2 / totalW;
    const normCost = this.weightCost / totalW;
    const normFeedstock = this.weightFeedstock / totalW;
    const normPlants = this.weightPlants / totalW;
    const normDemand = this.weightDemand / totalW;

    this.api.getRegionalFeasibility({
      co2: normCo2,
      cost: normCost,
      feedstock: normFeedstock,
      plants: normPlants,
      demand: normDemand
    }).subscribe(rankings => {
      this.feasibilityRankings = rankings;
    });
  }
}
