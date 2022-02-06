import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anchor-button',
  templateUrl: './anchor-button.component.html',
  styleUrls: ['./anchor-button.component.scss']
})
export class AnchorButtonComponent implements OnInit {

  @Input()
  anchor: String = ''

  constructor() { }

  ngOnInit(): void {
  }

  handlerAnchor(anchor){
    document.getElementById(anchor).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

}
