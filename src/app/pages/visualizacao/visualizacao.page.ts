import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.page.html',
  styleUrls: ['./visualizacao.page.scss'],
})
export class VisualizacaoPage implements OnInit {

  revista: any;

  constructor(
    public navController: NavController,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.revista = this.router.getCurrentNavigation().extras.state.revista;
    }
  }

  ngOnInit() {
  }

}
