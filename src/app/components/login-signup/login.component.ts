import { Component, OnInit } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login-signup.component.less']
})
export class LoginComponent implements OnInit {

  user: User;
  hasLoggedIn: boolean;
  loginParam: {
    username: string;
    password: string;
  };

  constructor(
    private authService: AuthService,
    private bgConfigService: BgConfigService,
  ) {
    this.hasLoggedIn = false;
    this.loginParam = {
      username: '',
      password: ''
    };
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    this.bgConfigService.setConfig({
      primaryColor: '#798cf2',
      secondaryColor: '#f28979',
      layerBg: 'none',
      showMenu: false,
      showTrigger: true
    });
  }

  login() {
    this.authService.login(this.loginParam,
    (data) => {
      if (data.result) {
        this.hasLoggedIn = true;
        this.authService.hasLoggedIn = true;
        this.authService.user = data.data;
      } else  {
        alert(data.message);
        console.log(data);
      }
    }, (err) => {
      alert(err);
      console.log(err);
    });
  }

}
