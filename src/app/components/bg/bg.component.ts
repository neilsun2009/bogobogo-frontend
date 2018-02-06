import { Component, OnInit } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';

@Component({
  selector: 'app-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.less']
})
export class BgComponent implements OnInit {

  primaryColor: string;
  secondaryColor: string;
  fastSecondaryColor: string;
  showAnim: boolean;

  constructor(
    private bgConfigService: BgConfigService
  ) {
    this.showAnim = false;
  }

  ngOnInit() {
    this.bgConfigService.bgConfig$.subscribe((config) => {
      this.fastSecondaryColor = config.secondaryColor;
      this.showAnim = true;
      setTimeout(() => {
        this.primaryColor = config.primaryColor;
        this.secondaryColor = config.secondaryColor;
      }, 600);
      setTimeout(() => {
        this.showAnim = false;
      }, 1200);
    });
  }

}
