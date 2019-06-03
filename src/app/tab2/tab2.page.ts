import {Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {User} from '../user';
import {Notification} from '../notification';
import {NotificationService} from '../notification.service';
import {Event} from '../event';
import {EventService} from '../event.service';
import {__await} from 'tslib';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private currentUser: User;
  private notifications: Notification[] = [];
  private mapEvNo = [];
  private loadingComplete = false;
  // Constructor
  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private eventService: EventService,
              private router: Router
  ) {}
  // Refresh current user every time you enter the page
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter() {
    this.loadingComplete = false;
    this.mapEvNo = [];
    this.currentUser = await this.authService.checkLogin();
    this.notifications = await this.notificationService.getUserNotif(this.currentUser);
    await this.getNotificationEvents();
    console.log(this.mapEvNo[0]);
    this.loadingComplete = true;
  }
  // Get the events of the notification
  private async getNotificationEvents() {
    let event;
    for (const notification of this.notifications) {
      event = await this.eventService.getEvent(notification.eventId);
      this.mapEvNo.push([event, notification]);
    }
  }
  // Click on notification
  async clickNotification(elem) {
    const event = elem[0], notification = elem[1];
    await this.notificationService.deleteNotif(notification);
    await this.router.navigate([`/event/${event.id}`]);
  }
}
