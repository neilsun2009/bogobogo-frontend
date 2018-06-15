import { Component, OnInit, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { ArticleService } from '../../services/api/article.service';
import { AuthService } from '../../services/api/auth.service';
import { Article} from '../../models/article';
import { User } from '../../models/user';
import { loadingAnimation } from '../../global-anim';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  animations: [loadingAnimation]
})
export class ListComponent implements OnInit {

  @Input() cat: string;
  tag: string;
  @Input() initLoad: boolean;
  @Input() showDatePicker: boolean;
  @Input() showCat: boolean;
  articles: Article[];
  private circleWidth: number;
  private loadLock: boolean;
  hasMore: boolean;
  noResult: boolean;
  offset: number;
  limit: number;
  private before: string;
  // private canScrollLoad: boolean;
  showLoading: boolean;
  showAddPanel: boolean;
  user: User;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private renderer2: Renderer2
  ) {
    this.loadLock = false;
    this.noResult = false;
    this.hasMore = true;
    this.offset = 0;
    this.limit = 10;
    this.before = '';
    this.articles = [];
    // this.canScrollLoad = true;
    this.showLoading = true;
    this.showAddPanel = false;
  }

  ngOnInit() {
    // console.log(this.cat);
    this.user = this.authService.user;
    // console.log(this.initLoad);
    if (this.initLoad) {
      this.getArticles();
    }
    this.scrollHandler();
    window.addEventListener('scroll', () => {
      this.scrollHandler();
    });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes);
  //   // for (let propName of changes) {
  //   //   let chng = changes[propName];
  //   //   let cur  = JSON.stringify(chng.currentValue);
  //   //   let prev = JSON.stringify(chng.previousValue);
  //   //   console.log(chng, cur, prev);
  //   // }
  // }

  scrollHandler() {
    const screenTop = document.body.scrollTop || document.documentElement.scrollTop,
      height = document.documentElement.offsetHeight,
      clientHeight = document.documentElement.clientHeight;
    // auto load
    if (height - clientHeight - screenTop < 150 && !this.loadLock && this.hasMore) {
      // this.loadLock = true;
      // console.log(true);
      this.getArticles();
    }
    // show add panel
    if (clientHeight / 2 < screenTop) {
      this.showAddPanel = true;
      // console.log(this.showDatePicker);
    } else {
      this.showAddPanel = false;
    }
  }

  getArticles() {
    // console.log(this.tag);
    if (this.loadLock) {
      return;
    }
    this.showLoading = true;
    this.loadLock = true;
    this.articleService.getArticles(this.cat, this.before, this.tag, '', this.offset, this.limit,
    (data) => {
      this.loadLock = false;
      this.showLoading = false;
      // console.log(data);
      if (data.count === 0) {
        this.noResult = true;
        this.hasMore = false;
        // this.canScrollLoad = false;
      } else {
        this.noResult = false;
        this.articles = this.articles.concat(data.articles);
        if (data.count <= this.offset + this.limit) {
          // this.canScrollLoad = false;
          this.hasMore = false;
        } else {
          this.offset += this.limit;
          this.hasMore = true;
        }
      }
    }, (err) => {
      alert(`网络错误：${err.message}`);
      console.log(err);
    });
  }

  onChangeDate(e) {
    this.articles = [];
    this.offset = 0;
    this.before = e;
    this.getArticles();
    // console.log(e);
  }

}
