import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { AppSettings } from '../../shared/helper/appsettings';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

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

    getCounterPendingTickets(queue_master_id: any, school_id: any) {
      return this.http.getData(AppSettings.ticket + '/GetCounterPendingTickets?queue_master_id=' + queue_master_id + '&school_id=' + school_id, this.bearerToken);
    }

    getCounterServingTickets(user_id: any, queue_master_id: any, school_id: any) {
      return this.http.getData(AppSettings.ticket + '/GetCounterServingTickets?user_id=' + user_id + '&queue_master_id=' + queue_master_id + '&school_id=' + school_id, this.bearerToken);
    }

    getActiveCounters(user_id: any, queue_master_id: any, school_id: any) {
      return this.http.getData(AppSettings.ticket + '/GetActiveCounters?user_id=' + user_id + '&queue_master_id=' + queue_master_id + '&school_id=' + school_id, this.bearerToken);
    }

    getAppointmentDetails(family_no: any, school_id: any) {
      return this.http.getData(AppSettings.ticket + '/GetAppointmentDetails?family_no=' + family_no + '&school_id=' + school_id, this.bearerToken);
    }

    getTicketQueues(school_id: any) {
      return this.http.getData(AppSettings.ticket + '/GetTicketQueues?school_id=' + school_id, this.bearerToken);
    }

    getCounterCompletedTickets(user_id: any, queue_master_id: any, school_id: any) {
      return this.http.getData(AppSettings.ticket + '/GetCounterCompletedTickets?user_id=' + user_id + '&queue_master_id=' + queue_master_id + '&school_id=' + school_id, this.bearerToken);
    }

    callNextTicket(user_id: any, queue_master_id: any, school_id: any) {
      return this.http.getData(AppSettings.ticket + '/CallCounterNextTicket?user_id=' + user_id + '&queue_master_id=' + queue_master_id + '&school_id=' + school_id, this.bearerToken);
    }

    completeCounterTicket(model: any) {
      return this.http.postData(AppSettings.ticket + '/CompleteCounterTicket', model, this.bearerToken);
    }

    serveCounterTicket(model: any) {
      return this.http.postData(AppSettings.ticket + '/ServeCounterTicket', model, this.bearerToken);
    }

    transferCounterTicket(model: any) {
      return this.http.postData(AppSettings.ticket + '/TransferCounterTicket', model, this.bearerToken);
    }

    saveQueueTicket(model: any) {
      return this.http.postData(AppSettings.ticket + '/SaveQueueTicket', model, this.bearerToken);
    }

    recallCounterTicket(model: any) {
      return this.http.postData(AppSettings.ticket + '/RecallCounterTicket', model, this.bearerToken);
    }

    noShowCounterTicket(model: any) {
      return this.http.postData(AppSettings.ticket + '/NoShowCounterTicket', model, this.bearerToken);
    }

    updateTicketDisplayScreen(request_id: any) {
      return this.http.getData(AppSettings.ticket + '/UpdateTicketDisplayScreen?RequestDtlID=' + request_id, this.bearerToken);
    }

    getDisplayTickets() {
      return this.http.getData(AppSettings.ticket + '/GetDisplayTickets', this.bearerToken);
    }

    getTokensStatus(school_id: any) {
      return this.http.getData(AppSettings.ticket + '/GetTokensStatus?schoolId=' + school_id, this.bearerToken);
    }

    getCounterTokenStatus(school_id: any) {
      return this.http.getData(AppSettings.ticket + '/GetCounterTokenStatus?schoolId=' + school_id, this.bearerToken);
    }

    getTicketRequests(model: any) {
      return this.http.postData(AppSettings.ticket + '/GetTicketRequests', model, this.bearerToken);
    }

    getTicketAppointments(model: any) {
      return this.http.postData(AppSettings.ticket + '/GetTicketAppointments', model, this.bearerToken);
    }

    getCounterAgents(school_id: any) {
      return this.http.getData(AppSettings.ticket + '/GetCounterAgents?schoolId=' + school_id, this.bearerToken);
    }

    getCounterAvgTime(school_id: any) {
      return this.http.getData(AppSettings.ticket + '/GetCounterAvgTime?schoolId=' + school_id, this.bearerToken);
    }

    getTopCustomerSales() {
      return this.http.getData(AppSettings.graph + '/GetTopCustomerSales', this.bearerToken);
    }

    getItemTotalSales() {
      return this.http.getData(AppSettings.graph + '/GetItemTotalSales', this.bearerToken);
    }

    getTotalMonthlySales() {
      return this.http.getData(AppSettings.graph + '/GetTotalMonthlySales', this.bearerToken);
    }

    getTopSaleCategoriesData() {
      return this.http.getData(AppSettings.graph + '/GetTopSaleCategoriesData', this.bearerToken);
    }

    getTotalActiveTenants() {
      return this.http.getData(AppSettings.graph + '/GetTotalActiveTenants', this.bearerToken);
    }

    getTenantsMissingRevenue() {
      return this.http.getData(AppSettings.graph + '/GetTenantsMissingRevenue', this.bearerToken);
    }

    getSalesPerformanceByCategory() {
      return this.http.getData(AppSettings.graph + '/GetSalesPerformanceByCategory', this.bearerToken);
    }

    getInspectionRequestCount() {
      return this.http.getData(AppSettings.graph + '/GetInspectionRequestCount', this.bearerToken);
    }

    getInspectionCategoryCount() {
      return this.http.getData(AppSettings.graph + '/GetInspectionCategoryCount', this.bearerToken);
    }

    getPermitWorkRequestCount() {
      return this.http.getData(AppSettings.graph + '/GetPermitWorkRequestCount', this.bearerToken);
    }

    getPendingTenantContactCount() {
      return this.http.getData(AppSettings.graph + '/GetPendingTenantContactCount', this.bearerToken);
    }

    getTenantsCount() {
      return this.http.getData(AppSettings.graph + '/GetTenantsCount', this.bearerToken);
    }

    getComplianceDocumentStatistics() {
      return this.http.getData(AppSettings.graph + '/GetComplianceDocumentStatistics', this.bearerToken);
    }
     
}
