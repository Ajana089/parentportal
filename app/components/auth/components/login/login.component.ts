import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../shared/models/user.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TenantLoginComponent } from '../tenant-login/tenant-login.component';
import { MatDialog } from '@angular/material/dialog';
import { StaffLoginComponent } from '../staff-login/staff-login.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { SignalrService } from '../../services/signalr.service';
import { TextToSpeechService } from '../../services/text-to-speech.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authenticationForm: FormGroup;
  text = 'Hello! Welcome to the Angular text to speech demo.';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    public signalR: SignalrService,
    private tts: TextToSpeechService
  ) {
    this.authenticationForm = this.fb.group({
      company: [''],
      user_name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  showPassword: boolean = false;
  buList: any[] = [];
  selectedBU: any = '';

  private hubConnectionBuilder!: HubConnection;
  //offers: any[] = [];

  private hubConnection!: HubConnection;

  speak() {
    this.tts.speak(this.text);
  }

  stop() {
    this.tts.stop();
  }

  ngOnInit(): void {
  }

  forgotPassword() {

    // console.log('tenant login');
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      height: 'auto',
      width: '30%',
      minWidth: '30%',
      data: {},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      //this.getTenantsList();
    });

  }

  login() {

    if (this.authenticationForm.invalid) {
      Swal.fire({
        title: 'All fields are required.',
        text: '',
        icon: 'error',
      });
      return;
    }

    let formValues = this.authenticationForm.value;
    formValues.first_name = '';
    // {
    this.authService.userLogin(formValues).subscribe((res: any) => {
      if (res && res.ID > 0) {

        this.authService.setLoggedInUser(res);

        

          if (res.Role == 1) {
           this.router.navigate(['dashboard']);
         } else if (res.Role == 2) {
           this.router.navigate(['ticket-dashboard']);
         } else if (res.Role == 3) {
           this.router.navigate(['display-ticket']);
         } else if (res.Role == 4) {
           this.router.navigate(['admin-dashboard']);
         }

        //this.dialogRef.close();

        //this.router.navigate(['tenant-dashboard']);

        // if (!res.is_password_changed) {

        //    const dialogRef = this.dialog.open(ChangePasswordComponent, {
        //       height: 'auto',
        //       width: '30%',
        //       minWidth: '30%',
        //       data: {},
        //       disableClose: true,
        //     });
        //     dialogRef.afterClosed().subscribe((result) => {

        //     });

        // } else {
        //    this.router.navigate(['tenant-dashboard']);
        // }

       


       
      } else {
        Swal.fire({
          title: res.error_message,
          text: '',
          icon: 'error',
        });
      }
    });

  }

  companyChanged(value) {
    // console.log(value);
    if (value == "EDUCAP" || value == "ASCS" || value == "ISCS" || value == "BEAM" || value == "HotOven" || value == "ASCS-NAS" || value == "ASCS-Layyah" || value == "ASCS-NadAlShiba" || value == "ISCS-NAS") {
      this.router.navigate(['loginAD']);


    }
  }

  onAuthenticate(): void {
    if (this.authenticationForm.invalid) {
      Swal.fire({
        title: 'All fields are required.',
        text: '',
        icon: 'error',
      });
      return;
    }

    let formValues = this.authenticationForm.value;
    formValues.first_name = '';
    // console.log(formValues);

    // if (formValues.username.toString().toLowerCase().includes('shopsupervisor')
    //   || formValues.username.toString().toLowerCase().includes('shopkeeper')
    //   || formValues.username.toString().toLowerCase().includes('cashier')
    //   || formValues.username.toString().toLowerCase().includes('finance'))
    // {
    this.authService.authenticate(formValues).subscribe((res: any) => {
      if (res && res.ID > 0) {
        this.authService.setLoggedInUser(res);

        if (res.Role == 1) {
          this.router.navigate(['dashboard']);
        } else if (res.Role == 2) {
          this.router.navigate(['login']);
        } else if (res.Role == 4) {
          this.router.navigate(['operation-dashboard']);
        }
      } else {
        Swal.fire({
          title: res.error_message,
          text: '',
          icon: 'error',
        });
      }
    });
  }
  // else
  // {
  //   this.authService.authenticateParent(formValues).subscribe((res: any) => {
  //     if (res && res.length > 0) {
  //       // console.log(res);

  //       let result: any = [];

  //       res.forEach(item => {
  //         if (parseInt(item.OutstandingAmount) > 200)
  //         {
  //           Swal.fire({
  //             title: "Please pay outstanding amount " + parseInt(item.OutstandingAmount) + " before proceed!",
  //             text: "",
  //             icon: "error"
  //           });
  //         }
  //         else
  //         {
  //           result.push(item);
  //         }
  //       });

  //       if (result.length > 0)
  //       {
  //         this.authService.setLoggedInParent(result);
  //         this.router.navigate(['order-parent']);
  //       }
  //     }
  //     else
  //     {
  //       Swal.fire({
  //         title: "Username or Password is incorrect!",
  //         text: "",
  //         icon: "error"
  //       });
  //       return;
  //     }
  //   });
  // }

  // }

  isShowPassword() {
    this.showPassword = !this.showPassword
  }
}
