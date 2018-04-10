import { Component, OnInit, OnDestroy } from '@angular/core';
import { WordService } from '../../../services/api/word.service';
import { Word} from '../../../models/word';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/api/auth.service';
import { DeleteWordComponent } from '../delete-word/delete-word.component';
import { UpdateWordComponent } from '../update-word/update-word.component';
import { AddWordComponent } from '../add-word/add-word.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.less']
})
export class WordListComponent implements OnInit, OnDestroy {

  words: Word[];
  tops: number[];
  user: User;
  showLoading: boolean;
  private loadLock: boolean;
  hasMore: boolean;
  noResult: boolean;
  private offset: number;
  private limit: number;
  private before: string;
  private scrollNum: number;
  showAddPanel: boolean;

  constructor(
    private wordService: WordService,
    private authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.showLoading = true;
    this.noResult = false;
    this.hasMore = true;
    this.loadLock = false;
    this.offset = 0;
    this.limit = 20;
    this.before = '';
    this.words = [];
    this.tops = [];
    this.scrollNum = 0;
    this.showAddPanel = false;
  }

  ngOnInit() {
    this.user = this.authService.user;
    this.getWords();
    this.scrollHandler();
    window.addEventListener('scroll', () => {
      const nowNum = ++this.scrollNum;
      // setTimeout(() => {
        // if (this.scrollNum === nowNum) {
          this.scrollHandler();
        // }
      // }, 10);
    });
    window.addEventListener('resize', () => {
      const nowNum = ++this.scrollNum;
      setTimeout(() => {
        if (this.scrollNum === nowNum) {
          this.scrollHandler();
        }
      }, 500);
    });
  }

  ngOnDestroy() {
    this.words = [];
  }

  private getWords() {
    if (this.loadLock) {
      return;
    }
    this.showLoading = true;
    this.loadLock = true;
    this.wordService.getWords(this.before, '', this.offset, this.limit,
    (data) => {
      this.loadLock = false;
      this.showLoading = false;
      if (data.count === 0) {
        this.noResult = true;
        this.hasMore = false;
        // this.canScrollLoad = false;
      } else {
        this.noResult = false;
        for (let i = 0, len = data.words.length; i < len; ++i) {
          // data.data[i].image = Math.floor(Math.random() * 2) ? data.data[i].image : '';
          this.tops[i] = 0;
        }
        this.words = this.words.concat(data.words);
        if (data.count <= this.offset + this.limit) {
          // this.canScrollLoad = false;
          this.hasMore = false;
        } else {
          this.offset += this.limit;
          this.hasMore = true;
        }
      }
    }, (err) => {
      alert(`网络错误：${err.message}`);
      console.log(err);
    });
  }

  getElementTop(el): number {
    let top = el.offsetTop,
      parent = el.offsetParent;
    while (parent !== null) {
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return top;
  }

  scrollHandler() {
    const screenTop = document.body.scrollTop || document.documentElement.scrollTop,
      height = document.documentElement.offsetHeight,
      clientHeight = document.documentElement.clientHeight;
    // have to calculate the element's top value everytime
    // because when its preceder flies up, it's own position changes
    for (let i = 0, len = this.words.length; i < len; ++i) {
      const originalTop = this.getElementTop(document.getElementById(`word${i}`));
      let calTop = Math.min((originalTop - screenTop - 200) * 0.5, 0);
      calTop = Math.max(calTop, -500);
      this.tops[i] = calTop;
    }
    // console.log(this.scrollTop);
    // auto load
    if (height - clientHeight - screenTop < 150 && !this.loadLock && this.hasMore) {
      // this.loadLock = true;
      // console.log(true);
      this.getWords();
    }
    // show add panel
    if (clientHeight / 2 < screenTop) {
      this.showAddPanel = true;
      // console.log(this.showDatePicker);
    } else {
      this.showAddPanel = false;
    }
  }

  onChangeDate(e) {
    this.words = [];
    this.offset = 0;
    this.before = e;
    this.getWords();
    // console.log(e);
  }

  delete(id) {
    // console.log(id);
    if (!this.user || this.user.access !== 'administrator') {
      return;
    }
    const dialogRef = this.dialog.open(DeleteWordComponent, {
      data: this.words[id],
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Word deleted!', 'Meh', {
          duration: 1500
        });
        this.words = [];
        this.offset = 0;
        this.getWords();
      }
    });
  }

  update(id) {
    // console.log(id);
    if (!this.user || this.user.access !== 'administrator') {
      return;
    }
    const dialogRef = this.dialog.open(UpdateWordComponent, {
      data: this.words[id],
      width: '400px',
      height: '300px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Word modified!', 'Meh', {
          duration: 1500
        });
        this.words = [];
        this.offset = 0;
        this.getWords();
      }
    });
  }

  add() {
    if (!this.user || this.user.access !== 'administrator') {
      return;
    }
    const dialogRef = this.dialog.open(AddWordComponent, {
      width: '400px',
      height: '300px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Word added!', 'Hoo-Ray!', {
          duration: 1500
        });
        this.words = [];
        this.offset = 0;
        this.getWords();
      }
    });
  }

  openImage(url) {
    window.open(url);
  }
}
