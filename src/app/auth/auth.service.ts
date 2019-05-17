import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../user.service';
import {User} from '../user';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // MARK: Properties
  private userUrl = 'api/users';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  // Constructor
  constructor(private http: HttpClient,
              private userService: UserService
  ) { }

  // Register new user
  registerUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>(this.userUrl, user, this.httpOptions).pipe(
        catchError(this.handleError<User>('registerUser'))
    );
  }
  // Login
  login(user: User): Observable<User[]> {
    return this.userService.searchUsers(user.nickname);
  }
  // Delete user
  deleteUser(user: User): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.userUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
        catchError(this.handleError<User>(`deleteUser id=${id}`))
    );
  }
  // MARK: Private methods
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Print error in the console
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

