import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ConfirmDialogModel,
  CommentsDialog,
  SelectLanguageDialog,
} from '../models/confirm-dialog.model';
import { DialogComponent } from '../components/dialog/dialog.component';
import { GridModalComponent } from '../components/grid-modal/grid-modal.component';
import { CommentsDialogComponent } from '../components/comments-dialog/comments-dialog.component';
import { SelectLanguageDialogComponent } from '../components/select-language-dialog/select-language-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  constructor(private dialog: MatDialog) {}

  public confirm(
    model: ConfirmDialogModel = new ConfirmDialogModel()
  ): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minHeight: model.minHeight,
      minWidth: model.minWidth,
    });
    dialogRef.componentInstance.title = model.title;
    dialogRef.componentInstance.message = model.message;

    return dialogRef.afterClosed();
  }

  public commentsDialog(
    model: CommentsDialog = new CommentsDialog()
  ): Observable<any> {
    let dialogRef: MatDialogRef<CommentsDialogComponent>;

    dialogRef = this.dialog.open(CommentsDialogComponent, {
      minHeight: model.minHeight,
      minWidth: model.minWidth,
    });
    dialogRef.componentInstance.title = model.title;

    return dialogRef.afterClosed();
  }

  public SelectLanguageDialog(
    model: SelectLanguageDialog = new SelectLanguageDialog()
  ): Observable<any> {
    let dialogRef: MatDialogRef<SelectLanguageDialogComponent>;

    dialogRef = this.dialog.open(SelectLanguageDialogComponent, {
      minHeight: model.minHeight,
      minWidth: model.minWidth,
      width: '400px',
      height: '250px',
      disableClose: true,
    });
    dialogRef.componentInstance.title = model.title;

    return dialogRef.afterClosed();
  }

  public openDialog(data?: any): Observable<boolean> {
    let dialogRef: MatDialogRef<DialogComponent>;
    dialogRef = this.dialog.open(DialogComponent, {
      minHeight: '100vh',
      minWidth: '100vw',
      data: { ...data },
    });
    return dialogRef.afterClosed();
  }

  public openMaxDialog(data?: any): Observable<boolean> {
    let dialogRef: MatDialogRef<DialogComponent>;
    dialogRef = this.dialog.open(DialogComponent, {
      minHeight: '400vh',
      minWidth: '300vw',
      disableClose: true,
      data: { ...data },
    });
    return dialogRef.afterClosed();
  }

  public openGridDialog(data?: any): Observable<boolean> {
    let dialogRef: MatDialogRef<GridModalComponent>;
    dialogRef = this.dialog.open(GridModalComponent, {
      minWidth: '500px',
      maxWidth: '500px',
      maxHeight: '60vh',
      data: { ...data },
    });
    return dialogRef.afterClosed();
  }

  dismisAll() {
    this.dialog.closeAll();
  }
}
