import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { PurposePageComponent } from './purpose-page/purpose-page.component';
import { MatrimonialComponent } from './matrimonial/matrimonial-dashboard.component';
import { SocialDashboardComponent } from './social/social-dashboard.component';
//import { JobDashboardComponent } from './job-dashboard/job-dashboard.component';
import { QuestionsDashboardComponent } from './questions-dashboard/questions-dashboard.component';
import { ProfilePageComponent } from './profile/profile.component';
import { PurposeComponent } from './purpose/purpose-component';
import { JobDashboardComponent } from './job/job.component';
const routes: Routes = [
  
  { path: 'dashboard/social', component: SocialDashboardComponent },
  { path: 'questions', component: QuestionsDashboardComponent },
  {path:'profile',component:ProfilePageComponent },
  {path:'',component:PurposeComponent},
  {path:'dashboard/matrimonial',component: MatrimonialComponent},
  {path:'dashboard/job-search',component: JobDashboardComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

