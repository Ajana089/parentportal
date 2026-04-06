import { Component, OnInit,inject, HostListener } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LayoutService } from '../../shared/layout.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  role: any = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    let user: User = this.authService.getLoggedInUser();
    this.role = user.Role;
  }

  layout = inject(LayoutService);

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 992) {
      this.layout.mobileSidebarOpen.set(false);
    }
  }

  closeOnOverlay(): void {
    this.layout.closeMobileSidebar();
  }
}
