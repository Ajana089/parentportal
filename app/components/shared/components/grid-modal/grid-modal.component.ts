import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'grid-modal',
  templateUrl: './grid-modal.component.html',
  styleUrls: ['./grid-modal.component.scss']
})
export class GridModalComponent implements OnInit {
  columns: any[] = [];
  dataSource = new MatTableDataSource([]);
  displayedColumns: any = [];
  searchLabel: string = ''
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public params: any) {
    this.columns = params.columns;
    this.dataSource.data = params.data;
    this.searchLabel = params.searchLabel;
    this.displayedColumns = this.columns.map(c => c.field);

  }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.dataSource = this.dataSource;
  }

  onSelectionChange(row: any) {
    this.dialogRef.close(row);
  }


}
