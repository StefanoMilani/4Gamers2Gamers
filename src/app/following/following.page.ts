import { Component} from '@angular/core';
import {User} from '../user';
import {AuthService} from '../auth/auth.service';
import {FollowService} from '../follow.service';
import {Following} from '../following';
import {UserService} from '../user.service';

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
  private followerShow: boolean;
  private followingShow: boolean;

  constructor(private authService: AuthService,
              private followService: FollowService,
              private userService: UserService
  ) { }
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter() {
    this.currentUser = await this.authService.checkLogin();
    this.followersNum = await this.followService.getFollower(this.currentUser.id);
    this.followingNum = await this.followService.getFollowing(this.currentUser.id);
    this.followerShow = false;
    this.followingShow = false;
    this.following = [];
    this.followers = [];
  }
  // Get and show followers
  async showFollowers() {
    this.followerShow = true;
    this.followingShow = false;
    if (this.followers.length === 0) {
      for (const elem of this.followersNum) {
        this.followers.push(await this.userService.getUser(elem.followerId));
      }
    }
  }
  // Get and show following
  async showFollowing() {
    this.followingShow = true;
    this.followerShow = false;
    if (this.following.length === 0) {
      for (const elem of this.followingNum) {
        this.following.push(await this.userService.getUser(elem.followingId));
      }
    }
  }

}
