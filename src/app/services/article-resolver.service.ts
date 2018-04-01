import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import { Article } from '../models/article';
import { ArticleService } from './api/article.service';
import { AuthService } from './api/auth.service';

@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {
    const href = route.paramMap.get('name');
    return this.articleService.getOneAsync(href).take(1).map(data => {
      if (data.data) {
        // if (data.data.isPublic ||
        // (this.authService.user && this.authService.user.access === 'administrator')) {
          return data.data;
        // } else {
        //   this.router.navigate(['/404']);
        //   return null;
        // }
      } else { // id not found
        this.router.navigate(['/404']);
        return null;
      }
    });
  }
}
