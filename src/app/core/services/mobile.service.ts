import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MobileService implements OnDestroy {
  // eslint-disable-next-line prettier/prettier
  private _isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(window.screen.width < 992);
  isMobile$: Observable<boolean> = this._isMobile$.asObservable();

  private windowResizeSubscription: Subscription | null = null;

  constructor() {
    this.windowResizeSubscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(500),
        map(() => window.screen.width)
      )
      .subscribe((value) => {
        const isMobile = value < 992;
        this._isMobile$.next(isMobile);
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.windowResizeSubscription &&
      this.windowResizeSubscription.unsubscribe();
  }
}
