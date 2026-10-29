import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portal-plants',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="portal-pane">
      <div class="pane-header">
        <div>
          <span class="sub-title">MANUFACTURING ASSET MANAGEMENT</span>
          <h1 class="main-title">Regional Precast Plant Network</h1>
        </div>
      </div>

      <div class="card table-card">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Plant Facility</th>
              <th>State / Location</th>
              <th>Annual Capacity</th>
              <th>Utilisation</th>
              <th>Retrofit Status</th>
              <th>Feedstock Assessment</th>
              <th>Chamber Type</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of plants">
              <td>
                <strong>{{ p.name }}</strong>
                <small>{{ p.contactPerson }} &bull; {{ p.contactPhone }}</small>
              </td>
              <td>{{ p.location }} ({{ p.state }})</td>
              <td>{{ p.annualCapacityTonnes | number }} T/yr</td>
              <td><strong>{{ p.currentUtilisationPercent }}%</strong></td>
              <td>
                <span class="badge" [ngClass]="p.retrofitStatus === 'COMMISSIONED' ? 'badge-success' : 'badge-warning'">
                  {{ p.retrofitStatus }}
                </span>
              </td>
              <td><small class="feedstock-desc">{{ p.feedstockSuitabilityScore }}</small></td>
              <td><small>{{ p.co2CuringChamberType }}</small></td>
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
    .feedstock-desc { max-width: 250px; }
  `]
})
export class PlantsComponent implements OnInit {
  plants: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/v1/plants').subscribe({
      next: (res) => this.plants = res,
      error: () => {
        this.plants = [
          {
            id: 'plant-hosur-01',
            name: 'Prakriti Precast Facility #1',
            state: 'Tamil Nadu',
            location: 'Hosur Industrial Complex',
            annualCapacityTonnes: 45000,
            currentUtilisationPercent: 68,
            retrofitStatus: 'COMMISSIONED',
            feedstockSuitabilityScore: '8.8/10 - Proximity to JSW Salem Slag & Ennore Fly Ash',
            co2CuringChamberType: 'Enclosed batch chamber with automated CO2 pressure regulation (2.5 bar)',
            contactPerson: 'M. Selvakumar',
            contactPhone: '+91 94432 10980'
          }
        ];
      }
    });
  }
}
