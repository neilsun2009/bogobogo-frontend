import { Component, OnInit, HostBinding } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';
import { GeneralService } from '../../services/api/general.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { scaleOutAnimation } from '../../global-anim';

@Component({
  selector: 'app-bytes',
  templateUrl: './bytes.component.html',
  styleUrls: ['./bytes.component.less'],
  animations: [scaleOutAnimation]
})
export class BytesComponent implements OnInit {

  @HostBinding('@scaleOut') routeAnimation = true;

  catConfig: any;
  title: string;

  constructor(
    private bgConfigService: BgConfigService,
    private generalService: GeneralService
  ) {
    this.catConfig = generalService.generalData.cats.bytes;
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
