import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PurposePageComponent } from './purpose-page/purpose-page.component';
// import { MatrimonialDashboardComponent } from './matrimonial-dashboard/matrimonial-dashboard.component';
import { SocialDashboardComponent } from './social/social-dashboard.component';
// import { JobDashboardComponent } from './job-dashboard/job-dashboard.component';

const routes: Routes = [
  // { path: '', component: PurposePageComponent },
  // { path: 'dashboard/matrimonial', component: MatrimonialDashboardComponent },
  { path: 'dashboard/social', component: SocialDashboardComponent },
  // { path: 'dashboard/job', component: JobDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

