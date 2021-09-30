import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { NgModule } from '@angular/core';
import { ReactjsTutorialsRoutingModule } from './reactjs-tutorials-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CreateProjectComponent],
  imports: [CommonModule, ReactjsTutorialsRoutingModule, SharedModule],
})
export class ReactjsTutorialsModule {}
