import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { itemProfile } from './itemProfile';
@Component({
  selector: 'app-drop-menu-profile',
  templateUrl: './drop-menu-profile.component.html',
  styleUrls: ['./drop-menu-profile.component.scss']
})
export class DropMenuProfileComponent implements OnInit {

  window: any = window;
  isClicked: boolean = false;
  classProfile = 0;
  profiles: string[] = ['Administrador', 'Aluno', 'Professor', 'ADM-EachOne'];
  smallScreen: boolean = false
  isOpen: boolean = false;
  public id: number;

  @Input()
  itemsProfile: itemProfile[];

  @Input()
  actualProfile: String;

  @Output()
  onItemClick: EventEmitter<any> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getId()

    if (window.screen.width < 769) {
      this.smallScreen = true;
    }

    this.route.params.subscribe( async params => {
      this.id = params.id
    })
  }

  @HostListener('document:click', ['$event'])
  onClick(btn) {
    var list = document.getElementById('list')
    var arrow = document.getElementById('arrow')

    if (btn.target != arrow) {
      list.style.display = 'none'
      this.isOpen = false;
      this.dropDownClick()
    }
    if (btn.target == arrow) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        list.style.display = 'block'
      }
      if (!this.isOpen) {
        list.style.display = 'none'
      }
    }
  }

  dropDownClick() {
    this.isClicked = !this.isClicked
  }

  chanceProfile() {
    this.classProfile = this.classProfile + 1
    if (this.classProfile > 3) {
      this.classProfile = 0
    }
  }

  handleClick(item, id) {
    this.onItemClick.emit(item);

    if (item.route != "") {
      this.router.navigate([item.route, id])
    }
  }

  getId() {
    this.route.params.subscribe(async params => {
      this.id = params.id;
    });
  }
}
