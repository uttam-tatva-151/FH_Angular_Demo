import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { DefaultLayout } from './layout/default-layout/default-layout';
import { Dashboard } from './views/dashboard/dashboard';
import { ScreenBuilderLayout } from './layout/screen-builder-layout/screen-builder-layout';
import { SbHome } from './screenBuilderPages/sb-home/sb-home';
import { Home } from './views/home/home';
import { LoginLayout } from './layout/login-layout/login-layout/login-layout';
import { ForgotPassword } from './auth/forgot-password/forgot-password';
import { entryGuard } from './guards/entry-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '',
    component:LoginLayout,
    canActivate: [entryGuard],
    children: [
      {path: 'login', component: Login},
      {path: 'forgotpassword', component: ForgotPassword}
    ]
  },
  {
    path: '',
    component: DefaultLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'home', component: Home },
    ]
  },
  {
    path: '',
    component: ScreenBuilderLayout,
    children: [
      { path: 'screenbuilder/sbhome', component: SbHome },
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
