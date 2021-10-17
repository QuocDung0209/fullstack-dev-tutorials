/* eslint-disable prettier/prettier */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';

import { EMPTY_STRING } from '../../constants/common';
import { TabComponent } from './tab/tab.component';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';
import { MobileService } from 'src/app/core/services/mobile.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('tabActions', { static: true }) tabActions: ElementRef | null = null;
  @ContentChildren(TabComponent)
  tabContentChildren: QueryList<TabComponent> | null = null;

  selectedTab = 0;
  tabsTitle: string[] = [];

  @Input() class = EMPTY_STRING;

  _orientation: 'vertical' | 'horizontal' = 'vertical';
  @Input()
  set orientation(value: 'vertical' | 'horizontal') {
    this._orientation = value;
  }

  hasHorizontalScroll = false;
  resizeObserver: ResizeObserver | null = null;

  isStart = true;
  isEnd = false;
  horizontalScrollEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isVertical = false;
  hasVerticalScroll = false;
  verticalScrollEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isShow = false;
  isMobile = window.screen.width < 992;
  isMobileSubsciption: Subscription | null = null;

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private mobileService: MobileService,
  ) {
  }

  ngOnInit(): void {
    this.isVertical = this._orientation === 'vertical';

    if (this.isVertical) {
      this.isMobileSubsciption = this.mobileService.isMobile$.subscribe(value => {
        this.isMobile = value;
        this.changeDetectorRef.markForCheck();
      })
    }

    this.horizontalScrollEvent.pipe(distinctUntilChanged(), skip(1)).subscribe((value) => {
      this.hasHorizontalScroll = value;
      this.changeDetectorRef.detectChanges();
    })

    this.verticalScrollEvent.pipe(distinctUntilChanged(), skip(1)).subscribe((value) => {
      this.hasVerticalScroll = value;
      this.changeDetectorRef.detectChanges();
    })

    this.resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const hasHorizontalScroll = this.isScrollable((entry.target as HTMLElement), 'horizontal');
        this.horizontalScrollEvent.next(hasHorizontalScroll);

        const hasVerticalScroll = this.isScrollable((entry.target as HTMLElement), 'vertical');
        this.verticalScrollEvent.next(hasVerticalScroll);
      });
    });

    this.resizeObserver.observe(this.tabActions?.nativeElement);

    if (this.tabActions) {
      fromEvent(this.tabActions.nativeElement, 'scroll')
        .pipe(debounceTime(100))
        .subscribe((event: any) => {
          const element = (event.target as HTMLElement);
          if (!this.isVertical) {
            this.isStart = element.scrollLeft === 0;
            this.isEnd = element.scrollLeft + element.offsetWidth === element.scrollWidth;
          } else {
            this.isStart = element.scrollTop === 0;
            this.isEnd = element.scrollTop + element.offsetHeight === element.scrollHeight;
          }
          this.changeDetectorRef.detectChanges();
        })
    }
  }

  ngAfterContentInit(): void {
    if (this.tabContentChildren) {
      this.tabContentChildren.forEach((tab: TabComponent, index: number) => {
        this.tabsTitle.push(tab.tabTitle);
      });
      this.tabContentChildren.first.active = true;
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.horizontalScrollEvent.unsubscribe();
    this.verticalScrollEvent.unsubscribe();
    this.isMobileSubsciption && this.isMobileSubsciption.unsubscribe();
  }

  onSelectedTab(tabIndex: number, ele: HTMLElement): void {
    if (this.tabContentChildren) {
      this.tabContentChildren?.get(this.selectedTab)?.setActive(false);
      this.selectedTab = tabIndex;
      this.tabContentChildren?.get(tabIndex)?.setActive(true);
    }

    if (!this.isVertical) {
      ele.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollStart(element: HTMLDivElement): void {
    if (this.isVertical) {
      element.scrollBy({ behavior: 'smooth', top: -200, left: 0 });
    } else {
      element.scrollBy({ behavior: 'smooth', top: 0, left: -200 });
    }
  }

  scrollEnd(element: HTMLDivElement): void {
    if (this.isVertical) {
      element.scrollBy({ behavior: 'smooth', top: +200, left: 0 });
    } else {
      element.scrollBy({ behavior: 'smooth', top: 0, left: +200 });
    }
  }

  isScrollable(
    ele: HTMLElement,
    orientation: 'horizontal' | 'vertical',
  ): boolean {
    let hasScrollableContent = false;
    let isOverflowHidden = false;

    if (orientation === 'vertical') {
      // Compare the height to see if the element has scrollable content
      hasScrollableContent = ele.scrollHeight > ele.clientHeight;

      // It's not enough because the element's `overflow-y` style can be set as
      // * `hidden`
      // * `hidden !important`
      // In those cases, the scrollbar isn't shown
      const overflowYStyle = window.getComputedStyle(ele).overflowY;
      isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;
    } else {
      // Compare the width to see if the element has scrollable content
      hasScrollableContent = ele.scrollWidth > ele.clientWidth;

      // It's not enough because the element's `overflow-x` style can be set as
      // * `hidden`
      // * `hidden !important`
      // In those cases, the scrollbar isn't shown
      const overflowXStyle = window.getComputedStyle(ele).overflowX;
      isOverflowHidden = overflowXStyle.indexOf('hidden') !== -1;
    }

    return hasScrollableContent && !isOverflowHidden;
  }
}
