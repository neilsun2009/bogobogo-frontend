import { Component, EventEmitter, HostBinding, Output, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { Article} from '../../../models/article';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/api/auth.service';
import { DeleteArticleComponent } from '../../article/admin/delete-article/delete-article.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less'],
  animations: [
    trigger('loadAnim', [
      state('*', style({})),
      transition(':enter', [
        style({opacity: 0}),
        animate('500ms ease-out')
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({opacity: 0}))
      ])
    ])
  ]
})
export class ItemComponent implements OnInit {

  // @HostBinding('@loadAnim') loadAnim = true;

  @Input() article: Article;
  @Input() isRight: boolean;
  @Input() showCat: boolean;
  scrollTop: number;
  originalTop: number;
  asyncImage: string;
  imageReady: boolean;
  user: User;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private renderer: Renderer2,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.user = this.authService.user;
    window.addEventListener('resize', () => {
      this.setNewTop();
    });
    this.setNewTop();
    this.scrollHandler();
    window.addEventListener('scroll', () => {
      this.scrollHandler();
    });
    this.getImage(this.article.image);
  }

  getImage(url) {
    const image = new Image();
    this.imageReady = false;
    this.asyncImage = 'https://dummyimage.com/8x5/f279a9';
    image.src = url;
    image.onload = () => {
      this.asyncImage = url;
      this.imageReady = true;
    };
  }

  scrollHandler() {
    const screenTop = document.body.scrollTop || document.documentElement.scrollTop;
    // have to calculate the element's top value everytime
    // because when its preceder flies up, it's own position changes
    this.originalTop = this.getElementTop(this.elementRef.nativeElement);
    this.scrollTop = Math.min((this.originalTop - screenTop - 200) * 0.5, 0);
    // console.log(this.scrollTop);
  }

  getElementTop(el): number {
    let top = el.offsetTop,
      parent = el.offsetParent;
    while (parent !== null) {
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return top;
  }

  setNewTop() {
    this.scrollTop = 0;
    this.originalTop = this.getElementTop(this.elementRef.nativeElement);
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
        this.snackBar.open('Article deleted!', 'Meh', {
          duration: 1500
        });
        window.location.reload();
      }
    });
  }

}
