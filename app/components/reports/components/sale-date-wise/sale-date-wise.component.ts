import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../auth/services/auth.service';
import { ReportsService } from '../../services/reports.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-sale-date-wise',
  templateUrl: './sale-date-wise.component.html',
  styleUrl: './sale-date-wise.component.css'
})
export class SaleDateWiseComponent implements OnInit {

  loggedInUser: User;
  family_no: any = '';
  from_date: any = new Date();
  to_date: any = new Date();
  schools: any[] = [];
  selectedSchool: any = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private reportService: ReportsService,
    private _liveAnnouncer: LiveAnnouncer
    ) {
  }

  displayedColumns: string[] = [
    'school_address',
    'order_date',
    'sku',
    'item_name',
    'unit_price',
    'quantity',
    'total_price'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();

    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    this.reportService.getSchools(this.loggedInUser.CompanyID, this.loggedInUser.isAdmin).subscribe((res: any) => {
      if (res)
        {
          this.schools = res;
          this.selectedSchool = res[0].Id;
        }
    });
  }

  searchOrders()
  {
    var obj = {
      school_id: this.selectedSchool || 0,
      from_date: this.from_date != '' ? this.from_date.toLocaleDateString() : '',
      to_date: this.to_date != '' ? this.to_date.toLocaleDateString() : ''
    }
    this.loading = true;
    this.reportService.getUniformItemSalesDateWise(obj).subscribe((res: any) => {
      if (res){
        this.loading = false;
        ELEMENT_DATA = res;
          
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else
      {
        ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      }
    });
  }

  exportData(){
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onChangeSchool(value){
    this.selectedSchool = value;
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
  school_address: string;
  order_date: string;
  sku: string;
  item_name: string;
  unit_price: string;
  quantity: string;
  total_price: string;
}
let ELEMENT_DATA: PeriodicElement[] = [];
