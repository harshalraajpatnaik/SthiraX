import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portal-logistics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="portal-pane">
      <div class="pane-header">
        <div>
          <span class="sub-title">HAULAGE & DISTRIBUTION</span>
          <h1 class="main-title">Shipments & Logistics Milestones</h1>
        </div>
      </div>

      <div class="card table-card">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Shipment Reference</th>
              <th>Type</th>
              <th>Origin &rarr; Destination</th>
              <th>Quantity / Mode</th>
              <th>Distance</th>
              <th>Carrier / Vehicle</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of shipments">
              <td>
                <span class="ship-code">{{ s.shipmentNumber }}</span>
                <small>{{ s.createdAt | date:'shortDate' }}</small>
              </td>
              <td><span class="type-tag">{{ s.type }}</span></td>
              <td>
                <strong>{{ s.origin }}</strong>
                <small>&rarr; {{ s.destination }}</small>
              </td>
              <td>
                <strong>{{ s.quantityTonnes }} Tonnes</strong>
                <small>{{ s.transportMode }}</small>
              </td>
              <td>{{ s.distanceKm }} km</td>
              <td>
                <small><strong>{{ s.carrierName }}</strong></small>
                <small>{{ s.vehicleNumber }}</small>
              </td>
              <td>
                <span class="badge" [ngClass]="s.status === 'DELIVERED' ? 'badge-success' : 'badge-warning'">
                  {{ s.status }}
                </span>
              </td>
              <td>
                <select [ngModel]="s.status" (ngModelChange)="updateStatus(s, $event)" class="form-control status-select">
                  <option value="PLANNED">Planned</option>
                  <option value="DISPATCHED">Dispatched</option>
                  <option value="IN_TRANSIT">In Transit</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="DELAYED">Delayed</option>
                </select>
              </td>
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
    .portal-table td small { display: block; color: var(--color-text-subtle); font-size: 0.76rem; }
    .ship-code { font-family: var(--font-mono); font-weight: 700; color: var(--color-accent); }
    .type-tag { font-size: 0.72rem; font-weight: 700; color: #1f5f8b; background: #eef6fc; padding: 2px 6px; border-radius: 3px; }
    .status-select { font-size: 0.82rem; padding: 0.35rem 0.6rem; width: auto; }
  `]
})
export class LogisticsComponent implements OnInit {
  shipments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/v1/shipments').subscribe({
      next: (res) => this.shipments = res,
      error: () => {
        this.shipments = [
          {
            id: 'ship-co2-001',
            shipmentNumber: 'SHP-CO2-8802',
            type: 'CO2_DELIVERY',
            origin: 'Deccan Distilleries, Belagavi',
            destination: 'Prakriti Precast Facility #1, Hosur',
            quantityTonnes: 8.5,
            distanceKm: 360,
            transportMode: 'CRYOGENIC_TANKER',
            carrierName: 'CryoLogix Bulk Transporters',
            vehicleNumber: 'KA-22-B-9142',
            status: 'DELIVERED',
            createdAt: new Date().toISOString()
          }
        ];
      }
    });
  }

  updateStatus(shipment: any, status: string): void {
    shipment.status = status;
    this.http.patch(`http://localhost:8080/api/v1/shipments/${shipment.id}/status?status=${status}`, {}).subscribe();
  }
}
