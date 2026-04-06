import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavService } from '../shared/services/nav.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HomeComponent } from '../home/home.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuard } from '../auth/guard/auth.gaurd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { ItemSaleWiseComponent } from '../reports/components/item-sale-wise/item-sale-wise.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { OrdersSummaryComponent } from '../reports/components/orders-summary/orders-summary.component';
import { OrdersComponent } from '../orders/orders.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { CheckoutComponent } from '../home/dialog/checkout/checkout.component';
import { ProductComponent } from '../home/dialog/product/product.component';
import { SaleDateWiseComponent } from '../reports/components/sale-date-wise/sale-date-wise.component';
import { AppComponent } from '../../app.component';
import { RouterModule } from '@angular/router';
import { RequestedOrdersComponent } from '../requested-orders/requested-orders.component';
import { RequestedViewOrderComponent } from '../requested-orders/components/requested-view-order/requested-view-order.component';
import { ViewOrderComponent } from '../orders/components/view-order/view-order.component';
import { ProductsComponent } from '../products/products.component';
import { AddUpdateProductComponent } from '../products/components/add-update-product/add-update-product.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TenantLoginComponent } from '../auth/components/tenant-login/tenant-login.component';
import { StaffLoginComponent } from '../auth/components/staff-login/staff-login.component';
import { TenantDailySalesComponent } from '../reports/components/tenant-daily-sales/tenant-daily-sales.component';
import { TenantDaySalesComponent } from '../reports/components/tenant-day-sales/tenant-day-sales.component';
import { SalesPerformanceCategoryComponent } from '../reports/components/sales-performance-category/sales-performance-category.component';
import { TenantInvoicesComponent } from '../reports/components/tenant-invoices/tenant-invoices.component';
import { InvoiceDaySalesComponent } from '../reports/components/invoice-day-sales/invoice-day-sales.component';
import { TenantItemSalesComponent } from '../reports/components/tenant-item-sales/tenant-item-sales.component';
import { TenantItemDaySalesComponent } from '../reports/components/tenant-item-day-sales/tenant-item-day-sales.component';
import { ForgotPasswordComponent } from '../auth/components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from '../auth/components/change-password/change-password.component';
import { ItemMonthlySalesComponent } from '../reports/components/item-monthly-sales/item-monthly-sales.component';
import { ItemYearlySalesComponent } from '../reports/components/item-yearly-sales/item-yearly-sales.component';
import { TenantInvoiceDaySalesComponent } from '../reports/components/tenant-invoice-day-sales/tenant-invoice-day-sales.component';
import { CounterListComponent } from '../dashboard/counter-list/counter-list.component';
import { TicketDashboardComponent } from '../dashboard/ticket-dashboard/ticket-dashboard.component';
import { TicketQueueComponent } from '../dashboard/ticket-queue/ticket-queue.component';
import { DisplayTicketComponent } from '../dashboard/display-ticket/display-ticket.component';
import { AdminDashboardComponent } from '../dashboard/admin-dashboard/admin-dashboard.component';
import { TokenReportComponent } from '../dashboard/reports/token-report/token-report.component';
import { SlicePairsPipe } from '../dashboard/services/slice-pairs.pipe';
import { AppointmentReportComponent } from '../dashboard/reports/appointment-report/appointment-report.component';
import { MasterSetupComponent } from '../master-setup/master-setup.component';
import { OrganizationComponent } from '../master-setup/organization/organization.component';
import { CustomerComponent } from '../master-setup/customer/customer.component';
import { CustomerAddComponent } from '../master-setup/customer/customer-add/customer-add.component';
import { BusinessUnitComponent } from '../master-setup/organization/business-unit/business-unit.component';
import { BusinessUnitAddComponent } from '../master-setup/organization/business-unit/business-unit-add/business-unit-add.component';
import { DivisionAddComponent } from '../master-setup/organization/division/division-add/division-add.component';
import { DivisionComponent } from '../master-setup/organization/division/division/division.component';
import { InventoryOrganizationAddComponent } from '../master-setup/organization/inventoryorganizationmaster/inventory-organization-add/inventory-organization-add.component';
import { InventoryOrganizationComponent } from '../master-setup/organization/inventoryorganizationmaster/Inventory-organization/inventory-organization.component';
import { TermsConditionsAddComponent } from '../master-setup/organization/terms-and-conditions/terms-conditions-add/terms-conditions-add.component';
import { TermsConditionsComponent } from '../master-setup/organization/terms-and-conditions/terms-conditions/terms-conditions.component';
import { LocationMasterAddComponent } from '../master-setup/organization/LocationMaster/location-master-add/location-master-add.component';
import { LocationMasterComponent } from '../master-setup/organization/LocationMaster/location-master/location-master.component';
import { OtherAdditionalChargesAddComponent } from '../master-setup/organization/Other-Additional-ChargesMaster/other-additional-charges-add/other-additional-charges-add.component';
import { OtherAdditionalChargesComponent } from '../master-setup/organization/Other-Additional-ChargesMaster/other-additional-charges/other-additional-charges.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    ItemSaleWiseComponent,
    OrdersSummaryComponent,
    OrdersComponent,
    RequestedOrdersComponent,
    RequestedViewOrderComponent,
    ViewOrderComponent,
    DashboardComponent,
    CheckoutComponent,
    ProductComponent,
    SaleDateWiseComponent,
    ProductsComponent,
    AddUpdateProductComponent,
    TenantLoginComponent,
    StaffLoginComponent,
    TenantDailySalesComponent,
    TenantDaySalesComponent,
    SalesPerformanceCategoryComponent,
    TenantInvoicesComponent,
    InvoiceDaySalesComponent,
    TenantItemSalesComponent,
    TenantItemDaySalesComponent,
    TenantInvoiceDaySalesComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    ItemMonthlySalesComponent,
    ItemYearlySalesComponent,
    CounterListComponent,
    TicketDashboardComponent,
    TicketQueueComponent,
    DisplayTicketComponent,
    AdminDashboardComponent,
    TokenReportComponent,
    SlicePairsPipe,
    AppointmentReportComponent,
    MasterSetupComponent,
    OrganizationComponent,
    BusinessUnitComponent,
    BusinessUnitAddComponent,
    CustomerComponent,
    CustomerAddComponent,
    DivisionAddComponent,
    DivisionComponent,
    InventoryOrganizationAddComponent,
    InventoryOrganizationComponent,
    TermsConditionsAddComponent,
    TermsConditionsComponent,
    LocationMasterAddComponent,
    LocationMasterComponent,
    OtherAdditionalChargesAddComponent,
    OtherAdditionalChargesComponent
  ],
  imports: [
    NgxChartsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminLayoutRoutingModule,
    SharedModule,
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTableExporterModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSlideToggleModule,
    MatRadioModule,
    RouterModule,
  ],
  exports: [],
  providers: [NavService, AuthGuard],
})
export class AdminLayoutModule {}
