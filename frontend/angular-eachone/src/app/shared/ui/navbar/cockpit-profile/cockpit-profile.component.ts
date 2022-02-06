import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { SnackbarService } from '../../modal-dialog/snackbar/snackbar.service';


@Component({
  selector: 'app-cockpit-profile',
  templateUrl: './cockpit-profile.component.html',
  styleUrls: ['./cockpit-profile.component.scss']
})
export class CockpitProfileComponent implements OnInit {

  badge: number = 0
  profileName: String = ''
  profileImgUrl: String = ''
  expanded: boolean = false;
  actualProfile: String = ''
  ProfilesArray = ["Aluno", "Professor", "Administrador", "Adm-EC"]
  actualProfileNumber = 0

  itemsProfile: object[] = [
    { item: 'Alterar Perfil de Acesso', key: 'ChangeProfileAcess', route: '' },
    { item: 'Editar', route: 'edituser' },
    { item: 'sair', route: 'login' }
  ]

  constructor(private profileService: ProfileService, public router: Router, private snackBarService: SnackbarService) { }

  ngOnInit(): void {
    this.profileName = this.profileService.get().userName;
    this.actualProfile = this.profileService.get().userType;
    this.profileImgUrl = this.profileService.get().userImg;
    if (window.screen.width < 769) {
      this.expanded = true;
    }
    else {
      this.expanded = false;
    }
  }

  newBadge() {
    this.badge = this.badge + 1
  }

  onDropDownClick(item) {
    if (item.item === "sair") {
      let confirmado = confirm("Tem certeza sair do sistema ?"); // TODO 
      if (confirmado) {
        this.profileService.logout();
        this.router.navigateByUrl('/login');
      }
    }
    //  this[item.key](item)
  }

  ChangeProfileAcess(item) {
    this.actualProfileNumber = this.actualProfileNumber + 1
    if (this.actualProfileNumber > 3) {
      this.actualProfileNumber = 0
    }
    this.actualProfile = this.ProfilesArray[this.actualProfileNumber]
  }
}
