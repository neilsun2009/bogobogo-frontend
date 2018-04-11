import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpService, IResponse } from '../http.service';
import { Byte } from '../../models/byte';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ByteService {

  private bytesUrl = '/api/bytes';
  private oneUrl = '/api/byte';

  constructor(
    private http: HttpService
  ) { }

  getBytes(after, offset, limit, callback, err) {
    const url = this.http.concatUrl(this.bytesUrl,
      ['after', 'offset', 'limit'],
      [after, offset, limit]);
    this.http.get<IResponse<{bytes: Byte[], count}>>(url, callback, err);
  }

  // getOneAsync(href): Observable<IResponse<Byte>> {
  //   const params = `?href=${href}`;
  //   return this.http.getAsync<IResponse<Byte>>(`${this.oneUrl}${params}`);
  // }

  delete(params, callback, err) {
    this.http.delete<IResponse<Byte>>(`${this.oneUrl}/id/${params._id}`, params, callback, err);
  }

  update(params, callback, err) {
    this.http.put<IResponse<Comment>>(`${this.oneUrl}/id/${params._id}`, params, callback, err);
  }

  add(params, callback, err) {
    this.http.post<IResponse<Byte>>(this.oneUrl, params, callback, err);
  }

}
