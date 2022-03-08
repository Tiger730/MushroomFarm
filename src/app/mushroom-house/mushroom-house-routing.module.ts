import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MushroomHousePage } from './mushroom-house.page';

const routes: Routes = [
  {
    path: '',
    component: MushroomHousePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MushroomHousePageRoutingModule {}
