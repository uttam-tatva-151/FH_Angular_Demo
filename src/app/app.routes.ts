import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { DefaultLayout } from './layout/default-layout/default-layout';
import { Dashboard } from './views/dashboard/dashboard';
import { ScreenBuilderLayout } from './layout/screen-builder-layout/screen-builder-layout';
import { SbHome } from './screenBuilderPages/sb-home/sb-home';
import { Home } from './views/home/home';
import { LoginLayout } from './layout/login-layout/login-layout/login-layout';
import { entryGuard } from './guards/entry-guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { authRoutes } from './auth-demo/auth-routing.module';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: LoginLayout,
    canActivate: [entryGuard],
    children: [
      { path: 'login', component: Login },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./auth/sign-up/sign-up').then((m) => m.SignUp),
      },
    ],
  },
  {
    path: '',
    component: DefaultLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'home', component: Home },
    ],
  },
  {
    path: '',
    component: ScreenBuilderLayout,
    children: [{ path: 'screenbuilder/sbhome', component: SbHome }],
  },
  {
    path: 'auth-demo',
    children: authRoutes
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
