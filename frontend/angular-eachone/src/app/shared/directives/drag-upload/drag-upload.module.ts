import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragUploadDirective } from './drag-upload.directive';



@NgModule({
    declarations: [DragUploadDirective],
    imports: [
        CommonModule,
    ], exports: [
        DragUploadDirective
    ]
})
export class DragUploadModule { }