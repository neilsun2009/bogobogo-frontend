import { Component, OnInit, Input } from '@angular/core';
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
export class HeaderComponent implements OnInit {

  @Input() cat: string;
  @Input() title: string;
  general: any;
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
