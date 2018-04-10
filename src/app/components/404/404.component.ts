import { Component, OnInit } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/api/auth.service';
import { GeneralService } from '../../services/api/general.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-four-o-four',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.less']
})
export class FourOFourComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private generalService: GeneralService,
    private bgConfigService: BgConfigService,
    private titleService: TitleService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('404');
    document.body.scrollTop = 0;
    this.bgConfigService.setConfig({
      primaryColor: '#000000',
      secondaryColor: '#0C090B',
      layerBg: 'url("/assets/images/bg-404.png") no-repeat center center',
      showMenu: false,
      showTrigger: true
    });
  }

}
