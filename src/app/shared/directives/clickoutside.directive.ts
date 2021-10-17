import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  OnInit
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[appClickoutside]'
})
export class ClickoutsideDirective implements OnInit {
  @Output() appClickoutside: EventEmitter<any> = new EventEmitter();

  captured = false;

  constructor(private elRef: ElementRef) { }

  // The second parameter ["$event.target"] is to define which values should be passed to the decoreated method
  // The $event parameter is a MouseEvent, which holds the target element in the target property
  // The onClick method will now be invoked every time a click was performed on the whole document.
  // Due to the use of HostListener, you don’t even need to unbind from the event—Angular is handling everything for you.
  @HostListener('document:click', ['$event.target'])
  onClick(target: any): void {
    if (!this.captured) {
      return;
    }

    if (!this.elRef.nativeElement.contains(target)) {
      console.log('emit');
      this.appClickoutside.emit();
    }
  }

  ngOnInit(): void {
    fromEvent(document, 'click', { capture: true })
      .pipe(take(1))
      .subscribe(() => (this.captured = true));
  }
}
