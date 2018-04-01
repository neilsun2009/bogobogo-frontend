import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface IResponse<T> {
    message: string;
    data?: T;
    result: boolean;
    count?: number;
}

@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient,
  ) {}

  get<T>(url: string, callback: ({}) => void, errCallback: ({}) => void) {
    return this.http.get<T>(url).subscribe(
        (data) => {
            callback(data);
        },
        (err) => {
            errCallback(err);
        }
    );
  }

  getAsync<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, body: {}, callback: ({}) => void, errCallback: ({}) => void) {
    return this.http.post<T>(url, body).subscribe(
        (data) => {
            callback(data);
        },
        (err) => {
            errCallback(err);
        }
    );
  }

  put<T>(url: string, body: {}, callback: ({}) => void, errCallback: ({}) => void) {
    return this.http.put<T>(url, body).subscribe(
        (data) => {
            callback(data);
        },
        (err) => {
            errCallback(err);
        }
    );
  }

  delete<T>(url: string, body: {}, callback: ({}) => void, errCallback: ({}) => void) {
    return this.http.delete<T>(url, body).subscribe(
        (data) => {
            callback(data);
        },
        (err) => {
            errCallback(err);
        }
    );
  }

  concatUrl(url: string, keys: string[], values: string[]): string {
    if (url[url.length - 1] !== '?') {
        url += '?';
    }
    for (let i = 0, len = keys.length; i < len; ++i) {
        url += values[i] && values[i].length ? `&${keys[i]}=${values[i]}` : '';
    }
    return url;
  }
}
