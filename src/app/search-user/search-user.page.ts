import { Component, OnInit } from '@angular/core';
import {AlertController, PickerController} from '@ionic/angular';
import {UserService} from '../user.service';
import {User} from '../user';
import {AuthService} from '../auth/auth.service';
import {Game} from '../game';
import {GameService} from '../game.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss'],
})
export class SearchUserPage implements OnInit {
  // Search parameters
  gameConsole: string;
  game: string;
  country: string;
  minAge: number;
  maxAge: number;
  searchDone: boolean;
  gameChoosing: boolean;
  // Search results
  users: User[] = [];
  private currentUser: User;
  private errorSet: boolean;
  // Game choose utilities
  private games: Game[];
  private gamesMatrix = new Array<Array<Game>>();

  // Constructor
  constructor( private picker: PickerController,
               private userService: UserService,
               private authService: AuthService,
               private alert: AlertController,
               private gameService: GameService
  )  { }

  async ngOnInit() {
    this.searchDone = false;
    this.gameChoosing = false;
    this.gameConsole = '---';
    this.country = '---';
    this.game = '---';
    this.minAge = this.maxAge = -1;
    this.games = await this.gameService.getGames();
    this.createGameMatrix();
  }
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter() {
    this.currentUser = await this.authService.checkLogin();
  }
  // MARK: Age input methods
  changeMinAge(input: any) {
    this.minAge = input.value;
  }
  changeMaxAge(input: any) {
    this.maxAge = input.value;
  }
  // MARK: Picker methods
  async openConsolePicker() {
    // noinspection JSUnusedGlobalSymbols
    const picker = await this.picker.create({
      buttons: [{
        text: 'Cancel',
      }, {
        text: 'Done',
        handler: (data: any) => { this.changeConsole(data);  }
      }],
      columns: [
        {
          name: 'Console',
          options: [
            {
              text: '---',
              value: 0
            },
            {
              text: 'xBox One',
              value: 1
            },
            {
              text: 'Playstation4',
              value: 2
            },
            {
              text: 'Nintendo Switch',
              value: 3
            },
            {
              text: 'Mobile',
              value: 4
            },
          ]
        },
      ]
    });
    await picker.present();
  }
  async openCountryPicker() {
    // noinspection JSUnusedGlobalSymbols
    const picker = await this.picker.create({
      buttons: [{
        text: 'Cancel',
      }, {
        text: 'Done',
        handler: (data: any) => { this.changeCountry(data); }
      }],
      columns: [
        {
          name: 'Country',
          options: [
            {
              text: '---',
              value: 0
            },
            {
              text: 'Italy',
              value: 1
            },
            {
              text: 'Greece',
              value: 2
            },
            {
              text: 'United Kingdom',
              value: 3
            },
          ]
        },
      ]
    });
    await picker.present();
  }
  // Change console
  private changeConsole(gameConsole) {
    const selectedValue = gameConsole.Console.text;
    if (selectedValue === '---') {
      this.gameConsole = '---';
      return;
    }
    this.gameConsole = selectedValue;
  }
  // Change country
  private changeCountry(country) {
    const selectedValue = country.Country.text;
    if (selectedValue === '---') {
      this.country = '---';
      return;
    }
    this.country = selectedValue;
  }
  // MARK: game choose methods
  chooseGame() {
  this.gameChoosing = true;
  }
  async alertGame(game: Game) {
    console.log((game));
    // noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
    const alert = await this.alert.create({
      header: 'You selected ',
      subHeader: game.name,
      message: 'Are You Sure?',
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Confirm',
          handler: _ => {
            this.changeGame(game);
          }
        }
      ]
    });
    await alert.present();
  }
  private changeGame(game: Game) {
  this.game = game.name;
  this.gameChoosing = false;
  }
  closeGameChoice() {
  this.gameChoosing = false;
  }
  // Search method
  async search() {
    if (this.gameConsole === '---' && this.country === '---'
        && this.game === '---' &&
        this.minAge === -1 && this.maxAge === -1) {
      this.errorSet = true;
      return;
    }
    this.errorSet = false;
    this.searchDone = true;
    this.users = await this.userService.getUsers();
    // Platform filter
    if (this.gameConsole !== '---') {
      this.users = this.users.filter(user => {
         return user.gameConsole === this.gameConsole;
      });
    }
    // Nationality filter
    if (this.country !== '---') {
      this.users = this.users.filter(user => {
        return this.country === user.country;
      });
    }
    // Game filter
    if (this.game !== '---') {
      this.users = this.users.filter(user => {
        return this.game === user.favoriteGame;
      });
    }
    // Min age filter
    if (this.minAge !== -1 ) {
      let year = new Date().getFullYear();
      year = year - this.minAge;
      this.users = this.users.filter(user => {
        return user.birthYear <= year;
      });
    }
    // Max age filter
    if (this.maxAge !== -1) {
      let year = new Date().getFullYear();
      year = year - this.maxAge;
      this.users.filter(user => {
        return user.birthYear >= year;
      });
    }
    // remove current user from search result
    this.users = this.users.filter(user => {
      return user.id !== this.currentUser.id;
    });
  }
  // MARK: Private methods
  private createGameMatrix() {
    let j = 0;
    for ( let i = 0; i < this.games.length; i += 2 ) {
      this.gamesMatrix[j] = [this.games[i], this.games[i + 1]];
      j++;
    }
  }
}
