import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../services/dashboard.service';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-ticket-queue',
  templateUrl: './ticket-queue.component.html',
  styleUrl: './ticket-queue.component.css'
})
export class TicketQueueComponent implements OnInit {

  school_id: any = '';
    inputData: any = {};
    selectedCounter: any;
    loggedInUser: User;
    family_no: any = '';
    queues: any[] = [];
    loading = false;
    printModel: any;
    date = new Date();
  
    constructor(
      public dialogRef: MatDialogRef<any>,
      public dialog: MatDialog,
      private dashboardService: DashboardService,
      private fb: FormBuilder,
       private authService: AuthService,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.inputData = data;
        this.school_id = data.SchoolId;
        this.family_no = data.FamilNo;
    }

    ngOnInit() { 

    this.loggedInUser = this.authService.getLoggedInUser();

     this.dashboardService.getTicketQueues(this.school_id).subscribe((res: any) => {
        this.queues = res;
      });

  }
  
    closeDialog() {
       this.dialogRef.close();
     }

     selectItem(counter: any) {
      this.selectedCounter = counter;
    }
  
     printTicket() {
      if (this.selectedCounter != null) {

        this.loading = true;
  
        var request = {
            SchoolId: this.inputData.SchoolId,
            FamilyNo: this.inputData.FamilyNo,
            IsScheduleAppointment: this.inputData.IsAppointment,
            QueueId: this.selectedCounter.Id,
            QueueType: this.selectedCounter.QueueType,
            AppointmentDate: this.inputData.AppointmentDate
          };
  
          this.dashboardService.saveQueueTicket(request).subscribe((res: any) => {
            var result = res;
            this.printModel = res;

            // this.LogoImage = this.printModel.LogoImage;
            // this.School_Address = this.printModel.School_Address;
            // this.TicketNo = this.printModel.TicketNo;
            // this.WaitingCustomers = this.printModel.WaitingCustomers;
            // this.AppointmentDate = this.printModel.AppointmentDate;

            if (result && result.ID > 0) {

              var _this = this;

              setTimeout(function(){
                 _this.loading = false;
                 _this.print();                  
                  _this.dialogRef.close(1);
              }, 500);
              
            } else {

              this.loading = false;
              Swal.fire({
                  title: 'There is some Error!',
                  text: '',
                  icon: 'error',
                });

            }
        });
      }
    }
    
    print() {

    let printContents: any = '';
    let popupWin;   
    printContents = document.getElementById('invoice')?.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=700,width=1000');
    popupWin.document.open();
     
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          /* --------- BASIC RESET (thermal-safe) --------- */
            * { box-sizing: border-box; }
            html, body { margin: 0; padding: 0; }
            body {
              /* Use printer-friendly built-in fonts (avoid webfonts) */
              font-family: Arial, Helvetica, sans-serif;
              color: #000;
              background: #fff;
            }

            /* --------- RECEIPT LAYOUT --------- */
            .receipt {
              /* Default for 80mm printers. Change to 58mm if needed. */
              width: 80mm;
              margin: 0 auto;
              padding: 6mm 4mm;
            }

            .center { text-align: center; }
            .bold { font-weight: 700; }
            .small { font-size: 13px; }
            .normal { font-size: 15px; }
            .title { font-size: 18px; font-weight: 700; letter-spacing: 0.5px; }
            .section { margin-top: 6px; }

            /* Solid line (thermal safe) */
            .hr {
              border-top: 2px solid #000;
              margin: 6px 0;
              height: 0;
            }

            /* Dashed line using text (more reliable than CSS dashes on some drivers) */
            .dash {
              border-top: 1px dashed #000 !important;
            margin: 10px 0
            }

            .row {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 6px;
              font-size: 12px;
              margin: 2px 0;
            }
            .row > div { min-width: 0; }
            .right { text-align: right; }
            .center { text-align: center; }

            .token {
              font-size: 44px;
              font-weight: 800;
              letter-spacing: 0;
              margin: 6px 0 4px;
            }

            /* --------- PRINT SETTINGS --------- */
            @media print {
              /* Exact paper sizing for thermal */
              @page {
                size: 80mm auto;   /* change to 58mm auto for 58mm paper */
                margin: 0;
              }

              body { margin: 0; padding: 0; }

              /* Avoid anything that triggers rasterization */
              * {
                -webkit-font-smoothing: none !important;
                text-rendering: geometricPrecision !important;
              }

              /* Keep it clean */
              .receipt { margin: 0; }

              .dash {
                margin: 10px 0 !important;
              }
              .hr {
                margin: 10px 0;
              }
              .vertical-margin-10 {
                margin: 10px 0;
              }
              .bottom-space {
                height: 20px !important;
              }
              .brand-logo {
                width: 30px !important;
                margin-bottom: 10px;
              }
            }
              

            /* Optional: on-screen preview scaling */
            @media screen {
              body { padding: 12px; background: #f4f4f4; }
              .receipt { background: #fff; box-shadow: 0 6px 18px rgba(0,0,0,.12); }
            }
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html> 
      `);
// <body onload="window.print();window.close()">${printContents}</body>
      // font-family: Roboto, sans-serif !important;
        // box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15) !important;
    popupWin.document.close();

  }

  private getPrintOrderStyles(): string {
    return `
      body{
      font-family: Arial, monospace !important;
      padding: 0rem !important;
      }
      .content {
        padding: 5% 10%;
        font-size: 14px;
      }
      .receipt {
        width: 280px !important;
        background: #fff !important;
        padding: 20px 15px !important;
        text-align: center !important;
        border-radius: 6px !important;
      }

    .logo img {
      width: 70px !important;
      margin-bottom: 10px !important;
    }


    h1 {
      font-size: 18px !important;
      margin: 0 !important;
      font-weight: 700 !important;
    }

    .tagline {
      font-size: 12px !important;
      color: #666 !important;
      margin-bottom: 10px !important;
    }


    .divider {
      height: 1px !important;
      background: #000 !important;
      margin: 10px 0 !important;
    }

    .divider.dashed {
      border-top: 1px solid #000 !important;
      background: none !important;
    }

    h2 {
      font-size: 16px !important;
      margin: 10px 0 !important;
      letter-spacing: 1px !important;
    }

    .label {
      font-size: 12px !important;
      color: #555 !important;
    }

    .token {
      font-size: 52px !important;
      font-weight: bold !important;
      margin: 10px 0 !important;
    }

    .waiting {
      font-size: 13px !important;
      margin-bottom: 10px !important;
    }

    .waiting1 {
      font-size: 11px !important;
      margin-bottom: 10px !important;
    }

    .info {
      font-size: 12px !important;
      margin: 2px 0 !important;
    }

    .branch {
      font-size: 11px !important;
      font-weight: bold !important;
      margin-top: 6px !important;
    }

    @media print {
      body {
        background: none !important;
        height: auto !important;
      }

      .receipt {
        box-shadow: none !important;
        border-radius: 0 !important;
        width: 260px !important;
      }
    }

          `;
  }
  
    
  

}
