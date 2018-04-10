import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GeneralService } from '../../services/api/general.service';
import { EaseOutService } from '../../services/ease-out.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../models/user';
import { AuthService } from '../../services/api/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UpdateGeneralComponent } from './update-general/update-general.component';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  animations: [
    trigger('svg-left', [
      state('*', style({transform: 'translateY(0)'})),
      transition(':enter', [
        style({transform: 'translateY(-500px)'}),
        animate('1000ms 800ms ease-out')
      ])
    ]),
    trigger('svg-right', [
      state('*', style({transform: 'translateY(0)'})),
      transition(':enter', [
        style({transform: 'translateY(500px)'}),
        animate('1000ms 800ms ease-out')
      ])
    ]),
    trigger('bar', [
      state('*', style({})),
      transition(':enter', [
        style({transform: 'scale(0) translateY(15px)', opacity: 0}),
        animate('1000ms 1000ms ease-out')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  @Input() cat: string;
  @Input() title: string;
  general: any;
  scrollTopSVG: string;
  scrollTopTitle: string;
  // show: boolean;
  user: User;

  constructor(
    private generalService: GeneralService,
    private easeOutService: EaseOutService,
    private authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private titleService: TitleService
  ) {
    // this.show = true;
  }

  ngOnInit() {
    let titleWord = this.cat;
    switch (this.cat) {
      case 'bio': titleWord = 'Biography'; break;
      case 'coding': titleWord = 'Coding'; break;
      case 'design': titleWord = 'Design'; break;
      case 'translation': titleWord = 'Translation'; break;
      case 'words': titleWord = 'Wørds'; break;
      case 'bytes': titleWord = 'ßytes'; break;
      case 'blog': titleWord = 'Blog'; break;
      case 'more': titleWord = 'More'; break;
    }
    this.titleService.setTitle(titleWord);
    this.user = this.authService.user;
    document.body.scrollTop = 0;
    this.general = this.generalService.generalData.cats[this.cat];
    // this.easeOutService.easeOut$.subscribe((easeOut) => {
    //   console.log(easeOut);
    // });
    // on scroll
    this.scrollHander();
    window.addEventListener('scroll', () => {
      this.scrollHander();
    });
  }

  scrollHander() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    this.scrollTopSVG = `-${scrollTop / 2}px`;
    this.scrollTopTitle = `-${scrollTop / 3}px`;
  }

  updateGeneral() {
    if (!this.user || this.user.access !== 'administrator') {
      return;
    }
    const dialogRef = this.dialog.open(UpdateGeneralComponent, {
      width: '400px',
      data: this.cat
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        location.reload();
      }
    });
  }

}
