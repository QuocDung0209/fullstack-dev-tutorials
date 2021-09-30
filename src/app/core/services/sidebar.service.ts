import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  // eslint-disable-next-line prettier/prettier
  private _routes$: Subject<PageRoute[]> = new BehaviorSubject<PageRoute[]>([]);
  routes$: Observable<PageRoute[]> = this._routes$.asObservable();

  private _pageInfo$: Subject<PageInfo> = new BehaviorSubject<PageInfo>({
    name: 'ReactJs',
    mainRoute: 'reactjs',
  });
  pageInfo$: Observable<PageInfo> = this._pageInfo$.asObservable();

  setRoutes(routes: PageRoute[]): void {
    this._routes$.next([...routes]);
  }

  setPageInfo(info: PageInfo): void {
    this._pageInfo$.next({ ...info });
  }
}
