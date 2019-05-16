import { Injectable } from '@angular/core';
import { User } from 'user';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // API url
  private usersUrl = 'api/users';
  // Constructor
  constructor( private http: HttpClient ) { }
  // Get the list of users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
        catchError(this.handleError<User[]>('getUsers', []))
    );
  }
  // Get user by id
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url).pipe(this.handleError<User>(`getUser id=${id}`));
  }
  // Get users whose nickname contains tem
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of ([]);
    }
    return this.http.get<User[]>(`${this.usersUrl}/?nickname=${term}`).pipe(
        catchError(this.handleError<User[]>('searchUsers', []))
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
