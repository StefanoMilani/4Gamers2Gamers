import { Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {User} from '../user';
import {EventService} from '../event.service';
import {Event} from '../event';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage {
  currentUser: User;
  events: Event[] = [];

  constructor(private authService: AuthService,
              private eventService: EventService) { }

  // Refresh current user every time you enter the page
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter() {
    this.currentUser = await this.authService.checkLogin();
    this.events = await this.eventService.getEventByUser(this.currentUser);
  }

}
