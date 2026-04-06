import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DivisionAddComponent } from '../division-add/division-add.component';
import { MasterSetupService } from '../../../services/master-setup.service';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { untilDestroyed } from '../../../../shared/decorators/take-until-destroy.decorator';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrl: './division.component.css',
})
export class DivisionComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'BusinessUnit',
    'DivisionName',
    'DivisionCode',
    'CostCenterCode',
    'OracleSegmentID',
    'ManagerEmail',
    'Status',
    'Actions',
  ];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatTable) table!: MatTable<any>;
  loading = false;
  inputObj: any = {};
  sale_date: any = '';

  constructor(
    public dialog: MatDialog,
    private service: MasterSetupService,
    private _liveAnnouncer: LiveAnnouncer,
  ) {
    this.getData();
  }
  ngOnInit(): void {
    // this.getData();
  }

  ngAfterViewInit() {}

  getData() {
    var obj = {
      Store_ID: this.inputObj.Store_ID,
      Day: this.inputObj.day,
      Month: this.inputObj.selectedMonth,
      Year: this.inputObj.selectedYear,
    };

    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    this.loading = true;
    this.service.GetAllDivisionMasters().subscribe((res: any) => {
      if (res) {
        this.loading = false;
        ELEMENT_DATA = res;
        //this.cdr.detectChanges();
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        // this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        //this.dataSource.data = [...this.dataSource.data];
        // this.dataSource._updateChangeSubscription();
        //this.cdr.detectChanges();
      }
    });
  }

  openClientDialog() {}
  onFormValueChange() {}
  resetFilters() {}

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editDivisionID(data: any) {
    let dialogRef = this.dialog.open(DialogComponent, {
      minWidth: '100vw',
      minHeight: '100vh',
      data: {
        component: DivisionAddComponent,
        title: 'Division Master',
        id: data.ID,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        //   //this.componentInteractionService.menuClientUpdate(true);
        console.log(res);
        this.getData();
      });
  }

  openAddDialog() {
    this.openDialog();
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      minWidth: '100vw',
      minHeight: '100vh',
      data: { component: DivisionAddComponent, title: 'Add Division' },
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        this.getData();
      });
  }
}

export interface PeriodicElement {}
let ELEMENT_DATA: PeriodicElement[] = [];
