import { Component} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {GameService} from '../../game.service';
import {User} from '../../user';
import {Game} from '../../game';
import {IonImg} from '@ionic/angular';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage {
  private currentUser: User;
  private games: Game[];
  private gamesMatrix = new Array<Array<Game>>();

  constructor(private authService: AuthService,
              private gameService: GameService
  ) { }
  // Refresh current user every time you enter the page
  async ionViewDidEnter() {
    this.currentUser = await this.authService.checkLogin();
    this.games = await this.gameService.getGames();
    this.createGameMatrix();
  }

  private createGameMatrix() {
    let j = 0;
    for ( let i = 0; i < this.games.length; i += 2 ) {
      this.gamesMatrix[j] = [this.games[i], this.games[i + 1]];
      j++;
    }
  }

  alertGame(game: Game) {
    console.log((game));
    // TODO: Create alert to confirm changes
  }
}
