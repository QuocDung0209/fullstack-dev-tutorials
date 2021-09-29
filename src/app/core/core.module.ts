import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './layouts/notfound/notfound.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, NotfoundComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, NotfoundComponent],
})
export class CoreModule {}
