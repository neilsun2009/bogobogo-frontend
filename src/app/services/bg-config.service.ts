import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class BgConfig {
    primaryColor?: string;
    secondaryColor?: string;
    layerBg?: string;
    showLoading?: boolean;
    loggedIn?: boolean;
    showMenu?: boolean;
    showTrigger?: boolean;
}

@Injectable()
export class BgConfigService {

  // Observable sources
  private bgConfigSource = new Subject<BgConfig>();

  // Observable string streams
  bgConfig$ = this.bgConfigSource.asObservable();

  setConfig(config: BgConfig) {
    this.bgConfigSource.next(config);
  }
}
