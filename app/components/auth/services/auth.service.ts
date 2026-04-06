import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { AppSettings } from '../../shared/helper/appsettings';
import { User } from '../../shared/models/user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Parent } from '../../shared/models/parent.model';

@Injectable()
export class AuthService {

    constructor(private http: BaseHttpService, private httpclient: HttpClient) { }
    private storageKey: string = 'loggedInUser';

    getAllCompanies()
    {
        return this.http.get(AppSettings.authenticate + '/GetAllCompanies');
    }

    getUserData(email) {
        return this.http.get(AppSettings.authenticate + '/GetLoginUserDetail?username=' + email); 
    }

    authenticate(model: any) {
        return this.http.post(AppSettings.authenticate + '/UserLogin', model);
    }

    userLogin(model: any) {
        return this.http.post(AppSettings.authenticate + '/UserLogin', model);
    }

    forgotPassword(model: any) {
        return this.http.post(AppSettings.authenticate + '/ForgotPassword', model);
    }

    forgotAdminPassword(model: any) {
        return this.http.post(AppSettings.authenticate + '/ResetAdminPassword', model);
    }

    setLoggedInUser(user: User) {
        localStorage.setItem(this.storageKey, JSON.stringify(user))
    }

    getLoggedInUser(): User {
        let user: any = localStorage.getItem(this.storageKey);
        return JSON.parse(user);
    }

    isAuthenticated() {
        return this.getLoggedInUser();
    }

    setLoggedInParent(parent: Parent[]) {
        localStorage.setItem(this.storageKey, JSON.stringify(parent))
    }

    getLoggedInParent(): Parent[] {
        let parent: any = localStorage.getItem(this.storageKey);
        return JSON.parse(parent);
    }

    isAuthenticatedParent() {
        return this.getLoggedInUser();
    }

    logout() {
        localStorage.clear();
    }
    
    getLoggedInUserSessionId() {
        let sessionId = ''
        if (this.getLoggedInUser()) {
            sessionId = this.getLoggedInUser().session_id;
        }
        return sessionId;
    }

    authenticateParent(model: any) {
        return this.http.post(AppSettings.authenticate + '/ParentLogin', model);
    }

    getNavMenu(group_id: any) {
        return this.http.get(AppSettings.authenticate + '/GetNavMenu?group_id=' + group_id);
    }

}
