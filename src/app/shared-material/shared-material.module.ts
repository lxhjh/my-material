import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatIconModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatRippleModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule
} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatIconModule, MatButtonModule, MatButtonToggleModule,
    MatRippleModule, MatSidenavModule, MatToolbarModule, MatListModule
  ],
  exports: [MatButtonModule, MatIconModule, MatButtonModule, MatButtonToggleModule,
     MatRippleModule, MatSidenavModule, MatToolbarModule, MatListModule]
})
export class SharedMaterialModule { }
