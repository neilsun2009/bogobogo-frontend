import { Component, OnInit, ViewChild } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';
import { GeneralService } from '../../services/api/general.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ListComponent } from '../list/list.component';

const cats = ['bio', 'coding', 'design', 'translation',
  'bytes', 'words', 'blog', 'more'];

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.less'],
  animations: [
    trigger('header', [
      state('*', style({})),
      transition('* => *', [
        style({transform: 'scale(0)'}),
        animate('500ms 600ms ease-out')
      ])
    ])
  ]
})
export class TagComponent implements OnInit {

  tag$: Observable<string>;
  @ViewChild(ListComponent)
  private listComponent: ListComponent;

  constructor(
    private bgConfigService: BgConfigService,
    private generalService: GeneralService,
    // private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const randomCat = Math.floor(Math.random() * 8),
      catConfig = this.generalService.generalData.cats[cats[randomCat]];
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.tag$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        // console.log(params.get('tag'));
        this.listComponent.articles = [];
        this.listComponent.offset = 0;
        this.listComponent.tag = params.get('tag');
        this.listComponent.getArticles();
        return new Observable<string>((observer) => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          observer.next(params.get('tag'));
        });
      });
    // console.log(this.tag);
    this.bgConfigService.setConfig({
      primaryColor: catConfig.primaryColor,
      secondaryColor: catConfig.secondaryColor,
      layerBg: catConfig.layerBg,
      showMenu: false,
      showTrigger: true
    });
  }

}
