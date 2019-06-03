import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';
import { Injectable } from '@angular/core';
import {Following} from './following';
import {Event} from './event';
import {Participant} from './participant';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  // Constructor
  constructor() { }
  // Overrides the genId method to ensure that a user always has an id.
  // noinspection JSUnusedGlobalSymbols
  // @ts-ignore
  // noinspection JSUnusedGlobalSymbols
  static genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
  // @ts-ignore
  // noinspection JSUnusedGlobalSymbols
  static genId(following: Following[]): number {
    return following.length > 0 ? Math.max(...following.map(f => f.id)) + 1 : 1;
  }
  // @ts-ignore
  // noinspection JSUnusedGlobalSymbols
  static genId(events: Event[]): number {
    return events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
  }
  // @ts-ignore
  // noinspection JSUnusedGlobalSymbols
  static genId(partecipants: Participant[]): number {
    return partecipants.length > 0 ? Math.max(...partecipants.map(partecipant => partecipant.id)) + 1 : 1;
  }
  // Database
  createDb() {
    const users = [
      { id: 11, nickname: 'Stefano'   , password: 'pass' , birthYear: 1996 ,
        country: 'Italy'  , email: 'example@foo.com'     ,
        favoriteGame: 'Fifa19', gameConsole: 'xBox One'
      },
      { id: 12, nickname: 'Andrea'    , password: 'pass' , birthYear: 1994 ,
        country: 'Italy'  , email: 'example@foo.com'     ,
        favoriteGame: 'Fifa19', gameConsole: 'Playstation4'
      },
      { id: 13, nickname: 'Giovanni'  , password: 'pass' , birthYear: 1996 ,
        country: 'Italy'  , email: 'example@foo.com'     ,
        favoriteGame: 'Fortnite', gameConsole: 'Playstation4'
      },
      { id: 14, nickname: 'Edoardo'   , password: 'pass' , birthYear: 1995 ,
        country: 'Italy'  , email: 'example@foo.com'     ,
        favoriteGame: 'Fortnite', gameConsole: 'xBox One'
      },
      { id: 15, nickname: 'Magneta'   , password: 'pass' , birthYear: 1999 ,
        country: 'Italy'  , email: 'example@foo.com'     ,
        favoriteGame: 'Fifa19', gameConsole: 'Playstation4'
      },
      { id: 16, nickname: 'RubberMan' , password: 'pass' , birthYear: 1990 ,
        country: 'Italy'  , email: 'example@foo.com'     ,
        favoriteGame: 'Fifa19', gameConsole: 'xBox One'
      },
      { id: 17, nickname: 'Dynama'    , password: 'pass' , birthYear: 2002 ,
        country: 'Italy'  , email: 'example@foo.com'     ,
        favoriteGame: 'Fortnite', gameConsole: 'Mobile'
      },
      { id: 18, nickname: 'Dr IQ'     , password: 'pass' , birthYear: 2004 ,
        country: 'Italy'  , email: 'example@foo.com'     ,
        favoriteGame: 'Fortnite', gameConsole: 'Mobile'
      },
      { id: 19, nickname: 'Magma'     , password: 'pass' , birthYear: 1988 ,
        country: 'Italy'  , email: 'example@foo.com'     ,
        favoriteGame: 'Fortnite', gameConsole: 'Nintendo Switch'
      },
      { id: 20, nickname: 'Tornado'   , password: 'pass' , birthYear: 2000 ,
        country: 'Italy'  , email: 'example@foo.com'     ,
        favoriteGame: 'Fortnite', gameConsole: 'Nintendo Switch'
      }
    ];
    const games = [
      { name: 'Fifa19'},
      { name: 'Call of Duty'},
      { name: 'Fortnite'},
      { name: 'Apex Legends'},
      { name: 'League of Legends'}
    ];
    const currentUser = [];
    const stats = [
      { userId: 11  , game: 'Fifa19'        , winLoseRatio: 3.34  , matchPlayed: 479   },
      { userId: 11  , game: 'Fortnite'      , winLoseRatio: 0.45  , matchPlayed: 10    },
      { userId: 12  , game: 'Fifa19'        , winLoseRatio: 4.11  , matchPlayed: 1200  },
      { userId: 13  , game: 'Fortnite'      , winLoseRatio: 1.2   , matchPlayed: 701   },
      { userId: 13  , game: 'Fifa19'        , winLoseRatio: 3.65  , matchPlayed: 899   },
      { userId: 13  , game: 'Apex Legends'  , winLoseRatio: 0.9   , matchPlayed: 122   },
      { userId: 14  , game: 'Fifa19'        , winLoseRatio: 3.88  , matchPlayed: 970   },
    ];
    const gameConsole = [
      { name: 'xBox One'},
      { name: 'Playstation4'},
      { name: 'Nintendo Switch'},
      { name: 'Mobile'}
    ];
    const following = [
      { id: 1   ,  followerId: 11 ,   followingId: 12},
      { id: 2   ,  followerId: 11 ,   followingId: 13},
      { id: 3   ,  followerId: 11 ,   followingId: 14},
      { id: 4   ,  followerId: 12 ,   followingId: 15},
      { id: 5   ,  followerId: 13 ,   followingId: 11},
      { id: 6   ,  followerId: 14 ,   followingId: 11},
      { id: 7   ,  followerId: 15 ,   followingId: 12},
      { id: 8   ,  followerId: 16 ,   followingId: 12},
      { id: 9   ,  followerId: 17 ,   followingId: 12},
      { id: 10  ,  followerId: 18 ,   followingId: 12},
      { id: 11  ,  followerId: 15 ,   followingId: 11},
      { id: 12  ,  followerId: 16 ,   followingId: 11},
      { id: 13  ,  followerId: 17 ,   followingId: 11},
      { id: 14  ,  followerId: 18 ,   followingId: 11}
    ];
    const events = [
      {
        id: 1    , name: 'Fifa Tournament'    ,   game: ''  ,   platform: ''   ,
        team: false   ,   online:   true  ,
        date: ''      ,   hour: ''
      },
      {
        id: 2    , name: 'Fortnite Tournament'    ,   game: ''  ,   platform: ''   ,
        team: false   ,   online:   true  ,
        date: ''      ,   hour: ''
      },
      {
        id: 3    , name: 'CoD Tournament'    ,   game: ''  ,   platform: ''   ,
        team: true   ,   online:   true  ,
        date: ''      ,   hour: ''
      },
      {
        id: 4    , name: 'Apex Tournament'    ,   game: ''  ,   platform: ''   ,
        team: false   ,   online:   true  ,
        date: ''      ,   hour: ''
      },
      {
        id: 5    , name: 'LoL Tournament'    ,   game: ''  ,   platform: ''   ,
        team: true   ,   online:   true  ,
        date: ''      ,   hour: ''
      },
    ];
    const participants = [
      { id: 1   , eventId: 1 ,  userId:  11 },
      { id: 2   , eventId: 2 ,  userId:  11 },
      { id: 3   , eventId: 3 ,  userId:  11 },
      { id: 4   , eventId: 3 ,  userId:  12 },
      { id: 5   , eventId: 4 ,  userId:  12 },
      { id: 6   , eventId: 5 ,  userId:  13 },
      { id: 7   , eventId: 2 ,  userId:  13 },
      { id: 8   , eventId: 1 ,  userId:  14 },
      { id: 9   , eventId: 1 ,  userId:  15 },
      { id: 10  , eventId: 1 ,  userId:  16 },
      { id: 11  , eventId: 1 ,  userId:  17 },
      { id: 12  , eventId: 1 ,  userId:  18 },
    ];
    return { users , games, currentUser, stats, gameConsole, following, events, participants};
  }
}
