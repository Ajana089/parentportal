import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-counter-list',
  templateUrl: './counter-list.component.html',
  styleUrl: './counter-list.component.css'
})
export class CounterListComponent {

  counters: any = [];
  inputData: any = {};
  selectedCounter: any;

  constructor(
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.inputData = data;
      this.counters = data.counters;
  }

  closeDialog() {
     this.dialogRef.close();
   }

   transfer() {
    if (this.selectedCounter != null) {

      var request = {
          SchoolID: this.inputData.SchoolID,
          UserId: this.selectedCounter.Id,
          WFDtl_ID: this.inputData.WFDtl_ID
        };

        this.dashboardService.transferCounterTicket(request).subscribe((res: any) => {
          var result = res;
          if (result && result > 0) {
            this.dialogRef.close();
          }
      });
    }
  }

   selectItem(counter: any) {

    this.selectedCounter = counter;
    

   }

}
