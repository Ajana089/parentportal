import { Injectable, EventEmitter } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../helper/appsettings';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseHttpService {
  Subjet:string = '';
  selectedApproval:any[]=[]
  SelectedItemRow:any[]=[]
  Invoice:any[]=[]
  additemgrid:EventEmitter<boolean> = new EventEmitter();
  userGridRefresh:EventEmitter<boolean> = new EventEmitter();
  formData: FormData = new FormData();
  user: any;
  companyId: any;
  IsInterSchool: boolean=false;
  userId: any;
  userName:any
  SelectedSchoolRow:any[]=[]
  constructor(http: HttpClient) {
    super(http);
  }
  refreshGrid:EventEmitter<boolean> = new EventEmitter();

  getTokenn(credentails: any){
    return this.getToken(credentails,AppSettings.URL_GETTOKEN)
  }

}
