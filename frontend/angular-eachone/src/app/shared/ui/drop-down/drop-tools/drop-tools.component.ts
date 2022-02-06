import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-drop-tools',
  templateUrl: './drop-tools.component.html',
  styleUrls: ['./drop-tools.component.scss']
})

export class DropToolsComponent implements OnInit {

  @Input()
  tools: string[];
  icon: string[];

  constructor() { }

  ngOnInit(): void {

  }
}
