/* eslint-disable prettier/prettier */
import { Component, Input, OnInit } from '@angular/core';

import { EMPTY_STRING } from 'src/app/shared/constants/common';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input() tabTitle: string = EMPTY_STRING;
  active = false;

  setActive(value: boolean): void {
    this.active = value;
  }
}
