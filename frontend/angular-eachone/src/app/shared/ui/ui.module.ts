import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from './input/input.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { RouterModule } from '@angular/router';
import { PainelModule } from './painel/painel.module';
import { LoadingModule } from './loading/loading.module';
import { MessageModule } from './message/message.module';
import { PaginationModule } from './pagination/pagination.module';
import { MapsModule } from './maps/maps.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { SelectModule } from './select/select.module';
import { DropMenuModule } from './drop-down/drop-menu.module';
import { ModalDialogModule } from './modal-dialog/modal-dialog.module';
import { ToggleSwitchModule } from './toggle-switch/toggle-switch.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { BreadcumbModule } from './breadcumb/breadcumb.module';
import { TextAreaModule } from './text-area/text-area.module';
import { PrintModule } from './print/print.module';
import { LimitScaleModule } from './limit-scale/limit-scale.module';
import { ColorPickerModule } from './color-picker/color-picker.module';
import { NotificationModule } from './notification/notification.module';
import { SidebarComponent } from './sidebar/sidebar.component';

import { HeaderModule } from './header/header.module';
import { PeriodButtonModule } from './period-button/period-button.module';
import { CalendarButtonModule } from './calendar-button/calendar-button.module';
import { OptionsModule } from './options/options.module';
import { DropdownSearchModule } from './dropdown-search/dropdown-search.module';
import { ThemeModule } from './theme/theme.module';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { NavbarModule } from './navbar/navbar.module';
import { CockpitProfileComponent } from './navbar/cockpit-profile/cockpit-profile.component';
import { StatusModule } from './status/status.module';
import { ButtonModule } from './button/button.module';
import { ModalFilterModule } from './modal-filter/modal-filter.module';

import { StatusUserModule } from './status-user/status-user.module';
import { CardsModule } from './cards/cards.module';
import { AttachAreaModule } from './attach-area/attach-area.module';
import { TableModule } from './table/table.module';
import { AnchorButtonModule } from './anchor-button/anchor-button.module';
import { SwitchListModule } from './switch-list/switch-list.module';



import { ArchorSectionModule } from './archor-section/archor-section.module';
import { LanguagesSelectModule } from './languages-select/languages-select.module';
import { ModalTableModule } from './modal-table/modal-table.module';
import { SecurityModule } from '../securty/security.module';


@NgModule({
  declarations: [
    SidebarComponent,
  ],
  imports: [
    NavbarModule,
    ThemeModule,
    OptionsModule,
    CalendarButtonModule,
    PeriodButtonModule,
    HeaderModule,
    CommonModule,
    RouterModule,
    InputModule,
    TooltipModule,
    PainelModule,
    MapsModule,
    CheckboxModule,
    SelectModule,
    DropMenuModule,
    ModalDialogModule,
    ToggleSwitchModule,
    UploadFileModule,
    BreadcumbModule,
    TextAreaModule,
    PrintModule,
    LimitScaleModule,
    ColorPickerModule,
    NotificationModule,
    DropMenuModule,
    PaginationModule,
    DropdownSearchModule,
    SelectModule,
    StatusModule,
    ButtonModule,
    StatusUserModule,
    StatusModule,
    CardsModule,
    AttachAreaModule,
    TableModule,
    ModalFilterModule,
    SwitchListModule,
    ArchorSectionModule,
    LanguagesSelectModule,
    ModalTableModule

  ],
  exports: [
    NavbarModule,
    ThemeModule,
    SidebarComponent,
    NavbarComponent,
    InputModule,
    TooltipModule,
    LoadingModule,
    MessageModule,
    PaginationModule,
    MapsModule,
    CheckboxModule,
    SelectModule,
    DropMenuModule,
    ModalDialogModule,
    ToggleSwitchModule,
    UploadFileModule,
    BreadcumbModule,
    TextAreaModule,
    PrintModule,
    LimitScaleModule,
    ColorPickerModule,
    NotificationModule,
    DropMenuModule,
    PaginationModule,
    DropdownSearchModule,
    SelectModule,
    StatusModule,
    ButtonModule,
    StatusUserModule,
    HeaderModule,
    CardsModule,
    AttachAreaModule,
    StatusModule,
    TableModule,
    ModalFilterModule,
    AnchorButtonModule,
    SwitchListModule,
    ArchorSectionModule,
    LanguagesSelectModule,
    ModalTableModule

  ]
})
export class UiModule { }
