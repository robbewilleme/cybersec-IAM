import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client-ts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userManager: UserManager;
  private user: User | null;
  public loggedIn: boolean;
  

  constructor() {
    this.userManager = new UserManager({
      authority: 'https://dev-1otxtqzg.us.auth0.com',
      client_id: 'yCPD8GWoQV73IyrgzjUZLsiBetEIJ1p6',
      redirect_uri: 'http://localhost:4200/callback', // Update with your callback URL
      response_type: 'code',
      scope: 'openid profile email birthdate',
    });
    this.user = null;
    this.loggedIn = false

    // Retrieve the user if already authenticated
    this.userManager.getUser().then((user) => {
      this.user = user;
    });
    console.log(this.user);
  }

  login() {
    return this.userManager.signinRedirect({
      extraQueryParams: {
        audience: 'https://cybersecopdracht3.be',
      },
    });
  }

  completeLogin() {
    return this.userManager.signinRedirectCallback().then((user) => {
      this.user = user;
      console.log(user);
      this.isLoggedIn();
      return user;
    });
  }

  isLoggedIn() {
    return this.userManager.getUser().then((user) => {
      this.loggedIn = user !== null && !user.expired;
      return this.loggedIn;
    });
  }

  getAccessToken() {
    return this.userManager.getUser().then((user) => {
      return user && user.access_token;
    });
  }

  getUser() {
    return this.userManager.getUser().then((user) => {
      return user;
    });
  }

  logout() {
    return this.userManager.signoutRedirect();
  }
}
