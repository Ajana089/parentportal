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

@Component({
  selector: 'app-orders-summary',
  templateUrl: './orders-summary.component.html',
  styleUrl: './orders-summary.component.css',
})
export class OrdersSummaryComponent implements OnInit {
  loggedInUser: User;
  family_no: any = '';
  from_date: any = new Date();
  to_date: any = new Date();
  schools: any[] = [];
  selectedSchool: any = '';
  buList: any[] = [];
  selectedBU: any = '0';
  vendorList: any[] = [];
  selectedVendor: any = '0';
  categoryList: any[] = [];
  selectedCategory: any = '0';
  loading = false;

  constructor(
    private authService: AuthService,
    private reportService: ReportsService,
    private orderService: OrderService,
    private productService: ProductService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  displayedColumns: string[] = [
    'Customer_ID',
    'LEASE_ID',
    'Order_ID',
    'Order_Type',
    'Order_Date',
    'Total_Amount',
    'Total_VAT',
    'Total_Invoice_Amount'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();

    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    // this.reportService
    //   .getSchools(this.loggedInUser.CompanyID, this.loggedInUser.isAdmin)
    //   .subscribe((res: any) => {
    //     if (res) {
    //       this.schools = res;
    //       this.selectedSchool = res[0].Id;
    //     }
    //   });
    // this.orderService.getBUList(this.loggedInUser.UserName).subscribe((res: any) => {
    //   if (res) {
    //     this.buList = res;
    //   }
    // });

    // this.productService.getProductCategories().subscribe((res: any) => {
    //   if (res) {
    //     this.categoryList = res;
    //   }
    // });
    // this.productService.getProductVendors().subscribe((res: any) => {
    //   if (res) {
    //     this.vendorList = res;
    //   }
    // });
  }

  searchOrders() {

    if (!this.loggedInUser.isAdmin)
    {
      this.selectedBU = this.loggedInUser.CompanyID.toString();
    }

    var obj = {
      // company_id: this.selectedBU || 0,
      // vendor_id: this.selectedVendor || 0,
      // category_id: this.selectedCategory || 0,
      from_date:
        this.from_date != '' ? this.from_date.toLocaleDateString() : '',
      to_date: this.to_date != '' ? this.to_date.toLocaleDateString() : '',
    };
    this.loading = true;
    this.reportService
      .getOrdersSummary(obj)
      .subscribe((res: any) => {
        if (res) {
          this.loading = false;
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
