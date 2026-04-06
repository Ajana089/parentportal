import { Injectable, EventEmitter } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../helper/appsettings';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: BaseHttpService) { }

  getUserData(email: any) {
    //return this.add(model, AppSettings.authenticate + "/GetUserDetail");
    return this.http.get(AppSettings.authenticate + '/GetUserDetail?username=' + email); 
  }
}
