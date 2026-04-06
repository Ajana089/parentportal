import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { User } from '../shared/models/user.model';
import { AuthService } from '../auth/services/auth.service';
import { OrderService } from '../home/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})

export class OrdersComponent implements OnInit {
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
  roleId: any = ''
  loading = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService,
    private orderService: OrderService,
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
    'bu_name',
    'department_name',
    'order_id',
    'order_date',
    'requester_name',
    'net_total',
    'status_description',
    'current_approver',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  orderStatus: any[] = []
  buList: any[] = []
  selectedStatus: any = '';
  selectedBU: any = '0';

  ngOnInit() {
    //  this.loading = true;
    this.loggedInUser = this.authService.getLoggedInUser();
    this.roleId = this.loggedInUser.Role;

    // console.log(this.loggedInUser);

    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    // this.orderService.getOrderStatus().subscribe((res: any) => {
    //   if (res)
    //     {
    //       this.orderStatus = res;
    //       this.selectedStatus = 'my-approval';

    //       this.searchOrders();
    //     }
    // });
    // this.orderService.getBUList(this.loggedInUser.UserName).subscribe((res: any) => {
    //   if (res)
    //     {
    //       this.buList = res;

    //       if (this.buList.length == 1)
    //       {
    //         this.selectedBU = this.buList[0].company_id
    //       }

    //       this.searchOrders();
    //     }
    // });
  }

  onChangeStatus(value){
    this.selectedStatus = value;
    this.searchOrders();
  }

  onChangeBU(value){
    this.selectedBU = value;
    this.searchOrders();
  }

  searchOrders()
  {
    this.loading = true;

    if (!this.loggedInUser.isAdmin)
    {
      this.selectedBU = this.loggedInUser.CompanyID.toString();
    }

    var obj = {
      user_id: '',
      // user_id: this.loggedInUser.ID.toString(),
      company_id: this.selectedBU,
      // company_id: this.loggedInUser.CompanyID,
      from_date: this.from_date != '' ? this.from_date.toLocaleDateString() : '',
      to_date: this.to_date != '' ? this.to_date.toLocaleDateString() : '',
      status: this.selectedStatus,
      logged_in_user: this.loggedInUser.ID.toString(),
    }

    this.orderService.getSchoolOrders(obj).subscribe((res: any) => {
      if (res){
        this.loading = false;
        ELEMENT_DATA = res;
        // console.log(res)
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
// console.log(element)
    const dialogRef = this.dialog.open(ViewOrderComponent, {
      height: 'auto',
      width: '100%',
      minWidth: '90%',
      data: element,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
        this.searchOrders();
    });
  }

  printDialog(element) {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  editOrder(element) {
    // console.log(element)
    this.router.navigate(['/home'], { state: { orderData: element } });
  }
  
  deleteOrder(element) {
    
  }
}

export interface PeriodicElement {
  order_date: string;
  order_id: string;
  current_approver: string;
  status_description: string;
  requester_name: string;
  net_total: number;
  action: string;
}
let ELEMENT_DATA: PeriodicElement[] = [];