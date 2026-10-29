import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="site-header">
      <div class="container-wide nav-container">
        
        <!-- Brand Logo & Badge -->
        <a routerLink="/" class="brand-logo" title="SthiraX Home">
          <div class="logo-icon-badge">
            <svg viewBox="0 0 64 64" width="34" height="34" class="brand-svg">
              <defs>
                <linearGradient id="nbBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0F172A"/>
                  <stop offset="100%" stop-color="#022C22"/>
                </linearGradient>
                <linearGradient id="nbEm" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#34D399"/>
                  <stop offset="100%" stop-color="#059669"/>
                </linearGradient>
                <linearGradient id="nbCry" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#38BDF8"/>
                  <stop offset="100%" stop-color="#0284C7"/>
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#nbBg)" stroke="#1E293B" stroke-width="2"/>
              <rect x="6" y="6" width="52" height="52" rx="12" fill="none" stroke="#334155" stroke-width="1" stroke-opacity="0.4"/>
              <path d="M18 16 L27 16 L46 48 L37 48 Z" fill="url(#nbCry)"/>
              <path d="M46 16 L37 16 L18 48 L27 48 Z" fill="url(#nbEm)"/>
              <path d="M22 20 C22 17 40 17 42 22 L35 25 C34 23 28 23 28 25 C28 28 42 27 42 35 C42 42 24 43 21 37 L28 34 C29 36 35 36 35 34 C35 31 22 32 22 20 Z" fill="#F8FAFC" opacity="0.95"/>
              <circle cx="32" cy="32" r="4.5" fill="#FFFFFF"/>
              <circle cx="32" cy="32" r="3" fill="#10B981"/>
              <circle cx="33" cy="31" r="1" fill="#FFFFFF"/>
              <circle cx="15" cy="15" r="2" fill="#10B981" opacity="0.8"/>
              <circle cx="49" cy="49" r="2" fill="#38BDF8" opacity="0.8"/>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-name">STHIRA<span>X</span></span>
          </div>
          <span class="brand-badge-pill">PILOT</span>
        </a>

        <!-- Streamlined Desktop Navigation (5 High-Hierarchy Items) -->
        <nav class="main-nav" [class.open]="mobileMenuOpen">
          
          <!-- Dropdown 1: Solutions -->
          <div class="nav-dropdown">
            <button class="dropdown-trigger" type="button">
              Solutions
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="dropdown-menu">
              <a routerLink="/solutions/manufacturers" (click)="mobileMenuOpen = false">
                <strong>For Precast Manufacturers</strong>
                <span>Turnkey curing skid retrofits, testing & capacity onboarding</span>
              </a>
              <a routerLink="/solutions/co2-suppliers" (click)="mobileMenuOpen = false">
                <strong>For Industrial CO₂ Suppliers</strong>
                <span>Biogenic & industrial flue-gas capture offtake routing</span>
              </a>
              <a routerLink="/technology" (click)="mobileMenuOpen = false">
                <strong>Technology & Kinetics</strong>
                <span>Accelerated mineralization reaction & mass balance</span>
              </a>
            </div>
          </div>

          <!-- Dropdown 2: Products & Trace -->
          <div class="nav-dropdown">
            <button class="dropdown-trigger" type="button">
              Products & Trace
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="dropdown-menu">
              <a routerLink="/materials" (click)="mobileMenuOpen = false">
                <strong>Precast Materials Catalogue</strong>
                <span>Interlocking pavers, solid masonry blocks & kerbstones</span>
              </a>
              <a routerLink="/trace" (click)="mobileMenuOpen = false">
                <strong>SthiraX Trace™ Passports</strong>
                <span>Batch-level digital passports with verified SHA-256 proofs</span>
              </a>
            </div>
          </div>

          <!-- Direct Item 3: Docs & Flows Hub -->
          <a routerLink="/docs" routerLinkActive="active" (click)="mobileMenuOpen = false" class="nav-item-link">
            Docs & Flows
          </a>

          <!-- Direct Item 4: Tools & Calculators -->
          <a routerLink="/tools" routerLinkActive="active" (click)="mobileMenuOpen = false" class="nav-item-link">
            Calculators
          </a>

          <!-- Dropdown 5: Company -->
          <div class="nav-dropdown">
            <button class="dropdown-trigger" type="button">
              Company
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="dropdown-menu">
              <a routerLink="/team" (click)="mobileMenuOpen = false">
                <strong>Founders & Operations Team</strong>
                <span>Engineering, refinery & operations leadership</span>
              </a>
              <a routerLink="/about" (click)="mobileMenuOpen = false">
                <strong>About SthiraX</strong>
                <span>Mission, operating principles & ESG governance</span>
              </a>
              <a routerLink="/regulatory" (click)="mobileMenuOpen = false">
                <strong>Standards & Regulations</strong>
                <span>IS 15658, IS 2185 & CPCB C&D Waste Rules, 2025</span>
              </a>
              <a routerLink="/roadmap" (click)="mobileMenuOpen = false">
                <strong>Industrial Roadmap</strong>
                <span>Phase milestones & pilot validation timeline</span>
              </a>
            </div>
          </div>

        </nav>

        <!-- Right Action Buttons -->
        <div class="nav-actions">
          <a routerLink="/contact" class="btn btn-secondary btn-sm">Request Quote</a>
          <a *ngIf="!authService.isAuthenticated()" routerLink="/login" class="btn btn-primary btn-sm">Portal Login</a>
          <a *ngIf="authService.isAuthenticated()" routerLink="/app/dashboard" class="btn btn-dark btn-sm">Operations Console</a>

          <!-- Mobile Hamburger Toggle -->
          <button class="mobile-toggle" (click)="mobileMenuOpen = !mobileMenuOpen" aria-label="Toggle navigation">
            <svg *ngIf="!mobileMenuOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            <svg *ngIf="mobileMenuOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

      </div>
    </header>
  `,
  styles: [`
    .site-header {
      background-color: #ffffff;
      border-bottom: 1px solid #E2E8F0;
      position: sticky;
      top: 0;
      z-index: 1000;
      height: 64px;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    }
    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      gap: 1.5rem;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      text-decoration: none;
      flex-shrink: 0;
    }
    .logo-icon-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 34px;
      height: 34px;
    }
    .brand-svg {
      display: block;
      width: 34px;
      height: 34px;
      border-radius: 9px;
    }
    .brand-name {
      font-size: 1.2rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #0F172A;
      display: block;
      line-height: 1;
      white-space: nowrap;
    }
    .brand-name span {
      color: #059669;
    }
    .brand-badge-pill {
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      background-color: #ECFDF5;
      color: #059669;
      border: 1px solid #A7F3D0;
      padding: 0.15rem 0.45rem;
      border-radius: 9999px;
      line-height: 1;
      text-transform: uppercase;
    }

    /* Main Navigation Layout */
    .main-nav {
      display: flex;
      align-items: center;
      gap: 1.75rem;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .main-nav a.nav-item-link {
      font-size: 0.875rem;
      font-weight: 500;
      color: #475569;
      transition: color 0.15s ease;
      padding: 0.4rem 0;
      text-decoration: none;
    }
    .main-nav a.nav-item-link:hover, .main-nav a.nav-item-link.active {
      color: #059669;
      font-weight: 600;
    }

    /* Dropdowns */
    .nav-dropdown {
      position: relative;
    }
    .dropdown-trigger {
      font-size: 0.875rem;
      font-weight: 500;
      color: #475569;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.4rem 0;
      transition: color 0.15s ease;
    }
    .dropdown-trigger:hover {
      color: #059669;
    }
    .dropdown-menu {
      position: absolute;
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      width: 320px;
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 0.75rem;
      box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05);
      padding: 0.5rem;
      display: none;
      flex-direction: column;
      gap: 0.25rem;
      z-index: 100;
    }
    .nav-dropdown:hover .dropdown-menu {
      display: flex;
    }
    .dropdown-menu a {
      display: block;
      padding: 0.6rem 0.75rem;
      border-radius: 0.5rem;
      text-decoration: none;
      transition: background-color 0.12s ease;
    }
    .dropdown-menu a:hover {
      background-color: #F8FAFC;
    }
    .dropdown-menu a strong {
      display: block;
      font-size: 0.825rem;
      font-weight: 600;
      color: #0F172A;
      line-height: 1.25;
    }
    .dropdown-menu a span {
      display: block;
      font-size: 0.725rem;
      color: #64748B;
      margin-top: 0.2rem;
      line-height: 1.35;
    }

    /* Nav Actions */
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
    }

    /* Responsive Mobile Menu */
    @media (max-width: 1080px) {
      .mobile-toggle {
        display: block;
        color: #0F172A;
      }
      .main-nav {
        display: none;
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        background: #ffffff;
        border-bottom: 1px solid #E2E8F0;
        flex-direction: column;
        align-items: flex-start;
        padding: 1.25rem 1.5rem;
        gap: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
      }
      .main-nav.open {
        display: flex;
      }
      .nav-dropdown {
        width: 100%;
      }
      .dropdown-trigger {
        width: 100%;
        justify-content: space-between;
        padding: 0.5rem 0;
      }
      .dropdown-menu {
        position: static;
        transform: none;
        width: 100%;
        box-shadow: none;
        border: none;
        padding: 0.25rem 0 0.5rem 0.75rem;
        display: flex;
      }
    }
  `]
})
export class NavbarComponent {
  mobileMenuOpen = false;
  constructor(public authService: AuthService) {}
}
