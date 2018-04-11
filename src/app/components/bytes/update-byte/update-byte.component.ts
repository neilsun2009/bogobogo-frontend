import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Byte } from '../../../models/byte';
import { ByteService } from '../../../services/api/byte.service';

@Component({
  selector: 'app-update-byte',
  templateUrl: './update-byte.component.html',
  styleUrls: ['./update-byte.component.less']
})
export class UpdateByteComponent implements OnInit {

  updateParam: {
    _id: string;
    date: string;
    character: string;
    note?: string;
  };

  constructor(
    public dialogRef: MatDialogRef<UpdateByteComponent>,
    private byteService: ByteService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.updateParam = {
      _id: '',
      date: '',
      character: '',
      note: '',
    };
  }

  ngOnInit() {
    this.updateParam = this.data.byte;
  }

  update() {
    this.byteService.update(this.updateParam,
    (data) => {
      this.dialogRef.close(data);
    }, this.handleError);
  }

  private handleError(err) {
    alert(`Error: ${err.message}`);
    console.log(err);
  }

}
