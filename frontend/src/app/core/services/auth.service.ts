import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap, catchError } from 'rxjs';
import { UserSession } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';
  private currentSessionSubject = new BehaviorSubject<UserSession | null>(this.getStoredSession());
  public currentSession$ = this.currentSessionSubject.asObservable();

  constructor(private http: HttpClient) {}

  public get currentSession(): UserSession | null {
    return this.currentSessionSubject.value;
  }

  public isAuthenticated(): boolean {
    return !!this.currentSession;
  }

  public hasRole(role: string): boolean {
    const session = this.currentSession;
    if (!session || !session.roles) return false;
    return session.roles.includes(role) || session.roles.includes('ADMIN');
  }

  login(credentials: { email: string; password: string }): Observable<UserSession> {
    return this.http.post<UserSession>(`${this.baseUrl}/login`, credentials).pipe(
      tap(session => this.setSession(session)),
      catchError(() => {
        // Fallback local bootstrap validation for offline prototype testing
        const email = credentials.email.toLowerCase().trim();
        const pwd = credentials.password;

        if (email === 'admin@sthirax.com' && pwd === 'SthiraX#Admin2026') {
          const s: UserSession = {
            token: 'mock-admin-token',
            userId: 'usr-admin-1',
            email: 'admin@sthirax.com',
            fullName: 'Harshal Raaj Patnaik',
            organisationId: 'org-sthirax-core',
            organisationName: 'SthiraX Technologies Pvt Ltd',
            roles: ['ADMIN', 'OPERATIONS_MANAGER']
          };
          this.setSession(s);
          return of(s);
        } else if (email === 'quality@sthirax.com' && pwd === 'SthiraX#Quality2026') {
          const s: UserSession = {
            token: 'mock-quality-token',
            userId: 'usr-quality-1',
            email: 'quality@sthirax.com',
            fullName: 'Shashank Verma',
            organisationId: 'org-sthirax-core',
            organisationName: 'SthiraX Technologies Pvt Ltd',
            roles: ['QUALITY_REVIEWER']
          };
          this.setSession(s);
          return of(s);
        } else if (email === 'ops@sthirax.com' && pwd === 'SthiraX#Ops2026') {
          const s: UserSession = {
            token: 'mock-ops-token',
            userId: 'usr-ops-1',
            email: 'ops@sthirax.com',
            fullName: 'Sai Nikhil Y',
            organisationId: 'org-sthirax-core',
            organisationName: 'SthiraX Technologies Pvt Ltd',
            roles: ['OPERATIONS_MANAGER']
          };
          this.setSession(s);
          return of(s);
        } else if (email === 'operator@prakriti.com' && pwd === 'Prakriti#Plant2026') {
          const s: UserSession = {
            token: 'mock-op-token',
            userId: 'usr-operator-1',
            email: 'operator@prakriti.com',
            fullName: 'Hitesh Jain',
            organisationId: 'org-prakriti-precast',
            organisationName: 'Prakriti Precast Elements LLP',
            roles: ['PLANT_OPERATOR']
          };
          this.setSession(s);
          return of(s);
        }

        throw new Error('Invalid email or password');
      })
    );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('sthirax_session');
    }
    this.currentSessionSubject.next(null);
  }

  private setSession(session: UserSession): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('sthirax_session', JSON.stringify(session));
    }
    this.currentSessionSubject.next(session);
  }

  private getStoredSession(): UserSession | null {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('sthirax_session');
      if (data) {
        try {
          return JSON.parse(data);
        } catch {
          return null;
        }
      }
    }
    return null;
  }
}
