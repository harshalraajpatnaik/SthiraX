import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="page-login">
      <div class="login-box card">
        <div class="login-header">
          <a routerLink="/" class="login-brand">
            <span class="mineral-cube"></span>
            <strong>STHIRA<span>X</span></strong>
          </a>
          <h2>Operations Portal Sign-In</h2>
          <p>Restricted access for authorized plant partners, review engineers, and operations managers.</p>
        </div>

        <div class="alert alert-danger" *ngIf="errorMessage">
          {{ errorMessage }}
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" formControlName="email" class="form-control" placeholder="user@sthirax.com">
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" formControlName="password" class="form-control" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;">
          </div>

          <button type="submit" class="btn btn-primary btn-block" [disabled]="loginForm.invalid || isLoading">
            <span *ngIf="!isLoading">Sign In to Operations Console</span>
            <span *ngIf="isLoading">Authenticating...</span>
          </button>
        </form>

        <!-- Fast Role Selection for Prototype Evaluation -->
        <div class="quick-roles-box">
          <span class="qr-title">Fast Role Switcher (Prototype Demo):</span>
          <div class="roles-btn-grid">
            <button type="button" class="role-btn" (click)="fillRole('admin')">
              <strong>Admin</strong>
              <small>Harshal Raaj Patnaik</small>
            </button>
            <button type="button" class="role-btn" (click)="fillRole('ops')">
              <strong>Ops Lead</strong>
              <small>Sai Nikhil Y</small>
            </button>
            <button type="button" class="role-btn" (click)="fillRole('quality')">
              <strong>QA Reviewer</strong>
              <small>Shashank Verma</small>
            </button>
            <button type="button" class="role-btn" (click)="fillRole('operator')">
              <strong>Plant Operator</strong>
              <small>Hitesh Jain (Hosur)</small>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-login {
      min-height: 85vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem 1.5rem;
    }
    .login-box {
      width: 100%;
      max-width: 480px;
      background: #ffffff;
      border: 1px solid var(--color-border-medium);
      border-radius: var(--radius-md);
      padding: 2.5rem;
      box-shadow: var(--shadow-elevation);
    }
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .login-brand {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-text-main);
      margin-bottom: 1rem;
    }
    .mineral-cube {
      width: 16px;
      height: 16px;
      background: var(--color-accent);
      border-radius: 2px;
    }
    .login-brand strong {
      font-size: 1.3rem;
      font-weight: 800;
    }
    .login-brand strong span {
      color: var(--color-accent);
    }
    .login-header h2 {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.35rem;
    }
    .login-header p {
      font-size: 0.84rem;
      color: var(--color-text-muted);
      line-height: 1.5;
    }
    .btn-block {
      width: 100%;
      padding: 0.75rem;
      font-size: 0.95rem;
      margin-top: 0.5rem;
    }
    .quick-roles-box {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--color-border-subtle);
    }
    .qr-title {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--color-text-subtle);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 0.75rem;
      text-align: center;
    }
    .roles-btn-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }
    .role-btn {
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-subtle);
      padding: 0.5rem 0.6rem;
      border-radius: var(--radius-sm);
      text-align: left;
      transition: all 0.15s ease;
    }
    .role-btn:hover {
      border-color: var(--color-accent);
      background: var(--color-accent-subtle);
    }
    .role-btn strong {
      display: block;
      font-size: 0.8rem;
      color: var(--color-text-main);
    }
    .role-btn small {
      display: block;
      font-size: 0.68rem;
      color: var(--color-text-subtle);
    }
    .alert {
      padding: 0.75rem 1rem;
      border-radius: var(--radius-sm);
      margin-bottom: 1.25rem;
      font-size: 0.84rem;
    }
    .alert-danger {
      background: var(--color-status-danger-bg);
      border: 1px solid rgba(164, 35, 35, 0.2);
      color: var(--color-status-danger);
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      email: ['admin@sthirax.com', [Validators.required, Validators.email]],
      password: ['SthiraX#Admin2026', Validators.required]
    });
  }

  fillRole(role: string): void {
    if (role === 'admin') {
      this.loginForm.setValue({ email: 'admin@sthirax.com', password: 'SthiraX#Admin2026' });
    } else if (role === 'ops') {
      this.loginForm.setValue({ email: 'ops@sthirax.com', password: 'SthiraX#Ops2026' });
    } else if (role === 'quality') {
      this.loginForm.setValue({ email: 'quality@sthirax.com', password: 'SthiraX#Quality2026' });
    } else if (role === 'operator') {
      this.loginForm.setValue({ email: 'operator@prakriti.com', password: 'Prakriti#Plant2026' });
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.auth.login(this.loginForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/app/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Authentication failed. Please check credentials.';
      }
    });
  }
}
