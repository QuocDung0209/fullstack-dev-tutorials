import { Component } from '@angular/core';
import { MAIN_PAGES } from 'src/app/shared/constants/routes.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  headerLinks: PageRoute[] = [];

  constructor() {
    this.headerLinks = Object.entries(MAIN_PAGES).map(([, value]) => {
      return { name: value.name, routerLink: '/' + value.mainRoute };
    });
  }
}
