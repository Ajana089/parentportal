import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { AppSettings } from '../helper/appsettings';

@Injectable({
    providedIn: 'root'
})
export class NavService {


    constructor(private http: BaseHttpService) {
    }

    getNavItems(groupId: number | string) {
        return this.http.get(AppSettings.navMenu + '?groupId=' + groupId);
    }

}