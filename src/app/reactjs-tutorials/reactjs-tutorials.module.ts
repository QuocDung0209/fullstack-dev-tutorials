import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { NgModule } from '@angular/core';
import { ReactjsTutorialsRoutingModule } from './reactjs-tutorials-routing.module';

@NgModule({
  declarations: [CreateProjectComponent],
  imports: [CommonModule, ReactjsTutorialsRoutingModule],
})
export class ReactjsTutorialsModule {}
