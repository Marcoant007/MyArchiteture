import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-area-multiline',
  templateUrl: './text-area-multiline.component.html',
  styleUrls: ['./text-area-multiline.component.scss']
})
export class TextAreaMultilineComponent implements OnInit {

  @Input()
  lineQuantity: number = 4;

  @Input()
  placeholder: string;

  @Input()
  lineWidht: number = 75;

  @Input()
  readOnly: boolean;

  @Input()
  disable: boolean;

  @Input()
  formControl: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
