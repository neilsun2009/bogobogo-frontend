import { Component, OnInit } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./login-signup.component.less']
})
export class SignupComponent implements OnInit {

  user: User;
  hasSignedUp: boolean;
  signupParam: {
    username: string;
    password: string;
  };
  passwordRepeat: string;

  constructor(
    private authService: AuthService,
    private bgConfigService: BgConfigService,
  ) {
    this.hasSignedUp = false;
    this.signupParam = {
      username: '',
      password: ''
    };
    this.passwordRepeat = '';
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

  signup() {
    if (this.passwordRepeat !== this.signupParam.password) {
      alert('Password inconsistent!');
      return;
    }
    this.authService.signup(this.signupParam,
    (data) => {
      if (data.result) {
        this.hasSignedUp = true;
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
