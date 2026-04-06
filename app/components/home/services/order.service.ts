import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { AppSettings } from '../../shared/helper/appsettings';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  loggedInUser: any;
  bearerToken: string;

  constructor(private http: BaseHttpService,
    private authService: AuthService
  ) {
    this.loggedInUser = this.authService.getLoggedInUser();
      if (this.loggedInUser.length > 0)
      {
        this.bearerToken = this.loggedInUser[0].token;
      }
      else
      {
        this.bearerToken = this.loggedInUser.token;
      }
   }

  saveOrder(model: any) {
    return this.http.postData(AppSettings.order + '/SaveOrder', model, this.bearerToken);
  }

  saveExchnageOrder(model: any) {
    return this.http.postData(AppSettings.order + '/SaveExchangeOrder', model, this.bearerToken);
  }

  saveSecondExchangeOrder(model: any) {
    return this.http.postData(AppSettings.order + '/SaveSecondExchangeOrder', model, this.bearerToken);
  }

  updateOrder(model: any) {
    return this.http.postData(AppSettings.order + '/UpdateOrder', model, this.bearerToken);
  }

  getOrderDetails(order_id: any) {
    return this.http.getData(AppSettings.order + '/GetOrderDetails?order_id=' + order_id, this.bearerToken);
  }

  viewOrderDetails(order_id: any) {
    return this.http.getData(AppSettings.order + '/ViewOrderDetails?order_id=' + order_id, this.bearerToken);
  }

  viewExchangeOrderDetails(order_id: any) {
    return this.http.getData(AppSettings.order + '/ViewExchangeOrderDetails?order_id=' + order_id, this.bearerToken);
  }

  viewSecondExchangeOrderDetails(order_id: any) {
    return this.http.getData(AppSettings.order + '/ViewSecondExchangeOrderDetails?order_id=' + order_id, this.bearerToken);
  }

  getExchangeOrderDetails(order_id: any) {
    return this.http.getData(AppSettings.order + '/GetExchangeOrderDetails?order_id=' + order_id, this.bearerToken);
  }

  getRefundOrderDetails(order_id: any) {
    return this.http.getData(AppSettings.order + '/GetRefundOrderDetails?order_id=' + order_id, this.bearerToken);
  }

  getOrderLogs(order_id: any) {
    return this.http.getData(AppSettings.order + '/GetOrderLogs?order_id=' + order_id, this.bearerToken);
  }
  
  getOrderApproverHistory(order_id: any) {
    return this.http.getData(AppSettings.order + '/GetOrderApproverHistory?order_id=' + order_id, this.bearerToken);
  }

  getOrderStatus() {
    return this.http.getData(AppSettings.order + '/GetOrderStatus', this.bearerToken);
  }
  
  getBUList(username) {
    return this.http.getData(AppSettings.order + '/GetBUList?Username=' + username, this.bearerToken);
  }

  getSchoolOrders(model: any) {
    return this.http.postData(AppSettings.order + '/GetSchoolOrders', model, this.bearerToken);
  }

  getFamilyOrders(family_no) {
    return this.http.getData(AppSettings.order + '/GetFamilyOrders?family_no=' + family_no, this.bearerToken);
  }

  GetOrderItemsCart(orderId) {
    return this.http.getData(AppSettings.order + '/GetOrderItemsCart?orderId=' + orderId, this.bearerToken);
  }

  checkOrderStatus(orderId) {
    return this.http.getData(AppSettings.order + '/CheckOrderStatus?orderId=' + orderId, this.bearerToken); 
  }

  getPaymentGWAccessToken(school_id) {
    return this.http.getData(AppSettings.order + '/GetPaymentGWAccessToken?school_id=' + school_id, this.bearerToken); 
  }

  createPaymentGWOrder(obj) {
    return this.http.postData(AppSettings.order + '/CreatePaymentGWOrder', obj, this.bearerToken); 
  }

  saveOrderRefund(model: any) {
    return this.http.postData(AppSettings.order + '/SaveOrderRefund', model, this.bearerToken);
  }

  getOrderRefund(order_id: any) {
    return this.http.getData(AppSettings.order + '/GetOrderRefund?order_id=' + order_id, this.bearerToken);
  }

  getExchangeOrder(order_id: any) {
    return this.http.getData(AppSettings.order + '/GetExchangeOrder?order_id=' + order_id, this.bearerToken);
  }

  updateExchangeOrder(model: any) {
    return this.http.postData(AppSettings.order + '/UpdateExchangeOrder', model, this.bearerToken);
  }

  getApprovedExchangeOrder(order_id: any) {
    return this.http.getData(AppSettings.order + '/GetApprovedExchangeOrder?order_id=' + order_id, this.bearerToken);
  }
  
  approveRejectOrder(model: any) {
    return this.http.postData(AppSettings.order + '/ApproveRejectOrder', model, this.bearerToken);
  }
  
  removeOrder(model: any) {
    return this.http.postData(AppSettings.order + '/RemoveOrder', model, this.bearerToken);
  }
}
