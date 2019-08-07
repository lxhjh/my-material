import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatIconModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatRippleModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatMenuModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatIconModule, MatButtonModule, MatButtonToggleModule,
    MatRippleModule, MatSidenavModule, MatToolbarModule, MatListModule,
    MatMenuModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [MatButtonModule, MatIconModule, MatButtonModule, MatButtonToggleModule,
    MatRippleModule, MatSidenavModule, MatToolbarModule, MatListModule,
    MatMenuModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SharedMaterialModule { }
