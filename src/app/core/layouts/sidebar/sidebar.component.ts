import { Component } from '@angular/core';
import { EMPTY_STRING } from 'src/app/shared/constants/common';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  routes: PageRoute[] = [];

  isOpened = true;
  // eslint-disable-next-line prettier/prettier
  pageInfo: PageInfo = { name: EMPTY_STRING, mainRoute: EMPTY_STRING };

  // eslint-disable-next-line prettier/prettier
  constructor(private sidebarService: SidebarService) {
    sidebarService.pageInfo$.subscribe((pageInfo) => {
      this.pageInfo = pageInfo;
    });
    sidebarService.routes$.subscribe((routes) => {
      this.routes = routes;
    });
  }

  toggle(): void {
    this.isOpened = !this.isOpened;
  }
}
