import {Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {User} from '../user';
import {GameService} from '../game.service';
import {Stat} from '../stat';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private currentUser: User;
  private stats: Stat[];
  // Constructor
  constructor(private authService: AuthService,
              private gameService: GameService
  ) {}
  // Refresh current user every time you enter the page
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter() {
    this.currentUser = await this.authService.checkLogin();
    this.stats = await this.gameService.getStatsByUser(this.currentUser);
  }
}
