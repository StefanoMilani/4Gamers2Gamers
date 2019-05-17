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
      { id: 11, nickname: 'Mr. Nice'  , password: 'pass'},
      { id: 12, nickname: 'Narco'     , password: 'pass'},
      { id: 13, nickname: 'Bombasto'  , password: 'pass'},
      { id: 14, nickname: 'Celeritas' , password: 'pass'},
      { id: 15, nickname: 'Magneta'   , password: 'pass'},
      { id: 16, nickname: 'RubberMan' , password: 'pass'},
      { id: 17, nickname: 'Dynama'    , password: 'pass'},
      { id: 18, nickname: 'Dr IQ'     , password: 'pass'},
      { id: 19, nickname: 'Magma'     , password: 'pass'},
      { id: 20, nickname: 'Tornado'   , password: 'pass'}
    ];
    const games = [
      { name: 'Fifa19'},
      { name: 'Call of Duty'}
    ];
    return { users , games};
  }
}
