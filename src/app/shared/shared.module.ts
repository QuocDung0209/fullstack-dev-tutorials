import { ClipboardDirective } from './directives/clipboard.directive';
import { CodeComponent } from './components/code/code.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabComponent } from './components/tabs/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [
    CodeComponent,
    TabsComponent,
    TooltipDirective,
    ClipboardDirective,
    TabComponent,
  ],
  imports: [CommonModule],
  exports: [
    CodeComponent,
    TabsComponent,
    TabComponent,
    TooltipDirective,
    ClipboardDirective,
  ],
})
export class SharedModule {}
