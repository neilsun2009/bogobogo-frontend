import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { GlobalAuthGuard } from './services/global-auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { MoreComponent } from './components/more/more.component';
import { BioComponent } from './components/bio/bio.component';
import { CodingComponent } from './components/coding/coding.component';
import { DesignComponent } from './components/design/design.component';
import { TranslationComponent } from './components/translation/translation.component';
import { BytesComponent } from './components/bytes/bytes.component';
import { BlogComponent } from './components/blog/blog.component';
import { WordsComponent } from './components/words/words.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleResolver } from './services/article-resolver.service';
import { AdminArticleComponent } from './components/article/admin/admin.component';
import { AdminGuard } from './services/admin-guard.service';
import { GlobalGeneralGuard } from './services/global-general-guard.service';
import { LoginComponent } from './components/login-signup/login.component';
import { SignupComponent } from './components/login-signup/signup.component';
import { LogoutComponent } from './components/login-signup/logout.component';
import { FourOFourComponent } from './components/404/404.component';

const appRoutes: Routes = [
  {
    path: '',
    // pathMatch: 'full',
    // component: IndexComponent,
    canActivate: [GlobalAuthGuard, GlobalGeneralGuard],
    canActivateChild: [GlobalAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: IndexComponent
      },
      {
        path: 'more',
        component: MoreComponent,
        // canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'bio',
        component: BioComponent,
      },
      // {
      //   path: 'bio/:tag',
      //   component: BioComponent,
      // },
      {
        path: 'coding',
        component: CodingComponent,
      },
      {
        path: 'design',
        component: DesignComponent,
      },
      {
        path: 'translation',
        component: TranslationComponent,
      },
      {
        path: 'bytes',
        component: BytesComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'words',
        component: WordsComponent,
      },
      {
        path: 'article/:name',
        component: ArticleComponent,
        resolve: {article: ArticleResolver},
      },
      {
        path: 'admin-article/:name',
        component: AdminArticleComponent,
        canActivate: [AdminGuard],
        resolve: {article: ArticleResolver},
      },
      {
        path: 'admin-article',
        canActivate: [AdminGuard],
        component: AdminArticleComponent,
      },
      {
        path: 'login',
        component: LoginComponent
      },
      // {
      //   path: 'signup',
      //   component: SignupComponent
      // },
      {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AdminGuard],
      },
      {
        path: '404',
        component: FourOFourComponent
      },
      {
        path: '**',
        component: FourOFourComponent
      }
    ]
  },
  // {
  //   path: 'admin',
  //   loadChildren: 'app/admin/admin.module#AdminModule'
  //   // canLoad: [AuthGuard]
  // },
  // {
  //   path: '',
  //   component: MasterComponent,
  //   canActivate: [GlobalAuthGuard],
  //   canActivateChild: [GlobalAuthGuard],
  //   children: [
  //     {
  //       path: '',
  //       pathMatch: 'full',
  //       component: IndexComponent
  //     },
  //     {
  //       path: 'login',
  //       canActivate: [LoginAuthGuard],
  //       component: LoginComponent
  //     },
  //     {
  //       path: 'signup',
  //       canActivate: [LoginAuthGuard],
  //       component: SignupComponent
  //     },
  //     {
  //       path: 'user/:id',
  //       resolve: {user: UserResolver},
  //       component: UserComponent
  //     },
  //     {
  //       path: 'advice',
  //       component: AdviceComponent
  //     },
  //     {
  //       path: 'about',
  //       component: AboutComponent
  //     },
  //     {
  //       path: 'wallpaper',
  //       component: WallpaperComponent
  //     },
  //     {
  //       path: 'match',
  //       component: MatchComponent
  //     },
  //     {
  //       path: 'detail/:id',
  //       component: DetailComponent,
  //       resolve: {match: MatchResolver},
  //     },
  //     {
  //       path: '404',
  //       component: FourOFourComponent
  //     },
  //     {
  //       path: '**',
  //       component: FourOFourComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        // enableTracing: true // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
