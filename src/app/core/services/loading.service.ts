import { BehaviorSubject, NEVER, defer } from 'rxjs';
import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { finalize, share } from 'rxjs/operators';
import { SpinnerOverlayComponent } from '../components/spinner-overlay/spinner-overlay.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // eslint-disable-next-line prettier/prettier
  private spinnerElement: any;
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isLoading$ = this._isLoading$.asObservable();

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
  ) { }

  setLoading(value: boolean): void {
    this._isLoading$.next(value);
  }

  public readonly spinner$ = defer(() => {
    this.show();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      })
    );
  }).pipe(share());

  private show(): void {
    // console.log('SpinnerOverlayService ~ SHOW spinner...');
    this._isLoading$.next(true);
    const componentFactory =
      this.resolver.resolveComponentFactory(SpinnerOverlayComponent);
    const componentRef = componentFactory.create(this.injector);

    componentRef?.hostView?.detectChanges();
    this.spinnerElement = componentRef?.location?.nativeElement;
    document.body.appendChild(this.spinnerElement);
  }

  private hide(): void {
    // console.log('SpinnerOverlayService ~ HIDE spinner');
    this._isLoading$.next(false);
    document.body.removeChild(this.spinnerElement);
  }
}
