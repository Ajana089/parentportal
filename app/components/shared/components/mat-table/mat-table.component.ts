import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'mat-dynamic-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit {
  @Input() title = '';
  displayedColumns: any = [];
  _columns: any[] = [];
  _originalData: any;
  @Input()
  set tableColumns(cols: any[]) {
    this._columns = cols;
  }
  get tableColumns() {
    return this._columns;
  }
  @Input()
  set dataSource(data: MatTableDataSource<any>) {
    this._originalData = data;
  };
  get dataSoruce() {
    return this._originalData
  }

  constructor() {
  }

  ngOnInit() {
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.dataSource = this.dataSource;
  }

  onSelectionChange(row: any) {
    //this.dialogRef.close({ data: row });
  }
}
