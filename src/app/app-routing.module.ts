import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { NotfoundComponent } from './core/layouts/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'reactjs',
  },
  {
    path: 'reactjs',
    loadChildren: () =>
      import('./reactjs-tutorials/reactjs-tutorials-routing.module').then(
        (m) => m.ReactjsTutorialsRoutingModule
      ),
  },
  {
    path: 'nodejs',
    loadChildren: () =>
      import('./nodejs-tutorials/nodejs-tutorials-routing.module').then(
        (m) => m.NodejsTutorialsRoutingModule
      ),
  },
  {
    path: 'css',
    loadChildren: () =>
      import('./css-tutorials/css-tutorials-routing.module').then(
        (m) => m.CssTutorialsRoutingModule
      ),
  },
  {
    path: 'python',
    loadChildren: () =>
      import('./python-tutorials/python-tutorials-routing.module').then(
        (m) => m.PythonTutorialsRoutingModule
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
