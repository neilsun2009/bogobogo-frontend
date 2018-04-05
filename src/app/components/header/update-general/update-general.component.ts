import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { General } from '../../../models/general';
import { GeneralService } from '../../../services/api/general.service';
import { QiniuService } from '../../../services/api/qiniu.service';
import { BgConfigService } from '../../../services/bg-config.service';

@Component({
  selector: 'app-update-general',
  templateUrl: './update-general.component.html',
  styleUrls: ['./update-general.component.less']
})
export class UpdateGeneralComponent implements OnInit {

  updateParam: {
    cat: string;
    primaryColor: string;
    secondaryColor: string;
    layerBg: string;
    title: string;
  };

  constructor(
    private bgConfigService: BgConfigService,
    public dialogRef: MatDialogRef<UpdateGeneralComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private generalService: GeneralService,
  ) {
    this.updateParam = {
      cat: '',
      primaryColor: '',
      secondaryColor: '',
      layerBg: '',
      title: '',
    };
  }

  ngOnInit() {
    // console.log(this.data);
    const general = this.generalService.generalData.cats[this.data];
    // console.log(this.generalService.generalData);
    this.updateParam = {
      cat: this.data,
      primaryColor: general.primaryColor,
      secondaryColor: general.secondaryColor,
      layerBg: general.layerBg,
      title: general.title,
    };
    console.log(this.updateParam);
  }

  update() {
    this.generalService.update(this.updateParam,
    (data) => {
      if (data.result) {
        this.dialogRef.close(data);
      } else {
        this.handleError(data);
      }
    }, this.handleError);
  }

  tryOut() {
    this.bgConfigService.setConfig({
      primaryColor: this.updateParam.primaryColor,
      secondaryColor: this.updateParam.secondaryColor,
      layerBg: this.updateParam.layerBg,
      showMenu: false,
      showTrigger: true
    });
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
