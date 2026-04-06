import { Component, OnDestroy, OnInit, Input, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { OrderService } from '../../../home/services/order.service';
import { AppSettings } from '../../../shared/helper/appsettings';
import { ToastMessages } from '../../../shared/models/toast-messages';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../auth/services/auth.service';
// import { RefundOrderComponent } from '../refund-order/refund-order.component';
// import { ExchangeOrderRequestComponent } from '../exchange-order-request/exchange-order-request.component';
// import { ExchangeOrderComponent } from '../exchange-order/exchange-order.component';
import { Console } from 'console';
import { Router } from '@angular/router';
import { ProductService } from '../../../home/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrl: './add-update-product.component.css'
})
export class AddUpdateProductComponent implements OnInit {

  loading = false;
  loggedInUser: User;
  categories: any[] = [];
  selectedCategory: string;
  selectedVendor: string;
  vendors: any[] = [];
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService,
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //this.order_id = data.order_id;
    //this.currOrder = data;
    //this.baseAssetUrl = AppSettings.assetUrl;

    this.productForm = this.fb.group({
      category_id: ['', Validators.required],
      vendor_id: ['', Validators.required],
      product_name: ['', Validators.required],
      product_description: ['', Validators.required],
      grade: ['', Validators.required],
      item_type: ['', Validators.required],
      price: ['', Validators.required],
      uom: ['', Validators.required],
    });


  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.loading = true;
    
    this.loggedInUser = this.authService.getLoggedInUser();
    this.getCategories();
    this.getVendors();


  }

  getCategories() {
    this.productService.getProductCategories().subscribe((res: any) => {
      // console.log(res);
      this.categories = res;
    });
    //this.selectedCategory = '';
  }

  getVendors() {
    this.productService.getProductVendors().subscribe((res: any) => {
      this.vendors = res;
    });
  }

  onSave() {

  }

}
