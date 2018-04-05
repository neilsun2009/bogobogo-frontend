import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpService, IResponse } from '../http.service';
import { Word } from '../../models/word';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WordService {

  private wordsUrl = '/api/words';
  private oneUrl = '/api/word';

  constructor(
    private http: HttpService
  ) { }

  getWords(before, s, offset, limit, callback, err) {
    const url = this.http.concatUrl(this.wordsUrl,
      ['before', 's', 'offset', 'limit'],
      [before, s, offset, limit]);
    this.http.get<IResponse<Word[]>>(url, callback, err);
  }

  // getOneAsync(href): Observable<IResponse<Word>> {
  //   const params = `?href=${href}`;
  //   return this.http.getAsync<IResponse<Word>>(`${this.oneUrl}${params}`);
  // }

  delete(params, callback, err) {
    this.http.delete<IResponse<Word>>(this.oneUrl, params, callback, err);
  }

  // update(params, callback, err) {
  //   this.http.put<IResponse<Comment>>(this.oneUrl, params, callback, err);
  // }

  add(params, callback, err) {
    this.http.post<IResponse<Word>>(this.oneUrl, params, callback, err);
  }

}
