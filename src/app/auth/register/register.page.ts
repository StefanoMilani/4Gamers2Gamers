import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';
import {User} from '../../user';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private passWrong: boolean;
  private newUser: User;
  private users: User[];
  private nickWrong: boolean;
  // Constructor
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router
  ) { }
  // OnInit method
  ngOnInit() {
  }
  // Register new user


  async register(form: NgForm) {
    const nick = form.value.nickname;
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
      this.newUser = await this.authService.registerUser({ nickname: nick , password: pass} as User);
      await this.authService.setCurrentUser(this.newUser);
      await this.router.navigate(['/tabs/tab1']);
      return;
    } else {
      this.passWrong = true;
      form.setValue({nickname: nick,
        password: '',
        confirm: ''
      });
    }
  }
}
