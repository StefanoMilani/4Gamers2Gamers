import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {Stat} from './stat';
import {UserService} from './user.service';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameUrl = 'api/games';
  private statsUrl = 'api/stats';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  // Constructor
  constructor( private http: HttpClient
  ) { }
  // Get games by user
  async getStatsByUser(user: User): Promise<Stat[]> {
    const url = `${this.statsUrl}/?userId=${user.id}`;
    return this.http.get<Stat[]>(url).toPromise();
  }
}
