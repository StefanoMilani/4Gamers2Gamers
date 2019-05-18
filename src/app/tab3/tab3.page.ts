import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {User} from '../user';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  private currentUser: User;
  // Constructor
  constructor(private authService: AuthService
  ) {}
  // OnInit method
  async ngOnInit() {
    this.currentUser = await this.authService.checkLogin();
    console.log(this.currentUser);
  }
}
