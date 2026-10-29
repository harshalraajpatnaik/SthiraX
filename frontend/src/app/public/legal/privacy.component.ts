import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-legal">
      <div class="container legal-container">
        <h1 class="page-title">Data Privacy & Information Security Policy</h1>
        <p class="last-updated">Last Updated: April 2026 &bull; Draft Operational Notice</p>

        <div class="card legal-card">
          <h3>1. Scope & Objective</h3>
          <p>
            This policy outlines how SthiraX Technologies Pvt Ltd ("SthiraX", "we", "us") collects, secures, and processes commercial, operational, and technical telemetry data submitted through our corporate platform and SthiraX Trace portal.
          </p>

          <h3>2. Information We Collect</h3>
          <ul>
            <li><strong>Commercial Enquiries:</strong> Name, business email, telephone, company affiliation, and project requirements submitted via quotation forms.</li>
            <li><strong>Plant Onboarding Data:</strong> Manufacturing capacity, equipment profiles, feedstock mixtures, and location coordinates submitted by prospective plant partners.</li>
            <li><strong>Industrial Telemetry:</strong> In-line Coriolis flow meter logs, chamber pressure readings, and NABL compressive strength certificates associated with production batches.</li>
          </ul>

          <h3>3. Data Isolation & Commercial Redaction</h3>
          <p>
            SthiraX enforces strict multi-tenant organisation isolation. Raw material supplier purchase tariffs, proprietary binder formulations, and customer billing rates are strictly segregated and are NEVER exposed on public digital product passports. Public passports display only authenticated sustainability, BIS compliance, and physical carbonation parameters.
          </p>

          <h3>4. Storage & Security</h3>
          <p>
            Platform data is stored in secure relational databases with role-based access control (RBAC), TLS encryption in transit, and immutable audit logging of quality signoffs.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-legal {
      padding: 4rem 0 5rem;
    }
    .page-title {
      font-size: 2.2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
      color: var(--color-text-main);
    }
    .last-updated {
      font-size: 0.85rem;
      color: var(--color-text-subtle);
      margin-bottom: 2rem;
    }
    .legal-card {
      background: #ffffff;
      padding: 2.5rem;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
    }
    .legal-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin: 1.5rem 0 0.5rem;
    }
    .legal-card p, .legal-card ul {
      font-size: 0.92rem;
      color: var(--color-text-muted);
      line-height: 1.65;
    }
    .legal-card ul {
      padding-left: 1.25rem;
    }
  `]
})
export class PrivacyComponent {}
