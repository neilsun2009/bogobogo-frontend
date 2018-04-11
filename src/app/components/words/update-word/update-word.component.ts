import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Word } from '../../../models/word';
import { WordService } from '../../../services/api/word.service';
import { QiniuService } from '../../../services/api/qiniu.service';

@Component({
  selector: 'app-update-word',
  templateUrl: './update-word.component.html',
  styleUrls: ['./update-word.component.less']
})
export class UpdateWordComponent implements OnInit {

  updateParam: {
    _id: string;
    text: string;
    image: string;
    isPublic: boolean;
  };
  dateString: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateWordComponent>,
    private wordService: WordService,
    private qiniuService: QiniuService,
    @Inject(MAT_DIALOG_DATA) public data: Word
  ) {
  }

  ngOnInit() {
    this.updateParam = this.data;
    this.qiniuService.upload(window['Qiniu'], 'uploadBtn', 'uploadCtn', 'uploadCtn', `bogobogo/words/${this.dateString}/`,
    (up, file, info) => {
      const res = JSON.parse(info.response);
      this.updateParam.image = `${this.qiniuService.domainUrl}${res.key}`;
    }, (up, err, errTip) => {
      alert('err');
      console.log(errTip);
    });
  }

  update() {
    this.wordService.update(this.updateParam,
    (data) => {
      this.dialogRef.close(data);
    }, this.handleError);
  }

  calDateString() {
    const date = new Date(),
      year = date.getFullYear(),
      month = ((date.getMonth() + 101) + '').slice(-2),
      day = ((date.getDate() + 100) + '').slice(-2);
    this.dateString = `${year}-${month}-${day}`;
    // console.log(this.dateString);
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
