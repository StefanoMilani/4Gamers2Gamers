import {Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {User} from '../user';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private currentUser: User;
  // Constructor
  constructor(private authService: AuthService
  ) {}
  // Refresh current user every time you enter the page
  async ionViewDidEnter() {
    this.currentUser = await this.authService.checkLogin();
  }
}
