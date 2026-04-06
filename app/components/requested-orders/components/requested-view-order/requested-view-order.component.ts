import { Component, OnDestroy, OnInit, Input, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { OrderService } from '../../../home/services/order.service';
import { AppSettings } from '../../../shared/helper/appsettings';
import { ToastMessages } from '../../../shared/models/toast-messages';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../auth/services/auth.service';
// import { RefundOrderComponent } from '../refund-order/refund-order.component';
// import { ExchangeOrderRequestComponent } from '../exchange-order-request/exchange-order-request.component';
// import { ExchangeOrderComponent } from '../exchange-order/exchange-order.component';
import { Console } from 'console';
import { Router } from '@angular/router';
// import { PrintExchangeOrderComponent } from '../../../home/dialog/print-exchange-order/print-exchange-order.component';
// import { PrintRefundOrderComponent } from '../../../home/dialog/print-refund-order/print-refund-order.component';
// import { SecondExchangeOrderRequestComponent } from '../second-exchange-order-request/second-exchange-order-request.component';

@Component({
  selector: 'requested-view-order',
  templateUrl: './requested-view-order.component.html',
  styleUrl: './requested-view-order.component.css',
})
export class RequestedViewOrderComponent implements OnInit {
  orderStatus: any[] = [];
  selectedStatus: string;
  payment: any[] = [];
  selectedPayment: string;
  currOrder: any;
  order_id: any = '';
  order: any = {};
  refund_order: any = {};
  orderItems: any[] = [];
  refundOrderItems: any[] = [];
  baseAssetUrl: any;
  orderLogs: any[] = [];
  paymentReferenceNumber = '';
  loggedInUser: User;
  loading = false;
  parent_online_order: any;
  ordStatus: any = '';
  refundOrd: any = {};

  exchangeOrd: any = {};
  exchangeFromItems: any[] = [];
  exchangeToItems: any[] = [];
  reAddStock: boolean = true;
  exchangeFromItemsTotal = 0.0;
  exchangeToItemsTotal = 0.0;
  exchangeOrderTotalValue = 0;
  selectedExchangePayment: string = '';
  paymentExchangeReferenceNumber = '';
  approved_Exchange: any[] = [];

  approverHistory: any[] = [];

  approver: any;
  approverComment: string = '';

  subTotal: any = 0.0;
  totalTax: any = 0.0;
  totalOrder: any = 0.0;

  constructor(
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order_id = data.order_id;
    this.currOrder = data;
    this.baseAssetUrl = AppSettings.assetUrl;
  }

  ngOnInit() {
    this.loading = true;
    // console.log('currOrder', this.currOrder);
    this.getPayment();
    this.loggedInUser = this.authService.getLoggedInUser();
    this.orderService.getOrderStatus().subscribe((res: any) => {
      // if (res) {
      //   this.orderStatus = res.filter(
      //     (x) =>
      //       x.status != 'wc-exchange-request' &&
      //       x.status != 'wc-exchange-approve' &&
      //       x.status != 'wc-refund-request' &&
      //       x.status != 'wc-refunded'
      //   );
      // }
    });
    this.getOrder();
  }

  getOrder() {
    this.loading = true;
    // console.log(this.order_id);
    this.orderService.viewOrderDetails(this.order_id).subscribe((res: any) => {
      if (res && res.length > 0) {
        // console.log(res);
        this.order = res[0];
        this.paymentReferenceNumber = this.order.payment_reference;

        this.orderItems = res;
        this.refundOrderItems = res.filter((x) => x.exchange_quantity != '0');

        this.refund_order = this.refundOrderItems[0];

        if (this.order.status == 'wc-ng-complete') {
          this.selectedStatus = 'wc-payment-completed';
          this.ordStatus = 'wc-payment-completed';
        } else {
          this.selectedStatus = this.order.status;
          this.ordStatus = this.order.status;
        }

        if (this.refundOrderItems.length == 0) {
          this.ordStatus = 'wc-completed';
        }

        this.selectedPayment = this.order.payment_method;
        this.parent_online_order = this.order.parent_online_order;
        this.getOrderLogs();
        this.getApproverHistory();

        if (
          this.order.is_refund_request == 1 ||
          this.order.is_refund_approve == 1
        ) {
          this.orderService
            .getOrderRefund(this.order_id)
            .subscribe((res: any) => {
              if (res) {
                this.refundOrd = res;
                if (this.order.is_refund_approve) {
                  this.reAddStock = this.refundOrd.ReAddStock;
                }
              }
            });
        }

        this.orderService
          .getApprovedExchangeOrder(this.order_id)
          .subscribe((res: any) => {
            if (res && res.length > 0) {
              this.loading = false;
              // console.log(res);
              this.approved_Exchange = res;
            } else {
              this.loading = false;
            }
          });
      } else {
        this.loading = false;
      }
    });
  }

  getToItemIndex(itemIndex, item) {
    let itemIndex1 = this.approved_Exchange[
      itemIndex
    ].approved_exchange.findIndex(
      (x) =>
        x.new_exchange_order_id == item.new_exchange_order_id && x.type == 'To'
    );
    return itemIndex1;
  }

  getFromItemIndex(itemIndex, item) {
    let itemIndex1 = this.approved_Exchange[
      itemIndex
    ].approved_exchange.findIndex(
      (x) =>
        x.new_exchange_order_id == item.new_exchange_order_id &&
        x.type == 'From'
    );
    return itemIndex1;
  }

  convertStringToFloat(str) {
    return parseFloat(str);
  }

  convertStringToInt(str) {
    return parseInt(str);
  }

  getOrderLogs() {
    this.orderService.getOrderLogs(this.order_id).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.orderLogs = res;
      }
    });
  }

  updateOrder() {
    if (this.selectedStatus == this.ordStatus) {
      Swal.fire({
        title: 'please select different Status',
        text: '',
        icon: 'error',
      });
      return;
    }

    if (this.selectedStatus == 'wc-failed') {
      Swal.fire({
        title: 'Order cannot be updated to Failed!',
        text: '',
        icon: 'error',
      });
      return;
    }

    if (this.selectedStatus == 'wc-pending') {
      if (
        this.ordStatus == 'wc-payment-completed' ||
        this.ordStatus == 'wc-delivered'
      ) {
        Swal.fire({
          title: 'Completed or Closed order cannot be Reverted!',
          text: '',
          icon: 'error',
        });
        return;
      }
    }

    if (this.selectedStatus == 'wc-payment-completed') {
      if (this.ordStatus == 'wc-delivered') {
        Swal.fire({
          title: 'Closed order cannot be Reverted!',
          text: '',
          icon: 'error',
        });
        return;
      }
    }

    if (this.selectedStatus == 'wc-cancelled') {
      if (
        this.ordStatus == 'wc-payment-completed' ||
        this.ordStatus == 'wc-delivered'
      ) {
        Swal.fire({
          title: 'Completed or Closed order cannot be Cancelled!',
          text: '',
          icon: 'error',
        });
        return;
      }
    }

    if (this.selectedPayment == '') {
      Swal.fire({
        title: ToastMessages.SelectPaymentMethod,
        text: '',
        icon: 'error',
      });
      return;
    }

    if (
      this.selectedPayment == 'PAID BY CARD' &&
      this.paymentReferenceNumber == ''
    ) {
      Swal.fire({
        title: ToastMessages.EnterCardReference,
        text: '',
        icon: 'error',
      });
      return;
    }

    if (this.ordStatus == 'wc-pending') {
      if (
        this.selectedStatus == 'wc-with-courier' ||
        this.selectedStatus == 'wc-delivered'
      ) {
        Swal.fire({
          title: 'Please complete order before closing order!',
          text: '',
          icon: 'error',
        });
        return;
      }
    }

    if (this.selectedPayment == 'PAID BY CASH') {
      this.paymentReferenceNumber = '';
    }

    if (this.selectedStatus == 'wc-payment-completed') {
      this.parent_online_order = false;
    }

    var order = {
      order_id: this.order_id,
      status: this.selectedStatus,
      payment_method: this.selectedPayment,
      updated_by: this.loggedInUser.ID.toString(),
      card_reference: this.paymentReferenceNumber,
      parent_online_order: this.parent_online_order,
    };

    var _this = this;
    this.loading = true;

    this.orderService.updateOrder(order).subscribe((res: any) => {
      this.loading = false;
      if (res && res.status == 'S') {
        Swal.fire({
          title: 'Order#' + res.order_id + ' updated successfully!',
          text: '',
          icon: 'success',
        }).then(function () {
          _this.dialogRef.close();
        });
      } else {
        Swal.fire({
          title: res.message,
          text: '',
          icon: 'error',
        });
      }
    });
  }

  printDialog() {
   
  }

  printExchangeDialog(order_id) {
    // const dialogRef = this.dialog.open(PrintExchangeOrderComponent, {
    //   height: 'auto',
    //   width: '100%',
    //   minWidth: '90%',
    //   data: order_id,
    //   disableClose: true,
    // });
    // dialogRef.afterClosed().subscribe((result) => {});
  }

  printRefundDialog() {
    // const dialogRef = this.dialog.open(PrintRefundOrderComponent, {
    //   height: 'auto',
    //   width: '100%',
    //   minWidth: '90%',
    //   data: this.order_id,
    //   disableClose: true,
    // });
    // dialogRef.afterClosed().subscribe((result) => {});
  }

  onChangeStatus(value) {
    this.selectedStatus = value;
  }

  onChangePayment(value) {
    this.selectedPayment = value;
  }

  onChangePaymentExchange(value) {
    this.selectedExchangePayment = value;
  }

  getPayment() {
    const result: any[] = [
      {
        ID: 1,
        PaymentName: 'PAID BY CASH',
      },
      {
        ID: 2,
        PaymentName: 'PAID BY CARD',
      },
    ];
    this.payment = result;
  }

  updateRefund(status) {
    var obj = {
      order_id: this.order_id,
      refund_reason: '',
      status: status == 'approve' ? 'wc-refunded' : 'wc-refund-cancel',
      created_by: this.loggedInUser.ID.toString(),
      reAddStock: this.reAddStock,
    };

    this.loading = true;

    var _this = this;

    this.orderService.saveOrderRefund(obj).subscribe((res: any) => {
      this.loading = false;
      if (res && res > 0) {
        Swal.fire({
          title:
            'Order#' + this.order_id + ' refund ' + status + ' successfully!',
          text: '',
          icon: 'success',
        }).then(function () {
          _this.dialogRef.close();
        });
      }
    });
  }

  updateExchange(status, value) {
    
  }

  changePaymentExchange(value, exchange, itemIndex) {
    let items: any[] = this.approved_Exchange[
      itemIndex
    ].approved_exchange.filter(
      (x) => x.new_exchange_order_id == exchange.new_exchange_order_id
    );

    items.forEach((item) => {
      item.payment_mode = value;
    });
  }

  changeAddStock(values: any, exchange, itemIndex): void {
    let items: any[] = this.approved_Exchange[
      itemIndex
    ].approved_exchange.filter(
      (x) => x.new_exchange_order_id == exchange.new_exchange_order_id
    );

    items.forEach((item) => {
      item.reAdd_stock = values.currentTarget.checked;
    });
  }

  onSearchChange(event, exchange, itemIndex) {
    let items: any[] = this.approved_Exchange[
      itemIndex
    ].approved_exchange.filter(
      (x) => x.new_exchange_order_id == exchange.new_exchange_order_id
    );

    items.forEach((item) => {
      item.reference_id = event.target.value;
    });
  }

  isShowExchange(exchange, itemIndex) {
    let isShow = false;

    let items: any[] = this.approved_Exchange[
      itemIndex
    ].approved_exchange.filter(
      (x) =>
        x.new_exchange_order_id == exchange.new_exchange_order_id &&
        x.type == 'To'
    );

    items.forEach((item) => {
      if (item.exchange_quantity > 0) {
        isShow = true;
      }
    });

    return isShow;
  }

  update2ndExchange(status, exchange: any) {
   
  }

  refundOrder() {
    // const dialogRef = this.dialog.open(RefundOrderComponent, {
    //   height: 'auto',
    //   width: '100%',
    //   minWidth: '90%',
    //   data: this.order_id,
    //   disableClose: true,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result && result > 0) {
    //     this.ordStatus = 'wc-refund-request';
    //     this.selectedStatus = 'wc-refund-request';
    //     var _this = this;
    //     this.orderService
    //       .getOrderRefund(this.order_id)
    //       .subscribe((res: any) => {
    //         if (res) {
    //           _this.dialogRef.close();
    //         }
    //       });
    //   }
    // });
  }

  exchangeOrder() {
    // const dialogRef = this.dialog.open(ExchangeOrderRequestComponent, {
    //   height: 'auto',
    //   width: '100%',
    //   minWidth: '90%',
    //   data: this.order_id,
    //   disableClose: true,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.dialogRef.close();
    //   }
    // });
  }

  SecondExchangeOrder(order_id) {
    var data = {
      order_id: this.order_id,
      old_sale_order_id: order_id,
    };
    // const dialogRef = this.dialog.open(SecondExchangeOrderRequestComponent, {
    //   height: 'auto',
    //   width: '100%',
    //   minWidth: '90%',
    //   data: data,
    //   disableClose: true,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.dialogRef.close();
    //   }
    // });
  }

  viewExchangeOrder() {
    // const dialogRef = this.dialog.open(ExchangeOrderComponent, {
    //   height: 'auto',
    //   width: '100%',
    //   minWidth: '90%',
    //   data: this.order_id,
    //   disableClose: true,
    // });
    // dialogRef.afterClosed().subscribe((result) => {});
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateRequest(status) {
    this.loading = true;
    var _this = this;

    if (status == 'rejected' && this.approverComment.trim().length <= 0) {
      Swal.fire({
        title: 'Please enter comment in case of rejection!',
        text: '',
        icon: 'error',
      });
      this.loading = false;
      return;
    }
    
    this.saveOrder();
    // this.loading = false;
    // return;

    var obj = {
      order_id: this.order_id.toString(),
      approver_action: status.toString(),
      actioned_by: this.loggedInUser.ID.toString(),
      approver_comments: this.approverComment.toString(),
      requester_company_id: this.currOrder.user_company_id.toString(),
      requester_id: this.currOrder.user_id.toString(),
    };
    // console.log('ApproveReject Action: ', obj);
    this.orderService.approveRejectOrder(obj).subscribe((res: any) => {
      if (res) {
        // console.log(res);
        Swal.fire({
          title: 'Order#' + this.order_id + ' has been ' + status + '!',
          text: '',
          icon: 'success',
        }).then(function () {
          _this.dialogRef.close();
        });
      }
    });
    // console.log('asdfoaidjs');

    this.loading = false;
  }

  changeQuantity(item) {
    // console.log(item);
    var actual_qty = item.max_quantity;
    var exchange_qty = parseInt(item.quantity);

    if (exchange_qty < 0) {
      item.quantity = 0;
    }

    this.calculateItemTotal(item);
  }
  calculateItemTotal(item) {
    this.subTotal = 0;
    this.totalTax = 0;
    this.totalOrder = 0;
    let subTots = 0;
    this.order.tax_total = 0;
    this.order.net_total = 0;

    this.orderItems.forEach((items) => {
      this.order.vat = Number(items.unit_vat) * Number(items.quantity);
      this.order.tax_total += Number(items.unit_vat) * Number(items.quantity);
      this.order.net_total +=
        Number(items.unit_price) * Number(items.quantity) +
        Number(items.unit_vat) * Number(items.quantity);
      subTots += Number(items.unit_price) * Number(items.quantity);
    });
    // console.log(subTots);
  }

  getApproverHistory() {
    this.orderService
      .getOrderApproverHistory(this.order_id)
      .subscribe((res: any) => {
        if (res && res.length > 0) {
          // console.log('getApproverHistory', res);
          this.approverHistory = res;
        }
      });
  }
  editOrder(element) {
    // console.log(element);
    this.dialogRef.close();
    this.router.navigate(['/home'], { state: { orderData: element } });
  }

  saveOrder() {
    var order_items: any = [];
    let order_id = this.order_id;
    this.orderItems.forEach((item) => {
      let is_removed = false;

      var obj = {
        Id: item.order_item_id,
        order_id: order_id,
        item_name: item.item_name,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        vat: (item.unit_vat * item.quantity).toFixed(2),
        amount_excl_vat: (item.unit_price * item.quantity).toFixed(2),
        amount_incl_vat: ((Number(item.unit_price) + Number(item.unit_vat)) * item.quantity).toFixed(2),
        created_by: item.user_id.toString(),
        updated_by: this.loggedInUser.ID.toString(),
        is_removed: is_removed,
      };
      order_items.push(obj);
    });
    var order = {
      Id: 0,
      order_id: order_id,
      user_id: this.orderItems[0].user_id.toString(),
      company_id: this.orderItems[0].company_id,
      status: 'approval',
      order_year: 0,
      net_total: (this.order.net_total - this.order.tax_total).toString(),
      //net_total: this.order.net_total.toString(),
      tax_total: this.order.tax_total.toString(),
      total_sales: this.order.net_total.toString(),
      order_notes: this.orderItems[0].order_notes,
      created_by: this.orderItems[0].user_id.toString(),
      updated_by: this.loggedInUser.ID.toString(),
      order_items: order_items,
      is_approve_reject: true,
    };

    // console.log('This is Orders', order);
    // this.loading = true;
    // return;
    var _this = this;

    this.orderService.saveOrder(order).subscribe((res: any) => {
      var result = res;
      this.loading = false;
      if (result && result.order_id > 0) {
        // console.log('Order updated successfully!')
      }
    });
  }
}
