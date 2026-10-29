import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-portal-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="portal-wrapper">
      <!-- Portal Topbar -->
      <header class="portal-topbar">
        <div class="topbar-left">
          <a routerLink="/" class="portal-brand flex items-center">
            <svg viewBox="0 0 64 64" width="24" height="24" class="portal-brand-svg shrink-0 mr-2" style="display:inline-block; border-radius:6px;">
              <defs>
                <linearGradient id="pBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0F172A"/>
                  <stop offset="100%" stop-color="#022C22"/>
                </linearGradient>
                <linearGradient id="pEm" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#34D399"/>
                  <stop offset="100%" stop-color="#059669"/>
                </linearGradient>
                <linearGradient id="pCry" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#38BDF8"/>
                  <stop offset="100%" stop-color="#0284C7"/>
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#pBg)"/>
              <path d="M18 16 L27 16 L46 48 L37 48 Z" fill="url(#pCry)"/>
              <path d="M46 16 L37 16 L18 48 L27 48 Z" fill="url(#pEm)"/>
              <path d="M22 20 C22 17 40 17 42 22 L35 25 C34 23 28 23 28 25 C28 28 42 27 42 35 C42 42 24 43 21 37 L28 34 C29 36 35 36 35 34 C35 31 22 32 22 20 Z" fill="#F8FAFC"/>
              <circle cx="32" cy="32" r="4" fill="#10B981"/>
            </svg>
            <strong>STHIRA<span>X</span></strong>
            <span class="portal-label">OPERATIONS CONSOLE</span>
          </a>
          <div class="demo-badge">
            <span class="pulse-indicator"></span>
            <span>PROTOTYPE ENVIRONMENT &bull; PERSISTENT DEMO DATA</span>
          </div>
        </div>

        <div class="topbar-right">
          <div class="user-pill" *ngIf="authService.currentSession as session">
            <div class="user-avatar">{{ session.fullName ? session.fullName[0] : 'U' }}</div>
            <div class="user-info">
              <span class="user-name">{{ session.fullName }}</span>
              <span class="user-org">{{ session.organisationName }}</span>
            </div>
            <span class="badge badge-info user-role">{{ session.roles[0] }}</span>
          </div>

          <a routerLink="/" class="btn btn-secondary btn-sm" title="View Public Website">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            Public Site
          </a>

          <button (click)="logout()" class="btn btn-secondary btn-sm" title="Sign Out">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        </div>
      </header>

      <!-- Portal Body -->
      <div class="portal-main">
        <!-- Sidebar Navigation -->
        <aside class="portal-sidebar">
          <div class="nav-section">
            <span class="nav-header">CORE OPERATIONS</span>
            <a routerLink="/app/dashboard" routerLinkActive="active" class="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <span>Executive Dashboard</span>
            </a>
            <a routerLink="/app/orders" routerLinkActive="active" class="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span>Orders & Quotations</span>
            </a>
            <a routerLink="/app/batches" routerLinkActive="active" class="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              <span>Production Batches</span>
            </a>
            <a routerLink="/app/quality" routerLinkActive="active" class="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>Quality & MRV Reviews</span>
            </a>
            <a routerLink="/app/trace" routerLinkActive="active" class="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><line x1="4" y1="9" x2="20" y2="9"></line><line x1="9" y1="20" x2="9" y2="9"></line></svg>
              <span>Trace & Passports</span>
            </a>
          </div>

          <div class="nav-section">
            <span class="nav-header">SUPPLY CHAIN & LOGISTICS</span>
            <a routerLink="/app/approvals" routerLinkActive="active" class="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
              <span>Partner Approvals</span>
            </a>
            <a routerLink="/app/plants" routerLinkActive="active" class="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <span>Precast Plant Network</span>
            </a>
            <a routerLink="/app/co2-suppliers" routerLinkActive="active" class="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              <span>CO₂ Supply Routing</span>
            </a>
            <a routerLink="/app/logistics" routerLinkActive="active" class="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              <span>Shipments & Transit</span>
            </a>
          </div>

          <div class="nav-section">
            <span class="nav-header">FINANCE & GOVERNANCE</span>
            <a routerLink="/app/costing" routerLinkActive="active" class="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              <span>Cost Models & Margins</span>
            </a>
            <a routerLink="/app/carbon-offtake" routerLinkActive="active" class="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path></svg>
              <span>Carbon Offtake Workspace</span>
            </a>
            <a routerLink="/app/regulatory" routerLinkActive="active" class="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              <span>Regulatory Admin</span>
            </a>
            <a routerLink="/app/audit-log" routerLinkActive="active" class="side-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              <span>Audit & Access Logs</span>
            </a>
          </div>
        </aside>

        <!-- Dynamic Portal Views -->
        <main class="portal-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .portal-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #f4f5f1;
    }
    .portal-topbar {
      height: 64px;
      background: #171b1d;
      border-bottom: 1px solid #23292c;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      position: sticky;
      top: 0;
      z-index: 999;
    }
    .topbar-left {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .portal-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #ffffff;
    }
    .mineral-dot {
      width: 12px;
      height: 12px;
      background-color: #48a380;
      border-radius: 2px;
    }
    .portal-brand strong {
      font-size: 1.15rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .portal-brand strong span {
      color: #48a380;
    }
    .portal-label {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #8c979a;
      background: #23292c;
      padding: 2px 6px;
      border-radius: 3px;
    }
    .demo-badge {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: #f1c40f;
      background: rgba(241, 196, 15, 0.1);
      border: 1px solid rgba(241, 196, 15, 0.25);
      padding: 0.25rem 0.6rem;
      border-radius: 4px;
    }
    .pulse-indicator {
      width: 6px;
      height: 6px;
      background-color: #f1c40f;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.2); }
      100% { opacity: 1; transform: scale(1); }
    }
    .topbar-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .user-pill {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: #23292c;
      padding: 0.3rem 0.75rem;
      border-radius: var(--radius-sm);
      border: 1px solid #2d3538;
    }
    .user-avatar {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--color-accent);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 700;
    }
    .user-info {
      display: flex;
      flex-direction: column;
    }
    .user-name {
      font-size: 0.82rem;
      font-weight: 600;
      color: #ffffff;
      line-height: 1.1;
    }
    .user-org {
      font-size: 0.68rem;
      color: #8c979a;
    }
    .portal-main {
      display: flex;
      flex: 1;
    }
    .portal-sidebar {
      width: 250px;
      background: #ffffff;
      border-right: 1px solid var(--color-border-subtle);
      padding: 1.5rem 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }
    .nav-section {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .nav-header {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--color-text-subtle);
      padding: 0 0.75rem 0.4rem;
    }
    .side-link {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      padding: 0.55rem 0.75rem;
      font-size: 0.86rem;
      font-weight: 500;
      color: var(--color-text-muted);
      border-radius: var(--radius-sm);
      transition: all 0.15s ease;
    }
    .side-link:hover {
      background-color: var(--color-bg-subtle);
      color: var(--color-text-main);
    }
    .side-link.active {
      background-color: var(--color-accent-subtle);
      color: var(--color-accent);
      font-weight: 600;
    }
    .portal-content {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
    }
    @media (max-width: 1024px) {
      .portal-sidebar {
        width: 70px;
        padding: 1rem 0.25rem;
      }
      .nav-header, .side-link span, .user-info {
        display: none;
      }
      .side-link {
        justify-content: center;
      }
    }
  `]
})
export class PortalLayoutComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
