import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { RegulatoryDocument } from '../../core/models/models';

@Component({
  selector: 'app-regulatory',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="page-regulatory">
      <header class="page-header">
        <div class="container">
          <span class="section-tag">Governance & Standards</span>
          <h1 class="page-title">Regulatory & Standards Reference Library</h1>
          <p class="page-subtitle">
            Curated analysis of statutory environmental rules, Bureau of Indian Standards (BIS) specifications, Extended Producer Responsibility (EPR) mandates, and carbon market frameworks in India.
          </p>
        </div>
      </header>

      <section class="container content-section">
        <!-- Search and Filter Bar -->
        <div class="filter-bar card">
          <div class="search-input-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" [(ngModel)]="searchQuery" placeholder="Search by regulation, standard, issuing body, or keyword (e.g. C&D, IS 15658, EPR)..." class="search-input">
          </div>

          <div class="category-pills">
            <button class="cat-btn" [class.active]="selectedCat === 'ALL'" (click)="selectedCat = 'ALL'">All Authorities</button>
            <button class="cat-btn" [class.active]="selectedCat === 'CD_WASTE_RULES'" (click)="selectedCat = 'CD_WASTE_RULES'">C&D Waste Rules 2025</button>
            <button class="cat-btn" [class.active]="selectedCat === 'BIS_STANDARD'" (click)="selectedCat = 'BIS_STANDARD'">BIS Product Standards</button>
            <button class="cat-btn" [class.active]="selectedCat === 'CARBON_TRADING'" (click)="selectedCat = 'CARBON_TRADING'">CCTS & Carbon Offsets</button>
            <button class="cat-btn" [class.active]="selectedCat === 'IRC_GUIDELINE'" (click)="selectedCat = 'IRC_GUIDELINE'">IRC Guidelines</button>
          </div>
        </div>

        <!-- Mandatory Legal Distinction Alert -->
        <div class="legal-notice-box">
          <div class="notice-title">
            <span>&#9888; Regulatory Distinction Notice</span>
          </div>
          <p>
            The regulatory library distinguishes strictly between: (1) Statutory notifications and rules, (2) National technical standards, (3) Voluntary offset methodologies, and (4) SthiraX engineering interpretations. Purchasing low-carbon precast materials does not automatically discharge all municipal EPR obligations, nor does carbon dioxide curing automatically constitute certified carbon removal credits. Information is provided for technical orientation and requires independent legal verification.
          </p>
        </div>

        <!-- Regulatory Cards Grid -->
        <div class="regulatory-list">
          <div class="card reg-card" *ngFor="let doc of filteredDocs">
            <div class="reg-top">
              <span class="reg-authority">{{ doc.issuingAuthority }}</span>
              <span class="badge" [ngClass]="doc.reviewStatus === 'VERIFIED' ? 'badge-success' : 'badge-warning'">
                {{ doc.reviewStatus }}
              </span>
            </div>

            <h2 class="reg-title">{{ doc.title }}</h2>
            <div class="reg-meta">
              <span><strong>Doc Reference:</strong> {{ doc.documentNumber }}</span>
              <span><strong>Effective Date:</strong> {{ doc.effectiveDate }}</span>
              <span><strong>Last Reviewed:</strong> {{ doc.lastReviewedDate }}</span>
            </div>

            <div class="reg-body">
              <div class="body-sec">
                <h4>Official Summary:</h4>
                <p>{{ doc.summary }}</p>
              </div>

              <div class="body-sec highlight-sec">
                <h4>Relevance to SthiraX & Participating Plants:</h4>
                <p>{{ doc.relevanceToSthirax }}</p>
              </div>

              <div class="body-sec key-clauses">
                <h4>Key Mandated Clauses:</h4>
                <p>{{ doc.keyClauses }}</p>
              </div>
            </div>

            <div class="reg-footer">
              <a [href]="doc.officialSourceUrl" target="_blank" rel="noopener noreferrer" class="source-link">
                Official Gazetted Source URL &rarr;
              </a>
            </div>
          </div>
        </div>

        <div class="empty-state" *ngIf="filteredDocs.length === 0">
          <p>No regulatory records match your search criteria.</p>
        </div>
      </section>
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
    .content-section {
      padding-top: 2.5rem;
      padding-bottom: 5rem;
    }
    .filter-bar {
      padding: 1.5rem;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .search-input-box {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-medium);
      border-radius: var(--radius-sm);
      padding: 0.6rem 1rem;
      color: var(--color-text-subtle);
    }
    .search-input {
      border: none;
      background: transparent;
      width: 100%;
      font-size: 0.95rem;
      color: var(--color-text-main);
      outline: none;
    }
    .category-pills {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .cat-btn {
      padding: 0.45rem 0.9rem;
      font-size: 0.82rem;
      font-weight: 600;
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border-medium);
      background: #ffffff;
      color: var(--color-text-muted);
      transition: all 0.15s ease;
    }
    .cat-btn:hover {
      border-color: var(--color-text-muted);
    }
    .cat-btn.active {
      background: var(--color-accent);
      color: #ffffff;
      border-color: var(--color-accent);
    }
    .legal-notice-box {
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-medium);
      border-radius: var(--radius-sm);
      padding: 1.25rem 1.5rem;
      font-size: 0.82rem;
      line-height: 1.6;
      color: var(--color-text-muted);
      margin-bottom: 2.5rem;
    }
    .notice-title {
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.35rem;
    }
    .regulatory-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .reg-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 2.25rem;
      box-shadow: var(--shadow-subtle);
    }
    .reg-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .reg-authority {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-accent);
    }
    .reg-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.6rem;
    }
    .reg-meta {
      display: flex;
      gap: 1.5rem;
      font-size: 0.82rem;
      color: var(--color-text-subtle);
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-border-subtle);
      flex-wrap: wrap;
    }
    .reg-body {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }
    .body-sec h4 {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--color-text-subtle);
      text-transform: uppercase;
      margin-bottom: 0.3rem;
    }
    .body-sec p {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      line-height: 1.55;
      margin: 0;
    }
    .highlight-sec {
      background: var(--color-bg-base);
      padding: 1rem 1.25rem;
      border-radius: var(--radius-sm);
      border-left: 3px solid var(--color-accent);
    }
    .highlight-sec p {
      color: var(--color-text-main);
      font-weight: 500;
    }
    .key-clauses {
      background: #fafafa;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }
    .reg-footer {
      padding-top: 1rem;
      border-top: 1px solid var(--color-border-subtle);
    }
    .source-link {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-accent);
    }
  `]
})
export class RegulatoryComponent implements OnInit {
  documents: RegulatoryDocument[] = [];
  searchQuery: string = '';
  selectedCat: string = 'ALL';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getRegulatoryDocuments().subscribe(docs => {
      this.documents = docs;
    });
  }

  get filteredDocs(): RegulatoryDocument[] {
    return this.documents.filter(d => {
      const matchesCat = this.selectedCat === 'ALL' || d.category === this.selectedCat;
      const q = this.searchQuery.toLowerCase().trim();
      const matchesQuery = !q ||
        d.title.toLowerCase().includes(q) ||
        d.issuingAuthority.toLowerCase().includes(q) ||
        d.documentNumber.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q);

      return matchesCat && matchesQuery;
    });
  }
}
