import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { FlatNode } from '../../shared/models/NavItems.model';
import { User } from '../../shared/models/user.model';
import { NavItem } from '../../shared/models/crm.models';
import { LayoutService } from '../../shared/layout.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'design_app',
    class: 'isSidebarMenu',
  },
  {
    path: '/#',
    title: 'POS',
    icon: 'shopping_cart-simple',
    class: 'isSidebarMenu',
  },
  {
    path: '/orders',
    title: 'Orders',
    icon: 'shopping_box',
    class: 'isSidebarMenu',
  },
  {
    path: '/requested-orders',
    title: 'Orders',
    icon: 'shopping_box',
    class: 'isSidebarMenu',
  },
  {
    path: '/logout',
    title: 'Logout',
    icon: 'media-1_button-power',
    class: 'isSidebarMenu',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];
  loggedInUser: User;

  layout = inject(LayoutService);

  openMenus: Set<string> = new Set(['master-setup']);

  navItems: NavItem[] = [];
  first_name: any = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    //this.menuItems = ROUTES.filter(i => i.class == 'isSidebarMenu');
    this.loggedInUser = this.authService.getLoggedInUser();
    this.first_name = this.loggedInUser.first_name;

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
          this.menuItems = res;
          this.navItems = (this.convertNavigation(res));

          // this.menuItems.push({
          //   Id: 0,
          //   Text: 'Logout',
          //   Page: 'logout',
          //   icon: 'media-1_button-power',
          //   IsSubMenu: 0,
          //   ParentID: 1,
          // });
        }
      });

    // console.log(this.menuItems)
  }

  convertNavigation(data: any[]): NavItem[] {
    const parentMenus = data.filter((x) => x.ParentID === 1);
    const result: NavItem[] = [];


    parentMenus.forEach((parent) => {
      const children = data
        .filter((x) => x.ParentID === parent.Id)
        .map((child) => ({
          label: child.Text,
          route: '/' + child.Page,
        }));

      result.push({
        label: parent.Text,
        icon: parent.icon,
        route: '/' + parent.Page,
        children: children.length ? children : undefined,
      });
    });

    return result;
  }

  onMenuClick(event) {
    // console.log(event);
  }

  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
    return;
  }
  toggleSubMenu(event: Event, menuItem: any) {
    event.preventDefault();
    menuItem.showSubMenu = !menuItem.showSubMenu;
  }
  onButtonGroupClick($event) {
    let clickedElement = $event.target || $event.srcElement;
    if (clickedElement.nodeName === 'P') {
      let isCertainButtonAlreadyActive =
        clickedElement.parentElement.parentNode.parentNode.querySelector(
          '.active',
        );
      // if a Button already has Class: .active
      if (
        isCertainButtonAlreadyActive &&
        clickedElement.innerText != isCertainButtonAlreadyActive.innerText
      ) {
        isCertainButtonAlreadyActive.classList.remove('active');
      }
      if (clickedElement.innerText == 'POS') {
        window.open('/home', '_blank');
        // clickedElement.parentElement.parentNode.parentNode.querySelector(".nav-item").className += " active";
      }
      if (clickedElement.innerText == 'Logout') {
        localStorage.clear();
        this.authService.logout();
        this.router.navigate(['/login']);
        return;
      }
    }
  }
  toggleMenu(label: string): void {
    if (this.layout.sidebarCollapsed()) return;
    if (this.openMenus.has(label)) {
      this.openMenus.delete(label);
    } else {
      this.openMenus.add(label);
    }
  }

  isOpen(label: string): boolean {
    return this.openMenus.has(label);
  }

  onNavClick(): void {
    if (this.layout.isMobile()) {
      this.layout.closeMobileSidebar();
    }
  }
}
