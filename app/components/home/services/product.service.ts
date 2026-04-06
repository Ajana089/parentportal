import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { AppSettings } from '../../shared/helper/appsettings';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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

  getProductCategories() {
    return this.http.getData(AppSettings.product + '/GetProductCategories', this.bearerToken);
  }

  getOrderResourceCategories() {
    return this.http.getData(AppSettings.product + '/GetOrderResourceCategories', this.bearerToken);
  }

  getProductGrades() {
    return this.http.getData(AppSettings.product + '/GetProductGrades', this.bearerToken);
  }

  getProductVendors() {
    return this.http.getData(AppSettings.product + '/GetProductVendors', this.bearerToken);
  }

  getOrderVendors(category_id) {
    return this.http.getData(AppSettings.product + '/GetOrderVendors?category_id=' + category_id, this.bearerToken);
  }
  
  getProducts(category_id, vendor_id, keyword) {
    return this.http.getData(AppSettings.product + '/GetProducts?category_id=' + category_id + '&vendor_id=' + vendor_id + '&keyword=' + keyword, this.bearerToken);
  }

  getExchangeProducts(school_id, category_id, grade_id) {
    return this.http.getData(AppSettings.product + '/GetExchangeProducts?school_id=' + school_id + '&category_id=' + category_id + '&grade_id=' + grade_id, this.bearerToken);
  }

  getProductVariation(product_id, school_id) {
    return this.http.getData(AppSettings.product + '/GetProductVariation?product_id=' + product_id + '&school_id=' + school_id, this.bearerToken);
  }

}
