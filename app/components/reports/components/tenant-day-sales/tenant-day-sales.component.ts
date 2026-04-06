import { Component, OnDestroy, OnInit, Input, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Console } from 'console';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AuthService } from '../../../auth/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ReportsService } from '../../services/reports.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-tenant-day-sales',
  templateUrl: './tenant-day-sales.component.html',
  styleUrl: './tenant-day-sales.component.css'
})
export class TenantDaySalesComponent {

  displayedColumns: string[] = [
    'POS_ID',
    'Tender',
    'Peak_Hour',
    'Total_Sales_Amount',
    'Total_Transactions',
    'Total_Items_Sold',
    'Total_Discount',
    'Total_Refunds_Amount'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  loading = false;
  inputObj: any = {};
  sale_date: any = '';

  constructor(
       public dialogRef: MatDialogRef<any>,
       public dialog: MatDialog,
        private reportService: ReportsService,
       private fb: FormBuilder,
       private authService: AuthService,
       private router: Router,
       private _liveAnnouncer: LiveAnnouncer,
       @Inject(MAT_DIALOG_DATA) public data: any
     ) {
   
      this.inputObj = data;

      this.sale_date = new Date(this.inputObj.selectedYear, this.inputObj.selectedMonth, this.inputObj.day);

      this.getData();
     }

  closeDialog() {
     this.dialogRef.close();
   }

   getData() {
   
       var obj = {
         Store_ID: this.inputObj.Store_ID,
         Day: this.inputObj.day,
         Month: this.inputObj.selectedMonth,
         Year: this.inputObj.selectedYear,
       }
   
    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    this.loading = true;
        this.reportService.getTenantDailySalesDetails(obj).subscribe((res: any) => {
          if (res) {
            this.loading = false;
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

}

export interface PeriodicElement {
}
let ELEMENT_DATA: PeriodicElement[] = [];
