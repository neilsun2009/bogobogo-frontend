import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { BgConfigService } from './services/bg-config.service';
import { EaseOutService } from './services/ease-out.service';
import { GlobalAuthGuard } from './services/global-auth-guard.service';
import { GlobalGeneralGuard } from './services/global-general-guard.service';
import { HttpService } from './services/http.service';
import { ArticleResolver } from './services/article-resolver.service';
import { TitleService } from './services/title.service';
import { GeneralService } from './services/api/general.service';
import { ArticleService } from './services/api/article.service';
import { AuthService } from './services/api/auth.service';
import { QiniuService } from './services/api/qiniu.service';
import { WXService } from './services/api/wx.service';
import { WordService } from './services/api/word.service';
import { LogService } from './services/api/log.service';
import { ByteService } from './services/api/byte.service';
import { AdminGuard } from './services/admin-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { MenuComponent } from './components/menu/menu.component';
import { BgComponent } from './components/bg/bg.component';
import { MoreComponent } from './components/more/more.component';
import { TagComponent } from './components/tag/tag.component';
import { BioComponent } from './components/bio/bio.component';
import { CodingComponent } from './components/coding/coding.component';
import { DesignComponent } from './components/design/design.component';
import { TranslationComponent } from './components/translation/translation.component';
import { HeaderComponent } from './components/header/header.component';
import { BytesComponent } from './components/bytes/bytes.component';
import { BlogComponent } from './components/blog/blog.component';
import { WordsComponent } from './components/words/words.component';
import { WordListComponent } from './components/words/word-list/word-list.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/list/item/item.component';
import { ParaComponent } from './components/article/para/para.component';
import { ArticleComponent } from './components/article/article.component';
import { AdminArticleComponent } from './components/article/admin/admin.component';
import { DeleteParaComponent } from './components/article/admin/delete-para/delete-para.component';
import { DeleteArticleComponent } from './components/article/admin/delete-article/delete-article.component';
import { DeleteWordComponent } from './components/words/delete-word/delete-word.component';
import { UpdateGeneralComponent } from './components/header/update-general/update-general.component';
import { AddWordComponent } from './components/words/add-word/add-word.component';
import { UpdateWordComponent } from './components/words/update-word/update-word.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { LoginComponent } from './components/login-signup/login.component';
import { SignupComponent } from './components/login-signup/signup.component';
import { LogoutComponent } from './components/login-signup/logout.component';
import { FourOFourComponent } from './components/404/404.component';
import { ByteListComponent } from './components/bytes/byte-list/byte-list.component';
import { AddByteComponent } from './components/bytes/add-byte/add-byte.component';
import { UpdateByteComponent } from './components/bytes/update-byte/update-byte.component';
import { DeleteByteComponent } from './components/bytes/delete-byte/delete-byte.component';

import {MatButtonModule, MatCheckboxModule, MatMenuModule,
  MatInputModule, MatFormFieldModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule,
  MatDialogModule, MatSnackBarModule } from '@angular/material';

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
    HeaderComponent,
    ListComponent,
    ItemComponent,
    ArticleComponent,
    AdminArticleComponent,
    ParaComponent,
    DeleteParaComponent,
    DeleteArticleComponent,
    DeleteWordComponent,
    AddWordComponent,
    WordListComponent,
    DatePickerComponent,
    UpdateGeneralComponent,
    UpdateWordComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    FourOFourComponent,
    ByteListComponent,
    AddByteComponent,
    UpdateByteComponent,
    DeleteByteComponent,
    TagComponent
  ],
  entryComponents: [
    DeleteParaComponent,
    DeleteArticleComponent,
    DeleteWordComponent,
    AddWordComponent,
    UpdateGeneralComponent,
    UpdateWordComponent,
    AddByteComponent,
    UpdateByteComponent,
    DeleteByteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    BgConfigService,
    EaseOutService,
    GlobalAuthGuard,
    GlobalGeneralGuard,
    CanDeactivateGuard,
    HttpService,
    GeneralService,
    ArticleService,
    AuthService,
    QiniuService,
    ArticleResolver,
    AdminGuard,
    WordService,
    TitleService,
    ByteService,
    LogService,
    // WXService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
