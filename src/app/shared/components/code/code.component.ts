/* eslint-disable prettier/prettier */
import { Component, Input } from '@angular/core';

import { EMPTY_STRING } from '../../constants/common';
import hljs from 'highlight.js/lib/common';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent {
  @Input() language = 'typescript';
  @Input() height = 'auto';
  @Input() class = 'code-block';
  _code: string = EMPTY_STRING;
  @Input()
  get code(): string {
    return this._code;
  }
  set code(value: string) {
    this._code = hljs.highlight(value, { language: this.language }).value;
  }
}
