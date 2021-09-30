import { Subject } from 'rxjs';

/**
 * @description
 * TakeUntilDestroy decorator is used to unsubscribe when the component destroys.
 * @returns () => Observable<unknown>
 *
 * @usageNotes
 *   @TakeUntilDestroy() componentDestroy!: () => Observable<unknown>;
 *
 *    ngOnInit(): void {
 *      console.log('AboutComponent');
 *      interval(500).pipe(
 *        takeUntil(this.componentDestroy()),
 *      ).subscribe(e => {
 *        console.log(e);
 *      });
 *    }
 */
export function TakeUntilDestroy() {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return function (target: any, key: string) {
    const originalDestroy = target.ngOnDestroy;

    if (typeof originalDestroy !== 'function') {
      console.warn(
        `${target?.constructor?.name} is using @TakeUntilDestroy but does not implement OnDestroy`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    target[key] = function (): object {
      this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();

      return this._takeUntilDestroy$.asObservable();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target.ngOnDestroy = function (...args: any): void {
      if (typeof originalDestroy === 'function') {
        originalDestroy.apply(this, args);
      }

      if (this._takeUntilDestroy$) {
        this._takeUntilDestroy$.next();
        this._takeUntilDestroy$.complete();
      }
    };
  };
}
