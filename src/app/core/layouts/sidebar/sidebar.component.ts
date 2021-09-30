import {
  MAIN_PAGES,
  MAIN_ROUTES,
  PAGE_ROUTES,
} from 'src/app/shared/constants/routes.constant';
import { NavigationStart, Router } from '@angular/router';

import { Component } from '@angular/core';
import { EMPTY_STRING } from 'src/app/shared/constants/common';
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

  isOpened = true;
  isShow = true;

  // eslint-disable-next-line prettier/prettier
  constructor(private sidebarService: SidebarService, private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        const activatingRoute = (event as { url: string })?.url?.split('/')[1];
        this.isShow = MAIN_ROUTES.includes(activatingRoute);
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
    sidebarService.routes$.subscribe((routes) => {
      this.routes = routes;
    });
  }

  toggle(): void {
    this.isOpened = !this.isOpened;
  }
}
