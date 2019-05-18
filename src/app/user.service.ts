import {Injectable} from '@angular/core';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // API url
  private usersUrl = 'api/users';
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

}
