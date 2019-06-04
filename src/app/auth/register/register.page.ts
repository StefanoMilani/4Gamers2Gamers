import { Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';
import {User} from '../../user';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';
import {PickerController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  private passWrong: boolean;
  private newUser: User;
  private users: User[];
  private nickWrong: boolean;
  private gameConsole: string;
  private country: string;
  // Constructor
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private picker: PickerController
  ) { }
  // noinspection JSUnusedGlobalSymbols
  async ionViewDidEnter() {
    this.gameConsole = '---';
    this.country = '---';
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
  // Register new user
  async register(form: NgForm) {
    const nick = form.value.nickname;
    const emailAddr = form.value.email;
    const year: number = form.value.birthYear;
    const pass = form.value.password;
    const confirm = form.value.confirm;
    this.users = await this.userService.getUsers();
    // Check the nickname
    for (const user of this.users) {
      if (user.nickname === nick) {
        this.nickWrong = true;
        form.setValue({nickname: '',
          password: '',
          confirm: ''
        });
        return;
      }
    }
    this.nickWrong = false;
    // Check pass == confirm
    if (pass === confirm) {
      this.passWrong = false;
      const user = {
        nickname: nick,
        password: pass,
        country: this.country,
        email: emailAddr,
        favoriteGame: '---',
        gameConsole: this.gameConsole,
        birthYear: year
      };
      this.newUser = await this.authService.registerUser(user as User);
      await this.authService.setCurrentUser(this.newUser);
      await this.router.navigate(['/my-profile']);
      return;
    } else {
      this.passWrong = true;
      form.setValue({nickname: nick,
        password: '',
        confirm: ''
      });
    }
  }
  // MARK: Private methods
  // Change console
  private changeConsole(gameConsole) {
    this.gameConsole = gameConsole.Console.text;
  }
  // Change country
  private changeCountry(country) {
    this.country = country.Country.text;
  }
}
