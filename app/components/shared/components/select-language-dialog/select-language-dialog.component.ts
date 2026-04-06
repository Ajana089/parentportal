import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-language-dialog',
  templateUrl: './select-language-dialog.component.html',
  styleUrls: ['./select-language-dialog.component.scss']
})
export class SelectLanguageDialogComponent implements OnInit {

  public title: string = '';
  comments: string = '';
  constructor(public dialogRef: MatDialogRef<SelectLanguageDialogComponent>) {
  }
  ngOnInit() {

  }

  onEnglishSelected(){
    this.dialogRef.close('english');
  }

  onArabicSelected(){
    this.dialogRef.close('arabic');
  }

}
