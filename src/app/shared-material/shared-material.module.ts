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
  MatMenuModule
} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatIconModule, MatButtonModule, MatButtonToggleModule,
    MatRippleModule, MatSidenavModule, MatToolbarModule, MatListModule,
    MatMenuModule
  ],
  exports: [MatButtonModule, MatIconModule, MatButtonModule, MatButtonToggleModule,
     MatRippleModule, MatSidenavModule, MatToolbarModule, MatListModule,
     MatMenuModule
    ]
})
export class SharedMaterialModule { }
