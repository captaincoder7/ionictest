import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToOrganisePageRoutingModule } from './to-organise-routing.module';

import { ToOrganisePage } from './to-organise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToOrganisePageRoutingModule
  ],
  declarations: [ToOrganisePage]
})
export class ToOrganisePageModule {}
