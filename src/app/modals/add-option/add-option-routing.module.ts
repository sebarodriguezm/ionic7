import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOptionPage } from './add-option.page';

const routes: Routes = [
  {
    path: '',
    component: AddOptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOptionPageRoutingModule {}
