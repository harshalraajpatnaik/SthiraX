import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portal-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="portal-pane">
      <div class="pane-header">
        <div>
          <span class="sub-title">COMMERCIAL LIFECYCLE</span>
          <h1 class="main-title">Customer Orders & Quotations</h1>
        </div>
      </div>

      <div class="card table-card">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer</th>
              <th>Product / Volume</th>
              <th>Destination PIN</th>
              <th>Assigned Plant</th>
              <th>Status</th>
              <th>Commercial Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let o of orders">
              <td>
                <span class="order-code">{{ o.orderNumber }}</span>
                <small>{{ o.createdAt | date:'shortDate' }}</small>
              </td>
              <td>
                <strong>{{ o.customerName }}</strong>
                <small>{{ o.contactEmail }}</small>
              </td>
              <td>
                <strong>{{ o.productName }}</strong>
                <small>{{ o.quantity | number }} {{ o.unit }}</small>
              </td>
              <td>{{ o.destinationPincode }}</td>
              <td><small>{{ o.assignedPlantName || 'Pending Allocation' }}</small></td>
              <td>
                <span class="badge" [ngClass]="getOrderStatusBadge(o.orderStatus)">{{ o.orderStatus }}</span>
              </td>
              <td>
                <span *ngIf="o.quotedPriceInr > 0">&#8377;{{ o.quotedPriceInr | number }}</span>
                <span *ngIf="!o.quotedPriceInr || o.quotedPriceInr === 0" class="sub-text">Quote Pending</span>
              </td>
              <td>
                <div class="action-dropdown">
                  <select [ngModel]="o.orderStatus" (ngModelChange)="updateStatus(o, $event)" class="form-control status-select">
                    <option value="QUOTE_REQUESTED">Quote Requested</option>
                    <option value="AWAITING_CUSTOMER">Awaiting Customer</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="IN_PRODUCTION">In Production</option>
                    <option value="QUALITY_REVIEW">Quality Review</option>
                    <option value="READY_FOR_DISPATCH">Ready for Dispatch</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>
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
    .order-code { font-family: var(--font-mono); font-weight: 700; color: var(--color-accent); }
    .status-select { font-size: 0.82rem; padding: 0.35rem 0.6rem; width: auto; }
  `]
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.http.get<any[]>('http://localhost:8080/api/v1/orders').subscribe({
      next: (res) => this.orders = res,
      error: () => {
        this.orders = [
          {
            id: 'ord-metro-2026-01',
            orderNumber: 'STX-ORD-10024',
            customerName: 'Metro Infrastructure Projects Ltd',
            contactEmail: 'procurement@metroinfra.in',
            productName: 'SthiraX Carbon-Cured Interlocking Pavers',
            quantity: 2500,
            unit: 'm2',
            destinationPincode: '560100',
            assignedPlantName: 'Prakriti Precast Facility #1 (Hosur)',
            orderStatus: 'IN_PRODUCTION',
            quotedPriceInr: 170000,
            createdAt: new Date().toISOString()
          }
        ];
      }
    });
  }

  updateStatus(order: any, newStatus: string): void {
    order.orderStatus = newStatus;
    this.http.patch(`http://localhost:8080/api/v1/orders/${order.id}/status?status=${newStatus}`, {}).subscribe();
  }

  getOrderStatusBadge(status: string): string {
    if (status === 'DELIVERED' || status === 'CLOSED') return 'badge-success';
    if (status === 'IN_PRODUCTION' || status === 'ACCEPTED') return 'badge-info';
    return 'badge-warning';
  }
}
