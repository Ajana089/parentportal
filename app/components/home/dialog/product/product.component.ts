import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppSettings } from '../../../shared/helper/appsettings';
import { ProductService } from '../../services/product.service';
import { ToastMessages } from '../../../shared/models/toast-messages';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  @Input() stock: number;
  @Input() maxStock: number;
  @ViewChild('qty') qtyInput!: ElementRef;

  stockPercentage: number;
  stockThreshold: number;
  itemStock: string;
  var1: string;
  selectedQry: string;
  inputObj: any;
  product_name: any;
  product_code: any;
  product_specs: any;
  product_category: any;
  product_item_type: any;
  product_uom: any;
  product_image_url: any;
  product_grade: any;
  product_for_student: any;
  product_unit_cost: any;
  enteredQty: any;
  baseAssetUrl: any;
  suggestedQty: any[] = [
    {
      qtyValue: 5,
    },
    {
      qtyValue: 10,
    },
    {
      qtyValue: 25,
    },
    {
      qtyValue: 30,
    },
    {
      qtyValue: 35,
    },
    {
      qtyValue: 40,
    },
    {
      qtyValue: 45,
    },
    {
      qtyValue: 50,
    },
    {
      qtyValue: 60,
    },
    {
      qtyValue: 70,
    },
    {
      qtyValue: 80,
    },
    {
      qtyValue: 90,
    },
    {
      qtyValue: 100,
    },
    {
      qtyValue: 200,
    },
    {
      qtyValue: 500,
    },
    {
      qtyValue: 1000,
    },
  ];
  product_SKU: any = 'N/A';
  product_price: any;
  product_stock_quantity: any;
  selectedProduct: any;
  disableControls: boolean = true;
  itemsInCart: any[] = [];
  productsInCart: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {
    this.baseAssetUrl = AppSettings.assetUrl;
    this.inputObj = data;
    if (this.inputObj) {
      this.selectedProduct = this.inputObj.product;
      this.product_name = this.inputObj.product.product_name;
      this.product_code = this.inputObj.product.item_code;
      this.product_specs = this.inputObj.product.product_description;
      this.product_unit_cost = this.inputObj.product.unit_cost;
      this.product_category = this.inputObj.product.category_name;
      this.product_item_type = this.inputObj.product.item_type;
      this.product_uom = this.inputObj.product.uom;
      this.product_grade = this.inputObj.product.grade_desc;
      this.product_image_url = this.inputObj.product.image_url;
      this.productsInCart = this.inputObj.productsInCart;
    }
  }

  ngOnInit() {
    this.stock = 0;
    this.maxStock = 100;
    this.calculateStockPercentage();
    // this.getProductVariation();
  }

  getProductVariation() {
    let product_id = this.inputObj.product.Id;
    let school_id = 19;
    this.productService
      .getProductVariation(product_id, school_id)
      .subscribe((res: any) => {
        // // console.log(res);
        this.suggestedQty = res;
      });
  }

  showItemDetail(item) {
    this.disableControls = true;
    this.itemsInCart = [];
    this.selectedProduct = item;
    this.product_SKU = item.SKU;
    this.product_price = item.sale_price;
    this.product_stock_quantity = item.stock_quantity;
    this.var1 = item.Id;
    this.stock = item.stock_quantity;
    this.stockThreshold = item.low_stock_threshold;
    let itemCountInCart = this.itemCountInCart();

    if (this.stock > 0) {
      this.addItemToOrder();
      this.disableControls = false;
    }
    this.calculateStockPercentage();
    return;
  }

  setSuggQty(item) {
    this.qtyInput.nativeElement.value = item.qtyValue;

    if (Number(this.qtyInput.nativeElement.value) > 0) {
      this.disableControls = false;
    } else {
      this.disableControls = false;
    }
    return;
  }

  addToCart() {
    let quantityCart = 0;
    let input = Number(this.qtyInput.nativeElement.value);
    let selectedProduct = { ...this.inputObj.product}
    let unit_cost = this.inputObj.product.unit_cost
    let vat = unit_cost * 0.05;
    // console.log(selectedProduct)
    selectedProduct.unit_vat = vat.toString()
    selectedProduct.vat = vat.toString()
    selectedProduct.unit_cost_incl_vat = (Number(unit_cost) + vat).toString()

    for (let i = 0; i < Number(input); i++) {
      this.itemsInCart.push(selectedProduct);
    }

    let selectedItem = { ...this.itemsInCart[0] };
    selectedItem.quantity = Number(input);
    let item = selectedItem;
    this.dialogRef.close(item);
  }

  addItemToOrder1() {
    if (this.selectedProduct == undefined) {
      Swal.fire({
        title: ToastMessages.SelectItemSize,
        text: '',
        icon: 'error',
      });
      return;
    }
    let item = this.selectedProduct;

    let itemCountInCart = this.itemCountInCart();

    let itemCountInMainCart = this.itemCountInMainCart();

    let itemQuanity = item.stock_quantity;
    let availedQuantity = 0;

    if (itemCountInMainCart > 0) {
      availedQuantity = itemCountInMainCart;
    }

    let availableQuantity = itemQuanity - availedQuantity - itemCountInCart;

    if (
      item &&
      item.stock_quantity > itemCountInCart &&
      availableQuantity > 0
    ) {
      this.itemsInCart.push(item);

      this.disableControls = false;
      return true;
    } else {
      Swal.fire({
        title: ToastMessages.OutOfStock,
        text: '',
        icon: 'error',
      });
      return false;
    }
  }

  addItemToOrder() {
    let item = this.selectedProduct;

    this.qtyInput.nativeElement.value =
      Number(this.qtyInput.nativeElement.value) + 1;
    // this.itemsInCart.push(item);
    // // console.log(this.itemsInCart)
    if (Number(this.qtyInput.nativeElement.value) > 0) {
      this.disableControls = false;
    } else {
      this.disableControls = false;
    }
  }

  removeItemFromOrder1() {
    if (this.selectedProduct == undefined) {
      Swal.fire({
        title: ToastMessages.SelectItemSize,
        text: '',
        icon: 'error',
      });
      return;
    }
    let item = this.selectedProduct;
    let itemIndex = this.itemsInCart.findIndex((x) => x.id === item.id);
    let itemCountInCart = this.itemCountInCart();
    if (itemIndex > -1 && itemCountInCart > 1) {
      this.itemsInCart.splice(itemIndex, 1);
    }
  }

  removeItemFromOrder() {
    if (this.qtyInput.nativeElement.value == 0) {
      Swal.fire({
        title: 'Quantity cannot be less that 0!',
        text: '',
        icon: 'error',
      });
      return;
    }
    this.qtyInput.nativeElement.value =
      Number(this.qtyInput.nativeElement.value) - 1;
    if (Number(this.qtyInput.nativeElement.value) > 0) {
      this.disableControls = false;
    } else {
      this.disableControls = true;
    }
  }

  validateQuantity(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.enteredQty = input;

    let item = this.selectedProduct;

    if (Number(input) > 0) {
      this.disableControls = false;
    } else {
      this.disableControls = false;
    }
  }

  itemCountInCart() {
    // console.log('Items in Cart', this.itemsInCart);
    // console.log('Selected Product', this.selectedProduct);
    let items = this.itemsInCart.filter(
      (x) => x.Id === this.selectedProduct.Id
    );
    let count = 0;
    if (items && items.length > 0) {
      count = items.length;
    }
    return count;
  }

  itemCountInMainCart() {
    let items = this.productsInCart.filter(
      (x) => x.Id === this.selectedProduct.Id
    );
    let count = 0;
    if (items && items.length > 0) {
      items.forEach((item) => {
        count += item.quantity;
      });
    }
    return count;
  }

  ngOnChanges() {
    this.calculateStockPercentage();
  }

  calculateStockPercentage() {
    if (this.maxStock > 0) {
      this.stockPercentage = parseInt(
        ((this.stock / this.maxStock) * 100).toFixed(0)
      );
    } else {
      this.stockPercentage = 0;
    }
    if (this.stock > 0) {
      this.itemStock = this.stockPercentage + ' IN STOCK';
    } else {
      this.itemStock = 'OUT OF STOCK';
    }
    // // console.log(this.stockPercentage);
  }

  closeDialog() {
    this.dialogRef.close();
  }
  setDefaultImage(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '../../../assets/img/NoImageAvailable.png';
  }
}
