import { Component, OnInit, Input } from '@angular/core';
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
      transition('one => void', [
        animate('800ms ease-in', style({transform: 'translateX(-3000px)'}))
      ]),
      transition('void => two', [
        style({transform: 'translateX(-3000px)'}),
        animate('1000ms 300ms ease-out')
      ]),
      transition('two => void', [
        animate('800ms 100ms ease-in', style({transform: 'translateX(-3000px)'}))
      ]),
      transition('void => three', [
        style({transform: 'translateX(-3000px)'}),
        animate('1000ms 500ms ease-out')
      ]),
      transition('three => void', [
        animate('800ms 200ms ease-in', style({transform: 'translateX(-3000px)'}))
      ]),
      transition('void => four', [
        style({transform: 'translateX(-3000px)'}),
        animate('1000ms 700ms ease-out')
      ]),
      transition('four => void', [
        animate('800ms 300ms ease-in', style({transform: 'translateX(-3000px)'}))
      ])
    ]),
    trigger('right', [
      state('*', style({transform: 'translateX(0)'})),
      transition('void => one', [
        style({transform: 'translateX(3000px)'}),
        animate('1000ms 200ms ease-out')
      ]),
      transition('one => void', [
        animate('800ms 50ms ease-in', style({transform: 'translateX(3000px)'}))
      ]),
      transition('void => two', [
        style({transform: 'translateX(3000px)'}),
        animate('1000ms 400ms ease-out')
      ]),
      transition('two => void', [
        animate('800ms 150ms ease-in', style({transform: 'translateX(3000px)'}))
      ]),
      transition('void => three', [
        style({transform: 'translateX(3000px)'}),
        animate('1000ms 600ms ease-out')
      ]),
      transition('three => void', [
        animate('800ms 250ms ease-in', style({transform: 'translateX(3000px)'}))
      ]),
      transition('void => four', [
        style({transform: 'translateX(3000px)'}),
        animate('1000ms 800ms ease-out')
      ]),
      transition('four => void', [
        animate('800ms 350ms ease-in', style({transform: 'translateX(3000px)'}))
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {

  animStates: string[];
  @Input() showMenu: boolean;

  constructor(
    private bgConfigService: BgConfigService,
    private generalService: GeneralService
  ) {
    this.animStates = ['one', 'two', 'three', 'four'];
  }

  ngOnInit() {}

}
