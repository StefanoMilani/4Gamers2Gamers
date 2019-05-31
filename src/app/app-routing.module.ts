import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: '/login'},
  { path: 'home', pathMatch: 'full', redirectTo: '/tabs/tab1'},
  { path: 'notification', pathMatch: 'full', redirectTo: '/tabs/tab2'},
  { path: 'my-profile', pathMatch: 'full', redirectTo: '/tabs/tab3'},
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'setting', loadChildren: './user-setting/user-setting.module#UserSettingPageModule'},
  { path: 'signup', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'profile/:id', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'games', loadChildren: './user-setting/games/games.module#GamesPageModule' },
  { path: 'search-user', loadChildren: './search-user/search-user.module#SearchUserPageModule' }
  ];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
