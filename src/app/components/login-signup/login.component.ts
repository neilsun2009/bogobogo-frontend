import { Component, OnInit } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/api/auth.service';
import { GeneralService } from '../../services/api/general.service';
import { TitleService } from '../../services/title.service';

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
  catConfig: any;

  constructor(
    private authService: AuthService,
    private generalService: GeneralService,
    private bgConfigService: BgConfigService,
    private titleService: TitleService
  ) {
    this.hasLoggedIn = false;
    this.loginParam = {
      username: '',
      password: ''
    };
    this.catConfig = generalService.generalData.cats.index;
  }

  ngOnInit() {
    this.titleService.setTitle('Login');
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.bgConfigService.setConfig({
      primaryColor: this.catConfig.primaryColor,
      secondaryColor: this.catConfig.secondaryColor,
      layerBg: this.catConfig.layerBg,
      showMenu: false,
      showTrigger: true
    });
  }

  login() {
    this.authService.login(this.loginParam,
    (data) => {
      this.hasLoggedIn = true;
      this.authService.hasLoggedIn = true;
      this.authService.user = data;
    }, (err) => {
      alert(err.message);
      console.log(err);
    });
  }

}
