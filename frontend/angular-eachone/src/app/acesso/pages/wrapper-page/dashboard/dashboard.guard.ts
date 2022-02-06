import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileModel } from 'src/app/shared/models/profile.model';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(
    private profileService: ProfileService
  ){}

  canActivate(){
    const profile: ProfileModel = this.profileService.get();
    if (profile.userType != 'Administrador' && profile.userType != 'Professor' && profile.userType != 'Administrador_Instituicional') {
      return false;
    }
    return true;
  }
  
}
