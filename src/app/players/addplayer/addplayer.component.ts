import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlayersService } from 'src/app/sdk/custom/players.service';

@Component({
  selector: 'app-addplayer',
  templateUrl: './addplayer.component.html',
  styleUrls: ['./addplayer.component.scss']
})
export class AddplayerComponent implements OnInit {
  toastController: any;
  constructor(
    private playersService: PlayersService,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
  ) {}

  addPlayerForm: FormGroup;
  loading = false;

  @Input() player;
  ngOnInit() {
    this.formInitializer();
    if (this.player) {
      console.log('got player', this.player);
      this.addPlayerForm.patchValue(this.player);
    }
  }

  formInitializer() {
    this.addPlayerForm = this.formBuilder.group({
      _id: [null],
      name: [null, [Validators.required]],
      ibn: [null, [Validators.required]],
      skill: [null, [Validators.required]],
      is_deleted: [false, [Validators.required]],
      image_url: ['']
    });
  }
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
  save() {
    this.loading = true;

    if (this.player) {
      this.updatePlayer();
    } else {
      this.addPlayer();
    }


  }
addPlayer() {
  this.playersService.addPlayer(this.addPlayerForm.value).subscribe(
    async data => {
      console.log('got response from server', data);
      // tslint:disable-next-line: no-string-literal
      const name = this.addPlayerForm.controls['name'].value;
      const toast = await this.toastController.create({
        message: `${name} has been added successfully.`,
        duration: 3500
      });
      toast.present();
      this.loading = false;
      this.addPlayerForm.reset();
      this.modalCtrl.dismiss();
    },
    error => {
      this.loading = false;
      console.log('error', error);
    }
  );
}
updatePlayer() {
  this.playersService.updatePlayer(this.addPlayerForm.value).subscribe(
    async data => {
      console.log('got response from server', data);
      // tslint:disable-next-line: no-string-literal
      const name = this.addPlayerForm.controls['name'].value;
      const toast = await this.toastController.create({
        message: `${name} has been updated successfully.`,
        duration: 3500
      });
      toast.present();
      this.loading = false;
      this.addPlayerForm.reset();
      this.modalCtrl.dismiss();
    },
    error => {
      this.loading = false;
      console.log('error', error);
    }
  );
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
