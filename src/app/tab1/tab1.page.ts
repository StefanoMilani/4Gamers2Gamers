import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
    displaySearch = false;
    currentUser: User;
    usersSearch: User[] = [];
    // Constructor
    constructor(private userService: UserService,
                private authService: AuthService,
    ) {}
    // OnInit method
    async ngOnInit() {
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
