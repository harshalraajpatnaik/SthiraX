import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Product } from '../../core/models/models';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-materials">
      <header class="page-header">
        <div class="container">
          <span class="section-tag">Product Catalogue</span>
          <h1 class="page-title">Low-Carbon Non-Structural Precast Materials</h1>
          <p class="page-subtitle">
            Manufactured with secondary cementitious materials and accelerated CO₂ curing. Engineered to satisfy BIS specifications and support mandatory recycled-content obligations under the C&D Waste Management Rules, 2025.
          </p>
        </div>
      </header>

      <div class="container catalog-container">
        <!-- Filter Toolbar -->
        <div class="catalog-toolbar">
          <div class="category-filters">
            <button class="filter-btn" [class.active]="selectedCategory === 'ALL'" (click)="selectedCategory = 'ALL'">
              All Materials ({{ products.length }})
            </button>
            <button class="filter-btn" [class.active]="selectedCategory === 'PAVER'" (click)="selectedCategory = 'PAVER'">
              Interlocking Pavers
            </button>
            <button class="filter-btn" [class.active]="selectedCategory === 'KERBSTONE'" (click)="selectedCategory = 'KERBSTONE'">
              Road Kerbstones
            </button>
            <button class="filter-btn" [class.active]="selectedCategory === 'MASONRY_BLOCK'" (click)="selectedCategory = 'MASONRY_BLOCK'">
              Masonry Blocks
            </button>
            <button class="filter-btn" [class.active]="selectedCategory === 'DRAIN_COVER'" (click)="selectedCategory = 'DRAIN_COVER'">
              Drain Slabs
            </button>
          </div>

          <div class="transparency-note">
            <span class="info-icon">&#9432;</span>
            <span>All technical specifications reflect current pilot formulations under NABL testing and engineering verification.</span>
          </div>
        </div>

        <!-- Material Cards Grid -->
        <div class="materials-grid">
          <div class="material-card" *ngFor="let p of filteredProducts">
            <div class="card-top">
              <span class="cat-pill">{{ p.category }}</span>
              <span class="badge" [ngClass]="p.specificationStatus.includes('Validated') ? 'badge-warning' : 'badge-neutral'">
                {{ p.specificationStatus }}
              </span>
            </div>

            <h2 class="material-title">{{ p.name }}</h2>
            <p class="material-app"><strong>Target Applications:</strong> {{ p.application }}</p>

            <div class="tech-specs-box">
              <div class="spec-item">
                <span class="spec-label">Dimensions / Profile:</span>
                <span class="spec-value">{{ p.dimensions }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Compressive Strength:</span>
                <span class="spec-value">{{ p.compressiveStrengthTarget }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">CO₂ Uptake Target:</span>
                <span class="spec-value">{{ p.co2UptakeTarget }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Quality Status:</span>
                <span class="spec-value highlight">{{ p.qualityTestStatus }}</span>
              </div>
            </div>

            <div class="formulations-strip">
              <span class="strip-label">Formulations:</span>
              <div class="formula-tags">
                <span class="formula-tag" *ngFor="let f of p.availableFormulations">{{ f }}</span>
              </div>
            </div>

            <div class="material-bottom">
              <div class="price-section">
                <span class="price-amt">&#8377;{{ p.indicativePriceInr }}</span>
                <span class="price-sub">{{ p.priceBasis }}</span>
              </div>
              <div class="card-actions">
                <a [routerLink]="['/materials', p.slug]" class="btn btn-primary btn-sm">Technical Specs & Quote</a>
              </div>
            </div>
          </div>
        </div>

        <div class="empty-state" *ngIf="filteredProducts.length === 0">
          <p>No materials found in the selected category.</p>
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
    .catalog-container {
      padding-top: 2.5rem;
      padding-bottom: 5rem;
    }
    .catalog-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1.25rem;
      margin-bottom: 2.5rem;
    }
    .category-filters {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .filter-btn {
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border-medium);
      background: #ffffff;
      color: var(--color-text-muted);
      transition: all 0.15s ease;
    }
    .filter-btn:hover {
      border-color: var(--color-text-muted);
    }
    .filter-btn.active {
      background: var(--color-accent);
      color: #ffffff;
      border-color: var(--color-accent);
    }
    .transparency-note {
      font-size: 0.82rem;
      color: var(--color-text-subtle);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      max-width: 420px;
    }
    .materials-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
    .material-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 2rem;
      box-shadow: var(--shadow-subtle);
      display: flex;
      flex-direction: column;
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .cat-pill {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: var(--color-text-subtle);
      background: var(--color-bg-subtle);
      padding: 2px 8px;
      border-radius: var(--radius-sm);
    }
    .material-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.5rem;
    }
    .material-app {
      font-size: 0.86rem;
      color: var(--color-text-muted);
      line-height: 1.5;
      margin-bottom: 1.25rem;
    }
    .tech-specs-box {
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-sm);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.84rem;
      margin-bottom: 1.25rem;
    }
    .spec-item {
      display: flex;
      justify-content: space-between;
      color: var(--color-text-muted);
    }
    .spec-value {
      font-weight: 600;
      color: var(--color-text-main);
      text-align: right;
    }
    .spec-value.highlight {
      color: var(--color-accent);
    }
    .formulations-strip {
      margin-bottom: 1.5rem;
    }
    .strip-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-subtle);
      display: block;
      margin-bottom: 0.4rem;
    }
    .formula-tags {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .formula-tag {
      font-size: 0.76rem;
      font-family: var(--font-mono);
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      padding: 0.3rem 0.6rem;
      border-radius: 3px;
      color: var(--color-text-muted);
    }
    .material-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 1.25rem;
      border-top: 1px solid var(--color-border-subtle);
    }
    .price-section {
      display: flex;
      flex-direction: column;
    }
    .price-amt {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--color-text-main);
      line-height: 1;
    }
    .price-sub {
      font-size: 0.72rem;
      color: var(--color-text-subtle);
    }
    @media (max-width: 900px) {
      .materials-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MaterialsComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: string = 'ALL';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'ALL') {
      return this.products;
    }
    return this.products.filter(p => p.category === this.selectedCategory);
  }
}
