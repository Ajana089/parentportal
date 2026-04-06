import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { GridModalComponent } from '../shared/components/grid-modal/grid-modal.component';
import { ProductComponent } from './dialog/product/product.component';
import { DialogsService } from '../shared/services/dialog.service';
import { FormGroup } from '@angular/forms';
import { CheckoutComponent } from './dialog/checkout/checkout.component';
import { ProductService } from './services/product.service';
import { User } from '../shared/models/user.model';
import { AuthService } from '../auth/services/auth.service';
import { AppSettings } from '../shared/helper/appsettings';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastMessages } from '../shared/models/toast-messages';
import { Router } from '@angular/router';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @ViewChild('keyword') keywordInput!: ElementRef;

  formGroup: FormGroup;
  studentDialogRef: MatDialogRef<GridModalComponent, any>;
  categories: any[] = [];
  selectedCategory: string;
  vendors: any[] = [];
  selectedVendor: string;
  selectedKeyword: string = '';
  customer: any[] = [];
  selectedCustomer: string;
  loggedInUser: User;
  productMenu: any[] = [];
  filteredProductMenu: any[] = [...this.productMenu];
  mainProductsInCart: any[] = [];
  productsInCart: any[] = [];
  disableControls: boolean = true;
  itemsInCart: any[] = [];
  orderAmount: any = 0.0;
  taxAmount: any = 0.0;
  totalOrderAmount: any = 0.0;
  baseAssetUrl: any;
  selectedSchoolId: any;
  selectedFamily = '';
  paymentMethod = '';
  userRoleId: any = '';
  loading = false;
  orderData: any;

  constructor(
    public dialog: MatDialog,
    private dialogService: DialogsService,
    private authService: AuthService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.baseAssetUrl = AppSettings.assetUrl;
  }

  ngOnInit(): void {
    this.loading = true;
    this.loggedInUser = this.authService.getLoggedInUser();
    this.userRoleId = this.loggedInUser.Role;

    this.orderData = history.state.orderData;
    // console.log('Received order data:', this.orderData);
    if (this.orderData) {
      this.retrieveOrderItems();
    }

    if (this.loggedInUser.Role.toString() == '') {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.getCategories();
    //this.getVendors();
    //this.getProducts();
    //this.loading = false;
  }

  getCategories() {
    this.productService.getProductCategories().subscribe((res: any) => {
      // console.log(res);
      this.categories = res;
    });
    this.loading = false;
    this.selectedCategory = '';
  }

  onChangeCategory(value) {
    this.selectedCategory = value;
    this.getVendors();
    this.getProducts();
  }

  onChangeVendor(value) {
    let category = this.selectedCategory;
    if (category == ''){
      Swal.fire({
        title: 'Please select Category!',
        text: '',
        icon: 'warning',
      });
      return;
    }
    this.selectedVendor = value;
    this.getProducts();
  }

  getVendors() {
    let category = this.selectedCategory;
    if (category != '')
    {
      this.productService.getOrderVendors(category).subscribe((res: any) => {
        this.vendors = res;
      });
      this.selectedVendor = '';
     
    }
    
  }

  filterProduct(keyword: string): void {
    const searchTerm = keyword.toLowerCase();
    this.selectedKeyword = searchTerm;
    this.filteredProductMenu = this.productMenu.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm) || 
      product.item_code.toLowerCase().includes(searchTerm)
    );
  }
  
  getProducts() {
    this.productMenu = [];
    let category = this.selectedCategory;
    let vendor = this.selectedVendor || 0;
    let keyword = this.selectedKeyword || '.';

    if (category != '')
    {
      this.loading = true;
      this.productService
      .getProducts(category, vendor, '.')
      .subscribe((res: any) => {
        // console.log(res);
        this.productMenu = res;
        this.filteredProductMenu = res;
        this.loading = false;
        this.filterProduct(this.selectedKeyword);
      });
    }

    
  }

  openSearchFamilyDialog() {
   
  }

  openProductDialog(product) {
    let student = {
      student_no: 1,
      student_name: 'Test',
    };
    let data = {
      product: product,
      student: student,
      productsInCart: this.productsInCart,
    };
    // this.selectedSchoolId = product.school_id;
    const dialogRef = this.dialog.open(ProductComponent, {
      height: 'auto',
      width: '100%',
      minWidth: '70%',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.Id > 0) {
        let item = result;
        let alreadyExist = this.productsInCart.find((x) => x.Id == item.Id);
        if (alreadyExist !== undefined) {
          alreadyExist.quantity += item.quantity;
        } else {
          item.item_name = product.product_name;
          item.image_url = product.image_url;
          this.productsInCart.push(item);
        }

        this.calculateOrderAmount();
        this.calculateTaxAmount();
      }
    });
  }

  resetOrderItems() {
    if (!this.orderData) {
      this.itemsInCart = [];
      this.productsInCart = [];
      this.orderAmount = 0.0;
      this.taxAmount = 0.0;
      this.totalOrderAmount = 0.0;
      this.customer = [];
      this.calculateOrderAmount();
    }
    this.selectedFamily = '';
    this.selectedCustomer = '';
    this.paymentMethod = '';
    this.selectedCategory = '';
    this.selectedVendor = '';
    this.selectedKeyword = '';
    this.keywordInput.nativeElement.value = '';
    this.getProducts();
  }

  calculateOrderAmount() {
    this.orderAmount = 0.0;
    this.productsInCart.forEach((item) => {
      this.orderAmount += item.unit_cost * item.quantity;
    });

    this.disableControls = this.productsInCart.length ? false : true;
  }

  updateCart() {
    this.productsInCart = [];
    let uniqueProductIds = [
      ...new Set(this.itemsInCart.map((item) => item.Id)),
    ];
    uniqueProductIds.forEach((Id) => {
      let item = this.itemsInCart.find((x) => x.Id === Id);
      if (item) {
        this.productsInCart.push(item);
      }
    });

    // console.log(this.productsInCart);
  }

  openCheckoutDialog() {
    let data = {
      mainProduct: this.mainProductsInCart,
      orderData: this.orderData,
      product: this.productsInCart,
      user_id: this.loggedInUser.ID,
      company_id: this.loggedInUser.CompanyID,
      orderTotalAmount: this.totalOrderAmount,
      totalTaxAmount: this.taxAmount,
    };
    // // console.log('logginInUser', this.loggedInUser);
    // console.log('openCheckoutDialog()',data)

    const dialogRef = this.dialog.open(CheckoutComponent, {
      height: 'auto',
      width: '100%',
      minWidth: '50%',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result == 'created') {
        this.resetOrderItems();
        this.router.navigate(['/requested-orders']);
      }
    });
  }

  openAllOrdersDialog() {
    // console.log('You have clicked Currently Shopping For');
    // const dialogRef = this.dialog.open(OldOrdersComponent, {
    //   height: 'auto',
    //   width: '40%',
    //   disableClose: true,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //   }
    // });
  }

  itemCountInCart(item) {
    // let items = this.productsInCart.filter(x => x.Id === item.Id && x.shop_for == item.shop_for);
    // let count = 0;
    // if (items && items.length > 0) {
    //   count = items.length
    // }
    // return count;
  }

  removeItemFromOrder(item) {
    let product = this.productsInCart.find(
      (x) => x.Id === item.Id && x.shop_for == item.shop_for
    );
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      let itemIndex = this.productsInCart.findIndex(
        (x) => x.Id === item.Id && x.shop_for == item.shop_for
      );
      this.productsInCart.splice(itemIndex, 1);
    }

    this.calculateOrderAmount();
    this.calculateTaxAmount();
  }

  removeAllItemFromOrder(item) {
    let product = this.productsInCart.find(
      (x) => x.Id === item.Id && x.shop_for == item.shop_for
    );
    // if (product.quantity > 1) {
    //   product.quantity--;
    // } else {
    let itemIndex = this.productsInCart.findIndex(
      (x) => x.Id === item.Id && x.shop_for == item.shop_for
    );
    this.productsInCart.splice(itemIndex, 1);
    // }

    this.calculateOrderAmount();
    this.calculateTaxAmount();
  }

  addItemToOrder(item) {
    var products = this.productsInCart.filter((x) => x.Id == item.Id);

    if (products && products.length > 0) {
      let quantity = 0;
      products.forEach((product: any) => {
        quantity += product.quantity;
      });
      let selectedProduct = this.productsInCart.find(
        (x) => x.Id === item.Id && x.shop_for == item.shop_for
      );
      selectedProduct.quantity++;
      this.calculateOrderAmount();
      this.calculateTaxAmount();
    }
  }

  itemTotalAmountInOrder(item) {
    let totalItems = this.productsInCart.filter((x) => x.Id === item.Id);
    let total = 0;
    if (totalItems && totalItems.length > 0) {
      total = item.unit_cost * item.quantity;
    }
    return total;
  }

  calculateTax() {}

  calculateTaxAmount() {
    this.taxAmount = 0.0;
    this.productsInCart.forEach((item) => {
      this.taxAmount += item.unit_vat * item.quantity;
    });

    this.taxAmount = this.taxAmount.toFixed(2);
  }

  calculateTotalTaxAmount() {
    let amount = this.orderAmount;
    this.totalOrderAmount = (amount + parseFloat(this.taxAmount)).toFixed(2);
    return this.totalOrderAmount;
  }

  paymentMethodChanged(type) {
    this.paymentMethod = type;
  }
  setDefaultImage(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '../../../assets/img/NoImageAvailable.png';
  }
  saveOrderDialog() {
    var order_items: any = [];
    let order_id = 0;
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
        is_removed: is_removed,
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
    let status = 'draft';
    if (this.orderData && this.orderData.status_description == 'Rejected') {
      status = 'rejected-draft';
    }
    var order = {
      Id: 0,
      order_id: order_id,
      user_id: this.loggedInUser.ID.toString(),
      company_id: this.loggedInUser.CompanyID,
      status: status,
      order_year: 0,
      net_total: this.totalOrderAmount,
      tax_total: this.taxAmount,
      total_sales: this.totalOrderAmount,
      order_notes: '',
      created_by: this.loggedInUser.ID.toString(),
      updated_by: this.loggedInUser.ID.toString(),
      order_items: order_items,
    };
    if (order_items.length === 0) {
      Swal.fire({
        title: 'You cannot save a draft with empty cart!',
        text: '',
        icon: 'warning',
      });
      return;
    }
    // console.log('This is Save Orders', order);
    // return;
    var _this = this;
    this.loading = true;

    this.orderService.saveOrder(order).subscribe((res: any) => {
      var result = res;
      this.loading = false;
      if (result && result.order_id > 0) {
        Swal.fire({
          title: 'Order#' + result.order_id + ' has been saved!',
          text: '',
          icon: 'info',
        }).then(function () {
          _this.resetOrderItems();
          _this.router.navigate(['/requested-orders']);
        });
      }
    });
  }
  retrieveOrderItems() {
    // console.log('RETRIEVE!');
    // let item = result;
    // let alreadyExist = this.productsInCart.find((x) => x.Id == item.Id);
    // if (alreadyExist !== undefined) {
    //   alreadyExist.quantity += item.quantity;
    // } else {
    //   item.item_name = product.product_name;
    //   item.image_url = product.image_url;
    //   this.productsInCart.push(item);
    // }
    this.orderService
      .GetOrderItemsCart(this.orderData.order_id)
      .subscribe((res: any) => {
        // console.log(res);
        for (const item of res) {
          this.mainProductsInCart.push(item);
          this.productsInCart.push(item);
        }
        this.calculateOrderAmount();
        this.calculateTaxAmount();
      });
  }

  clearCategory(event: MouseEvent): void {
    event.stopPropagation(); // Prevents the dropdown from opening
    this.selectedCategory = ''; // Reset to "All"
    this.onChangeCategory(this.selectedCategory); // Call the onChange method
  }
  clearVendor(event: MouseEvent): void {
    event.stopPropagation(); // Prevents the dropdown from opening
    this.selectedVendor = ''; // Reset to "All"
    this.onChangeVendor(this.selectedVendor); // Call the onChange method
  }
  clearKeyword(event: MouseEvent): void {
    event.stopPropagation(); // Prevents the input from focusing
    this.keywordInput.nativeElement.value = ''; // Clear the input field
    this.filterProduct(this.keywordInput.nativeElement.value); // Call the filter method to reset the results
  }
}
