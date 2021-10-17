import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SIDEBAR_OPEN_FEFAULT } from './shared/constants/common';
import { SidebarService } from './core/services/sidebar.service';
import { TakeUntilDestroy } from './core/decorators/take-until-destroy.decorator';
import { MobileService } from './core/services/mobile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'fullstack-dev-tutorials';

  isOpened = SIDEBAR_OPEN_FEFAULT;
  isMobile = window.screen.width < 768;

  // eslint-disable-next-line prettier/prettier
  @TakeUntilDestroy() componentDestroy!: () => Observable<unknown>;

  // eslint-disable-next-line prettier/prettier
  constructor(private sidebarService: SidebarService, private mobileService: MobileService) {
    sidebarService.isOpened$.subscribe((value) => {
      this.isOpened = value;
    });

    mobileService.isMobile$.pipe(takeUntil(this.componentDestroy())).subscribe(value => {
      this.isMobile = value;
    })
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void { }
}
