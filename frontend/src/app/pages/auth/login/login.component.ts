import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../service/auth/token.service';
import { JarvisService } from '../../../service/auth/jarvis.service';
import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  };
  public error = null;

  constructor(
    private auth: JarvisService,
    private Token: TokenService,
    private Auth: AuthService,
    private router: Router,
    private notify: SnotifyService
  ) { }
  /**
   * data => this.auth.user.next(data),
   */
  onSubmit(event) {
    this.auth.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.loggedIn.next(true);
    this.Auth.setMe(data.user_data);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.notify.error(error.message);
    this.error = error.errors;
  }

  ngOnInit() {
  }

}
