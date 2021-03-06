import { JarvisService } from '../../../../service/auth/jarvis.service';
import { SnotifyService } from 'ng-snotify';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-responce-reset',
  templateUrl: './responce-reset.component.html',
  styleUrls: ['./responce-reset.component.css']
})
export class ResponceResetComponent implements OnInit {
  public error = {
    email: null,
    password: null,
    password_confirmation: null,
  };
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    restToken: null
  };

  constructor(
    private route: ActivatedRoute,
    private notify: SnotifyService,
    private jarvis: JarvisService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(
      params => this.form.restToken = params['token']
    );
  }

  ngOnInit() {
  }
  onSubmit(form) {
    if (!this.form.restToken) {
      this.notify.error('Токен не найден');
    }
    this.jarvis.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error),
    );
  }

  handleResponse(data) {
    const _router = this.router;
    this.notify.confirm('Теперь войдите с новым паролем', {
      buttons: [
        {
          text: 'Yes!',
          action: toster => {
            _router.navigateByUrl('/login'),
              this.notify.remove(toster.id);
          }
        },
      ]
    });
  }
  handleError(error) {
    this.error = error.errors;
  }

}
