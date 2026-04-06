import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { AppSettings } from '../../shared/helper/appsettings';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

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

  getSchools(school_id: any, isAdmin: any) {
    return this.http.getData(AppSettings.report + '/GetSchools?school_id=' + school_id + '&isAdmin=' + isAdmin, this.bearerToken);
  }

  getUniformItemSalesDateWise(model: any) {
    return this.http.postData(AppSettings.report + '/GetUniformItemSalesDateWise', model, this.bearerToken);
  }

  getUniformItemWiseSales(model: any) {
    return this.http.postData(AppSettings.report + '/GetUniformItemWiseSales', model, this.bearerToken);
  }

  getOrderItemWiseSales(model: any) {
    return this.http.postData(AppSettings.report + '/GetOrderItemWiseSales', model, this.bearerToken);
  }

  getUniformOrdersSummarySales(model: any) {
    return this.http.postData(AppSettings.report + '/GetUniformOrdersSummarySales', model, this.bearerToken);
  }

  getOrdersSummary(model: any) {
    return this.http.postData(AppSettings.report + '/GetOrdersSummary', model, this.bearerToken);
  }

  getUniformOrdersDetail(model: any) {
    return this.http.postData(AppSettings.report + '/GetUniformOrdersDetail', model, this.bearerToken);
  }

  getOrdersDetail(model: any) {
    return this.http.postData(AppSettings.report + '/GetOrdersDetail', model, this.bearerToken);
  }

  getUniformOrdersRefund(model: any) {
    return this.http.postData(AppSettings.report + '/GetUniformOrdersRefund', model, this.bearerToken);
  }

  getUniformOrdersExchange(model: any) {
    return this.http.postData(AppSettings.report + '/GetUniformOrdersExchange', model, this.bearerToken);
  }


  getOldUniformItemSalesDateWise(model: any) {
    return this.http.postData(AppSettings.report + '/GetOldUniformItemSalesDateWise', model, this.bearerToken);
  }

  getOldUniformItemWiseSales(model: any) {
    return this.http.postData(AppSettings.report + '/GetOldUniformItemWiseSales', model, this.bearerToken);
  }

  getOldUniformOrdersSummarySales(model: any) {
    return this.http.postData(AppSettings.report + '/GetOldUniformOrdersSummarySales', model, this.bearerToken);
  }

  getOldUniformOrdersDetail(model: any) {
    return this.http.postData(AppSettings.report + '/GetOldUniformOrdersDetail', model, this.bearerToken);
  }

  getOldUniformOrdersRefund(model: any) {
    return this.http.postData(AppSettings.report + '/GetOldUniformOrdersRefund', model, this.bearerToken);
  }

  getOldUniformOrdersExchange(model: any) {
    return this.http.postData(AppSettings.report + '/GetOldUniformOrdersExchange', model, this.bearerToken);
  }

  getUniformInventoryStock(school_id: any) {
    return this.http.getData(AppSettings.report + '/GetUniformInventoryStock?school_id=' + school_id, this.bearerToken);
  }

  getTenantDailySales(month: any, year: any) {
    return this.http.getData(AppSettings.report + '/GetDailySalesData?Month=' + month + '&Year=' + year, this.bearerToken);
  }

  getTenantInvoices(month: any, year: any) {
    return this.http.getData(AppSettings.report + '/GetInvoicesData?Month=' + month + '&Year=' + year, this.bearerToken);
  }

  getTenantItemSales(month: any, year: any) {
    return this.http.getData(AppSettings.report + '/GetItemSalesData?Month=' + month + '&Year=' + year, this.bearerToken);
  }

  getSalesCategoryProcessedData(month: any, year: any) {
    return this.http.getData(AppSettings.report + '/GetSalesCategoryProcessedData?Month=' + month + '&Year=' + year, this.bearerToken);
  }

  getTenantItemSalesMonthly(year: any) {
    return this.http.getData(AppSettings.report + '/GetItemSalesDataMonthly?Year=' + year, this.bearerToken);
  }

  GetItemSalesDataYearly() {
    return this.http.getData(AppSettings.report + '/GetItemSalesDataYearly', this.bearerToken);
  }

  getTenantDailySalesDetails(model: any) {
    return this.http.postData(AppSettings.report + '/GetTenantDailySalesDetails', model, this.bearerToken);
  }

  getTenantInvoiceDetails(model: any) {
    return this.http.postData(AppSettings.report + '/GetTenantInvoiceDetails', model, this.bearerToken);
  }

  getTenantItemSaleDetails(model: any) {
    return this.http.postData(AppSettings.report + '/GetTenantItemSaleDetails', model, this.bearerToken);
  }
  
}
