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
    const console = [
      { name: 'xBox One'},
      { name: 'Playstation4'},
      { name: 'Nintendo Switch'},
      { name: 'Mobile'}
    ];
    return { users , games, currentUser, stats, console};
  }
}
