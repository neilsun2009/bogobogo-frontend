import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Byte } from '../../../models/byte';
import { ByteService } from '../../../services/api/byte.service';

@Component({
  selector: 'app-add-byte',
  templateUrl: './add-byte.component.html',
  styleUrls: ['./add-byte.component.less']
})
export class AddByteComponent implements OnInit {

  addParam: {
    date: string;
    character: string;
    note?: string;
  };

  constructor(
    public dialogRef: MatDialogRef<AddByteComponent>,
    private byteService: ByteService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.addParam = {
      date: '',
      character: '',
      note: '',
    };
  }

  ngOnInit() {
    this.addParam.date = this.data.dateString;
  }

  add() {
    this.byteService.add(this.addParam,
    (data) => {
      this.dialogRef.close(data);
    }, this.handleError);
  }

  private handleError(err) {
    alert(`Error: ${err.message}`);
    console.log(err);
  }

}
