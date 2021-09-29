import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  SecurityContext,
} from '@angular/core';
import { Placement, createPopper } from '@popperjs/core';

import { DomSanitizer } from '@angular/platform-browser';
import { EMPTY_STRING } from '../constants/common';

export const isUndefined = (value: unknown): boolean => value === undefined;

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input('appTooltip')
  tooltipTitle: string = EMPTY_STRING; // tooltipTitle may be string or HTML element
  @Input()
  placement: Placement = 'top';
  @Input()
  delay: string = EMPTY_STRING;
  tooltip: HTMLElement | null = null;
  // Distance between host element and tooltip element
  offset = 10;
  // Allow HTML in the tooltip.
  @Input() htmlTooltip = false;
  @Input() invalid: boolean | undefined = undefined;

  constructor(
    // eslint-disable-next-line prettier/prettier
    private el: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
  ) {}

  @HostListener('mouseenter') onMouseEnter(): void {
    if ((isUndefined(this.invalid) || this.invalid) && !this.tooltip) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.tooltip) {
      this.hide();
    }
  }

  @HostListener('click') onClick(): void {
    if (this.tooltip) {
      this.hide();
    }
  }

  show(): void {
    this.create();
    this.setPositionByPopper();
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
  }

  hide(): void {
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
    window.setTimeout(() => {
      if (this.tooltip) {
        this.renderer.removeChild(document.body, this.tooltip);
        this.tooltip = null;
      }
    }, Number(this.delay));
  }

  create(): void {
    this.tooltip = this.renderer.createElement('span');

    if (this.htmlTooltip) {
      this.renderer.setProperty(
        this.tooltip,
        'innerHTML',
        this.sanitizer.sanitize(SecurityContext.HTML, this.tooltipTitle),
      );
    } else {
      this.renderer.appendChild(
        this.tooltip,
        this.renderer.createText(this.tooltipTitle), // textNode
      );
    }

    this.renderer.appendChild(document.body, this.tooltip);
    // this.renderer.appendChild(this.el.nativeElement, this.tooltip);

    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    // this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);

    if (this.invalid) {
      this.renderer.addClass(this.tooltip, 'invalid');
    }

    // delay setting
    this.renderer.setStyle(
      this.tooltip,
      '-webkit-transition',
      `opacity ${this.delay}ms`,
    );
    this.renderer.setStyle(
      this.tooltip,
      '-moz-transition',
      `opacity ${this.delay}ms`,
    );
    this.renderer.setStyle(
      this.tooltip,
      '-o-transition',
      `opacity ${this.delay}ms`,
    );
    this.renderer.setStyle(
      this.tooltip,
      'transition',
      `opacity ${this.delay}ms`,
    );
  }

  setPosition(): void {
    // The Element.getBoundingClientRect() method returns a DOMRect object
    // providing information about the size of an element and its position relative to the viewport.

    // Host element size and position information
    const hostPos = this.el.nativeElement.getBoundingClientRect();

    // Tooltip element size and position information
    const tooltipPos = this.tooltip?.getBoundingClientRect();

    // window's scroll top
    // The getBoundingClientRect method returns the relative position in the viewport.
    // When scrolling occurs, the vertical scroll coordinate value should be reflected on the top of the tooltip element.
    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    let top, left;

    if (this.placement === 'top' && tooltipPos) {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'bottom' && tooltipPos) {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left' && tooltipPos) {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right' && tooltipPos) {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    // When scrolling occurs, the vertical scroll coordinate value should be reflected on the top of the tooltip element.
    // If we don't plus scrollPos, when the scroll happens, the position of the tooltip will be incorrect.
    // Because Element.getBoundingClientRect() returns its position according to the viewport
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

  setPositionByPopper(): void {
    if (this.invalid) {
      this.placement = 'bottom-start';
      this.offset = 2;
    }

    this.tooltip &&
      createPopper(this.el.nativeElement, this.tooltip, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, this.offset],
            },
          },
        ],
      });
  }
}
