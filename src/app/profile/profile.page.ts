import { Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {AuthService} from '../auth/auth.service';
import {GameService} from '../game.service';
import {Stat} from '../stat';
import {User} from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  private currentUser: User;
  private user: User;
  private id: number;
  private stats: Stat[];
  private voteWrong = false;
  private voteSent = false;
  // Constructor
  constructor( private route: ActivatedRoute,
               private userService: UserService,
               private authService: AuthService,
               private router: Router,
               private gameService: GameService
  ) {}

  // Refresh current user every time you enter the page
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter()  {
    this.currentUser = await this.authService.checkLogin();
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.currentUser.id === this.id) {
      await this.router.navigate(['/tabs/tab3']);
      return ;
    }
    await this.getUser();
    this.stats = await this.gameService.getStatsByUser(this.user);
    console.log(this.stats);
    this.voteWrong = false;
    this.voteSent = false;
  }

  private async getUser() {
    this.user = await this.userService.getUser(this.id);
  }

  sendVote(value) {
    value = +value;
    if (value < 1 || value > 5) {
      this.voteWrong = true;
      this.voteSent = false;
    } else {
      this.voteWrong = false;
      this.voteSent = true;
    }
  }
}
