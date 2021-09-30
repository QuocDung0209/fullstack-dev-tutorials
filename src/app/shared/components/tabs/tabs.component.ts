import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
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
export class TabsComponent implements AfterContentInit {
  @ViewChild('tabActions', { static: true }) tabActions: ElementRef | null =
    null;
  @ContentChildren('tabContent')
  tabContentChildren: QueryList<ElementRef> | null = null;

  @Input() class = EMPTY_STRING;

  actionsClasses = 'nav-pills flex-column tab-content-column';
  tabContentClass = EMPTY_STRING;
  containerClass = 'tab-container-column';

  @Input()
  set orientation(value: 'vertical' | 'horizontal') {
    if (value === 'horizontal') {
      this.actionsClasses = 'nav-tabs';
      this.tabContentClass = 'tab-content-row';
      this.containerClass = 'tab-container-row';
    }
  }

  // eslint-disable-next-line prettier/prettier
  constructor(private renderer: Renderer2) {}

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
}
