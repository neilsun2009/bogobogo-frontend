import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpService, IResponse } from '../http.service';
import { Log } from '../../models/log';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LogService {

  private logsUrl = '/api/logs';
  private oneUrl = '/api/log';

  constructor(
    private http: HttpService
  ) { }

  getLogs(offset, limit, callback, err) {
    const url = this.http.concatUrl(this.logsUrl,
      ['offset', 'limit'],
      [offset, limit]);
    this.http.get<IResponse<{logs: Log[], count}>>(url, callback, err);
  }

  // getOneAsync(href): Observable<IResponse<Log>> {
  //   const params = `?href=${href}`;
  //   return this.http.getAsync<IResponse<Log>>(`${this.oneUrl}${params}`);
  // }

  delete(params, callback, err) {
    this.http.delete<IResponse<Log>>(`${this.oneUrl}/id/${params._id}`, params, callback, err);
  }

  update(params, callback, err) {
    this.http.put<IResponse<Comment>>(`${this.oneUrl}/id/${params._id}`, params, callback, err);
  }

  add(params, callback, err) {
    this.http.post<IResponse<Log>>(this.oneUrl, params, callback, err);
  }

}
