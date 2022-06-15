import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToOrganisePage } from './to-organise.page';

const routes: Routes = [
  {
    path: '',
    component: ToOrganisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToOrganisePageRoutingModule {}
