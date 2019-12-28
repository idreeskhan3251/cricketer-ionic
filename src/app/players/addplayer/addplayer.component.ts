import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addplayer',
  templateUrl: './addplayer.component.html',
  styleUrls: ['./addplayer.component.scss']
})
export class AddplayerComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder
  ) {}

  addPlayerForm: FormGroup;
  loading = false;

  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.addPlayerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      ibn: [null, [Validators.required]],
      skill: [null, [Validators.required]],
      is_deleted: [false, [Validators.required]],
      image_url: [null]
    });
  }

  save() {}

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
// Intefacing is Optional

interface Books {
  name: string;
  ibn: string;
  image_url: string;
  skill: string;
  is_deleted: boolean;
}
