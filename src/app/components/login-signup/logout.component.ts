import { Component, OnInit } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/api/auth.service';
import { GeneralService } from '../../services/api/general.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./login-signup.component.less']
})
export class LogoutComponent implements OnInit {

  user: User;
  hasLoggedOut: boolean;
  catConfig: any;

  constructor(
    private authService: AuthService,
    private generalService: GeneralService,
    private bgConfigService: BgConfigService,
    private titleService: TitleService
  ) {
    this.hasLoggedOut = false;
    this.catConfig = generalService.generalData.cats.index;
  }

  ngOnInit() {
    this.titleService.setTitle('Logout');
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.bgConfigService.setConfig({
      primaryColor: this.catConfig.primaryColor,
      secondaryColor: this.catConfig.secondaryColor,
      layerBg: this.catConfig.layerBg,
      showMenu: false,
      showTrigger: true
    });
  }

  logout() {
    this.authService.logout(
    (data) => {
      this.hasLoggedOut = true;
    }, (err) => {
      alert(err);
      console.log(err);
    });
  }

}
