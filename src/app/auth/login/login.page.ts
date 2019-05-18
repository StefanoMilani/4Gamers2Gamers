import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private wrong: boolean;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  async login(form: NgForm) {
    const nick = form.value.nickname;
    const pass = form.value.password;
    const users = await this.userService.searchUsers(nick);
    for (const user of users) {
      if (user.nickname === nick && user.password === pass) {
        this.wrong = false;
        form.setValue({nickname: '',
          password: '',
        });
        await this.authService.setCurrentUser(user);
        await this.router.navigate(['/tabs/tab1']);
        return;
      }
    }
    this.wrong = true;
    form.setValue({nickname: nick,
      password: '',
    });
  }
}
