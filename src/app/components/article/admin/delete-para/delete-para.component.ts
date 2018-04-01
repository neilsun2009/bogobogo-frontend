import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-para',
  templateUrl: './delete-para.component.html',
  styleUrls: ['./delete-para.component.less']
})
export class DeleteParaComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteParaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string},
  ) { }

}
