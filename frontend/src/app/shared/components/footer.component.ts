import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="site-footer">
      <div class="container-wide footer-content">
        <div class="footer-brand">
          <div class="brand-logo flex items-center">
            <svg viewBox="0 0 64 64" width="28" height="28" class="footer-brand-svg shrink-0 mr-2 inline-block align-middle" style="border-radius:6px;">
              <defs>
                <linearGradient id="fBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0F172A"/>
                  <stop offset="100%" stop-color="#022C22"/>
                </linearGradient>
                <linearGradient id="fEm" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#34D399"/>
                  <stop offset="100%" stop-color="#059669"/>
                </linearGradient>
                <linearGradient id="fCry" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#38BDF8"/>
                  <stop offset="100%" stop-color="#0284C7"/>
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#fBg)"/>
              <path d="M18 16 L27 16 L46 48 L37 48 Z" fill="url(#fCry)"/>
              <path d="M46 16 L37 16 L18 48 L27 48 Z" fill="url(#fEm)"/>
              <path d="M22 20 C22 17 40 17 42 22 L35 25 C34 23 28 23 28 25 C28 28 42 27 42 35 C42 42 24 43 21 37 L28 34 C29 36 35 36 35 34 C35 31 22 32 22 20 Z" fill="#F8FAFC"/>
              <circle cx="32" cy="32" r="4" fill="#10B981"/>
            </svg>
            <span class="brand-name">STHIRA<span>X</span></span>
          </div>
          <p class="brand-desc">
            Distributed CO₂ mineralization platform for lower-carbon precast construction materials in India. Coordinating industrial carbon capture, regional plant retrofits, and digital batch traceability.
          </p>
          <div class="badge badge-neutral pilot-tag">
            <span>Pilot Validation & Prototype System</span>
          </div>
        </div>

        <div class="footer-links">
          <div class="link-column">
            <h4>Products & Solutions</h4>
            <a routerLink="/materials">Low-Carbon Pavers</a>
            <a routerLink="/materials">Heavy-Duty Kerbstones</a>
            <a routerLink="/materials">Masonry Blocks</a>
            <a routerLink="/solutions/manufacturers">Manufacturer Network</a>
            <a routerLink="/solutions/co2-suppliers">CO₂ Supply Partners</a>
          </div>

          <div class="link-column">
            <h4>Traceability & Tools</h4>
            <a routerLink="/docs">Knowledge Base & Architecture Flows</a>
            <a routerLink="/trace">SthiraX Trace Digital Passports</a>
            <a routerLink="/passports/pass-7f9a2b4c">Demonstration Batch Passport</a>
            <a routerLink="/tools">Retrofit Profitability Calculator</a>
            <a routerLink="/tools">Order Cost Estimator</a>
            <a routerLink="/tools">Regional Feasibility Scoring</a>
            <a routerLink="/roadmap">Phase Roadmap & Pilot Budget</a>
          </div>

          <div class="link-column">
            <h4>Standards & Governance</h4>
            <a routerLink="/regulatory">C&D Waste Rules, 2025 (CPCB)</a>
            <a routerLink="/regulatory">IS 15658 Precast Standards</a>
            <a routerLink="/regulatory">CCTS & Domestic Offset Analysis</a>
            <a routerLink="/team">Core Operations Team</a>
            <a routerLink="/disclosures">Methodology & Disclosures</a>
            <a routerLink="/privacy">Privacy Notice</a>
          </div>
        </div>
      </div>

      <div class="container-wide legal-bar">
        <div class="disclosure-box">
          <strong>Mandatory Disclosure:</strong>
          SthiraX is an industrial decision-support and material validation prototype platform. Statements regarding CO₂ mineralization, compressive strength, avoided emissions, and payback periods represent engineering models, laboratory batch trials, and user assumptions. Material performance requires project-specific testing. CO₂ uptake does not automatically constitute certified carbon removal credits or statutory regulatory compliance.
        </div>
        <div class="bottom-flex">
          <p class="copyright">&copy; 2026 SthiraX Technologies Pvt Ltd. All rights reserved. Registered in India.</p>
          <div class="legal-links">
            <a routerLink="/disclosures">Legal Disclosures</a>
            <a routerLink="/privacy">Data Privacy</a>
            <a routerLink="/contact">Commercial Enquiries</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background-color: var(--color-bg-dark);
      color: #b0b8bc;
      border-top: 1px solid #23282b;
      padding-top: 4rem;
      padding-bottom: 2rem;
      font-size: 0.88rem;
    }
    .footer-content {
      display: grid;
      grid-template-columns: 1.5fr 3fr;
      gap: 3rem;
      margin-bottom: 3.5rem;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 1rem;
    }
    .mineral-cube {
      width: 16px;
      height: 16px;
      background: var(--color-accent);
      border-radius: 2px;
    }
    .brand-name {
      font-size: 1.25rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.02em;
    }
    .brand-name span {
      color: #48a380;
    }
    .brand-desc {
      font-size: 0.85rem;
      line-height: 1.6;
      color: #8c979a;
      margin-bottom: 1.2rem;
      max-width: 380px;
    }
    .pilot-tag {
      background: #1e2426;
      color: #a4b4b0;
      border: 1px solid #2f383a;
    }
    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    .link-column h4 {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #ffffff;
      margin-bottom: 1.2rem;
    }
    .link-column a {
      display: block;
      color: #8c979a;
      margin-bottom: 0.75rem;
      font-size: 0.85rem;
      transition: color 0.15s ease;
    }
    .link-column a:hover {
      color: #ffffff;
    }
    .legal-bar {
      border-top: 1px solid #1e2426;
      padding-top: 2rem;
    }
    .disclosure-box {
      background: #181d1f;
      border: 1px solid #252d30;
      border-radius: var(--radius-sm);
      padding: 0.9rem 1.2rem;
      font-size: 0.78rem;
      line-height: 1.55;
      color: #7d8b8e;
      margin-bottom: 1.5rem;
    }
    .disclosure-box strong {
      color: #d1dcda;
    }
    .bottom-flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.8rem;
      color: #637073;
    }
    .legal-links {
      display: flex;
      gap: 1.5rem;
    }
    .legal-links a {
      color: #8c979a;
    }
    .legal-links a:hover {
      color: #ffffff;
    }
    @media (max-width: 900px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
      .footer-links {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {}
