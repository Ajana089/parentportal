import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  Inject,
  ViewChild,
} from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TermsConditionsAddComponent } from '../terms-conditions-add/terms-conditions-add.component';
import { MasterSetupService } from '../../../services/master-setup.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { untilDestroyed } from '../../../../shared/decorators/take-until-destroy.decorator';


@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.css'
})
export class TermsConditionsComponent {
  displayedColumns: string[] = [
     'BusinessUnit',
     'Division',
     'Organization',
     'TermCode',
     'Category',
     'Description',
     'PrintPosition',
     'AppLogic',
     'Enforcement',
     'actions',
   ];
 
   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
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
     this.service.GetAllTermsAndConditions().subscribe((res: any) => {
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
 
   editOrganizationID(data: any) {
     let dialogRef = this.dialog.open(DialogComponent, {
       minWidth: '100vw',
       minHeight: '100vh',
       data: {
         component: TermsConditionsAddComponent,
         title: 'Update Terms and Conditions',
         id: data.ID,
       },
     });
     dialogRef.afterClosed().subscribe((result) => {
       if (result) {
         this.getData();
       }
     });
   }
 
   openAddDialog() {
     this.openDialog();
   }
   openDialog(): void {
     let dialogRef = this.dialog.open(DialogComponent, {
       minWidth: '100vw',
       minHeight: '100vh',
       data: {
         component: TermsConditionsAddComponent,
         title: 'Add Terms and Conditions ',
       },
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
 