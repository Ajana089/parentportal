import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-tenant-login',
  templateUrl: './tenant-login.component.html',
  styleUrl: './tenant-login.component.css'
})
export class TenantLoginComponent {

   authenticationForm: FormGroup;
   showPassword: boolean = false;

  constructor( 
    public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
       public dialog: MatDialog,) {

        this.authenticationForm = this.fb.group({
              company: [''],
              username: ['', Validators.required],
              password: ['', Validators.required],
            });

  }

  closeDialog() {
     this.dialogRef.close();
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
       this.authService.userLogin(formValues).subscribe((res: any) => {
         if (res && res.ID > 0) {

          

           this.authService.setLoggedInUser(res);
           this.dialogRef.close();

           this.router.navigate(['tenant-dashboard']);
           
   
          //  if (res.Role == 1) {
          //    this.router.navigate(['dashboard']);
          //  } else if (res.Role == 2) {
          //    this.router.navigate(['tenant-work-requests']);
          //  }
         } else {
           Swal.fire({
             title: res.error_message,
             text: '',
             icon: 'error',
           });
         }
       });
     }

   isShowPassword(){
    this.showPassword = !this.showPassword
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

}
