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
  selectedPlayer: any;
  deleteLoading = false;
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
  openEditPopup(player: Players) {
    this.openAddModal(player);
  }

  async openAddModal(player?: Players) {
    const modal = await this.modalController.create({
      component: AddplayerComponent,
      componentProps: { player }
    });
    modal.onDidDismiss().then(data => {
      console.log('dismissed', data);
      this.getAll();
    });
    await modal.present();
  }
  async delete(player) {
    this.selectedPlayer = player;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete the player `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            this.deletePlayer();
          }
        }
      ]
    });
    await alert.present();
  }
  deletePlayer() {
    this.deleteLoading = true;
    this.playersService.deletePlayer(this.selectedPlayer._id).subscribe(
      data => {
        console.log('got response from server', data);
        this.deleteLoading = false;
        this.getAll();
      },
      error => {
        this.deleteLoading = false;
        console.log('error', error);
      }
    );
  }
}

// Intefacing is Optional

interface Players {
  name: string;
  ibn: string;
  image_url: string;
  skill: string;
  is_deleted: boolean;
}
