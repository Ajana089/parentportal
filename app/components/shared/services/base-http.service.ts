import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppSettings } from '../helper/appsettings';
import { map, catchError  } from "rxjs/operators"; 
import { User } from '../models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class BaseHttpService {

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
     }

     private getAuthHeaders(token: string): HttpHeaders {
        //const token = localStorage.getItem('token');
        let headers = new HttpHeaders();
        if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

     private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.status === 401 || error.status === 0) {
        // Token expired or unauthorized
        console.warn('Unauthorized! Redirecting to login...');
        //localStorage.removeItem('token');
        //this.router.navigate(['/login']);
            localStorage.clear();
        this.router.navigate(['/login']);
        
        // this.authService.logout();
        // return;
        }
        return throwError(() => error);
    }

    get<T>(url: string, header?: HttpHeaders): Observable<T> {
        return this.http.get<T>(url, { headers: header });
    }

    getData<T>(url: string, token: string, header?: HttpHeaders): Observable<T> {
        // const headers = { 'Authorization': 'Bearer ' + token }
        // return this.http.get<T>(url, { headers });

        return this.http.get<T>(url, { headers: this.getAuthHeaders(token) })
        .pipe(catchError(err => this.handleError(err)));
    }

    post<T, V>(url: string, payload: T, header?: HttpHeaders): Observable<V> {
        return this.http.post<V>(url, payload, { headers: header });
    }

    postData<T, V>(url: string, payload: T, token: string, header?: HttpHeaders): Observable<V> {
        return this.http.post<V>(url, payload, { headers: this.getAuthHeaders(token) })
        .pipe(catchError(err => this.handleError(err)));
    }

    put<T, V>(url: string, payload: T, header?: HttpHeaders): Observable<V> {
        return this.http.put<V>(url, payload, { headers: header });
    }

    delete<T>(url: string, header?: HttpHeaders): Observable<T> {
        return this.http.delete<T>(url, { headers: header });
    }

    getToken(model: any, url: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'

        });
        const options = { headers: headers };
        const body = new HttpParams()
            .set('grant_type', model.grant_type)
            .set('username', model.username)
            .set('password', model.password)
        return this.http
            .post(url, body, options)
            .pipe(
               // map(this.extractData),
               // catchError(this.handleErrorObservable)
              );
    }

    add(model: any, url: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Authorization': 'bearer ' + localStorage.getItem(AppSettings.APP_TOKEN)

        });
        const options = { headers: headers };
        const body = JSON.stringify(model);
        return this.http
            .post(url, body, options)
            .pipe(
               // map(this.extractData),
               // catchError(this.handleErrorObservable)
              );
    }

    private extractData(res: Response) {
        const body = res;
        return body || {};
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.apply(error.message || error);
    }

}