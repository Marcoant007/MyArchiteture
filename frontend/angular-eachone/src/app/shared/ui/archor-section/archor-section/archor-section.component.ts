import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-archor-section',
  templateUrl: './archor-section.component.html',
  styleUrls: ['./archor-section.component.scss']
})
export class ArchorSectionComponent implements OnInit {

  @Input()
  list_archor: any[] = [];

  @Output()
  newItemEvent = new EventEmitter();

  active: number;

  @Input()
  isStatic: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  clickItem(element: any) {
    if (this.isStatic) {
      this.goElement(element.id);
    }
    this.active = element.code
    this.newItemEvent.emit(element);
  }

  goElement(element: any) {
    document.getElementById(element).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
}
