import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Team} from './team';
import {Member} from './member';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamUrl = 'api/teams';
  private memberUrl = 'api/members';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  // Get teams
  async getTeams(): Promise<Team[]> {
    return this.http.get<Team[]>(this.teamUrl).toPromise();
  }
  // Get team by id
  async getTeam(id: number): Promise<Team> {
    const url = `${this.teamUrl}/${id}`;
    return this.http.get<Team>(url).toPromise();
  }
  // Get team by name
  async getTeamByName(name: string): Promise<Team[]> {
    const url = `${this.teamUrl}/?name=${name}`;
    return this.http.get<Team[]>(url).toPromise();
  }
  // Get teams by user
  async getTeamsByUser(user: User): Promise<Member[]> {
    const url = `${this.memberUrl}/?userId=${user.id}`;
    return this.http.get<Member[]>(url).toPromise();
  }
  // Add team
  async addTeam(team: Team): Promise<Team> {
    return this.http.post<Team>(this.teamUrl, team, this.httpOptions).toPromise();
  }
  // Get team members
  async getMembers(team: Team): Promise<Member[]> {
    const url = `${this.memberUrl}/?teamId=${team.id}`;
    return this.http.get<Member[]>(url).toPromise();
  }
  // Add member
  async addMember(team: Team, user: User): Promise<Member> {
    return this.http.post<Member>(this.memberUrl, {userId: user.id, teamId: team.id} as Member, this.httpOptions).toPromise();
  }
  // Remove member
  async removeMember(team: Team, user: User): Promise<Member> {
    let members = await this.getMembers(team);
    members = members.filter( member => {
      return member.userId === user.id;
    });
    const url = `${this.memberUrl}/${members[0].id}`;
    return this.http.delete<Member>(url, this.httpOptions).toPromise();
  }
}
