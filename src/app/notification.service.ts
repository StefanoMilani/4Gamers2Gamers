import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Notification} from './notification';
import {User} from './user';
import {PartiallyOrderedSet} from '@angular-devkit/core';
import {not} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifUrl = 'api/notifications';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  // Get notifications
  async getNotifications(): Promise<Notification[]> {
    return this.http.get<Notification[]>(this.notifUrl).toPromise();
  }
  // Get notification by id
  async getNotification(id: number): Promise<Notification> {
    const url = `${this.notifUrl}/${id}`;
    return this.http.get<Notification>(url).toPromise();
  }
  // Get user notification
  async getUserNotif(user: User): Promise<Notification[]> {
    const url = `${this.notifUrl}/?userId=${user.id}`;
    return this.http.get<Notification[]>(url).toPromise();
  }
  // Create notification
  async addNotif(notif: Notification): Promise<Notification> {
    return this.http.post<Notification>(this.notifUrl , notif , this.httpOptions).toPromise();
  }
  // Delete notification
  async deleteNotif(notif: Notification): Promise<Notification> {
    const url = `${this.notifUrl}/${notif.id}`;
    return this.http.delete<Notification>(url, this.httpOptions).toPromise();
  }
}
