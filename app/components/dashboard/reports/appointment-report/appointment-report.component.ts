import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../../auth/services/auth.service';
import { SignalrService } from '../../../auth/services/signalr.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';


@Component({
  selector: 'app-appointment-report',
  templateUrl: './appointment-report.component.html',
  styleUrl: './appointment-report.component.css'
})
export class AppointmentReportComponent implements OnInit {

  loggedInUser: User;
  token: any[] = [];
  waiting = 0;
  serving = 0;
  completed = 0;
  total = 0;
  agents: any[] = [];
  counter_time: any[] = [];
  activeMenu: string = 'report';
  from_date: any = new Date();
  to_date: any = new Date();
  selectedStatus: any = '';
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
    private _liveAnnouncer: LiveAnnouncer
  ) {
  }

  displayedColumns: string[] = [

    'FamilyId',
    'AppointmentDate',
    'AppointmentTitle',
    'StudentId',
    'StudentName'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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

    var obj = {
      FromDate: this.from_date != '' ? this.from_date : '',
      ToDate: this.to_date != '' ? this.to_date : '',
      Status: '',
      SchoolId: this.loggedInUser.CompanyID
    }

    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    this.dashboardService.getTicketAppointments(obj).subscribe((res: any) => {
      if (res) {
        ELEMENT_DATA = res;

        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      }
    });

  }

  onChangeStatus(value) {
    this.selectedStatus = value;
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  exportData() { }
  openClientDialog() { }
  onFormValueChange() { }
  resetFilters() { }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'SERVING':
        return '#C8E6C9'; // Light green
      case 'PENDING':
        return '#FFCDD2'; // Light red
      default:
        return 'transparent';
    }
  }


}

export interface PeriodicElement {
}
let ELEMENT_DATA: PeriodicElement[] = [];


