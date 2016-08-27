// #docplaster
// #docregion
import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { CrisisCenterHomeComponent } from './crisis-center-home.component';
import { CrisisListComponent }       from './crisis-list.component';
import { CrisisCenterComponent }     from './crisis-center.component';
import { CrisisDetailComponent }     from './crisis-detail.component';

// #docregion routes
const crisisCenterRoutes: Routes = [
  {
    path: 'crisis-center',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: '',
            component: CrisisCenterHomeComponent
          },
          {
            path: ':id',
            component: CrisisDetailComponent
          }
        ]
      }
    ]
  }
];

export const crisisCenterRouting: ModuleWithProviders = RouterModule.forChild(crisisCenterRoutes);
// #docregion routes
// #enddocregion
