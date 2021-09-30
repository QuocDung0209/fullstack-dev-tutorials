import {
  EMPTY_STRING,
  SIDEBAR_OPEN_FEFAULT,
} from 'src/app/shared/constants/common';
import {
  MAIN_PAGES,
  MAIN_ROUTES,
  PAGE_ROUTES,
} from 'src/app/shared/constants/routes.constant';
import { NavigationStart, Router } from '@angular/router';

import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  // eslint-disable-next-line prettier/prettier
  pageInfo: PageInfo = { name: EMPTY_STRING, mainRoute: EMPTY_STRING };
  routes: PageRoute[] = [];

  isOpened = SIDEBAR_OPEN_FEFAULT;
  isShow = SIDEBAR_OPEN_FEFAULT;

  // eslint-disable-next-line prettier/prettier
  constructor(private sidebarService: SidebarService, private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        const activatingRoute = (event as { url: string })?.url?.split('/')[1];
        this.isShow = MAIN_ROUTES.includes(activatingRoute);
        sidebarService.setIsOpened(this.isShow && this.isOpened);
        this.pageInfo = MAIN_PAGES[activatingRoute];
        const pageRoutes = PAGE_ROUTES[activatingRoute];
        if (pageRoutes && pageRoutes instanceof Array) {
          this.routes = pageRoutes.map((routes: RouteInfo) => {
            return {
              name: routes.name,
              routerLink: `/${activatingRoute}${routes.routerLink}`,
            };
          });
        } else {
          this.routes = [];
        }
      });
  }

  toggle(): void {
    this.isOpened = !this.isOpened;
    this.sidebarService.setIsOpened(this.isOpened);
  }
}
