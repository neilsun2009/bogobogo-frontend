import { Component, OnInit, HostBinding, ElementRef, Renderer2, } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/api/article.service';
import { Article } from '../../models/article';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../models/user';
import { AuthService } from '../../services/api/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteArticleComponent } from '../article/admin/delete-article/delete-article.component';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less'],
  animations: [
    trigger('text1', [
      state('*', style({})),
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(500px)'}),
        animate('600ms 500ms ease-out')
      ])
    ]),
    trigger('text2', [
      state('*', style({})),
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(500px)'}),
        animate('600ms 700ms ease-out')
      ])
    ]),
    trigger('text3', [
      state('*', style({})),
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(500px)'}),
        animate('600ms 900ms ease-out')
      ])
    ]),
    trigger('pic', [
      state('*', style({})),
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-1000px)'}),
        animate('800ms 800ms ease-out')
      ])
    ])
  ]
})
export class ArticleComponent implements OnInit {

  @HostBinding('id') id = 'article';

  article: Article;
  asyncImage: string;
  imageReady: boolean;
  scrollTopText: string;
  paraConfigs: {
    title: string;
    top: number;
  }[];
  resizeNumber: number;
  showParaPicker: boolean;
  paraOffset: string;
  private circleWidth: number;
  hideParaList: boolean;
  user: User;

  constructor(
    private bgConfigService: BgConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private authService: AuthService,
    private renderer: Renderer2,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private titleService: TitleService
  ) {
    this.resizeNumber = 0;
    this.paraConfigs = [];
    this.showParaPicker = false;
    this.paraOffset = '0';
    this.hideParaList = true;
  }

  ngOnInit() {
    this.user = this.authService.user;
    document.body.scrollTop = 0;
    this.route.data.subscribe((data: {article: Article}) => {
      const paras = data.article.paras;
      let isLeft = true;
      this.titleService.setTitle(data.article.title);
      // dev text, additional para
      // paras.unshift({
      //   title: 'HTML',
      //   text: 'html',
      //   cover: 'http://olxpdoc6c.bkt.clouddn.com/footprint/team/changchunyatai-star.png',
      //   html: `<p>This is <a href="http://bogobogo.cn">Bogo's</a> personal website.<br/>
      //   Lorem <b>ipsum</b> dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
      //   nibh euismod <i>tincidunt</i> ut laoreet dolore magna aliquam erat volutpat.
      //   Ut <big>wisi</big> enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
      //   lobortis nisl ut <small>aliquip</small> ex ea commodo consequat.
      //   Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,
      //   vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit
      //   praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
      //   <div class="progress">
      //     Mandarin
      //     <div class="outer">
      //       <div class="bar init" style="width: 95%"></div>
      //     </div>
      //   </div>
      //   <div class="progress">
      //     Cantonese
      //     <div class="outer">
      //       <div class="bar init" style="width: 80%"></div>
      //     </div>
      //   </div>
      //   <div class="progress">
      //     English
      //     <div class="outer">
      //       <div class="bar init" style="width: 85%"></div>
      //     </div>
      //   </div>
      //   <div class="progress">
      //     German
      //     <div class="outer">
      //       <div class="bar init" style="width: 50%"></div>
      //     </div>
      //   </div>
      //   <div class="progress">
      //     Spanish
      //     <div class="outer">
      //       <div class="bar init" style="width: 10%"></div>
      //     </div>
      //   </div>
      //   <div class="progress">
      //     Russian
      //     <div class="outer">
      //       <div class="bar init" style="width: 1%"></div>
      //     </div>
      //   </div>
      //   <table>
      //     <tbody>
      //       <tr><th>&nbsp;1</th><th>&nbsp;2</th><th>3&nbsp;</th><th>&nbsp;4</th><th>5&nbsp;</th></tr>
      //       <tr><td>&nbsp;1</td><td>&nbsp;2</td><td>&nbsp;3</td><td>&nbsp;4</td><td>&nbsp;5</td></tr>
      //       <tr><td>&nbsp;1</td><td>&nbsp;2</td><td>&nbsp;3</td><td>&nbsp;4</td><td>&nbsp;5</td></tr>
      //       <tr><td>&nbsp;1</td><td>&nbsp;2</td><td>&nbsp;3</td><td>&nbsp;4</td><td>&nbsp;5</td></tr>
      //       <tr><td>&nbsp;1</td><td>&nbsp;2</td><td>&nbsp;3</td><td>&nbsp;4</td><td>&nbsp;5</td></tr>
      //     </tbody>
      //   </table>
      //   <ul>
      //     <li>First list item</li>
      //     <li><u>Second</u> list item</li>
      //     <li><s>Third</s> list item</li>
      //   </ul>
      //   <blockquote>I am Groot.</blockquote>
      //   <p><img src="http://olxpdoc6c.bkt.clouddn.com/footprint/wallpaper/corner.jpg"></p>
      //   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
      //   nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
      //   Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
      //   Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,
      //   vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit
      //   praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
      //   <pre><code>#include\n#include</code></pre>
      //   <p><img src="http://olxpdoc6c.bkt.clouddn.com/footprint/team/guangzhourf-border.png"></p>
      //   <blockquote>I am Batman.</blockquote>
      //   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
      //   nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
      //   Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
      //   Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,
      //   vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit
      //   praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>`
      // });
      // paras.push({title: 'mid', cover: '', html: '123', text: '123'});
      // set para's mode
      for (let i = 0, len = paras.length; i < len; ++i) {
        paras[i].mode = paras[i].cover ? (isLeft ? 'left' : 'right') : 'middle';
        isLeft = paras[i].cover ? !isLeft : isLeft;
        this.paraConfigs.push({title: paras[i].title, top: 0});
      }
      this.article = data.article;
      this.bgConfigService.setConfig({
        primaryColor: this.article.primaryColor,
        secondaryColor: this.article.secondaryColor,
        layerBg: 'none',
        showMenu: false,
        showTrigger: true
      });
      this.getImage(this.article.image);
      this.scrollHander();
      window.addEventListener('scroll', () => {
        this.scrollHander();
      });
      setTimeout(() => {
        this.calParaConfigs();
      }, 1000);
      window.addEventListener('resize', () => {
        const nowResizeNumber = ++this.resizeNumber;
        setTimeout(() => {
          if (nowResizeNumber !== this.resizeNumber) {
            return;
          }
          this.calParaConfigs();
        }, 500);
      });
    });
  }

