import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragUploadModule } from './drag-upload/drag-upload.module';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        DragUploadModule
    ], exports: [
        DragUploadModule
    ]
})
export class DirectivesModule { }