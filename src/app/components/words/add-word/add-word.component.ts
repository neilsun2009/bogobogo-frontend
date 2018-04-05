import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Word } from '../../../models/word';
import { WordService } from '../../../services/api/word.service';
import { QiniuService } from '../../../services/api/qiniu.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.less']
})
export class AddWordComponent implements OnInit {

  addParam: {
    text: string;
    image: string;
  };

  constructor(
    public dialogRef: MatDialogRef<AddWordComponent>,
    private wordService: WordService,
    private qiniuService: QiniuService
  ) {
    this.addParam = {
      text: '',
      image: ''
    };
  }

  ngOnInit() {
    this.qiniuService.upload(window['Qiniu'], 'uploadBtn', 'uploadCtn', 'uploadCtn', 'bogobogo/words/',
    (up, file, info) => {
      const res = JSON.parse(info.response);
      this.addParam.image = `${this.qiniuService.domainUrl}${res.key}`;
    }, (up, err, errTip) => {
      alert('err');
      console.log(errTip);
    });
  }

  add() {
    this.wordService.add(this.addParam,
    (data) => {
      if (data.result) {
        this.dialogRef.close(data);
      } else {
        this.handleError(data);
      }
    }, this.handleError);
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
