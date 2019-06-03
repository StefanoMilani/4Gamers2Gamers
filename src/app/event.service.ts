import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {AuthService} from './auth/auth.service';
import {Event} from './event';
import {Participant} from './participant';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventUrl = 'api/events';
  private participantsUrl = 'api/participants';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private userService: UserService,
              private authService: AuthService
  ) {}
  // Get events
  async getEvents(): Promise<Event[]> {
    return this.http.get<Event[]>(this.eventUrl).toPromise();
  }
  // Get event by id
  async getEvent(id: number): Promise<Event> {
    const url = `${this.eventUrl}/${id}`;
    return this.http.get<Event>(url).toPromise();
  }
  // Get event by name
  async getEventsByName(name: string): Promise<Event[]> {
    const url = `${this.eventUrl}/?name=${name}`;
    return this.http.get<Event[]>(url).toPromise();
  }
  // Add event
  async addEvent(event: Event): Promise<Event> {
    return this.http.post<Event>(this.eventUrl, event, this.httpOptions).toPromise();
  }
  // Remove event
  async removeEvent(event: Event): Promise<Event> {
    const participants = await this.getParticipants(event);
    await this.removeListParticipants(participants);
    const url = `${this.eventUrl}/${event.id}`;
    return this.http.delete<Event>(url, this.httpOptions).toPromise();
  }
  // Get participants
  async getParticipants(event: Event): Promise<Participant[]> {
    const url = `${this.participantsUrl}/?eventId=${event.id}`;
    return this.http.get<Participant[]>(url).toPromise();
  }
  // Add participant
  async addParticipant(event: Event, user: User): Promise<Participant> {
    return this.http.post<Participant>(this.participantsUrl,
      {eventId: event.id, userId: user.id } as Participant,
      this.httpOptions).toPromise();
  }
  // Remove participant
  async removeParticipant(event: Event, user: User): Promise<Participant> {
    let parts = await this.getParticipants(event);
    parts = parts.filter(part => {
      return part.userId === user.id;
    });
    const url = `${this.participantsUrl}/${parts[0].id}`;
    return this.http.delete<Participant>(url).toPromise();
  }
  // Is participant
  async isParticipant(event: Event, user: User): Promise<boolean> {
    const parts = await this.getParticipants(event);
    return parts.some(part => {
      return part.userId === user.id;
    });
  }
  // Get events by user
  async getEventByUser(user: User): Promise<Event[]> {
    const url = `${this.participantsUrl}/?userId=${user.id}`;
    const parts = await this.http.get<Participant[]>(url).toPromise();
    const events: Event[] = [];
    for (const part of parts) {
      events.push(await this.getEvent(part.eventId));
    }
    return events;
  }
  // MARK: Private Methods
  // Remove list of participants
  private async removeListParticipants(participants: Participant[]) {
    let url;
    for (const participant of participants) {
      url = `${this.participantsUrl}/${participant.id}`;
      await this.http.delete(url).toPromise();
    }
  }
}

