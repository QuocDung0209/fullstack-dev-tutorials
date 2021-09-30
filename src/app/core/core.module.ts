import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './layouts/notfound/notfound.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent, NotfoundComponent, SidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, NotfoundComponent, SidebarComponent],
})
export class CoreModule {}
