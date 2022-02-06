import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalFilterService } from './modal-filter.service';



@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss']
})
export class ModalFilterComponent implements OnInit {

  constructor(
    private modalFilterService: ModalFilterService,
    private formBuilder: FormBuilder
    ) { }

  public subs: Subscription;
  public life: boolean = false;

  formFilter = this.formBuilder.group({
    nPages: Number ,
    filter: String
  })

  public optionNPages = [10,15,20]
  public optionFilters = ['Adm', 'Professor', 'Aluno', 'AdmEachOne']

  ngOnInit(): void {
    this.subs = this.modalFilterService.getObservable().subscribe( isMenuOpen => {
      this.showModal()
    });
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  modal(){
    this.modalFilterService.handle()
  }

  showModal(){
    this.life = !this.life;
  }

  submit(){
    console.log(this.formFilter.value)
  }

}
