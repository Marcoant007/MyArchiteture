import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpCenterService } from 'src/app/acesso/services/help-center.service';
import HelpCenterDTO from 'src/app/shared/dtos/HelpCenterDTO';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {


  public id = undefined;
  public helpCenter: HelpCenterDTO;
  public language: string;
  public profile: string;

  constructor(private helpCenterService: HelpCenterService,
    private route: ActivatedRoute,
  ) { }

  title = 'Central de Ajuda'
  anchor = 'title'
  public anchorArray: any[];


  breadcrumb = [{
    name: 'Dashboard',
    route: 'dashboard',
    permition: 'anby'
  }, {
    name: 'Central de Ajuda',
    route: 'helpCenter',
    permition: 'anby'
  }]

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.id = params.id;
    });
    await this.loadHelpCenter();
  }

  async loadHelpCenter() {

    this.language = 'PT-BR';
    this.profile = "Administrador";
    const response = await this.helpCenterService.list(this.language, this.profile);
    this.anchorArray = response.helpCenter;

}

async findHelpCenterById($event) {
  let id = $event.code;
  try {
    this.helpCenter = await this.helpCenterService.getById(id);
    return this.helpCenter;
  } catch (error) {

  }
}

// showPost($event) {
//   console.log("OI", $event)
// }


}
