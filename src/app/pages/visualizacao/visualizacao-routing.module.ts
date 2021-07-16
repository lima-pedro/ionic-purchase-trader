import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizacaoPage } from './visualizacao.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizacaoPageRoutingModule {}
