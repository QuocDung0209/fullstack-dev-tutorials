import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './layouts/notfound/notfound.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';

@NgModule({
  declarations: [HeaderComponent, NotfoundComponent, SidebarComponent, SpinnerOverlayComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, NotfoundComponent, SidebarComponent],
})
export class CoreModule {}
