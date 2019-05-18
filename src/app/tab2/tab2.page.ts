import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {User} from '../user';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  private currentUser: User;
  // Constructor
  constructor(private authService: AuthService
  ) {}
  // OnInit method
  async ngOnInit() {
    this.currentUser = await this.authService.checkLogin();
  }
}
