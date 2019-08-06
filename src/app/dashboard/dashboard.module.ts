import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SharedMaterialModule } from '../shared-material/shared-material.module';


@NgModule({
  declarations: [MainComponent, DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedMaterialModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
