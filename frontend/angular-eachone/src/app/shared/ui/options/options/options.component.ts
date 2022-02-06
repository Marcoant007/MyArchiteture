import { Component, HostListener, OnInit } from '@angular/core';
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  actioned: boolean = false

  toolListWithIcon: Object[]=[
    {
    "tool":'Cobranças',
    "icon":'far fa-dollar-sign'},
    {
    "tool":'Instituições',
    "icon":'far fa-home'},
    {
    "tool":'Campi',
    "icon":'far fa-flag'},
    {
    "tool":'Usuários',
    "icon":'far fa-users'},
    {
    "tool":'Cursos',
    "icon":'far fa-graduation-cap'},
    {
    "tool":'Áreas',
    "icon":'far fa-book'},
    {
    "tool":'Matérias',
    "icon":'far fa-file-alt'},
    {
    "tool":'Fóruns',
    "icon":'far fa-comments'},
    {
    "tool":'Avaliações',
    "icon":'far fa-star'},
    {
    "tool":'Notas',
    "icon":'far fa-check-circle'},
    {
    "tool":'Jornada',
    "icon":'far fa-clock'},
    {
    "tool":'Ritmo',
    "icon":'fas fa-angle-double-right'},
    {
    "tool":'Progresso',
    "icon":'far fa-angle-double-up'}]

  @HostListener('document:click', ['$event'])
  onClick(btn){
    var droopTools = document.getElementById('droopTools')
    var options = document.getElementById('options')

    if(btn.target != options){
      droopTools.style.display='none'
      this.dropToolsAction()
    }

    if(btn.target == options){
      droopTools.style.display='block'
    }

    if(btn.target == options && this.actioned != true){
      droopTools.style.display='none'
    }
  }

  constructor() {

  }

  ngOnInit(): void {
  }

  dropToolsAction(){
    this.actioned = !this.actioned
  }
}
