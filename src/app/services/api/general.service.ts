import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpService, IResponse } from '../http.service';
import { General } from '../../models/general';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GeneralService {

  private generalUrl = '/api/general';

  generalData: General;

  constructor(
    private http: HttpService
  ) { }

  getGeneral(callback, err) {
    this.http.get<IResponse<General>>(this.generalUrl, callback, err);
  }

  getGeneralAsync() {
    return this.http.getAsync<IResponse<General>>(this.generalUrl);
  }

}
