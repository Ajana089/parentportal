import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { AppSettings } from '../../shared/helper/appsettings';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MasterSetupService {

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

  saveBusinessUnit(model: any) {
    return this.http.postData(AppSettings.masterSetup + '/InsertBusinessUnit', model, this.bearerToken);
  }

  getBusinessUnitByID(id: any) {
    return this.http.getData(AppSettings.masterSetup + '/GetBusinessUnitByID?ID=' + id, this.bearerToken);
  }

  GetAllBusinessUnits() {
    return this.http.getData(AppSettings.masterSetup + '/GetAllBusinessUnits', this.bearerToken);
  }

  GetAllCustomers() {
    return this.http.getData(AppSettings.masterSetup + '/GetAllCustomerRequests', this.bearerToken);
  }

  saveCustomer(model: any) {
    return this.http.postData(AppSettings.masterSetup + '/InsertCustomerRequest', model, this.bearerToken);
  }

  getCustomerByID(id: any) {
    return this.http.getData(AppSettings.masterSetup + '/GetCustomerRequestByID?ID=' + id, this.bearerToken);
  }

  GetAllDivisionMasters(){
     return this.http.getData(AppSettings.masterSetup + '/GetAllDivisionMasters', this.bearerToken);
  }
  saveDivisionMaster(model: any) {
    return this.http.postData(AppSettings.masterSetup + '/InsertDivisionMaster', model, this.bearerToken);
  }
  getDivisionMasterByID(id: any) {
    return this.http.getData(AppSettings.masterSetup + '/GetDivisionMasterByID?ID=' + id, this.bearerToken);
  }

  GetOrganizationMasterByID(id:any){
     return this.http.getData(AppSettings.masterSetup + '/GetOrganizationMasterByID?ID=' + id, this.bearerToken);
  }
  GetAllOrganizationMasters(){
      return this.http.getData(AppSettings.masterSetup + '/GetAllOrganizationMasters', this.bearerToken);
  }
 
  saveOrganizationMaster(model:any){
    return this.http.postData(AppSettings.masterSetup + '/InsertOrganizationMaster', model, this.bearerToken);
  }
  GetTermsAndConditionsByID(id:any){
     return this.http.getData(AppSettings.masterSetup + '/GetTermsConditionMasterByID?ID=' + id, this.bearerToken);
  }
  GetAllTermsAndConditions(){
   return this.http.getData(AppSettings.masterSetup + '/GetAllTermsConditionMaster', this.bearerToken);
  }
 
  saveTermsAndConditions(model:any){
   return this.http.postData(AppSettings.masterSetup + '/InsertTermsCondition', model, this.bearerToken);
  }
  GetLocationMasterByID(id:any){
   return this.http.getData(AppSettings.masterSetup + '/GetLocationMasterByID?ID=' + id, this.bearerToken);
  }
  GetAllLocationMasters(){
   return this.http.getData(AppSettings.masterSetup + '/GetAllLocationMaster', this.bearerToken);
  }
  GetAllLocationCode(){
   return this.http.getData(AppSettings.masterSetup + '/GetAllLocationCode', this.bearerToken);
  }
  GetAllEmiratesMaster(){
   return this.http.getData(AppSettings.masterSetup + '/GetAllEmiratesMaster', this.bearerToken);
  }
   saveLocationMaster(model:any){
   return this.http.postData(AppSettings.masterSetup + '/InsertLocationMaster', model, this.bearerToken);
  }

 
}
