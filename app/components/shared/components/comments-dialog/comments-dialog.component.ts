import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogModel } from '../../models/confirm-dialog.model';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrls: ['./comments-dialog.component.scss']
})
export class CommentsDialogComponent implements OnInit {

  public title: string = '';
  comments: string = '';
  constructor(public dialogRef: MatDialogRef<CommentsDialogComponent>) {
  }
  ngOnInit() {

  }

  onConfirm(): void {
    // Close the dialog, return true
    if (this.comments.length) {
      this.dialogRef.close(true);
    }
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}
