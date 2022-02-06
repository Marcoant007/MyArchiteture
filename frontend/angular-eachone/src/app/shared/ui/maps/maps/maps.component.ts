import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  @Input()
  zoom: number = 14;

  @Input()
  lat: number;

  @Input()
  lng: number;

  @Input()
  isMapOpen: boolean = true;

  @Output()
  latClick = new EventEmitter();

  @Output()
  lngClick = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onMapClick($event) {
    this.lat = $event.coords.lat;
    this.latClick.emit({ newLat: this.lat });
    this.lng = $event.coords.lng;
    this.lngClick.emit({ newLng: this.lng });
  }


}
