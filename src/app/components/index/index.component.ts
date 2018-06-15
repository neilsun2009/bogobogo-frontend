import { Component, OnInit } from '@angular/core';
import { BgConfigService } from '../../services/bg-config.service';
import { GeneralService } from '../../services/api/general.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/api/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UpdateGeneralComponent } from '../header/update-general/update-general.component';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  catConfig: any;
  user: User;

  constructor(
    private bgConfigService: BgConfigService,
    private generalService: GeneralService,
    private authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private titleService: TitleService
  ) {
    this.catConfig = generalService.generalData.cats.index;
  }

  ngOnInit() {
    this.titleService.setTitle('');
    this.user = this.authService.user;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.bgConfigService.setConfig({
      primaryColor: this.catConfig.primaryColor,
      secondaryColor: this.catConfig.secondaryColor,
      layerBg: this.catConfig.layerBg,
      showMenu: false,
      showTrigger: false
    });
  }

  updateGeneral() {
    if (!this.user || this.user.access !== 'administrator') {
      return;
    }
    const dialogRef = this.dialog.open(UpdateGeneralComponent, {
      width: '400px',
      data: 'index'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        location.reload();
      }
    });
  }

}
