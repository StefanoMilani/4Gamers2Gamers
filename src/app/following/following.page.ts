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
  followerSearch: User[];
  followingSearch: User[];
  followerShow: boolean;
  followingShow: boolean;
  displayFollowerSearch: boolean;
  displayFollowingSearch: boolean;

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
    this.displayFollowerSearch = false;
    this.displayFollowingSearch = false;
    this.following = [];
    this.followers = [];
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
  // MARK: Private methods
  private async getFollowerUser() {
    if (this.followers.length === 0) {
      for (const elem of this.followersNum) {
        this.followers.push(await this.userService.getUser(elem.followerId));
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
}
