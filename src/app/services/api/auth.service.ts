import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpService, IResponse } from '../http.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private userUrl = '/api/user';
  private authUrl = '/api/session';

  hasLoggedIn = false;
  redirectUrl = '/';
  user: User;

  constructor(
    private http: HttpService
  ) { }

  login(param, callback, err) {
    this.http.post<IResponse<User>>(this.authUrl, param, callback, err);
  }

  signup(param, callback, err) {
    this.http.post<IResponse<User>>(this.userUrl, param, callback, err);
  }

  auth(callback, err) {
    this.http.get<IResponse<User>>(this.authUrl, callback, err);
  }

  authAsync() {
    return this.http.getAsync<IResponse<User>>(this.authUrl);
  }

  logout(callback, err) {
    this.http.delete<IResponse<null>>(this.authUrl, {}, callback, err);
  }

}
