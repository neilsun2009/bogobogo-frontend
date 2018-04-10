import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './models/user';
import { AuthService } from './services/api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  private toLoginNum = 0;
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {

  }

  ngOnInit() {
    document.getElementById('pre-loading').className = 'loading hide';
    document.body.scrollTop = 0;
    setTimeout(() => {
      this.user = this.authService.user;
    }, 1000);
  }

  toLogin() {
    if (++this.toLoginNum === 10) {
      this.router.navigate(['/login']);
      this.toLoginNum = 0;
    }
    setTimeout(() => {
      this.toLoginNum = 0;
    }, 1000 * 60);
  }

}
