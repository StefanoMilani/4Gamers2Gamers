/* tslint:disable */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {Following} from './following';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private followUrl = 'api/following';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  // Constructor
  constructor(private http: HttpClient
  ) { }
  // Get user's following
  async getFollowing(userId: number): Promise<Following[]> {
    const url = `${this.followUrl}/?followerId=${userId}`;
    return this.http.get<Following[]>(url).toPromise();
  }
  // Get user's follower
  async getFollower(userId: number): Promise<Following[]> {
    const url = `${this.followUrl}/?followingId=${userId}`;
    return this.http.get<Following[]>(url).toPromise();
  }
  // Check if a user follow another user
  async follow(followerId: number, followingId: number ) {
    const following = await this.getFollowing(followerId);
    return following.some(follow => {
      return follow.followingId === followingId;
    });
  }
  // Add following
  async addFollowing(followerId: number, followingId: number): Promise<Following> {
    return this.http.post<Following>(this.followUrl,
      {followerId: followerId, followingId: followingId } as Following,
      this.httpOptions).toPromise();
  }
  // Get a following instance
  async getAnInstance(followerId: number, followingId: number): Promise<Following> {
    const url = `${this.followUrl}/?followerId=${followerId}&followingId=${followingId}`;
    return this.http.get<Following>(url, this.httpOptions).toPromise();
  }
  // Remove following
  async removeFollowing(followerId: number, followingId: number): Promise<Following> {
    const follow = await this.getAnInstance(followerId, followingId);
    console.log(follow[0]);
    const url = `${this.followUrl}/${follow[0].id}`;
    console.log(url);
    return this.http.delete<Following>(url, this.httpOptions).toPromise();
  }
}
