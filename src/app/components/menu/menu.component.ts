import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BgConfigService } from '../../services/bg-config.service';
import { GeneralService } from '../../services/api/general.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  animations: [
    trigger('left', [
      state('*', style({transform: 'translateX(0)'})),
      transition('void => one', [
        style({transform: 'translateX(-3000px)'}),
        animate('1000ms 100ms ease-out')
      ]),
      transition('void => two', [
        style({transform: 'translateX(-3000px)'}),
        animate('1000ms 300ms ease-out')
      ]),
      transition('void => three', [
        style({transform: 'translateX(-3000px)'}),
        animate('1000ms 500ms ease-out')
      ]),
      transition('void => four', [
        style({transform: 'translateX(-3000px)'}),
        animate('1000ms 700ms ease-out')
      ])
    ]),
    trigger('right', [
      state('*', style({transform: 'translateX(0)'})),
      transition('void => one', [
        style({transform: 'translateX(3000px)'}),
        animate('1000ms 200ms ease-out')
      ]),
      transition('void => two', [
        style({transform: 'translateX(3000px)'}),
        animate('1000ms 400ms ease-out')
      ]),
      transition('void => three', [
        style({transform: 'translateX(3000px)'}),
        animate('1000ms 600ms ease-out')
      ]),
      transition('void => four', [
        style({transform: 'translateX(3000px)'}),
        animate('1000ms 800ms ease-out')
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {

  animStates: string[];

  constructor(
    private bgConfigService: BgConfigService,
    private generalService: GeneralService
  ) {
    this.animStates = ['one', 'two', 'three', 'four'];
  }

  ngOnInit() {}

  clickMore() {
    this.bgConfigService.setConfig({
      primaryColor: this.generalService.generalData.cats.more.primaryColor,
      secondaryColor: this.generalService.generalData.cats.more.secondaryColor
    });
  }

}
