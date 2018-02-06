import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { GlobalAuthGuard } from './services/global-auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: IndexComponent,
    canActivate: [GlobalAuthGuard]
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
