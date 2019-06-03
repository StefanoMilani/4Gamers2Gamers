import { Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../user';
import {AuthService} from '../auth/auth.service';
import {EventService} from '../event.service';
import {Event} from '../event';
import {Participant} from '../participant';
import {UserService} from '../user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage {
  currentUser: User;
  event: Event;
  parts: Participant[] = [];
  users: User[] = [];
  isParticipant: boolean;
  showParts: boolean;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private eventService: EventService,
              private userService: UserService
  ) { }

  // Refresh current user every time you enter the page
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter()  {
    this.currentUser = await this.authService.checkLogin();
    const id = +this.route.snapshot.paramMap.get('id');
    this.event = await this.eventService.getEvent(id);
    this.isParticipant = await this.eventService.isParticipant(this.event, this.currentUser);
    this.parts = await this.eventService.getParticipants(this.event);
    this.showParts = false;
  }
  // Remove participation
  async deletePart() {
    await this.eventService.removeParticipant(this.event, this.currentUser);
    this.isParticipant = false;
  }
  // Add participation
  async participate() {
    await this.eventService.addParticipant(this.event, this.currentUser);
    this.isParticipant = true;
  }
  // show participants
  async showParticipants() {
    this.showParts = true;
    let current;
    if (this.users.length === 0) {
      for (const part of this.parts) {
        current = await this.userService.getUser(part.userId);
        if (current.id !== this.currentUser.id) {
          this.users.push(current);
        }
      }
    }
  }
  // Hide participants
  hideParticipants() {
    this.showParts = false;
  }
}
