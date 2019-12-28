import { AddplayerComponent } from './addplayer/addplayer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlayersPageRoutingModule } from './players-routing.module';
import { PlayersPage } from './players.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayersPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PlayersPage, AddplayerComponent],
  entryComponents: [AddplayerComponent]
})
export class PlayersPageModule {}
