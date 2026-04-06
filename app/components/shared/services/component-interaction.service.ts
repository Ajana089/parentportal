import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ComponentInteractionService {

    private cartUpdated = new Subject<any>();
    cartUpdated$ = this.cartUpdated.asObservable();

    private updateCanteenViewForVerifyOrder = new Subject<any>();
    updateCanteenViewForVerifyOrder$ = this.updateCanteenViewForVerifyOrder.asObservable();

    private menuCategoryUpdated = new Subject<any>();
    menuCategoryUpdated$ = this.menuCategoryUpdated.asObservable();

    private orderUpdated = new Subject<any>();
    orderUpdated$ = this.orderUpdated.asObservable();

    private menuGroupUpdated = new Subject<any>();
    menuGroupUpdated$ = this.menuGroupUpdated.asObservable();

    private menuEmployeeUpdated = new Subject<any>();
    menuEmployeeUpdated$ = this.menuEmployeeUpdated.asObservable();

    private menuUserUpdated = new Subject<any>();
    menuUserUpdated$ = this.menuUserUpdated.asObservable();

    private interCanteenUpdated = new Subject<any>();
    interCanteenUpdated$ = this.interCanteenUpdated.asObservable();

    private canteenUserAssignmentUpdated = new Subject<any>();
    canteenUserAssignmentUpdated$ = this.canteenUserAssignmentUpdated.asObservable();

    private inventoryUpdated = new Subject<any>();
    inventoryUpdated$ = this.inventoryUpdated.asObservable();

    private menuCateenUpdated = new Subject<any>();
    menuCateenUpdated$ = this.menuCateenUpdated.asObservable();

    private menuHolidayUpdated = new Subject<any>();
    menuHolidayUpdated$ = this.menuHolidayUpdated.asObservable();

    private menuSchoolUpdated = new Subject<any>();
    menuSchoolUpdated$ = this.menuSchoolUpdated.asObservable();

    private menuItemUpdated = new Subject<any>();
    menuItemUpdated$ = this.menuItemUpdated.asObservable();

    private gridFilterChanged = new Subject<any>();
    gridFilterChanged$ = this.gridFilterChanged.asObservable();

    private setReportTitleChanged = new Subject<any>();
    setReportTitleChanged$ = this.setReportTitleChanged.asObservable();

    updateCart(cartUpdated: any) {
        this.cartUpdated.next(cartUpdated);
    }

    updateCanteenView(update: boolean) {
        this.updateCanteenViewForVerifyOrder.next(update);
    }

    menuCategoryUpdate(update: boolean) {
        this.menuCategoryUpdated.next(update);
    }

    menuGroupUpdate(update: boolean) {
        this.menuGroupUpdated.next(update);
    }

    menuEmployeeUpdate(update: boolean) {
        this.menuEmployeeUpdated.next(update);
    }

    menuUserUpdate(update: boolean) {
        this.menuUserUpdated.next(update);
    }

    canteenAssignmentUpdate(update: boolean) {
        this.canteenUserAssignmentUpdated.next(update);
    }

    inventoryUpdate(update: boolean) {
        this.inventoryUpdated.next(update);
    }

    menuSchoolUpdate(update: boolean) {
        this.menuSchoolUpdated.next(update);
    }

    menuCanteenUpdate(update: boolean) {
        this.menuCateenUpdated.next(update);
    }

    menuHolidayUpdate(update: boolean) {
        this.menuHolidayUpdated.next(update);
    }

    menuItemUpdate(update: boolean) {
        this.menuItemUpdated.next(update);
    }


    interCanteenTransferUpdate(update: boolean) {
        this.interCanteenUpdated.next(update);
    }

    orderUpdate(update: boolean) {
        this.orderUpdated.next(update);
    }

    updateGridFilter(filter: any) {
        this.gridFilterChanged.next(filter);
    }

    updateReportTitle(title: any) {
        this.setReportTitleChanged.next(title);
    }
}
