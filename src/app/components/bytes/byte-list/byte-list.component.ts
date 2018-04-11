import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Byte } from '../../../models/byte';
import { AuthService } from '../../../services/api/auth.service';
import { ByteService } from '../../../services/api/byte.service';
import * as moment from 'moment';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AddByteComponent } from '../add-byte/add-byte.component';
import { UpdateByteComponent } from '../update-byte/update-byte.component';
import { MatDialog, MatSnackBar } from '@angular/material';

class DisplayByte {
  date?: Date;
  dateString?: String;
  byte?: Byte;
}

@Component({
  selector: 'app-byte-list',
  templateUrl: './byte-list.component.html',
  styleUrls: ['./byte-list.component.less'],
  animations: [
    trigger('byte', [
      state('*', style({})),
      transition('* => void', [
        animate(0)
      ]),
      transition('* => *', [
        style({opacity: 0, transform: 'rotateY(270deg)'}),
        animate('600ms ease-out')
      ]),
      // transition(':enter', [
      //   style({opacity: 0, transform: 'rotateY(270deg) scale(0)'}),
      //   animate('600ms ease-out')
      // ]),

    ]),
  ]
})
export class ByteListComponent implements OnInit {

  user: User;
  highlight: DisplayByte;
  bytes: DisplayByte[];
  private limit: number;
  private offset: number;
  private loadLock: boolean;
  private isInit: boolean;
  private after: string;

  constructor(
    private authService: AuthService,
    private byteService: ByteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.bytes = [{}, {}, {}, {}, {}, {}, {}];
    // this.bytes.length = 7;
    this.limit = 7;
    this.offset = 0;
    this.loadLock = false;
    this.isInit = true;
  }

  ngOnInit() {
    this.user = this.authService.user;
    // this.getSunday(new Date());
    this.after = this.getSunday(new Date());
    this.getBytes();
  }

  getBytes() {
    if (this.loadLock) {
      return;
    }
    this.loadLock = true;
    this.byteService.getBytes(this.after, this.offset, this.limit,
    (data) => {
      this.loadLock = false;
      this.setNewDates(this.after, data.bytes);
      // for (let i = 0, len = data.bytes.length; i < len; ++i) {
      //   this.insertByte(data.bytes[i]);
      // }
      // if (this.isInit) {
      //   this.isInit = false;
      //   this.setHighlight(new Date());
      // } else {
      //   this.setHighlight(0);
      // }
    }, (err) => {
      alert(`网络错误：${err.message}`);
      console.log(err);
    });
  }

  clickPicker(week: number) {
    this.after = moment(this.after).day(week * 7).format('YYYY-MM-DD');
    this.getBytes();
  }

  private setNewDates(start, dataBytes) {
    function asyncAdd(num, data, that) {
      setTimeout(() => {
        that.bytes[num] = data;
        if (num === 6) {
          for (let i = 0, len = dataBytes.length; i < len; ++i) {
            that.insertByte(dataBytes[i]);
          }
          if (that.isInit) {
            that.isInit = false;
            that.setHighlight(new Date());
          } else {
            that.setHighlight(0);
          }
        }
      }, 50 * num);
    }
    const startMoment = moment(start);
    // console.log(startMoment);
    // this.bytes = [];
    for (let i = 0; i < 7; ++i) {
      // this.bytes.push({
      //   date: startMoment.toDate(),
      //   dateString: startMoment.format('YYYY-MM-DD'),
      //   byte: null
      // });
      // startMoment.add(1, 'd');
      asyncAdd(i, {
        date: startMoment.toDate(),
        dateString: startMoment.format('YYYY-MM-DD'),
        byte: null
      }, this);
      startMoment.add(1, 'd');
    }
    // console.log(this.bytes);
  }

  addOrUpdate() {
    if (!this.user || this.user.access !== 'administrator') {
      return;
    }
    if (this.highlight.byte) { // update
      const dialogRef = this.dialog.open(UpdateByteComponent, {
        width: '400px',
        // height: '300px',
        disableClose: true,
        data: this.highlight
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.snackBar.open('Byte updated!', 'Hoo-Ray!', {
            duration: 1500
          });
          this.getBytes();
        }
      });
    } else { // add
      const dialogRef = this.dialog.open(AddByteComponent, {
        width: '400px',
        // height: '300px',
        disableClose: true,
        data: this.highlight
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.snackBar.open('Byte added!', 'Hoo-Ray!', {
            duration: 1500
          });
          this.getBytes();
        }
      });
    }
  }

  onChangeDate(e) {
    this.after = this.getSunday(moment(e).subtract(1, 'M').toDate());
    this.getBytes();
    // console.log(e);
  }

  private insertByte(byte) {
    for (let i = 0; i < 7; ++i) {
      if (this.bytes[i].dateString === byte.date) {
        this.bytes[i].byte = byte;
      }
    }
  }

  private getSunday(date: Date | string) {
    return moment(date).day(0).format('YYYY-MM-DD');
  }

  private setHighlight(num: Date | number) {
    if (typeof num === 'number') {
      if (num >= 0 && num < 7) {
        this.highlight = this.bytes[num];
      } else {
        this.highlight = this.bytes[0];
      }
    } else {
      const date = moment(num).format('YYYY-MM-DD');
      for (let i = 0; i < 7; ++i) {
        if (date === this.bytes[i].dateString) {
          this.highlight = this.bytes[i];
          return;
        }
      }
      this.highlight = this.bytes[0];
    }
  }

}
