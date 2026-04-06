import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../auth/services/auth.service';
import { ReportsService } from '../../services/reports.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { OrderService } from '../../../home/services/order.service';
import { ProductService } from '../../../home/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { TenantDaySalesComponent } from '../tenant-day-sales/tenant-day-sales.component';
import { InvoiceDaySalesComponent } from '../invoice-day-sales/invoice-day-sales.component';
import { TenantItemDaySalesComponent } from '../tenant-item-day-sales/tenant-item-day-sales.component';

@Component({
  selector: 'app-item-monthly-sales',
  templateUrl: './item-monthly-sales.component.html',
  styleUrl: './item-monthly-sales.component.css'
})
export class ItemMonthlySalesComponent implements OnInit {

 loggedInUser: User;
  family_no: any = '';
  month: any = '';
  year: any = '';
  schools: any[] = [];
  selectedSchool: any = '';
  buList: any[] = [];
  selectedBU: any = '0';
  vendorList: any[] = [];
  selectedVendor: any = '0';
  categoryList: any[] = [];
  selectedCategory: any = '0';
  loading = false;
  selectedMonth: any = '';
  selectedYear: any = '';

  constructor(
    private authService: AuthService,
    private reportService: ReportsService,
    private orderService: OrderService,
    private productService: ProductService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'seq',
    'Store_ID',
    'Store_Name',
    'IntegrationStartDate',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

    openDetails(element: any, day: string) {

    const dialogRef = this.dialog.open(TenantItemDaySalesComponent, {
      height: 'auto',
      width: '90%',
      minWidth: '90%',
      data: { Store_ID: element.Store_ID, Store_Name: element.Store_Name, day, selectedMonth: this.selectedMonth, selectedYear: this.selectedYear },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      //his.getRequests();
    });
    
  }

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();

    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    this.year = new Date().getFullYear().toString();

    this.searchOrders();
  }

  searchOrders() {

    if (!this.loggedInUser.isAdmin)
    {
      this.selectedBU = this.loggedInUser.CompanyID.toString();
    }

    if (this.year != '')
    {
      this.loading = true;
      this.reportService
        .getTenantItemSalesMonthly(this.year)
        .subscribe((res: any) => {
          if (res) {
            this.loading = false;

            this.selectedMonth = this.month;
            this.selectedYear = this.year;

            ELEMENT_DATA = res;

            this.dataSource = new MatTableDataSource<PeriodicElement>(
              ELEMENT_DATA
            );

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            ELEMENT_DATA = [];
            this.dataSource = new MatTableDataSource<PeriodicElement>(
              ELEMENT_DATA
            );
          }
        });
    }

    
  }

  exportData() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onChangeSchool(value) {
    this.selectedSchool = value;
  }

  onChangeBU(value) {
    this.selectedBU = value;
  }

  onChangeVendor(value) {
    this.selectedVendor = value;
  }

  onChangeCategory(value) {
    this.selectedCategory = value;
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
}

export interface PeriodicElement {
}

let ELEMENT_DATA: PeriodicElement[] = [];




