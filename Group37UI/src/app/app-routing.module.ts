import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { PurposePageComponent } from './purpose-page/purpose-page.component';
//import { MatrimonialDashboardComponent } from './matrimonial-dashboard/matrimonial-dashboard.component';
import { SocialDashboardComponent } from './social/social-dashboard.component';
//import { JobDashboardComponent } from './job-dashboard/job-dashboard.component';
import { QuestionsDashboardComponent } from './questions-dashboard/questions-dashboard.component';
import { ProfilePageComponent } from './profile/profile.component';
import { PurposeComponent } from './purpose/purpose-component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  
  { path: 'dashboard/social', component: SocialDashboardComponent },
  { path: 'questions', component: QuestionsDashboardComponent },
  {path:'profile',component:ProfilePageComponent },
  {path:'',component:HomeComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

