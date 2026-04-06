import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
// import { Deposit } from 'src/app/shared/models/deposit';
// import { WithDrawl } from 'src/app/shared/models/withdrawl';
// import { CanteenOrderItem } from 'src/app/shared/models/canteen-order-item.model';
// import { OrderHistory } from 'src/app/shared/models/order-history.model';

@Component({
  selector: 'app-invoice-template',
  templateUrl: './invoice-template.component.html',
  styleUrls: ['./invoice-template.component.scss']
})
export class InvoiceTemplateComponent implements OnInit {

  ngOnInit(): void {
  }

  // transaction: any;
  // type: any;
  // //order: OrderHistory;
  // bType:any;
  // discount: number = 0;
  // DiscountAmount: number=0;
  // tax: number = 0;
  // orderAmount: number = 0;
  // constructor(private cdr: ChangeDetectorRef) { }

  // ngOnInit(): void {
  // }
  // params: any;

  // agInit(params: any): void {
  //   this.params = params;
  //   this.type = this.params.type;
  //   if(params.data.paymet_mode==0){
  //     this.bType="Deposit"
  //   }
  //   if(params.data.paymet_mode==1){
  //     this.bType="Cash"
  //   }
  //   if(params.data.paymet_mode==2){
  //     this.bType="Card"
  //   }
  // }

  // afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  // }

  // invoiceName: string;
  // printInvoice(params) {
    
  //   if (this.type !== 'order' && this.type !== 'cancelOrder') {
  //     this.transaction = params.data;
  //     this.invoiceName = 'CREDIT NOTE';
  //   }
  //   else {
  //     if (this.type === 'cancelOrder') {
  //       this.invoiceName = 'TAX CREDIT NOTE';
  //     }
  //     else {
  //       this.invoiceName = 'TAX INVOICE';
  //     }
  //     this.order = params.data;
  //     this.tax = this.order.tax_amount;
  //     this.order.order_amount = this.order.sales_amount + this.tax;
  //     if (this.order.discount_percent > 0) {
  //       let discountPercent = this.order.discount_percent;
  //       this.discount = parseFloat((this.order.order_amount * (discountPercent / 100)).toFixed(2));
  //       this.order.discount_amount = this.discount;
  //       this.order.discount_percent = discountPercent;
  //       this.order.order_amount = this.order.order_amount - this.discount;
  //       this.DiscountAmount=this.order.order_amount;
  //     } else{
  //       this.DiscountAmount=this.order.sales_amount;
  //     }
      
  //   }
  //   this.cdr.detectChanges();
  //   setTimeout(() => {
  //     let printContents, popupWin;
  //     printContents = document.getElementById('invoice').innerHTML;
  //     popupWin = window.open('', '_blank', 'top=50,left=300,height=700,width=1000');
  //     popupWin.document.open();
  //     popupWin.document.write(`
  //       <html>
  //         <head>
  //           <title>Print tab</title>
  //           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  //         <style>
  //         .flex{
  //           display:flex;
  //         }
      
  //         </style>
  //         </head>
  //     <body onload="window.print();window.close()">${printContents}</body>
  //       </html>`
  //     );
  //     this.transaction = undefined;
  //     popupWin.document.close();
  //   }, 600);

  // }

  // parseFloat(value) {
  //   return parseFloat(value);
  // }

}
