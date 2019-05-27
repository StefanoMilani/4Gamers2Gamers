import {Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {User} from '../user';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private currentUser: User;
  // Constructor
  constructor(private authService: AuthService
  ) {}
  // Refresh current user every time you enter the page
  async ionViewDidEnter() {
    this.currentUser = await this.authService.checkLogin();
    console.log(this.currentUser);
  }
}
