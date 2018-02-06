import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { BgConfigService } from './services/bg-config.service';
import { GlobalAuthGuard } from './services/global-auth-guard.service';
import { HttpService } from './services/http.service';
import { GeneralService } from './services/api/general.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { MenuComponent } from './components/menu/menu.component';
import { BgComponent } from './components/bg/bg.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MenuComponent,
    BgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    BgConfigService,
    GlobalAuthGuard,
    HttpService,
    GeneralService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
