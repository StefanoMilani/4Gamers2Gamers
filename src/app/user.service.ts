import {Injectable} from '@angular/core';
import {User} from './user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { of } from 'rxjs';
import {GameConsole} from './gameConsole';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // API url
  private usersUrl = 'api/users';
  private consoleUrl = 'api/console';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  // Constructor
  constructor( private http: HttpClient ) { }
  // Get the list of users
  async getUsers(): Promise<User[]> {
    return await this.http.get<User[]>(this.usersUrl).toPromise();
  }
  // Get user by id
  async getUser(id: number): Promise<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).toPromise();
  }
  // Get users whose nickname contains tem
  async searchUsers(term: string): Promise<User[]> {
    if (!term.trim()) {
      return of ([]).toPromise();
    }
    return this.http.get<User[]>(`${this.usersUrl}/?nickname=${term}`).toPromise();
  }
  // Update user
  async updateUser(user: User): Promise<User> {
    return await this.http.post<User>(this.usersUrl, user, this.httpOptions).toPromise();
  }
  // Get all the consoles
  async getConsoles(): Promise<GameConsole> {
    return await  this.http.get<GameConsole>(this.consoleUrl).toPromise();
  }
}
