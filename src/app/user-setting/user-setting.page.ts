import {Component} from '@angular/core';
import {AlertController, PickerController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.page.html',
  styleUrls: ['./user-setting.page.scss'],
})
export class UserSettingPage {
  private currentUser: User;
  private nickname: string;
  private email: string;
  private pass: string;
  private country: string;
  private favoriteGame: string;
  private nicknameInputField: string;
  private emailInputField: string;
  private passInputField: string;
  private gameConsole: string;
  // Constructor
  constructor(private picker: PickerController,
              private alert: AlertController,
              private authService: AuthService,
              private userService: UserService,
  ) { }
  // Refresh current user every time you enter the page
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter() {
    this.currentUser = await this.authService.checkLogin();
    this.nickname = this.currentUser.nickname;
    this.pass = this.currentUser.password;
    this.email = this.currentUser.email;
    this.country = this.currentUser.country;
    this.favoriteGame = this.currentUser.favoriteGame;
    this.gameConsole = this.currentUser.gameConsole;
  }
  // MARK: Input handler methods
  nicknameInput(term: string) {
    if (term === '') {
      this.nickname = this.currentUser.nickname;
    } else {
      this.nickname = term;
    }
  }
  emailInput(term: string) {
    if (term === '') {
      this.email = this.currentUser.email;
    } else {
      this.email = term;
    }
  }
  passInput(term: string) {
    if (term === '') {
      this.pass = this.currentUser.password;
    } else {
      this.pass = term;
    }
  }
  // MARK: Save alert methods
  async saveAlertMethod() {
    // noinspection JSUnusedGlobalSymbols
    const alert = await this.alert.create({
      header: 'Save changes',
      subHeader: 'The changes are irreversible!',
      message: 'Are you sure?',
      buttons: [
        {text: 'Cancel' },
        {text: 'Confirm',
        handler: _ => { this.confirmSave(); } }
      ]
    });
    await alert.present();
  }
  // Save changes!
  private async confirmSave() {
    const user: User = {
      id: this.currentUser.id,
      nickname: this.nickname,
      password: this.pass,
      birthYear: this.currentUser.birthYear,
      country: this.country,
      email: this.email,
      favoriteGame: this.favoriteGame,
      gameConsole: this.gameConsole
    };
    await this.userService.updateUser(user);
    await this.authService.setCurrentUser(user);
    this.currentUser = await this.authService.checkLogin();
    this.nicknameInputField = '';
    this.emailInputField = '';
    this.passInputField = '';
    return true;
  }
  // MARK: Delete account alert methods
  async deleteAlertMethod() {
    // noinspection JSUnusedGlobalSymbols
    const alert = await this.alert.create({
      header: 'Delete account',
      subHeader: 'This is irreversible!',
      message: 'Are you sure?',
      buttons: [
        {text: 'Cancel' },
        {text: 'Confirm',
          handler: () => {
             this.deleteConfirmed();
          } }
      ]
    });
    await alert.present();
  }
  // Delete account
  private async deleteConfirmed() {
    await this.authService.deleteUser(this.currentUser);
    return true;
  }
  // MARK: Logout alert methods
  async logoutAlertMethod() {
    // noinspection JSUnusedGlobalSymbols
    const alert = await this.alert.create({
      header: 'Logout',
      subHeader: 'Don\'t leave us!',
      message: 'Are you sure?',
      buttons: [
        {text: 'Cancel' },
        {text: 'Confirm',
          handler:  () => { this.confirmLogout(); } }
      ]
    });
    await alert.present();
  }
  // Confirm logout
  private async confirmLogout() {
    await this.authService.deleteCurrentUser(this.currentUser);
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
  // Change country
  private changeCountry(country) {
    const selectedValue = country.Country.text;
    if (selectedValue === '---') {  return; }
    this.country = selectedValue;
  }
  // Change console
  private changeConsole(gameConsole) {
    const selectedValue = gameConsole.Console.text;
    if (selectedValue === '---') {  return; }
    this.gameConsole = selectedValue;
  }
}
