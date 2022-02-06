import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  formGroup: FormGroup;

  fileName: string;
  fileType: string;
  fileSize: number;
  filesUpload: File;
  hasFile: boolean = false;
  filesTouched: boolean = false;
  errorMessage: string;

  @Input()
  isHaveLink: boolean = false;

  @Input()
  linkDownload: string;

  @Output()
  uploadEvent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      files: ['']
    });
  }

  onFileDropped($event) {
    this.loadFile($event);
  }

  openExplorer() {
    let input: any = document.getElementById('myFile');
    input.value = null;
    input.click();
  }

  loadFile(file) {
    this.filesTouched = true;
    this.filesUpload = file[0];

    this.formGroup.patchValue({
      files: this.filesUpload
    })
    if (this.filesUpload !== undefined) {
      this.hasFile = true;
      this.splitNameAndTypeOfFile();
    }

  }


  splitNameAndTypeOfFile(): void {
    const { name, type } = this.splitNameAndTypeOfFile2(this.filesUpload.name);
    this.fileName = name;
    this.fileType = type;
    this.fileSize = this.filesUpload.size;

    if (this.fileType.toLowerCase() != "jpg" && this.fileType.toLowerCase() != "jpeg" && this.fileType.toLowerCase() != "png") {
      this.cleanInputFiles();
      this.errorMessage = "Não é possível carregar um arquivo com extensão diferente de '.jpg', '.jpeg' ou '.png'";
    } else {
      this.errorMessage = null;
      this.upload();
    }
  }

  splitNameAndTypeOfFile2(fileNameAndType: string): any {
    const name = fileNameAndType.split('.')[0];
    const type = fileNameAndType.split('.')[1];

    return {
      name,
      type
    }
  }

  cleanInputFiles() {
    this.hasFile = false;
    this.filesUpload = null;
    this.formGroup.patchValue({
      files: this.filesUpload
    })
  }

  async upload() {

    const urlUploadAndUrlLogo: any = await this.uploadService.getpresignedurls(this.fileType);
    const url = urlUploadAndUrlLogo.urlUpload;
    const linkDown = urlUploadAndUrlLogo.urlLogo;

    await this.uploadService.uploadfileAWSS3(url, this.filesUpload);

    this.isHaveLink = true;
    this.linkDownload = linkDown;

    this.uploadEvent.emit({link:this.linkDownload});
  }

  

}
