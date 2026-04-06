import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
// import { AllCommunityModules, Module, GridOptions, ColDef } from '@ag-grid-community/all-modules';
import { DynamicGridColumnModel } from '../../models/grid-column.model';
import { ColDef, GridOptions, Module } from 'ag-grid-community';

@Component({
  selector: 'dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.scss']
})
export class DynamicGridComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;
  private gridOption: GridOptions = {};
  //public modules: Module[] = AllCommunityModules;
  public modules: Module[] = [];
  _gridCols: ColDef[] = [];
  @Input() components: any;
  @Input()
  set gridColumns(cols: ColDef[]) {
    this._gridCols = cols;
  };
  get gridColumns() {
    return this._gridCols;
  }
  @Input() defaultColDef: ColDef = {
    flex: 1, minWidth: 100, sortable: true,
    filter: true
  };
  @Input() pagination: boolean = true;
  @Input() gridHeight:number = 85;
  @Input() paginationPageSize: number = 25;
  @Input() rowSelection = 'single';
  @Input() rowDrag: boolean = false;
  @Input() columDrag: boolean = false;
  @Input() animateRows: boolean = false;
  @Input() suppressRowClickSelection: boolean = false;
  @Input() pinnedBottomRowData: any;
  @Input() frameworkComponents: any;
  @Input() domLayout = '';

  @Input() rowData: [] = [];
  @Output() onSelectionChange = new EventEmitter<any>()
  @Output() gridReady = new EventEmitter<any>()
  @Output() cellEditingStopped = new EventEmitter<any>()

  constructor() {
  }

  ngOnInit() {
  }

  onSelectionChanged(event: any) {
    let selectedRows = this.gridApi.getSelectedRows();
    this.onSelectionChange.emit(selectedRows);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridReady.emit(params);
  }

  onQuickFilterChanged() {
    this.gridApi.setQuickFilter('');
  }

  onCellEditingStopped(event: any) {
    this.cellEditingStopped.emit(event);
  }

}
