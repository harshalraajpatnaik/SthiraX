import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pilot',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-pilot">
      <header class="page-header">
        <div class="container">
          <span class="section-tag">2026 Commercial Pilot Program</span>
          <h1 class="page-title">SthiraX South India Pilot Demonstration Cohort</h1>
          <p class="page-subtitle">
            Validating industrial CO₂ mineralization across real-world commercial construction pavements, precast plants, and municipal test beds.
          </p>
        </div>
      </header>

      <section class="container content-section">
        <div class="pilot-details-card card">
          <h2>Pilot Cohort Parameters</h2>
          <div class="param-grid">
            <div class="param-box">
              <span class="param-label">Target Demonstration Volume</span>
              <span class="param-val">5,000 m²</span>
              <small>M40 Interlocking Pavers</small>
            </div>
            <div class="param-box">
              <span class="param-label">Primary Participating Facility</span>
              <span class="param-val">Hosur Precast Cluster</span>
              <small>Prakriti Precast Facility #1</small>
            </div>
            <div class="param-box">
              <span class="param-label">Target CO₂ Injection</span>
              <span class="param-val">~25 - 35 Tonnes</span>
              <small>Biogenic fermentation stream</small>
            </div>
            <div class="param-box">
              <span class="param-label">Recycled Feedstock Quota</span>
              <span class="param-val">&ge; 35% C&D Fines</span>
              <small>CPCB EPR aligned</small>
            </div>
          </div>
        </div>

        <div class="cta-cohort-box card">
          <h3>Participate in the Demonstration Pilot</h3>
          <p>
            Whether you are a developer looking for certified pilot batch test paving or a precast plant owner seeking retrofit evaluation, submit an expression of interest.
          </p>
          <div class="cta-actions">
            <a routerLink="/contact" [queryParams]="{ type: 'QUOTE' }" class="btn btn-primary">Request Pilot Material Allocation</a>
            <a routerLink="/solutions/manufacturers" class="btn btn-secondary">Apply as Regional Plant Partner</a>
          </div>
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
      padding-top: 3.5rem;
      padding-bottom: 5rem;
    }
    .pilot-details-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 2.5rem;
      margin-bottom: 2.5rem;
    }
    .pilot-details-card h2 {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: var(--color-text-main);
    }
    .param-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    .param-box {
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-sm);
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
    }
    .param-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-subtle);
      margin-bottom: 0.35rem;
    }
    .param-val {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--color-accent);
      line-height: 1.2;
    }
    .param-box small {
      font-size: 0.72rem;
      color: var(--color-text-muted);
      margin-top: 0.25rem;
    }
    .cta-cohort-box {
      background: #171b1d;
      color: #ffffff;
      border-radius: var(--radius-md);
      padding: 2.5rem;
    }
    .cta-cohort-box h3 {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .cta-cohort-box p {
      font-size: 0.95rem;
      color: #9ea9ac;
      max-width: 700px;
      margin-bottom: 1.75rem;
      line-height: 1.6;
    }
    .cta-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    @media (max-width: 900px) {
      .param-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 600px) {
      .param-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PilotComponent {}
