import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less']
})
export class DatePickerComponent implements OnInit {

  showDatePickerByScroll: boolean;
  years: string[];
  months: string[];
  private currentYear: number;
  private currentMonth: number;
  yearOffset: string;
  private circleWidth: number;
  monthOffset: string;
  private dateNum: number;
  @Output() onChangeDate = new EventEmitter<string>();

  constructor() {
    this.dateNum = 0;
  }

  ngOnInit() {
    this.initDatePicker();
    this.scrollHandler();
    window.addEventListener('scroll', () => {
      this.scrollHandler();
    });
  }

  initDatePicker() {
    // if (!this.showDatePicker) {
    //   return;
    // }
    // console.log(this.showDatePicker);
    this.showDatePickerByScroll = false;
    this.circleWidth = document.getElementById('circle').offsetWidth;
    const year = new Date(Date.now()).getFullYear() % 100,
      month = new Date(Date.now()).getMonth();
    this.currentMonth = month;
    this.years = [];
    for (let i = 14; i <= year; ++i) {
      this.years.push(`'${i}`);
    }
    this.currentYear = this.years.length - 1;
    this.months = [];
    for (let i = 1; i <= 12; ++i) {
      this.months.push(i + '');
    }
    this.setDateOffset('year', this.currentYear, false);
    this.setDateOffset('month', this.currentMonth, false);
    window.addEventListener('resize', () => {
      const circle = document.getElementById('circle');
      if (!circle) {
        return;
      }
      this.circleWidth = circle.offsetWidth;
      this.setDateOffset('year', this.currentYear, false);
      this.setDateOffset('month', this.currentMonth, false);
    });
  }

  scrollHandler() {
    const screenTop = document.body.scrollTop || document.documentElement.scrollTop,
      height = document.documentElement.offsetHeight,
      clientHeight = document.documentElement.clientHeight;
    // show date picker
    // console.log(screenTop, height, clientHeight);
    if (clientHeight / 2 < screenTop) {
      this.showDatePickerByScroll = true;
      // console.log(this.showDatePicker);
    } else {
      this.showDatePickerByScroll = false;
    }
  }

  setNewDate(type, num) {
    if (type === 'month') {
      this.currentMonth += num;
      if (this.currentMonth === 12) {
        this.currentMonth = 0;
      } else if (this.currentMonth === -1) {
        this.currentMonth = 11;
      }
      this.setDateOffset('month', this.currentMonth, true);
    } else {
      this.currentYear += num;
      if (this.currentYear === this.years.length) {
        this.currentYear = 0;
      } else if (this.currentYear === -1) {
        this.currentYear = this.years.length - 1;
      }
      this.setDateOffset('year', this.currentYear, true);
    }
  }

  private setDateOffset(type, num, getData) {
    const offset = (-num * this.circleWidth) + 'px',
      nowDateNum = ++this.dateNum;
    // console.log(type, num, offset);
    if (type === 'month') {
      this.monthOffset = offset;
    } else {
      this.yearOffset = offset;
    }
    // delay method to load new date before the date selected
    if (getData) {
      // console.log(true);
      setTimeout(() => {
        if (nowDateNum !== this.dateNum || this.dateNum < 3) {
          // console.log(false);
          return;
        }
        // console.log(true);
        this.onChangeDate.emit(new Date(+`20${this.years[this.currentYear].substr(1)}`, +this.currentMonth + 1).toUTCString());
      }, 500);
    }
  }

}
