import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portal-suppliers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="portal-pane">
      <div class="pane-header">
        <div>
          <span class="sub-title">CARBON CAPTURE SOURCING</span>
          <h1 class="main-title">CO₂ Supplier & Off-Take Directory</h1>
        </div>
      </div>

      <div class="card table-card">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Supplier Facility</th>
              <th>Source Category</th>
              <th>Location</th>
              <th>Available Monthly</th>
              <th>Purity Grade</th>
              <th>Price (&#8377;/tonne)</th>
              <th>Delivery Terms</th>
              <th>Approval</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of suppliers">
              <td>
                <strong>{{ s.companyName }}</strong>
                <small>{{ s.notes }}</small>
              </td>
              <td><span class="source-tag">{{ s.sourceCategory }}</span></td>
              <td>{{ s.facilityLocation }}</td>
              <td><strong>{{ s.monthlyAvailableTonnes | number }} T</strong></td>
              <td>{{ s.purityGrade }}</td>
              <td>&#8377;{{ s.pricePerTonneInr | number }}</td>
              <td><small>{{ s.deliveryTerms }} ({{ s.transportMode }})</small></td>
              <td><span class="badge badge-success">{{ s.technicalApprovalStatus }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .portal-pane { display: flex; flex-direction: column; gap: 1.5rem; }
    .pane-header { display: flex; justify-content: space-between; align-items: center; }
    .sub-title { font-size: 0.72rem; font-weight: 700; color: var(--color-accent); letter-spacing: 0.08em; display: block; }
    .main-title { font-size: 1.8rem; font-weight: 800; color: var(--color-text-main); margin: 0; }
    .table-card { background: #ffffff; padding: 0; overflow: hidden; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); }
    .portal-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
    .portal-table th { background: var(--color-bg-base); text-align: left; padding: 0.85rem 1rem; font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-subtle); font-weight: 700; border-bottom: 1px solid var(--color-border-subtle); }
    .portal-table td { padding: 1rem; border-bottom: 1px solid var(--color-border-subtle); color: var(--color-text-main); vertical-align: middle; }
    .portal-table td small { display: block; color: var(--color-text-subtle); font-size: 0.76rem; max-width: 250px; }
    .source-tag { font-size: 0.72rem; font-weight: 700; color: var(--color-accent); background: var(--color-accent-subtle); padding: 2px 6px; border-radius: 3px; }
  `]
})
export class SuppliersComponent implements OnInit {
  suppliers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/v1/co2-suppliers').subscribe({
      next: (res) => this.suppliers = res,
      error: () => {
        this.suppliers = [
          {
            id: 'sup-belagavi-01',
            companyName: 'Deccan Distilleries CO2 Capture Unit',
            sourceCategory: 'BIOETHANOL_FERMENTATION',
            facilityLocation: 'Belagavi, Karnataka',
            monthlyAvailableTonnes: 1200,
            purityGrade: '99.4% biogenic fermentation grade',
            pricePerTonneInr: 6200,
            deliveryTerms: 'CIP_DELIVERED',
            transportMode: 'CRYOGENIC_TANKER',
            technicalApprovalStatus: 'APPROVED',
            notes: 'High biogenic purity stream, minimal sulfur contamination; road tanker transit time ~4.5 hours.'
          }
        ];
      }
    });
  }
}
