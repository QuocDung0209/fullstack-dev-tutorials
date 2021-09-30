import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { REACTJS_ROUTES } from './reactjs-tutorials-routes.constant';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'how-to-create-and-config-project',
  },
  ...REACTJS_ROUTES.map(({ path, component }) => ({
    path,
    component,
  })),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReactjsTutorialsRoutingModule {}
