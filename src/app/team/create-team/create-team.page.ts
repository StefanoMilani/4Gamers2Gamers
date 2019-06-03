import { Component, OnInit } from '@angular/core';
import {Game} from '../../game';
import {User} from '../../user';
import {AuthService} from '../../auth/auth.service';
import {AlertController, IonInput, PickerController} from '@ionic/angular';
import {GameService} from '../../game.service';
import {TeamService} from '../../team.service';
import {Team} from '../../team';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {
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
  private showErr: boolean;
  private team: Team;
  constructor(private authService: AuthService,
              private picker: PickerController,
              private alert: AlertController,
              private gameService: GameService,
              private teamService: TeamService,
              private route: Router
  ) { }

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
    this.showErr = false;
  }
  // Alert team
  async alertTeam() {
    if ( this.game === '---' || this.gameConsole === '---' || this.country === '---' || this.country === '---') {
      this.showErr = true;
      return;
    }
    // noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
    const alert = await this.alert.create({
      header: 'You are creating ',
      subHeader: `${this.teamName}?`,
      message: 'Are You Sure?',
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Confirm',
          handler: _ => {
            this.createTeam();
          }
        }
      ]
    });
    await alert.present();
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
  // Create team
  private async createTeam() {
    const team = {
      name: this.teamName,
      game: this.game,
      platform: this.gameConsole,
      nationality: this.country
    };
    this.team = await this.teamService.addTeam(team as Team);
    // noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
    const alert = await this.alert.create({
      header: `${this.teamName}`,
      subHeader: 'Successfully created',
      buttons: [
        {
          text: 'OK',
          handler: _ => {
            this.goToProfile();
          }
        }
      ]
    });
    await alert.present();
  }
  // Come back
  private async goToProfile() {
    await this.teamService.addMember(this.team, this.currentUser);
    await this.route.navigate(['/my-profile']);
  }
}
