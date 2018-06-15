import { Component, OnInit, HostBinding } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';
import { GeneralService } from '../../services/api/general.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { scaleOutAnimation } from '../../global-anim';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/api/article.service';
import * as moment from 'moment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less'],
  animations: [scaleOutAnimation]
})
export class BlogComponent implements OnInit {

  @HostBinding('@scaleOut') routeAnimation = true;

  catConfig: any;
  title: string;

  constructor(
    private articleService: ArticleService,
    private bgConfigService: BgConfigService,
    private generalService: GeneralService
  ) {
    this.catConfig = generalService.generalData.cats.blog;
    this.title = this.catConfig.title;
  }

  ngOnInit() {
    this.bgConfigService.setConfig({
      primaryColor: this.catConfig.primaryColor,
      secondaryColor: this.catConfig.secondaryColor,
      layerBg: this.catConfig.layerBg,
      showMenu: false,
      showTrigger: true
    });
    // set responsive title
    this.articleService.getArticles('blog', '', '', '', 0, 1,
    (data) => {
      const article = data.articles[0],
        now = moment(Date.now()).hour(0).minute(0).second(0).millisecond(0),
        addTime = moment(article.addTime).hour(0).minute(0).second(0).millisecond(0),
        days = now.diff(addTime, 'days');
      if (!days) {
        this.title = 'UPDATED TODAY!';
      } else if (days === 1) {
        this.title = '1 DAY WITHOUT UPDATE';
      } else {
        this.title = `${days} DAYS WITHOUT UPDATE`;
      }
    }, (err) => {
      console.log(err);
    });
  }

}
