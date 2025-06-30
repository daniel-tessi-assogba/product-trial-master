// File: src/app/app.routes.ts
// import { Routes } from '@angular/router';
// import {LoginComponent} from "./auth/components/login/login.component";
// import {HomeComponent} from "./shared/features/home/home.component";
// import {AuthGuard} from "./auth/services/AuthGuard";
//
// export const APP_ROUTES: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: '**', redirectTo: 'login' },
//   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
// ];

import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './shared/features/home/home.component';
import {AppShellComponent} from "./core/layout/app-shell/app-shell.component";
import {DashboardLayoutComponent} from "./core/layout/dashboard-layout/dashboard-layout.component";
import {AuthGuard} from "./auth/services/AuthGuard";

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.routes').then(m => m.PRODUCTS_ROUTES)
      }
    ]
  }
];
