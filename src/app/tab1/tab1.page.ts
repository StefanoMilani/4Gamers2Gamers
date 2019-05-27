import { Component} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
    displaySearch = false;
    currentUser: User;
    usersSearch: User[] = [];
    // Constructor
    constructor(private userService: UserService,
                private authService: AuthService,
    ) {}
    // Refresh current user every time you enter the page
    async ionViewDidEnter() {
        this.currentUser = await this.authService.checkLogin();
        console.log(this.currentUser);
    }
    // Search user by nickname
    async search(term: string) {
        if (term === '') {
            this.usersSearch = [];
            this.displaySearch = false;
            return;
        }
        this.displaySearch = true;
        this.usersSearch = await this.userService.searchUsers(term);
        return;
    }
    cancel() {
        this.displaySearch = false;
        this.usersSearch = [];
    }
}
