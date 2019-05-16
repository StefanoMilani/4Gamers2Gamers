import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
    displaySearch = false;
    usersSearch: User[] = [];
    // Constructor
    constructor(private userService: UserService) {}
    // OnInit method
    ngOnInit(): void {
    }
    // Search user by nickname
    search(term: string) {
        if (term === '') {
            this.usersSearch = [];
            this.displaySearch = false;
            return;
        }
        this.displaySearch = true;
        return this.userService.searchUsers(term).subscribe(
            users => this.usersSearch = users
        );
    }
    cancel() {
        this.displaySearch = false;
        this.usersSearch = [];
    }
}
