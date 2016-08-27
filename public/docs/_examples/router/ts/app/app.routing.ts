// #docregion
import { ModuleWithProviders } from '@angular/core';
// #docregion import-router
import { Routes, RouterModule }   from '@angular/router';
// #enddocregion import-router

import { loginRoutes,
         authProviders }  from './login.routing';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
// #docregion lazy-load-can-load
import { AuthGuard }          from './auth-guard.service';
// #enddocregion lazy-load-can-load

// #docregion lazy-load-admin
const adminRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
// #enddocregion lazy-load-admin
// #docregion lazy-load-can-load
    canLoad: [AuthGuard]
// #enddocregion lazy-load-can-load
// #docregion lazy-load-admin
  }
];

const appRoutes: Routes = [
  ...loginRoutes,
  ...adminRoutes
];
// #enddocregion lazy-load-admin

export const appRoutingProviders: any[] = [
  authProviders,
  CanDeactivateGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
