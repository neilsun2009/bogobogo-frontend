import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpService, IResponse } from '../http.service';
import { General } from '../../models/general';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GeneralService {

  private generalUrl = 'http://localhost:4201/api/general';

  generalData: General;

  constructor(
    private http: HttpService
  ) { }

  auth(callback, err) {
    this.http.get<IResponse<General>>(this.generalUrl, callback, err);
  }

  authAsync() {
    return this.http.getAsync<IResponse<General>>(this.generalUrl);
  }

}
