import { Component} from '@angular/core';
import {Team} from '../team';
import {AuthService} from '../auth/auth.service';
import {User} from '../user';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../team.service';
import {Member} from '../member';
import {AlertController} from '@ionic/angular';
import {UserService} from '../user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage {
  private team: Team;
  private currentUser: User;
  private members: Member[];
  private isMember: boolean;
  private users: User[] = [];
  private loadingComplete: boolean;
  private show: boolean;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private teamService: TeamService,
              private alert: AlertController,
              private userService: UserService
  ) { }

  // Refresh current user every time you enter the page
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter() {
    this.show = false;
    this.currentUser = await this.authService.checkLogin();
    const id = +this.route.snapshot.paramMap.get('id');
    this.team = await this.teamService.getTeam(id);
    this.members = await this.teamService.getMembers(this.team);
    this.isMember = this.members.some( member => {
      return member.userId === this.currentUser.id;
    });
  }
  // Show members
  async showMembers() {
    this.show = true;
    this.loadingComplete = false;
    if (this.users.length === 0) {
      await this.getUsers();
    }
    this.loadingComplete = true;
  }
  // Hide members
  hideMembers() {
    this.show = false;
  }
  // MARK: Alert methods
  async alertJoin() {
    // noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
    const alert = await this.alert.create({
      header: 'You want to join ',
      subHeader: `${this.team.name}?`,
      message: 'Are You Sure?',
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Confirm',
          handler: _ => {
            this.join();
          }
        }
      ]
    });
    await alert.present();
  }
  async alertLeave() {
    // noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
    const alert = await this.alert.create({
      header: 'You want to leave ',
      subHeader: `${this.team.name}?`,
      message: 'Are You Sure?',
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Confirm',
          handler: _ => {
            this.leave();
          }
        }
      ]
    });
    await alert.present();
  }
  // MARK: Private methods
  private async join() {
    await this.teamService.addMember(this.team, this.currentUser);
    this.members = await this.teamService.getMembers(this.team);
    this.isMember = this.members.some( member => {
      return member.userId === this.currentUser.id;
    });
  }
  private async leave() {
    await this.teamService.removeMember(this.team, this.currentUser);
    this.members = await this.teamService.getMembers(this.team);
    this.isMember = this.members.some( member => {
      return member.userId === this.currentUser.id;
    });
  }
  private async getUsers() {
    let u;
    for (const member of this.members) {
      u = await this.userService.getUser(member.userId);
      if (u.id !== this.currentUser.id) {
        this.users.push(u);
      }
    }
  }
}
