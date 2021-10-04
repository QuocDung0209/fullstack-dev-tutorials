import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { EMPTY_STRING } from '../../constants/common';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit, AfterContentInit {
  @ViewChild('tabActions', { static: true }) tabActions: ElementRef | null =
    null;
  @ContentChildren('tabContent')
  tabContentChildren: QueryList<ElementRef> | null = null;

  @Input() class = EMPTY_STRING;

  actionsClasses = 'nav-pills flex-column tab-content-column';
  tabContentClass = EMPTY_STRING;
  containerClass = 'tab-container-column';

  _orientation: 'vertical' | 'horizontal' = 'vertical';
  @Input()
  set orientation(value: 'vertical' | 'horizontal') {
    this._orientation = value;
    if (value === 'horizontal') {
      this.actionsClasses = 'tab-actions-row';
      this.tabContentClass = 'tab-content-row';
      this.containerClass = 'tab-container-row';
    }
  }

  horizontalScroll = false;

  // eslint-disable-next-line prettier/prettier
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this._orientation === 'horizontal') {
      setTimeout(() => {
        const divTabAction = document.getElementById('tab-actions');
        if (divTabAction) {
          this.horizontalScroll = this.isScrollable(divTabAction, 'horizontal');
        }
      }, 0);
    }
  }

  ngAfterContentInit(): void {
    if (this.tabContentChildren) {
      this.tabContentChildren.forEach(
        (elementRef: ElementRef, index: number) => {
          const tabTitle =
            elementRef.nativeElement.attributes['tab-title'].value;
          const id = 'app-tabs-index-' + Math.floor(Math.random() * 1000);
          const buttonElement: HTMLElement =
            this.renderer.createElement('button');

          // Create tab buttons
          this.renderer.setProperty(buttonElement, 'innerText', tabTitle);
          this.renderer.setAttribute(buttonElement, 'data-bs-toggle', 'tab');
          this.renderer.setAttribute(buttonElement, 'data-bs-target', `#${id}`);
          this.renderer.addClass(buttonElement, 'nav-link');
          !index && this.renderer.addClass(buttonElement, 'active');
          this.renderer.appendChild(
            this.tabActions?.nativeElement,
            buttonElement,
          );

          // Set up tab content
          elementRef.nativeElement.id = id;
          this.renderer.addClass(elementRef.nativeElement, 'tab-pane');
          this.renderer.addClass(elementRef.nativeElement, 'fade');
          if (!index) {
            this.renderer.addClass(elementRef.nativeElement, 'active');
            this.renderer.addClass(elementRef.nativeElement, 'show');
          }
        },
      );
    }
  }

  scrollLeft(element: HTMLDivElement): void {
    element.scrollBy({ behavior: 'smooth', top: 0, left: -200 });
  }

  scrollRight(element: HTMLDivElement): void {
    element.scrollBy({ behavior: 'smooth', top: 0, left: +200 });
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
