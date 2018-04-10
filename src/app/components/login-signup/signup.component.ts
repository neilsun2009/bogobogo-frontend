import { Component, OnInit } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/api/auth.service';
import { GeneralService } from '../../services/api/general.service';
import { TitleService } from '../../services/title.service';

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
  catConfig: any;

  constructor(
    private authService: AuthService,
    private bgConfigService: BgConfigService,
    private generalService: GeneralService,
    private titleService: TitleService
  ) {
    this.hasSignedUp = false;
    this.signupParam = {
      username: '',
      password: ''
    };
    this.passwordRepeat = '';
    this.catConfig = generalService.generalData.cats.index;
  }

  ngOnInit() {
    this.titleService.setTitle('Signup');
    document.body.scrollTop = 0;
    this.bgConfigService.setConfig({
      primaryColor: this.catConfig.primaryColor,
      secondaryColor: this.catConfig.secondaryColor,
      layerBg: this.catConfig.layerBg,
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
      this.hasSignedUp = true;
    }, (err) => {
      alert(err.message);
      console.log(err);
    });
  }

}
