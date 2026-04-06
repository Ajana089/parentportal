import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {


   authenticationForm: FormGroup;
   showPassword: boolean = false;
   showConfirmPassword: boolean = false;
   samePassword = false;
   loggedInUser: User;
   is_password_changed: boolean = false;

  constructor( 
    public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
       public dialog: MatDialog,) {

        this.authenticationForm = this.fb.group({
              company: [''],
              username: ['', Validators.required],
              password: [
                '',
                [
                  Validators.required,
                  Validators.pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)
                ]
              ],
              confirmPassword: [
                '',
                [
                  Validators.required,
                  Validators.pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)
                ]
              ]
            });

  }

  
  ngOnInit() {

      this.loggedInUser = this.authService.getLoggedInUser();

     // this.is_password_changed = this.loggedInUser.is_password_changed;


      this.authenticationForm.get('username')?.setValue(this.loggedInUser.User_Name);
    }

  closeDialog() {

     this.dialogRef.close();

   }

   get password() {
      return this.authenticationForm.get('password');
    }

    get confirmPassword() {
      return this.authenticationForm.get('confirmPassword');
    }

   forgotPassword(): void {
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
       //// console.log(formValues);

       if (formValues.password != formValues.confirmPassword) {
        this.samePassword = true;
        return;
       }

       if (this.loggedInUser.Role == 2) {
        this.authService.forgotPassword(formValues).subscribe((res: any) => {
         if (res && res > 0) {

         // this.loggedInUser.is_password_changed = true;

          this.authService.setLoggedInUser(this.loggedInUser);
           
           this.dialogRef.close();

           Swal.fire({
             title: 'Password changed successfully!',
             text: '',
             icon: 'success',
           });

           

         } else {
           Swal.fire({
             title: 'Username is incorrect!',
             text: '',
             icon: 'error',
           });
         }
       });
       } else {
        this.authService.forgotAdminPassword(formValues).subscribe((res: any) => {
         if (res && res > 0) {
           
           this.dialogRef.close();

           Swal.fire({
             title: 'Password changed successfully!',
             text: '',
             icon: 'success',
           });

         } else {
           Swal.fire({
             title: 'Username is incorrect!',
             text: '',
             icon: 'error',
           });
         }
       });
       }

       
     }

   isShowPassword(){
    this.showPassword = !this.showPassword
  }

   isshowConfirmPassword(){
    this.showConfirmPassword = !this.showConfirmPassword
  }

}


