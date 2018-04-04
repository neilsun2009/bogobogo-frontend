import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpService, IResponse } from '../http.service';
import { Article } from '../../models/article';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticleService {

  private articlesUrl = '/api/articles';
  private oneUrl = '/api/article';

  constructor(
    private http: HttpService
  ) { }

  getArticles(cat, before, tag, s, offset, limit, callback, err) {
    const url = this.http.concatUrl(this.articlesUrl,
      ['cat', 'before', 'tag', 's', 'offset', 'limit'],
      [cat, before, tag, s, offset, limit]);
    this.http.get<IResponse<Article[]>>(url, callback, err);
  }

  getOneAsync(href): Observable<IResponse<Article>> {
    const params = `?href=${href}`;
    return this.http.getAsync<IResponse<Article>>(`${this.oneUrl}${params}`);
  }

  delete(params, callback, err) {
    this.http.delete<IResponse<Article>>(this.oneUrl, params, callback, err);
  }

  update(params, callback, err) {
    this.http.put<IResponse<Article>>(this.oneUrl, params, callback, err);
  }

  add(params, callback, err) {
    this.http.post<IResponse<Article>>(this.oneUrl, params, callback, err);
  }

}
