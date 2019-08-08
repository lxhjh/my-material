import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { SurveyComponent } from './survey/survey.component';
import { BlogComponent } from './blog/blog.component';


@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    SurveyComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
