import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AlertController, IonInput, PickerController} from '@ionic/angular';
import {GameService} from '../game.service';
import {TeamService} from '../team.service';
import {Game} from '../game';
import {User} from '../user';
import {Team} from '../team';

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.page.html',
  styleUrls: ['./search-team.page.scss'],
})
export class SearchTeamPage implements OnInit {
  // Game choose utilities
  games: Game[];
  gamesMatrix = new Array<Array<Game>>();
  // Properties
  private gameChoosing: boolean;
  private currentUser: User;
  private game: string;
  private teamName: string;
  private gameConsole: string;
  private country: string;
  private showSearch: boolean;
  private showErr: boolean;
  private teams: Team[] = [];
  private loadingComplete: boolean;

  constructor(private authService: AuthService,
              private picker: PickerController,
              private alert: AlertController,
              private gameService: GameService,
              private teamService: TeamService
  ) { }
  // OnInit
  async ngOnInit() {
    this.games = await this.gameService.getGames();
    this.createGameMatrix();
  }
  // Refresh current user every time you enter the page
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter() {
    this.currentUser = await this.authService.checkLogin();
    this.gameChoosing = false;
    this.game = '---';
    this.gameConsole = '---';
    this.teamName = '---';
    this.country = '---';
    this.showSearch = false;
    this.showErr = false;
  }
  // Search teams
  async searchTeams() {
    if (this.game === '---' && this.gameConsole === '---' && this.country === '---' && this.teamName === '---') {
      this.showErr = true;
      return;
    }
    this.showSearch = true;
    this.showErr = false;
    this.loadingComplete = false;
    // Name
    if (this.teamName !== '---') {
      this.teams = await this.teamService.getTeamByName(this.teamName);
    } else {
      this.teams = await this.teamService.getTeams();
    }
    // Platform
    if (this.gameConsole !== '---') {
      this.teams = this.teams.filter(team => {
        return team.platform === this.gameConsole;
      });
    }
    // Nationality
    if (this.country !== '---') {
      this.teams = this.teams.filter(team => {
        return team.nationality === this.country;
      });
    }
    // Game
    if (this.game !== '---') {
      this.teams = this.teams.filter(team => {
        return team.game === this.game;
      });
    }
    this.loadingComplete = true;
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
  closeGameChoice() {
    this.gameChoosing = false;
  }
  deselectGame() {
    this.game = '---';
    this.gameChoosing = false;
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
            {
              text: 'PC',
              value: 5
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
  // MARK: Private methods
  private createGameMatrix() {
    let j = 0;
    for ( let i = 0; i < this.games.length; i += 2 ) {
      this.gamesMatrix[j] = [this.games[i], this.games[i + 1]];
      j++;
    }
  }
  // Change game
  private changeGame(game: Game) {
    this.game = game.name;
    this.gameChoosing = false;
  }
  // Change name
  private chooseName(nameInput: IonInput) {
    if (nameInput.value === '') {
      this.teamName = '---';
    } else {
      this.teamName = nameInput.value;
    }
  }
  // Change console
  private changeConsole(gameConsole) {
    this.gameConsole = gameConsole.Console.text;
  }
  // Change country
  private changeCountry(country) {
    this.country = country.Country.text;
  }
}
