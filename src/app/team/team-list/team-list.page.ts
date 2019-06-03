import { Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../user';
import {AuthService} from '../../auth/auth.service';
import {UserService} from '../../user.service';
import {Team} from '../../team';
import {TeamService} from '../../team.service';
import {Member} from '../../member';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.page.html',
  styleUrls: ['./team-list.page.scss'],
})
export class TeamListPage {
  private id: number;
  private currentUser: User;
  private user: User;
  private loadingComplete: boolean;
  private teams: Team[] = [];
  private members: Member[] = [];

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService,
              private teamService: TeamService
  ) { }
  // Refresh current user every time you enter the page
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter() {
    this.currentUser = await this.authService.checkLogin();
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.currentUser.id === this.id) {
      this.user = this.currentUser;
    } else {
      this.user = await this.userService.getUser(this.id);
    }
    this.loadingComplete = false;
    this.members = await this.teamService.getTeamsByUser(this.user);
    await this.getUsersTeam();
    this.loadingComplete = true;
  }

  private async getUsersTeam() {
    for (const member of this.members) {
      this.teams.push(await this.teamService.getTeam(member.teamId));
    }
  }
}
