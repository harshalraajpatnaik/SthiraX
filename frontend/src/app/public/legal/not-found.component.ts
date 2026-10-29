import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-404">
      <div class="container not-found-content">
        <span class="error-code">404</span>
        <h1 class="error-title">Page or Record Not Found</h1>
        <p class="error-desc">
          The requested route, material specification, or digital batch passport does not exist or has been relocated within the SthiraX platform.
        </p>
        <div class="error-actions">
          <a routerLink="/" class="btn btn-primary">Return to Homepage</a>
          <a routerLink="/materials" class="btn btn-secondary">Material Catalogue</a>
          <a routerLink="/trace" class="btn btn-secondary">SthiraX Trace Passports</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-404 {
      padding: 6rem 0;
      text-align: center;
    }
    .not-found-content {
      max-width: 600px;
      margin: 0 auto;
    }
    .error-code {
      font-size: 5rem;
      font-weight: 800;
      color: var(--color-border-medium);
      line-height: 1;
      display: block;
      margin-bottom: 1rem;
    }
    .error-title {
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-text-main);
      margin-bottom: 1rem;
    }
    .error-desc {
      font-size: 1rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .error-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
  `]
})
export class NotFoundComponent {}
