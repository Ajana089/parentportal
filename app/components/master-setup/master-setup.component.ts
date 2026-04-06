import { Component } from '@angular/core';
import { DialogsService } from '../shared/services/dialog.service';
import { OrganizationComponent } from './organization/organization.component';
import { CustomerComponent } from './customer/customer.component';

@Component({
  selector: 'app-master-setup',
  templateUrl: './master-setup.component.html',
  styleUrl: './master-setup.component.css',
})
export class MasterSetupComponent {
  constructor(private dialogService: DialogsService) {}
  // ThemeList: red, blue, green, amber, teal, purple, slate
  //Icons: get it from https://fontawesome.com/
  masterSetup: any = [
    {
      title: 'Business Unit Master',
      headerTitle: '',
      image: '../../../../../../assets/img/Setup/profile-upload.png',
      icon: 'fa-solid fa-city',
      theme: 'theme-red',
      route: '/master-setup/business-units',
      component: OrganizationComponent,
    },
    {
      title: 'Customer Master',
      headerTitle: '',
      image: '../../../../../../assets/img/Setup/profile-upload.png',
      icon: 'fa-solid fa-users',
      theme: 'theme-blue',
      route: '/master-setup/customer',
      component: CustomerComponent,
    },
  ];

  openDialog(component: any, header: any, title: any) {
    if (component || header) {
      this.dialogService
        .openDialog({
          component: component,
          header: header,
          title: title,
        })
        .subscribe((onClose) => {});
    }
  }
}
