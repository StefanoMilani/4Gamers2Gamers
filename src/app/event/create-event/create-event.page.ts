import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {Game} from '../../game';
import {AuthService} from '../../auth/auth.service';
import {AlertController, IonDatetime, IonInput, IonRadioGroup, PickerController} from '@ionic/angular';
import {GameService} from '../../game.service';
import {EventService} from '../../event.service';
import {Event} from '../../event';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  currentUser: User;
  eventName: string;
  date: string;
  hour: string;
  gameConsole: string;
  game: string;
  gameChoosing: boolean;
  online: boolean;
  team: boolean;
  location: string;
  // Game choose utilities
  games: Game[];
  gamesMatrix = new Array<Array<Game>>();
  // Error message
  showErr: boolean;
  locationErr: boolean;
  private event: Event;
  // Constructor
  constructor(private authService: AuthService,
              private picker: PickerController,
              private alert: AlertController,
              private gameService: GameService,
              private eventService: EventService,
              private router: Router
  ) { }
  // OnInit
  async ngOnInit() {
    this.games = await this.gameService.getGames();
    this.createGameMatrix();
    this.eventName = '---';
    this.date = '---';
    this.hour = '---';
    this.gameConsole = '---';
    this.game = '---';
  }
  // Refresh current user every time you enter the page
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter() {
    this.currentUser = await this.authService.checkLogin();
    this.gameChoosing = false;
    this.showErr = false;
    this.locationErr = false;
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
  // Create event alert
  // Alert on event creation
  async eventAlert() {
    if (this.eventName === '---' || this.date === '---' || this.hour === '---' || this.gameConsole === '---' || this.game === '---') {
      this.showErr = true;
      return;
    }
    if (this.online === false && this.location === '---') {
      this.locationErr = true;
      return ;
    }
    // noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
    const alert = await this.alert.create({
      header: 'You are creating',
      subHeader: this.eventName,
      message: 'Are You Sure?',
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Confirm',
          handler: _ => {
            this.createEvent();
          }
        }
      ]
    });
    await alert.present();
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
    const selectedValue = gameConsole.Console.text;
    if (selectedValue === '---') {  return; }
    this.gameConsole = selectedValue;
    console.log(this.gameConsole);
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
  // Create event
  private async createEvent() {
    this.event = await this.eventService.addEvent({
      name: this.eventName,
      platform: this.gameConsole,
      team: this.team,
      online: this.online,
      location: this.location,
      date: this.date,
      hour: this.hour
    } as Event);
    // noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
    const alert = await this.alert.create({
      header: 'Event successfully created',
      subHeader: 'Do you want to participate?',
      buttons: [
        {
          text: 'No',
          handler: _ => {
            this.secondAlert();
          }
        },
        {
          text: 'Yes',
          handler: _ => {
            this.participate();
          }
        }
      ]
    });
    await alert.present();
  }
  // Second alert
  private async secondAlert() {
    // noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
    const alert = await this.alert.create({
      header: 'Do you want to invite players?',
      buttons: [
        {
          text: 'No',
          handler: _ => {
            this.goToHome();
          }
        },
        {
          text: 'Yes',
          handler: _ => {
            this.goToInvite();
          }
        }
      ]
    });
    await alert.present();
  }
  // Come back to home
  private async goToHome() {
    await this.router.navigate(['/home']);
  }
  // Go to invite player
  private async goToInvite() {
    await this.router.navigate([`/invite/${this.event.id}`]);
  }
  // Participate to event
  private async participate() {
    await this.eventService.addParticipant(this.event, this.currentUser);
    await this.secondAlert();
  }
}
