import { Component, OnInit, Input, Renderer2 } from '@angular/core';
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
  @Input() showDatePicker: boolean;
  @Input() showCat: boolean;
  showDatePickerByScroll: boolean;
  articles: Article[];
  years: string[];
  months: string[];
  private currentYear: number;
  private currentMonth: number;
  yearOffset: string;
  monthOffset: string;
  private circleWidth: number;
  private loadLock: boolean;
  hasMore: boolean;
  noResult: boolean;
  private offset: number;
  private limit: number;
  private dateNum: number;
  private before: string;
  // private canScrollLoad: boolean;
  showLoading: boolean;
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
    this.dateNum = 0;
    this.showLoading = true;
  }

  ngOnInit() {
    this.user = this.authService.user;
    this.initDatePicker();
    this.getArticles();
    this.scrollHandler();
    window.addEventListener('scroll', () => {
      this.scrollHandler();
    });
  }

  initDatePicker() {
    // if (!this.showDatePicker) {
    //   return;
    // }
    // console.log(this.showDatePicker);
    this.showDatePickerByScroll = false;
    this.circleWidth = document.getElementById('circle').offsetWidth;
    const year = new Date(Date.now()).getFullYear() % 100,
      month = new Date(Date.now()).getMonth();
    this.currentMonth = month;
    this.years = [];
    for (let i = 14; i <= year; ++i) {
      this.years.push(`'${i}`);
    }
    this.currentYear = this.years.length - 1;
    this.months = [];
    for (let i = 1; i <= 12; ++i) {
      this.months.push(i + '');
    }
    this.setDateOffset('year', this.currentYear, false);
    this.setDateOffset('month', this.currentMonth, false);
    window.addEventListener('resize', () => {
      const circle = document.getElementById('circle');
      if (!circle) {
        return;
      }
      this.circleWidth = circle.offsetWidth;
      this.setDateOffset('year', this.currentYear, false);
      this.setDateOffset('month', this.currentMonth, false);
    });
  }

  scrollHandler() {
    const screenTop = document.body.scrollTop || document.documentElement.scrollTop,
      height = document.documentElement.offsetHeight,
      clientHeight = document.documentElement.clientHeight;
    // show date picker
    if (clientHeight / 2 < screenTop) {
      this.showDatePickerByScroll = true;
      // console.log(this.showDatePicker);
    } else {
      this.showDatePickerByScroll = false;
    }
    // auto load
    if (height - clientHeight - screenTop < 150 && !this.loadLock && this.hasMore) {
      // this.loadLock = true;
      // console.log(true);
      this.getArticles();
    }
  }

  setNewDate(type, num) {
    if (type === 'month') {
      this.currentMonth += num;
      if (this.currentMonth === 12) {
        this.currentMonth = 0;
      } else if (this.currentMonth === -1) {
        this.currentMonth = 11;
      }
      this.setDateOffset('month', this.currentMonth, true);
    } else {
      this.currentYear += num;
      if (this.currentYear === this.years.length) {
        this.currentYear = 0;
      } else if (this.currentYear === -1) {
        this.currentYear = this.years.length - 1;
      }
      this.setDateOffset('year', this.currentYear, true);
    }
  }

  private setDateOffset(type, num, getData) {
    const offset = (-num * this.circleWidth) + 'px',
      nowDateNum = ++this.dateNum;
    // console.log(type, num, offset);
    if (type === 'month') {
      this.monthOffset = offset;
    } else {
      this.yearOffset = offset;
    }
    // delay method to load new date before the date selected
    if (getData) {
      setTimeout(() => {
        if (nowDateNum !== this.dateNum || this.dateNum < 3) {
          return;
        }
        this.articles = [];
        this.offset = 0;
        this.before = new Date(+`20${this.years[this.currentYear].substr(1)}`, +this.currentMonth + 1).toUTCString();
        this.getArticles();
      }, 500);
    }
  }

  private getArticles() {
    if (this.loadLock) {
      return;
    }
    this.showLoading = true;
    this.loadLock = true;
    this.articleService.getArticles(this.cat, this.before, '', '', this.offset, this.limit,
    (data) => {
      this.loadLock = false;
      this.showLoading = false;
      if (data.count === 0) {
        this.noResult = true;
        this.hasMore = false;
        // this.canScrollLoad = false;
      } else {
        this.articles = this.articles.concat(data.data);
        if (data.count <= this.offset + this.limit) {
          // this.canScrollLoad = false;
          this.hasMore = false;
        } else {
          this.offset += this.limit;
        }
      }
    }, (err) => {
      alert(`网络错误：${err.message}`);
      console.log(err);
    });
  }

}
