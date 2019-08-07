import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { SurveyComponent } from './survey/survey.component';


@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    SurveyComponent
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
