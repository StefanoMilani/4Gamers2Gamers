import { Component} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {GameService} from '../../game.service';
import {User} from '../../user';
import {Game} from '../../game';
import {AlertController, IonImg} from '@ionic/angular';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage {
  private currentUser: User;
  private games: Game[];
  private gamesMatrix = new Array<Array<Game>>();
  private gameChanged = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private gameService: GameService,
              private alert: AlertController,
              private router: Router
  ) { }
  // Refresh current user every time you enter the page
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter() {
    this.currentUser = await this.authService.checkLogin();
    this.games = await this.gameService.getGames();
    this.createGameMatrix();
    this.gameChanged = false;
  }

  private createGameMatrix() {
    let j = 0;
    for ( let i = 0; i < this.games.length; i += 2 ) {
      this.gamesMatrix[j] = [this.games[i], this.games[i + 1]];
      j++;
    }
  }

  async alertGame(game: Game) {
    console.log((game));
    const alert = await this.alert.create({
      header: 'You selected ',
      subHeader: game.name,
      message: 'Save changes?',
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Confirm',
          handler: _ => {
            this.changeGame(game);
          }
        }
      ]
    });
    await alert.present();
  }

  private async changeGame(game: Game) {
    this.currentUser.favoriteGame = game.name;
    console.log(this.currentUser);
    await this.userService.updateUser(this.currentUser);
    await this.authService.setCurrentUser(this.currentUser);
    this.gameChanged = true;
  }
}
