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
  selector: 'app-item-sale-wise',
  templateUrl: './item-sale-wise.component.html',
  styleUrl: './item-sale-wise.component.css',
})
export class ItemSaleWiseComponent implements OnInit {
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
    'bu_name',
    'grade_desc',
    'item_code',
    'item_name',
    'item_uom',
    'item_desc',
    'item_type',
    'category_name',
    'vendor_name',
    'unit_price',
    'quantity',
    'vat',
    'total_price',
    'total_price_incl',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();

    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    this.reportService
      .getSchools(this.loggedInUser.CompanyID, this.loggedInUser.isAdmin)
      .subscribe((res: any) => {
        if (res) {
          this.schools = res;
          this.selectedSchool = res[0].Id;
        }
      });
    // this.orderService.getBUList(this.loggedInUser.UserName).subscribe((res: any) => {
    //   if (res) {
    //     this.buList = res;
    //   }
    // });

    this.productService.getProductCategories().subscribe((res: any) => {
      if (res) {
        this.categoryList = res;
      }
    });
    this.productService.getProductVendors().subscribe((res: any) => {
      if (res) {
        this.vendorList = res;
      }
    });
  }

  searchOrders() {

    if (!this.loggedInUser.isAdmin)
    {
      this.selectedBU = this.loggedInUser.CompanyID.toString();
    }

    var obj = {
      company_id: this.selectedBU || 0,
      vendor_id: this.selectedVendor || 0,
      category_id: this.selectedCategory || 0,
      from_date:
        this.from_date != '' ? this.from_date.toLocaleDateString() : '',
      to_date: this.to_date != '' ? this.to_date.toLocaleDateString() : '',
    };

    this.loading = true;
    this.reportService.getOrderItemWiseSales(obj).subscribe((res: any) => {
      if (res) {
        ELEMENT_DATA = res;
        this.loading = false;
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
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

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface PeriodicElement {
  // bu_name: string;
  // vendor_name: string;
  // category_name: string;
  // item_name: string;
  // unit_price: string;
  // quantity: string;
  // vat: string;
  // total_price: string;
  // total_price_incl: string;
}
let ELEMENT_DATA: PeriodicElement[] = [];
