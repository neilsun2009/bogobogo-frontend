import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GeneralService } from '../../services/api/general.service';
import { EaseOutService } from '../../services/ease-out.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  animations: [
    trigger('svg-left', [
      state('*', style({transform: 'translateY(0)'})),
      transition(':enter', [
        style({transform: 'translateY(-500px)'}),
        animate('1000ms 1200ms ease-out')
      ])
    ]),
    trigger('svg-right', [
      state('*', style({transform: 'translateY(0)'})),
      transition(':enter', [
        style({transform: 'translateY(500px)'}),
        animate('1000ms 1200ms ease-out')
      ])
    ]),
    trigger('bar', [
      state('*', style({})),
      transition(':enter', [
        style({transform: 'scaleX(0) rotateY(360deg)', opacity: 0}),
        animate('1000ms 1000ms ease-out')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() cat: string;
  @Input() title: string;
  general: any;
  scrollTopSVG: string;
  scrollTopTitle: string;
  // show: boolean;

  constructor(
    private generalService: GeneralService,
    private easeOutService: EaseOutService
  ) {
    // this.show = true;
  }

  ngOnInit() {
    this.general = this.generalService.generalData.cats[this.cat];
    // this.easeOutService.easeOut$.subscribe((easeOut) => {
    //   console.log(easeOut);
    // });
    // on scroll
    this.scrollHander();
    window.onscroll = () => {
      this.scrollHander();
    };
  }

  scrollHander() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    this.scrollTopSVG = `-${scrollTop / 2}px`;
    this.scrollTopTitle = `-${scrollTop / 3}px`;
  }

  ngOnDestroy() {
    window.onscroll = null;
  }

  // ngOnDestroy() {
    // setTimeout(() => {
    //   this.show = false;
    // }, 0);
    // document.getElementById('element').style.opacity = '0.1';
    // const now = Date.now();
    // while (1) {
    //   if (Date.now() - now >= 500) {
    //     return;
    //   }
    // }
  // }

}
