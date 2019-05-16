import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  // Overrides the genId method to ensure that a user always has an id.
  // noinspection JSUnusedGlobalSymbols
  static genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }

  createDb() {
    const users = [
      { id: 11, nickname: 'Mr. Nice' },
      { id: 12, nickname: 'Narco' },
      { id: 13, nickname: 'Bombasto' },
      { id: 14, nickname: 'Celeritas' },
      { id: 15, nickname: 'Magneta' },
      { id: 16, nickname: 'RubberMan' },
      { id: 17, nickname: 'Dynama' },
      { id: 18, nickname: 'Dr IQ' },
      { id: 19, nickname: 'Magma' },
      { id: 20, nickname: 'Tornado' }
    ];
    const games = [
      { name: 'Fifa19'},
      {name: 'Call of Duty'}
    ];
    return {users, games};
  }

}
