import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { NotfoundComponent } from './core/layouts/notfound/notfound.component';

/**
 * When you add a routing in this file,
 * let update the MAIN_PAGES constants in shared/constants/routes.constant.ts
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'reactjs',
  },
  {
    path: 'reactjs',
    loadChildren: () =>
      import('./reactjs-tutorials/reactjs-tutorials.module').then(
        (m) => m.ReactjsTutorialsModule
      ),
  },
  {
    path: 'nodejs',
    loadChildren: () =>
      import('./nodejs-tutorials/nodejs-tutorials.module').then(
        (m) => m.NodejsTutorialsModule
      ),
  },
  {
    path: 'css',
    loadChildren: () =>
      import('./css-tutorials/css-tutorials.module').then(
        (m) => m.CssTutorialsModule
      ),
  },
  {
    path: 'python',
    loadChildren: () =>
      import('./python-tutorials/python-tutorials.module').then(
        (m) => m.PythonTutorialsModule
      ),
  },
  {
    path: 'javascript',
    loadChildren: () =>
      import('./javascript-tutorials/javascript-tutorials.module').then(
        (m) => m.JavascriptTutorialsModule
      ),
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
