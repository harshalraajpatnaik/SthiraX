import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-team">
      <header class="page-header">
        <div class="container">
          <span class="section-tag">Leadership & Core Disciplines</span>
          <h1 class="page-title">SthiraX Founding & Operations Team</h1>
          <p class="page-subtitle">
            Multidisciplinary engineering, operations, chemical process, logistics, and digital platform leadership driving industrial carbon mineralization in India.
          </p>
        </div>
      </header>

      <section class="container content-section">
        <div class="team-grid">
          <div class="card member-card" *ngFor="let m of members">
            <div class="member-top">
              <div class="member-avatar">
                <span>{{ m.initials }}</span>
              </div>
              <div class="member-meta">
                <h3 class="member-name">{{ m.name }}</h3>
                <span class="member-role">{{ m.role }}</span>
                <span class="member-edu">{{ m.education }}</span>
              </div>
            </div>
            <p class="member-bio">{{ m.bio }}</p>
            <div class="member-domain">
              <span class="d-tag" *ngFor="let t of m.domains">{{ t }}</span>
            </div>
          </div>
        </div>

        <div class="card disclosure-card">
          <h4>Privacy & Directory Notice</h4>
          <p>
            Before public commercial deployment, core team profiles reflect verified technical backgrounds and professional experience provided for this project. Direct private phone numbers, personal email addresses, and third-party endorsements are omitted in compliance with privacy guidelines.
          </p>
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
    .team-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin-bottom: 3.5rem;
    }
    .member-card {
      background: #ffffff;
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      padding: 2rem;
      box-shadow: var(--shadow-subtle);
      display: flex;
      flex-direction: column;
    }
    .member-top {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      margin-bottom: 1.25rem;
    }
    .member-avatar {
      width: 56px;
      height: 56px;
      border-radius: var(--radius-md);
      background: var(--color-accent);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      font-weight: 800;
      flex-shrink: 0;
    }
    .member-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 2px;
    }
    .member-role {
      font-size: 0.85rem;
      color: var(--color-accent);
      font-weight: 600;
      display: block;
    }
    .member-edu {
      font-size: 0.75rem;
      color: var(--color-text-subtle);
      display: block;
    }
    .member-bio {
      font-size: 0.88rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .member-domain {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: auto;
    }
    .d-tag {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--color-text-subtle);
      background: var(--color-bg-base);
      padding: 3px 8px;
      border-radius: 3px;
      border: 1px solid var(--color-border-subtle);
    }
    .disclosure-card {
      background: var(--color-bg-base);
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-sm);
      padding: 1.5rem;
    }
    .disclosure-card h4 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.4rem;
    }
    .disclosure-card p {
      font-size: 0.82rem;
      color: var(--color-text-muted);
      line-height: 1.55;
      margin: 0;
    }
    @media (max-width: 900px) {
      .team-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TeamComponent {
  members = [
    {
      name: 'Sai Nikhil Y',
      initials: 'SN',
      role: 'Product Leadership & Operations',
      education: 'Mechanical Engineering Background',
      bio: '7 years as a product leader across logistics, retail intelligence, operations and manufacturing digitization. Mechanical Engineering background.',
      domains: ['Product Strategy', 'Logistics Operations', 'Manufacturing Digitization', 'Supply Chain Analytics']
    },
    {
      name: 'Hitesh Jain A',
      initials: 'HJ',
      role: 'Construction Materials & Plant Partnerships',
      education: 'Civil Engineering Graduate',
      bio: '8+ years into family business, Civil Engineering graduate, works in construction materials and construction activities.',
      domains: ['Civil Engineering', 'Construction Materials', 'Family Business Operations', 'Precast Activities']
    },
    {
      name: 'Shashank Verma',
      initials: 'SV',
      role: 'Engineering & Projects, Operations & Safety',
      education: 'Civil Engineering Background',
      bio: 'Holding 13+ years of experience in handling leading roles in Engineering & Projects, Operations cum Safety Officer and sales division of Bharat Petroleum Corporation Limited. Civil Engineering background.',
      domains: ['Engineering & Projects', 'Refinery Safety Officer', 'B2B Industrial Sales', 'Civil Infrastructure']
    },
    {
      name: 'Harshal Raaj Patnaik',
      initials: 'HP',
      role: 'Enterprise Technology & Platform Architecture',
      education: 'Computer Science and Engineering Background',
      bio: '5+ years in enterprise technology and digital transformation across cloud platforms, software engineering, and business solutions. Computer Science and Engineering background.',
      domains: ['Enterprise Technology', 'Digital Transformation', 'Cloud Platforms', 'Software Engineering']
    },
    {
      name: 'Pankaj Adhikari',
      initials: 'PA',
      role: 'Chemical Process & Refinery Operations',
      education: 'Chemical Engineering Graduate',
      bio: '12+ years of experience in refinery operations at Bharat Petroleum and Reliance Industries Limited. Chemical Engineering graduate.',
      domains: ['Refinery Operations', 'Chemical Engineering', 'Gas Processing', 'Industrial Safety']
    },
    {
      name: 'Lakshmi N Menon',
      initials: 'LM',
      role: 'Production, Content Integration & Media',
      education: 'LLB & PGD (Journalism & Mass Communication Graduate)',
      bio: '20 years of editorial and media production experience across Asianet News, The New Indian Express, and Jaihind TV, currently Manager, Production & Content Integration at AsiaNXT Digital, Kochi. LLB & PGD (Journalism & Mass Communication Graduate).',
      domains: ['Media Production', 'Content Integration', 'Legal Integration (LLB)', 'Communications Governance']
    }
  ];
}
