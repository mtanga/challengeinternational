import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoldePageRoutingModule } from './solde-routing.module';

import { SoldePage } from './solde.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoldePageRoutingModule
  ],
  declarations: [SoldePage]
})
export class SoldePageModule {}
