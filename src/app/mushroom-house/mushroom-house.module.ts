import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MushroomHousePageRoutingModule } from './mushroom-house-routing.module';

import { MushroomHousePage } from './mushroom-house.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MushroomHousePageRoutingModule
  ],
  declarations: [MushroomHousePage]
})
export class MushroomHousePageModule {}
