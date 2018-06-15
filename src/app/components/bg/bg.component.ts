import { Component, OnInit, OnDestroy } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';

@Component({
  selector: 'app-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.less'],
  animations: [
    trigger('cover', [
      state('*', style({transform: 'scaleY(1)'})),
      transition(':enter', [
        style({transform: 'scaleY(0)'}),
        animate('500ms ease-out')
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'scaleY(0)'}))
      ])
    ]),
    trigger('trigger', [
      state('*', style({})),
      transition(':enter', [
        style({top: -100}),
        animate('500ms ease-out')
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({top: -100}))
      ])
    ]),
    trigger('layerBg', [
      state('*', style({opacity: 1})),
      transition('* => *', [
        style({opacity: 0}),
        animate('1000ms 1200ms ease-out', style({opacity: 1}))
      ])
    ])
  ]
})
export class BgComponent implements OnInit {

  primaryColor: string;
  secondaryColor: string;
  layerBg: string | SafeValue;
  fastSecondaryColor: string;
  showAnim: boolean;
  showMenu: boolean;
  showTrigger: boolean;
  scrollTrigger: boolean;
  halfLeft: boolean;

  constructor(
    private bgConfigService: BgConfigService,
    private domsantilizer: DomSanitizer
  ) {
    this.showAnim = false;
    this.showMenu = false;
    this.scrollTrigger = false;
    this.halfLeft = false;
  }

  ngOnInit() {
    // set bg and delayed-anim
    this.bgConfigService.bgConfig$.subscribe((config) => {
      this.fastSecondaryColor = config.secondaryColor;
      this.showAnim = true;
      this.showMenu = config.showMenu;
      this.showTrigger = config.showTrigger;
      setTimeout(() => {
        this.primaryColor = config.primaryColor;
        this.secondaryColor = config.secondaryColor;
        this.layerBg = this.domsantilizer.bypassSecurityTrustStyle(config.layerBg);
      }, 600);
      setTimeout(() => {
        this.showAnim = false;
      }, 1200);
    });
    // set scroll handler
    this.scrollHander();
    window.addEventListener('scroll', () => {
      this.scrollHander();
    });
  }

  scrollHander() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
      clientHeight = document.documentElement.clientHeight;
    if (scrollTop >= 80) {
      this.scrollTrigger = true;
    } else {
      this.scrollTrigger = false;
    }
    // if (clientHeight * 2 / 3 < scrollTop) {
    //   this.halfLeft = true;
    //   // console.log(this.showDatePicker);
    // } else {
    //   this.halfLeft = false;
    // }
  }

  clickTrigger() {
    this.showMenu = !this.showMenu;
    // if (this.showMenu) {
    //   this.showTrigger = true;
    // } else {
    //   if (this.scrollTrigger) {
    //     this.scrollTrigger = false;
    //     setTimeout(() => {
    //       this.scrollTrigger = true;
    //     }, 5);
    //   }
    // }
  }

}
