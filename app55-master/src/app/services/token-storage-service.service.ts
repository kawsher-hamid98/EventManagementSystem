import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthGuard } from '../auth.guard';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageServiceService {
  //private roles: Array<string> = [];
  private loggedInUser: User;
  private roles: Array<string> = [];
  constructor(private router: Router) { }
 
  logoutUser() {
    window.sessionStorage.clear();
    this.router.navigate(['/login'])
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
 
  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  loggedIn() {
    return !!sessionStorage.getItem(TOKEN_KEY)   
}

loggedAdmin() {
  let authorities = this.getAuthorities()
   
    if(authorities[0] === 'ADMIN'){
      return true;
    }else {
      //console.log('Unauthorized to open link: ');
      return false;
    }
}

public saveAuthorities(authorities: string[]) {
  window.sessionStorage.removeItem(AUTHORITIES_KEY);
  window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
}

public getAuthorities(): string[] {
  this.roles = [];

  if (sessionStorage.getItem(TOKEN_KEY)) {
    JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
      this.roles.push(authority.authority);
    });
  }

  return this.roles;
}

}