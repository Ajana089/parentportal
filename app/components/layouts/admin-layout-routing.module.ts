import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CustomerComponent } from '../master-setup/customer/customer.component';
import { OrganizationComponent } from '../master-setup/organization/organization.component';
import { BusinessUnitComponent } from '../master-setup/organization/business-unit/business-unit.component';
import { DivisionComponent } from '../master-setup/organization/division/division/division.component';
import { InventoryOrganizationComponent } from '../master-setup/organization/inventoryorganizationmaster/Inventory-organization/inventory-organization.component';
import { TermsConditionsComponent } from '../master-setup/organization/terms-and-conditions/terms-conditions/terms-conditions.component';
import { LocationMasterComponent } from '../master-setup/organization/LocationMaster/location-master/location-master.component';
import { OtherAdditionalChargesComponent } from '../master-setup/organization/Other-Additional-ChargesMaster/other-additional-charges/other-additional-charges.component';
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'customer',
        component: CustomerComponent,
      },
      {
        path: 'organization-master',
        component: OrganizationComponent,
      },
      {
        path: 'organization-master/business-unit',
        component: BusinessUnitComponent,
      },
      {
        path: 'organization-master/division',
        component: DivisionComponent,
      },
      {
        path: 'organization-master/inventory-organization',
        component: InventoryOrganizationComponent,
      },
      {
        path: 'organization-master/term-condition',
        component:TermsConditionsComponent ,
      },
       {
        path: 'organization-master/location-master',
        component:LocationMasterComponent ,
      },
      {
        path: 'organization-master/other-charges',
        component:OtherAdditionalChargesComponent
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
