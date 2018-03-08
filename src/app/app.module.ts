import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { BgConfigService } from './services/bg-config.service';
import { EaseOutService } from './services/ease-out.service';
import { GlobalAuthGuard } from './services/global-auth-guard.service';
import { HttpService } from './services/http.service';
import { GeneralService } from './services/api/general.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { MenuComponent } from './components/menu/menu.component';
import { BgComponent } from './components/bg/bg.component';
import { MoreComponent } from './components/more/more.component';
import { BioComponent } from './components/bio/bio.component';
import { CodingComponent } from './components/coding/coding.component';
import { DesignComponent } from './components/design/design.component';
import { TranslationComponent } from './components/translation/translation.component';
import { HeaderComponent } from './components/header/header.component';
import { BytesComponent } from './components/bytes/bytes.component';
import { BlogComponent } from './components/blog/blog.component';
import { WordsComponent } from './components/words/words.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MenuComponent,
    BgComponent,
    MoreComponent,
    BioComponent,
    CodingComponent,
    DesignComponent,
    TranslationComponent,
    BytesComponent,
    BlogComponent,
    WordsComponent,
    HeaderComponent
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
    EaseOutService,
    GlobalAuthGuard,
    CanDeactivateGuard,
    HttpService,
    GeneralService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
