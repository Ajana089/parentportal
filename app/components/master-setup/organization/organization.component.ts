import { Component, Inject, ViewChild } from '@angular/core';
import { DialogsService } from '../../shared/services/dialog.service';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MasterModuleCards } from '../../shared/models/crm.models';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css',
})
export class OrganizationComponent {
  constructor(
    private dialogService: DialogsService,
    private authService: AuthService,
    private router: Router,
  ) {}
  loggedInUser: User;
  masterSetup: MasterModuleCards[] = [];

  ngOnInit() {
    //this.menuItems = ROUTES.filter(i => i.class == 'isSidebarMenu');
    this.loggedInUser = this.authService.getLoggedInUser();

    if (this.loggedInUser.Role == undefined) {
      localStorage.clear();
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }

    this.authService
      .getNavMenu(this.loggedInUser.Role)
      .subscribe((res: any) => {
        if (res && res.length > 0) {
          this.masterSetup = this.convertNavigation(res);
        }
      });
  }

  convertNavigation(data: any[]): MasterModuleCards[] {
    const parentMenus = data.filter((x) => x.ParentID === 31);
    const result: MasterModuleCards[] = [];

    parentMenus.forEach((parent) => {
      result.push({
        title: parent.Text,
        icon: parent.icon,
        theme: parent.CssClass,
        route: '/' + parent.Page,
      });
    });

    return result;
  }

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
