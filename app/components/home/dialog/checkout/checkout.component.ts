import { Component, OnDestroy, OnInit, Input, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastMessages } from '../../../shared/models/toast-messages';
import { ProductService } from '../../services/product.service';
import { AppSettings } from '../../../shared/helper/appsettings';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  @Input() stock: number;
  @Input() maxStock: number;
  stockPercentage: number;
  var1: string;
  isShippingDifferent: boolean = false;
  mainProductsInCart: any[] = [];
  productsInCart: any[] = [];
  orderData: any;
  baseAssetUrl: any;
  inputObj: any;
  taxAmount: any = 0.0;
  totalOrderAmount: any = 0.0;
  orderAmount: any = 0.0;
  paymentMethod: any = 'cash';
  customerForm: FormGroup;
  disableControls: boolean = false;
  paymentReferenceNumber: any = '';
  orderNotes: any = '';
  loggedInUser: User;
  shipping_handling = '1';
  userRoleId: any = '';
  loading = false;
  categories: any[] = [];
  selectedCategory: string;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private authService: AuthService,
    private orderService: OrderService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.baseAssetUrl = AppSettings.assetUrl;
    this.inputObj = data;
    this.orderData = this.inputObj.orderData;
    this.mainProductsInCart = this.inputObj.mainProduct;
    this.productsInCart = this.inputObj.product;
    // console.log(this.productsInCart)
    this.totalOrderAmount = this.inputObj.orderTotalAmount;
    this.taxAmount = this.inputObj.totalTaxAmount;
    this.paymentMethod = this.inputObj.paymentMethod;

    this.customerForm = this.fb.group({
      customer_id: [0, Validators.required],
      billing_first_name: ['', Validators.required],
      billing_last_name: ['', Validators.required],
      billing_phone: ['', Validators.required],
      billing_email: ['', Validators.required],
      billing_address: ['', Validators.required],
      billing_city: ['', Validators.required],
      billing_country: ['United Arab Emirates', Validators.required],
      shipping_first_name: [''],
      shipping_last_name: [''],
      shipping_phone: [''],
      shipping_email: [''],
      shipping_address: [''],
      shipping_city: [''],
      shipping_country: ['United Arab Emirates', Validators.required],
    });
  }

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();
    this.userRoleId = this.loggedInUser.Role;
    this.getCategories();
  }

  getCategories() {
    this.productService.getOrderResourceCategories().subscribe((res: any) => {
      // console.log(res);
      this.categories = res;
    });
    this.loading = false;
    this.selectedCategory = '';
  }

  onChangeCategory(value) {
    this.selectedCategory = value;
  }

  ngOnChanges() {}

  radioChange(event) {
    // console.log(event.value);
    this.paymentMethod = event.value;
  }

  shippingHandlingChange(event) {
    // console.log(event.value);
    this.shipping_handling = event.value;
  }

  isShippingDifferentChanged() {
    this.isShippingDifferent = !this.isShippingDifferent;
  }

  saveOrder() {
    var order_items: any = [];
    let order_id = 0;
    if (this.selectedCategory == '')
    {
      Swal.fire({
        title: 'Please select Resource Order Category!',
        text: '',
        icon: 'warning',
      });
      return;
    }
    if (this.orderData) {
      order_id = this.orderData.order_id;
    }

    this.productsInCart.forEach((item) => {
      let order_item_id = 0;
      let is_removed = false;
      if (this.orderData && item.order_item_id) {
        order_item_id = item.order_item_id;
      }

      var obj = {
        Id: order_item_id,
        order_id: order_id,
        item_name: item.product_name,
        product_id: item.Id,
        quantity: item.quantity,
        unit_price: item.unit_cost,
        vat: (item.unit_vat * item.quantity).toFixed(2),
        amount_excl_vat: (item.unit_cost * item.quantity).toFixed(2),
        amount_incl_vat: (item.unit_cost_incl_vat * item.quantity).toFixed(2),
        created_by: this.loggedInUser.ID.toString(),
        updated_by: this.loggedInUser.ID.toString(),
        is_removed: is_removed
      };
      order_items.push(obj);
    });

    const removedProducts = this.mainProductsInCart.filter(
      (mainProduct) =>
        !this.productsInCart.some(
          (cartProduct) => cartProduct.product_name === mainProduct.product_name
        )
    );
    removedProducts.forEach((item) => {
      var obj = {
        Id: item.order_item_id,
        order_id: order_id,
        item_name: item.product_name,
        product_id: item.Id,
        quantity: item.quantity,
        unit_price: item.unit_cost,
        vat: (item.unit_vat * item.quantity).toFixed(2),
        amount_excl_vat: (item.unit_cost * item.quantity).toFixed(2),
        amount_incl_vat: (item.unit_cost_incl_vat * item.quantity).toFixed(2),
        created_by: this.loggedInUser.ID.toString(),
        updated_by: this.loggedInUser.ID.toString(),
        is_removed: true,
      };
      order_items.push(obj);
    });

    var order = {
      Id: 0,
      order_id: order_id,
      user_id: this.inputObj.user_id.toString(),
      company_id: this.inputObj.company_id,
      status: 'approval',
      order_year: 0,
      net_total: this.totalOrderAmount,
      tax_total: this.taxAmount,
      total_sales: this.totalOrderAmount,
      order_notes: this.orderNotes,
      created_by: this.loggedInUser.ID.toString(),
      updated_by: this.loggedInUser.ID.toString(),
      order_items: order_items,
      is_approve_reject: false,
      resource_category_id: this.selectedCategory
    };

    // console.log('This is Orders', order);
    // return;
    var _this = this;
    this.loading = true;

    this.orderService.saveOrder(order).subscribe((res: any) => {
      var result = res;
      this.loading = false;
      if (result && result.order_id > 0) {
        Swal.fire({
          title: 'Order#' + result.order_id + ' created successfully!',
          text: '',
          icon: 'success',
        }).then(function () {
          // const dialogRef = _this.dialog.open(PrintOrderComponent, {
          //   height: 'auto',
          //   width: '100%',
          //   minWidth: '90%',
          //   data: result.order_id,
          //   disableClose: true,
          // });
          // dialogRef.afterClosed().subscribe((result) => {
          _this.dialogRef.close('created');
          // });
        });
      }
    });
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
  setDefaultImage(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '../../../assets/img/NoImageAvailable.png';
  }

  calculateTotalTaxAmount() {
    let amount = this.orderAmount;
    this.totalOrderAmount = (amount + parseFloat(this.taxAmount)).toFixed(2);
    return this.totalOrderAmount;
  }
}
