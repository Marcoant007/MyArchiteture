import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WrapperService } from 'src/app/shared/services/wrapper.service';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.scss']
})
export class SmallCardComponent implements OnInit {

  expanded:boolean = false
  public subs: Subscription;
  constructor(private wrapperService: WrapperService) { }

  ngOnInit(): void {
    if(!this.wrapperService.isOpen){
      this.expanded = !this.expanded
    }

    this.subs = this.wrapperService.getObservable().subscribe( isMenuOpen => {
    this.expanded = !this.expanded
  });
}

public ngOnDestroy() {
  this.subs.unsubscribe();
}

}
