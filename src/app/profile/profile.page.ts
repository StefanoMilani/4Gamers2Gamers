import { Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {AuthService} from '../auth/auth.service';
import {GameService} from '../game.service';
import {Stat} from '../stat';
import {User} from '../user';
import {FollowService} from '../follow.service';

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
  private following: boolean;
  // Constructor
  constructor( private route: ActivatedRoute,
               private userService: UserService,
               private authService: AuthService,
               private router: Router,
               private gameService: GameService,
               private followService: FollowService
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
    this.voteWrong = false;
    this.voteSent = false;
    this.following = await this.followService.follow(this.currentUser.id, this.user.id);
    console.log(this.following);
  }
  // Get user
  private async getUser() {
    this.user = await this.userService.getUser(this.id);
  }
  // Send vote
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
  // Calculate Age
  getAge() {
    const year = new Date();
    return year.getFullYear() - this.user.birthYear;
  }
  // Unfollow user
  // noinspection SpellCheckingInspection
  async unfollow(followerId: number, followingId: number) {
    await this.followService.removeFollowing(followerId, followingId);
    this.following = await this.followService.follow(followerId, followingId);
    console.log(this.following);
  }
  // Follow user
  async follow(followerId: number, followingId: number) {
    await this.followService.addFollowing(followerId, followingId);
    this.following = await this.followService.follow(followerId, followingId);
    console.log(this.following);
  }
}
