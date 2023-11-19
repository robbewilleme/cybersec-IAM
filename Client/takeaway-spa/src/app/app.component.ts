import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'takeaway-spa';

  userName: string;
  isLoggedIn: boolean;
  birthdate: string;

  constructor(private authService: AuthService) {
    this.userName = '';
    this.isLoggedIn = false;
    this.checkLoginStatus();
    this.birthdate = '';
  }

  ngOnInit() {
    this.checkLoginStatus();
  }

  login() {
    this.authService.login().then(() => {
      this.checkLoginStatus();
    });
  }

  checkLoginStatus() {
    console.log(this.isLoggedIn)
    this.authService.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this.authService.getAccessToken().then((accessToken) => {
          // Use the access token as needed
        });

        // Access user information directly from the AuthService
        this.authService.getUser().then((user) => {
          this.userName = user?.profile.name || '';
          this.birthdate = user?.profile.birthdate || '';
        });
      }
      this.isLoggedIn = loggedIn;
    });
    console.log(this.isLoggedIn);
  }

  logout() {
    this.authService.logout();
    this.checkLoginStatus(); // Update login status after logout
  }
}
