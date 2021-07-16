import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizacaoPageRoutingModule } from './visualizacao-routing.module';

import { VisualizacaoPage } from './visualizacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizacaoPageRoutingModule
  ],
  declarations: [VisualizacaoPage]
})
export class VisualizacaoPageModule {}
