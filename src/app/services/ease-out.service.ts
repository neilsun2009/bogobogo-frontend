import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EaseOutService {

  // Observable sources
  private easeOutSource = new Subject<boolean>();

  // Observable string streams
  easeOut$ = this.easeOutSource.asObservable();

  setEaseOut(easeOut: boolean) {
    this.easeOutSource.next(easeOut);
  }
}