  getImage(url) {
    const image = new Image();
    this.imageReady = false;
    this.asyncImage = `${url}?imageView2/0/w/40/q/10|imageslim`;
    image.src = url;
    image.onload = () => {
      this.asyncImage = url;
      this.imageReady = true;
    };
  }

  scrollHander() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
      clientHeight = document.documentElement.clientHeight;
    this.scrollTopText = `-${scrollTop / 2}px`;
    // set para picker
    if (this.paraConfigs[0].top * 2 / 3 < scrollTop) {
      this.showParaPicker = true;
    } else {
      this.showParaPicker = false;
    }
    for (let i = this.paraConfigs.length - 1; i >= 0; --i) {
      if (this.paraConfigs[i].top < scrollTop + clientHeight / 2) {
        this.setParaOffset(i);
        break;
      }
    }
  }

  private setParaOffset(num) {
    // console.log(this.circleWidth);
    this.paraOffset = (-num * this.circleWidth) + 'px';
  }

  // get absolute element top, recursively
  getElementTop(el): number {
    let top = el.offsetTop,
      parent = el.offsetParent;
    while (parent !== null) {
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return top;
  }

  calParaConfigs() {
    const paras = this.elementRef.nativeElement.getElementsByClassName('title'),
      circle = document.getElementById('circle');
    if (!circle) {
      return;
    }
    this.circleWidth = circle.offsetWidth;
    for (let i = 0, len = paras.length; i < len; ++i) {
      this.paraConfigs[i].top = this.getElementTop(paras[i]);
    }
    // console.log(this.paraConfigs);
  }

  onClickTitle() {
    window.open(this.article.image);
  }

  scrollToPara(i) {
    const timeoutFunc = () => {
      if (++num > 50) {
        return;
      }
      if (typeof document.body.scrollTop === 'number') {
        document.body.scrollTop += step;
      } else {
        document.documentElement.scrollTop += step;
      }
      setTimeout(() => {
        timeoutFunc();
      });
    };
    const scrollNow = document.body.scrollTop || document.documentElement.scrollTop,
      scrollDest = this.paraConfigs[i].top,
      distance = scrollDest - scrollNow,
      step = Math.round(distance / 50); // 10ms one animation, for a 500ms duration
    let num = 0;
    setTimeout(() => {
      timeoutFunc();
    }, 10);
  }

  delete() {
    if (!this.user || this.user.access !== 'administrator') {
      return;
    }
    const dialogRef = this.dialog.open(DeleteArticleComponent, {
      data: this.article
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.router.navigate([`/${this.article.cat}`]);
      }
    });
  }

}
