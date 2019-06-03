import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {User} from '../user';
import {AlertController, IonDatetime, IonInput, IonRadioGroup, PickerController} from '@ionic/angular';
import {Game} from '../game';
import {GameService} from '../game.service';
import {Event} from '../event';
import {EventService} from '../event.service';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.page.html',
  styleUrls: ['./search-event.page.scss'],
})
export class SearchEventPage implements OnInit {
  currentUser: User;
  eventName = '---';
  date = '---';
  hour = '---';
  gameConsole = '---';
  game = '---';
  gameChoosing: boolean;
  online: boolean;
  team: boolean;
  location: string;
  // Game choose utilities
  games: Game[];
  gamesMatrix = new Array<Array<Game>>();
  // Search result
  private events: Event[] = [];
  private diplaySearch: boolean;
  // Constructor
  constructor(private authService: AuthService,
              private picker: PickerController,
              private alert: AlertController,
              private gameService: GameService,
              private eventService: EventService
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
    this.online = true;
    this.team = true;
    this.diplaySearch = false;
  }
  // Change data
  changeData(dataPicker: IonDatetime) {
    this.date = dataPicker.value.substr(0, 10);
    console.log(this.date);
  }
  // change hour
  changeHour(hourPicker: IonDatetime) {
    this.hour = hourPicker.value.substr(11, 5);
    console.log(this.hour);
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
  // Search event
  async searchEvent() {
    this.diplaySearch = true;
    // Name
    if (this.eventName !== '---') {
      this.events = await this.eventService.getEventsByName(this.eventName);
    } else {
      this.events = await this.eventService.getEvents();
    }
    // Game
    if (this.game !== '---') {
      this.events = this.events.filter(event => {
        return event.game === this.game;
      });
    }
    // Platform
    if (this.gameConsole !== '---') {
      this.events = this.events.filter(event => {
        return event.platform === this.gameConsole;
      });
    }
    // Date
    if (this.date !== '---') {
      this.events = this.events.filter(event => {
        return event.date === this.date;
      });
    }
    // Hour
    if (this.hour !== '---') {
      this.events = this.events.filter(event => {
        return event.hour === this.hour;
      });
    }
    // Online
    this.events = this.events.filter( event => {
      return event.online === this.online;
    });
    // Team
    this.events = this.events.filter( event => {
      return event.team === this.team;
    });
    // Location
    if (this.online === false && this.location !== '---') {
      this.events = this.events.filter(event => {
        return this.location === event.location;
      });
    }
  }
  // MARK: Private methods
  private createGameMatrix() {
    let j = 0;
    for ( let i = 0; i < this.games.length; i += 2 ) {
      this.gamesMatrix[j] = [this.games[i], this.games[i + 1]];
      j++;
    }
  }
  // Change console
  private changeConsole(gameConsole) {
    this.gameConsole = gameConsole.Console.text;
  }
  // Change game
  private changeGame(game: Game) {
    this.game = game.name;
    this.gameChoosing = false;
  }
  // Change online
  private chooseOnline(onlineRadio: IonRadioGroup) {
    this.online = onlineRadio.value === 'true';
  }
  // Change team
  private chooseTeam(teamRadio: IonRadioGroup) {
    this.team = teamRadio.value === 'true';
  }
  // Change location
  private chooseLocation(locationInput: IonInput) {
    if (locationInput.value === '') {
      this.location = '---';
    } else {
      this.location = locationInput.value;
    }
  }
  // Change name
  private chooseName(nameInput: IonInput) {
    if (nameInput.value === '') {
      this.eventName = '---';
    } else {
      this.eventName = nameInput.value;
    }
  }
}
