import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { WrapperService } from 'src/app/shared/services/wrapper.service';
import { CardFlags } from 'src/app/shared/utils/VerifyCardsFlag';
@Component({
  selector: 'app-table-eachone',
  templateUrl: './table-eachone.component.html',
  styleUrls: ['./table-eachone.component.scss']
})
export class TableEachoneComponent implements OnInit {

  @Input()
  public dataList: any[];

  @Input()
  public error: Boolean;

  @Input()
  public isInstitution: Boolean;

  @Input()
  public isNotification: Boolean;

  @Input()
  public isCharge: Boolean;

  @Input()
  public isCourse: Boolean;

  @Input()
  public isCharging: Boolean;

  @Input()
  public editPermission: string;

  @Input()
  public deletePermission: string;

  @Output()
  public eventEditEmitter = new EventEmitter();

  @Output()
  public eventDeleteEmitter = new EventEmitter();

  public isExpandTable: boolean;

  public subs: Subscription;

  constructor(
    private cardFlags: CardFlags,
    private wrapperService: WrapperService) { }

  ngOnInit(): void {
    this.subs = this.wrapperService.getObservable().subscribe(isMenuOpen => {
      this.isExpandTable = !isMenuOpen;
    });
  }

  clickEdit($event) {
    this.eventEditEmitter.emit($event);
  }

  clickDelete($event) {
    this.eventDeleteEmitter.emit($event);
  }

  verifyFlags(card: string) {
    return this.cardFlags.verifyCardFlagType(card);
  }

  expand() {
    this.wrapperService.handle();
  }

  combineDateAndTime(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dateString = '' + day + '-' + month + '-' + year;
    return dateString;
  };

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
