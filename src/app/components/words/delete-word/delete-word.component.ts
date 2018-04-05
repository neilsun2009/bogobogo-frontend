import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Word } from '../../../models/word';
import { WordService } from '../../../services/api/word.service';

@Component({
  selector: 'app-delete-word',
  templateUrl: './delete-word.component.html',
  styleUrls: ['./delete-word.component.less']
})
export class DeleteWordComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteWordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Word,
    private wordService: WordService
  ) { }

  delete() {
    this.wordService.delete({id: this.data._id},
      (data) => {
        if (data.result) {
          this.dialogRef.close(true);
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
