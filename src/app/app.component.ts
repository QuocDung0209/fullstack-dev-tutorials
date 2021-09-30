import { debounceTime, map } from 'rxjs/operators';

import { Component } from '@angular/core';
import { SIDEBAR_OPEN_FEFAULT } from './shared/constants/common';
import { SidebarService } from './core/services/sidebar.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fullstack-dev-tutorials';

  isOpened = SIDEBAR_OPEN_FEFAULT;
  isMobile = window.screen.width < 768;

  // eslint-disable-next-line prettier/prettier
  constructor(private sidebarService: SidebarService) {
    sidebarService.isOpened$.subscribe((value) => {
      this.isOpened = value;
    });
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(500),
        map(() => window.screen.width),
      )
      .subscribe((value) => {
        this.isMobile = value < 768;
      });
  }
}
