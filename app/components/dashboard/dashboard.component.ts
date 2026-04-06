import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SignalrService } from '../auth/services/signalr.service';
import { MatDialog } from '@angular/material/dialog';
import { CounterListComponent } from './counter-list/counter-list.component';
import { ActivityItem, KpiCard, PipelineItem, RecentRecord, TopCustomer } from '../shared/models/crm.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  loggedInUser: User;
  data: any = [];
  QueueName: string;
  tasks: any[] = [];
  filteredTasks: any[] = [];
  taskCount: number;
  counter_name: string;
  servingTask: any = {};
  completedTasks: any[] = [];
  completedtaskCount: number;
  filteredcompletedTasks: any[] = [];
  activeCounters: any[] = [];
  date: any = new Date();


  today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  kpiCards: KpiCard[] = [
    {
      icon: 'fa-users', iconClass: 'ic-blue',
      value: '1,284', label: 'Total Customers',
      badge: '+8%', badgeClass: 'badge-up',
      sub: '<span class="text-blue fw-600">64</span> new this month'
    },
    {
      icon: 'fa-diagram-project', iconClass: 'ic-green',
      value: '47', label: 'Active Projects',
      badge: '+3', badgeClass: 'badge-up',
      sub: '<span style="color:#1a9448;font-weight:600">12</span> due this week'
    },
    {
      icon: 'fa-file-invoice-dollar', iconClass: 'ic-amber',
      value: '38', label: 'Pending RFQs',
      badge: 'Active', badgeClass: 'badge-neu',
      sub: '<span style="color:#d97706;font-weight:600">9</span> closing soon'
    },
    {
      icon: 'fa-file-contract', iconClass: 'ic-red',
      value: '126', label: 'Quotations Sent',
      badge: '+12%', badgeClass: 'badge-up',
      sub: '<span class="text-red fw-600">31</span> accepted · <span style="color:#9ca3af">7</span> rejected'
    },
    {
      icon: 'fa-handshake', iconClass: 'ic-purple',
      value: '29', label: 'Ongoing Contracts',
      badge: '+5', badgeClass: 'badge-up',
      sub: '<span style="color:#7c3aed;font-weight:600">AED 48.2M</span> total value'
    },
    {
      icon: 'fa-shield-check', iconClass: 'ic-teal',
      value: '83', label: 'QC Inspections',
      badge: '2 overdue', badgeClass: 'badge-down',
      sub: '<span style="color:#0d9488;font-weight:600">76</span> passed · <span class="text-red">7</span> failed'
    },
  ];

  revenueMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  revenueBars = [
    {prev:55, curr:62},{prev:48,curr:72},{prev:65,curr:80},{prev:70,curr:68},
    {prev:60,curr:88},{prev:80,curr:95},{prev:72,curr:100},{prev:85,curr:90},
    {prev:90,curr:78},{prev:78,curr:84},{prev:88,curr:92},{prev:95,curr:82}
  ];

  pipeline: PipelineItem[] = [
    { label: 'RFQ Stage',          count: 38,  value: 'AED 12.4M', width: 62,  color: '#f59e0b' },
    { label: 'Quotation Stage',    count: 126, value: 'AED 28.1M', width: 78,  color: 'var(--blue)' },
    { label: 'Negotiation',        count: 17,  value: 'AED 9.8M',  width: 38,  color: '#7c3aed' },
    { label: 'Contract Signed',    count: 29,  value: 'AED 48.2M', width: 89,  color: 'var(--red)' },
    { label: 'Delivery/Execution', count: 22,  value: 'AED 31.5M', width: 55,  color: '#0d9488' },
  ];

  quickActions = [
    { icon: 'fa-user-plus',           label: 'New Customer' },
    { icon: 'fa-file-invoice-dollar', label: 'Create RFQ' },
    { icon: 'fa-file-contract',       label: 'New Quotation' },
    { icon: 'fa-diagram-project',     label: 'Add Project' },
    { icon: 'fa-shield-check',        label: 'QC Inspection' },
    { icon: 'fa-chart-bar',           label: 'View Reports' },
  ];

  recentRecords: RecentRecord[] = [
    {
      ref: 'QT-2024-0092', customer: 'Emaar Properties', customerInitials: 'EM',
      customerColor: 'linear-gradient(135deg,#24b6e7,#1e7fb5)',
      project: 'Downtown Mix Plant', type: 'Quotation', typeClass: 'tag-blue',
      value: '2,840,000', statusLabel: 'Approved', statusClass: 'pill-green', date: '08 Mar 2026'
    },
    {
      ref: 'RFQ-2026-0042', customer: 'Al Futtaim Construction', customerInitials: 'AF',
      customerColor: 'linear-gradient(135deg,#e8332a,#c42820)',
      project: 'Festival City Phase 3', type: 'RFQ', typeClass: 'tag-red',
      value: '4,120,000', statusLabel: 'Pending', statusClass: 'pill-amber', date: '07 Mar 2026'
    },
    {
      ref: 'CON-2026-0017', customer: 'DAMAC Properties', customerInitials: 'DM',
      customerColor: 'linear-gradient(135deg,#7c3aed,#5b21b6)',
      project: 'Safa One Tower', type: 'Contract', typeClass: 'tag-gray',
      value: '11,500,000', statusLabel: 'In Execution', statusClass: 'pill-blue', date: '05 Mar 2026'
    },
    {
      ref: 'QT-2026-0088', customer: 'Arabtec Holdings', customerInitials: 'AT',
      customerColor: 'linear-gradient(135deg,#0d9488,#0a7a70)',
      project: 'Abu Dhabi Airport E', type: 'Quotation', typeClass: 'tag-blue',
      value: '7,200,000', statusLabel: 'Under Review', statusClass: 'pill-gray', date: '03 Mar 2026'
    },
    {
      ref: 'QT-2026-0085', customer: 'Nakheel Building', customerInitials: 'NB',
      customerColor: 'linear-gradient(135deg,#d97706,#b45309)',
      project: 'Palm Jebel Ali Infra', type: 'Quotation', typeClass: 'tag-blue',
      value: '3,650,000', statusLabel: 'Rejected', statusClass: 'pill-red', date: '01 Mar 2026'
    },
  ];

  activities: ActivityItem[] = [
    { iconClass:'ic-green',  icon:'fa-check',                  title:'Quotation QT-2024-0087 approved',       meta:'By: M. Al Mansouri · Emaar Properties',       time:'12m' },
    { iconClass:'ic-amber',  icon:'fa-file-invoice-dollar',    title:'New RFQ #0042 received',                meta:'Al Futtaim Construction — AED 4.1M',          time:'1h' },
    { iconClass:'ic-blue',   icon:'fa-user-plus',              title:'Customer request: Arabtec Holdings',    meta:'Pending KYC & credit approval',               time:'3h' },
    { iconClass:'ic-red',    icon:'fa-triangle-exclamation',   title:'QC Inspection overdue – Lot 7',         meta:'Downtown Mix Plant · Assigned: K. Ahmed',     time:'5h' },
    { iconClass:'ic-purple', icon:'fa-handshake',              title:'Contract CON-0017 executed',            meta:'DAMAC Properties — Safa One Tower',           time:'Yesterday' },
    { iconClass:'ic-teal',   icon:'fa-boxes-stacked',          title:'Item Cost Rate updated — 14 items',     meta:'By: F. Ibrahim · Master Setup',               time:'Yesterday' },
  ];

  topCustomers: TopCustomer[] = [
    { initials:'EM', color:'linear-gradient(135deg,#24b6e7,#1e7fb5)', name:'Emaar Properties',       revenue:'AED 14.2M', width:100, barColor:'var(--blue)' },
    { initials:'DM', color:'linear-gradient(135deg,#7c3aed,#5b21b6)', name:'DAMAC Properties',       revenue:'AED 11.5M', width:81,  barColor:'#7c3aed' },
    { initials:'AF', color:'linear-gradient(135deg,#e8332a,#c42820)', name:'Al Futtaim Construction',revenue:'AED 8.7M',  width:61,  barColor:'var(--red)' },
    { initials:'AT', color:'linear-gradient(135deg,#0d9488,#0a7a70)', name:'Arabtec Holdings',       revenue:'AED 7.2M',  width:51,  barColor:'#0d9488' },
    { initials:'NB', color:'linear-gradient(135deg,#d97706,#b45309)', name:'Nakheel Building',       revenue:'AED 6.6M',  width:46,  barColor:'#d97706' },
  ];

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private signalRService: SignalrService
  ) { }

  ngOnInit() {

    this.loggedInUser = this.authService.getLoggedInUser();

    this.tasks = [];
    this.taskCount = 0;
    //this.signalRService.startConnection();
    // this.loadPendingTickets();
    // this.loadData();
    // this.getActiveCounters();

    this.signalRService.refreshQueue$.subscribe(() => {
      this.tasks = [];
      this.taskCount = 0;
      //this.loadPendingTickets();
    });

    if (this.loggedInUser.Role == 1) {
      this.router.navigate(['/dashboard']);
    } else if (this.loggedInUser.Role == 2) {
      this.router.navigate(['/ticket-dashboard']);
    } else if (this.loggedInUser.Role == 3) {
      this.router.navigate(['/display-ticket']);
    } else if (this.loggedInUser.Role == 4) {
      this.router.navigate(['/admin-dashboard']);
    } 

    
    // else if (this.loggedInUser.Role == 3) {
    //   this.router.navigate(['/mall-dashboard']);
    //   return;
    // } else if (this.loggedInUser.Role == 4) {
    //   this.router.navigate(['/operation-dashboard']);
    //   return;
    // } else if (this.loggedInUser.Role == 5) {
    //   this.router.navigate(['leasing-dashboard']);
    // }
  }

  callNextTicket() {
    // this.dashboardService.callNextTicket(this.loggedInUser.ID, this.loggedInUser.queue_id, this.loggedInUser.CompanyID).subscribe((res: any) => {      
    //   this.loadPendingTickets();
    //   this.loadData();
    // });
  }

  applyFilter(event: Event) {
    //const filterValue = (event.target as HTMLInputElement).value;
    this.tasks = this.filteredTasks;

    const filterValue = (event.target as HTMLInputElement).value
    .toLowerCase()
    .trim();

    if (filterValue != '') {
      this.tasks = this.tasks.filter(task =>
        task.TicketNo?.toLowerCase().includes(filterValue) ||
        task.FamilyNo?.toLowerCase().includes(filterValue)
      );
    } else {
      this.tasks = this.filteredTasks;
    }

    
    
  }

  applyFilterCompleted(event: Event) {
    //const filterValue = (event.target as HTMLInputElement).value;
    this.completedTasks = this.filteredcompletedTasks;

    const filterValue = (event.target as HTMLInputElement).value
    .toLowerCase()
    .trim();

    if (filterValue != '') {
      this.completedTasks = this.completedTasks.filter(task =>
        task.TicketNo?.toLowerCase().includes(filterValue) ||
        task.FamilyNo?.toLowerCase().includes(filterValue)
      );
    } else {
      this.completedTasks = this.filteredcompletedTasks;
    }

    
    
  }

  getActiveCounters() {
    // this.dashboardService.getActiveCounters(this.loggedInUser.ID, this.loggedInUser.queue_id, this.loggedInUser.CompanyID).subscribe((res: any) => {
    //   this.activeCounters = res;
    // });
  }

  openDialog() {

    var obj = {
      counters: this.activeCounters,
      WFDtl_ID: this.servingTask.WFDtl_ID,
      SchoolID: this.servingTask.SchoolID,
      QueueID: this.servingTask.QueueID
    }

    const dialogRef = this.dialog.open(CounterListComponent, {
      width: '30%',
      maxWidth: '30vw',
      data: obj,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadPendingTickets();
      this.loadData();
    });
    
  }


  completeTicket() {

    if (this.servingTask != null) {

      var request = {
          RequestID: this.servingTask.RequestID,
          SchoolID: this.servingTask.SchoolID,
          ActionedBy: this.loggedInUser.ID,
          ApproverAction: 'completed'
        };

        this.dashboardService.completeCounterTicket(request).subscribe((res: any) => {
          var result = res;
          if (result && result > 0) {

            this.loadPendingTickets();
            this.loadData();

            Swal.fire({
              title: 'Ticket completed successfully!',
              text: '',
              icon: 'success',
            });

          } else {
            Swal.fire({
              title: 'Some Error!',
              text: '',
              icon: 'error',
            });

          }
      });
    }

  }

  loadData(): any {
    // this.dashboardService.getCounterServingTickets(this.loggedInUser.ID, this.loggedInUser.queue_id, this.loggedInUser.CompanyID).subscribe((res: any) => {
    //   this.servingTask = res;
    // });

    // this.dashboardService.getCounterCompletedTickets(this.loggedInUser.ID, this.loggedInUser.queue_id, this.loggedInUser.CompanyID).subscribe((res: any) => {
    //   this.completedTasks = res;
    //   this.filteredcompletedTasks = res;
    //   this.completedtaskCount = res.length;
    // });
  }

  loadPendingTickets() {
    //   this.dashboardService.getCounterPendingTickets(this.loggedInUser.queue_id, this.loggedInUser.CompanyID).subscribe((res: any) => {
    //   this.tasks = res;
    //    this.filteredTasks = res;
    //   this.taskCount = res.length;
    // });
  }

  serverTicket(RequestID, QueueID, SchoolID) {
    if (this.servingTask == null) {

      var request = {
          RequestID: RequestID,
          SchoolID: SchoolID,
          UserId: this.loggedInUser.ID,
          QueueID: QueueID
        };

        this.dashboardService.serveCounterTicket(request).subscribe((res: any) => {
          var result = res;
          if (result && result > 0) {
            this.loadPendingTickets();
            this.loadData();
          }
      });
    }
  }

  recallTicket() {
    if (this.servingTask != null && this.servingTask.WFDtl_ID > 0) {

      var request = {
          WFDtl_ID: this.servingTask.WFDtl_ID,
          SchoolID: this.servingTask.SchoolID,
          UserId: this.loggedInUser.ID,
          QueueID: this.servingTask.QueueID
        };

        this.dashboardService.recallCounterTicket(request).subscribe((res: any) => {
          var result = res;
          if (result && result > 0) {
            this.loadPendingTickets();
            this.loadData();
          }
      });
    }
  }

  noShowTicket() {
    if (this.servingTask != null && this.servingTask.WFDtl_ID > 0) {

      var request = {
          WFDtl_ID: this.servingTask.WFDtl_ID,
          SchoolID: this.servingTask.SchoolID,
          UserId: this.loggedInUser.ID,
          QueueID: this.servingTask.QueueID
        };

        this.dashboardService.noShowCounterTicket(request).subscribe((res: any) => {
          var result = res;
          if (result && result > 0) {
            this.loadPendingTickets();
            this.loadData();
          }
      });
    }
  }

}