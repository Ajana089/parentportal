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
import { TenantInvoiceDaySalesComponent } from '../tenant-invoice-day-sales/tenant-invoice-day-sales.component';


@Component({
  selector: 'app-tenant-item-sales',
  templateUrl: './tenant-item-sales.component.html',
  styleUrl: './tenant-item-sales.component.css'
})
export class TenantItemSalesComponent implements OnInit {



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
    'Day1',
    'Day2',
    'Day3',
    'Day4',
    'Day5',
    'Day6',
    'Day7',
    'Day8',
    'Day9',
    'Day10',
    'Day11',
    'Day12',
    'Day13',
    'Day14',
    'Day15',
    'Day16',
    'Day17',
    'Day18',
    'Day19',
    'Day20',
    'Day21',
    'Day22',
    'Day23',
    'Day24',
    'Day25',
    'Day26',
    'Day27',
    'Day28',
    'Day29',
    'Day30',
    'Day31'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

    openDetails(element: any, day: string) {

      if (element.SyncType == 'Item')
      {
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
      else if (element.SyncType == 'Invoice')
      {
        const dialogRef = this.dialog.open(TenantInvoiceDaySalesComponent, {
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

      
  }

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();

    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    this.month = (new Date().getMonth() + 1).toString();
    this.year = new Date().getFullYear().toString();

    this.searchOrders();
  }

  searchOrders() {

    if (!this.loggedInUser.isAdmin)
    {
      this.selectedBU = this.loggedInUser.CompanyID.toString();
    }

    if (this.month != '' && this.year != '')
    {
      this.loading = true;
      this.reportService
        .getTenantItemSales(this.month, this.year)
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
  // school_address: string;
  // customer_name: string;
  // family_no: string;
  // billing_phone: string;
  // billing_email: string;
  // billing_address: string;
  // billing_city: string;
  // order_id: string;
  // order_type: string;
  // payment_method: string;
  // card_reference: string;
  // order_date: string;
  // amount_excl_vat: string;
  // tax_total: string;
  // net_total: string;
  // status: string;
}

let ELEMENT_DATA: PeriodicElement[] = [];



