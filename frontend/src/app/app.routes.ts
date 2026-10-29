import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

// Shared Layout
import { PortalLayoutComponent } from './shared/components/portal-layout.component';

// Public Pages
import { HomeComponent } from './public/home/home.component';
import { MaterialsComponent } from './public/materials/materials.component';
import { ProductDetailComponent } from './public/product-detail/product-detail.component';
import { ManufacturersComponent } from './public/solutions/manufacturers.component';
import { Co2SuppliersComponent } from './public/solutions/co2-suppliers.component';
import { TechnologyComponent } from './public/technology/technology.component';
import { TraceComponent } from './public/trace/trace.component';
import { PassportComponent } from './public/passport/passport.component';
import { ToolsComponent } from './public/tools/tools.component';
import { RoadmapComponent } from './public/roadmap/roadmap.component';
import { AboutComponent } from './public/about/about.component';
import { TeamComponent } from './public/team/team.component';
import { DocsComponent } from './public/docs/docs.component';
import { RegulatoryComponent } from './public/regulatory/regulatory.component';
import { ContactComponent } from './public/contact/contact.component';
import { PilotComponent } from './public/contact/pilot.component';
import { PrivacyComponent } from './public/legal/privacy.component';
import { DisclosuresComponent } from './public/legal/disclosures.component';
import { LoginComponent } from './public/legal/login.component';
import { NotFoundComponent } from './public/legal/not-found.component';

// Portal Components
import { DashboardComponent } from './portal/dashboard/dashboard.component';
import { ApprovalsComponent } from './portal/approvals/approvals.component';
import { PlantsComponent } from './portal/plants/plants.component';
import { SuppliersComponent } from './portal/co2-suppliers/suppliers.component';
import { OrdersComponent } from './portal/orders/orders.component';
import { LogisticsComponent } from './portal/logistics/logistics.component';
import { BatchesComponent } from './portal/batches/batches.component';
import { QualityComponent } from './portal/quality/quality.component';
import { TraceAdminComponent } from './portal/trace-admin/trace-admin.component';
import { CostingPortalComponent } from './portal/costing/costing-portal.component';
import { CarbonOfftakeComponent } from './portal/carbon-offtake/carbon-offtake.component';
import { AuditLogComponent } from './portal/audit-log/audit-log.component';

export const routes: Routes = [
  // Public Corporate Website Routes
  { path: '', component: HomeComponent, title: 'SthiraX | Distributed CO₂-Mineralization Precast Platform' },
  { path: 'materials', component: MaterialsComponent, title: 'Materials & Products | SthiraX' },
  { path: 'materials/:slug', component: ProductDetailComponent, title: 'Product Specification | SthiraX' },
  { path: 'solutions/manufacturers', component: ManufacturersComponent, title: 'Precast Manufacturer Retrofit Program | SthiraX' },
  { path: 'solutions/co2-suppliers', component: Co2SuppliersComponent, title: 'CO₂ Industrial Emitter Offtake | SthiraX' },
  { path: 'technology', component: TechnologyComponent, title: 'CO₂ Mineralization Technology & Process | SthiraX' },
  { path: 'trace', component: TraceComponent, title: 'SthiraX Trace™ Digital Product Passport | SthiraX' },
  { path: 'trace/:id', component: PassportComponent, title: 'Digital Product Passport Verification | SthiraX Trace' },
  { path: 'passports', redirectTo: 'trace', pathMatch: 'full' },
  { path: 'passport', redirectTo: 'trace', pathMatch: 'full' },
  { path: 'passports/:id', component: PassportComponent, title: 'Digital Product Passport Verification | SthiraX Trace' },
  { path: 'passport/:id', component: PassportComponent, title: 'Digital Product Passport Verification | SthiraX Trace' },
  { path: 'tools', component: ToolsComponent, title: 'Decision Support & Feasibility Calculators | SthiraX' },
  { path: 'roadmap', component: RoadmapComponent, title: 'Technology & Industrial Scale-up Roadmap | SthiraX' },
  { path: 'about', component: AboutComponent, title: 'About SthiraX | Mission & Governance' },
  { path: 'team', component: TeamComponent, title: 'Leadership & Engineering Team | SthiraX' },
  { path: 'docs', component: DocsComponent, title: 'Knowledge Base, Architecture & Flows | SthiraX' },
  { path: 'architecture', redirectTo: 'docs', pathMatch: 'full' },
  { path: 'knowledge', redirectTo: 'docs', pathMatch: 'full' },
  { path: 'flows', redirectTo: 'docs', pathMatch: 'full' },
  { path: 'regulatory', component: RegulatoryComponent, title: 'Regulatory Compliance & Indian Standards | SthiraX' },
  { path: 'contact', component: ContactComponent, title: 'Commercial Enquiries & Offtake | SthiraX' },
  { path: 'pilot', component: PilotComponent, title: 'Hosur Pilot Validation Facility | SthiraX' },
  { path: 'privacy', component: PrivacyComponent, title: 'Privacy Policy | SthiraX' },
  { path: 'disclosures', component: DisclosuresComponent, title: 'Scientific & Environmental Disclosures | SthiraX' },
  { path: 'login', component: LoginComponent, title: 'Operations Console Login | SthiraX' },

  // Authenticated Industrial Operations Portal
  {
    path: 'app',
    component: PortalLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, title: 'Operations Dashboard | SthiraX Console' },
      { path: 'approvals', component: ApprovalsComponent, title: 'Partner Approvals | SthiraX Console' },
      { path: 'plants', component: PlantsComponent, title: 'Precast Plant Network | SthiraX Console' },
      { path: 'co2-suppliers', component: SuppliersComponent, title: 'CO₂ Supply Sources | SthiraX Console' },
      { path: 'orders', component: OrdersComponent, title: 'Orders & Quotations | SthiraX Console' },
      { path: 'logistics', component: LogisticsComponent, title: 'CO₂ Cryogenic Logistics | SthiraX Console' },
      { path: 'batches', component: BatchesComponent, title: 'Production Batches & Curing | SthiraX Console' },
      { path: 'quality', component: QualityComponent, title: 'Quality Assurance & Break Tests | SthiraX Console' },
      { path: 'trace', component: TraceAdminComponent, title: 'SthiraX Trace™ Passports | SthiraX Console' },
      { path: 'trace-admin', component: TraceAdminComponent, title: 'SthiraX Trace™ Passports | SthiraX Console' },
      { path: 'costing', component: CostingPortalComponent, title: 'Unit Economics & Margins | SthiraX Console' },
      { path: 'carbon-offtake', component: CarbonOfftakeComponent, title: 'Carbon Offtake Registry | SthiraX Console' },
      { path: 'regulatory', component: RegulatoryComponent, title: 'Regulatory Compliance Library | SthiraX Console' },
      { path: 'audit-log', component: AuditLogComponent, title: 'Governance Audit Trail | SthiraX Console' },
    ]
  },

  // Fallback 404 Route
  { path: '**', component: NotFoundComponent, title: 'Page Not Found | SthiraX' }
];
