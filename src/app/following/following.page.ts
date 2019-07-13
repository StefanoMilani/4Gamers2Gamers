import { Component} from '@angular/core';
import {User} from '../user';
import {AuthService} from '../auth/auth.service';
import {FollowService} from '../follow.service';
import {Following} from '../following';
import {UserService} from '../user.service';
import {Game} from '../game';
import {GameService} from '../game.service';
import {AlertController, IonInput, IonToggle} from '@ionic/angular';

@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss'],
})
export class FollowingPage  {
  currentUser: User;
  followersNum: Following[];
  followingNum: Following[];
  followers: User[];
  following: User[];
  followerSearch: User[];
  followingSearch: User[];
  followerShow: boolean;
  followingShow: boolean;
  displayFollowerSearch: boolean;
  displayFollowingSearch: boolean;
  // Game choose utilities
  gameChoosing: boolean;
  private games: Game[];
  private gamesMatrix = new Array<Array<Game>>();
  private game: string;
  private winLoseRatio: number;
  private matchPlayed: number;

  constructor(private authService: AuthService,
              private followService: FollowService,
              private userService: UserService,
              private alert: AlertController,
              private gameService: GameService
  ) { }
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter() {
    this.currentUser = await this.authService.checkLogin();
    this.followersNum = await this.followService.getFollower(this.currentUser.id);
    this.followingNum = await this.followService.getFollowing(this.currentUser.id);
    this.followerShow = false;
    this.followingShow = false;
    this.displayFollowerSearch = false;
    this.displayFollowingSearch = false;
    this.following = [];
    this.followers = [];
    this.followingSearch = [];
    this.followerSearch = [];
    this.gameChoosing = false;
    this.games = await this.gameService.getGames();
    this.createGameMatrix();
    this.matchPlayed = this.winLoseRatio = -1;
  }
  // Get and show followers
  async showFollowers() {
    this.followerShow = true;
    this.followingShow = false;
    this.displayFollowingSearch = this.displayFollowerSearch = false;
    await this.getFollowerUser();
  }
  // Get and show following
  async showFollowing() {
    this.followingShow = true;
    this.followerShow = false;
    this.displayFollowingSearch = this.displayFollowerSearch = false;
    await this.getFollowingUser();
  }
  // Search followers
  async searchFollowers(term: string) {
    if (term === '') {
      this.followerSearch = [];
      this.displayFollowerSearch = false;
      this.followerShow = true;
      this.followingShow = false;
      return;
    }
    await this.getFollowerUser();
    this.displayFollowerSearch = true;
    this.followerShow = false;
    this.followingShow = false;
    const regExp = new RegExp(term, 'gmi');
    this.followerSearch = this.followers.filter( user => {
      return user.nickname.match(regExp);
    });
  }
  // Search following
  async searchFollowing(term: string) {
    if (term === '') {
      this.followerSearch = [];
      this.displayFollowingSearch = false;
      this.followingShow = true;
      this.followerShow = false;
      return;
    }
    await this.getFollowerUser();
    this.displayFollowingSearch = true;
    this.followerShow = false;
    this.followingShow = false;
    const regExp = new RegExp(term, 'gmi');
    this.followingSearch = this.following.filter( user => {
      return user.nickname.match(regExp);
    });
  }
  // MARK: game choose methods
  chooseGame() {
    this.gameChoosing = true;
  }
  async alertGame(game: Game) {
    console.log((game));
    // noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
    const alert = await this.alert.create({
      header: 'You selected ',
      subHeader: game.name,
      message: 'Are You Sure?',
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
  closeGameChoice() {
    this.gameChoosing = false;
  }
  deselectGame() {
    this.game = '---';
    this.gameChoosing = false;
  }
  // MARK: Stats methods
  winLoseChange(winLoseBox: IonInput) {
    if (winLoseBox.value === '') {
      this.winLoseRatio = -1;
    } else {
      this.winLoseRatio = +winLoseBox.value;
    }
  }
  matchPlayedChange(matchPlayedBox: IonInput) {
    if (matchPlayedBox.value === '') {
      this.matchPlayed = -1;
    } else {
      this.matchPlayed = +matchPlayedBox.value;
    }
  }
  // Search Followers params
  async searchFollowersParams() {
    await this.getFollowerUserPlus();
    if (this.game !== '---') {
      this.followerSearch = this.followerSearch.filter( user => {
        return user.favoriteGame === this.game;
      });
    }
    let stats;
    if (this.matchPlayed !== -1 || this.winLoseRatio !== -1) {
      stats = await this.gameService.getStatsByGame(this.game);
      // Filter by win/Lose ratio
      if (this.winLoseRatio !== -1) {
        stats = stats.filter(stat => {
          return this.winLoseRatio <= stat.winLoseRatio;
        });
      }
      // Filter by match played
      if (this.matchPlayed !== -1) {
        stats = stats.filter(stat => {
          return this.matchPlayed <= stat.matchPlayed;
        });
      }
      this.followerSearch = this.followerSearch.filter(user => {
        return stats.some(stat => {
          return stat.userId === user.id;
        });
      });
    }

    this.displayFollowerSearch = true;
    this.followerShow = false;
    this.followingShow = false;
  }
  // Search Following params
  async searchFollowingParams() {
    await this.getFollowingUserPlus();
    if (this.game !== '---') {
      this.followingSearch = this.followingSearch.filter( user => {
        return user.favoriteGame === this.game;
      });
    }
    let stats;
    if (this.matchPlayed !== -1 || this.winLoseRatio !== -1) {
      stats = await this.gameService.getStatsByGame(this.game);
      // Filter by win/Lose ratio
      if (this.winLoseRatio !== -1) {
        stats = stats.filter(stat => {
          return this.winLoseRatio <= stat.winLoseRatio;
        });
      }
      // Filter by match played
      if (this.matchPlayed !== -1) {
        stats = stats.filter(stat => {
          return this.matchPlayed <= stat.matchPlayed;
        });
      }
      this.followingSearch = this.followingSearch.filter(user => {
        return stats.some(stat => {
          return stat.userId === user.id;
        });
      });
    }
    this.displayFollowingSearch = true;
    this.followerShow = false;
    this.followingShow = false;
  }
  // MARK: Private methods
  private async getFollowerUser() {
    if (this.followers.length === 0) {
      for (const elem of this.followersNum) {
        this.followers.push(await this.userService.getUser(elem.followerId));
      }
    }
  }
  private async getFollowerUserPlus() {
    if (this.followerSearch.length === 0) {
      for (const elem of this.followersNum) {
        this.followerSearch.push(await this.userService.getUser(elem.followerId));
      }
    }
  }
  private async getFollowingUser() {
    if (this.following.length === 0) {
      for (const elem of this.followingNum) {
        this.following.push(await this.userService.getUser(elem.followingId));
      }
    }
  }
  private async getFollowingUserPlus() {
    if (this.followingSearch.length === 0) {
      for (const elem of this.followingNum) {
        this.followingSearch.push(await this.userService.getUser(elem.followingId));
      }
    }
  }
  private createGameMatrix() {
    let j = 0;
    for ( let i = 0; i < this.games.length; i += 2 ) {
      this.gamesMatrix[j] = [this.games[i], this.games[i + 1]];
      j++;
    }
  }
  // Change game
  private changeGame(game: Game) {
    this.game = game.name;
    this.gameChoosing = false;
  }
}
