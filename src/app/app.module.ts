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
import { GeneralService } from './services/api/general.service';
import { ArticleService } from './services/api/article.service';
import { AuthService } from './services/api/auth.service';
import { QiniuService } from './services/api/qiniu.service';
import { AdminGuard } from './services/admin-guard.service';
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
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/list/item/item.component';
import { ParaComponent } from './components/article/para/para.component';
import { ArticleComponent } from './components/article/article.component';
import { AdminArticleComponent } from './components/article/admin/admin.component';
import { DeleteParaComponent } from './components/article/admin/delete-para/delete-para.component';
import { DeleteArticleComponent } from './components/article/admin/delete-article/delete-article.component';

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
    DeleteArticleComponent
  ],
  entryComponents: [
    DeleteParaComponent,
    DeleteArticleComponent
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
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
