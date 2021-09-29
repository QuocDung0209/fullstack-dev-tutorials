import { ClipboardDirective } from './directives/clipboard.directive';
import { CodeComponent } from './components/code/code.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabsComponent } from './components/tabs/tabs.component';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [
    CodeComponent,
    TabsComponent,
    TooltipDirective,
    ClipboardDirective,
  ],
  imports: [CommonModule],
  exports: [CodeComponent, TabsComponent, TooltipDirective, ClipboardDirective],
})
export class SharedModule {}
