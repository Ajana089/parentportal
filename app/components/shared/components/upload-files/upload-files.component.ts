import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppSettings } from '../../helper/appsettings';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  @Input() headerText: string = '';
  @Input() uploadedFiles = [];
  @Input() disableControls = false;
  @Input() showHeaderText = true;
  @Output() fileEmitter = new EventEmitter<any[]>();
  @Output() uploadedFileEmitter = new EventEmitter<any[]>();  
  files: any =[];
  showUploadedFiles = [];
  @ViewChild('fileInput', {static: false})
  InputVar: ElementRef;

  constructor() { }

  ngOnInit(): void {
    if (this.uploadedFiles && this.uploadedFiles.length > 0){
      this.showUploadedFiles = this.uploadedFiles.filter((x: any) => x.IsDeleted == false);
      // console.log(this.uploadedFiles);
    }
  }

  removeFile(i) {
    this.files.splice(i, 1);
    this.fileEmitter.emit(this.files);
  }

  removeUploadedFile(i, fileId) {
    this.uploadedFiles.forEach((item: any) =>{
      if(item.Id == fileId){
          item.IsDeleted = true
      }
    });
    this.showUploadedFiles.splice(i, 1);
    this.uploadedFileEmitter.emit(this.uploadedFiles);
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.files.push(event.target.files[i]);
      }
      this.fileEmitter.emit(this.files); 
      this.InputVar.nativeElement.value = ""; 
    }
  }

  viewDocument(attachmentPath){
    window.open(AppSettings.assetUrl+attachmentPath, '_blank');
  }

}

