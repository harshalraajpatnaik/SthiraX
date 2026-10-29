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
        <a routerLink="/" class="brand-logo">
          <div class="logo-mark">
            <span class="mineral-cube"></span>
          </div>
          <div class="brand-text">
            <span class="brand-name">STHIRA<span>X</span></span>
            <span class="brand-tag">CO₂ MINERALIZATION PLATFORM</span>
          </div>
        </a>

        <nav class="main-nav" [class.open]="mobileMenuOpen">
          <a routerLink="/materials" routerLinkActive="active" (click)="mobileMenuOpen = false">Materials</a>
          <a routerLink="/technology" routerLinkActive="active" (click)="mobileMenuOpen = false">Technology</a>
          
          <div class="nav-dropdown">
            <button class="dropdown-trigger">
              Solutions
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="dropdown-menu">
              <a routerLink="/solutions/manufacturers" (click)="mobileMenuOpen = false">
                <strong>For Precast Manufacturers</strong>
                <span>Plant retrofit skids, technical validation & capacity onboarding</span>
              </a>
              <a routerLink="/solutions/co2-suppliers" (click)="mobileMenuOpen = false">
                <strong>For Industrial CO₂ Suppliers</strong>
                <span>Captured biogenic & industrial supply off-take routing</span>
              </a>
            </div>
          </div>

          <a routerLink="/trace" routerLinkActive="active" (click)="mobileMenuOpen = false">SthiraX Trace</a>
          <a routerLink="/tools" routerLinkActive="active" (click)="mobileMenuOpen = false">Tools & Calculators</a>
          <a routerLink="/roadmap" routerLinkActive="active" (click)="mobileMenuOpen = false">Roadmap</a>
          <a routerLink="/regulatory" routerLinkActive="active" (click)="mobileMenuOpen = false">Regulatory</a>
          <a routerLink="/team" routerLinkActive="active" (click)="mobileMenuOpen = false">Team</a>
          <a routerLink="/about" routerLinkActive="active" (click)="mobileMenuOpen = false">About</a>
        </nav>

        <div class="nav-actions">
          <a routerLink="/contact" class="btn btn-secondary btn-sm">Request Quote</a>
          <a *ngIf="!authService.isAuthenticated()" routerLink="/login" class="btn btn-primary btn-sm">Portal Login</a>
          <a *ngIf="authService.isAuthenticated()" routerLink="/app/dashboard" class="btn btn-dark btn-sm">Operations Portal</a>

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
      border-bottom: 1px solid var(--color-border-subtle);
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }
    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .mineral-cube {
      display: inline-block;
      width: 18px;
      height: 18px;
      background: linear-gradient(135deg, var(--color-accent) 0%, #1a3a2d 100%);
      border-radius: 3px;
      box-shadow: 2px 2px 0px var(--color-mineral-sand);
    }
    .brand-name {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--color-text-main);
      display: block;
      line-height: 1;
    }
    .brand-name span {
      color: var(--color-accent);
    }
    .brand-tag {
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--color-text-subtle);
      display: block;
      margin-top: 2px;
    }
    .main-nav {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .main-nav a {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-text-muted);
      transition: color 0.15s ease;
      padding: 0.4rem 0;
    }
    .main-nav a:hover, .main-nav a.active {
      color: var(--color-accent);
    }
    .nav-dropdown {
      position: relative;
    }
    .dropdown-trigger {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-text-muted);
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.4rem 0;
    }
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      width: 320px;
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-card);
      padding: 0.75rem;
      display: none;
      flex-direction: column;
      gap: 0.5rem;
    }
    .nav-dropdown:hover .dropdown-menu {
      display: flex;
    }
    .dropdown-menu a {
      display: block;
      padding: 0.5rem 0.6rem;
      border-radius: var(--radius-sm);
    }
    .dropdown-menu a:hover {
      background-color: var(--color-bg-subtle);
    }
    .dropdown-menu a strong {
      display: block;
      font-size: 0.85rem;
      color: var(--color-text-main);
    }
    .dropdown-menu a span {
      display: block;
      font-size: 0.75rem;
      color: var(--color-text-subtle);
      margin-top: 2px;
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .mobile-toggle {
      display: none;
    }
    @media (max-width: 1024px) {
      .mobile-toggle {
        display: block;
        color: var(--color-text-main);
      }
      .main-nav {
        display: none;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: #ffffff;
        border-bottom: 1px solid var(--color-border-subtle);
        flex-direction: column;
        align-items: flex-start;
        padding: 1.5rem;
        gap: 1rem;
      }
      .main-nav.open {
        display: flex;
      }
      .dropdown-menu {
        position: static;
        width: 100%;
        box-shadow: none;
        border: none;
        padding-left: 1rem;
      }
    }
  `]
})
export class NavbarComponent {
  mobileMenuOpen = false;
  constructor(public authService: AuthService) {}
}
