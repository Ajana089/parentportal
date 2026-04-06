import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../shared/models/user.model';
import { AuthService } from '../auth/services/auth.service';
import { OrderService } from '../home/services/order.service';
//import { RequestedViewOrderComponent } from './components/requested-view-order/requested-view-order.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RequestedViewOrderComponent } from '../requested-orders/components/requested-view-order/requested-view-order.component';
import { ProductService } from '../home/services/product.service';
import { AddUpdateProductComponent } from './components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

 formOrder: FormGroup;
  today = new Date();
  fromDate: any;
  toDate: any;
  order_date: string;
  order_id: number;
  status: string;
  family_number: string;
  total: string;
  action: string;
  loggedInUser: User;
  requester_name: any = '';
  from_date: any = '';
  to_date: any = '';
  roleId: any = '';
  loading = false;
  categories: any[] = [];
  selectedCategory: string;
  vendors: any[] = [];
  selectedVendor: string;
  selectedKeyword: string = '';
  productMenu: any[] = [];
  filteredProductMenu: any[] = [...this.productMenu];
   @ViewChild('keyword') keywordInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService,
    private orderService: OrderService,
     private productService: ProductService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.formOrder = this.fb.group({
      family_no: [''],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
    });
  }

  displayedColumns: string[] = [
    // 'order_id',
    // 'order_date',
    // 'requester_name',
    // 'net_total',
    // 'status_description',
    // 'current_approver',
    'category_name',
    'vendor_name',
    'product_name',
    'item_type',
    'grade_desc',
    'unit_cost_incl_vat',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  orderStatus: any[] = [];
  selectedStatus: any = '';

  ngOnInit() {
    this.loading = true;
    this.loggedInUser = this.authService.getLoggedInUser();
    this.roleId = this.loggedInUser.Role;

    this.getCategories();
    this.getVendors();

    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    this.getProducts();

    // this.orderService.getOrderStatus().subscribe((res: any) => {
    //   if (res) {
    //     this.orderStatus = res;
    //     this.selectedStatus = '';

    //     this.searchOrders();
    //   }
    // });
  }

  getCategories() {
    this.productService.getProductCategories().subscribe((res: any) => {
      // console.log(res);
      this.categories = res;
    });
    this.selectedCategory = '';
  }

  onChangeCategory(value) {
    this.selectedCategory = value;
    this.getProducts();
  }

  onChangeVendor(value) {
    this.selectedVendor = value;
    this.getProducts();
  }

  getProducts() {
    this.productMenu = [];
    let category = this.selectedCategory || 0;
    let vendor = this.selectedVendor || 0;
    let keyword = this.selectedKeyword || '.';

    this.productService
      .getProducts(category, vendor, '.')
      .subscribe((res: any) => {
        // // console.log(res);
        // this.productMenu = res;
        // this.filteredProductMenu = res;
        // this.loading = false;
        // this.filterProduct(this.selectedKeyword);


        this.loading = false;
        ELEMENT_DATA = res;
        // console.log(res);
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  filterProduct(keyword: string): void {
    const searchTerm = keyword.toLowerCase();
    this.selectedKeyword = searchTerm;
    this.filteredProductMenu = this.productMenu.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm) || 
      product.item_code.toLowerCase().includes(searchTerm)
    );
  }

  getVendors() {
    this.productService.getProductVendors().subscribe((res: any) => {
      this.vendors = res;
    });
    this.selectedVendor = '';
  }

  clearCategory(event: MouseEvent): void {
    event.stopPropagation(); // Prevents the dropdown from opening
    this.selectedCategory = ''; // Reset to "All"
    this.onChangeCategory(this.selectedCategory); // Call the onChange method
  }
  clearVendor(event: MouseEvent): void {
    event.stopPropagation(); // Prevents the dropdown from opening
    this.selectedVendor = ''; // Reset to "All"
    this.onChangeVendor(this.selectedVendor); // Call the onChange method
  }
  clearKeyword(event: MouseEvent): void {
    event.stopPropagation(); // Prevents the input from focusing
    this.keywordInput.nativeElement.value = ''; // Clear the input field
    this.filterProduct(this.keywordInput.nativeElement.value); // Call the filter method to reset the results
  }

  onChangeStatus(value) {
    this.selectedStatus = value;
    this.searchOrders();
  }

  searchOrders() {
    this.loading = true;
    var obj = {
      // user_id: '',
      user_id: this.loggedInUser.ID.toString(),
      // company_id: 0,
      company_id: this.loggedInUser.CompanyID,
      from_date:
        this.from_date != '' ? this.from_date.toLocaleDateString() : '',
      to_date: this.to_date != '' ? this.to_date.toLocaleDateString() : '',
      status: this.selectedStatus,
      logged_in_user: this.loggedInUser.ID.toString(),
    };
    // console.log(obj);
    this.orderService.getSchoolOrders(obj).subscribe((res: any) => {
      if (res) {
        this.loading = false;
        ELEMENT_DATA = res;
        // console.log(res);
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  openViewOrderDialog(element) {
    const dialogRef = this.dialog.open(AddUpdateProductComponent, {
      height: 'auto',
      width: '60%',
      minWidth: '50%',
      data: element,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      //this.searchOrders();
    });
  }

  openProduct() {
    const dialogRef = this.dialog.open(AddUpdateProductComponent, {
      height: 'auto',
      width: '60%',
      minWidth: '50%',
      data: {},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      //this.searchOrders();
    });
  }

  printDialog(element) {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editOrder(element) {
    // console.log(element);
    this.router.navigate(['/home'], { state: { orderData: element } });
  }

  deleteOrder(element) {
    var obj = {
      order_id: element.order_id.toString(),
      user_action: 'removed',
      user_id: this.loggedInUser.ID.toString(),
    };
    this.orderService.removeOrder(obj).subscribe((res: any) => {
      if (res) {
        // console.log(res);
        Swal.fire({
          title: 'Order#' + element.order_id + ' has been removed!',
          text: '',
          icon: 'success',
        });
        this.searchOrders();
      }
    });
  }
}

export interface PeriodicElement {
  Id: number,
  category_name: string;
  vendor_name: string;
  product_name: string;
  item_type: string;
  grade_desc: string;
  unit_cost_incl_vat: number;
  action: string;
}
let ELEMENT_DATA: PeriodicElement[] = [];

