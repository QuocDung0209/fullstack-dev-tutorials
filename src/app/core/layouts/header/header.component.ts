import { Component, OnDestroy } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { MAIN_PAGES } from 'src/app/shared/constants/routes.constant';
import { TakeUntilDestroy } from '../../decorators/take-until-destroy.decorator';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  headerLinks: PageRoute[] = [];
  isMobile = window.screen.width < 768;

  // eslint-disable-next-line prettier/prettier
  @TakeUntilDestroy() componentDestroy!: () => Observable<unknown>;

  constructor(private sidebarService: SidebarService) {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(500),
        map(() => window.screen.width),
        takeUntil(this.componentDestroy()),
      )
      .subscribe((value) => {
        this.isMobile = value < 768;
      });
    this.headerLinks = Object.entries(MAIN_PAGES).map(([, value]) => {
      return { name: value.name, routerLink: '/' + value.mainRoute };
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }
}
