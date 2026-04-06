
export class DynamicGridColumnModel {
    field: string = '';
    filter?: any;
    headerName?: string = '';
    sort?: boolean = true;
    rowDrag?: boolean = false;
    width?: number = undefined;
    minWidth?: number = undefined;
    maxWidth?: number = undefined;
    editable?:boolean = false;
    cellEditor?:any;
    cellRendererFramework?: any;
    cellRendererParams?: any;
    headerCheckboxSelection?: boolean = false;
    headerCheckboxSelectionFilteredOnly?: boolean = false;
    checkboxSelection?: boolean = false;
    pinnedRowCellRenderer?: any;
    pinnedRowCellRendererParams?: any
    valueGetter?:any
}