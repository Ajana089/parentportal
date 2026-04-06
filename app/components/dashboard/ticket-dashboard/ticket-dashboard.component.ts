import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignalrService } from '../../auth/services/signalr.service';
import { TextToSpeechService } from '../../auth/services/text-to-speech.service';
import { DashboardService } from '../services/dashboard.service';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { TicketQueueComponent } from '../ticket-queue/ticket-queue.component';

@Component({
  selector: 'app-ticket-dashboard',
  templateUrl: './ticket-dashboard.component.html',
  styleUrl: './ticket-dashboard.component.css'
})

export class TicketDashboardComponent implements OnInit {

  studentForm: FormGroup;
  loggedInUser: User;
  appointment: any = {};
  appointment_id: any = '';
  is_submitted: boolean = false;
  familyno: any = '';
  is_Appointment: any = false;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      public dialog: MatDialog,
      public signalR: SignalrService,
      private dashboardService: DashboardService,
      private tts: TextToSpeechService,
      private authService: AuthService,
    ) {
      this.studentForm = this.fb.group({
        familyno: ['', Validators.required]
      });
    }

  ngOnInit() { 

    this.loggedInUser = this.authService.getLoggedInUser();

    if (this.loggedInUser.Role == 2) {
      this.router.navigate(['/ticket-dashboard']);
      return;
    } else if (this.loggedInUser.Role == 3) {
      this.router.navigate(['/display-ticket']);
      return;
    } 

  }

  
  search() {

    let formValues = this.studentForm.value;

     this.familyno = '';
     this.appointment_id = 0;
     this.is_submitted = false;
     this.is_Appointment = false;

    if (formValues.familyno != '') {
      
      this.familyno = formValues.familyno;

      this.dashboardService.getAppointmentDetails(formValues.familyno,  this.loggedInUser.CompanyID).subscribe((res: any) => {
        this.appointment = res;
        if (this.appointment == null) {
          this.is_Appointment = false;
          this.appointment_id = 0;
        } else {
          this.is_Appointment = true;
          this.appointment_id = this.appointment.Id;
        }
        this.is_submitted = true;

      });

    }

  }

  goback() {
    this.familyno = '';
     this.appointment_id = 0;
     this.is_submitted = false;
     this.is_Appointment = false;
     this.studentForm.get('familyno')?.setValue('');
  }

  selectQueue() {

    var obj = {
      SchoolId: this.loggedInUser.CompanyID,
      FamilyNo: this.familyno,
      IsAppointment: this.is_Appointment,
      AppointmentDate: this.appointment ?  this.appointment.AppointmentDate : new Date()
    }

    const dialogRef = this.dialog.open(TicketQueueComponent, {
      width: '80%',
      maxWidth: '80vw',
      height: '100%',
      maxHeight: '100vw',
      data: obj,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result == 1) {
        this.goback();
      }

    });

  }



}
