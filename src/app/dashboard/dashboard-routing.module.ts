import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SurveyComponent } from './survey/survey.component';
import { BlogComponent } from './blog/blog.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'blog', pathMatch: 'full' },
      { path: 'main', component: MainComponent },
      { path: 'survey', component: SurveyComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'index', component: IndexComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
