import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { DashboardService } from '../services/dashboard.service';
import { SignalrService } from '../../auth/services/signalr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  loggedInUser: User;
  token: any[] = [];
  waiting = 0;
  serving = 0;
  completed = 0;
  total = 0;
  agents: any[] = [];
  counter_time: any[] = [];
  activeMenu: string = 'dashboard';
  tokenIcon: {
    Canteen: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3C9.5 3 7 4.5 7 7H17C17 4.5 14.5 3 12 3Z" fill="#10b981"/><rect x="6" y="7" width="12" height="2" rx="1" fill="#10b981"/><path d="M7 9L8 19C8 19.6 8.4 20 9 20H15C15.6 20 16 19.6 16 19L17 9H7Z" fill="#10b981" opacity=".75"/><rect x="11" y="3" width="2" height="5" rx="1" fill="#047857"/><circle cx="12" cy="2.5" r="1.5" fill="#34d399"/></svg>`;
    Transport: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="1" y="5" width="16" height="11" rx="2" fill="#f59e0b"/><path d="M17 8.5L22 10.5V16H17V8.5Z" fill="#fbbf24"/><circle cx="5" cy="18" r="2" fill="#78350f"/><circle cx="5" cy="18" r="1" fill="#fde68a"/><circle cx="14" cy="18" r="2" fill="#78350f"/><circle cx="14" cy="18" r="1" fill="#fde68a"/><circle cx="19.5" cy="18" r="2" fill="#78350f"/><circle cx="19.5" cy="18" r="1" fill="#fde68a"/><rect x="3" y="7" width="5" height="3.5" rx="1" fill="#fef3c7" opacity=".9"/><rect x="9.5" y="7" width="5" height="3.5" rx="1" fill="#fef3c7" opacity=".9"/><rect x="18" y="11" width="2.5" height="2" rx=".5" fill="#fef3c7" opacity=".9"/></svg>`;
    Fee: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2.5" fill="#ef4444"/><rect x="2" y="9" width="20" height="2.5" fill="#dc2626"/><circle cx="12" cy="15" r="2.5" fill="#fca5a5"/><circle cx="12" cy="15" r="1.2" fill="#fff1f2"/><rect x="5" y="12.5" width="3" height="1.5" rx=".5" fill="#fca5a5"/><rect x="16" y="12.5" width="3" height="1.5" rx=".5" fill="#fca5a5"/></svg>`;
    Uniform: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9.5 2L7 5L3 6.5L4.5 11H7V20C7 20.6 7.4 21 8 21H16C16.6 21 17 20.6 17 20V11H19.5L21 6.5L17 5L14.5 2C13.9 3.2 13 4 12 4C11 4 10.1 3.2 9.5 2Z" fill="#8b5cf6"/><path d="M9.5 2L12 5L14.5 2C13.9 3.2 13 4 12 4C11 4 10.1 3.2 9.5 2Z" fill="#5b21b6"/><rect x="11" y="5" width="2" height="6" rx="1" fill="#c4b5fd"/><circle cx="12" cy="8" r=".8" fill="#ede9fe"/><circle cx="12" cy="11" r=".8" fill="#ede9fe"/></svg>`;
    Registration: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2H6Z" fill="#022b78" opacity=".9"/><path d="M14 2L20 8H15C14.4 8 14 7.6 14 7V2Z" fill="#0a3d9e"/><rect x="8" y="11" width="8" height="1.5" rx=".75" fill="white" opacity=".9"/><rect x="8" y="14" width="6" height="1.5" rx=".75" fill="white" opacity=".9"/><rect x="8" y="17" width="4" height="1.5" rx=".75" fill="white" opacity=".9"/></svg>`;
  };
  queueConfig: any = {
    Canteen: {
      color: '#10b981',
      background: '#f0fdf4',
      shadow: '#10b98122',
      icon: 'canteen',
    },
    Transport: {
      color: '#f59e0b',
      background: '#fefce8',
      shadow: '#f59e0b22',
      icon: 'transport',
    },
    Fee: {
      color: '#ef4444',
      background: '#fff5f5',
      shadow: '#ef444422',
      icon: 'fee',
    },
    Uniform: {
      color: '#8b5cf6',
      background: '#faf5ff',
      shadow: '#8b5cf622',
      icon: 'uniform',
    },
    Registration: {
      color: '#022b78',
      background: '#eef2ff',
      shadow: '#022b7822',
      icon: 'registration',
    },
  };
  LogoImage: any = '';

  setActive(menu: string) {
    this.activeMenu = menu;

    if (menu == 'dashboard') {
      this.router.navigate(['admin-dashboard']);
    } else if (menu == 'report') {
      this.router.navigate(['token-report']);
    } else if (menu == 'appointment') {
      this.router.navigate(['appointment-report']);
    } else if (menu == 'logout') {
      localStorage.clear();
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }
  }

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router,
    private signalRService: SignalrService,
  ) { }

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();
    //this.LogoImage = this.loggedInUser.LogoImage;
    
    this.loadData();

    this.signalRService.startConnection();

    this.signalRService.refreshQueue$.subscribe(() => {
      this.loadData();
    });
  }

  loadData() {
    this.dashboardService
      .getTokensStatus(this.loggedInUser.CompanyID)
      .subscribe((res: any) => {
        var result = res;
        //this.token = res;

        this.waiting = res.filter((x) => x.Status == 'Waiting')[0].Total;
        this.serving = res.filter((x) => x.Status == 'Serving')[0].Total;
        this.completed = res.filter((x) => x.Status == 'Completed')[0].Total;
        this.total = res.filter((x) => x.Status == 'Total')[0].Total;
      });

    this.dashboardService
      .getCounterTokenStatus(this.loggedInUser.CompanyID)
      .subscribe((res: any) => {
        this.token = res;
      });

    this.dashboardService
      .getCounterAgents(this.loggedInUser.CompanyID)
      .subscribe((res: any) => {
        this.agents = res;
      });

    this.dashboardService
      .getCounterAvgTime(this.loggedInUser.CompanyID)
      .subscribe((res: any) => {
        this.counter_time = res;
      });
  }
}
