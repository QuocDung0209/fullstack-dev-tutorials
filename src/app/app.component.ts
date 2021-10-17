import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { SIDEBAR_OPEN_FEFAULT } from './shared/constants/common';
import { SidebarService } from './core/services/sidebar.service';
import { TakeUntilDestroy } from './core/decorators/take-until-destroy.decorator';
import { MobileService } from './core/services/mobile.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'fullstack-dev-tutorials';

  isOpened = SIDEBAR_OPEN_FEFAULT;
  isMobile = window.screen.width < 768;

  spinnerSubscription: Subscription | null = null;

  // eslint-disable-next-line prettier/prettier
  @TakeUntilDestroy() componentDestroy!: () => Observable<unknown>;

  // eslint-disable-next-line prettier/prettier
  constructor(
    private sidebarService: SidebarService,
    private mobileService: MobileService,
    private router: Router,
    private loadingService: LoadingService,
  ) {
    sidebarService.isOpened$.subscribe((value) => {
      this.isOpened = value;
    });

    mobileService.isMobile$.pipe(takeUntil(this.componentDestroy())).subscribe(value => {
      this.isMobile = value;
    })

    router.events.pipe(
      filter(event => event instanceof NavigationStart || event instanceof NavigationEnd),
      takeUntil(this.componentDestroy()),
    ).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.spinnerSubscription = this.loadingService.spinner$.subscribe();
      }

      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.spinnerSubscription && this.spinnerSubscription.unsubscribe();
        }, 200);
      }
    })
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void { }
}
