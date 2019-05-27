import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  // Constructor
  constructor() { }
  // Overrides the genId method to ensure that a user always has an id.
  // noinspection JSUnusedGlobalSymbols
  static genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
  // Database
  createDb() {
    const users = [
      { id: 11, nickname: 'Stefano'   , password: 'pass'  , country: 'Italy'  , email: 'example@foo.com'},
      { id: 12, nickname: 'Andrea'    , password: 'pass'  , country: 'Italy'  , email: 'example@foo.com'},
      { id: 13, nickname: 'Giovanni'  , password: 'pass'  , country: 'Italy'  , email: 'example@foo.com'},
      { id: 14, nickname: 'Edoardo'   , password: 'pass'  , country: 'Italy'  , email: 'example@foo.com'},
      { id: 15, nickname: 'Magneta'   , password: 'pass'  , country: 'Italy'  , email: 'example@foo.com'},
      { id: 16, nickname: 'RubberMan' , password: 'pass'  , country: 'Italy'  , email: 'example@foo.com'},
      { id: 17, nickname: 'Dynama'    , password: 'pass'  , country: 'Italy'  , email: 'example@foo.com'},
      { id: 18, nickname: 'Dr IQ'     , password: 'pass'  , country: 'Italy'  , email: 'example@foo.com'},
      { id: 19, nickname: 'Magma'     , password: 'pass'  , country: 'Italy'  , email: 'example@foo.com'},
      { id: 20, nickname: 'Tornado'   , password: 'pass'  , country: 'Italy'  , email: 'example@foo.com'}
    ];
    const games = [
      { name: 'Fifa19'},
      { name: 'Call of Duty'}
    ];
    const currentUser = [];
    return { users , games, currentUser};
  }
}
