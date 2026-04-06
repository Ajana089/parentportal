import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComponentPortal } from '@angular/cdk/portal';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  portal: ComponentPortal<any>;
  headerPortal: ComponentPortal<any>;
  showDefaultHeader: boolean = true;
  title: string = ''
  csstitle: string = ''
  component: any;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public params: any) {

      if (this.params) {
        if (this.params.component) {
          this.portal = new ComponentPortal(this.params.component);
        }
        if (this.params.title) {
          this.title = this.params.title;
        }
        if (this.params.showDefaultHeader) {
          this.showDefaultHeader = true;
        }
        if (this.params.header) {
          this.headerPortal = new ComponentPortal(this.params.header);
        }
        if (this.params.csstitle) {
          this.csstitle = this.params.csstitle;
        }
      }
  }
  ngOnInit() {
   
  }
  closeDialog() {
    this.dialogRef.close();
  }

}