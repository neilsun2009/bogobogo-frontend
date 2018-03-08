import { Component, OnInit, HostBinding } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';
import { GeneralService } from '../../services/api/general.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { scaleOutAnimation } from '../../global-anim';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.less'],
  animations: [scaleOutAnimation]
})
export class CodingComponent implements OnInit {

  @HostBinding('@scaleOut') routeAnimation = true;

  catConfig: any;
  title: string;

  constructor(
    private bgConfigService: BgConfigService,
    private generalService: GeneralService
  ) {
    this.catConfig = generalService.generalData.cats.coding;
    this.title = this.catConfig.title;
  }

  ngOnInit() {
    this.bgConfigService.setConfig({
      primaryColor: this.catConfig.primaryColor,
      secondaryColor: this.catConfig.secondaryColor,
      layerBg: this.catConfig.layerBg,
      showMenu: false,
      showTrigger: true
    });
  }

}
