import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ProfileModel } from '../../../models/profile.model';
import { NavigationItem } from './navigationItem';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private userProfile: ProfileModel;
  public userPermissions: string[];

  constructor(
    private profileService: ProfileService,
  ) {
    this.userProfile = this.profileService.get();
    this.userPermissions = this.userProfile.permissions;
    console.log(this.userPermissions.includes('organization-list'))
  }

  ngOnInit(): void {
  }

}
