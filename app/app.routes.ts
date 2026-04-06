import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './components/auth/auth.module';
import { AuthGuard } from './components/auth/guard/auth.gaurd';
import { AdminLayoutModule } from './components/layouts/admin-layout.module';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => AuthModule
  },
  {
    path: '',
    loadChildren: () => AdminLayoutModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    //loadChildren: () => AdminLayoutModule,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
];