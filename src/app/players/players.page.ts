import { Component, OnInit } from '@angular/core';
import { AddplayerComponent } from './addplayer/addplayer.component';
import { PlayersService } from 'src/app/sdk/custom/players.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss']
})
export class PlayersPage implements OnInit {
  loading = false;
  players: Players[] = [];
  constructor(private playersService: PlayersService,
              private modalController: ModalController,
              private alertController: AlertController) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.loading = true;

    this.playersService.getAllPlayers().subscribe(
      data => {
        console.log('got response from server', data);
        this.loading = false;
        this.players = data.data.docs;
      },
      error => {
        this.loading = false;
        console.log('error', error);
      }
    );
  }
 async openAddModal() {
  const modal = await this.modalController.create({
    component: AddplayerComponent});
  return await modal.present();
}

// Intefacing is Optional
}
interface Players {
  name: string;
  ibn: string;
  image_url: string;
  skill: string;
  is_deleted: boolean;
}
