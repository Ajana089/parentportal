import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MasterSetupService } from '../services/master-setup.service';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { untilDestroyed } from '../../shared/decorators/take-until-destroy.decorator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  displayedColumns: string[] = [
    'AccountNumber',
    'OrganizationName',
    'CustomerType',
    'AccountDescription',
    'RegistryID',
  ];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  loading = false;
  inputObj: any = {};
  sale_date: any = '';

  constructor(
    private service: MasterSetupService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
  ) {
    this.getData();
  }

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
    this.service.GetAllCustomers().subscribe((res: any) => {
      if (res) {
        this.loading = false;
        console.log(res);
        ELEMENT_DATA = res;

        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
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

  openAddDialog() {
    this.openDialog();
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      minWidth: '100vw',
      minHeight: '100vh',
      data: { component: CustomerAddComponent, title: 'Add Customer' },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.getData();
    });
  }
  rowClicked(row: any) {
    console.log(row);
  }
}

export interface PeriodicElement {}
let ELEMENT_DATA: PeriodicElement[] = [];
