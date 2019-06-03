import { Component} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {AuthService} from '../auth/auth.service';
import {EventService} from '../event.service';
import {Event} from '../event';
import {Team} from '../team';
import {TeamService} from '../team.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
    displaySearch = false;
    currentUser: User;
    usersSearch: User[] = [];
    eventsSearch: Event[] = [];
    teamsSearch: Team[] = [];
    // Constructor
    constructor(private userService: UserService,
                private authService: AuthService,
                private eventService: EventService,
                private teamService: TeamService
    ) {}
    // Refresh current user every time you enter the page
    // noinspection JSUnusedGlobalSymbols
    async ionViewDidEnter() {
        this.currentUser = await this.authService.checkLogin();
        console.log(this.currentUser);
    }
    // Search user by nickname
    async search(term: string) {
        if (term === '') {
            this.usersSearch = [];
            this.eventsSearch = [];
            this.teamsSearch = [];
            this.displaySearch = false;
            return;
        }
        this.displaySearch = true;
        this.usersSearch = await this.userService.searchUsers(term);
        this.teamsSearch = await this.teamService.getTeamByName(term);
        this.eventsSearch = await this.eventService.getEventsByName(term);
        return;
    }
    cancel() {
        this.displaySearch = false;
        this.usersSearch = [];
        this.eventsSearch = [];
        this.teamsSearch = [];
    }
}
