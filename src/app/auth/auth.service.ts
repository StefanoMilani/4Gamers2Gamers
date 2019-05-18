import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../user.service';
import {User} from '../user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // MARK: Properties
  private userUrl = 'api/users';
  private currentUrl = 'api/currentUser';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  // Constructor
  constructor(private http: HttpClient,
              private userService: UserService,
              private router: Router
  ) { }

  // Register new user
  async registerUser(user: User): Promise<User> {
    return await this.http.post<User>(this.userUrl, user, this.httpOptions).toPromise();
  }
  // Login
  async login(user: User): Promise<User[]> {
    return await this.userService.searchUsers(user.nickname);
  }
  // Delete user
  async deleteUser(user: User) {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.userUrl}/${id}`;
    await this.http.delete<User>(url, this.httpOptions).toPromise();
    await this.router.navigate(['']);
  }
  // MARK: Current user methods
  // Set current user
  async setCurrentUser(user: User) {
    return await this.http.post<User[]>(this.currentUrl , user , this.httpOptions).toPromise();
  }
  // Delete current user
  async deleteCurrentUser(user: User) {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.currentUrl}/${id}`;
    await this.http.delete(url, this.httpOptions).toPromise();
    await this.router.navigate(['']);
  }
  // Check and retrieve current user
  async checkLogin(): Promise<User> {
    const users = await this.http.get<User[]>(this.currentUrl).toPromise();
    console.log(users[0]);
    if (users.length === 0) {
      await this.router.navigate(['']);
    } else {
      return users.pop();
    }
  }

}

