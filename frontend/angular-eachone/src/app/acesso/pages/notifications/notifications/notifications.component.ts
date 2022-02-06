import { Component, HostListener, OnInit } from '@angular/core';
import { ModalFilterService } from 'src/app/shared/ui/modal-filter/modal-filter/modal-filter.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  breadcrumb = [{
    name: 'Dashboard',
    route:  'dashboard',
    permition: 'any'
  },{
    name: 'Notificações',
    route:  'notifications',
    permition: 'any'
  }]
  status:number
  title:String
  date:String
  content:String
  activeCard:number
  notificationTextModalIsOn:boolean  = false
  screenIsLessThan1201: boolean = false
  notifications = [{
    title: 'Cobança da Instituição "x" não foi realizada',
    status: 1,
    unseen: true,
    content: 'Faculdade ta devendo o agiota, os caras vão cobrar',
    date: '31.05.2021'
  },{
    title: 'Cobança da Instituição "x" não foi realizada',
    status:  2,
    unseen: true,
    content: 'Paga aew vacilão',
    date: '29.05.2021'
  },{
    title: 'Cobança da Instituição "x" não foi realizada',
    status:  2,
    unseen: true,
    content: 'Paga aew vacilão',
    date: '29.05.2021'
  },{
    title: 'Cobança da Instituição "x" não foi realizada',
    status:  2,
    unseen: true,
    content: 'Paga aew vacilão',
    date: '29.05.2021'
  },{
    title: 'Cobança da Instituição "x" não foi realizada',
    status:  2,
    unseen: true,
    content: 'Paga aew vacilão',
    date: '29.05.2021'
  },{
    title: 'Cobança da Instituição "x" não foi realizada',
    status:  2,
    unseen: true,
    content: 'Paga aew vacilão',
    date: '29.05.2021'
  },{
    title: 'Cobança da Instituição "x" não foi realizada',
    status:  3,
    unseen: false,
    content: 'ow',
    date: '31.05.2021'
  },{
    title: 'Cobança da Instituição "x" não foi realizada',
    status:  2,
    unseen: true,
    content: 'Faculdade ta devendo o agiota, os caras vão cobrar',
    date: '31.05.2021'
  },]

  constructor(private modalFilterService: ModalFilterService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if( window.innerWidth < 1201){
      this.screenIsLessThan1201 = true
    }
    else{
      this.screenIsLessThan1201 = false
      this.notificationTextModalIsOn = false
    }
  }

  selectNotification(i:number){

    this.content = this.notifications[i].content
    this.title = this.notifications[i].title
    this.date = this.notifications[i].date
    this.status = this.notifications[i].status
    this.activeCard = i
  }

  ngOnInit(): void {
    if (window.innerWidth < 1201) {
      this.screenIsLessThan1201 = true
    }
    }

  modal(){
    this.modalFilterService.handle()
  }

  notificationModalOn(){
    if (window.innerWidth < 1201){
      this.notificationTextModalIsOn = true
    }
  }

  closeNotification(){
    this.notificationTextModalIsOn = false
  }
}
