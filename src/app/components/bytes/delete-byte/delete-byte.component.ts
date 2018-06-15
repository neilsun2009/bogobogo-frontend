import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Byte } from '../../../models/byte';
import { ByteService } from '../../../services/api/byte.service';

@Component({
  selector: 'app-delete-byte',
  templateUrl: './delete-byte.component.html',
  styleUrls: ['./delete-byte.component.less']
})
export class DeleteByteComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteByteComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private byteService: ByteService
  ) { }

  delete() {
    this.byteService.delete({_id: this.data.byte._id},
      (data) => {
        this.dialogRef.close(true);
      }, this.handleError);
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
