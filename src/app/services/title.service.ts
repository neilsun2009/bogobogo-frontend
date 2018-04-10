import { Injectable } from '@angular/core';

const base = 'BogoBogo // Bogo\'s Personal Website';

@Injectable()
export class TitleService {

  setTitle(str: string) {
    if (str.length) {
      document.title = `${str} // ${base}`;
    } else {
      document.title = base;
    }
  }

}
